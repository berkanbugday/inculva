"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SiteNameForm } from "./site-name-form";
import { SiteDomainForm } from "./site-domain-form";
import { LANGUAGES } from "./languages";
import type { Config } from "./widget-config-form";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"] || "";

const POSITION_GRID = [
  [
    { value: "top-left", enabled: true },
    { value: null, enabled: false },
    { value: "top-right", enabled: true },
  ],
  [
    { value: null, enabled: false },
    { value: null, enabled: false },
    { value: null, enabled: false },
  ],
  [
    { value: "bottom-left", enabled: true },
    { value: null, enabled: false },
    { value: "bottom-right", enabled: true },
  ],
] as const;

const FONT_OPTIONS = [
  { value: "system", label: "System" },
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
] as const;

interface Props {
  siteId: string;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
  badgeSrc: string;
  userPlan: string;
}

export function ConfigTabGeneral({
  siteId,
  initialName,
  initialDomain,
  widgetScriptSrc,
  badgeSrc,
  userPlan,
}: Props) {
  const { register, watch, setValue } = useFormContext<Config>();
  const [copied, setCopied] = useState(false);
  const [domainInput, setDomainInput] = useState("");

  const allowedDomains = watch("allowedDomains");
  const language = watch("language");
  const primaryColor = watch("primaryColor");
  const buttonSize = watch("buttonSize");
  const position = watch("position");
  const fontFamily = watch("fontFamily");

  const snippet = `<script src="${widgetScriptSrc}" data-site-id="${siteId}" async></script>`;
  const isBusiness = userPlan === "business";

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

  function isValidDomain(domain: string): boolean {
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    return domainRegex.test(domain) && !domain.includes("://");
  }

  function addDomain() {
    const trimmed = domainInput.trim().toLowerCase();
    if (!trimmed) return;

    if (!isValidDomain(trimmed)) {
      return;
    }

    if (!allowedDomains.includes(trimmed)) {
      setValue("allowedDomains", [...allowedDomains, trimmed], {
        shouldDirty: true,
      });
    }
    setDomainInput("");
  }

  function removeDomain(domain: string) {
    setValue(
      "allowedDomains",
      allowedDomains.filter((d) => d !== domain),
      { shouldDirty: true },
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Embed Code
        </h3>
        <div className="relative">
          <pre className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-4 text-xs text-gray-700 dark:text-gray-300 border border-[#e8eaf0] dark:border-[#2a2a3e] overflow-x-auto whitespace-pre-wrap break-all">
            {snippet}
          </pre>
          <button
            onClick={() => void copySnippet()}
            className="absolute top-2 right-2 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Site Configuration
          </h3>

          <SiteNameForm siteId={siteId} initialName={initialName} />
          <SiteDomainForm siteId={siteId} initialDomain={initialDomain} />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select {...register("language")} className={inputClass}>
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-2xl transition-colors whitespace-nowrap cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allowedDomains.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  {d}
                  <button
                    onClick={() => removeDomain(d)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label={`Remove ${d}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Widget Appearance
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                {...register("primaryColor")}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0"
              />
              <input
                type="text"
                {...register("primaryColor")}
                className={`${inputClass} font-mono`}
                placeholder="#0066cc"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trigger button preview
            </label>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              <img
                src={`${CDN_URL}/icons/universal-access.svg`}
                alt=""
                aria-hidden="true"
                className="w-7 h-7"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Button size
            </label>
            <div className="flex gap-1 bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-1 w-fit">
              {(
                [
                  ["small", "Mini"],
                  ["medium", "Regular"],
                  ["large", "Large"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    setValue("buttonSize", val, { shouldDirty: true })
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${buttonSize === val ? "bg-white dark:bg-[#1a1a2e] text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Widget position
            </label>
            <div className="grid grid-cols-3 gap-2 w-fit">
              {POSITION_GRID.map((row, ri) =>
                row.map((cell, ci) => (
                  <button
                    key={`${ri}-${ci}`}
                    type="button"
                    disabled={!cell.enabled}
                    onClick={() =>
                      cell.enabled &&
                      cell.value &&
                      setValue("position", cell.value, { shouldDirty: true })
                    }
                    className={`w-10 h-10 rounded-xl border-2 transition-colors ${
                      !cell.enabled
                        ? "border-transparent bg-[#f8f9fc] dark:bg-[#0e0e10] cursor-default"
                        : cell.value === position
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950 cursor-pointer"
                          : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-400 cursor-pointer"
                    }`}
                    aria-label={
                      cell.enabled && cell.value
                        ? cell.value.replace("-", " ")
                        : undefined
                    }
                  />
                )),
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
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
          className="inline-flex px-5 py-2.5 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
        >
          Delete site
        </a>
      </div>
    </div>
  );
}
