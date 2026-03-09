"use client";

import { useState } from "react";

interface Props {
  monthlyVariantId: string;
  annualVariantId: string;
  planName: string;
  monthlyUsd: number;
  annualUsd: number;
}

export function UpgradeButton({
  monthlyVariantId,
  annualVariantId,
  planName,
  monthlyUsd,
  annualUsd,
}: Props) {
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [loading, setLoading] = useState(false);

  const variantId = interval === "month" ? monthlyVariantId : annualVariantId;
  const monthlyEquiv = Math.round(annualUsd / 12);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId }),
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error ?? "Failed to start checkout");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* Interval toggle */}
      <div className="flex gap-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg p-1 w-fit">
        <button
          onClick={() => setInterval("month")}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            interval === "month"
              ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
              : "text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
          }`}
        >
          Monthly — ${monthlyUsd}/mo
        </button>
        <button
          onClick={() => setInterval("year")}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
            interval === "year"
              ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
              : "text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
          }`}
        >
          Annual — ${monthlyEquiv}/mo
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            SAVE 17%
          </span>
        </button>
      </div>

      <button
        onClick={() => void handleCheckout()}
        disabled={loading || !variantId}
        className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting…" : `Upgrade to ${planName} →`}
      </button>
    </div>
  );
}
