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
  { key: "highContrast", label: "Contrast mode" },
  { key: "textResizing", label: "Larger text" },
  { key: "textAlign", label: "Text alignment" },
  { key: "readingGuide", label: "Reading guide" },
  { key: "textSpacing", label: "Text spacing" },
  { key: "screenReader", label: "Screen reader" },
  { key: "dyslexiaFont", label: "Dyslexia mode" },
  { key: "readingMask", label: "Reading mask" },
  { key: "cursorEnhancement", label: "Content magnifier" },
  { key: "highlightLinks", label: "Link selection" },
  { key: "focusHighlight", label: "Highlight titles" },
  { key: "grayscale", label: "Grayscale" },
  { key: "pauseAnimations", label: "Stop animation" },
  { key: "colorBlindMode", label: "Color blind mode" },
  { key: "muteMedia", label: "Mute sound" },
  { key: "skipNavigation", label: "Page structure" },
  { key: "saturation", label: "Saturation boost" },
  { key: "keyboardNavigation", label: "Keyboard navigation" },
  { key: "largeClickTargets", label: "Large click targets" },
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
  }));

  const profileCounts: Record<string, number> = {};
  for (const ev of profileEvents) {
    if (!ev.feature) continue;
    profileCounts[ev.feature] = (profileCounts[ev.feature] ?? 0) + 1;
  }

  const profileStats = Object.entries(PROFILE_LABELS).map(([key, label]) => ({
    key,
    label,
    count: profileCounts[key] ?? 0,
  })).sort((a, b) => b.count - a.count);

  const totalFeatureActivations = Object.values(featureCounts).reduce((sum, s) => sum + s.size, 0);

  return (
    <div className="px-8 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Statistics</h1>

      {/* Widget Engagement Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Widget Loads</p>
          <p className="text-3xl font-bold mt-1 text-blue-600 dark:text-blue-400">
            {(widgetLoadTotal._sum.count ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Widget Opens</p>
          <p className="text-3xl font-bold mt-1 text-purple-600 dark:text-purple-400">
            {openCount.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Unique Sessions</p>
          <p className="text-3xl font-bold mt-1 text-green-600 dark:text-green-400">
            {totalSessions.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Feature Activations</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {totalFeatureActivations.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Date range filter */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="1" y="2" width="14" height="13" rx="2" />
              <path d="M1 6h14M5 1v2M11 1v2" />
            </svg>
            Last 30 days
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Filter
          </button>
          <span className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-50 cursor-not-allowed">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8 1v9M4 7l4 4 4-4M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" />
            </svg>
            Export Excel
          </span>
        </div>
      </div>

      {/* Feature stats table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          Usage statistics by features
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Track the usage of each feature to understand how users interact with your accessibility widget, helping optimize performance and enhance user experience.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">
                  Features
                </th>
                <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-400 dark:text-gray-600 w-28">
                  Count
                </th>
                <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-400 dark:text-gray-600 w-28">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {featureStats.map((f) => (
                <tr
                  key={f.key}
                  className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 text-gray-700 dark:text-gray-300">{f.label}</td>
                  <td className="py-2.5 px-4 text-right text-gray-500 dark:text-gray-400">{f.count}</td>
                  <td className="py-2.5 px-4 text-right text-gray-500 dark:text-gray-400">{f.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility Profile Usage */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          Accessibility Profile Usage
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          How many times each one-click accessibility profile was activated in the last 30 days.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-2.5 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">
                  Profile
                </th>
                <th className="text-right py-2.5 px-4 text-xs font-medium text-gray-400 dark:text-gray-600 w-28">
                  Activations
                </th>
              </tr>
            </thead>
            <tbody>
              {profileStats.map((p) => (
                <tr
                  key={p.key}
                  className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-2.5 px-4 text-gray-700 dark:text-gray-300">{p.label}</td>
                  <td className="py-2.5 px-4 text-right text-gray-500 dark:text-gray-400">{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
