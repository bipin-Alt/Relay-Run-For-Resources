"use client";
import Link from "next/link";
import { Zap, ArrowRight, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  // Registration handling function sending request to the backend//
  async function HandleRegistration(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (formData.get("password") !== formData.get("confirm-password")) {
      setFeedback({
        type: "error",
        message: "Passwords didn't matched..",
      });
      return;
    }

    try {
      const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          confirmPassword: formData.get("confirm-password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
        console.log(data.message);
        return;
      }

      setFeedback({
        type: "success",
        message: data.message || "Account created successfully.",
      });
      form.reset();
      console.log(data);
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Network error. Please try again.",
      });
      console.log(error);
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md space-y-8 bg-zinc-900/60 border border-zinc-800/80 p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-md">
        {/* Header / Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 mb-2">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Create a Relay Account
          </h1>
          <p className="text-sm text-zinc-400">
            Join the platform to reserve server nodes and hardware labs
          </p>
        </div>

        {/* OAuth Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-sm font-medium text-zinc-200 transition-colors"
          >
            <Image
              src="/GitHub_Invertocat_White_Clearspace.svg"
              alt="GitHub"
              width={18}
              height={18}
            />
            GitHub
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-sm font-medium text-zinc-200 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-800 w-full" />
          <span className="bg-zinc-900 px-3 text-xs text-zinc-500 uppercase tracking-wider absolute">
            Or register with email
          </span>
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={HandleRegistration}>
          {feedback && (
            <div
              role="alert"
              className={`px-4 py-2.5 rounded-xl text-xs font-medium border ${
                feedback.type === "error"
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                name="name"
                type="text"
                placeholder="Alex Mercer"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                name="email"
                type="email"
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Registration Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-300">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 group mt-2"
          >
            Create Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
