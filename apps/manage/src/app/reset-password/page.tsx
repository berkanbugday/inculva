"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@inculva/ui";
import { AuthBrandPanel } from "@/components/auth-brand-panel";
import { useMessages } from "@/i18n/useMessages";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full px-5 py-4 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow text-base";
const labelCls =
  "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const btnPrimary =
  "w-full py-4 px-6 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useMessages();
  const token = searchParams.get("token");

  const TIPS = [
    t.authTips.useEightChars,
    t.authTips.mixCharacters,
    t.authTips.avoidReuse,
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema as any) });

  useEffect(() => {
    if (!token) {
      setError("root", { message: t.auth.invalidToken });
    }
  }, [token, setError, t.auth.invalidToken]);

  async function onSubmit(data: FormData) {
    if (!token) return;
    const result = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });
    if (result.error) {
      setError("root", { message: result.error.message ?? t.auth.resetFailed });
      return;
    }
    router.push("/login?reset=1");
  }

  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel>
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-3">
            {t.auth.strongPasswordTitle.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            {t.auth.strongPasswordDesc}
          </p>
          <ul className="space-y-3" role="list">
            {TIPS.map((tip) => (
              <li
                key={tip}
                className="flex items-center gap-3 text-white/90 text-sm"
              >
                <div
                  className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
            <img
              src={`${CDN_URL}/logos/logo.png`}
              alt="inculva"
              className="h-10 w-auto mx-auto"
            />
          </div>

          <div className="flex items-center gap-3 mb-7">
            <div
              className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-2xl flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-600 dark:text-blue-400"
              >
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 11V7a4 4 0 0 1 8 0v4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1.2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                {t.auth.setNewPasswordTitle}
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400">
                {t.auth.setNewPasswordDesc}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label htmlFor="password" className={labelCls}>
                {t.auth.newPassword}
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

            <div>
              <label htmlFor="confirm" className={labelCls}>
                {t.auth.confirmPassword}
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat new password"
                aria-describedby={errors.confirm ? "confirm-error" : undefined}
                aria-invalid={!!errors.confirm}
                aria-required="true"
                className={inputCls}
                {...register("confirm")}
              />
              {errors.confirm && (
                <p
                  id="confirm-error"
                  role="alert"
                  className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                >
                  {errors.confirm.message}
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
              disabled={isSubmitting || !token}
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
              {isSubmitting ? t.auth.updatingPassword : t.auth.setNewPassword}
            </button>

            <p className="text-center text-base">
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2L3 6l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t.auth.backToSignIn}
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
