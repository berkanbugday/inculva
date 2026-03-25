import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  const [user, sites, subscription] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        plan: true,
        createdAt: true,
      },
    }),
    db.site.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        domain: true,
        createdAt: true,
        widgetConfig: {
          select: {
            position: true,
            theme: true,
            language: true,
            primaryColor: true,
            allowedDomains: true,
            accessibilityStatementUrl: true,
            whiteLabelText: true,
            lastScanAt: true,
            lastScanViolations: true,
            textResizing: true,
            highContrast: true,
            dyslexiaFont: true,
            cursorEnhancement: true,
            keyboardNavigation: true,
            readingGuide: true,
            screenReader: true,
            pauseAnimations: true,
            textSpacing: true,
            highlightLinks: true,
            colorBlindMode: true,
            largeClickTargets: true,
            focusHighlight: true,
            grayscale: true,
            skipNavigation: true,
            muteMedia: true,
            readingMask: true,
            textAlign: true,
            saturation: true,
          },
        },
        _count: {
          select: {
            widgetEvents: { where: { createdAt: { gte: ninetyDaysAgo } } },
          },
        },
      },
    }),
    db.subscription.findUnique({
      where: { userId },
      select: {
        plan: true,
        status: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        canceledAt: true,
      },
    }),
  ]);

  const exportData = {
    exportedAt: new Date().toISOString(),
    exportVersion: "1.0",
    user,
    subscription: subscription ?? null,
    sites: sites.map((s) => ({
      id: s.id,
      name: s.name,
      domain: s.domain,
      createdAt: s.createdAt,
      config: s.widgetConfig,
      eventsLast90Days: s._count.widgetEvents,
    })),
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="inculva-data-export-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}
