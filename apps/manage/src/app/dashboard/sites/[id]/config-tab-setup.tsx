"use client";

import { useState } from "react";
import { SiteNameForm } from "./site-name-form";
import { SiteDomainForm } from "./site-domain-form";
import { LANGUAGES } from "./languages";
import type { Config } from "./widget-config-form";

interface Props {
  siteId: string;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
  badgeSrc: string;
  form: Config;
  setField: <K extends keyof Config>(key: K, value: Config[K]) => void;
  domainInput: string;
  setDomainInput: (v: string) => void;
  addDomain: () => void;
  removeDomain: (d: string) => void;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onSave: () => void;
}

export function ConfigTabSetup({
  siteId,
  initialName,
  initialDomain,
  widgetScriptSrc,
  badgeSrc,
  form,
  setField,
  domainInput,
  setDomainInput,
  addDomain,
  removeDomain,
  saving,
  saved,
  saveError,
  onSave,
}: Props) {
  const snippet = `<script src="${widgetScriptSrc}" data-site-id="${siteId}" async></script>`;
  const [copied, setCopied] = useState(false);

  async function copySnippet() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(snippet);
        setCopied(true);
      } else {
        const el = document.createElement("textarea");
        el.value = snippet;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
      }
    } catch {
      setCopied(false);
    }
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-4">
        <SiteNameForm siteId={siteId} initialName={initialName} />
        <SiteDomainForm siteId={siteId} initialDomain={initialDomain} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Embed code
          </label>
          <div className="relative">
            <pre className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-4 text-xs text-gray-700 dark:text-gray-300 border border-[#e8eaf0] dark:border-[#2a2a3e] overflow-x-auto whitespace-pre-wrap break-all">
              {snippet}
            </pre>
            <button
              onClick={() => void copySnippet()}
              className="absolute top-2 right-2 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Accessibility Statement URL
          </label>
          <input
            type="url"
            value={form.accessibilityStatementUrl}
            onChange={(e) =>
              setField("accessibilityStatementUrl", e.target.value)
            }
            className={inputClass}
            placeholder="https://example.com/accessibility"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language
          </label>
          <select
            value={form.language}
            onChange={(e) => setField("language", e.target.value)}
            className={inputClass}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Allowed domains
          </label>
          <div className="flex gap-2 mb-2">
            <input
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addDomain())
              }
              placeholder="example.com"
              className={inputClass}
            />
            <button
              onClick={addDomain}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-2xl transition-colors whitespace-nowrap"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.allowedDomains.map((d) => (
              <span
                key={d}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                {d}
                <button
                  onClick={() => removeDomain(d)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${d}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          WCAG Compliance Badge
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Embed this badge on your site to show visitors you take accessibility
          seriously.
        </p>
        <img
          src={badgeSrc}
          alt="WCAG 2.1 AA compliance badge"
          height={20}
          className="mb-4"
        />
        <pre className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-4 text-xs overflow-x-auto text-gray-700 dark:text-gray-300 border border-[#e8eaf0] dark:border-[#2a2a3e] select-all whitespace-pre-wrap break-all">
          {`<img src="${badgeSrc}" alt="WCAG 2.1 AA" height="20" />`}
        </pre>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400">
            Saved!
          </span>
        )}
        {saveError && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {saveError}
          </span>
        )}
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 border-l-4 border-red-500">
        <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Permanently delete this site and all its data.
        </p>
        <a
          href={`/dashboard/sites/${siteId}/delete`}
          className="inline-flex px-5 py-2.5 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          Delete site
        </a>
      </div>
    </div>
  );
}
