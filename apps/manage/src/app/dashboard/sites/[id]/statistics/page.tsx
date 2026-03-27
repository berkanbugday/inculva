import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { TrendChart, FeatureBarChart } from "./charts";
import { PeriodTabs } from "./period-tabs";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale, DashboardMessages } from "@/i18n/messages";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ days?: string }>;
}

function getProfileLabels(t: DashboardMessages): Record<string, string> {
  return {
    profileAdhd: t.statisticsPage.profileAdhd,
    profileBlind: t.statisticsPage.profileBlind,
    profileLowVision: t.statisticsPage.profileLowVision,
    profileColorBlind: t.statisticsPage.profileColorBlind,
    profileDyslexia: t.statisticsPage.profileDyslexia,
    profileMotorImpaired: t.statisticsPage.profileMotorImpaired,
  };
}

function getFeatureLabel(t: ReturnType<typeof getMessages>, key: string): string {
  switch (key) {
    case "textResizing":
      return t.statisticsPage.featureTextResizing;
    case "highContrast":
      return t.statisticsPage.featureHighContrast;
    case "dyslexiaFont":
      return t.statisticsPage.featureDyslexiaFont;
    case "cursorEnhancement":
      return t.statisticsPage.featureCursorEnhancement;
    case "keyboardNavigation":
      return t.statisticsPage.featureKeyboardNavigation;
    case "readingGuide":
      return t.statisticsPage.featureReadingGuide;
    case "screenReader":
      return t.statisticsPage.featureScreenReader;
    case "pauseAnimations":
      return t.statisticsPage.featurePauseAnimations;
    case "textSpacing":
      return t.statisticsPage.featureTextSpacing;
    case "highlightLinks":
      return t.statisticsPage.featureHighlightLinks;
    case "colorBlindMode":
      return t.statisticsPage.featureColorBlindMode;
    case "largeClickTargets":
      return t.statisticsPage.featureLargeClickTargets;
    case "focusHighlight":
      return t.statisticsPage.featureFocusHighlight;
    case "grayscale":
      return t.statisticsPage.featureGrayscale;
    case "skipNavigation":
      return t.statisticsPage.featureSkipNavigation;
    case "muteMedia":
      return t.statisticsPage.featureMuteMedia;
    case "readingMask":
      return t.statisticsPage.featureReadingMask;
    case "textAlign":
      return t.statisticsPage.featureTextAlign;
    case "saturation":
      return t.statisticsPage.featureSaturation;
    case "blueLightFilter":
      return t.statisticsPage.featureBlueLightFilter;
    case "hideImages":
      return t.statisticsPage.featureHideImages;
    case "darkMode":
      return t.statisticsPage.featureDarkMode;
    case "contentMagnifier":
      return t.statisticsPage.featureContentMagnifier;
    case "slowCursor":
      return t.statisticsPage.featureSlowCursor;
    case "lineHeight":
      return t.statisticsPage.featureLineHeight;
    case "highlightTitles":
      return t.statisticsPage.featureHighlightTitles;
    default:
      return key;
  }
}

function getEventLabel(
  t: ReturnType<typeof getMessages>,
  event: string,
): string {
  switch (event) {
    case "opened":
      return t.statistics.eventOpened;
    case "closed":
      return t.statistics.eventClosed;
    case "feature_enabled":
      return t.statistics.eventFeatureEnabled;
    case "feature_disabled":
      return t.statistics.eventFeatureDisabled;
    case "profile_activated":
      return t.statistics.eventProfileActivated;
    default:
      return event;
  }
}

function getEventContextLabel(
  t: ReturnType<typeof getMessages>,
  event: string,
  value: string | null,
): string {
  if (!value) return "—";
  if (event === "feature_enabled" || event === "feature_disabled") {
    return getFeatureLabel(t, value);
  }
  if (event === "profile_activated") {
    const labels = getProfileLabels(t);
    return labels[value] ?? value;
  }
  return "—";
}

const VALID_DAYS = [7, 14, 30, 90] as const;
type ValidDays = (typeof VALID_DAYS)[number];
const EVENT_TYPES = [
  "opened",
  "closed",
  "feature_enabled",
  "feature_disabled",
  "profile_activated",
] as const;

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

  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setUTCHours(0, 0, 0, 0);

  const [events, domainLoads, widgetLoadAggregate, profileEvents] = await Promise.all([
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
    db.widgetLoad.groupBy({
      by: ["domain"],
      where: { siteId: id, date: { gte: since } },
      _sum: { count: true },
      _max: { date: true },
      orderBy: { _sum: { count: "desc" } },
      take: 20,
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

  const dailyMap: Record<string, number> = {};
  const featureEnableMap: Record<string, Set<string>> = {};
  let openCount = 0;

  for (const ev of events) {
    const day = new Date(ev.createdAt).toISOString().slice(0, 10);
    dailyMap[day] = (dailyMap[day] ?? 0) + 1;
    if (ev.event === "feature_enabled" && ev.feature) {
      if (!featureEnableMap[ev.feature]) {
        featureEnableMap[ev.feature] = new Set();
      }
      featureEnableMap[ev.feature]!.add(ev.sessionId);
    }
    if (ev.event === "opened") openCount++;
  }

  const daily: { date: string; count: number }[] = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    daily.push({ date: key, count: dailyMap[key] ?? 0 });
  }

  const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;
  const totalActivations = Object.values(featureEnableMap).reduce(
    (sum, s) => sum + s.size,
    0,
  );

  const featureStats = Object.entries(featureEnableMap)
    .map(([feature, sessions]) => ({
      feature,
      label: getFeatureLabel(t, feature),
      count: sessions.size,
      adoptionPct:
        uniqueSessions > 0
          ? Math.round((sessions.size / uniqueSessions) * 100)
          : 0,
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

  const profileStatsUsed = profileStats.filter((p) => p.count > 0);
  const hasProfileUsage = profileStatsUsed.length > 0;
  const hasFeatureUsage = featureStats.length > 0;
  const maxProfileCount = Math.max(...profileStats.map((p) => p.count), 1);
  const engagement = widgetLoads > 0 ? Math.round((openCount / widgetLoads) * 100) : 0;
  const eventTypeCounts = EVENT_TYPES.map((type) => ({
    type,
    label: getEventLabel(t, type),
    count: events.filter((ev) => ev.event === type).length,
  })).filter((entry) => entry.count > 0);

  const statCards = [
    { label: t.statistics.widgetLoads, value: widgetLoads, color: "blue" },
    { label: t.statistics.widgetOpens, value: openCount, color: "purple" },
    {
      label: t.statistics.uniqueSessions,
      value: uniqueSessions,
      color: "green",
    },
    {
      label: t.statistics.featureActivations,
      value: totalActivations,
      color: "gray",
    },
  ] as const;

  const colorMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    green: "text-green-600 dark:text-green-400",
    gray: "text-gray-900 dark:text-white",
  };

  const recentEvents = events.slice(0, 50);
  const recentEventsPreview = recentEvents.slice(0, 10);
  const topFeatures = featureStats.slice(0, 5);
  const topProfiles = profileStatsUsed.slice(0, 5);
  const topDomains = domainLoads.slice(0, 5);
  const hasAdvancedSection = hasFeatureUsage || hasProfileUsage || domainLoads.length > 0;

  return (
    <main className="space-y-8">
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

      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { label: t.siteTabs.config, href: `/dashboard/sites/${id}` },
          {
            label: t.nav.statistics,
            href: `/dashboard/sites/${id}/statistics`,
            active: true,
          },
          { label: t.siteTabs.wcagScan, href: `/dashboard/sites/${id}/scan` },
          {
            label: t.siteTabs.statement,
            href: `/dashboard/sites/${id}/statement`,
          },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              tab.active
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </a>
        ))}
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
            {t.statistics.exportCsv}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {label}
            </p>
            <p className={`text-3xl font-black mt-1 ${colorMap[color]}`}>
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-6 bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.statisticsPage.engagementRate}
            </p>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {engagement}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${Math.min(engagement, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 shrink-0">
          {t.statisticsPage.opensLoads}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
          {t.statistics.dailyEvents} ({days})
        </h3>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            {t.statistics.noEventsYet}
          </p>
        ) : (
          <TrendChart data={daily} locale={locale} />
        )}
      </div>

      {eventTypeCounts.length > 0 && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {t.statistics.event}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {eventTypeCounts.map((row) => (
              <div
                key={row.type}
                className="rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] p-3"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {row.label}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1 tabular-nums">
                  {row.count.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(hasFeatureUsage || hasProfileUsage || topDomains.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {hasFeatureUsage && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t.statistics.featureAdoption}
              </h3>
              <div className="space-y-3">
                {topFeatures.map((f) => (
                  <div key={f.feature} className="flex items-center gap-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {f.label}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {f.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasProfileUsage && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t.statisticsPage.profileUsage}
              </h3>
              <div className="space-y-3">
                {topProfiles.map((profile) => (
                  <div key={profile.key} className="flex items-center gap-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {profile.label}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {profile.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topDomains.length > 0 && (
            <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t.statistics.embedDomains}
              </h3>
              <div className="space-y-3">
                {topDomains.map((row) => (
                  <div key={row.domain} className="flex items-center gap-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate font-mono">
                      {row.domain}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {(row._sum.count ?? 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {hasAdvancedSection && (
        <details className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <summary className="cursor-pointer select-none font-semibold text-gray-900 dark:text-white">
            Advanced analytics
          </summary>
          <div className="mt-6 space-y-8">
            {hasFeatureUsage && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t.statistics.featureAdoption}
                  </h3>
                  {uniqueSessions > 0 && (
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      %{" "}
                      {t.statistics.ofUniqueSessions.replace(
                        "{count}",
                        uniqueSessions.toLocaleString(),
                      )}
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  <FeatureBarChart data={featureStats} />
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    {t.statisticsPage.featureUsageDesc}
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                          <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {t.statistics.feature}
                          </th>
                          <th className="text-right py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {t.statistics.sessions}
                          </th>
                          <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {t.statistics.adoption}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {featureStats.map((f) => (
                          <tr
                            key={f.feature}
                            className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                          >
                            <td className="py-2 pr-4 text-gray-800 dark:text-gray-200 font-medium">
                              {f.label}
                            </td>
                            <td className="py-2 pr-4 text-right text-gray-600 dark:text-gray-400">
                              {f.count.toLocaleString()}
                            </td>
                            <td className="py-2 text-right">
                              <span
                                className={`font-medium ${
                                  f.adoptionPct >= 20
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {f.adoptionPct}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {hasProfileUsage && (
              <div>
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t.statisticsPage.profileUsage}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.statisticsPage.profileUsageDesc}
                  </p>
                </div>
                <div className="space-y-3">
                  {profileStatsUsed.map((profile) => (
                    <div key={profile.key} className="flex items-center gap-3">
                      <div className="w-40 shrink-0">
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {profile.label}
                        </p>
                      </div>
                      <div className="flex-1 h-2 bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500 rounded-full transition-all"
                          style={{
                            width: `${Math.round((profile.count / maxProfileCount) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 w-10 text-right">
                        {profile.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {domainLoads.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {t.statistics.embedDomains}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-600 mb-4">
                  {t.statistics.embedDomainsDesc.replace("{days}", String(days))}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                        <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {t.statistics.domain}
                        </th>
                        <th className="text-right py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {t.statistics.loads}
                        </th>
                        <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {t.statistics.lastSeen}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {domainLoads.map((row) => (
                        <tr
                          key={row.domain}
                          className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                        >
                          <td className="py-2 pr-4 font-mono text-gray-800 dark:text-gray-200">
                            {row.domain}
                          </td>
                          <td className="py-2 pr-4 text-right font-medium text-gray-700 dark:text-gray-300">
                            {(row._sum.count ?? 0).toLocaleString()}
                          </td>
                          <td className="py-2 text-right text-gray-400 dark:text-gray-600 text-xs">
                            {row._max.date
                              ? new Date(row._max.date).toLocaleDateString(dateLocale)
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </details>
      )}

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t.statistics.recentEvents}
          </h3>
          {events.length > recentEventsPreview.length && (
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {t.statistics.showingOf.replace(
                "{total}",
                events.length.toLocaleString(),
              )}{" "}
              —{" "}
              <a
                href={`/api/sites/${id}/statistics/export?days=${days}`}
                download
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t.statistics.exportAll}
              </a>
            </span>
          )}
        </div>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            {t.statistics.noEventsYet}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {t.statistics.event}
                  </th>
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {t.statistics.feature}
                  </th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {t.statistics.time}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEventsPreview.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                  >
                    <td className="py-2 pr-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {getEventLabel(t, event.event)}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">
                      {getEventContextLabel(t, event.event, event.feature)}
                    </td>
                    <td className="py-2 text-gray-400 dark:text-gray-600 text-xs">
                      {new Date(event.createdAt).toLocaleString(dateLocale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
