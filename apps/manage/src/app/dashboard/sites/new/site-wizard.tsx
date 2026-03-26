"use client";

import { useState, useTransition } from "react";
import { cn } from "@inculva/ui";

const POSITIONS = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
] as const;

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "tr", label: "Turkish (Türkçe)" },
  { value: "de", label: "German (Deutsch)" },
  { value: "fr", label: "French (Français)" },
  { value: "es", label: "Spanish (Español)" },
  { value: "pt", label: "Portuguese (Português)" },
  { value: "it", label: "Italian (Italiano)" },
  { value: "nl", label: "Dutch (Nederlands)" },
  { value: "pl", label: "Polish (Polski)" },
  { value: "ru", label: "Russian (Русский)" },
  { value: "zh", label: "Chinese (中文)" },
  { value: "ja", label: "Japanese (日本語)" },
  { value: "ko", label: "Korean (한국어)" },
  { value: "ar", label: "Arabic (العربية)" },
  { value: "hi", label: "Hindi (हिन्दी)" },
] as const;

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

interface WizardState {
  name: string;
  domain: string;
  primaryColor: string;
  position: string;
  language: string;
}

const STEPS = [
  { label: "Site Info", description: "Name and domain" },
  { label: "Brand Color", description: "Widget color" },
  { label: "Position", description: "Widget placement" },
  { label: "Language", description: "Widget language" },
  { label: "Review", description: "Create your site" },
] as const;

interface Props {
  createSite: (formData: FormData) => Promise<void>;
  error: string | undefined;
}

export function SiteWizard({ createSite, error }: Props) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>({
    name: "",
    domain: "",
    primaryColor: "#0066cc",
    position: "bottom-right",
    language: "en",
  });
  const [isPending, startTransition] = useTransition();

  function update<K extends keyof WizardState>(key: K, value: WizardState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    if (step === 0)
      return state.name.trim().length > 0 && state.domain.trim().length > 0;
    return true;
  }

  function handleSubmit() {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("domain", state.domain);
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
          <span className="text-amber-500 text-lg">⚠</span>
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {decodeURIComponent(error)}
            </p>
            <a
              href="/dashboard/settings/billing"
              className="text-sm text-amber-700 dark:text-amber-400 hover:underline font-medium mt-1 inline-block"
            >
              View upgrade options →
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
                Name your site
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter a friendly name and the domain you want to embed the
                widget on.
              </p>
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                htmlFor="wizard-name"
              >
                Site name
              </label>
              <input
                id="wizard-name"
                type="text"
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="My Company Website"
                className={inputClass}
                autoFocus
              />
            </div>
            <div>
              <label
                className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                htmlFor="wizard-domain"
              >
                Domain
              </label>
              <input
                id="wizard-domain"
                type="text"
                value={state.domain}
                onChange={(e) => update("domain", e.target.value)}
                placeholder="example.com"
                className={inputClass}
              />
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                Without protocol — e.g. <code>example.com</code>
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Choose your brand color
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This color will be used for the widget button and accents.
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
                Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => update("primaryColor", color)}
                    className={cn(
                      "w-9 h-9 rounded-full border-2 transition-transform hover:scale-110",
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
                Widget button preview
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Widget position
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose where the widget button appears on your site.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {POSITIONS.map((pos) => (
                <button
                  key={pos.value}
                  type="button"
                  onClick={() => update("position", pos.value)}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all",
                    state.position === pos.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
                      : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-300 dark:hover:border-blue-700",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-medium",
                      state.position === pos.value
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-800 dark:text-gray-200",
                    )}
                  >
                    {pos.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Choose language
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The widget supports 41 languages. Select the default.
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
              You can change this later in widget settings.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Review and create
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Everything looks good? Click Create site to finish.
              </p>
            </div>
            <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl divide-y divide-[#e8eaf0] dark:divide-[#2a2a3e] border border-[#e8eaf0] dark:border-[#2a2a3e]">
              {[
                { label: "Site name", value: state.name },
                { label: "Domain", value: state.domain },
                {
                  label: "Position",
                  value:
                    POSITIONS.find((p) => p.value === state.position)?.label ??
                    state.position,
                },
                {
                  label: "Language",
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
                  Brand color
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
            className="px-5 py-3 bg-[#f8f9fc] dark:bg-[#0e0e10] border border-[#e8eaf0] dark:border-[#2a2a3e] text-gray-700 dark:text-gray-300 rounded-full text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="px-5 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating…" : "Create site"}
          </button>
        )}
        <a
          href="/dashboard"
          className="px-5 py-3 text-gray-500 dark:text-gray-400 rounded-full text-base font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Cancel
        </a>
      </div>
    </div>
  );
}
