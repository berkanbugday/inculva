"use client";

import { useState } from "react";
import { cn } from "@inculva/ui";
import type { WidgetFeatures } from "@inculva/types";

type Config = {
  position: string;
  theme: string;
  primaryColor: string;
  language: string;
  accessibilityStatementUrl: string;
  whiteLabelText: string;
  allowedDomains: string[];
  textResizing: boolean;
  highContrast: boolean;
  dyslexiaFont: boolean;
  cursorEnhancement: boolean;
  keyboardNavigation: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  pauseAnimations: boolean;
  textSpacing: boolean;
  highlightLinks: boolean;
  colorBlindMode: boolean;
  largeClickTargets: boolean;
  focusHighlight: boolean;
  grayscale: boolean;
  skipNavigation: boolean;
  muteMedia: boolean;
  readingMask: boolean;
  textAlign: boolean;
  saturation: boolean;
  blueLightFilter: boolean;
  hideImages: boolean;
  darkMode: boolean;
  contentMagnifier: boolean;
  toolTips: boolean;
  sustainabilityMode: boolean;
  slowCursor: boolean;
  dictionary: boolean;
  lineHeight: boolean;
  highlightTitles: boolean;
  profileAdhd: boolean;
  profileBlind: boolean;
  profileLowVision: boolean;
  profileColorBlind: boolean;
  profileDyslexia: boolean;
  profileMotorImpaired: boolean;
  profileCognitive: boolean;
  profileSeizure: boolean;
  profileParkinson: boolean;
  // Visual customization (Business plan only)
  borderRadius: number;
  buttonSize: string;
  fontFamily: string;
};

const POSITIONS = ["bottom-right", "bottom-left", "top-right", "top-left"] as const;
const THEMES = ["auto", "light", "dark"] as const;
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
  { value: "uk", label: "Ukrainian (Українська)" },
  { value: "cs", label: "Czech (Čeština)" },
  { value: "hu", label: "Hungarian (Magyar)" },
  { value: "ro", label: "Romanian (Română)" },
  { value: "bg", label: "Bulgarian (Български)" },
  { value: "hr", label: "Croatian (Hrvatski)" },
  { value: "sk", label: "Slovak (Slovenčina)" },
  { value: "sl", label: "Slovenian (Slovenščina)" },
  { value: "el", label: "Greek (Ελληνικά)" },
  { value: "fi", label: "Finnish (Suomi)" },
  { value: "sv", label: "Swedish (Svenska)" },
  { value: "no", label: "Norwegian (Norsk)" },
  { value: "da", label: "Danish (Dansk)" },
  { value: "lt", label: "Lithuanian (Lietuvių)" },
  { value: "lv", label: "Latvian (Latviešu)" },
  { value: "et", label: "Estonian (Eesti)" },
  { value: "ar", label: "Arabic (العربية) — RTL" },
  { value: "he", label: "Hebrew (עברית) — RTL" },
  { value: "fa", label: "Persian (فارسی) — RTL" },
  { value: "zh", label: "Chinese (中文)" },
  { value: "ja", label: "Japanese (日本語)" },
  { value: "ko", label: "Korean (한국어)" },
  { value: "th", label: "Thai (ไทย)" },
  { value: "vi", label: "Vietnamese (Tiếng Việt)" },
  { value: "id", label: "Indonesian (Bahasa Indonesia)" },
  { value: "ms", label: "Malay (Bahasa Melayu)" },
  { value: "hi", label: "Hindi (हिन्दी)" },
  { value: "bn", label: "Bengali (বাংলা)" },
  { value: "ur", label: "Urdu (اردو) — RTL" },
  { value: "sw", label: "Swahili (Kiswahili)" },
] as const;

const FEATURES: { key: keyof WidgetFeatures; label: string; description: string; wcag?: string }[] = [
  { key: "textResizing", label: "Text Resizing", description: "Allow users to increase font size", wcag: "1.4.4" },
  { key: "highContrast", label: "High Contrast", description: "Boost color contrast for visibility", wcag: "1.4.3" },
  { key: "dyslexiaFont", label: "Dyslexia Font", description: "Switch to OpenDyslexic font" },
  { key: "cursorEnhancement", label: "Big Cursor", description: "Enlarge mouse cursor" },
  { key: "keyboardNavigation", label: "Keyboard Nav", description: "Enhanced focus indicators", wcag: "2.1.1" },
  { key: "readingGuide", label: "Reading Guide", description: "Horizontal highlight line" },
  { key: "screenReader", label: "Screen Reader Hints", description: "Highlight images missing alt text" },
  { key: "pauseAnimations", label: "Pause Animations", description: "Stop all CSS animations", wcag: "2.3.3" },
  { key: "textSpacing", label: "Text Spacing", description: "WCAG 2.1: line-height, letter & word spacing", wcag: "1.4.12" },
  { key: "highlightLinks", label: "Highlight Links", description: "Force underline + bold on all links", wcag: "1.4.1" },
  { key: "colorBlindMode", label: "Color Blind Mode", description: "SVG deuteranopia color correction filter", wcag: "1.4.1" },
  { key: "largeClickTargets", label: "Large Click Targets", description: "Enforce 44×44px min touch target size", wcag: "2.5.8" },
  { key: "focusHighlight", label: "Focus Highlight", description: "High-visibility 3px orange focus ring", wcag: "2.4.11" },
  { key: "grayscale", label: "Grayscale", description: "Apply grayscale filter to reduce visual noise", wcag: "1.4.3" },
  { key: "skipNavigation", label: "Skip Navigation", description: "Inject 'Skip to main content' link (keyboard users)", wcag: "2.4.1" },
  { key: "muteMedia", label: "Mute Media", description: "Mute and pause all autoplaying audio/video", wcag: "1.4.2" },
  { key: "readingMask", label: "Reading Mask", description: "Translucent horizontal band that follows the cursor for line-by-line reading" },
  { key: "textAlign", label: "Text Alignment", description: "Force left-align all paragraph text for easier reading" },
  { key: "saturation", label: "Saturation Boost", description: "Increase colour saturation to aid low-vision users" },
];

// New features — extended set inspired by UserWay/Corpowid
const EXTENDED_FEATURES: { key: keyof Config; label: string; description: string; wcag?: string }[] = [
  { key: "blueLightFilter", label: "Blue Light Filter", description: "Reduces blue light emission to ease eye strain", wcag: "1.4.3" },
  { key: "hideImages", label: "Hide Images", description: "Remove all images for distraction-free reading" },
  { key: "darkMode", label: "Dark Mode", description: "Switch to a dark color scheme to reduce eye strain" },
  { key: "contentMagnifier", label: "Content Magnifier", description: "Zoom into specific page areas for low-vision users" },
  { key: "toolTips", label: "Alt Text Tooltips", description: "Show image alt text on hover for context" },
  { key: "sustainabilityMode", label: "Sustainability Mode", description: "Energy-saving mode — reduces motion and background processing" },
  { key: "slowCursor", label: "Slow Cursor", description: "Slows cursor speed to assist users with motor impairments (e.g. Parkinson's)" },
  { key: "dictionary", label: "Dictionary", description: "Highlight any word to see its definition (UserWay-style)" },
  { key: "lineHeight", label: "Line Height", description: "Increase vertical spacing between lines of text" },
  { key: "highlightTitles", label: "Highlight Titles", description: "Make headings stand out with a visual emphasis" },
];

// Type guard for boolean config keys
type BooleanConfigKey = {
  [K in keyof Config]: Config[K] extends boolean ? K : never;
}[keyof Config];

const PROFILES: { key: BooleanConfigKey; label: string; description: string; icon: string }[] = [
  { key: "profileAdhd", label: "ADHD", description: "Focus tools, distraction reduction, reading aids", icon: "🎯" },
  { key: "profileBlind", label: "Blind", description: "Screen reader optimization + simplified layout", icon: "👁" },
  { key: "profileLowVision", label: "Low Vision", description: "Large text, high contrast, content zoom", icon: "🔍" },
  { key: "profileColorBlind", label: "Color Blind", description: "Color scheme adjustments for color blindness types", icon: "🎨" },
  { key: "profileDyslexia", label: "Dyslexia", description: "Dyslexia font, letter spacing, reading aids", icon: "📖" },
  { key: "profileMotorImpaired", label: "Motor Impaired", description: "Larger targets, simplified navigation, slow cursor", icon: "🖱" },
  { key: "profileCognitive", label: "Cognitive & Learning", description: "Simplified layout, focus tools, content aids", icon: "🧠" },
  { key: "profileSeizure", label: "Seizure & Epilepsy", description: "Pauses all flashing content, animations, and videos", icon: "⚡" },
  { key: "profileParkinson", label: "Parkinson's Disease", description: "Cursor stabilization, slow cursor, large targets", icon: "🤝" },
];

// Position grid cell definition
type PositionCell =
  | { value: string; enabled: true }
  | { value: null; enabled: false };

const POSITION_GRID: PositionCell[][] = [
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
];

const ICON_STYLES = [
  { value: "default", label: "Default" },
  { value: "alt1", label: "Style 2" },
  { value: "alt2", label: "Style 3" },
  { value: "alt3", label: "Style 4" },
  { value: "alt4", label: "Style 5" },
  { value: "alt5", label: "Style 6" },
] as const;

interface Props {
  siteId: string;
  userPlan: string;
  config: Config;
}

export function WidgetConfigForm({ siteId, userPlan, config }: Props) {
  const [form, setForm] = useState<Config>(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");
  const [featuresExpanded, setFeaturesExpanded] = useState(false);

  // Visual-only local state (not sent to API)
  const [iconStyle, setIconStyle] = useState("default");
  const [iconSize, setIconSize] = useState<"small" | "medium" | "large">("medium");
  const [positionTab, setPositionTab] = useState<"desktop" | "mobile">("desktop");
  const [latestVersion, setLatestVersion] = useState(true);

  function setField<K extends keyof Config>(key: K, value: Config[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/sites/${siteId}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = (await res.json()) as { error?: string };
        setSaveError(data.error ?? "Failed to save — please try again");
      }
    } catch {
      setSaveError("Network error — please check your connection and try again");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const cardClass =
    "bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5";

  const applyBtnClass =
    "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const saveButtonClass =
    "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="space-y-6">
      {/* Two-column top section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ── LEFT COLUMN ── */}
        <div className="space-y-4">
          {/* Color of icon and widget */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Color of icon and widget
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="color"
                value={form.primaryColor}
                onChange={(e) => setField("primaryColor", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0"
              />
              <input
                type="text"
                value={form.primaryColor}
                onChange={(e) => setField("primaryColor", e.target.value)}
                className={cn(inputClass, "font-mono flex-1")}
                placeholder="#0066cc"
              />
            </div>

            {/* Theme */}
            <label className={labelClass}>Theme</label>
            <select
              value={form.theme}
              onChange={(e) => setField("theme", e.target.value)}
              className={cn(inputClass, "mb-4")}
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={applyBtnClass}
            >
              {saving ? "Saving…" : "Apply"}
            </button>
          </div>

          {/* Language settings */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Language settings
            </h3>
            <label className={labelClass}>Widget language</label>
            <select
              value={form.language}
              onChange={(e) => setField("language", e.target.value)}
              className={cn(inputClass, "mb-4")}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={applyBtnClass}
            >
              {saving ? "Saving…" : "Apply"}
            </button>
          </div>

          {/* Show version history */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Show version history
            </h3>
            <label className="flex items-center justify-between cursor-pointer mb-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Always load latest widget version
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={latestVersion}
                onClick={() => setLatestVersion((v) => !v)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                  latestVersion ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform",
                    latestVersion ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </label>
            <button type="button" className={applyBtnClass}>
              Apply
            </button>
          </div>

          {/* Accessibility Statement URL */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Accessibility Statement URL{" "}
              <span className="text-xs font-normal text-blue-600 dark:text-blue-400 ml-1">
                EAA Article 13
              </span>
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
              Link to your accessibility statement page. Shown in the widget footer — required for EU EAA compliance.
            </p>
            <input
              type="url"
              value={form.accessibilityStatementUrl}
              onChange={(e) => setField("accessibilityStatementUrl", e.target.value)}
              placeholder="https://yoursite.com/accessibility"
              className={cn(inputClass, "mb-4")}
            />
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={applyBtnClass}
            >
              {saving ? "Saving…" : "Apply"}
            </button>
          </div>

          {/* White Label (Business) */}
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">White Label</h3>
              {userPlan !== "business" && (
                <span className="text-xs bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded font-medium">
                  Business plan
                </span>
              )}
            </div>
            {userPlan !== "business" ? (
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Remove or replace &quot;Powered by Inculva&quot; in the widget footer.{" "}
                <a
                  href="/dashboard/settings/billing"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Upgrade to Business
                </a>{" "}
                to unlock.
              </p>
            ) : (
              <>
                <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
                  Leave empty to hide &quot;Powered by Inculva&quot;. Enter custom text to replace it.
                </p>
                <input
                  type="text"
                  value={form.whiteLabelText}
                  onChange={(e) => setField("whiteLabelText", e.target.value)}
                  placeholder='e.g. "Powered by Acme Corp" — or leave empty to hide'
                  className={cn(inputClass, "mb-1")}
                />
                <p className="text-xs text-gray-400 dark:text-gray-600 mb-4">
                  {form.whiteLabelText === ""
                    ? "Footer branding will be hidden."
                    : `Footer will show: "${form.whiteLabelText}"`}
                </p>
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saving}
                  className={applyBtnClass}
                >
                  {saving ? "Saving…" : "Apply"}
                </button>
              </>
            )}
          </div>

          {/* Allowed Domains */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Allowed Domains
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
              Restrict which domains can load this widget. Leave empty to allow all domains.
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && domainInput.trim()) {
                    e.preventDefault();
                    const d = domainInput.trim().toLowerCase();
                    if (!form.allowedDomains.includes(d)) {
                      setField("allowedDomains", [...form.allowedDomains, d]);
                    }
                    setDomainInput("");
                  }
                }}
                placeholder="example.com"
                className={cn(inputClass, "flex-1")}
              />
              <button
                type="button"
                onClick={() => {
                  const d = domainInput.trim().toLowerCase();
                  if (d && !form.allowedDomains.includes(d)) {
                    setField("allowedDomains", [...form.allowedDomains, d]);
                  }
                  setDomainInput("");
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Add
              </button>
            </div>
            {form.allowedDomains.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-gray-600 italic mb-4">
                All domains allowed
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 mb-4">
                {form.allowedDomains.map((domain) => (
                  <span
                    key={domain}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono"
                  >
                    {domain}
                    <button
                      type="button"
                      onClick={() =>
                        setField(
                          "allowedDomains",
                          form.allowedDomains.filter((d) => d !== domain)
                        )
                      }
                      className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 leading-none"
                      aria-label={`Remove ${domain}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={applyBtnClass}
            >
              {saving ? "Saving…" : "Apply"}
            </button>
          </div>

          {/* Appearance (Business plan only) */}
          <div className={cardClass}>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Appearance</h3>
              {userPlan !== "business" && (
                <span className="text-xs bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded font-medium">
                  Business plan
                </span>
              )}
            </div>
            {userPlan !== "business" ? (
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Customise border radius, button size, and font.{" "}
                <a
                  href="/dashboard/settings/billing"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Upgrade to Business
                </a>{" "}
                to unlock.
              </p>
            ) : (
              <div className="space-y-4 mt-3">
                <div>
                  <label className={labelClass}>Border Radius: {form.borderRadius}px</label>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={form.borderRadius}
                    onChange={(e) => setField("borderRadius", Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className={labelClass}>Button Size</label>
                  <select
                    value={form.buttonSize}
                    onChange={(e) => setField("buttonSize", e.target.value)}
                    className={inputClass}
                  >
                    <option value="small">Small (44px)</option>
                    <option value="medium">Medium (52px)</option>
                    <option value="large">Large (64px)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Font Family</label>
                  <select
                    value={form.fontFamily}
                    onChange={(e) => setField("fontFamily", e.target.value)}
                    className={inputClass}
                  >
                    <option value="system">System default</option>
                    <option value="inter">Inter</option>
                    <option value="roboto">Roboto</option>
                    <option value="opensans">Open Sans</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saving}
                  className={applyBtnClass}
                >
                  {saving ? "Saving…" : "Apply"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-4">
          {/* Icons style */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Icons style
            </h3>

            {/* Size selector */}
            <div className="flex gap-2 mb-4">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setIconSize(size)}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    iconSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-blue-400"
                  )}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>

            {/* Icon style grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {ICON_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setIconStyle(style.value)}
                  className={cn(
                    "aspect-square rounded-xl border-2 flex items-center justify-center transition-colors",
                    iconStyle === style.value
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 bg-gray-50 dark:bg-gray-800"
                  )}
                >
                  {/* Accessibility icon SVG */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                    className={
                      iconStyle === style.value
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
                    <circle cx="16" cy="10" r="2.5" fill="currentColor" />
                    <path
                      d="M10 14h12M16 14v8M13 22l-2 4M19 22l2 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <button type="button" className={applyBtnClass}>
              Apply
            </button>
          </div>

          {/* Icon position settings */}
          <div className={cardClass}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Icon position settings
            </h3>

            {/* Desktop / Mobile tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-4 w-fit">
              {(["desktop", "mobile"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPositionTab(tab)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-xs font-medium transition-colors",
                    positionTab === tab
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Visibility toggle */}
            <label className="flex items-center justify-between cursor-pointer mb-5">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Show widget on {positionTab}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={true}
                className="relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform translate-x-5 transition-transform" />
              </button>
            </label>

            {/* 3x3 position grid */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Icon position</p>
            <div className="grid grid-cols-3 gap-2 w-fit mb-4">
              {POSITION_GRID.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  if (!cell.enabled) {
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 opacity-40"
                      />
                    );
                  }
                  const isSelected = form.position === cell.value;
                  return (
                    <button
                      key={`${rowIdx}-${colIdx}`}
                      type="button"
                      onClick={() => setField("position", cell.value)}
                      className={cn(
                        "w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center",
                        isSelected
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 dark:border-gray-600 hover:border-blue-400 bg-gray-50 dark:bg-gray-800"
                      )}
                      aria-label={`Position: ${cell.value}`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          className="text-white"
                        >
                          <path
                            d="M2 6l3 3 5-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={applyBtnClass}
            >
              {saving ? "Saving…" : "Apply"}
            </button>
          </div>
        </div>
      </div>

      {/* Widget Features — collapsible */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setFeaturesExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Widget Features
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "text-gray-400 transition-transform",
              featuresExpanded ? "rotate-180" : ""
            )}
          >
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {featuresExpanded && (
          <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="grid grid-cols-1 gap-2">
              {FEATURES.map(({ key, label, description, wcag }) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {label}
                      </span>
                      {wcag && (
                        <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono">
                          WCAG {wcag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-600">{description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form[key]}
                    onClick={() => setField(key, !form[key])}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
                      form[key] ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform",
                        form[key] ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>
              ))}
            </div>

            {/* Save */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className={cn(
                  "px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors",
                  saving && "opacity-60 cursor-not-allowed"
                )}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              {saved && (
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Saved
                </span>
              )}
              {saveError && (
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {saveError}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Extended Widget Features */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setFeaturesExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Additional Features
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "text-gray-400 transition-transform",
              featuresExpanded ? "rotate-180" : ""
            )}
          >
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {featuresExpanded && (
          <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
              UserWay and Corpowid-inspired accessibility features.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {EXTENDED_FEATURES.map(({ key, label, description, wcag }) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {label}
                      </span>
                      {wcag && (
                        <span className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono">
                          WCAG {wcag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-600">{description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form[key] as boolean}
                    onClick={() => setField(key, !(form[key] as boolean) as Config[typeof key])}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
                      form[key] ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform",
                        form[key] ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </label>
              ))}
            </div>

            {/* Save */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className={cn(
                  "px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors",
                  saving && "opacity-60 cursor-not-allowed"
                )}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              {saved && (
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Saved
                </span>
              )}
              {saveError && (
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {saveError}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Accessibility Profiles */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Accessibility Profiles</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            One-click profiles bundle multiple features together. Enable the profiles you want available in your widget.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROFILES.map((profile) => {
            const enabled = !!form[profile.key];
            return (
              <button
                key={profile.key}
                type="button"
                onClick={() => setField(profile.key, !form[profile.key])}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all",
                  enabled
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                <span className="text-xl shrink-0 mt-0.5">{profile.icon}</span>
                <div>
                  <p className={cn("text-sm font-medium", enabled ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200")}>
                    {profile.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 leading-relaxed">{profile.description}</p>
                </div>
                <div className={cn("ml-auto shrink-0 w-4 h-4 rounded-full border-2 mt-0.5", enabled ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600")}>
                  {enabled && (
                    <svg viewBox="0 0 16 16" fill="none" className="w-full h-full text-white">
                      <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {PROFILES.filter(p => !!form[p.key]).length} of {PROFILES.length} profiles enabled
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className={saveButtonClass}
            >
              {saving ? "Saving…" : "Save profiles"}
            </button>
          </div>
        </div>
      </div>

      {/* Global save feedback (for Apply buttons) */}
      {(saved || saveError) && (
        <div
          className={cn(
            "px-4 py-3 rounded-lg text-sm font-medium",
            saved
              ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
          )}
        >
          {saved ? "Changes saved successfully." : saveError}
        </div>
      )}
    </div>
  );
}
