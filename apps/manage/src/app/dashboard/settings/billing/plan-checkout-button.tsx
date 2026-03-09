"use client";

import { useState } from "react";

export function PlanCheckoutButton({ variantId, label }: { variantId: string; label: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!variantId) return;
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
    <button
      onClick={() => void handleClick()}
      disabled={loading || !variantId}
      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting…" : label}
    </button>
  );
}
