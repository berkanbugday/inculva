# Cookie Banner — Design Spec

**Date:** 2026-03-23
**App:** `apps/landing`
**Status:** Approved

---

## Overview

Add a GDPR-informational cookie banner to the landing site. Google Analytics fires unconditionally (treated as necessary). The banner is purely informational with a single dismiss action that persists forever via `localStorage`.

---

## Requirements

- Banner appears on every page until the user dismisses it once
- Single dismiss button ("Got it" / "Anladım")
- Dismissal stored in `localStorage` key `inculva_cookie_dismissed` — never expires
- GA (`G-KHVDSSZ752`) continues to fire regardless of banner state
- Bilingual: English and Turkish via the existing i18n system
- Link to the localized `/privacy-policy` page included in banner text (use `getLocalizedPath('/privacy-policy', lang)`)
- Accessible: `role="region"`, `aria-label` on the outermost banner element, keyboard-focusable button

---

## Architecture

### Approach

Astro component (`CookieBanner.astro`) with server-rendered markup and a client `<script>` block. Hidden by default via `class="hidden"`; the script reveals it only when `localStorage` has no dismissal record. This avoids flash-of-banner for returning visitors.

### Files

| File | Change |
|------|--------|
| `src/components/CookieBanner.astro` | **Create** — banner markup + dismiss script |
| `src/layouts/BaseLayout.astro` | **Modify** — import and render `<CookieBanner lang={lang} />` just before `</body>` |
| `src/i18n/en.ts` | **Modify first** — add `cookie` translation keys (source of `Translations` type) |
| `src/i18n/tr.ts` | **Modify second** — add `cookie` translation keys (typed as `Translations`, so `en.ts` must be updated first) |

---

## Component Design

### `CookieBanner.astro`

**Props:** `lang: Lang`

**Markup:**
- Fixed bottom bar, full width, white background with top border
- Text: cookie usage message + privacy policy link (href from `getLocalizedPath('/privacy-policy', lang)`)
- Button: dismiss label from i18n (`i.cookie.dismiss`)
- `aria-label={i.cookie.ariaLabel}` on the outermost banner element

**Script logic:**

`DOMContentLoaded` handles the initial hard load only. `astro:after-swap` handles all subsequent client-side navigations (View Transitions). Both run the same visibility check via a shared function.

```
function checkBanner():
  if localStorage.getItem('inculva_cookie_dismissed') is not set:
    remove 'hidden' class from banner element
    attach click listener to button with { once: true }
      → on click: localStorage.setItem('inculva_cookie_dismissed', '1')
                  add 'hidden' class to banner element

on DOMContentLoaded: checkBanner()
on astro:after-swap:  checkBanner()
```

Using `{ once: true }` on the click listener prevents listener accumulation across navigations.

**Accessibility:**
- `role="region"` on the outermost banner element
- `aria-label={i.cookie.ariaLabel}` on the outermost banner element
- Button is naturally keyboard-focusable

---

## i18n Keys

**English (`en.ts`):**
```ts
cookie: {
  message: "We use cookies to analyze site usage and improve your experience.",
  privacyLink: "Privacy Policy",
  dismiss: "Got it",
  ariaLabel: "Cookie notice",
}
```

**Turkish (`tr.ts`):**
```ts
cookie: {
  message: "Site kullanımını analiz etmek ve deneyiminizi iyileştirmek için çerezler kullanıyoruz.",
  privacyLink: "Gizlilik Politikası",
  dismiss: "Anladım",
  ariaLabel: "Çerez bildirimi",
}
```

---

## Constraints

- Component must stay under 150 lines (project standard)
- No new npm dependencies
- GA is not gated — fires unconditionally as today
- `localStorage` key is `inculva_cookie_dismissed` (namespaced to avoid third-party collisions)
