"use client";

import { useState } from "react";
import { useMessages } from "@/i18n/useMessages";

interface Props {
  siteId: string;
  initialName: string;
}

export function SiteNameForm({ siteId, initialName }: Props) {
  const t = useMessages();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [draft, setDraft] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    const trimmed = draft.trim();
    if (trimmed === name) {
      setEditing(false);
      return;
    }
    if (trimmed.length < 1 || trimmed.length > 100) {
      setError(t.siteName.nameLengthError);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/sites/${siteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError((json as { error?: string }).error ?? "Failed to save.");
        return;
      }
      setName(trimmed);
      setEditing(false);
    } catch {
      setError(t.siteName.networkError);
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(name);
      setEditing(false);
      setError("");
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={100}
            className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-blue-600 outline-none px-0 py-0.5 w-64"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? t.siteName.saving : t.siteName.save}
          </button>
          <button
            onClick={() => {
              setDraft(name);
              setEditing(false);
              setError("");
            }}
            className="text-xs px-3 py-1.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t.siteName.cancel}
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setDraft(name);
        setEditing(true);
      }}
      className="group flex items-center gap-2 text-left"
      title={t.siteName.clickToRename}
    >
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        {name}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
}
