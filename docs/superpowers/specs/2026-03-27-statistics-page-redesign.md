# Statistics Page UX Redesign

## Problem
The current statistics page has poor UX: 7 vertical sections with redundant data (feature/profile/domain info shown twice), a low-value event type breakdown, and a 50-row raw event log that dominates the page. Too much scrolling, no clear information hierarchy.

## Target User
Site owners doing a quick health check of widget usage + compliance officers gathering evidence of accessibility impact.

## Design: Compact Single-Page

Everything visible within ~1.5 viewport heights. Zero redundancy.

### Section 1: Header (no change)
Breadcrumb, tab nav (Config / Statistics / WCAG Scan / Statement), site name + domain, period selector (7d/14d/30d/90d), CSV export button.

### Section 2: Stats Row (5 cards in one row)
Merge the 4 stat cards and engagement rate into a single horizontal row.

| Widget Loads | Widget Opens | Unique Sessions | Feature Activations | Engagement Rate |
|---|---|---|---|---|
| 89 | 25 | 4 | 9 | 28% |

- Grid: `grid-cols-2 md:grid-cols-5`
- Engagement rate card shows percentage as the big number with a small subtitle "opens/loads"
- Remove the separate full-width engagement bar section

### Section 3: Trend Chart (no change)
Full-width daily events line chart with SVG gradient fill. Same `TrendChart` component.

### Section 4: Three-Column Insights Grid
One row, three equal columns. Shows ALL data (not top-5 summary). Replaces both the summary 3-column grid AND the "Advanced analytics" collapsible.

**Column 1 — Feature Adoption:**
- List of features sorted by usage count (descending)
- Each row: feature label, small horizontal bar (proportional), adoption percentage
- Uses existing `FeatureBarChart` component or similar inline bars
- Shows unique-sessions context in header ("% of N sessions")

**Column 2 — Profile Usage:**
- List of profiles sorted by count (descending)
- Each row: profile label, small horizontal bar (proportional), count
- Only shows profiles with count > 0

**Column 3 — Embed Domains:**
- List of domains sorted by load count (descending)
- Each row: domain (monospace), load count, last-seen date
- Up to 20 domains (existing limit)

Grid: `grid-cols-1 lg:grid-cols-3`

Each column card has a section title and the data list. No collapsibles, no "advanced" toggle.

### Section 5: Recent Activity (last 5 events)
Compact mini-table replacing the 50-row event log.

- Columns: Event (badge) | Context | Time
- Max 5 rows
- If more events exist, show a subtle "Export all N events as CSV" link
- Same styling as current table but fewer rows

## Removed Sections
1. **Event type breakdown** — redundant with stat cards
2. **"Advanced analytics" collapsible** — merged into insights grid
3. **Top-5 summary cards** — the insights grid is the single source now
4. **Full-width engagement bar** — becomes a stat card

## Files to Modify
- `apps/manage/src/app/dashboard/sites/[id]/statistics/page.tsx` — main restructure
- `apps/manage/src/app/dashboard/sites/[id]/statistics/charts.tsx` — may need minor adjustments

## Files Unchanged
- `apps/manage/src/app/dashboard/sites/[id]/statistics/period-tabs.tsx`
- `apps/manage/src/app/api/sites/[id]/statistics/export/route.ts`
- `apps/manage/src/i18n/messages.ts`

## Constraints
- Components must stay under 150 lines
- Server-side rendering (SSR) — no client components except PeriodTabs
- Dark mode support required
- i18n support (en/tr) required
- All existing data processing logic stays the same
