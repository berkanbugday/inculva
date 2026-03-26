"use client";

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
  buttonIcon: string;
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

  function setTab(tab: TabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
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
            userPlan={userPlan}
          />
        )}
        {activeTab === "features" && (
          <ConfigTabFeaturesRHF siteId={siteId} />
        )}
      </div>
    </FormProvider>
  );
}
