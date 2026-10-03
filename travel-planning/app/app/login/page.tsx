import Link from "next/link";
import { AuthForm } from "./auth-form";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams;
  return <main className="shell">
    <p className="eyebrow">Travel Planning</p><h1>Sign in</h1>
    <p className="muted">Use the email and password you chose when creating your account.</p>
    {params.error && <p role="alert">{params.error === "confirmation" ? "That confirmation link is missing, invalid, or expired. Try signing in if you already confirmed your email." : "Sign-in was unsuccessful. Check your email and password, and confirm your email if you just created an account."}</p>}
    {params.message === "check-email" && <p role="status">Check your inbox and spam folder. Confirm your email before signing in.</p>}
    <AuthForm mode="signin" />
    <p>New here? <Link href="/signup">Create an account</Link></p>
  </main>;
}
