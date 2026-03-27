"use client";

import { useState, useTransition } from "react";
import { cn } from "@inculva/ui";
import { useMessages } from "@/i18n/useMessages";
import { LANGUAGES } from "../[id]/languages";

const PRESET_COLORS = [
  "#0066cc",
  "#6B21A8",
  "#15803D",
  "#B91C1C",
  "#0F766E",
  "#C2410C",
  "#0284C7",
  "#4F46E5",
] as const;

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

const DOMAIN_RE =
  /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;

interface WizardState {
  name: string;
  domain: string;
  primaryColor: string;
  position: string;
  language: string;
}

interface Props {
  createSite: (formData: FormData) => Promise<void>;
  error: string | undefined;
}

export function SiteWizard({ createSite, error }: Props) {
  const t = useMessages();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    name: "",
    domain: "",
    primaryColor: "#0066cc",
    position: "bottom-right",
    language: "en",
  });
  const [isPending, startTransition] = useTransition();
  const [dnsStatus, setDnsStatus] = useState<
    "idle" | "checking" | "valid" | "invalid" | "error"
  >("idle");

  const STEPS = [
    { label: t.wizard.siteInfo },
    { label: t.wizard.brandColor },
    { label: t.wizard.position },
    { label: t.wizard.language },
    { label: t.wizard.review },
  ];

  const POSITION_LABELS: Record<string, string> = {
    "top-left": t.positions.topLeft,
    "top-right": t.positions.topRight,
    "bottom-left": t.positions.bottomLeft,
    "bottom-right": t.positions.bottomRight,
  };

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
    if (key === "domain") setDnsStatus("idle");
  }

  function normalizeDomain(raw: string): string {
    return raw
      .trim()
      .replace(/^https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .toLowerCase();
  }

  async function checkDns(): Promise<boolean> {
    const domain = normalizeDomain(state.domain);
    if (!domain || !DOMAIN_RE.test(domain)) {
      setDnsStatus("invalid");
      return false;
    }

    setDnsStatus("checking");
    try {
      const res = await fetch("/api/dns-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
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

  function canAdvance(): boolean {
    if (step === 0)
      return state.name.trim().length > 0 && state.domain.trim().length > 0;
    return true;
  }

  async function handleNext() {
    if (step === 0) {
      const ok = await checkDns();
      if (!ok) return;
    }
    setStep((s) => s + 1);
  }

  function handleSubmit() {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("domain", normalizeDomain(state.domain));
    formData.append("primaryColor", state.primaryColor);
    formData.append("position", state.position);
    formData.append("language", state.language);
    startTransition(() => {
      void createSite(formData);
    });
  }

  const inputClass =
    "w-full px-4 py-3 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-base bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">
      {/* Error banner */}
      {error && (
        <div className="mb-6 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <span className="text-amber-500 text-lg">&#9888;</span>
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {decodeURIComponent(error)}
            </p>
            <a
              href="/dashboard/settings/billing"
              className="text-sm text-amber-700 dark:text-amber-400 hover:underline font-medium mt-1 inline-block cursor-pointer"
            >
              {t.wizard.viewUpgradeOptions}
            </a>
          </div>
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className="flex items-center flex-1 last:flex-none"
          >
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={cn(
                "flex items-center gap-2 shrink-0",
                i < step ? "cursor-pointer" : "cursor-default",
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                  i === step
                    ? "bg-blue-600 border-blue-600 text-white"
                    : i < step
                    ? "bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-600",
                )}
              >
                {i < step ? (
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p
                  className={cn(
                    "text-xs font-semibold",
                    i === step
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  {s.label}
                </p>
              </div>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 rounded transition-colors",
                  i < step
                    ? "bg-green-400 dark:bg-green-600"
                    : "bg-gray-200 dark:bg-gray-700",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[200px]">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.wizard.nameYourSite}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.wizard.nameYourSiteDesc}
              </p>
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                htmlFor="wizard-name"
              >
                {t.wizard.siteName}
              </label>
              <input
                id="wizard-name"
                type="text"
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={t.wizard.siteNamePlaceholder}
                className={inputClass}
                autoFocus
              />
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                htmlFor="wizard-domain"
              >
                {t.wizard.domainLabel}
              </label>
              <input
                id="wizard-domain"
                type="text"
                value={state.domain}
                onChange={(e) => update("domain", e.target.value)}
                placeholder={t.wizard.domainPlaceholder}
                className={inputClass}
              />
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                {t.wizard.domainHint} <code>example.com</code>
              </p>
              {dnsStatus === "checking" && (
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="inline-block w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  {t.wizard.dnsChecking}
                </p>
              )}
              {dnsStatus === "valid" && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t.wizard.dnsValid}
                </p>
              )}
              {dnsStatus === "invalid" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {t.wizard.dnsInvalid}
                </p>
              )}
              {dnsStatus === "error" && (
                <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                  {t.wizard.dnsError}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.wizard.chooseBrandColor}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.wizard.chooseBrandColorDesc}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-700"
              />
              <input
                type="text"
                value={state.primaryColor}
                onChange={(e) => update("primaryColor", e.target.value)}
                placeholder="#0066cc"
                className={cn(inputClass, "font-mono flex-1")}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t.wizard.presets}
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => update("primaryColor", color)}
                    className={cn(
                      "w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer",
                      state.primaryColor === color
                        ? "border-gray-900 dark:border-white scale-110"
                        : "border-transparent",
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
            {/* Preview */}
            <div className="flex items-center gap-3 p-4 bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e]">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: state.primaryColor }}
              >
                <img
                  src={`${process.env["NEXT_PUBLIC_CDN_URL"]}/icons/widget-button/universal-access.svg`}
                  alt=""
                  aria-hidden="true"
                  className="w-9 h-9"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.wizard.widgetButtonPreview}
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.wizard.widgetPosition}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.wizard.widgetPositionDesc}
              </p>
            </div>
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
                      update("position", cell.value)
                    }
                    className={`w-16 h-16 rounded-xl border-2 transition-colors flex items-center justify-center ${
                      !cell.enabled
                        ? "border-transparent bg-[#f8f9fc] dark:bg-[#0e0e10] cursor-default"
                        : cell.value === state.position
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950 cursor-pointer"
                        : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-400 cursor-pointer"
                    }`}
                    aria-label={
                      cell.enabled && cell.value
                        ? POSITION_LABELS[cell.value]
                        : undefined
                    }
                  >
                    {cell.enabled && cell.value === state.position && (
                      <svg
                        width="14"
                        height="14"
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {POSITION_LABELS[state.position]}
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.wizard.chooseLanguage}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.wizard.chooseLanguageDesc}
              </p>
            </div>
            <select
              value={state.language}
              onChange={(e) => update("language", e.target.value)}
              className={inputClass}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              {t.wizard.languageChangeHint}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t.wizard.reviewAndCreate}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.wizard.reviewAndCreateDesc}
              </p>
            </div>
            <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl divide-y divide-[#e8eaf0] dark:divide-[#2a2a3e] border border-[#e8eaf0] dark:border-[#2a2a3e]">
              {[
                { label: t.wizard.siteName, value: state.name },
                { label: t.wizard.domainLabel, value: normalizeDomain(state.domain) },
                {
                  label: t.wizard.position,
                  value: POSITION_LABELS[state.position] ?? state.position,
                },
                {
                  label: t.wizard.language,
                  value:
                    LANGUAGES.find((l) => l.value === state.language)?.label ??
                    state.language,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t.wizard.brandColor}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: state.primaryColor }}
                  />
                  <span className="text-sm font-mono text-gray-900 dark:text-white">
                    {state.primaryColor}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-[#e8eaf0] dark:border-[#2a2a3e]">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={isPending}
            className="px-5 py-3 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] text-gray-700 dark:text-gray-300 rounded-full text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {t.wizard.back}
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => void handleNext()}
            disabled={!canAdvance() || dnsStatus === "checking"}
            className="px-5 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {dnsStatus === "checking" ? t.wizard.dnsChecking : t.wizard.continue}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? t.wizard.creating : t.wizard.createSite}
          </button>
        )}
        <a
          href="/dashboard"
          className="px-5 py-3 text-gray-500 dark:text-gray-400 rounded-full text-base font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
        >
          {t.wizard.cancelLabel}
        </a>
      </div>
    </div>
  );
}
