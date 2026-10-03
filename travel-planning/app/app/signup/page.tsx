import Link from "next/link";
import { AuthForm } from "../login/auth-form";
export default function Signup() {
  return <main className="shell">
    <p className="eyebrow">Travel Planning</p><h1>Create account</h1>
    <p className="muted">Create your account to save your trips.</p>
    <AuthForm mode="signup" />
    <p>Already have an account? <Link href="/login">Sign in</Link></p>
  </main>;
}
