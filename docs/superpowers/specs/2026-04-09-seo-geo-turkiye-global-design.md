# SEO & GEO Optimization — Türkiye + Global

**Date:** 2026-04-09
**Status:** Approved
**Scope:** Landing site (`apps/landing`)

## Problem

Customers in Türkiye searching Turkish keywords like "web erişilebilirlik", "WCAG uyumluluk", or "engelsiz web sitesi" cannot find inculva. Multiple technical SEO/GEO issues prevent Google from properly understanding, indexing, and ranking the Turkish pages.

## Goals

- Turkish pages rank for Turkish search queries in Türkiye
- Global SEO signals are correct for both EN and TR variants
- Google, Bing, and AI search engines understand inculva serves Türkiye
- Structured data is localized so rich results appear in both languages

## Business Details

- **Name:** inculva
- **Address:** Abdulhalik Renda Mahallesi, Ankara Caddesi, Merkez/Çankırı, Türkiye
- **Email (TR):** bilgi@inculva.com
- **Email (EN):** info@inculva.com
- **Social:** youtube.com/@inculva, x.com/inculva

---

## Section 1: Meta Tags & Locale Signals

**Files:** `BaseLayout.astro`, `SEOHead.astro`, `seo.ts`

Add the following meta tags, driven by the `lang` prop:

| Meta Tag | EN value | TR value |
|----------|----------|----------|
| `og:locale` | `en_US` | `tr_TR` |
| `og:locale:alternate` | `tr_TR` | `en_US` |
| `geo.region` | _(omit)_ | `TR-18` (Çankırı province code) |
| `geo.placename` | _(omit)_ | `Çankırı, Türkiye` |
| `content-language` | `en` | `tr` |

**Implementation:**

- Extend `getSEOProps()` to accept `lang` parameter
- Add `og:locale` and `og:locale:alternate` to the OpenGraph config
- Add geo meta tags directly in `BaseLayout.astro`, conditionally rendered when `lang === "tr"`
- Add `content-language` meta tag in `BaseLayout.astro`

---

## Section 2: Localized JSON-LD Structured Data

**Files:** `seo.ts`

Every schema generator receives an optional `lang` parameter. When `lang === "tr"`, descriptions and labels are Turkish.

### Modified functions:

**`getOrganizationSchema(lang)`**
- TR: Turkish `description`, adds `address` object (Çankırı), `areaServed`, `contactPoint` with bilgi@inculva.com
- EN: Current behavior, no address

**`getWebSiteSchema(lang)`**
- Adds `inLanguage: "tr"` or `"en"`
- TR: Turkish `description`

**`getSoftwareApplicationSchema(lang)`**
- TR: Turkish `description` and `featureList`
- Adds `availableLanguage: ["en", "tr"]` to both

**`getHowToSchema(lang, steps)`**
- TR: Turkish `name` and `description`
- Adds `inLanguage`

**`getBlogPostingSchema(lang, post)`**
- Adds `inLanguage`

**`getFAQSchema(lang, faqs)`**
- Adds `inLanguage`

**`getWebPageSchema(lang, page)`**
- Adds `inLanguage`

**`getProductSchema(lang, plans)`**
- Adds `availableAtOrFrom` with Turkish address when `lang === "tr"`
- Adds `inLanguage`

### New function:

**`getLocalBusinessSchema()`**
- `@type: "LocalBusiness"`
- Full address: Abdulhalik Renda Mahallesi, Ankara Caddesi, Merkez/Çankırı
- `addressCountry: "TR"`
- `email: "bilgi@inculva.com"`
- `url: "https://inculva.com/tr/"`
- `priceRange: "$$"`
- `areaServed: { "@type": "Country", "name": "Türkiye" }`
- Only rendered on `/tr/` pages via `BaseLayout.astro`

---

## Section 3: Sitemap Hreflang Enhancement

**Files:** `astro.config.mjs`

Configure `@astrojs/sitemap` with the `i18n` option:

```js
sitemap({
  i18n: {
    defaultLocale: 'en',
    locales: {
      en: 'en',
      tr: 'tr',
    },
  },
})
```

This generates `<xhtml:link rel="alternate" hreflang="...">` entries in the sitemap for every URL pair. Google strongly prefers hreflang in sitemaps for multi-language sites.

---

## Section 4: Server-Side Homepage Redirect

**Files:** `apps/landing/src/pages/index.astro`, new `apps/landing/src/middleware.ts`

**Problem:** Current client-side JS redirect (`window.location.replace('/tr/')`) is invisible to search engine crawlers.

**Solution:**

Create Astro middleware that:
1. Checks if the request is for `/` (root path only)
2. Reads `Accept-Language` header
3. If Turkish (`tr`), returns a `302` redirect to `/tr/`
4. Respects `?lang=` query parameter override
5. Falls through to the normal page for all other requests

Remove the `<script>` block from `index.astro`.

---

## Section 5: Canonical URLs

**Files:** `BaseLayout.astro`

**Problem:** Turkish pages don't set their own canonical URL. They may default to the English URL, telling Google the Turkish page is a duplicate.

**Solution:**

In `BaseLayout.astro`, auto-compute canonical using `getLocalizedCanonical(pagePath, lang)` (already exists in `seo.ts` but isn't used). Pass this as the default `canonical` prop to `SEOHead` when no explicit canonical is provided.

---

## Section 6: Robots.txt Enhancement

**Files:** `apps/landing/src/pages/robots.txt.ts`

Updated content:

```
User-agent: *
Allow: /
Allow: /tr/

Host: https://inculva.com

Sitemap: https://inculva.com/sitemap-index.xml
```

---

## Section 7: External Service Setup Guide

These are manual steps to be completed by the team:

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property `https://inculva.com`
3. Verify via DNS TXT record or HTML file upload
4. Submit `https://inculva.com/sitemap-index.xml`
5. Go to **Legacy tools > International Targeting** — set country to Türkiye
6. Use **URL Inspection** to request indexing of key `/tr/` pages:
   - `/tr/`
   - `/tr/features/`
   - `/tr/pricing/`
   - `/tr/kb/`
7. Monitor **Coverage** report for `/tr/` page indexing

### Google Business Profile
1. Go to https://business.google.com
2. Create profile for "inculva"
3. Category: "Software Company" (Yazılım Şirketi)
4. Address: Abdulhalik Renda Mahallesi, Ankara Caddesi, Merkez/Çankırı
5. Email: bilgi@inculva.com
6. Website: https://inculva.com/tr/
7. Verify via postcard or phone
8. Add business description in Turkish:
   > "Web erişilebilirlik platformu. Web sitelerinin otomatik olarak WCAG uyumluluğu sağlamasına yardımcı olur. Tek satır kod ile kurulum."

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Import from Google Search Console (fastest) or add manually
3. Submit sitemap
4. Bing powers DuckDuckGo and some AI search engines

---

## Files Changed (Summary)

| File | Action |
|------|--------|
| `apps/landing/src/lib/seo.ts` | Extend all schema functions with `lang`, add `getLocalBusinessSchema`, add locale to `getSEOProps` |
| `apps/landing/src/components/SEOHead.astro` | Pass og:locale through to SEO component |
| `apps/landing/src/layouts/BaseLayout.astro` | Add geo meta tags, content-language, auto-compute canonical, render LocalBusiness schema on TR pages |
| `apps/landing/astro.config.mjs` | Add i18n config to sitemap plugin |
| `apps/landing/src/pages/index.astro` | Remove JS redirect script |
| `apps/landing/src/middleware.ts` | New — server-side Accept-Language redirect |
| `apps/landing/src/pages/robots.txt.ts` | Add Allow /tr/, Host directive |
