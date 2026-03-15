"use client";

import type { Config } from "./widget-config-form";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.inculva.com";

const PROFILES: {
  key: keyof Config;
  label: string;
  description: string;
  iconName: string;
  features: string[];
}[] = [
  {
    key: "profileBlind",
    label: "Blind",
    description:
      "Screen reader optimization, keyboard navigation, and simplified layout",
    iconName: "eye-slash",
    features: ["Keyboard Nav", "Skip Navigation", "Text Resizing"],
  },
  {
    key: "profileLowVision",
    label: "Low Vision",
    description:
      "Large text, high contrast, cursor enhancement, and content zoom",
    iconName: "eye-low-vision",
    features: [
      "Text Resizing",
      "Contrast+",
      "Big Cursor",
      "Large Click Targets",
    ],
  },
  {
    key: "profileDyslexia",
    label: "Dyslexia",
    description: "Dyslexia font, text spacing, and reading aids",
    iconName: "df",
    features: ["Dyslexia Font", "Text Spacing", "Reading Guide"],
  },
  {
    key: "profileColorBlind",
    label: "Color Blind",
    description:
      "Color scheme adjustments for different types of color blindness",
    iconName: "bring-forward",
    features: ["Color Blind Mode"],
  },
  {
    key: "profileMotorImpaired",
    label: "Motor Impaired",
    description: "Larger targets, keyboard navigation, and focus highlight",
    iconName: "wheelchair",
    features: ["Keyboard Nav", "Large Click Targets", "Focus Indicator"],
  },
  {
    key: "profileAdhd",
    label: "ADHD",
    description: "Reading guide, pause animations, and reading mask for focus",
    iconName: "puzzle-piece",
    features: ["Reading Guide", "Pause Animations", "Reading Mask"],
  },
];

interface Props {
  form: Config;
  setField: <K extends keyof Config>(key: K, value: Config[K]) => void;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onSave: () => void;
}

export function ConfigTabProfiles({
  form,
  setField,
  saving,
  saved,
  saveError,
  onSave,
}: Props) {
  const enabledCount = PROFILES.filter((p) => !!form[p.key]).length;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Accessibility Profiles
          </h3>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {enabledCount} of {PROFILES.length} enabled
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROFILES.map((profile) => {
            const enabled = !!form[profile.key];
            return (
              <button
                key={profile.key}
                onClick={() =>
                  setField(profile.key, !enabled as Config[keyof Config])
                }
                className={`text-left p-4 rounded-2xl border-[3px] border-solid transition-all cursor-pointer ${
                  enabled
                    ? "!border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                    : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <img
                      src={`${CDN_URL}/icons/${profile.iconName}.svg`}
                      alt=""
                      width={20}
                      height={20}
                      className="block"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      enabled
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {enabled && (
                      <svg
                        width="10"
                        height="10"
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
                    )}
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {profile.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                  {profile.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {profile.features.map((f) => (
                    <span
                      key={f}
                      className="text-[12px] px-1.5 py-0.5 text-black dark:text-white underline"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
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
    </div>
  );
}
