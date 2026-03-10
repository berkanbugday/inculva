"use client";

import { useState, Suspense } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@inculva/ui";
import { OAuthButtons, OAuthDivider } from "@/components/oauth-buttons";

const FEATURES = [
  "One script tag — live in minutes",
  "25 real accessibility features",
  "41 languages including RTL",
  "WCAG 2.1 AA & EAA 2025 ready",
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") ?? "/dashboard";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/dashboard";
  const passwordReset = searchParams.get("reset") === "1";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn.email({ email, password });
    if (result.error) {
      setError(result.error.message ?? "Login failed");
      setLoading(false);
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-gradient-to-br from-blue-600 to-indigo-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle background circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5" />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="4.5" r="2.2" fill="white" />
              <path d="M5.5 10h13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8.5v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 20l2-5.5M15 20l-2-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Inculva</span>
        </div>

        {/* Middle */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white leading-tight mb-3">
            Make your website<br />accessible to everyone.
          </h2>
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            Add real accessibility features to any site in under 5 minutes.
          </p>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
          <p className="text-white/60 text-xs font-medium mb-1 uppercase tracking-widest">Standards</p>
          <p className="text-white font-semibold text-sm">WCAG 2.1 AA · EAA 2025 · ADA · Section 508</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="4.5" r="2.2" fill="white" />
                <path d="M5.5 10h13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8.5v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 20l2-5.5M15 20l-2-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Inculva</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-7">
            Sign in to your dashboard to manage your sites.
          </p>

          {passwordReset && (
            <div className="mb-5 flex items-start gap-2.5 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm text-green-700 dark:text-green-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Password updated successfully. Sign in with your new password.
            </div>
          )}

          <OAuthButtons callbackURL={callbackUrl} />
          <OAuthDivider />

          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2",
                loading && "opacity-60 cursor-not-allowed"
              )}
            >
              {loading && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                  <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Sign up free
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
