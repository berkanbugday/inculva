"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface Config {
  position: string;
  primaryColor: string;
  language: string;
  buttonSize: string;
  textResizing: boolean;
  dyslexiaFont: boolean;
  cursorEnhancement: boolean;
  keyboardNavigation: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  pauseAnimations: boolean;
  textSpacing: boolean;
  highlightLinks: boolean;
  colorBlindMode: boolean;
  focusHighlight: boolean;
  skipNavigation: boolean;
  darkMode: boolean;
  profileAdhd: boolean;
  profileBlind: boolean;
  profileLowVision: boolean;
  profileColorBlind: boolean;
  profileDyslexia: boolean;
  profileMotorImpaired: boolean;
}

const POSITIONS = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

const BUTTON_SIZES = ["small", "medium", "large"] as const;

const FEATURES: { key: keyof Config; label: string }[] = [
  { key: "textResizing", label: "Text Resizing" },
  { key: "dyslexiaFont", label: "Dyslexia Font" },
  { key: "cursorEnhancement", label: "Cursor Enhancement" },
  { key: "keyboardNavigation", label: "Keyboard Navigation" },
  { key: "readingGuide", label: "Reading Guide" },
  { key: "screenReader", label: "Screen Reader" },
  { key: "pauseAnimations", label: "Pause Animations" },
  { key: "textSpacing", label: "Text Spacing" },
  { key: "highlightLinks", label: "Highlight Links" },
  { key: "colorBlindMode", label: "Color Blind Mode" },
  { key: "focusHighlight", label: "Focus Highlight" },
  { key: "skipNavigation", label: "Skip Navigation" },
  { key: "darkMode", label: "Dark Mode" },
];

const PROFILES: { key: keyof Config; label: string }[] = [
  { key: "profileAdhd", label: "ADHD" },
  { key: "profileBlind", label: "Blind" },
  { key: "profileLowVision", label: "Low Vision" },
  { key: "profileColorBlind", label: "Color Blind" },
  { key: "profileDyslexia", label: "Dyslexia" },
  { key: "profileMotorImpaired", label: "Motor Impaired" },
];

interface Props {
  initialConfig: Config;
  locale: string;
}

export function ConfigForm({ initialConfig, locale }: Props) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const { register, handleSubmit, watch } = useForm<Config>({
    defaultValues: initialConfig,
  });
  const isEn = locale !== "tr";

  async function onSubmit(data: Config) {
    setStatus("saving");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Position */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {isEn ? "Widget position" : "Widget konumu"}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {POSITIONS.map((pos) => (
            <label
              key={pos.value}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                watch("position") === pos.value
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input type="radio" value={pos.value} {...register("position")} className="sr-only" />
              {pos.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Primary Color */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{isEn ? "Primary color" : "Ana renk"}</span>
        <div className="mt-1 flex items-center gap-3">
          <input type="color" {...register("primaryColor")} className="h-9 w-9 cursor-pointer rounded border border-gray-200" />
          <input type="text" {...register("primaryColor")} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-mono" />
        </div>
      </label>

      {/* Button Size */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">{isEn ? "Button size" : "Buton boyutu"}</legend>
        <div className="flex gap-2">
          {BUTTON_SIZES.map((size) => (
            <label key={size} className={`rounded-lg border px-4 py-2 text-sm cursor-pointer transition-colors ${watch("buttonSize") === size ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" value={size} {...register("buttonSize")} className="sr-only" />
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Features */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">{isEn ? "Features" : "Ozellikler"}</legend>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map((f) => (
            <label key={f.key} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:border-gray-300">
              <input type="checkbox" {...register(f.key)} className="rounded border-gray-300" />
              {f.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Profiles */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">{isEn ? "Accessibility profiles" : "Erisilebilirlik profilleri"}</legend>
        <div className="grid grid-cols-2 gap-2">
          {PROFILES.map((p) => (
            <label key={p.key} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:border-gray-300">
              <input type="checkbox" {...register(p.key)} className="rounded border-gray-300" />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === "saving"} className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50">
          {status === "saving" ? (isEn ? "Saving..." : "Kaydediliyor...") : (isEn ? "Save" : "Kaydet")}
        </button>
        {status === "saved" && <span className="text-sm text-green-600">{isEn ? "Settings saved" : "Ayarlar kaydedildi"}</span>}
        {status === "error" && <span className="text-sm text-red-600">{isEn ? "Failed to save" : "Kayit basarisiz"}</span>}
      </div>
    </form>
  );
}
