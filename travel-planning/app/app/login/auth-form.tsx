"use client";
import Link from "next/link";
import { useActionState } from "react";
import { authenticate, type AuthState } from "./actions";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(authenticate, {});
  const signup = mode === "signup";
  return <form action={action} className="card">
    <input type="hidden" name="mode" value={mode} />
    {state.error && <p role="alert">{state.error}</p>}
    {state.message && <div role="status"><p>{state.message}</p><Link href="/login">Go to sign in</Link></div>}
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" required autoComplete="email" defaultValue={state.email} />
    <label htmlFor="password">Password</label>
    <input id="password" name="password" type="password" required minLength={signup ? 8 : undefined} autoComplete={signup ? "new-password" : "current-password"} />
    {signup && <p className="muted">Use at least 8 characters. We’ll send an email to confirm your account.</p>}
    <div className="actions"><button disabled={pending} type="submit">{pending ? (signup ? "Creating account…" : "Signing in…") : (signup ? "Create account" : "Sign in")}</button></div>
  </form>;
}
