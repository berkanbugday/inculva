"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function InviteActions({ token }: { token: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function act(action: "accept" | "decline") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/invites/${token}/${action}`, { method: "POST" });
      if (!res.ok) {
        const json = await res.json() as { error?: string };
        setError(json.error ?? "Something went wrong");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1 shrink-0">
      <div className="flex gap-2">
        <button
          onClick={() => void act("decline")}
          disabled={busy}
          className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          Decline
        </button>
        <button
          onClick={() => void act("accept")}
          disabled={busy}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Accept
        </button>
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
