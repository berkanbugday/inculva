# Statistics Page UX Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the statistics page from 7 redundant sections into a compact single-page layout with 5 focused sections and zero data duplication.

**Architecture:** Server component (`page.tsx`) restructured into a main page + extracted sub-components to stay under 150-line limit. All data processing logic stays unchanged. Only the JSX render output changes.

**Tech Stack:** Next.js (App Router, SSR), React, Tailwind CSS, existing i18n system

---

## File Structure

The current `page.tsx` is 740 lines — way over the 150-line component limit. We'll extract the render sections into focused sub-components:

| File | Responsibility | Action |
|------|----------------|--------|
| `statistics/page.tsx` | Data fetching, processing, orchestration | Modify (shrink to ~120 lines) |
| `statistics/stat-cards.tsx` | 5-card stats row (new server component) | Create |
| `statistics/insights-grid.tsx` | 3-column feature/profile/domain grid | Create |
| `statistics/recent-activity.tsx` | Last 5 events mini-table | Create |
| `statistics/charts.tsx` | TrendChart + FeatureBarChart | No change |
| `statistics/period-tabs.tsx` | Period selector | No change |

---

### Task 1: Extract StatCards Component

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/statistics/stat-cards.tsx`

- [ ] **Step 1: Create the stat-cards component**

Create `apps/manage/src/app/dashboard/sites/[id]/statistics/stat-cards.tsx`:

```tsx
interface StatCardsProps {
  widgetLoads: number;
  openCount: number;
  uniqueSessions: number;
  totalActivations: number;
  engagement: number;
  labels: {
    widgetLoads: string;
    widgetOpens: string;
    uniqueSessions: string;
    featureActivations: string;
    engagementRate: string;
    opensLoads: string;
  };
}

const COLOR_MAP: Record<string, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  green: "text-green-600 dark:text-green-400",
  gray: "text-gray-900 dark:text-white",
};

export function StatCards({
  widgetLoads,
  openCount,
  uniqueSessions,
  totalActivations,
  engagement,
  labels,
}: StatCardsProps) {
  const cards = [
    { label: labels.widgetLoads, value: widgetLoads.toLocaleString(), color: "blue" },
    { label: labels.widgetOpens, value: openCount.toLocaleString(), color: "purple" },
    { label: labels.uniqueSessions, value: uniqueSessions.toLocaleString(), color: "green" },
    { label: labels.featureActivations, value: totalActivations.toLocaleString(), color: "gray" },
    { label: labels.engagementRate, value: `${engagement}%`, color: "blue" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
        >
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className={`text-3xl font-black mt-1 ${COLOR_MAP[color]}`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l apps/manage/src/app/dashboard/sites/[id]/statistics/stat-cards.tsx`
Expected: under 60 lines

---

### Task 2: Extract InsightsGrid Component

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/statistics/insights-grid.tsx`

- [ ] **Step 1: Create the insights-grid component**

Create `apps/manage/src/app/dashboard/sites/[id]/statistics/insights-grid.tsx`:

```tsx
interface FeatureStat {
  feature: string;
  label: string;
  count: number;
  adoptionPct: number;
}

interface ProfileStat {
  key: string;
  label: string;
  count: number;
}

interface DomainLoad {
  domain: string;
  _sum: { count: number | null };
  _max: { date: Date | null };
}

interface InsightsGridProps {
  featureStats: FeatureStat[];
  profileStats: ProfileStat[];
  domainLoads: DomainLoad[];
  uniqueSessions: number;
  dateLocale: string;
  labels: {
    featureAdoption: string;
    ofUniqueSessions: string;
    profileUsage: string;
    embedDomains: string;
  };
}

export function InsightsGrid({
  featureStats,
  profileStats,
  domainLoads,
  uniqueSessions,
  dateLocale,
  labels,
}: InsightsGridProps) {
  const hasFeatures = featureStats.length > 0;
  const hasProfiles = profileStats.length > 0;
  const hasDomains = domainLoads.length > 0;

  if (!hasFeatures && !hasProfiles && !hasDomains) return null;

  const maxFeatureCount = featureStats[0]?.count ?? 1;
  const maxProfileCount = Math.max(...profileStats.map((p) => p.count), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {hasFeatures && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {labels.featureAdoption}
            </h3>
            {uniqueSessions > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-600">
                % {labels.ofUniqueSessions.replace("{count}", uniqueSessions.toLocaleString())}
              </span>
            )}
          </div>
          <div className="space-y-3">
            {featureStats.map((f) => (
              <div key={f.feature} className="flex items-center gap-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 w-28 shrink-0 truncate">
                  {f.label}
                </p>
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(f.count / maxFeatureCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right tabular-nums">
                  {f.adoptionPct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasProfiles && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {labels.profileUsage}
          </h3>
          <div className="space-y-3">
            {profileStats.map((profile) => (
              <div key={profile.key} className="flex items-center gap-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 w-28 shrink-0 truncate">
                  {profile.label}
                </p>
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${(profile.count / maxProfileCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right tabular-nums">
                  {profile.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasDomains && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {labels.embedDomains}
          </h3>
          <div className="space-y-3">
            {domainLoads.map((row) => (
              <div key={row.domain} className="flex items-center gap-2">
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate font-mono">
                  {row.domain}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                  {(row._sum.count ?? 0).toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-600 w-20 text-right">
                  {row._max.date
                    ? new Date(row._max.date).toLocaleDateString(dateLocale)
                    : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l apps/manage/src/app/dashboard/sites/[id]/statistics/insights-grid.tsx`
Expected: under 130 lines

---

### Task 3: Extract RecentActivity Component

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/statistics/recent-activity.tsx`

- [ ] **Step 1: Create the recent-activity component**

Create `apps/manage/src/app/dashboard/sites/[id]/statistics/recent-activity.tsx`:

```tsx
interface RecentEvent {
  id: string;
  eventLabel: string;
  contextLabel: string;
  time: string;
}

interface RecentActivityProps {
  events: RecentEvent[];
  totalCount: number;
  exportUrl: string;
  labels: {
    recentEvents: string;
    event: string;
    feature: string;
    time: string;
    exportAll: string;
    noEventsYet: string;
  };
}

export function RecentActivity({
  events,
  totalCount,
  exportUrl,
  labels,
}: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {labels.recentEvents}
        </h3>
        {totalCount > events.length && (
          <a
            href={exportUrl}
            download
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {labels.exportAll} ({totalCount.toLocaleString()})
          </a>
        )}
      </div>
      {events.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
          {labels.noEventsYet}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.event}
                </th>
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.feature}
                </th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.time}
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                >
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {event.eventLabel}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">
                    {event.contextLabel}
                  </td>
                  <td className="py-2 text-gray-400 dark:text-gray-600 text-xs">
                    {event.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l apps/manage/src/app/dashboard/sites/[id]/statistics/recent-activity.tsx`
Expected: under 90 lines

---

### Task 4: Rewrite page.tsx — Data Processing (keep) + New Render Output

This is the main task. The data-fetching and processing logic (lines 1–285 of current file) stays almost identical. The entire JSX render section (lines 287–739) gets replaced.

**Files:**
- Modify: `apps/manage/src/app/dashboard/sites/[id]/statistics/page.tsx`

- [ ] **Step 1: Update imports**

At the top of `page.tsx`, replace the existing imports to add the new components:

Replace:
```tsx
import { TrendChart, FeatureBarChart } from "./charts";
```

With:
```tsx
import { TrendChart } from "./charts";
import { StatCards } from "./stat-cards";
import { InsightsGrid } from "./insights-grid";
import { RecentActivity } from "./recent-activity";
```

- [ ] **Step 2: Remove unused computed values**

Remove these lines that are no longer needed (they were used by the removed sections):

1. Remove `eventTypeCounts` computation (~lines 252-256):
```tsx
  const eventTypeCounts = EVENT_TYPES.map((type) => ({
    type,
    label: getEventLabel(t, type),
    count: events.filter((ev) => ev.event === type).length,
  })).filter((entry) => entry.count > 0);
```

2. Remove `statCards` and `colorMap` definitions (~lines 258-278) — replaced by StatCards component.

3. Remove `recentEvents` and `recentEventsPreview` (~lines 280-281) — replaced by 5-event slice.

4. Remove `topFeatures`, `topProfiles`, `topDomains`, `hasAdvancedSection` (~lines 282-285) — no longer needed since InsightsGrid shows all data.

5. Remove the `EVENT_TYPES` constant (~lines 124-130) — no longer used.

- [ ] **Step 3: Add new computed values for RecentActivity**

After the existing `engagement` computation, add:

```tsx
  const recentEventsFormatted = events.slice(0, 5).map((ev) => ({
    id: ev.id,
    eventLabel: getEventLabel(t, ev.event),
    contextLabel: getEventContextLabel(t, ev.event, ev.feature),
    time: new Date(ev.createdAt).toLocaleString(dateLocale),
  }));
```

- [ ] **Step 4: Replace the entire JSX return block**

Replace everything from `return (` to the end of the function with:

```tsx
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

      <StatCards
        widgetLoads={widgetLoads}
        openCount={openCount}
        uniqueSessions={uniqueSessions}
        totalActivations={totalActivations}
        engagement={engagement}
        labels={{
          widgetLoads: t.statistics.widgetLoads,
          widgetOpens: t.statistics.widgetOpens,
          uniqueSessions: t.statistics.uniqueSessions,
          featureActivations: t.statistics.featureActivations,
          engagementRate: t.statisticsPage.engagementRate,
          opensLoads: t.statisticsPage.opensLoads,
        }}
      />

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

      <InsightsGrid
        featureStats={featureStats}
        profileStats={profileStatsUsed}
        domainLoads={domainLoads}
        uniqueSessions={uniqueSessions}
        dateLocale={dateLocale}
        labels={{
          featureAdoption: t.statistics.featureAdoption,
          ofUniqueSessions: t.statistics.ofUniqueSessions,
          profileUsage: t.statisticsPage.profileUsage,
          embedDomains: t.statistics.embedDomains,
        }}
      />

      <RecentActivity
        events={recentEventsFormatted}
        totalCount={events.length}
        exportUrl={`/api/sites/${id}/statistics/export?days=${days}`}
        labels={{
          recentEvents: t.statistics.recentEvents,
          event: t.statistics.event,
          feature: t.statistics.feature,
          time: t.statistics.time,
          exportAll: t.statistics.exportAll,
          noEventsYet: t.statistics.noEventsYet,
        }}
      />
    </main>
  );
```

- [ ] **Step 5: Clean up unused imports**

Remove `FeatureBarChart` from imports if not already done in step 1. The `FeatureBarChart` component in `charts.tsx` is no longer used by the page (the InsightsGrid has its own inline bars), but keep the component file intact in case it's used elsewhere.

- [ ] **Step 6: Verify page.tsx is under 150 lines**

Run: `wc -l apps/manage/src/app/dashboard/sites/[id]/statistics/page.tsx`
Expected: The file should be approximately 120-140 lines. If it's over 150, extract the header/breadcrumb nav into a separate component.

---

### Task 5: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript type checking**

Run: `cd /Users/berkan/Projects/inculva && npx tsc --noEmit --project apps/manage/tsconfig.json 2>&1 | head -30`
Expected: No errors related to the statistics page files.

- [ ] **Step 2: Run Next.js build for the manage app**

Run: `cd /Users/berkan/Projects/inculva && npx turbo build --filter=manage 2>&1 | tail -20`
Expected: Build succeeds with no errors.

- [ ] **Step 3: If page.tsx exceeds 150 lines, extract header nav**

If the line count check in Task 4 Step 6 shows over 150 lines, extract the breadcrumb + tab nav into a `statistics/header-nav.tsx` component that accepts `siteId`, `siteName`, and `t` as props.

---

### Task 6: Manual Visual Verification

- [ ] **Step 1: Start dev server and verify the page**

Run: `cd /Users/berkan/Projects/inculva && npx turbo dev --filter=manage`

Open the statistics page in the browser and verify:
1. 5 stat cards in one row on desktop (2 cols on mobile)
2. Trend chart renders correctly
3. Three-column insights grid shows feature adoption, profile usage, and embed domains
4. Only last 5 events shown in recent activity
5. CSV export link works
6. Dark mode looks correct
7. Period selector (7d/14d/30d/90d) works
