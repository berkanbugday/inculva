import { NextResponse } from "next/server";
import { db } from "@inculva/db";
import { sendEmail, weeklyDigestTemplate } from "@inculva/email";

const featureLabels: Record<string, string> = {
  textResizing: "Text Resizing",
  highContrast: "High Contrast",
  dyslexiaFont: "Dyslexia Font",
  cursorEnhancement: "Big Cursor",
  keyboardNavigation: "Keyboard Nav",
  readingGuide: "Reading Guide",
  screenReader: "Screen Reader",
  pauseAnimations: "Pause Animations",
  textSpacing: "Text Spacing",
  highlightLinks: "Highlight Links",
  colorBlindMode: "Color Blind Mode",
  largeClickTargets: "Large Click Targets",
  focusHighlight: "Focus Highlight",
  grayscale: "Grayscale",
  skipNavigation: "Skip Navigation",
  muteMedia: "Mute Media",
  readingMask: "Reading Mask",
  textAlign: "Text Alignment",
  saturation: "Saturation",
};

export const maxDuration = 300; // 5 min — runs across many users

export async function GET(req: Request) {
  // Protect with bearer token
  const secret = process.env["CRON_SECRET"];
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date();
  since.setDate(since.getDate() - 7);
  since.setUTCHours(0, 0, 0, 0);

  // Find all users who have sites with activity in the past 7 days
  const activeUsers = await db.user.findMany({
    where: {
      sites: {
        some: {
          widgetEvents: {
            some: { createdAt: { gte: since } },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      sites: {
        select: {
          id: true,
          name: true,
          domain: true,
          widgetEvents: {
            where: { createdAt: { gte: since } },
            select: { feature: true },
          },
        },
      },
    },
  });

  const now = new Date();
  const weekStart = new Date(since);
  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  let sent = 0;
  let errors = 0;

  for (const user of activeUsers) {
    // Build per-site stats
    const siteStats = user.sites
      .filter((s) => s.widgetEvents.length > 0)
      .map((s) => {
        const featureCounts: Record<string, number> = {};
        for (const ev of s.widgetEvents) {
          if (ev.feature) featureCounts[ev.feature] = (featureCounts[ev.feature] ?? 0) + 1;
        }
        const topFeatureKey = Object.entries(featureCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        return {
          name: s.name,
          domain: s.domain,
          events: s.widgetEvents.length,
          topFeature: topFeatureKey ? (featureLabels[topFeatureKey] ?? topFeatureKey) : null,
        };
      })
      .sort((a, b) => b.events - a.events);

    const totalEvents = siteStats.reduce((sum, s) => sum + s.events, 0);

    try {
      await sendEmail({
        to: user.email,
        subject: `Your Inculva weekly digest — ${totalEvents.toLocaleString()} events`,
        html: weeklyDigestTemplate(user.name ?? "", totalEvents, siteStats, weekLabel),
      });
      sent++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({ success: true, sent, errors, total: activeUsers.length });
}
