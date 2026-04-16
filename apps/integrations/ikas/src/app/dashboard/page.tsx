"use client";

import { useEffect, useState } from "react";
import ConfigForm from "./config-form";
import TrialBanner from "./trial-banner";
import { type WidgetConfig, labels } from "./config-form.types";

type Locale = "tr" | "en";

function getLocale(): Locale {
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
  }
  return "en";
}

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [error, setError] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  // Use config language if available, otherwise browser locale
  const uiLocale: Locale =
    config?.language === "tr" || config?.language === "en"
      ? config.language
      : locale;
  const t = labels[uiLocale];

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  // Get token from URL (OAuth callback) or sessionStorage (returning visit)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      sessionStorage.setItem("ikas_token", urlToken);
      window.history.replaceState({}, "", window.location.pathname);
      setToken(urlToken);
    } else {
      const stored = sessionStorage.getItem("ikas_token");
      if (stored) {
        setToken(stored);
      } else {
        setError(true);
      }
    }
  }, []);

  // Fetch config once we have a token
  useEffect(() => {
    if (!token) return;

    fetch("/api/config", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem("ikas_token");
          setError(true);
          return null;
        }
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data) setConfig(data as WidgetConfig);
      })
      .catch(() => setError(true));
  }, [token]);

  const langSwitcher = (
    <div className="absolute right-4 top-4">
      <select
        value={uiLocale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="rounded border bg-white px-2 py-1 text-sm text-gray-600"
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-8">
        {langSwitcher}
        <p className="text-center text-gray-500">{t.expired}</p>
      </div>
    );
  }

  if (!config || !token) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        {langSwitcher}
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-gray-400">{t.loading}</p>
        </div>
      </div>
    );
  }

  const inculvaAppUrl =
    process.env.NEXT_PUBLIC_INCULVA_APP_URL ?? "https://app.inculva.com";

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold">{t.dashboard}</h1>

      <TrialBanner locale={uiLocale} manageUrl={inculvaAppUrl} />

      <div className="mt-6">
        <ConfigForm config={config} token={token} locale={uiLocale} />
      </div>

      <div className="mt-8 border-t pt-6">
        <a
          href={inculvaAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          {t.scanReports} &rarr;
        </a>
      </div>
    </div>
  );
}
