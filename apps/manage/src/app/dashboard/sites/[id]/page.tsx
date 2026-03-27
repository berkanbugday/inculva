import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { WidgetConfigForm } from "./widget-config-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SitePage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) notFound();

  const site = await db.site.findFirst({
    where: { id, ownerId: session.user.id },
    include: { widgetConfig: true },
  });

  if (!site) notFound();

  const wc = site.widgetConfig;

  return (
    <main className="space-y-6">
      {wc && (
        <WidgetConfigForm
          siteId={site.id}
          initialName={site.name}
          initialDomain={site.domain}
          widgetScriptSrc={process.env["NEXT_PUBLIC_WIDGET_URL"]!}
          config={{
            position: wc.position,
            primaryColor: wc.primaryColor,
            language: wc.language,
            accessibilityStatementUrl: wc.accessibilityStatementUrl ?? "",
            whiteLabelText: wc.whiteLabelText ?? "",
            buttonSize: (["small", "medium", "large"].includes(
              wc.buttonSize as string,
            )
              ? wc.buttonSize
              : "medium") as "small" | "medium" | "large",
            buttonIcon: wc.buttonIcon ?? "universal-access",
            textResizing: wc.textResizing,
            dyslexiaFont: wc.dyslexiaFont,
            cursorEnhancement: wc.cursorEnhancement,
            keyboardNavigation: wc.keyboardNavigation,
            readingGuide: wc.readingGuide,
            screenReader: wc.screenReader,
            pauseAnimations: wc.pauseAnimations,
            textSpacing: wc.textSpacing,
            highlightLinks: wc.highlightLinks,
            colorBlindMode: wc.colorBlindMode,
            largeClickTargets: wc.largeClickTargets,
            focusHighlight: wc.focusHighlight,
            skipNavigation: wc.skipNavigation,
            muteMedia: wc.muteMedia,
            readingMask: wc.readingMask ?? true,
            textAlign: wc.textAlign ?? true,
            saturation: wc.saturation ?? true,
            blueLightFilter: wc.blueLightFilter,
            hideImages: wc.hideImages,
            darkMode: wc.darkMode,
            contentMagnifier: wc.contentMagnifier,
            toolTips: wc.toolTips,
            sustainabilityMode: wc.sustainabilityMode,
            slowCursor: wc.slowCursor,
            dictionary: wc.dictionary,
            lineHeight: wc.lineHeight,
            highlightTitles: wc.highlightTitles,
            profileAdhd: wc.profileAdhd,
            profileBlind: wc.profileBlind,
            profileLowVision: wc.profileLowVision,
            profileColorBlind: wc.profileColorBlind,
            profileDyslexia: wc.profileDyslexia,
            profileMotorImpaired: wc.profileMotorImpaired,
            profileCognitive: wc.profileCognitive,
            profileSeizure: wc.profileSeizure,
            profileParkinson: wc.profileParkinson,
          }}
        />
      )}
    </main>
  );
}
