import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PROFILE_LABELS: Record<string, string> = {
  profileAdhd: "ADHD",
  profileBlind: "Blind",
  profileLowVision: "Low Vision",
  profileColorBlind: "Color Blind",
  profileDyslexia: "Dyslexia",
  profileMotorImpaired: "Motor Impaired",
  profileCognitive: "Cognitive & Learning",
  profileSeizure: "Seizure & Epilepsy",
  profileParkinson: "Parkinson's",
};

const ALL_FEATURES = [
  { key: "highContrast", label: "High Contrast" },
  { key: "textResizing", label: "Text Resizing" },
  { key: "textAlign", label: "Text Alignment" },
  { key: "readingGuide", label: "Reading Guide" },
  { key: "textSpacing", label: "Text Spacing" },
  { key: "screenReader", label: "Screen Reader" },
  { key: "dyslexiaFont", label: "Dyslexia Font" },
  { key: "readingMask", label: "Reading Mask" },
  { key: "cursorEnhancement", label: "Cursor Enhancement" },
  { key: "highlightLinks", label: "Highlight Links" },
  { key: "focusHighlight", label: "Focus Highlight" },
  { key: "grayscale", label: "Grayscale" },
  { key: "pauseAnimations", label: "Pause Animations" },
  { key: "colorBlindMode", label: "Color Blind Mode" },
  { key: "muteMedia", label: "Mute Media" },
  { key: "skipNavigation", label: "Skip Navigation" },
  { key: "saturation", label: "Saturation" },
  { key: "keyboardNavigation", label: "Keyboard Navigation" },
  { key: "largeClickTargets", label: "Large Click Targets" },
];

export default async function StatisticsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [events, widgetLoadTotal, openCount, profileEvents] = await Promise.all([
    db.widgetEvent.findMany({
      where: {
        site: { ownerId: session.user.id },
        event: "feature_enabled",
        createdAt: { gte: thirtyDaysAgo },
      },
      select: { feature: true, sessionId: true },
      take: 50_000,
    }),
    db.widgetLoad.aggregate({
      where: { site: { ownerId: session.user.id } },
      _sum: { count: true },
    }),
    db.widgetEvent.count({
      where: {
        site: { ownerId: session.user.id },
        event: "opened",
        createdAt: { gte: thirtyDaysAgo },
      },
    }),
    db.widgetEvent.findMany({
      where: {
        site: { ownerId: session.user.id },
        event: "profile_activated",
        createdAt: { gte: thirtyDaysAgo },
      },
      select: { feature: true, sessionId: true },
      take: 50_000,
    }),
  ]);

  const totalSessions = new Set(events.map((e) => e.sessionId)).size;

  const featureCounts: Record<string, Set<string>> = {};
  for (const ev of events) {
    if (!ev.feature) continue;
    if (!featureCounts[ev.feature]) featureCounts[ev.feature] = new Set();
    featureCounts[ev.feature]!.add(ev.sessionId);
  }

  const featureStats = ALL_FEATURES.map((f) => ({
    key: f.key,
    label: f.label,
    count: featureCounts[f.key]?.size ?? 0,
    pct:
      totalSessions > 0
        ? Math.round(((featureCounts[f.key]?.size ?? 0) / totalSessions) * 100)
        : 0,
  })).sort((a, b) => b.count - a.count);

  const profileCounts: Record<string, number> = {};
  for (const ev of profileEvents) {
    if (!ev.feature) continue;
    profileCounts[ev.feature] = (profileCounts[ev.feature] ?? 0) + 1;
  }

  const profileStats = Object.entries(PROFILE_LABELS)
    .map(([key, label]) => ({ key, label, count: profileCounts[key] ?? 0 }))
    .sort((a, b) => b.count - a.count);

  const maxProfileCount = Math.max(...profileStats.map((p) => p.count), 1);

  const totalFeatureActivations = Object.values(featureCounts).reduce(
    (sum, s) => sum + s.size,
    0
  );

  const engagement =
    (widgetLoadTotal._sum.count ?? 0) > 0
      ? Math.round((openCount / (widgetLoadTotal._sum.count ?? 1)) * 100)
      : 0;

  return (
    <div className="px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Last 30 days across all your sites</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Widget Loads",
            value: (widgetLoadTotal._sum.count ?? 0).toLocaleString(),
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1v9M4 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            label: "Widget Opens",
            value: openCount.toLocaleString(),
            color: "text-violet-600 dark:text-violet-400",
            bg: "bg-violet-50 dark:bg-violet-950",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ),
          },
          {
            label: "Unique Sessions",
            value: totalSessions.toLocaleString(),
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 13.5a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            label: "Feature Activations",
            value: totalFeatureActivations.toLocaleString(),
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-950",
            icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="9" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="6.5" y="5" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="12" y="1" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ),
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Engagement rate pill */}
      <div className="flex items-center gap-3 mb-8 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Widget engagement rate</p>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{engagement}%</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${Math.min(engagement, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 shrink-0">opens / loads</p>
      </div>

      {/* Feature stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Feature usage</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Unique sessions that activated each feature in the last 30 days</p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            Last 30 days
          </span>
        </div>

        <div className="space-y-3">
          {featureStats.map((f) => (
            <div key={f.key} className="flex items-center gap-3">
              <div className="w-36 shrink-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{f.label}</p>
              </div>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: f.pct > 0 ? `${f.pct}%` : "0%" }}
                />
              </div>
              <div className="flex items-center gap-2 shrink-0 w-20 justify-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">{f.count.toLocaleString()}</span>
                <span className="text-xs font-medium text-gray-400 dark:text-gray-600 w-8 text-right">{f.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Accessibility profile usage</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">One-click profile activations in the last 30 days</p>
        </div>

        <div className="space-y-3">
          {profileStats.map((p) => (
            <div key={p.key} className="flex items-center gap-3">
              <div className="w-40 shrink-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{p.label}</p>
              </div>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all"
                  style={{ width: `${Math.round((p.count / maxProfileCount) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 w-10 text-right">
                {p.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
