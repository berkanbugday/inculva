"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteAccount() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirm !== "delete") return;
    setLoading(true);
    setError(null);

    const res = await fetch("/api/account/delete", { method: "DELETE" });
    const data = (await res.json()) as { ok: boolean; error?: string };

    if (!data.ok) {
      setError(data.error ?? "Failed to delete account");
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <div className="bg-white rounded-2xl border border-red-200 p-6">
      <h3 className="font-semibold text-red-700 mb-1">Danger Zone</h3>
      <p className="text-sm text-gray-500 mb-4">
        Permanently delete your account, all sites, analytics data, and
        cancel your subscription. This cannot be undone.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Delete account
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Type <strong className="font-mono">delete</strong> to confirm:
          </p>
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="delete"
            autoComplete="off"
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => void handleDelete()}
              disabled={confirm !== "delete" || loading}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting…" : "Permanently delete account"}
            </button>
            <button
              onClick={() => { setOpen(false); setConfirm(""); }}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
