"use client";

import { useState } from "react";
import { cn } from "@inculva/ui";
import type { WidgetFeatures } from "@inculva/types";
import { WidgetPreview } from "./widget-preview";

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

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="space-y-6">
      {/* Live preview */}
      <WidgetPreview
        config={{
          siteId,
          position: form.position,
          theme: form.theme,
          primaryColor: form.primaryColor,
        }}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Widget Settings</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Position */}
            <div>
              <label className={labelClass}>Position</label>
              <select
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
                className={inputClass}
              >
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p.replace("-", " ")}</option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className={labelClass}>Theme</label>
              <select
                value={form.theme}
                onChange={(e) => setField("theme", e.target.value)}
                className={inputClass}
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Primary Color */}
            <div>
              <label className={labelClass}>Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) => setField("primaryColor", e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  type="text"
                  value={form.primaryColor}
                  onChange={(e) => setField("primaryColor", e.target.value)}
                  className={cn(inputClass, "flex-1 font-mono")}
                  placeholder="#0066cc"
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className={labelClass}>Language</label>
              <select
                value={form.language}
                onChange={(e) => setField("language", e.target.value)}
                className={inputClass}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Accessibility Statement URL */}
          <div className="mt-4">
            <label className={labelClass}>
              Accessibility Statement URL{" "}
              <span className="text-xs font-normal text-blue-600 dark:text-blue-400 ml-1">EAA Article 13</span>
            </label>
            <input
              type="url"
              value={form.accessibilityStatementUrl}
              onChange={(e) => setField("accessibilityStatementUrl", e.target.value)}
              placeholder="https://yoursite.com/accessibility"
              className={inputClass}
            />
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Link to your accessibility statement page. Shown in the widget footer — required for EU EAA compliance.
            </p>
          </div>
        </div>

        {/* Appearance (Business plan) */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Appearance</h4>
            {userPlan !== "business" && (
              <span className="text-xs bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded font-medium">
                Business plan
              </span>
            )}
          </div>
          {userPlan !== "business" ? (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Customise border radius, button size, and font.{" "}
              <a href="/dashboard/settings/billing" className="text-blue-600 dark:text-blue-400 underline">Upgrade to Business</a> to unlock.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-3">
              {/* Border radius */}
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
              {/* Button size */}
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
              {/* Font family */}
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
            </div>
          )}
        </div>

        {/* White Label */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">White Label</h4>
            {userPlan !== "business" && (
              <span className="text-xs bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded font-medium">
                Business plan
              </span>
            )}
          </div>
          {userPlan !== "business" ? (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Remove or replace "Powered by Inculva" in the widget footer.{" "}
              <a href="/dashboard/settings/billing" className="text-blue-600 dark:text-blue-400 underline">Upgrade to Business</a> to unlock.
            </p>
          ) : (
            <>
              <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
                Leave empty to hide "Powered by Inculva". Enter custom text to replace it.
              </p>
              <input
                type="text"
                value={form.whiteLabelText}
                onChange={(e) => setField("whiteLabelText", e.target.value)}
                placeholder='e.g. "Powered by Acme Corp" — or leave empty to hide'
                className={inputClass}
              />
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                {form.whiteLabelText === ""
                  ? "Footer branding will be hidden."
                  : `Footer will show: "${form.whiteLabelText}"`}
              </p>
            </>
          )}
        </div>

        {/* Allowed Domains */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Allowed Domains</h4>
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
            <p className="text-xs text-gray-400 dark:text-gray-600 italic">All domains allowed</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {form.allowedDomains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono"
                >
                  {domain}
                  <button
                    type="button"
                    onClick={() => setField("allowedDomains", form.allowedDomains.filter((d) => d !== domain))}
                    className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 leading-none"
                    aria-label={`Remove ${domain}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Enabled Features</h4>
          <div className="grid grid-cols-1 gap-2">
            {FEATURES.map(({ key, label, description, wcag }) => (
              <label
                key={key}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
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
        </div>

        {/* Save */}
        <div className="flex items-center gap-3 pt-2">
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
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">✓ Saved</span>
          )}
          {saveError && (
            <span className="text-sm text-red-600 dark:text-red-400 font-medium">{saveError}</span>
          )}
        </div>
      </div>
    </div>
  );
}
