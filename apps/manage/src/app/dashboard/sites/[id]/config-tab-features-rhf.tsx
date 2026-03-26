"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureToggle } from "./feature-toggle";
import type { Config } from "./widget-config-form";
import type { WidgetFeatures } from "@inculva/types";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.inculva.com";

const FEATURE_KEYS: (keyof Config)[] = [
  "textResizing", "dyslexiaFont", "cursorEnhancement", "keyboardNavigation",
  "readingGuide", "screenReader", "pauseAnimations", "textSpacing",
  "highlightLinks", "colorBlindMode", "largeClickTargets", "focusHighlight",
  "skipNavigation", "muteMedia", "readingMask", "textAlign", "saturation",
  "blueLightFilter", "hideImages", "darkMode", "contentMagnifier", "toolTips",
  "sustainabilityMode", "slowCursor", "dictionary", "lineHeight", "highlightTitles",
  "profileAdhd", "profileBlind", "profileLowVision", "profileColorBlind",
  "profileDyslexia", "profileMotorImpaired", "profileCognitive", "profileSeizure",
  "profileParkinson",
];

type FeatureDef = {
  key: keyof WidgetFeatures;
  label: string;
  description: string;
  wcag?: string;
  comingSoon?: boolean;
};

const CATEGORIES: { name: string; features: FeatureDef[] }[] = [
  {
    name: "Vision",
    features: [
      {
        key: "darkMode",
        label: "Dark Mode",
        description:
          "CSS invert + hue-rotate to create a dark theme — images are counter-inverted",
      },
      {
        key: "blueLightFilter",
        label: "Blue Light Filter",
        description:
          "Warm sepia tint to reduce blue light and ease eye fatigue",
        wcag: "1.4.3",
      },
      {
        key: "colorBlindMode",
        label: "Color Blind Mode",
        description:
          "SVG filter with 4 types: deuteranopia, protanopia, tritanopia, achromatopsia",
        wcag: "1.4.1",
      },
      {
        key: "saturation",
        label: "Contrast+",
        description:
          "5-level contrast and saturation tool covering high-contrast and colour-saturation needs",
      },
      {
        key: "highlightLinks",
        label: "Highlight Links",
        description:
          "Forces underline + bold + outline on all anchors — links visible without colour",
        wcag: "1.4.1",
      },
      {
        key: "highlightTitles",
        label: "Highlight Titles",
        description:
          "Visible outline on all h1–h6 headings — helps identify page structure",
      },
      {
        key: "hideImages",
        label: "Hide Images",
        description:
          "Makes all images invisible (preserving layout) — removes visual distractions",
      },
    ],
  },
  {
    name: "Reading",
    features: [
      {
        key: "textResizing",
        label: "Text Resizing",
        description: "Increase font size across 4 levels (110%–155%)",
        wcag: "1.4.4",
      },
      {
        key: "textSpacing",
        label: "Text Spacing",
        description:
          "Increases line-height, letter-spacing, and word-spacing per WCAG 1.4.12",
        wcag: "1.4.12",
      },
      {
        key: "textAlign",
        label: "Text Alignment",
        description:
          "Forces left-align on paragraphs and headings — improves readability for dyslexic users",
      },
      {
        key: "lineHeight",
        label: "Line Height",
        description:
          "Increases line-height (4 levels: 1.6–2.6) for more breathing room",
        wcag: "1.4.12",
      },
      {
        key: "dyslexiaFont",
        label: "Dyslexia Font",
        description:
          "Switches page font to OpenDyslexic — heavy bottoms anchor letters to the baseline",
      },
      {
        key: "readingGuide",
        label: "Reading Guide",
        description:
          "Horizontal amber line following the cursor — helps track reading position",
      },
      {
        key: "readingMask",
        label: "Reading Mask",
        description:
          "Full-page dimming overlay with a clear 80px reading window — reduces visual distraction",
      },
      {
        key: "contentMagnifier",
        label: "Content Magnifier",
        description:
          "Circular lens scaling hovered elements (4 levels: 1.15×–1.5×) for local zoom",
      },
    ],
  },
  {
    name: "Motor",
    features: [
      {
        key: "keyboardNavigation",
        label: "Keyboard Nav",
        description:
          "Visible 3px blue focus ring around focused elements for keyboard users",
        wcag: "2.1.1",
      },
      {
        key: "focusHighlight",
        label: "Focus Indicator",
        description:
          "High-visibility 3px orange outline + glow on every focused element",
        wcag: "2.4.11",
      },
      {
        key: "largeClickTargets",
        label: "Large Click Targets",
        description:
          "Enforces 44×44px minimum on all interactive elements — critical for motor-impaired users",
        wcag: "2.5.8",
      },
      {
        key: "cursorEnhancement",
        label: "Big Cursor",
        description:
          "Replaces OS cursor with a large white-fill arrow (3 sizes: 32/48/64px)",
      },
      {
        key: "slowCursor",
        label: "Slow Cursor",
        description:
          "Smooths cursor with exponential lag (3 levels) — reduces effect of hand tremors",
      },
      {
        key: "skipNavigation",
        label: "Skip Navigation",
        description:
          "'Skip to main content' link on Tab press — bypasses repetitive nav menus",
        wcag: "2.4.1",
      },
    ],
  },
  {
    name: "Calm",
    features: [
      {
        key: "pauseAnimations",
        label: "Pause Animations",
        description:
          "Freezes all CSS animations and transitions — essential for photosensitive users",
        wcag: "2.3.3",
      },
      {
        key: "muteMedia",
        label: "Mute Media",
        description:
          "Mutes and pauses all audio/video elements using MutationObserver",
        wcag: "1.4.2",
      },
    ],
  },
];

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
  siteId: string;
}

export function ConfigTabFeaturesRHF({ siteId }: Props) {
  const { watch, setValue, getValues, resetField } = useFormContext<Config>();
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
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [profilesExpanded, setProfilesExpanded] = useState(true);

  function toggleCategory(name: string) {
    setExpandedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  const enabledProfilesCount = PROFILES.filter((p) => !!watch(p.key)).length;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <button
          type="button"
          onClick={() => setProfilesExpanded(!profilesExpanded)}
          className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity cursor-pointer mb-5"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Accessibility Profiles
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {enabledProfilesCount} of {PROFILES.length} enabled
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`shrink-0 transition-transform text-gray-400 dark:text-gray-600 ${
                profilesExpanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        {profilesExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFILES.map((profile) => {
              const enabled = !!watch(profile.key);
              return (
                <button
                  key={profile.key}
                  type="button"
                  onClick={() =>
                    setValue(profile.key, !enabled as Config[keyof Config], {
                      shouldDirty: true,
                    })
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
        )}
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const isExpanded = expandedCategories[cat.name] || false;
          return (
            <div
              key={cat.name}
              className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.name)}
                className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity cursor-pointer"
              >
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                  {cat.name}
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`shrink-0 transition-transform text-gray-400 dark:text-gray-600 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isExpanded && (
                <div className="divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e] mt-3">
                  {cat.features.map((f) => {
                    const enabled = watch(f.key as keyof Config);
                    return (
                      <FeatureToggle
                        key={f.key}
                        label={f.label}
                        description={f.description}
                        {...(f.wcag ? { wcag: f.wcag } : {})}
                        enabled={!!enabled}
                        onChange={(v) =>
                          setValue(
                            f.key as keyof Config,
                            v as Config[keyof Config],
                            {
                              shouldDirty: true,
                            },
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => {
            const all = getValues();
            const data = Object.fromEntries(
              FEATURE_KEYS.map((k) => [k, all[k]])
            ) as Partial<Config>;
            void onSave(data);
          }}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400">Saved!</span>
        )}
        {saveError && (
          <span className="text-sm text-red-600 dark:text-red-400">{saveError}</span>
        )}
      </div>
    </div>
  );
}
