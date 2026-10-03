const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, auth) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, URL, process, require(name) {
    if (name === '@/lib/supabase/server') return { createClient: async () => ({ auth }) };
    if (name === 'next/navigation') return { redirect(path) { throw new Error('REDIRECT:' + path); } };
    if (name === 'next/server') return { NextResponse: { redirect: url => url.toString() } };
    throw new Error('Unexpected dependency: ' + name);
  } });
  return exports;
}
const form = (mode, password = 'test-password') => {
  const data = new FormData();
  data.set('email', 'tester@example.invalid'); data.set('password', password); data.set('mode', mode);
  return data;
};

test('unconfirmed account receives confirmation instructions and no password in state', async () => {
  const { authenticate } = load('app/login/actions.ts', { signInWithPassword: async () => ({ error: { code: 'email_not_confirmed' } }) });
  const state = await authenticate({}, form('signin'));
  assert.match(state.error, /Confirm your email/);
  assert.equal(state.email, 'tester@example.invalid');
  assert.equal('password' in state, false);
});
test('successful sign-in redirects to trips', async () => {
  const { authenticate } = load('app/login/actions.ts', { signInWithPassword: async () => ({ error: null }) });
  await assert.rejects(authenticate({}, form('signin')), /REDIRECT:\/trips/);
});
test('signup awaiting email confirmation returns visible instructions and callback address', async () => {
  let options;
  const { authenticate } = load('app/login/actions.ts', { signUp: async input => { options = input.options; return { data: { session: null }, error: null }; } });
  const state = await authenticate({}, form('signup'));
  assert.match(state.message, /Check your inbox/);
  assert.equal(new URL(options.emailRedirectTo).pathname, '/auth/callback');
  assert.equal('password' in state, false);
});
test('invalid mode and short signup password never call auth', async () => {
  const { authenticate } = load('app/login/actions.ts', {});
  assert.match((await authenticate({}, form('other'))).error, /Choose/);
  assert.match((await authenticate({}, form('signup', 'short'))).error, /8 characters/);
});
test('wrong password and rate limits produce useful errors', async () => {
  for (const [code, message] of [['invalid_credentials', /incorrect/], ['over_email_send_rate_limit', /wait/]]) {
    const { authenticate } = load('app/login/actions.ts', { signInWithPassword: async () => ({ error: { code } }) });
    assert.match((await authenticate({}, form('signin'))).error, message);
  }
});
test('confirmation callback exchanges code and never redirects to an external next URL', async () => {
  let called = false;
  const { GET } = load('app/auth/callback/route.ts', { exchangeCodeForSession: async () => { called = true; return { error: null }; } });
  const url = 'https://app.example/auth/callback?code=test&next=https://untrusted.example';
  assert.equal(await GET({ url, nextUrl: new URL(url) }), 'https://app.example/trips');
  assert.equal(called, true);
});
test('expired confirmation link returns a visible login error', async () => {
  const { GET } = load('app/auth/callback/route.ts', { exchangeCodeForSession: async () => ({ error: { code: 'invalid_grant' } }) });
  const url = 'https://app.example/auth/callback?code=test';
  assert.equal(await GET({ url, nextUrl: new URL(url) }), 'https://app.example/login?error=confirmation');
});
