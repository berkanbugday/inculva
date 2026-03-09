"use client";

import { useState } from "react";

interface Props {
  userId: string;
  currentPlan: string;
}

const PLANS = ["free", "pro", "business"] as const;

export function ChangePlanForm({ userId, currentPlan }: Props) {
  const [selected, setSelected] = useState(currentPlan);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected === currentPlan) return;
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/users/${userId}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      if (res.ok) {
        setSaved(true);
        // Brief success flash then reload row data
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {PLANS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading || selected === currentPlan}
        className="text-xs px-2.5 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Saving…" : saved ? "Saved!" : "Save"}
      </button>
    </form>
  );
}
