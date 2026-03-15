# Dashboard UX Redesign — Design Spec
**Date:** 2026-03-15
**Status:** Approved

---

## Overview

A full UX restructure of the `apps/manage` dashboard. Goals: fix sidebar layout bugs, add account popup with logout, move New Site button to header, simplify site cards, split settings into focused pages, and rebuild the widget customize page based on the actual widget package capabilities.

All 24 live widget features, 6 profiles, and 40 languages remain fully functional. No features are removed — only reorganised and corrected.

---

## 1. Sidebar

### Layout Fix
- `<aside>` uses `h-screen sticky top-0` — never scrolls with page content
- Inner `<nav>` gets `flex-1 overflow-y-auto` — only the nav list scrolls
- Bottom user area lives **outside** the scroll zone, always pinned to viewport bottom
- Remove `min-h-[calc(100vh-56px)]` — replaced by `h-screen`

### Account Popup
- Clicking the bottom user area opens a floating popover anchored above it, inside the sidebar
- Popover content: avatar circle + full name + email, divider, "Sign out" button
- Sign out: import the named `signOut` from `@/lib/auth-client`, `await signOut()`, then redirect to `/login` via `window.location.href = "/login"`
- Close on outside click via `mousedown` listener + `useRef`
- Remains a client component — no router changes needed

### Nav Structure
Remove "Add new site" button from sidebar (already in header). Expose Settings sub-items directly in sidebar:

```
My Websites         (GridIcon)
Statistics          (ChartIcon)

— Settings —
  Account           (UserIcon)
  API Keys          (KeyIcon)
  Webhooks          (WebhookIcon)
  Billing           (CreditCardIcon)
  Audit Log         (ListIcon)
```

Settings group has a small section label. Sub-items are indented, same visual style as SiteGroup sub-items. Active state follows current pathname.

**Files to change:** `sidebar.tsx`, `sidebar-parts.tsx`, `sidebar-icons.tsx`

---

## 2. Header

- Reorder right-side controls: `[New site button] [ThemeToggle] [LanguageSwitcher] [NotificationBell]`
- New site button moves to the **left** of the icon controls
- No other header changes

**Files to change:** `dashboard-header.tsx`

---

## 3. Dashboard Home — Site Cards

- Remove 3-button footer row (Analytics, WCAG Scan, Manage)
- Replace with single **"Open →"** link → `/dashboard/sites/[id]`
- Remove the duplicate "New site" button rendered in the page body (lines 82–101 of `dashboard/page.tsx`) — the header button is the canonical one
- Keep: domain, name, health badge (Live/Offline/Checking), widget opens count, WCAG score
- Remove `max-w-6xl` constraint → full-width layout

**Files to change:** `apps/manage/src/app/dashboard/page.tsx`

---

## 4. Settings Split

Each section becomes its own focused page. No inline tab nav on any settings page.

| Route | Content | DB query needed |
|---|---|---|
| `/dashboard/settings` | Profile form + Referral banner + Data export + Delete account | none (session only) |
| `/dashboard/settings/api-keys` | API Keys manager | `db.apiKey.findMany(...)` (move from current settings/page.tsx) |
| `/dashboard/settings/webhooks` | Webhooks manager | `db.webhook.findMany(...)` (move from current settings/page.tsx) |
| `/dashboard/settings/billing` | Existing page, unchanged | — |
| `/dashboard/settings/audit-log` | Existing page, unchanged | — |

**Changes to `settings/page.tsx`:**
- Remove `ApiKeysManager` and `WebhooksManager` imports
- Remove their DB queries (`db.apiKey.findMany`, `db.webhook.findMany`) from the `Promise.all`
- Remove `<ApiKeysManager>` and `<WebhooksManager>` from JSX
- Remove inline tab nav (`<div className="flex gap-1 ...">`) — sidebar nav replaces it
- Keep: `ProfileForm`, `ReferralBanner`, data export section, `DeleteAccount`

**New page wrappers** (`api-keys/page.tsx`, `webhooks/page.tsx`) each:
1. Call `auth.api.getSession` (redirect to `/login` if none)
2. Run their respective DB query
3. Render the existing component (`ApiKeysManager` / `WebhooksManager`) with fetched data

- Remove `max-w-3xl` from all settings pages → full-width

**Files to create:** `settings/api-keys/page.tsx`, `settings/webhooks/page.tsx`
**Files to change:** `settings/page.tsx`, `settings/billing/page.tsx`, `settings/audit-log/page.tsx`

---

## 5. Customize Page — Widget Config

Route: `/dashboard/sites/[id]` — 4 tabs, state in URL `?tab=setup` (default: setup).

### State Architecture

A single parent `WidgetConfigForm` component holds the full `form` state object (all config fields). Each tab component receives the full form state and a `setField` setter via props. Each tab's Save button sends the **full payload** to `PUT /api/sites/${siteId}/config` — this matches current behaviour and avoids partial-write bugs. The `saving`, `saved`, and `saveError` state lives in the parent and is passed as props to each tab.

`domainInput` (allowed domains text input) and its add/remove handlers live in the parent shell and are passed as props to `config-tab-setup.tsx`.

### Tab: Setup
- Site name (inline editable via existing `SiteNameForm`)
- Domain (inline editable via existing `SiteDomainForm`)
- Embed code block — simple `<pre>` with one-click copy button:
  ```ts
  try {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
  } catch {
    // fallback for non-HTTPS / blocked clipboard
    const el = document.createElement("textarea");
    el.value = snippet;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }
  ```
- Accessibility Statement URL — text input
- Allowed domains — list with add/remove UI (existing logic, state from parent)
- Language — modern custom select (see Language List below)
- WCAG badge preview + embed snippet (moved from `sites/[id]/page.tsx` into this tab; remove the existing WCAG badge section from `page.tsx`)
- Danger Zone (delete site link) at bottom

### Tab: Appearance
- Primary color — color picker + hex input
- Widget position — 3×3 grid with desktop/mobile tabs. Both tabs write to the same `form.position` field (the `WidgetConfig` type has a single `position` value — the mobile tab is a UX affordance only, not a separate stored value). Only the 4 corner cells are selectable (`top-left`, `top-right`, `bottom-left`, `bottom-right`); the center row and center column cells are rendered as non-interactive placeholders
- Trigger button preview — shows actual `${CDN_URL}/icons/universal-access.svg` with CSS filter to tint it with the selected primary color; no fake style variants (widget only has one icon)
- Button size — 3-segment tabs labelled **Mini / Regular / Large** (matching widget's own UI terminology), wired to `form.buttonSize` which stores `"small" | "medium" | "large"` as per the `WidgetConfig` type. Map: Mini→`"small"`, Regular→`"medium"`, Large→`"large"`. No translation needed in the API — the widget reads these values directly.
- White-label text — text input, Business plan gate
- Border radius — 0–50px slider, Business plan gate
- Font family — select (System / Inter / Roboto / Open Sans), Business plan gate
- Header bg color — color picker, Business plan gate
- Footer bg color — color picker, Business plan gate
- Theme selector **removed** (user decision)

### Tab: Features

24 live features grouped using the widget's own `FEATURE_CATEGORIES` structure from `packages/widget/src/ui/panel.ts`:

| Category | Features |
|---|---|
| Vision | darkMode, blueLightFilter, colorBlindMode, saturation, highlightLinks, highlightTitles, hideImages |
| Reading | textResizing, textSpacing, textAlign, lineHeight, dyslexiaFont, readingGuide, readingMask, contentMagnifier, screenReader |
| Motor | keyboardNavigation, focusHighlight, largeClickTargets, cursorEnhancement, slowCursor, skipNavigation |
| Calm | pauseAnimations, muteMedia |

Coming soon — disabled toggle + "Coming soon" badge: `toolTips`, `sustainabilityMode`, `dictionary`

**Removed from form (not implemented in widget):** `highContrast`, `grayscale`

Each feature card: name + short description + WCAG reference badge (where applicable) + toggle switch.

One Save button at bottom.

### Tab: Profiles

6 profiles matching widget exactly (3-column grid):

| Profile | Features enabled |
|---|---|
| Blind | screenReader, keyboardNavigation, skipNavigation, textResizing |
| Low Vision | textResizing, saturation, cursorEnhancement, largeClickTargets |
| Dyslexia | dyslexiaFont, textSpacing, readingGuide |
| Color Blind | colorBlindMode |
| Motor Impaired | keyboardNavigation, largeClickTargets, focusHighlight |
| ADHD | readingGuide, pauseAnimations, readingMask |

**Removed from form:** `profileCognitive`, `profileSeizure`, `profileParkinson` (not in widget UI; fields remain in DB schema but are hidden)

Each card: icon + name + description + toggle. Counter: "X of 6 profiles enabled". One Save button.

### Language List (authoritative — 41 codes)

All codes matching widget `/public/i18n/` files plus English:

```
en, tr, de, fr, es, it, pt, nl, ar, he, fa, ur,
zh, ja, ko, ru, pl, cs, da, fi, el, hu, ro, sk,
sv, uk, bg, hr, lt, lv, et, sl, sr, no, th, vi,
id, ms, ca, sq, sw
```

RTL (auto-detected by widget, flag in dropdown): `ar`, `he`, `fa`, `ur`

**Remove from current form:** `hi` (Hindi), `bn` (Bengali) — no widget i18n files
**Add to current form:** `ca` (Catalan), `sq` (Albanian), `sr` (Serbian) — already in widget
`sw` (Swahili) is already present in the form and correct — keep it

Modern dropdown: custom select component showing native language name + language code. No browser default `<select>`.

### Save Behaviour
- Each tab has its own Save button
- All tabs call `PUT /api/sites/${siteId}/config` with the full form payload
- `saving`, `saved`, `saveError` state held in parent shell, passed as props to each tab
- Success: green inline feedback below button. Error: red inline feedback with message.

---

## 6. Component Size Constraint (≤150 lines)

Split `widget-config-form.tsx` (currently 1038 lines):

| File | Contents | Est. lines |
|---|---|---|
| `widget-config-form.tsx` | Tab shell, full form state, save handler, tab routing | ~100 |
| `config-tab-setup.tsx` | Setup tab UI, copy button, domain list | ~130 |
| `config-tab-appearance.tsx` | Appearance tab UI, color picker, position grid | ~130 |
| `config-tab-features.tsx` | Features tab, category grouping — delegates to FeatureToggle | ~100 |
| `config-tab-profiles.tsx` | Profiles tab, 6 profile cards | ~80 |
| `feature-toggle.tsx` | Reusable toggle card: name + description + WCAG badge + switch | ~40 |

`config-tab-features.tsx` requires a `FeatureToggle` sub-component to stay within the 150-line limit given 24 feature cards each needing name, description, WCAG badge, and toggle switch.

---

## 7. Data / API Changes

No schema changes. All fields already exist:
- `buttonSize` — already in `WidgetConfig` type, just wired to form correctly
- `headerBgColor`, `footerBgColor` — already in `WidgetConfig` type, just exposed in UI
- `iconStyle` — removed from form (never persisted, widget doesn't use it)
- `highContrast`, `grayscale` — removed from form (not in `WidgetFeatures` type)
- `profileCognitive`, `profileSeizure`, `profileParkinson` — remain in DB schema, hidden from UI

---

## 8. Full-Width Layout

Remove width constraints from:
- `settings/page.tsx` (`max-w-3xl` → none)
- `settings/billing/page.tsx` (`max-w-4xl` → none)
- `settings/audit-log/page.tsx` (`max-w-3xl` → none)
- `dashboard/page.tsx` (`max-w-6xl` → none)
- `sites/[id]/page.tsx` (`max-w-3xl` → none)

All pages use `w-full` with comfortable internal padding from the parent `<main className="p-8">` in `layout.tsx`. `layout.tsx` itself does not need changes.

---

## 9. Files Summary

| Action | File |
|---|---|
| Modify | `components/sidebar.tsx` |
| Modify | `components/sidebar-parts.tsx` |
| Modify | `components/sidebar-icons.tsx` |
| Modify | `components/dashboard-header.tsx` |
| Modify | `app/dashboard/page.tsx` |
| Modify | `app/dashboard/settings/page.tsx` |
| Modify | `app/dashboard/settings/billing/page.tsx` |
| Modify | `app/dashboard/settings/audit-log/page.tsx` |
| Modify | `app/dashboard/sites/[id]/page.tsx` |
| Modify | `app/dashboard/sites/[id]/widget-config-form.tsx` |
| Create | `app/dashboard/settings/api-keys/page.tsx` |
| Create | `app/dashboard/settings/webhooks/page.tsx` |
| Create | `app/dashboard/sites/[id]/config-tab-setup.tsx` |
| Create | `app/dashboard/sites/[id]/config-tab-appearance.tsx` |
| Create | `app/dashboard/sites/[id]/config-tab-features.tsx` |
| Create | `app/dashboard/sites/[id]/feature-toggle.tsx` |
| Create | `app/dashboard/sites/[id]/config-tab-profiles.tsx` |
