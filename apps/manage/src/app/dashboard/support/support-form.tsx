"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@inculva/ui";
import { useDashboard } from "@/components/dashboard-layout-content";

const inputCls =
  "w-full px-4 py-3 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

const selectCls =
  "w-full px-4 py-3 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none cursor-pointer";

const textareaCls =
  "w-full px-4 py-3 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-y min-h-[140px]";

type FormState = "idle" | "success" | "error";

interface Props {
  userName: string | null;
  userEmail: string;
}

export function SupportForm({ userName, userEmail }: Props) {
  const { messages: t } = useDashboard();
  const [formState, setFormState] = useState<FormState>("idle");

  const schema = z.object({
    name: z.string().min(1, t.support.nameRequired),
    email: z
      .string()
      .min(1, t.support.emailRequired)
      .email(t.support.emailInvalid),
    category: z.string().min(1, t.support.categoryRequired),
    subject: z.string().min(1, t.support.subjectRequired),
    message: z
      .string()
      .min(1, t.support.messageRequired)
      .min(10, t.support.messageMinLength),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: userName ?? "",
      email: userEmail,
      category: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    setFormState("idle");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormState("success");
        reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 dark:text-green-400"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t.support.successTitle}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          {t.support.successDesc}
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {t.support.sendAnother}
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">
      {formState === "error" && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {t.support.errorTitle}
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {t.support.errorDesc}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="support-name"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.support.nameLabel}
            </label>
            <input
              id="support-name"
              type="text"
              autoComplete="name"
              placeholder={t.support.namePlaceholder}
              aria-describedby={errors.name ? "support-name-error" : undefined}
              aria-invalid={!!errors.name}
              className={inputCls}
              {...register("name")}
            />
            {errors.name && (
              <p
                id="support-name-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="support-email"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.support.emailLabel}
            </label>
            <input
              id="support-email"
              type="email"
              autoComplete="email"
              placeholder={t.support.emailPlaceholder}
              aria-describedby={
                errors.email ? "support-email-error" : undefined
              }
              aria-invalid={!!errors.email}
              className={inputCls}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="support-email-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label
              htmlFor="support-category"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.support.categoryLabel}
            </label>
            <div className="relative">
              <select
                id="support-category"
                aria-describedby={
                  errors.category ? "support-category-error" : undefined
                }
                aria-invalid={!!errors.category}
                className={selectCls}
                {...register("category")}
              >
                <option value="" disabled>
                  {t.support.categoryLabel}
                </option>
                <option value="general">{t.support.categoryGeneral}</option>
                <option value="bug">{t.support.categoryBug}</option>
                <option value="feature">{t.support.categoryFeature}</option>
                <option value="billing">{t.support.categoryBilling}</option>
                <option value="accessibility">
                  {t.support.categoryAccessibility}
                </option>
              </select>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                aria-hidden="true"
              >
                <path
                  d="M3 5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {errors.category && (
              <p
                id="support-category-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="support-subject"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.support.subjectLabel}
            </label>
            <input
              id="support-subject"
              type="text"
              placeholder={t.support.subjectPlaceholder}
              aria-describedby={
                errors.subject ? "support-subject-error" : undefined
              }
              aria-invalid={!!errors.subject}
              className={inputCls}
              {...register("subject")}
            />
            {errors.subject && (
              <p
                id="support-subject-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="support-message"
            className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {t.support.messageLabel}
          </label>
          <textarea
            id="support-message"
            rows={5}
            placeholder={t.support.messagePlaceholder}
            aria-describedby={
              errors.message ? "support-message-error" : undefined
            }
            aria-invalid={!!errors.message}
            className={textareaCls}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="support-message-error"
              role="alert"
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            "px-6 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors cursor-pointer",
            isSubmitting && "opacity-60 cursor-not-allowed",
          )}
        >
          {isSubmitting ? t.support.submitting : t.support.submit}
        </button>
      </form>
    </section>
  );
}
