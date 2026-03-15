"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ConfigTabSetup } from "./config-tab-setup";
import { ConfigTabAppearance } from "./config-tab-appearance";
import { ConfigTabFeatures } from "./config-tab-features";
import { ConfigTabProfiles } from "./config-tab-profiles";

export type Config = {
  position: string;
  primaryColor: string;
  language: string;
  accessibilityStatementUrl: string;
  whiteLabelText: string;
  allowedDomains: string[];
  buttonSize: "small" | "medium" | "large";
  borderRadius: number;
  fontFamily: string;
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
  largeClickTargets: boolean;
  focusHighlight: boolean;
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
};

const TABS = [
  { id: "setup", label: "Setup" },
  { id: "appearance", label: "Appearance" },
  { id: "features", label: "Features" },
  { id: "profiles", label: "Profiles" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface Props {
  siteId: string;
  userPlan: string;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
  badgeSrc: string;
  config: Config;
}

export function WidgetConfigForm({
  siteId,
  userPlan,
  initialName,
  initialDomain,
  widgetScriptSrc,
  badgeSrc,
  config,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const activeTab: TabId = TABS.some((t) => t.id === tabParam)
    ? (tabParam as TabId)
    : "setup";

  const [form, setForm] = useState<Config>(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");

  function setField<K extends keyof Config>(key: K, value: Config[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setSaveError(null);
  }

  function isValidDomain(domain: string): boolean {
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    return domainRegex.test(domain) && !domain.includes("://");
  }

  function addDomain() {
    const trimmed = domainInput.trim().toLowerCase();
    if (!trimmed) return;

    if (!isValidDomain(trimmed)) {
      setSaveError("Invalid domain format. Use format: example.com");
      return;
    }

    if (!form.allowedDomains.includes(trimmed)) {
      setField("allowedDomains", [...form.allowedDomains, trimmed]);
    }
    setDomainInput("");
  }

  function removeDomain(domain: string) {
    setField(
      "allowedDomains",
      form.allowedDomains.filter((d) => d !== domain),
    );
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
      setSaveError("Network error — please check your connection");
    } finally {
      setSaving(false);
    }
  }

  function setTab(tab: TabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const tabProps = {
    form,
    setField,
    saving,
    saved,
    saveError,
    onSave: () => void handleSave(),
  };

  return (
    <div className="space-y-6">
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "setup" && (
        <ConfigTabSetup
          {...tabProps}
          siteId={siteId}
          initialName={initialName}
          initialDomain={initialDomain}
          widgetScriptSrc={widgetScriptSrc}
          badgeSrc={badgeSrc}
          domainInput={domainInput}
          setDomainInput={setDomainInput}
          addDomain={addDomain}
          removeDomain={removeDomain}
        />
      )}
      {activeTab === "appearance" && (
        <ConfigTabAppearance {...tabProps} userPlan={userPlan} />
      )}
      {activeTab === "features" && <ConfigTabFeatures {...tabProps} />}
      {activeTab === "profiles" && <ConfigTabProfiles {...tabProps} />}
    </div>
  );
}
