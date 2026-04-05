"use client";

import { useState } from "react";
import { useMessages } from "@/i18n/useMessages";

interface Props {
  monthlyVariantId: string;
  yearlyVariantId: string;
  planName: string;
  monthlyUsd: number;
  yearlyUsd: number;
}

export function UpgradeButton({
  monthlyVariantId,
  yearlyVariantId,
  planName,
  monthlyUsd,
  yearlyUsd,
}: Props) {
  const t = useMessages();
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [loading, setLoading] = useState(false);

  const variantId = interval === "month" ? monthlyVariantId : yearlyVariantId;
  const monthlyEquiv = Math.round(yearlyUsd / 12);

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
      alert(data.error ?? t.billing.checkoutFailed);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* Interval toggle */}
      <div className="flex gap-1 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl p-1.5 w-fit shadow-sm">
        <button
          onClick={() => setInterval("month")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            interval === "month"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          {t.billing.monthly} — ${monthlyUsd}
          {t.billing.perMonth}
        </button>
        <button
          onClick={() => setInterval("year")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            interval === "year"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          {t.billing.yearly} — ${monthlyEquiv}
          {t.billing.perMonth}
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {t.billing.save17}
          </span>
        </button>
      </div>

      <button
        onClick={() => void handleCheckout()}
        disabled={loading || !variantId}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading
          ? t.billing.redirecting
          : t.billing.upgradeTo.replace("{plan}", planName)}
      </button>
    </div>
  );
}
