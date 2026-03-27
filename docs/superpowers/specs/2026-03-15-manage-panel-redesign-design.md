# Manage Panel Redesign — Design Spec

**Date:** 2026-03-15
**Scope:** Full redesign of `/apps/manage` — all pages and components
**Approach:** Option A — UserWay-Inspired Vibrant Modern (with brand primary `#0066cc`)

---

## 1. Design System & Tokens

### Colors

| Token | Light Mode | Dark Mode |
|---|---|---|
| Primary | `#0066cc` | `#4d9eff` |
| Accent gradient | `from-[#0066cc] to-[#7c3aed]` | same |
| Background | `#f8f9fc` | `#0e0e10` |
| Card background | `#ffffff` | `#1a1a2e` |
| Border | `#e8eaf0` | `#2a2a3e` |
| Muted text | `gray-500` | `gray-400` |
| Destructive | `#ff3b3b` | `#ff3b3b` |

### Typography

| Element | Style |
|---|---|
| Page title | `text-3xl font-black text-gray-900 dark:text-white` |
| Card heading | `text-xl font-bold` |
| Stat number | `text-4xl font-black` + gradient text clip (`from-[#0066cc] to-[#7c3aed]`) |
| Body | `text-sm` / `text-base` |
| Label | `text-sm font-semibold text-gray-700 dark:text-gray-300` |
| Muted | `text-sm text-gray-500 dark:text-gray-400` |

### Border Radius

| Element | Class |
|---|---|
| Buttons | `rounded-full` |
| Cards / sections | `rounded-3xl` |
| Inputs | `rounded-2xl` |
| Sidebar active item | `rounded-2xl` |
| Badges / tags | `rounded-full` |

### Shadows

| Context | Value |
|---|---|
| Card default | `shadow-sm` |
| Card hover | `0 2px 16px rgba(0,102,204,0.08)` |
| Dropdown / modal | `shadow-xl` |

Cards use shadow instead of heavy borders.

### Spacing

| Element | Value |
|---|---|
| Sidebar width | `w-64` (256px) |
| Content padding | `p-8` |
| Card inner padding | `p-8` |
| Card gap | `gap-6` |
| Max content width | `max-w-6xl` |

---

## 2. Shell Layout

```
┌──────────────────────────────────────────────┐
│  Header (sticky h-14, bg-white/dark:#1a1a2e) │
├──────────────┬───────────────────────────────┤
│  Sidebar     │  Content area                 │
│  w-64        │  bg-[#f8f9fc] dark:bg-[#0e0e10]│
│  sticky      │  p-8  max-w-6xl               │
└──────────────┴───────────────────────────────┘
```

### Sidebar

- `w-64`, full height, sticky, `bg-white dark:bg-[#1a1a2e]`, right border `border-r border-[#e8eaf0] dark:border-[#2a2a3e]`
- **Top:** Logo area `h-16 px-6`, logo left-aligned
- **Nav items:** `flex items-center gap-3 px-4 py-3 rounded-2xl mx-2`
  - Icon: 20px Lucide icon, `aria-hidden="true"`
  - Label: `text-sm font-semibold`
  - Active: `bg-blue-50 text-[#0066cc] dark:bg-blue-950 dark:text-[#4d9eff]` + left accent bar `w-1 h-5 rounded-full bg-[#0066cc]`
  - Hover: `hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`
- **Site sub-items:** indented `pl-10`, `text-xs font-medium`, collapsible per site
- **Section dividers:** `border-t border-gray-100 dark:border-gray-800 mx-4 my-2`
- **"+ Add new site" button:** `rounded-full bg-[#0066cc] text-white text-sm font-semibold px-4 py-2` inside sidebar
- **Bottom:** User avatar `w-9 h-9 rounded-full` + display name + settings icon, pinned with `mt-auto`

### Header

- `h-14 sticky top-0 z-40 bg-white dark:bg-[#1a1a2e] border-b border-[#e8eaf0] dark:border-[#2a2a3e]`
- **Left:** Page breadcrumb — `text-sm text-gray-400` / `font-bold text-gray-900`
- **Right:** Theme toggle + language switcher + notification bell + "New site" CTA `rounded-full bg-[#0066cc] text-white px-5 py-2 text-sm font-semibold`
- User avatar lives at bottom of sidebar — header stays minimal

---

## 3. Auth Pages

**Layout:** Two-column full-height split. Mobile: single column form only.

### Left Brand Panel (`w-2/5`)
- Background: gradient `from-[#0066cc] to-[#7c3aed]`
- Inculva logo centered, white
- Tagline: `text-white text-2xl font-black`
- 3 feature bullets with white check icons

### Right Form Panel (`w-3/5`)
- Background: `#f8f9fc`
- Card: `bg-white rounded-3xl shadow-sm p-10 w-full max-w-md mx-auto`
- Title: `text-2xl font-black text-gray-900`
- Subtitle: `text-sm text-gray-500 mb-8`
- Inputs: `rounded-2xl border border-[#e8eaf0] px-5 py-4 text-base w-full`
- Labels: `text-sm font-semibold text-gray-700 mb-1.5`
- Primary button: `rounded-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold py-4 w-full text-base`
- OAuth buttons: `rounded-full border border-[#e8eaf0] py-3.5 font-semibold w-full`
- Links: `text-[#0066cc] font-semibold hover:underline`
- Error: `rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3`

### Banned Page
- Centered `rounded-3xl p-12` card, large red icon, bold message, support link

### 404 / Error Pages
- Centered layout, `text-8xl font-black` gradient number, short message, "Back to dashboard" `rounded-full` pill button

---

## 4. Dashboard & Site Pages

### Dashboard Home (`/dashboard`)
- Title: `text-3xl font-black` + subtitle
- **Stats row:** 3 cards `rounded-3xl p-8`
  - Stat: `text-4xl font-black` gradient text clip
  - Label: `text-sm font-semibold text-gray-500`
- **Sites grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Site card:** `bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow`
  - Name: `text-lg font-bold`, domain: `text-sm text-gray-400`
  - Status badge: `rounded-full`
  - Quick actions (Analytics, Scan, Settings): icon pills at bottom
- **Empty state:** `rounded-3xl border-2 border-dashed border-blue-200 p-16 text-center`, gradient icon circle, `rounded-full` CTA

### New Site Wizard (`/dashboard/sites/new`)
- Full-width `rounded-3xl` card
- Step indicator: horizontal pill steps
  - Active: `bg-[#0066cc] text-white rounded-full`
  - Completed: `bg-blue-50 text-[#0066cc] rounded-full`
- Each step: large spacious form, `rounded-2xl` inputs

### Site Customize (`/dashboard/sites/[id]`)
- Stacked `rounded-3xl` cards, `gap-6`
- Section header: icon + title `text-xl font-bold` + optional badge
- Widget config: live preview `rounded-3xl bg-gray-50 dark:bg-gray-900 p-6` alongside form
- Install checker: `rounded-3xl` status card — green success or amber warning

### Analytics (`/dashboard/sites/[id]/analytics`)
- Period tabs: `rounded-full` pill group — active `bg-[#0066cc] text-white`, inactive `bg-gray-100 text-gray-600`
- Chart card: `rounded-3xl bg-white p-8 shadow-sm`
- Stat cards same as dashboard home
- Export: `rounded-full` outline button

### WCAG Scan (`/dashboard/sites/[id]/scan`)
- Scan CTA: large `rounded-full` blue button
- Results grouped by severity in `rounded-3xl` cards:
  - Critical: `border-l-4 border-red-500`
  - Warning: `border-l-4 border-amber-500`
  - Info: `border-l-4 border-blue-400`
- Issue rows: `rounded-2xl` expandable

### Accessibility Statement (`/dashboard/sites/[id]/statement`)
- Document-style `rounded-3xl p-10` card
- "Download / Copy" as `rounded-full` pill buttons

### Delete Site (`/dashboard/sites/[id]/delete`)
- Centered `rounded-3xl` confirmation card, red accent, confirmation input, destructive `rounded-full` button

---

## 5. Settings, Billing & Utility Pages

### Settings (`/dashboard/settings`)
- Stacked `rounded-3xl` section cards, `gap-6`
- Profile: avatar `w-20 h-20 rounded-full` with edit overlay
- Password: separate card, `rounded-2xl` inputs
- API Keys: rows inside `rounded-3xl` card — monospace key, copy icon, delete icon; "Generate" as `rounded-full` outline button
- Webhooks: same card pattern — URL input, event checkboxes, test `rounded-full` button
- Delete Account: `rounded-3xl` card with red left border, gated confirmation

### Audit Log (`/dashboard/settings/audit-log`)
- Timeline rows inside `rounded-3xl` card
- Timestamp: `text-xs text-gray-400`, action badge: `rounded-full bg-gray-100 text-xs font-semibold`, description: `text-sm`

### Billing (`/dashboard/settings/billing`)
- Current plan card: `rounded-3xl p-8`, name `text-2xl font-black`, gradient active badge, usage meters
- Plan grid: `rounded-3xl` per plan, price `text-3xl font-black`, CTA `rounded-full`
- Active plan: `ring-2 ring-[#0066cc]`
- Cancel: small subtle link

### Statistics (`/dashboard/statistics`)
- Same chart + stat card patterns as analytics, cross-site
- Site filter: `rounded-2xl` dropdown

### Notifications (`/dashboard/notifications`)
- List inside `rounded-3xl` card
- Unread row: `bg-blue-50 dark:bg-blue-950/30`
- Unread dot: `w-2 h-2 rounded-full bg-[#0066cc]`
- "Mark all read": `rounded-full` outline button, top right

---

## 6. Component-Level Notes

### Buttons
- Primary: `rounded-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold px-6 py-3`
- Secondary: `rounded-full border border-[#e8eaf0] dark:border-[#2a2a3e] font-semibold px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800`
- Destructive: `rounded-full bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3`
- Ghost/icon: `rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800`

### Inputs
- Base: `rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] px-5 py-4 text-base bg-white dark:bg-[#1a1a2e] w-full focus:ring-2 focus:ring-[#0066cc] focus:border-[#0066cc] outline-none transition`
- Error: `border-red-400 focus:ring-red-400`

### Badges / Status
- `rounded-full px-3 py-1 text-xs font-semibold`
- Active: `bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400`
- Inactive: `bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400`
- Pro plan: gradient background `from-[#0066cc] to-[#7c3aed] text-white`

### Cards
- `bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 shadow-sm`
- Hover (interactive cards): `hover:shadow-md transition-shadow cursor-pointer`

### Empty States
- `rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 p-16 text-center`
- Icon container: `w-16 h-16 rounded-3xl bg-gradient-to-br from-[#0066cc] to-[#7c3aed] flex items-center justify-center mx-auto mb-6`
- Icon: white, 28px

### Accessibility (maintained throughout)
- All interactive elements: `focus-visible:ring-2 focus-visible:ring-[#0066cc] focus-visible:ring-offset-2`
- ARIA labels on icon-only buttons
- `role="alert"` on error messages
- `role="status" aria-live="polite"` on success feedback
- `aria-busy` on loading buttons
- `aria-invalid` + `aria-describedby` on invalid fields
- Decorative icons: `aria-hidden="true"`

---

## 7. Files to Create / Modify

### Design Tokens (update)
- `packages/ui/src/globals.css` — update CSS variables for new color tokens, background, card, border values

### Shared Components (redesign)
- `apps/manage/src/components/sidebar.tsx`
- `apps/manage/src/components/dashboard-header.tsx`
- `apps/manage/src/components/auth-brand-panel.tsx`
- `apps/manage/src/components/notification-bell.tsx`
- `apps/manage/src/components/theme-toggle.tsx`
- `apps/manage/src/components/language-switcher.tsx`
- `apps/manage/src/components/cookie-banner.tsx`
- `apps/manage/src/components/verification-banner.tsx`
- `apps/manage/src/components/oauth-buttons.tsx`

### Auth Pages (redesign)
- `apps/manage/src/app/login/page.tsx` + `layout.tsx`
- `apps/manage/src/app/register/page.tsx` + `layout.tsx`
- `apps/manage/src/app/forgot-password/page.tsx` + `layout.tsx`
- `apps/manage/src/app/reset-password/page.tsx` + `layout.tsx`
- `apps/manage/src/app/banned/page.tsx`
- `apps/manage/src/app/not-found.tsx`
- `apps/manage/src/app/error.tsx`

### Dashboard Pages (redesign)
- `apps/manage/src/app/dashboard/page.tsx`
- `apps/manage/src/app/dashboard/layout.tsx`
- `apps/manage/src/app/dashboard/sites/new/page.tsx`
- `apps/manage/src/app/dashboard/sites/[id]/page.tsx`
- `apps/manage/src/app/dashboard/sites/[id]/analytics/page.tsx`
- `apps/manage/src/app/dashboard/sites/[id]/scan/page.tsx`
- `apps/manage/src/app/dashboard/sites/[id]/statement/page.tsx`
- `apps/manage/src/app/dashboard/sites/[id]/delete/page.tsx`
- `apps/manage/src/app/dashboard/statistics/page.tsx`
- `apps/manage/src/app/dashboard/notifications/page.tsx`

### Settings Pages (redesign)
- `apps/manage/src/app/dashboard/settings/page.tsx`
- `apps/manage/src/app/dashboard/settings/billing/page.tsx`
- `apps/manage/src/app/dashboard/settings/audit-log/page.tsx`

### Page-Specific Components (redesign)
- All components under `apps/manage/src/app/dashboard/` and `apps/manage/src/app/login/` etc.

---

## 8. Out of Scope

- API routes — no changes
- Backend/database logic — no changes
- Admin pages — removed (single-user product)
- i18n message keys — no new keys needed
- New features — this is a visual redesign only
