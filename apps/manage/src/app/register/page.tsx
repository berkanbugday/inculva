"use client";

import { useState, Suspense } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@inculva/ui";
import { OAuthButtons, OAuthDivider } from "@/components/oauth-buttons";

const STATS = [
  { value: "25", label: "Accessibility features" },
  { value: "41", label: "Languages" },
  { value: "24KB", label: "Bundle size" },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signUp.email({ name, email, password });

    if (result.error) {
      setError(result.error.message ?? "Registration failed");
      setLoading(false);
      return;
    }

    void fetch("/api/auth/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const ref = searchParams.get("ref");
    if (ref) {
      void fetch("/api/referrals/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: ref }),
      });
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[42%] bg-gradient-to-br from-indigo-600 to-blue-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-8 w-48 h-48 rounded-full bg-white/3" />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <img src="/logo-dark.png" alt="Inculva" className="h-8 w-auto" />
        </div>

        {/* Middle */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Join thousands of sites
            <br />
            making the web inclusive.
          </h2>
          <p className="text-indigo-100 text-sm mb-10 leading-relaxed">
            Free plan forever. No credit card required. Up and running in under
            5 minutes.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 border border-white/10 rounded-xl p-3 text-center"
              >
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-indigo-200 text-xs mt-0.5 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-4">
            <p className="text-white/90 text-sm leading-relaxed italic mb-3">
              &ldquo;Set up in 3 minutes. Our accessibility score went from D to
              A. The EAA compliance banner alone saved us weeks of work.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Maria V.</p>
                <p className="text-indigo-200 text-xs">
                  Frontend Lead, EU SaaS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
          <p className="text-white/60 text-xs font-medium mb-1 uppercase tracking-widest">
            Standards
          </p>
          <p className="text-white font-semibold text-sm">
            WCAG 2.1 AA · EAA 2025 · ADA · Section 508
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <img
              src="/logo-dark.png"
              alt="Inculva"
              className="h-10 w-auto mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Create your account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-7">
            Free forever. No credit card required.
          </p>

          <OAuthButtons />
          <OAuthDivider />

          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                placeholder="Min. 8 characters"
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
              {loading ? "Creating account…" : "Create free account"}
            </button>

            <p className="text-center text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
              By signing up you agree to our{" "}
              <a
                href="/terms"
                className="underline hover:text-gray-700 dark:hover:text-gray-400"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline hover:text-gray-700 dark:hover:text-gray-400"
              >
                Privacy Policy
              </a>
              .
            </p>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
