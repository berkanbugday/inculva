"use client";

import { useState } from "react";
import { useDashboard } from "@/components/dashboard-layout-content";

interface Props {
  siteId: string;
  initialDomain: string;
  onDomainChange?: (domain: string) => void;
}

function normalizeDomain(raw: string): string {
  return raw.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").toLowerCase();
}

export function SiteDomainForm({ siteId, initialDomain, onDomainChange }: Props) {
  const { messages: t } = useDashboard();
  const [editing, setEditing] = useState(false);
  const [domain, setDomain] = useState(initialDomain);
  const [draft, setDraft] = useState(initialDomain);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dnsStatus, setDnsStatus] = useState<
    "idle" | "checking" | "valid" | "invalid" | "error"
  >("idle");

  async function checkDns(d: string): Promise<boolean> {
    setDnsStatus("checking");
    try {
      const res = await fetch("/api/dns-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: d }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (data.ok) {
        setDnsStatus("valid");
        return true;
      }
      setDnsStatus("invalid");
      return false;
    } catch {
      setDnsStatus("error");
      return false;
    }
  }

  async function handleSave() {
    const trimmed = normalizeDomain(draft);
    if (trimmed === domain) {
      setEditing(false);
      return;
    }
    if (trimmed.length < 1) {
      setError(t.config.domainEmpty);
      return;
    }

    setError("");

    const dnsOk = await checkDns(trimmed);
    if (!dnsOk) return;

    setSaving(true);
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
      setDnsStatus("idle");
      onDomainChange?.(trimmed);
    } catch {
      setError(t.config.domainNetworkError);
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") void handleSave();
    if (e.key === "Escape") { setDraft(domain); setEditing(false); setError(""); setDnsStatus("idle"); }
  }

  function handleCancel() {
    setDraft(domain);
    setEditing(false);
    setError("");
    setDnsStatus("idle");
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 select-none">{t.config.domainLabel}</span>
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setDnsStatus("idle"); }}
            onKeyDown={handleKeyDown}
            maxLength={253}
            placeholder="example.com"
            className="text-sm text-gray-700 dark:text-gray-300 bg-transparent border-b-2 border-blue-600 outline-none px-0 py-0.5 w-64 font-mono"
          />
          <button
            onClick={() => void handleSave()}
            disabled={saving || dnsStatus === "checking"}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? t.config.domainSaving : dnsStatus === "checking" ? t.config.dnsChecking : t.config.domainSave}
          </button>
          <button
            onClick={handleCancel}
            className="text-xs px-3 py-1.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t.config.domainCancel}
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 ml-14">
          {t.config.domainHint}
        </p>
        {dnsStatus === "checking" && (
          <p className="text-xs text-blue-600 dark:text-blue-400 ml-14 flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            {t.config.dnsChecking}
          </p>
        )}
        {dnsStatus === "valid" && (
          <p className="text-xs text-green-600 dark:text-green-400 ml-14">
            {t.config.dnsValid}
          </p>
        )}
        {dnsStatus === "invalid" && (
          <p className="text-xs text-red-500 ml-14">{t.config.dnsInvalid}</p>
        )}
        {dnsStatus === "error" && (
          <p className="text-xs text-amber-600 dark:text-amber-400 ml-14">{t.config.dnsError}</p>
        )}
        {error && <p className="text-xs text-red-500 ml-14">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => { setDraft(domain); setEditing(true); }}
      className="group flex items-center gap-1.5 text-left"
      title={t.config.domainClickToChange}
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
