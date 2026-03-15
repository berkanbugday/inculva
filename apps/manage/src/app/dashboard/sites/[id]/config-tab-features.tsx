"use client";

import { useState } from "react";
import { FeatureToggle } from "./feature-toggle";
import type { Config } from "./widget-config-form";
import type { WidgetFeatures } from "@inculva/types";

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

interface Props {
  form: Config;
  setField: <K extends keyof Config>(key: K, value: Config[K]) => void;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onSave: () => void;
}

export function ConfigTabFeatures({
  form,
  setField,
  saving,
  saved,
  saveError,
  onSave,
}: Props) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(),
  );

  function toggleCategory(name: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => {
        const isExpanded = expandedCategories.has(cat.name);
        return (
          <div
            key={cat.name}
            className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
          >
            <button
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
                {cat.features.map((f) => (
                  <FeatureToggle
                    key={f.key}
                    label={f.label}
                    description={f.description}
                    {...(f.wcag ? { wcag: f.wcag } : {})}
                    enabled={!!form[f.key as keyof Config]}
                    onChange={(v) =>
                      setField(f.key as keyof Config, v as Config[keyof Config])
                    }
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

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
