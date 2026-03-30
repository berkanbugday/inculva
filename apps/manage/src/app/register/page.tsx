"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@inculva/ui";
import { OAuthButtons, OAuthDivider } from "@/components/oauth-buttons";
import { AuthBrandPanel } from "@/components/auth-brand-panel";
import { useMessages } from "@/i18n/useMessages";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

type FormData = { name: string; email: string; password: string };

const inputCls =
  "w-full px-5 py-4 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow text-base";
const labelCls =
  "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const btnPrimary =
  "w-full py-4 px-6 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

function RegisterForm() {
  const router = useRouter();
  const t = useMessages();
  const schema = z.object({
    name: z.string().min(2, t.auth.nameMinChars),
    email: z.string().email(t.auth.validEmail),
    password: z.string().min(8, t.auth.passwordMinChars),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema as any) });

  async function onSubmit(data: FormData) {
    const result = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (result.error) {
      setError("root", {
        message: result.error.message ?? t.auth.registrationFailed,
      });
      return;
    }
    void fetch("/api/auth/welcome", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email }),
    });
    router.push("/dashboard");
  }

  const STATS = [
    { value: "25", label: t.authStats.features },
    { value: "41", label: t.authStats.languages },
    { value: "24KB", label: t.authStats.bundleSize },
  ];

  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel>
        <div>
          <h2 className="text-3xl font-black text-white leading-tight mb-4">
            {t.authBrand.joinSites.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-indigo-100 text-sm mb-10 leading-relaxed">
            {t.authBrand.joinSitesDesc}
          </p>
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
          <div className="bg-white/10 border border-white/15 rounded-2xl px-5 py-4">
            <p className="text-white/90 text-sm leading-relaxed italic mb-3">
              {t.authTestimonial.quote}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  {t.authTestimonial.name}
                </p>
                <p className="text-indigo-200 text-xs">
                  {t.authTestimonial.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AuthBrandPanel>

      <main className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fc] dark:bg-[#0e0e10]">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <img
              src={`${CDN_URL}/logos/logo.png`}
              alt="inculva"
              className="h-10 w-auto mx-auto"
            />
          </div>

          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
            {t.auth.createYourAccount}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            {t.auth.createAccountDesc}
          </p>

          <OAuthButtons />
          <OAuthDivider />

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className={labelCls}>
                {t.auth.fullName}
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={!!errors.name}
                aria-required="true"
                className={inputCls}
                {...register("name")}
              />
              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelCls}>
                {t.auth.email}
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
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={labelCls}>
                {t.auth.password}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                aria-describedby={[
                  "pw-hint",
                  errors.password ? "pw-error" : undefined,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-invalid={!!errors.password}
                aria-required="true"
                className={inputCls}
                {...register("password")}
              />
              <p
                id="pw-hint"
                className="mt-1 text-sm text-gray-400 dark:text-gray-600"
              >
                {t.auth.minChars}
              </p>
              {errors.password && (
                <p
                  id="pw-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.root && (
              <div
                role="alert"
                className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
              >
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
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={cn(btnPrimary)}
            >
              {isSubmitting && (
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
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
              {isSubmitting ? t.auth.creatingAccount : t.auth.createAccount}
            </button>

            <p className="text-center text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
              {t.auth.agreeTerms}{" "}
              <a
                href="/terms"
                className="underline hover:text-gray-700 dark:hover:text-gray-400"
              >
                {t.auth.terms}
              </a>{" "}
              {t.auth.and}{" "}
              <a
                href="/privacy"
                className="underline hover:text-gray-700 dark:hover:text-gray-400"
              >
                {t.auth.privacyPolicy}
              </a>
              .
            </p>
            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              {t.auth.haveAccount}{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                {t.auth.signIn}
              </a>
            </p>
          </form>
        </div>
      </main>
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
