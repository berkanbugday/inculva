import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { TrendChart, FeatureBarChart } from "./charts";
import { PeriodTabs } from "./period-tabs";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ days?: string }>;
}

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

const VALID_DAYS = [7, 14, 30, 90] as const;
type ValidDays = (typeof VALID_DAYS)[number];

function parseDays(raw: string | undefined): ValidDays {
  const n = parseInt(raw ?? "30", 10);
  return (VALID_DAYS as readonly number[]).includes(n) ? (n as ValidDays) : 30;
}

export default async function AnalyticsPage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const days = parseDays(sp.days);

  const session = await auth.api.getSession({ headers: await headers() });

  const site = await db.site.findFirst({
    where: { id, ownerId: session!.user.id },
  });
  if (!site) notFound();

  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setUTCHours(0, 0, 0, 0);

  const [events, domainLoads, widgetLoadAggregate] = await Promise.all([
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
  ]);
  const widgetLoads = widgetLoadAggregate._sum.count ?? 0;

  // Aggregate
  const dailyMap: Record<string, number> = {};
  const featureEnableMap: Record<string, Set<string>> = {};
  let openCount = 0;

  for (const ev of events) {
    const day = new Date(ev.createdAt).toISOString().slice(0, 10);
    dailyMap[day] = (dailyMap[day] ?? 0) + 1;
    if (ev.event === "feature_enabled" && ev.feature) {
      if (!featureEnableMap[ev.feature])
        featureEnableMap[ev.feature] = new Set();
      featureEnableMap[ev.feature]!.add(ev.sessionId);
    }
    if (ev.event === "opened") openCount++;
  }

  // Fill date range
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
      label: featureLabels[feature] ?? feature,
      count: sessions.size,
      adoptionPct:
        uniqueSessions > 0
          ? Math.round((sessions.size / uniqueSessions) * 100)
          : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const statCards = [
    { label: "Widget Loads", value: widgetLoads, color: "blue" },
    { label: "Widget Opens", value: openCount, color: "purple" },
    { label: "Unique Sessions", value: uniqueSessions, color: "green" },
    { label: "Feature Activations", value: totalActivations, color: "gray" },
  ] as const;

  const colorMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    green: "text-green-600 dark:text-green-400",
    gray: "text-gray-900 dark:text-white",
  };

  const recentEvents = events.slice(0, 50);

  return (
    <main className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <a
          href="/dashboard"
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          Dashboard
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
          Analytics
        </span>
      </nav>

      {/* Sub-nav */}
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { label: "Config", href: `/dashboard/sites/${id}` },
          {
            label: "Analytics",
            href: `/dashboard/sites/${id}/analytics`,
            active: true,
          },
          { label: "WCAG Scan", href: `/dashboard/sites/${id}/scan` },
          { label: "Statement", href: `/dashboard/sites/${id}/statement` },
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

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">
            {site.name} — Last {days} Days
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
            href={`/api/sites/${id}/analytics/export?days=${days}`}
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
            Export CSV
          </a>
        </div>
      </div>

      {/* Stat cards */}
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

      {/* Daily trend chart */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
          Daily Events ({days} days)
        </h3>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            No events yet. Embed the widget on your site to start tracking.
          </p>
        ) : (
          <TrendChart data={daily} />
        )}
      </div>

      {/* Feature usage + adoption */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Feature Adoption
          </h3>
          {uniqueSessions > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-600">
              % of {uniqueSessions.toLocaleString()} unique sessions
            </span>
          )}
        </div>
        {featureStats.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            No feature activations yet in the last {days} days.
          </p>
        ) : (
          <div className="space-y-3">
            <FeatureBarChart data={featureStats} />
            {/* Adoption % table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                    <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Feature
                    </th>
                    <th className="text-right py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Sessions
                    </th>
                    <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Adoption
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
                          className={`font-medium ${f.adoptionPct >= 20 ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
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
        )}
      </div>

      {/* Embed Domains */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Embed Domains
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-600 mb-4">
          Domains that loaded your widget in the last {days} days.
        </p>
        {domainLoads.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            No domain loads recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Domain
                  </th>
                  <th className="text-right py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Loads
                  </th>
                  <th className="text-right py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Last Seen
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
                        ? new Date(row._max.date).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent events */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent Events
          </h3>
          {events.length > 50 && (
            <span className="text-xs text-gray-400 dark:text-gray-600">
              Showing 50 of {events.length.toLocaleString()} —{" "}
              <a
                href={`/api/sites/${id}/analytics/export?days=${days}`}
                download
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                export all
              </a>
            </span>
          )}
        </div>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
            No events yet. Embed the widget on your site to start tracking.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Event
                  </th>
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Feature
                  </th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                  >
                    <td className="py-2 pr-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {event.event}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">
                      {event.feature
                        ? (featureLabels[event.feature] ?? event.feature)
                        : "—"}
                    </td>
                    <td className="py-2 text-gray-400 dark:text-gray-600 text-xs">
                      {new Date(event.createdAt).toLocaleString()}
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
