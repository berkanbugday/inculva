# Inculva Knowledge Base — Design Spec

**Date:** 2026-03-30
**Status:** Draft
**Scope:** Sanity CMS schema, Astro KB pages, WCAG rule content, guides, SEO/GEO/AEO

---

## 1. Overview

Build a comprehensive, bilingual (EN/TR) knowledge base at `/kb/` on the Inculva landing site. Content covers all WCAG 2.0/2.1/2.2 success criteria with merged axe-core rules, plus SEO/GEO/AEO guides. Each article is original content synthesized from multiple authoritative sources, optimized for search engines, AI engines, and answer engines.

**Goals:**
- SEO authority for accessibility-related queries in EN and TR markets
- User education — scanner results link directly to KB articles
- GEO/AEO — structured content AI engines can cite and extract
- Resource hub — each article links to multiple authoritative external sources

---

## 2. Clean Slate

Before any new work:
- Remove all existing Sanity content (seed posts, any published documents)
- Remove existing `post` schema from Sanity Studio
- Remove existing `/blog/[slug].astro` and `/blog/index.astro` pages
- Remove existing blog components (`BlogCard.astro`, etc.)
- Remove `seed-posts.mjs`
- Keep Sanity client config (`src/lib/sanity.ts`) — will be updated

---

## 3. Sanity Document Types

### 3.1 `wcagRule`

```
wcagRule:
  criterionNumber: string          — "1.1.1"
  level: "A" | "AA" | "AAA"
  principle: "perceivable" | "operable" | "understandable" | "robust"
  introducedIn: "2.0" | "2.1" | "2.2"
  wcagVersions: ["2.0", "2.1", "2.2"]  — all versions containing this rule
  impact: "critical" | "serious" | "moderate" | "minor"
  axeRuleIds: string[]             — ["image-alt", "input-image-alt", ...]
  tags: string[]                   — ["images", "forms", "aria", "keyboard", ...]

  title:                           — localized
    en: string
    tr: string
  slug: string                     — auto-generated from title.en
  description:                     — localized
    en: text
    tr: text
  content:                         — localized Portable Text
    en: PortableText[]
    tr: PortableText[]

  resources: array of:
    title: string
    url: url
    source: string                 — "W3C", "Deque", "WebAIM", "MDN", etc.
    language: "en" | "tr" | "both"

  seo:                             — localized
    en:
      metaTitle: string
      metaDescription: string
    tr:
      metaTitle: string
      metaDescription: string

  publishedAt: datetime
```

### 3.2 `guide`

```
guide:
  category: "seo" | "geo" | "aeo" | "technique" | "best-practice"
  relatedWcagRules: reference[]    — references to wcagRule documents

  title:                           — localized
    en: string
    tr: string
  slug: string
  description:                     — localized
    en: text
    tr: text
  content:                         — localized Portable Text
    en: PortableText[]
    tr: PortableText[]

  resources: array of:
    title: string
    url: url
    source: string
    language: "en" | "tr" | "both"

  seo:                             — localized
    en:
      metaTitle: string
      metaDescription: string
    tr:
      metaTitle: string
      metaDescription: string

  publishedAt: datetime
```

### 3.3 Localization Strategy

- Use `@sanity/document-internationalization` plugin
- Single document per rule, localized fields with EN/TR tabs in Studio
- Slug derived from English title only (consistent URLs across languages)

---

## 4. Sanity Studio Structure

Custom desk structure grouping:

```
Knowledge Base
├── WCAG Rules
│   ├── Perceivable
│   │   ├── 1.1 Text Alternatives
│   │   ├── 1.2 Time-based Media
│   │   ├── 1.3 Adaptable
│   │   └── 1.4 Distinguishable
│   ├── Operable
│   │   ├── 2.1 Keyboard Accessible
│   │   ├── 2.2 Enough Time
│   │   ├── 2.3 Seizures and Physical Reactions
│   │   ├── 2.4 Navigable
│   │   └── 2.5 Input Modalities
│   ├── Understandable
│   │   ├── 3.1 Readable
│   │   ├── 3.2 Predictable
│   │   └── 3.3 Input Assistance
│   └── Robust
│       └── 4.1 Compatible
├── Guides
│   ├── SEO
│   ├── GEO
│   ├── AEO
│   ├── Techniques
│   └── Best Practices
└── Blog Posts (future company content)
```

---

## 5. Astro Landing Site — KB Pages

### 5.1 New Routes

```
/kb/                              — KB landing page (EN)
/kb/wcag/                         — All WCAG rules listing (EN)
/kb/wcag/[slug]/                  — Individual WCAG rule (EN)
/kb/guides/                       — All guides listing (EN)
/kb/guides/[slug]/                — Individual guide (EN)

/tr/kb/                           — KB landing page (TR)
/tr/kb/wcag/                      — All WCAG rules listing (TR)
/tr/kb/wcag/[slug]/               — Individual WCAG rule (TR)
/tr/kb/guides/                    — All guides listing (TR)
/tr/kb/guides/[slug]/             — Individual guide (TR)
```

### 5.2 KB Landing Page (`/kb/`)

- Hero section: "Inculva Accessibility Knowledge Base"
- Filter/search by: WCAG version (2.0/2.1/2.2), level (A/AA/AAA), principle, tags
- Grid of WCAG rule cards + guide cards
- Version badges on each card

### 5.3 WCAG Rule Page (`/kb/wcag/[slug]/`)

Article structure:
1. **Header** — criterion number, name, level badge, version badges, impact badge
2. **Quick answer** — 2-3 sentence plain-language summary (AEO: featured snippet target)
3. **What this rule means** — detailed explanation
4. **Why it matters** — real user impact, disability context
5. **Related axe-core rules** — each rule explained with examples
6. **How to test** — manual testing steps + automated (Inculva scanner mention)
7. **How to fix** — code examples (before/after)
8. **Common mistakes** — what developers get wrong
9. **FAQ** — structured Q&A (AEO: FAQ schema markup)
10. **Resources** — curated external links with source attribution

Sidebar:
- Table of contents
- Related WCAG rules
- WCAG version info
- Quick facts (level, principle, impact)

### 5.4 Guide Page (`/kb/guides/[slug]/`)

Similar structure but without WCAG-specific fields. Focuses on:
- Topic overview
- Step-by-step guidance
- Code examples where relevant
- Related WCAG rules (linked)
- Resources

---

## 6. SEO/GEO/AEO Implementation

### 6.1 SEO

- Unique `<title>` and `<meta description>` per page per language
- JSON-LD `TechArticle` schema on WCAG rule pages
- JSON-LD `FAQPage` schema where FAQ section exists
- `hreflang` tags linking EN↔TR versions
- Canonical URLs
- Internal linking mesh between related WCAG rules
- Sitemap.xml updated with all KB pages
- Breadcrumb navigation with BreadcrumbList schema

### 6.2 GEO (Generative Engine Optimization)

- Clear definitions in first paragraph (AI extraction target)
- Consistent heading hierarchy (H1→H2→H3)
- Authoritative source citations throughout content
- Structured data markup
- Concise, factual writing style

### 6.3 AEO (Answer Engine Optimization)

- Direct answer in first 2-3 sentences (featured snippet)
- "What / Why / How" structure
- FAQ sections with FAQPage schema
- HowTo schema for fix instructions
- Tables and lists for scannable content
- Definition lists for terminology

---

## 7. Content Research Sources

Each WCAG rule article is synthesized from these sources:

| Source | URL Pattern | What We Extract |
|--------|------------|-----------------|
| W3C WCAG Spec | w3.org/TR/WCAG22/ | Normative text, success criteria definitions |
| W3C Understanding WCAG | w3.org/WAI/WCAG22/Understanding/ | Intent, benefits, examples |
| W3C Techniques | w3.org/WAI/WCAG22/Techniques/ | Sufficient techniques, failures, code patterns |
| W3C WAI Tutorials | w3.org/WAI/tutorials/ | Practical implementation guidance |
| Deque University | dequeuniversity.com | Rule explanations, testing techniques |
| WebAIM | webaim.org | Articles, screen reader guides, survey data |
| MDN Web Docs | developer.mozilla.org | HTML/ARIA semantics, browser support |
| A11Y Project | a11yproject.com | Community best practices |
| ACT Rules | act-rules.github.io | Standardized test rules |
| Axe-core GitHub | github.com/dequelabs/axe-core | Rule source code, checks, metadata |

Each article includes a **Resources** section linking readers directly to relevant pages from these sources.

---

## 8. Scanner Integration

The `@inculva/scanner` package uses axe-core. Each violation includes a `ruleId`.

**Linkage flow:**
1. Scanner detects violation → `ruleId: "image-alt"`
2. Lookup `wcagRule` document where `axeRuleIds` contains `"image-alt"`
3. Link to `/kb/wcag/1-1-1-non-text-content/`
4. User reads the article, understands the issue, learns how to fix it

This requires a mapping file or API endpoint that resolves axe rule IDs to KB slugs. Can be:
- Static JSON mapping generated at build time from Sanity data
- Or a GROQ query at runtime

**Recommendation:** Static JSON mapping generated during Astro build. No runtime dependency on Sanity for scanner results.

---

## 9. Content Volume

| Type | Count | Languages | Total Articles |
|------|-------|-----------|----------------|
| WCAG 2.0 rules | 61 | EN + TR | 61 (localized) |
| WCAG 2.1 new rules | 17 | EN + TR | 17 (localized) |
| WCAG 2.2 new rules | 9 | EN + TR | 9 (localized) |
| **Total WCAG** | **87** | | **87 documents** |
| Guides (SEO/GEO/AEO/techniques) | ~25 | EN + TR | ~25 documents |
| **Grand total** | **~112** | | **~112 documents** |

Note: Each document contains both EN and TR content (localized fields), so 112 Sanity documents = 224 rendered pages.

---

## 10. Execution Order

1. **Clean slate** — Remove existing Sanity content, blog pages, seed scripts
2. **Sanity schemas** — Create `wcagRule`, `guide` types with localized fields
3. **Sanity Studio** — Desk structure, internationalization plugin
4. **Astro KB pages** — `/kb/` routes, layouts, components, SEO markup
5. **Content creation — WCAG rules** — All 87 rules, EN + TR, with resources
6. **Content creation — Guides** — SEO, GEO, AEO guides, EN + TR
7. **Scanner integration** — Axe rule ID → KB slug mapping
8. **Sitemap & final SEO** — Updated sitemap, hreflang, internal linking audit
