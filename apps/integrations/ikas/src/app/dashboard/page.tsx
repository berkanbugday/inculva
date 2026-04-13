import { db } from "@inculva/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { ConfigForm } from "./config-form";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.siteId) redirect("/");

  const config = await db.widgetConfig.findUnique({
    where: { siteId: session.siteId },
  });

  if (!config) redirect("/");

  const initialConfig = {
    position: config.position,
    primaryColor: config.primaryColor,
    language: config.language,
    buttonSize: (config.buttonSize as string) ?? "medium",
    textResizing: config.textResizing,
    dyslexiaFont: config.dyslexiaFont,
    cursorEnhancement: config.cursorEnhancement,
    keyboardNavigation: config.keyboardNavigation,
    readingGuide: config.readingGuide,
    screenReader: config.screenReader,
    pauseAnimations: config.pauseAnimations,
    textSpacing: config.textSpacing,
    highlightLinks: config.highlightLinks,
    colorBlindMode: config.colorBlindMode,
    focusHighlight: config.focusHighlight,
    skipNavigation: config.skipNavigation,
    darkMode: config.darkMode,
    profileAdhd: config.profileAdhd,
    profileBlind: config.profileBlind,
    profileLowVision: config.profileLowVision,
    profileColorBlind: config.profileColorBlind,
    profileDyslexia: config.profileDyslexia,
    profileMotorImpaired: config.profileMotorImpaired,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          inculva widget settings
        </h1>
        <a
          href={`${env.inculvaAppUrl}/dashboard/sites/${session.siteId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          View scan reports &rarr;
        </a>
      </div>
      <ConfigForm initialConfig={initialConfig} locale={config.language} />
    </div>
  );
}
