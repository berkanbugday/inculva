"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Plan = "free" | "small" | "medium" | "large";

export function AdminUserActions({ userId, currentPlan }: { userId: string; currentPlan: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function changePlan(plan: Plan) {
    if (!confirm(`Change this user's plan to ${plan}?`)) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/users/${userId}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const plans: Plan[] = ["free", "small", "medium", "large"];

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {plans.filter((p) => p !== currentPlan).map((plan) => (
        <button
          key={plan}
          onClick={() => void changePlan(plan)}
          disabled={busy}
          className="px-2 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded border border-blue-200 dark:border-blue-800 transition-colors disabled:opacity-50"
        >
          → {plan}
        </button>
      ))}
    </div>
  );
}

export function BanButton({ userId, isBanned }: { userId: string; isBanned: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const msg = isBanned
      ? "Unban this user?"
      : "Ban this user? Their sessions will be invalidated immediately.";
    if (!confirm(msg)) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/users/${userId}/ban`, {
        method: isBanned ? "DELETE" : "POST",
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={() => void toggle()}
      disabled={busy}
      className={`px-2 py-0.5 text-xs font-medium rounded border transition-colors disabled:opacity-50 ${
        isBanned
          ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 border-green-200 dark:border-green-800"
          : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 border-red-200 dark:border-red-800"
      }`}
    >
      {isBanned ? "Unban" : "Ban"}
    </button>
  );
}
