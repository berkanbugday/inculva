"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@inculva/ui";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    if (result.error) {
      setError(result.error.message ?? "Something went wrong");
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img src={`${CDN_URL}/logos/logo.png`} alt="Inculva" className="h-8 w-auto" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-green-600 dark:text-green-400"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M2 8l10 7 10-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Check your inbox
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                We sent a reset link to{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {email}
                </span>
                . The link expires in 1 hour.
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M8 2L3 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to sign in
              </a>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Forgot password?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form
                onSubmit={(e) => void handleSubmit(e)}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 5v4M8 11v.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2",
                    loading && "opacity-60 cursor-not-allowed",
                  )}
                >
                  {loading && (
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {loading ? "Sending…" : "Send reset link"}
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Remember it?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
