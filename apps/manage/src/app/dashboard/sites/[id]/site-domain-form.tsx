"use client";

import { useState } from "react";

interface Props {
  siteId: string;
  initialDomain: string;
  onDomainChange?: (domain: string) => void;
}

export function SiteDomainForm({ siteId, initialDomain, onDomainChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [domain, setDomain] = useState(initialDomain);
  const [draft, setDraft] = useState(initialDomain);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    // Strip protocol/trailing path so pasted URLs work
    const trimmed = draft.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
    if (trimmed === domain) {
      setEditing(false);
      return;
    }
    if (trimmed.length < 1) {
      setError("Domain cannot be empty.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/sites/${siteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: trimmed }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((json as { error?: string }).error ?? "Failed to save.");
        return;
      }
      setDomain(trimmed);
      setDraft(trimmed);
      setEditing(false);
      onDomainChange?.(trimmed);
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") void handleSave();
    if (e.key === "Escape") { setDraft(domain); setEditing(false); setError(""); }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 select-none">Domain</span>
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={253}
            placeholder="example.com or localhost:3002"
            className="text-sm text-gray-700 dark:text-gray-300 bg-transparent border-b-2 border-blue-600 outline-none px-0 py-0.5 w-64 font-mono"
          />
          <button
            onClick={() => void handleSave()}
            disabled={saving}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => { setDraft(domain); setEditing(false); setError(""); }}
            className="text-xs px-3 py-1.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 ml-14">
          You can paste a full URL — the protocol will be stripped automatically.
        </p>
        {error && <p className="text-xs text-red-500 ml-14">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => { setDraft(domain); setEditing(true); }}
      className="group flex items-center gap-1.5 text-left"
      title="Click to change domain"
    >
      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{domain}</span>
      <svg
        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
}
