"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  renewalDate: string; // formatted date
}

export function CancelSubscriptionButton({ renewalDate }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

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

    setDone(true);
    setLoading(false);
    setConfirming(false);
    router.refresh();
  }

  if (done) {
    return (
      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3">
        Your subscription will be canceled at the end of the current billing period.
      </p>
    );
  }

  if (confirming) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
        <p className="text-sm text-red-800 font-medium">
          Cancel your subscription?
        </p>
        <p className="text-sm text-red-700">
          You'll keep access until <strong>{renewalDate}</strong>. After that,
          you'll be downgraded to the Free plan (1 site, 10k events/mo).
        </p>
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => void handleCancel()}
            disabled={loading}
            className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Canceling…" : "Yes, cancel"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-5 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 text-sm font-semibold border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Keep subscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-red-600 hover:text-red-700 hover:underline"
    >
      Cancel subscription
    </button>
  );
}
