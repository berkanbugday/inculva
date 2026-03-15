"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@inculva/ui";
import { OAuthButtons, OAuthDivider } from "@/components/oauth-buttons";
import { AuthBrandPanel } from "@/components/auth-brand-panel";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

const FEATURES = [
  "One script tag — live in minutes",
  "25 real accessibility features",
  "41 languages including RTL",
  "WCAG 2.1 AA & EAA 2025 ready",
];

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full px-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl") ?? "/dashboard";
  const callbackUrl =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : "/dashboard";
  const passwordReset = searchParams.get("reset") === "1";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const result = await signIn.email({ email: data.email, password: data.password });
    if (result.error) {
      setError("root", { message: result.error.message ?? "Login failed" });
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel>
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-3">
            Make your website<br />accessible to everyone.
          </h2>
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            Add real accessibility features to any site in under 5 minutes.
          </p>
          <ul className="space-y-3" role="list">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </AuthBrandPanel>

      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <img src={`${CDN_URL}/logos/logo.png`} alt="Inculva — Web Accessibility Platform" className="h-10 w-auto mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base mb-7">
            Sign in to manage your accessible sites.
          </p>

          {passwordReset && (
            <div role="status" aria-live="polite" className="mb-5 flex items-start gap-2.5 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm text-green-700 dark:text-green-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Password updated successfully. Sign in with your new password.
            </div>
          )}

          <OAuthButtons callbackURL={callbackUrl} />
          <OAuthDivider />

          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Sign in to your account" className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                aria-required="true"
                className={inputCls}
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                aria-required="true"
                className={inputCls}
                {...register("password")}
              />
              {errors.password && (
                <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.root && (
              <div role="alert" className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-label={isSubmitting ? "Signing in, please wait" : "Sign in to your account"}
              className={cn(
                "w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2",
                isSubmitting && "opacity-60 cursor-not-allowed",
              )}
            >
              {isSubmitting && (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                  <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>

            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Sign up free
              </a>
            </p>
          </form>
        </div>
      </main>
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
