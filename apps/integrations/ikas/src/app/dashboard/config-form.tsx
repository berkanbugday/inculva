"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { type WidgetConfig, labels } from "./config-form.types";

type Locale = "tr" | "en";

export default function ConfigForm({
  config,
  token,
  locale: initialLocale,
}: {
  config: WidgetConfig;
  token: string;
  locale: Locale;
}) {
  const { register, handleSubmit, watch, setValue } = useForm<WidgetConfig>({
    defaultValues: config,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [scriptInstalled, setScriptInstalled] = useState(config.scriptInstalled);
  const [scriptStatus, setScriptStatus] = useState<"idle" | "installing" | "success" | "error">("idle");

  const currentColor = watch("primaryColor");
  const currentLang = watch("language") as Locale;
  const locale = currentLang === "tr" || currentLang === "en" ? currentLang : initialLocale;
  const t = labels[locale];

  const onSubmit = async (data: WidgetConfig) => {
    setStatus("saving");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  };

  const handleInstallScript = async () => {
    setScriptStatus("installing");
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setScriptInstalled(true);
      setScriptStatus("success");
    } catch {
      setScriptStatus("error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Widget Script Status */}
      <div className={`rounded-lg border p-4 ${scriptInstalled ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
        <h3 className="mb-1 text-sm font-semibold">{t.widgetStatus}</h3>
        <p className={`text-sm ${scriptInstalled ? "text-green-700" : "text-amber-700"}`}>
          {scriptInstalled ? t.scriptInstalled : t.scriptNotInstalled}
        </p>
        {!scriptInstalled && (
          <button
            type="button"
            onClick={handleInstallScript}
            disabled={scriptStatus === "installing"}
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {scriptStatus === "installing" ? t.installing : t.installScript}
          </button>
        )}
        {scriptStatus === "success" && (
          <p className="mt-2 text-sm text-green-600">{t.installSuccess}</p>
        )}
        {scriptStatus === "error" && (
          <p className="mt-2 text-sm text-red-600">{t.installError}</p>
        )}
      </div>

      {/* Widget Config Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">{t.widgetSettings}</h2>

        {/* Domain */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t.domain}</label>
          <input
            type="text"
            {...register("domain")}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="none"
            className="w-full rounded border p-2 text-sm"
          />
          <p className="mt-1 text-xs text-gray-400">{t.domainHint}</p>
        </div>

        {/* Position */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t.position}</label>
          <select {...register("position")} className="w-full rounded border p-2">
            {Object.entries(t.positions).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Primary Color */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t.primaryColor}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setValue("primaryColor", e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border"
            />
            <input
              type="text"
              {...register("primaryColor")}
              className="w-32 rounded border p-2 font-mono text-sm"
            />
          </div>
        </div>

        {/* Button Size */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t.buttonSize}</label>
          <select {...register("buttonSize")} className="w-full rounded border p-2">
            {Object.entries(t.sizes).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t.language}</label>
          <select {...register("language")} className="w-full rounded border p-2">
            {Object.entries(t.languages).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "saving"}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "saving" ? t.saving : t.save}
          </button>
          {status === "saved" && <span className="text-sm text-green-600">{t.saved}</span>}
          {status === "error" && <span className="text-sm text-red-600">{t.error}</span>}
        </div>
      </form>
    </div>
  );
}
