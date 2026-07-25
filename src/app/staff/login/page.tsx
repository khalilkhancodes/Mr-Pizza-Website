"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { staffLogin } from "@/app/actions/auth";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/staff/orders";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      await staffLogin(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16 lg:py-24">
      <div className="w-full max-w-md px-4">
        <div className="bg-surface border border-border p-8 lg:p-10 animate-slide-up">
          <div className="text-center mb-8">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-2 block">
              staff access
            </span>
            <h1 className="font-display text-2xl text-primary-text uppercase tracking-[1px]">
              sign in
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="redirect" value={redirectTo} />

            {error && (
              <div className="p-4 bg-error/10 border border-error/30 text-error font-body text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/70 mb-2 block"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                {/* Email Icon (Left) */}
                <svg
                  className="w-5 h-5 absolute left-[8px] text-primary-text/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="staff@mrpizza.pk"
                  className="w-full h-12 pl-10 px-4 py-[20px] font-body text-sm text-primary-text bg-surface-elevated border border-border placeholder:text-primary-text/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Input Field with Show/Hide Toggle */}
            <div>
              <label
                className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/70 mb-2 block"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative flex items-center">
                {/* Lock Icon (Left) */}
                <svg
                  className="w-5 h-5 absolute left-[8px] text-primary-text/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full h-12 pl-10 px-4 py-[20px] font-body text-sm text-primary-text bg-surface-elevated border border-border placeholder:text-primary-text/40 focus:outline-none focus:border-gold transition-colors"
                />

                {/* Show/Hide Button (Right) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[8px] text-primary-text/40 hover:text-gold transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-[16px]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="font-body text-xs tracking-[1px] text-primary-text/50 text-center">
              Forgot password?{" "}
              <a
                href="/staff/reset-password"
                className="text-gold hover:underline"
              >
                Reset it
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
