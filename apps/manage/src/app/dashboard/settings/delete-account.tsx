"use client";

import { useState } from "react";
import { useDashboard } from "@/components/dashboard-layout-content";

export function DeleteAccount() {
  const { messages: t } = useDashboard();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirm !== t.settings.typeDeleteConfirm) return;
    setLoading(true);
    setError(null);

    const res = await fetch("/api/account/delete", { method: "DELETE" });

    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }

    const data = (await res.json()) as { ok: boolean; error?: string };

    if (!data.ok) {
      setError(data.error ?? t.settings.failedToDeleteAccount);
      setLoading(false);
      return;
    }

    window.location.href = "/login";
  }

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 border-l-4 border-red-500">
      <h3 className="font-semibold text-red-700 mb-1">
        {t.settings.dangerZone}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {t.settings.deleteAccountDesc}
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          {t.settings.deleteAccount}
        </button>
      ) : (
        <div className="space-y-4">
          <p
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: t.settings.deleteAccountConfirm,
            }}
          />
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder={t.settings.deleteAccountPlaceholder}
            autoComplete="off"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => void handleDelete()}
              disabled={confirm !== t.settings.typeDeleteConfirm || loading}
              className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? t.settings.deleting
                : t.settings.deleteAccountPermanent}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setConfirm("");
              }}
              className="px-5 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full border border-[#e8eaf0] dark:border-[#2a2a3e] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {t.settings.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
