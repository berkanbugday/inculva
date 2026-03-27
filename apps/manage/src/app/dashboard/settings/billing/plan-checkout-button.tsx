"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessages } from "@/i18n/useMessages";

export function PlanCheckoutButton({
  productId,
  label,
  popular = false,
}: {
  productId: string;
  label: string;
  popular?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useMessages();

  function handleClick() {
    if (!productId) return;
    setLoading(true);
    router.push(
      `/api/billing/checkout?productId=${encodeURIComponent(productId)}`,
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || !productId}
      className={`w-full py-3 px-6 text-sm font-semibold rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        popular
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-50 dark:bg-[#2a2a3e] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333350] border border-gray-200 dark:border-[#3a3a4e]"
      }`}
    >
      {loading ? t.billing.redirecting : label}
    </button>
  );
}
