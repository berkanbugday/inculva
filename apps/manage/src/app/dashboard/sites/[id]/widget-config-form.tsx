"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { ConfigTabGeneral } from "./config-tab-general";
import { ConfigTabFeaturesRHF } from "./config-tab-features-rhf";

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
  { id: "general", label: "General" },
  { id: "features", label: "Features & Profiles" },
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
    : "general";

  const methods = useForm<Config>({
    defaultValues: config,
    mode: "onChange",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave(data: Config) {
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
        methods.reset(data);
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

  const onSubmit = methods.handleSubmit(handleSave);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-6">
        <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm overflow-x-auto w-full sm:w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTab(tab.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "general" && (
          <ConfigTabGeneral
            siteId={siteId}
            initialName={initialName}
            initialDomain={initialDomain}
            widgetScriptSrc={widgetScriptSrc}
            badgeSrc={badgeSrc}
            userPlan={userPlan}
          />
        )}
        {activeTab === "features" && <ConfigTabFeaturesRHF />}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || !methods.formState.isDirty}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
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
      </form>
    </FormProvider>
  );
}
