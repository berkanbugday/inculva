"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { cn } from "@inculva/ui";
import { AuthBrandPanel } from "@/components/auth-brand-panel";
import { useMessages } from "@/i18n/useMessages";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full px-5 py-4 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow text-base";
const labelCls = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const btnPrimary =
  "w-full py-4 px-6 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

export default function ForgotPasswordPage() {
  const t = useMessages();
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema as any) });

  const TIPS = [
    t.authTips.checkSpam,
    t.authTips.resetLinkValid,
    t.authTips.strongPassword,
  ];

  async function onSubmit(data: FormData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (authClient as any).requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });
    if (result.error) {
      setError("root", { message: result.error.message ?? "Something went wrong" });
      return;
    }
    setSentEmail(data.email);
  }

  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel>
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-3">
            {t.auth.secureRecovery.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            {t.auth.secureRecoveryDesc}
          </p>
          <ul className="space-y-3" role="list">
            {TIPS.map((tip) => (
              <li key={tip} className="flex items-center gap-3 text-white/90 text-sm">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </AuthBrandPanel>

      <main className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fc] dark:bg-[#0e0e10]">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <img src={`${CDN_URL}/logos/logo.png`} alt="Inculva" className="h-10 w-auto mx-auto" />
          </div>

          {sentEmail ? (
            <div aria-live="polite" role="status">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-2xl flex items-center justify-center mb-5" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-600 dark:text-green-400">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t.auth.checkInbox}</h1>
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {t.auth.checkInboxDesc}{" "}
                <strong className="font-semibold text-gray-700 dark:text-gray-200">{sentEmail}</strong>.{" "}
                {t.auth.resetLinkExpiry}
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-1.5 text-base text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M8 2L3 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.auth.backToSignIn}
              </a>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{t.auth.forgotPasswordTitle}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                {t.auth.forgotPasswordDesc}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <label htmlFor="email" className={labelCls}>{t.auth.email}</label>
                  <input
                    id="email" type="email" autoComplete="email" placeholder="you@example.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email} aria-required="true"
                    className={inputCls} {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
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
                  type="submit" disabled={isSubmitting} aria-busy={isSubmitting}
                  className={cn(btnPrimary)}
                >
                  {isSubmitting && (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
                      <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {isSubmitting ? t.auth.sendingResetLink : t.auth.sendResetLink}
                </button>

                <p className="text-center text-base text-gray-500 dark:text-gray-400">
                  {t.auth.rememberPassword}{" "}
                  <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">{t.auth.signIn}</a>
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
