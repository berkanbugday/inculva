"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CancelSubscriptionButton({ renewalDate }: { renewalDate: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/billing/cancel-subscription", { method: "POST" });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? "Cancellation failed");
      setLoading(false);
      return;
    }
    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
      >
        Cancel subscription
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2a2a3e] p-6 space-y-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2L2 17h16L10 2z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 8v4M10 14.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <div>
              <h2 id="cancel-dialog-title" className="text-base font-bold text-gray-900 dark:text-white">
                Cancel subscription?
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                You&apos;ll keep full access until{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">{renewalDate}</span>.
                After that, your account will move to the Free plan.
              </p>
            </div>

            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => void handleCancel()}
                disabled={loading}
                className="cursor-pointer flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Canceling…" : "Yes, cancel"}
              </button>
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="cursor-pointer flex-1 py-2.5 bg-gray-100 dark:bg-[#2a2a3e] hover:bg-gray-200 dark:hover:bg-[#333350] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                Keep plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
