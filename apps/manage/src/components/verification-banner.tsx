"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useDashboard } from "./dashboard-layout-content";

interface Props {
  email: string;
}

export function VerificationBanner({ email }: Props) {
  const { messages: t } = useDashboard();
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (dismissed) return null;

  async function handleResend() {
    setSending(true);
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/dashboard",
    });
    setSent(true);
    setSending(false);
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800 px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <span className="font-medium">{t.verification.verifyEmail}</span>{" "}
          {t.verification.unlockFeatures}{" "}
          <span className="font-medium">{email}</span>.
        </p>

        <div className="flex items-center gap-3 shrink-0">
          {sent ? (
            <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">
              {t.verification.checkInbox}
            </span>
          ) : (
            <button
              onClick={() => void handleResend()}
              disabled={sending}
              className="text-sm font-medium text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 underline underline-offset-2 disabled:opacity-50"
            >
              {sending ? t.verification.sending : t.verification.resend}
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 text-xl leading-none font-light"
            aria-label={t.verification.dismiss}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
