import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { StatCards } from "./stat-cards";
import { InsightsGrid } from "./insights-grid";
import { RecentActivity } from "./recent-activity";
import { PeriodTabs } from "./period-tabs";
import { getProfileLabels, getAllFeatureLabels, getEventLabel, getEventContextLabel } from "./labels";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ days?: string }>;
}

const VALID_DAYS = [7, 14, 30, 90] as const;
type ValidDays = (typeof VALID_DAYS)[number];

function parseDays(raw: string | undefined): ValidDays {
  const n = parseInt(raw ?? "30", 10);
  return (VALID_DAYS as readonly number[]).includes(n) ? (n as ValidDays) : 30;
}

export default async function StatisticsSitePage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const days = parseDays(sp.days);

  const session = await auth.api.getSession({ headers: await headers() });

  const site = await db.site.findFirst({
    where: { id, ownerId: session!.user.id },
  });
  if (!site) notFound();

  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);
  const dateLocale = locale === "tr" ? "tr-TR" : "en-US";
  const profileLabels = getProfileLabels(t);
  const featureLabels = getAllFeatureLabels(t);

  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setUTCHours(0, 0, 0, 0);

  const [events, widgetLoadAggregate, profileEvents] = await Promise.all([
    db.widgetEvent.findMany({
      where: { siteId: id, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 5_000,
      select: {
        id: true,
        event: true,
        feature: true,
        createdAt: true,
        sessionId: true,
      },
    }),
    db.widgetLoad.aggregate({
      where: { siteId: id, date: { gte: since } },
      _sum: { count: true },
    }),
    db.widgetEvent.findMany({
      where: { siteId: id, event: "profile_activated", createdAt: { gte: since } },
      select: { feature: true },
      take: 10_000,
    }),
  ]);
  const widgetLoads = widgetLoadAggregate._sum.count ?? 0;

  const featureCounts: Record<string, number> = {};
  let openCount = 0;

  for (const ev of events) {
    if (ev.event === "feature_enabled" && ev.feature) {
      featureCounts[ev.feature] = (featureCounts[ev.feature] ?? 0) + 1;
    }
    if (ev.event === "opened") openCount++;
  }

  const totalActivations = Object.values(featureCounts).reduce(
    (sum, c) => sum + c,
    0,
  );

  const featureStats = Object.entries(featureLabels)
    .map(([feature, label]) => ({
      feature,
      label,
      count: featureCounts[feature] ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const profileCounts: Record<string, number> = {};
  for (const ev of profileEvents) {
    if (!ev.feature) continue;
    profileCounts[ev.feature] = (profileCounts[ev.feature] ?? 0) + 1;
  }

  const profileStats = Object.entries(profileLabels)
    .map(([key, label]) => ({ key, label, count: profileCounts[key] ?? 0 }))
    .sort((a, b) => b.count - a.count);

  const recentEventsFormatted = events.slice(0, 5).map((ev) => ({
    id: ev.id,
    eventLabel: getEventLabel(t, ev.event),
    contextLabel: getEventContextLabel(t, ev.event, ev.feature),
    time: new Date(ev.createdAt).toLocaleString(dateLocale),
  }));

  return (
    <main className="space-y-6">
      <nav className="flex items-center gap-2 text-sm">
        <a
          href="/dashboard"
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          {t.breadcrumb.dashboard}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <a
          href={`/dashboard/sites/${id}`}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          {site.name}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {t.nav.statistics}
        </span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">
            {site.name} — {t.statistics.lastDays.replace("{days}", String(days))}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {site.domain}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Suspense>
            <PeriodTabs siteId={id} current={days} />
          </Suspense>
          <a
            href={`/api/sites/${id}/statistics/export?days=${days}`}
            download
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t.statistics.exportExcel}
          </a>
        </div>
      </div>

      <StatCards
        widgetLoads={widgetLoads}
        openCount={openCount}
        totalActivations={totalActivations}
        labels={{
          widgetLoads: t.statistics.widgetLoads,
          widgetOpens: t.statistics.widgetOpens,
          featureActivations: t.statistics.featureActivations,
        }}
      />

      <InsightsGrid
        featureStats={featureStats}
        profileStats={profileStats}
        labels={{
          featureUsage: t.statisticsPage.featureUsage,
          profileUsage: t.statisticsPage.profileUsage,
        }}
      />

      <RecentActivity
        events={recentEventsFormatted}
        labels={{
          recentEvents: t.statistics.recentEvents,
          event: t.statistics.event,
          feature: t.statistics.feature,
          time: t.statistics.time,
          noEventsYet: t.statistics.noEventsYet,
        }}
      />
    </main>
  );
}
