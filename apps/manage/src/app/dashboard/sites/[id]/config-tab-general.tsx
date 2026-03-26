"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SiteNameForm } from "./site-name-form";
import { SiteDomainForm } from "./site-domain-form";
import { LANGUAGES } from "./languages";
import type { Config } from "./widget-config-form";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

const GENERAL_KEYS: (keyof Config)[] = [
  "position",
  "primaryColor",
  "language",
  "accessibilityStatementUrl",
  "allowedDomains",
  "buttonSize",
  "buttonIcon",
];

const BUTTON_ICONS = [
  { value: "universal-access", label: "Universal" },
  { value: "accessible-icon", label: "Accessible" },
  { value: "eye-slash", label: "Vision" },
  { value: "person-walking", label: "Walking" },
  { value: "wheelchair", label: "Wheelchair" },
] as const;

const BUTTON_SIZE_OPTIONS = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
] as const;

const CARD_OUTER: Record<string, string> = {
  small: "w-[44px] h-[44px]",
  medium: "w-[58px] h-[58px]",
  large: "w-[72px] h-[72px]",
};
const CARD_ICON: Record<string, string> = {
  small: "w-[35px] h-[35px]",
  medium: "w-[46px] h-[46px]",
  large: "w-[58px] h-[58px]",
};

const BUTTON_ICON_CDN_URL = `${process.env["NEXT_PUBLIC_CDN_URL"]}/icons/widget-button`;

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
  const { register, watch, setValue, getValues, resetField } =
    useFormContext<Config>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function onSave(data: Partial<Config>) {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/sites/${siteId}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        (Object.keys(data) as (keyof Config)[]).forEach((key) => {
          resetField(key, { defaultValue: data[key] as Config[typeof key] });
        });
      } else {
        const json = (await res.json()) as { error?: string };
        setSaveError(json.error ?? "Failed to save — please try again");
      }
    } catch {
      setSaveError("Network error — please check your connection");
    } finally {
      setSaving(false);
    }
  }
  const [copied, setCopied] = useState(false);
  const [domainInput, setDomainInput] = useState("");

  const allowedDomains = watch("allowedDomains");
  const primaryColor = watch("primaryColor");
  const buttonSize = watch("buttonSize");
  const buttonIcon = watch("buttonIcon");
  const position = watch("position");

  const snippet = `<script src="${widgetScriptSrc}" data-site-id="${siteId}" async></script>`;
  const domainParts = initialDomain.split(".");
  const rootDomain =
    domainParts.length >= 2 ? domainParts.slice(-2).join(".") : initialDomain;

  const subdomainLimit =
    PLAN_LIMITS[userPlan as Plan]?.maxAllowedSubdomains ?? 0;
  const subdomainCount = allowedDomains.length;
  const atSubdomainLimit =
    isFinite(subdomainLimit) && subdomainCount >= subdomainLimit;

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

  const PREFIX_RE = /^[a-z0-9]+([a-z0-9-]*[a-z0-9])?$/i;

  function addDomain() {
    const prefix = domainInput.trim().toLowerCase();
    if (!prefix) return;
    if (!PREFIX_RE.test(prefix)) return;
    if (atSubdomainLimit) return;

    const full = rootDomain ? `${prefix}.${rootDomain}` : prefix;
    if (!allowedDomains.includes(full)) {
      setValue("allowedDomains", [...allowedDomains, full], {
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
              Allowed subdomains
              {isFinite(subdomainLimit) && (
                <span
                  className={`ml-2 text-xs font-normal ${
                    atSubdomainLimit
                      ? "text-red-500"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {subdomainCount}/{subdomainLimit} subdomains used
                </span>
              )}
            </label>
            <div className="flex gap-2 mb-2">
              <div className="relative flex-1 flex items-center">
                <input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addDomain())
                  }
                  placeholder={
                    atSubdomainLimit ? "Subdomain limit reached" : "prefix"
                  }
                  disabled={atSubdomainLimit}
                  className={`${inputClass} rounded-r-none border-r-0 pr-0 ${
                    atSubdomainLimit ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                <span className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-r-2xl whitespace-nowrap border-l-0">
                  .{rootDomain}
                </span>
              </div>
              <button
                type="button"
                onClick={addDomain}
                disabled={atSubdomainLimit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                    type="button"
                    onClick={() => removeDomain(d)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    aria-label={`Remove ${d}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {atSubdomainLimit && (
              <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
                You&apos;ve reached the {subdomainLimit}-subdomain limit on the{" "}
                {userPlan} plan.{" "}
                <a
                  href="/dashboard/settings/billing"
                  className="underline font-semibold"
                >
                  Upgrade
                </a>{" "}
                to add more.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Widget Appearance
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) =>
                    setValue("primaryColor", e.target.value, { shouldDirty: true })
                  }
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] shrink-0"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) =>
                    setValue("primaryColor", e.target.value, { shouldDirty: true })
                  }
                  className={`${inputClass} font-mono`}
                  placeholder="#0066cc"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Button size
              </label>
              <div className="flex gap-5">
                {BUTTON_SIZE_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="buttonSize"
                      checked={buttonSize === value}
                      onChange={() =>
                        setValue("buttonSize", value, { shouldDirty: true })
                      }
                      className="w-4 h-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Button type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BUTTON_ICONS.map(({ value, label }) => {
                  const selected = (buttonIcon ?? "universal-access") === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setValue("buttonIcon", value, { shouldDirty: true })
                      }
                      className={`relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 transition-colors cursor-pointer ${
                        selected
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                          : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-300 dark:hover:border-blue-700"
                      }`}
                    >
                      {selected && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 5l2.5 2.5 3.5-4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                      <div
                        className={`${
                          CARD_OUTER[buttonSize ?? "medium"] ?? "w-10 h-10"
                        } rounded-full flex items-center justify-center transition-all`}
                        style={{ backgroundColor: primaryColor }}
                      >
                        <img
                          src={`${BUTTON_ICON_CDN_URL}/${value}.svg`}
                          alt={label}
                          className={`${
                            CARD_ICON[buttonSize ?? "medium"] ?? "w-5 h-5"
                          } transition-all`}
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                      </div>
                    </button>
                  );
                })}
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
                      className={`w-10 h-10 rounded-xl border-2 transition-colors flex items-center justify-center ${
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
                    >
                      {cell.enabled && cell.value === position && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 5l2.5 2.5 3.5-4"
                            stroke="#2563eb"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              const all = getValues();
              const data = Object.fromEntries(
                GENERAL_KEYS.map((k) => [k, all[k]]),
              ) as Partial<Config>;
              void onSave(data);
            }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
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
