"use client";

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

interface Props {
  form: Config;
  setField: <K extends keyof Config>(key: K, value: Config[K]) => void;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onSave: () => void;
}

export function ConfigTabAppearance({
  form,
  setField,
  saving,
  saved,
  saveError,
  onSave,
}: Props) {

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-5">
        {/* Primary color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary color
          </label>
          <div className="flex items-center gap-3">
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
              className="w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="#0066cc"
            />
          </div>
        </div>

        {/* Trigger button preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trigger button preview
          </label>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: form.primaryColor }}
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

        {/* Button size */}
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
                onClick={() => setField("buttonSize", val)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${form.buttonSize === val ? "bg-white dark:bg-[#1a1a2e] text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Widget position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Widget position
          </label>
          <div className="grid grid-cols-3 gap-2 w-fit">
            {POSITION_GRID.map((row, ri) =>
              row.map((cell, ci) => (
                <button
                  key={`${ri}-${ci}`}
                  disabled={!cell.enabled}
                  onClick={() =>
                    cell.enabled &&
                    cell.value &&
                    setField("position", cell.value)
                  }
                  className={`w-10 h-10 rounded-xl border-2 transition-colors ${
                    !cell.enabled
                      ? "border-transparent bg-[#f8f9fc] dark:bg-[#0e0e10] cursor-default"
                      : cell.value === form.position
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
