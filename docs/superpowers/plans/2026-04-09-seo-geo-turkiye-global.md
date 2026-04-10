# SEO & GEO Optimization (Türkiye + Global) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all technical SEO and GEO issues so inculva ranks for Turkish and global search queries, with correct structured data, locale signals, and geo-targeting.

**Architecture:** Extend the existing `seo.ts` utility to accept a `lang` parameter on every schema/SEO function. Add locale and geo meta tags in `BaseLayout.astro`. Configure the sitemap plugin for i18n hreflang. Enhance the homepage redirect with a noscript fallback. All changes scoped to `apps/landing`.

**Tech Stack:** Astro 5.5 (static SSG), astro-seo 0.8.4, @astrojs/sitemap 3.2.1, TypeScript

**Important constraint:** This is a static Astro site (no server adapter). Middleware-based server-side redirects are not possible. The homepage language redirect stays client-side with an added `<noscript>` fallback for crawlers.

---

### Task 1: Extend `getSEOProps` with locale support

**Files:**
- Modify: `apps/landing/src/lib/seo.ts` (lines 6-54)

- [ ] **Step 1: Add `lang` parameter to `SEOProps` interface and `getSEOProps` function**

In `apps/landing/src/lib/seo.ts`, change the `SEOProps` interface and `getSEOProps` function:

```ts
export interface SEOProps {
  title: string;
  description: string;
  lang?: "en" | "tr";
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
}

export function getSEOProps(props: SEOProps) {
  const lang = props.lang || "en";
  const locale = lang === "tr" ? "tr_TR" : "en_US";
  const alternateLocale = lang === "tr" ? "en_US" : "tr_TR";

  const fullTitle =
    props.title === SITE_NAME
      ? `${SITE_NAME} — Web Accessibility Platform`
      : `${props.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: props.description,
    canonical: props.canonical || SITE_URL,
    noindex: props.noindex || false,
    openGraph: {
      basic: {
        title: fullTitle,
        type: props.ogType || "website",
        image: props.ogImage || DEFAULT_OG_IMAGE,
        url: props.canonical || SITE_URL,
      },
      optional: {
        description: props.description,
        siteName: SITE_NAME,
        locale,
        localeAlternate: [alternateLocale],
      },
      article:
        props.ogType === "article"
          ? {
              publishedTime: props.publishedAt,
              modifiedTime: props.modifiedAt,
            }
          : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description: props.description,
      image: props.ogImage || DEFAULT_OG_IMAGE,
    },
  };
}
```

- [ ] **Step 2: Run typecheck**

Run: `cd apps/landing && npx astro check`
Expected: No errors related to `getSEOProps`

- [ ] **Step 3: Commit**

```bash
git add apps/landing/src/lib/seo.ts
git commit -m "feat(seo): add locale support to getSEOProps for og:locale tags"
```

---

### Task 2: Pass `lang` through SEOHead and BaseLayout for canonical + locale

**Files:**
- Modify: `apps/landing/src/components/SEOHead.astro`
- Modify: `apps/landing/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Update SEOHead to accept and pass `lang`**

Replace `apps/landing/src/components/SEOHead.astro` with:

```astro
---
export interface Props {
  title: string;
  description: string;
  lang?: "en" | "tr";
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  publishedAt?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

import { SEO } from 'astro-seo';
import { getSEOProps } from '@/lib/seo';

const { title, description, lang, canonical, ogImage, ogType, noindex, publishedAt, jsonLd } = Astro.props;

const seoProps = getSEOProps({
  title,
  description,
  lang,
  canonical,
  ogImage,
  ogType,
  noindex,
  publishedAt,
});

const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
---

<SEO
  title={seoProps.title}
  description={seoProps.description}
  canonical={seoProps.canonical}
  noindex={seoProps.noindex}
  openGraph={seoProps.openGraph}
  twitter={seoProps.twitter}
/>

{schemas.map((schema) => (
  <script is:inline type="application/ld+json" set:html={JSON.stringify(schema)} />
))}
```

- [ ] **Step 2: Update BaseLayout to pass `lang`, auto-compute canonical, add geo and content-language meta tags**

Replace `apps/landing/src/layouts/BaseLayout.astro` with:

```astro
---
import SEOHead from '@/components/SEOHead.astro';
import Navbar from '@/components/Navbar.astro';
import Footer from '@/components/Footer.astro';
import CookieBanner from '@/components/CookieBanner.astro';
import { getOrganizationSchema, getWebSiteSchema, getHreflangAlternates, getLocalizedCanonical, getLocalBusinessSchema } from '@/lib/seo';
import { getLangFromUrl, getPathWithoutLang, type Lang } from '@/i18n';
import '@/styles/global.css';

export interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  publishedAt?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  lang?: Lang;
}

const {
  title,
  description,
  canonical,
  ogImage,
  ogType,
  noindex,
  publishedAt,
  jsonLd,
  lang: langProp,
} = Astro.props;

const lang = langProp ?? getLangFromUrl(Astro.url);
const rawPath = getPathWithoutLang(Astro.url.pathname);
const pagePath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
const hreflangAlternates = getHreflangAlternates(pagePath);
const autoCanonical = canonical || getLocalizedCanonical(pagePath, lang);

const globalSchemas = [getOrganizationSchema(lang), getWebSiteSchema(lang)];
if (lang === 'tr') {
  globalSchemas.push(getLocalBusinessSchema());
}
const allSchemas = jsonLd
  ? [...globalSchemas, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]
  : globalSchemas;
---

<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />
    <meta http-equiv="content-language" content={lang} />

    {lang === 'tr' && (
      <meta name="geo.region" content="TR-18" />
      <meta name="geo.placename" content="Çankırı, Türkiye" />
    )}

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KHVDSSZ752" is:inline></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KHVDSSZ752');
    </script>

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Hreflang alternate links for SEO -->
    {hreflangAlternates.map(({ lang: hrefLang, url }) => (
      <link rel="alternate" hreflang={hrefLang} href={url} />
    ))}

    <SEOHead
      title={title}
      description={description}
      lang={lang}
      canonical={autoCanonical}
      ogImage={ogImage}
      ogType={ogType}
      noindex={noindex}
      publishedAt={publishedAt}
      jsonLd={allSchemas}
    />
  </head>
  <body class="min-h-screen flex flex-col">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg">
      Skip to main content
    </a>

    <Navbar lang={lang} />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <Footer lang={lang} />

    <!-- Cal.com Embed -->
    <script is:inline>
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", {origin:"https://cal.eu"});
      Cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    </script>
    <script is:inline>
      document.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-cal-link]');
        if (btn && window.Cal) {
          e.preventDefault();
          Cal("openModal", { calLink: btn.getAttribute('data-cal-link') });
        }
      });
    </script>

    <script>
      function initScrollAnimations() {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
          observer.observe(el);
        });
      }

      // Run on initial load
      initScrollAnimations();

      // Run on ViewTransition navigation if added
      document.addEventListener('astro:after-swap', initScrollAnimations);
    </script>

     <script src="https://cdn.inculva.com/widget.js" data-site-id="cmnmcddso0001qf01ph64i4er" async></script>

    <CookieBanner lang={lang} />
  </body>
</html>
```

- [ ] **Step 3: Run typecheck**

Run: `cd apps/landing && npx astro check`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add apps/landing/src/components/SEOHead.astro apps/landing/src/layouts/BaseLayout.astro
git commit -m "feat(seo): pass lang to SEOHead, auto-compute canonical, add geo meta tags"
```

---

### Task 3: Localize all JSON-LD schema generators

**Files:**
- Modify: `apps/landing/src/lib/seo.ts` (lines 58-260)

- [ ] **Step 1: Update `getOrganizationSchema` to accept `lang`**

Replace the existing `getOrganizationSchema` function in `apps/landing/src/lib/seo.ts`:

```ts
export function getOrganizationSchema(lang?: "en" | "tr") {
  const base = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${CDN_URL}/logos/logo-dark.png`,
    description:
      lang === "tr"
        ? "Web sitelerinin otomatik olarak WCAG uyumluluğu sağlamasına yardımcı olan web erişilebilirlik platformu."
        : "Web accessibility platform that helps websites achieve WCAG compliance automatically.",
    sameAs: ["https://youtube.com/@inculva", "https://x.com/inculva"],
    ...(lang === "tr" && {
      address: {
        "@type": "PostalAddress",
        streetAddress: "Abdulhalik Renda Mahallesi, Ankara Caddesi",
        addressLocality: "Merkez",
        addressRegion: "Çankırı",
        addressCountry: "TR",
      },
      areaServed: {
        "@type": "Country",
        name: "Türkiye",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "bilgi@inculva.com",
        contactType: "customer support",
        availableLanguage: ["Turkish", "English"],
      },
    }),
  };
  return base;
}
```

- [ ] **Step 2: Update `getWebSiteSchema` to accept `lang`**

Replace the existing `getWebSiteSchema` function:

```ts
export function getWebSiteSchema(lang?: "en" | "tr") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: lang === "tr" ? `${SITE_URL}/tr` : SITE_URL,
    description:
      lang === "tr"
        ? "Web erişilebilirlik platformu"
        : "Web accessibility platform",
    inLanguage: lang || "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}
```

- [ ] **Step 3: Update `getBlogPostingSchema` to accept `lang`**

Replace the existing `getBlogPostingSchema` function:

```ts
export function getBlogPostingSchema(
  post: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedAt: string;
  },
  lang?: "en" | "tr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    inLanguage: lang || "en",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${CDN_URL}/logos/logo-dark.png`,
      },
    },
  };
}
```

- [ ] **Step 4: Update `getFAQSchema` to accept `lang`**

Replace the existing `getFAQSchema` function:

```ts
export function getFAQSchema(
  faqs: { question: string; answer: string }[],
  lang?: "en" | "tr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang || "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
```

- [ ] **Step 5: Update `getSoftwareApplicationSchema` to accept `lang`**

Replace the existing `getSoftwareApplicationSchema` function:

```ts
export function getSoftwareApplicationSchema(lang?: "en" | "tr") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    url: SITE_URL,
    description:
      lang === "tr"
        ? "WCAG uyumluluk sorunlarını otomatik olarak tespit eden, düzelten ve izleyen web erişilebilirlik platformu. 41+ dil desteği, her web sitesiyle çalışır."
        : "Automated web accessibility platform that detects, fixes, and monitors WCAG compliance issues. Supports 41+ languages, works with any website.",
    inLanguage: lang || "en",
    availableLanguage: ["en", "tr"],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "39",
      highPrice: "119",
      offerCount: "3",
    },
    featureList:
      lang === "tr"
        ? [
            "Otomatik WCAG 2.1 AA & AAA taraması",
            "Tek tıkla erişilebilirlik düzeltmeleri",
            "Gerçek zamanlı uyumluluk izleme",
            "Çoklu dil desteği (41+ dil)",
            "Her framework ve CMS ile çalışır",
            "ADA, Section 508, EN 301 549 uyumluluğu",
          ]
        : [
            "Automated WCAG 2.1 AA & AAA scanning",
            "One-click accessibility fixes",
            "Real-time compliance monitoring",
            "Multi-language support (41+ languages)",
            "Works with any framework or CMS",
            "ADA, Section 508, EN 301 549 compliance",
          ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
```

- [ ] **Step 6: Update `getHowToSchema` to accept `lang`**

Replace the existing `getHowToSchema` function:

```ts
export function getHowToSchema(
  steps: { name: string; text: string }[],
  lang?: "en" | "tr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name:
      lang === "tr"
        ? "inculva ile web sitenizi WCAG uyumlu hale nasıl getirirsiniz"
        : "How to make your website WCAG compliant with inculva",
    description:
      lang === "tr"
        ? "Kurulumdan tam WCAG uyumluluğuna aylar değil, dakikalar içinde ulaşın."
        : "From installation to full WCAG compliance in minutes, not months.",
    inLanguage: lang || "en",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
```

- [ ] **Step 7: Update `getWebPageSchema` to accept `lang`**

Replace the existing `getWebPageSchema` function:

```ts
export function getWebPageSchema(
  page: {
    name: string;
    description: string;
    url: string;
    type?: string;
  },
  lang?: "en" | "tr",
) {
  return {
    "@context": "https://schema.org",
    "@type": page.type || "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
    inLanguage: lang || "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}
```

- [ ] **Step 8: Update `getProductSchema` to accept `lang`**

Replace the existing `getProductSchema` function:

```ts
export function getProductSchema(
  plans: {
    name: string;
    description: string;
    price: string;
    features: string[];
  }[],
  lang?: "en" | "tr",
) {
  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} ${plan.name}`,
    description: plan.description,
    inLanguage: lang || "en",
    brand: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "USD",
      priceValidUntil: new Date(Date.now() + 365 * 86400000)
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${lang === "tr" ? "/tr" : ""}/pricing`,
    },
  }));
}
```

- [ ] **Step 9: Add new `getLocalBusinessSchema` function**

Add this new function at the end of `apps/landing/src/lib/seo.ts` (before the `getLocalizedCanonical` function):

```ts
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Web erişilebilirlik platformu. Web sitelerinin otomatik olarak WCAG uyumluluğu sağlamasına yardımcı olur.",
    url: `${SITE_URL}/tr`,
    email: "bilgi@inculva.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Abdulhalik Renda Mahallesi, Ankara Caddesi",
      addressLocality: "Merkez",
      addressRegion: "Çankırı",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    priceRange: "$$",
    sameAs: ["https://youtube.com/@inculva", "https://x.com/inculva"],
  };
}
```

- [ ] **Step 10: Run typecheck**

Run: `cd apps/landing && npx astro check`
Expected: No type errors

- [ ] **Step 11: Commit**

```bash
git add apps/landing/src/lib/seo.ts
git commit -m "feat(seo): localize all JSON-LD schemas with lang parameter, add LocalBusiness schema"
```

---

### Task 4: Update all page components to pass `lang` to schema functions

**Files:**
- Modify: all page components in `apps/landing/src/components/pages/` that call schema functions

- [ ] **Step 1: Find all schema function call sites**

Run: `grep -rn 'getOrganizationSchema\|getWebSiteSchema\|getSoftwareApplicationSchema\|getHowToSchema\|getFAQSchema\|getWebPageSchema\|getProductSchema\|getBlogPostingSchema\|getBreadcrumbSchema' apps/landing/src/components/ apps/landing/src/pages/`

Look at each call site and add the `lang` parameter where missing. The `BaseLayout.astro` already passes `lang` to `getOrganizationSchema` and `getWebSiteSchema` (done in Task 2). This step handles any remaining calls in page components.

- [ ] **Step 2: Update each page component**

For each file found in Step 1, add `lang` as the last argument to every schema function call. The `lang` prop is already available in each page component. Example patterns:

```ts
// Before:
getSoftwareApplicationSchema()
// After:
getSoftwareApplicationSchema(lang)

// Before:
getFAQSchema(faqs)
// After:
getFAQSchema(faqs, lang)

// Before:
getHowToSchema(steps)
// After:
getHowToSchema(steps, lang)

// Before:
getWebPageSchema({ name, description, url })
// After:
getWebPageSchema({ name, description, url }, lang)

// Before:
getProductSchema(plans)
// After:
getProductSchema(plans, lang)

// Before:
getBlogPostingSchema(post)
// After:
getBlogPostingSchema(post, lang)
```

- [ ] **Step 3: Run typecheck**

Run: `cd apps/landing && npx astro check`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add apps/landing/src/components/ apps/landing/src/pages/
git commit -m "feat(seo): pass lang to all JSON-LD schema calls across page components"
```

---

### Task 5: Configure sitemap plugin for i18n hreflang

**Files:**
- Modify: `apps/landing/astro.config.mjs`

- [ ] **Step 1: Add i18n config to the sitemap plugin**

In `apps/landing/astro.config.mjs`, change the `sitemap()` call:

```js
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://inculva.com",
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          tr: "tr",
        },
      },
    }),
    react(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: true,
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
```

- [ ] **Step 2: Build and verify sitemap output**

Run: `cd apps/landing && npx astro build`

Then check the generated sitemap:
Run: `head -50 apps/landing/dist/sitemap-0.xml`

Expected: Each `<url>` entry now contains `<xhtml:link rel="alternate" hreflang="en" ...>` and `<xhtml:link rel="alternate" hreflang="tr" ...>` entries.

- [ ] **Step 3: Commit**

```bash
git add apps/landing/astro.config.mjs
git commit -m "feat(seo): configure sitemap plugin with i18n hreflang for en/tr"
```

---

### Task 6: Enhance homepage redirect with noscript fallback

**Files:**
- Modify: `apps/landing/src/pages/index.astro`

- [ ] **Step 1: Add noscript fallback to the homepage**

Replace `apps/landing/src/pages/index.astro` with:

```astro
---
import HomePage from '@/components/pages/HomePage.astro';
---

<script is:inline>
  (function() {
    if (window.location.pathname !== '/') return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('lang')) {
      localStorage.setItem('preferred-lang', urlParams.get('lang'));
    }

    const preferredLang = localStorage.getItem('preferred-lang');
    if (preferredLang === 'en') return;

    const browserLang = navigator.language;
    if (browserLang && browserLang.toLowerCase().startsWith('tr')) {
      window.location.replace('/tr/');
    }
  })();
</script>

<noscript>
  <meta http-equiv="refresh" content="0;url=/tr/" />
</noscript>

<HomePage lang="en" />
```

Note: The `<noscript><meta http-equiv="refresh">` ensures crawlers that don't execute JS still discover `/tr/`. Googlebot does execute JS, but this covers Bing and other crawlers.

- [ ] **Step 2: Run build to verify**

Run: `cd apps/landing && npx astro build`
Expected: No build errors

- [ ] **Step 3: Commit**

```bash
git add apps/landing/src/pages/index.astro
git commit -m "feat(seo): add noscript meta refresh fallback for Turkish homepage redirect"
```

---

### Task 7: Enhance robots.txt

**Files:**
- Modify: `apps/landing/src/pages/robots.txt.ts`

- [ ] **Step 1: Update robots.txt with Allow /tr/ and Host directive**

Replace `apps/landing/src/pages/robots.txt.ts` with:

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /tr/

Host: https://inculva.com

Sitemap: https://inculva.com/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
```

- [ ] **Step 2: Commit**

```bash
git add apps/landing/src/pages/robots.txt.ts
git commit -m "feat(seo): add Allow /tr/ and Host directive to robots.txt"
```

---

### Task 8: Final build verification

- [ ] **Step 1: Full build**

Run: `cd apps/landing && npx astro build`
Expected: Build completes with no errors

- [ ] **Step 2: Verify Turkish homepage output contains geo meta tags**

Run: `grep -A2 'geo.region\|geo.placename\|content-language\|og:locale\|LocalBusiness' apps/landing/dist/tr/index.html | head -20`

Expected: Lines containing:
- `<meta name="geo.region" content="TR-18">`
- `<meta name="geo.placename" content="Çankırı, Türkiye">`
- `<meta http-equiv="content-language" content="tr">`
- `og:locale` with `tr_TR`
- `LocalBusiness` in a JSON-LD script block

- [ ] **Step 3: Verify English homepage does NOT have geo tags**

Run: `grep 'geo.region\|geo.placename' apps/landing/dist/index.html`
Expected: No matches (geo tags only on Turkish pages)

- [ ] **Step 4: Verify sitemap has hreflang entries**

Run: `grep 'xhtml:link' apps/landing/dist/sitemap-0.xml | head -10`
Expected: `<xhtml:link rel="alternate" hreflang="tr" ...>` entries present

- [ ] **Step 5: Verify canonical URLs**

Run: `grep 'canonical' apps/landing/dist/tr/index.html`
Expected: `<link rel="canonical" href="https://inculva.com/tr">`

Run: `grep 'canonical' apps/landing/dist/index.html`
Expected: `<link rel="canonical" href="https://inculva.com">`

- [ ] **Step 6: Verify robots.txt**

Run: `cat apps/landing/dist/robots.txt`
Expected: Contains `Allow: /tr/` and `Host: https://inculva.com`

- [ ] **Step 7: Commit (if any fixes were needed)**

Only if previous steps required fixes.

---

### Post-Implementation: External Service Setup (Manual Steps)

These are not code tasks. Complete them after deployment:

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property `https://inculva.com`
3. Verify via DNS TXT record or HTML file upload
4. Submit `https://inculva.com/sitemap-index.xml`
5. Navigate to **Legacy tools > International Targeting** — set country to Türkiye
6. Use **URL Inspection** to request indexing of `/tr/`, `/tr/features/`, `/tr/pricing/`, `/tr/kb/`
7. Monitor **Coverage** report for `/tr/` page indexing over the following weeks

**Google Business Profile:**
1. Go to https://business.google.com
2. Create a profile for "inculva"
3. Category: "Yazılım Şirketi" (Software Company)
4. Address: Abdulhalik Renda Mahallesi, Ankara Caddesi, Merkez/Çankırı
5. Email: bilgi@inculva.com
6. Website: https://inculva.com/tr/
7. Verify via postcard or phone
8. Business description (Turkish): "Web erişilebilirlik platformu. Web sitelerinin otomatik olarak WCAG uyumluluğu sağlamasına yardımcı olur. Tek satır kod ile kurulum."

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Import from Google Search Console (fastest method) or add manually
3. Submit sitemap: `https://inculva.com/sitemap-index.xml`
