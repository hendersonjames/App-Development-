"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string; email?: string };

function errorMessage(code?: string) {
  switch (code) {
    case "email_not_confirmed": return "Confirm your email before signing in. Open the confirmation email, then return here.";
    case "invalid_credentials": return "The email or password is incorrect. If you just created an account, confirm your email first.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit": return "Too many attempts. Please wait a few minutes before trying again.";
    case "weak_password": return "Choose a stronger password with at least 8 characters.";
    case "user_already_exists": return "Try signing in with your existing account.";
    default: return "We could not complete that request. Please try again shortly.";
  }
}

export async function authenticate(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const mode = formData.get("mode");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address.", email };
  if (mode !== "signin" && mode !== "signup") return { error: "Choose Sign in or Create account.", email };
  if (!password || (mode === "signup" && password.length < 8)) return { error: mode === "signup" ? "Use a password with at least 8 characters." : "Enter your password.", email };
  const supabase = await createClient();
  if (mode === "signin") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: errorMessage(error.code), email };
    redirect("/trips");
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://app-development-ebon.vercel.app";
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: new URL("/auth/callback", siteUrl).toString() } });
  if (error) return { error: errorMessage(error.code), email };
  if (data.session) redirect("/trips");
  return { email, message: "Check your inbox and spam folder for a confirmation email. Confirm your email, then sign in with the password you chose. If you already have an account, sign in instead." };
}
