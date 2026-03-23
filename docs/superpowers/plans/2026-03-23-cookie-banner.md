# Cookie Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GDPR-informational cookie banner to the Astro landing site that shows once, is dismissed permanently via `localStorage`, and never blocks Google Analytics.

**Architecture:** A single `CookieBanner.astro` component renders server-side as `hidden`; a client `<script>` block reveals it on load if the user hasn't dismissed before. Dismissal is stored in `localStorage` under `inculva_cookie_dismissed`. Both `DOMContentLoaded` (initial load) and `astro:after-swap` (future View Transitions navigations) trigger the same visibility check. A `data-listener` guard on the button prevents listener accumulation across repeated `astro:after-swap` calls.

**Tech Stack:** Astro, Tailwind CSS, vanilla JS (`localStorage`), existing i18n system (`t(lang)`, `getLocalizedPath`)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `apps/landing/src/i18n/en.ts` | Modify | Add `cookie` translation keys (must be done first — source of `Translations` type) |
| `apps/landing/src/i18n/tr.ts` | Modify | Add `cookie` translation keys (typed as `Translations`, depends on `en.ts`) |
| `apps/landing/src/components/CookieBanner.astro` | Create | Banner markup + dismiss script |
| `apps/landing/src/layouts/BaseLayout.astro` | Modify | Import and render `<CookieBanner lang={lang} />` before `</body>` |

---

## Task 1: Add i18n keys to `en.ts`

**Files:**
- Modify: `apps/landing/src/i18n/en.ts` (insert before the final `} as const;` at line 466)

- [ ] **Step 1: Add `cookie` block to `en.ts` before the closing `}`**

The file ends like this (lines 463–466):
```ts
    otherWays: "Other ways to reach us",
    emailLabel: "Email",
  },
} as const;
```

Insert the `cookie` block before the final `} as const;`:
```ts
    otherWays: "Other ways to reach us",
    emailLabel: "Email",
  },

  // Cookie banner
  cookie: {
    message: "We use cookies to analyze site usage and improve your experience.",
    privacyLink: "Privacy Policy",
    dismiss: "Got it",
    ariaLabel: "Cookie notice",
  },
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from `apps/landing/`:
```bash
npm run typecheck
```
Expected: no errors. The `Translations` type is derived from `typeof en`, so no type errors should appear yet.

---

## Task 2: Add i18n keys to `tr.ts`

**Files:**
- Modify: `apps/landing/src/i18n/tr.ts` (insert before the final `} as const;` at line 472)

> Must be done after Task 1. `tr.ts` is typed as `Translations` (from `en.ts`), so the `cookie` key must exist in `en.ts` first or TypeScript will error on `tr.ts`.

- [ ] **Step 1: Add `cookie` block to `tr.ts` before the closing `}`**

The file ends like this (lines 469–472):
```ts
    otherWays: "Bize ulaşmanın diğer yolları",
    emailLabel: "E-posta",
  },
} as const;
```

Insert the `cookie` block before the final `} as const;`:
```ts
    otherWays: "Bize ulaşmanın diğer yolları",
    emailLabel: "E-posta",
  },

  // Cookie banner
  cookie: {
    message: "Site kullanımını analiz etmek ve deneyiminizi iyileştirmek için çerezler kullanıyoruz.",
    privacyLink: "Gizlilik Politikası",
    dismiss: "Anladım",
    ariaLabel: "Çerez bildirimi",
  },
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from `apps/landing/`:
```bash
npm run typecheck
```
Expected: no errors.

---

## Task 3: Create `CookieBanner.astro`

**Files:**
- Create: `apps/landing/src/components/CookieBanner.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { t, getLocalizedPath, type Lang } from '@/i18n';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const i = t(lang);
const privacyHref = getLocalizedPath('/privacy-policy', lang);
---

<div
  id="cookie-banner"
  role="region"
  aria-label={i.cookie.ariaLabel}
  class="hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
    <p class="text-sm text-gray-600 text-center sm:text-left">
      {i.cookie.message}{' '}
      <a
        href={privacyHref}
        class="underline text-primary-600 hover:text-primary-700 transition-colors"
      >
        {i.cookie.privacyLink}
      </a>
    </p>
    <button
      id="cookie-dismiss"
      type="button"
      class="shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      {i.cookie.dismiss}
    </button>
  </div>
</div>

<script>
  const STORAGE_KEY = 'inculva_cookie_dismissed';

  function checkBanner() {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const banner = document.getElementById('cookie-banner');
    const btn = document.getElementById('cookie-dismiss') as HTMLButtonElement | null;
    if (!banner || !btn) return;

    banner.classList.remove('hidden');

    // Guard prevents adding a second listener if astro:after-swap fires
    // multiple times before the user dismisses.
    if (btn.dataset.listenerAttached) return;
    btn.dataset.listenerAttached = '1';

    btn.addEventListener(
      'click',
      () => {
        localStorage.setItem(STORAGE_KEY, '1');
        banner.classList.add('hidden');
      },
      { once: true },
    );
  }

  document.addEventListener('DOMContentLoaded', checkBanner);
  document.addEventListener('astro:after-swap', checkBanner);
</script>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from `apps/landing/`:
```bash
npm run typecheck
```
Expected: no errors.

---

## Task 4: Wire `CookieBanner` into `BaseLayout.astro`

**Files:**
- Modify: `apps/landing/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Import and render the component**

At the top of the frontmatter (after existing imports on lines 1–7), add:
```astro
import CookieBanner from '@/components/CookieBanner.astro';
```

Just before the closing `</body>` tag (currently line 141), add:
```astro
    <CookieBanner lang={lang} />
  </body>
```

The `lang` variable is already derived from props/URL earlier in `BaseLayout.astro` (`const lang = langProp ?? getLangFromUrl(Astro.url);` at line 33), so no additional work is needed.

- [ ] **Step 2: Verify TypeScript compiles**

Run from `apps/landing/`:
```bash
npm run typecheck
```
Expected: no errors.

- [ ] **Step 3: Smoke-test in dev**

Run from `apps/landing/`:
```bash
npm run dev
```

Open `http://localhost:4321` in a browser and verify:

**Initial load & dismiss:**
- Banner appears at the bottom (fixed bar with cookie message, Privacy Policy link, "Got it" button)
- Click "Got it" → banner disappears immediately
- Reload the page → banner does NOT reappear
- Open DevTools → Application → Local Storage → confirm `inculva_cookie_dismissed: 1` is set
- Clear Local Storage → reload → banner reappears

**Turkish locale:**
- Open `http://localhost:4321/tr`
- Banner shows "Site kullanımını analiz etmek..." with "Gizlilik Politikası" link and "Anladım" button
- Privacy Policy link points to `/tr/privacy-policy`

**Navigation between pages (astro:after-swap):**
- Clear Local Storage so the banner is visible
- While the banner is showing, click an in-app nav link (e.g. "Features") to navigate without a full reload
- Banner must still be visible after the navigation (not hidden)
- Click "Got it" → banner disappears
- Navigate to another page → banner does NOT reappear
