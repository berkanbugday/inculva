"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { cn } from "@inculva/ui";
import { useDashboard } from "@/components/dashboard-layout-content";

type NameData = { name: string };
type PwData = { currentPassword: string; newPassword: string };

interface Props {
  name: string | null;
  email: string;
}

const inputCls =
  "w-full px-4 py-3 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

export function ProfileForm({ name, email }: Props) {
  const { messages: t } = useDashboard();
  const [nameSaved, setNameSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const nameSchema = z.object({
    name: z
      .string()
      .min(1, t.auth.nameMinChars)
      .max(100, t.auth.nameMaxChars),
  });
  const pwSchema = z.object({
    currentPassword: z.string().min(1, t.auth.currentPasswordRequired),
    newPassword: z.string().min(8, t.auth.passwordMinChars),
  });

  const nameForm = useForm<NameData>({
    resolver: zodResolver(nameSchema as any),
    defaultValues: { name: name ?? "" },
  });
  const pwForm = useForm<PwData>({ resolver: zodResolver(pwSchema as any) });

  async function onNameSave(data: NameData) {
    setNameSaved(false);
    const result = await authClient.updateUser({ name: data.name });
    if (result.error) {
      nameForm.setError("root", {
        message: result.error.message ?? t.settings.failedToUpdateName,
      });
      return;
    }
    setNameSaved(true);
  }

  async function onPasswordChange(data: PwData) {
    setPwSaved(false);
    const result = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: false,
    });
    if (result.error) {
      pwForm.setError("root", {
        message: result.error.message ?? t.settings.failedToChangePassword,
      });
      return;
    }
    setPwSaved(true);
    pwForm.reset();
  }

  return (
    <div className="space-y-6">
      {/* Profile section */}
      <section
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8"
        aria-labelledby="profile-heading"
      >
        <h3
          id="profile-heading"
          className="text-lg font-bold text-gray-900 dark:text-white mb-5"
        >
          {t.settings.profile}
        </h3>
        <form
          onSubmit={nameForm.handleSubmit(onNameSave)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="display-name"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.settings.name}
            </label>
            <input
              id="display-name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              aria-describedby={
                nameForm.formState.errors.name ? "name-error" : undefined
              }
              aria-invalid={!!nameForm.formState.errors.name}
              className={inputCls}
              {...nameForm.register("name")}
              onChange={(e) => {
                void nameForm.register("name").onChange(e);
                setNameSaved(false);
              }}
            />
            {nameForm.formState.errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {nameForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              {t.settings.emailAddress}
            </label>
            <p
              className="px-4 py-3 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-base text-gray-600 dark:text-gray-400"
            >
              {email}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
              {t.settings.emailChangeHint}
            </p>
          </div>

          {nameForm.formState.errors.root && (
            <p
              role="alert"
              className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl"
            >
              {nameForm.formState.errors.root.message}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={nameForm.formState.isSubmitting}
              aria-busy={nameForm.formState.isSubmitting}
              className={cn(
                "px-6 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors",
                nameForm.formState.isSubmitting &&
                  "opacity-60 cursor-not-allowed",
              )}
            >
              {nameForm.formState.isSubmitting ? t.settings.saving : t.settings.save}
            </button>
            {nameSaved && (
              <span
                role="status"
                aria-live="polite"
                className="text-sm text-green-600 dark:text-green-400 font-medium"
              >
                &#10003; {t.settings.saved}
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Change Password section */}
      <section
        className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8"
        aria-labelledby="pw-heading"
      >
        <h3
          id="pw-heading"
          className="text-lg font-bold text-gray-900 dark:text-white mb-5"
        >
          {t.settings.changePassword}
        </h3>
        <form
          onSubmit={pwForm.handleSubmit(onPasswordChange)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="current-password"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.auth.currentPassword}
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-describedby={
                pwForm.formState.errors.currentPassword
                  ? "curr-pw-error"
                  : undefined
              }
              aria-invalid={!!pwForm.formState.errors.currentPassword}
              className={inputCls}
              {...pwForm.register("currentPassword")}
              onChange={(e) => {
                void pwForm.register("currentPassword").onChange(e);
                setPwSaved(false);
              }}
            />
            {pwForm.formState.errors.currentPassword && (
              <p
                id="curr-pw-error"
                role="alert"
                className="mt-1.5 text-sm text-red-600 dark:text-red-400"
              >
                {pwForm.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              {t.auth.newPassword}
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              aria-describedby={[
                "new-pw-hint",
                pwForm.formState.errors.newPassword
                  ? "new-pw-error"
                  : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-invalid={!!pwForm.formState.errors.newPassword}
              className={inputCls}
              {...pwForm.register("newPassword")}
              onChange={(e) => {
                void pwForm.register("newPassword").onChange(e);
                setPwSaved(false);
              }}
            />
            <p
              id="new-pw-hint"
              className="text-sm text-gray-400 dark:text-gray-600 mt-1"
            >
              {t.auth.minChars}
            </p>
            {pwForm.formState.errors.newPassword && (
              <p
                id="new-pw-error"
                role="alert"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {pwForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {pwForm.formState.errors.root && (
            <p
              role="alert"
              className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-4 py-3 rounded-xl"
            >
              {pwForm.formState.errors.root.message}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={pwForm.formState.isSubmitting}
              aria-busy={pwForm.formState.isSubmitting}
              className={cn(
                "px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full text-base font-semibold hover:bg-gray-700 dark:hover:bg-white transition-colors",
                pwForm.formState.isSubmitting &&
                  "opacity-60 cursor-not-allowed",
              )}
            >
              {pwForm.formState.isSubmitting ? t.settings.updating : t.settings.changePasswordBtn}
            </button>
            {pwSaved && (
              <span
                role="status"
                aria-live="polite"
                className="text-sm text-green-600 dark:text-green-400 font-medium"
              >
                &#10003; {t.settings.passwordUpdated}
              </span>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
