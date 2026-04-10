# Knowledge Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/TR) accessibility knowledge base at `/kb/` with WCAG rule articles, guides, Sanity CMS backend, and SEO/GEO/AEO optimization.

**Architecture:** Sanity CMS with `wcagRule` and `guide` document types using field-level localization. Astro static pages at `/kb/wcag/[slug]` and `/kb/guides/[slug]` with JSON-LD, hreflang, and structured data. Scanner integration via static axe-rule-to-slug mapping.

**Tech Stack:** Sanity v3, Astro 5.5, Tailwind CSS 3.4, @sanity/client 7.3, @astrojs/tailwind, astro-seo

---

## File Structure

### Sanity Studio (`apps/studio/`)

| Action | Path                                           | Responsibility                        |
| ------ | ---------------------------------------------- | ------------------------------------- |
| Delete | `schemaTypes/post.ts`                          | Old blog post schema                  |
| Delete | `seed-posts.mjs`                               | Old seed script                       |
| Create | `schemaTypes/objects/localizedString.ts`       | Localized string field type           |
| Create | `schemaTypes/objects/localizedText.ts`         | Localized text field type             |
| Create | `schemaTypes/objects/localizedPortableText.ts` | Localized Portable Text field type    |
| Create | `schemaTypes/objects/localizedSeo.ts`          | Localized SEO fields object           |
| Create | `schemaTypes/objects/resource.ts`              | External resource link object         |
| Create | `schemaTypes/documents/wcagRule.ts`            | WCAG rule document type               |
| Create | `schemaTypes/documents/guide.ts`               | Guide document type                   |
| Modify | `schemaTypes/index.ts`                         | Export new schema types               |
| Create | `deskStructure.ts`                             | Custom desk structure                 |
| Modify | `sanity.config.ts`                             | Add desk structure, remove old config |
| Modify | `package.json`                                 | Add any needed dependencies           |

### Astro Landing (`apps/landing/`)

| Action | Path                                      | Responsibility                     |
| ------ | ----------------------------------------- | ---------------------------------- |
| Delete | `src/pages/blog/index.astro`              | Old blog listing                   |
| Delete | `src/pages/blog/[slug].astro`             | Old blog post page                 |
| Delete | `src/pages/tr/blog/index.astro`           | Old TR blog listing (if exists)    |
| Delete | `src/pages/tr/blog/[slug].astro`          | Old TR blog post page (if exists)  |
| Delete | `src/components/BlogCard.astro`           | Old blog card component            |
| Modify | `src/lib/sanity.ts`                       | New queries for wcagRule and guide |
| Create | `src/lib/portable-text.ts`                | Portable Text to HTML renderer     |
| Create | `src/pages/kb/index.astro`                | KB landing page (EN)               |
| Create | `src/pages/kb/wcag/index.astro`           | WCAG rules listing (EN)            |
| Create | `src/pages/kb/wcag/[slug].astro`          | Individual WCAG rule page (EN)     |
| Create | `src/pages/kb/guides/index.astro`         | Guides listing (EN)                |
| Create | `src/pages/kb/guides/[slug].astro`        | Individual guide page (EN)         |
| Create | `src/pages/tr/kb/index.astro`             | KB landing page (TR)               |
| Create | `src/pages/tr/kb/wcag/index.astro`        | WCAG rules listing (TR)            |
| Create | `src/pages/tr/kb/wcag/[slug].astro`       | Individual WCAG rule page (TR)     |
| Create | `src/pages/tr/kb/guides/index.astro`      | Guides listing (TR)                |
| Create | `src/pages/tr/kb/guides/[slug].astro`     | Individual guide page (TR)         |
| Create | `src/components/kb/KBCard.astro`          | KB listing card component          |
| Create | `src/components/kb/RuleBadges.astro`      | Level/version/impact badges        |
| Create | `src/components/kb/TableOfContents.astro` | Article sidebar TOC                |
| Create | `src/components/kb/ResourceList.astro`    | External resources section         |
| Create | `src/components/kb/RelatedRules.astro`    | Related WCAG rules sidebar         |
| Create | `src/components/kb/Breadcrumbs.astro`     | Breadcrumb navigation              |
| Create | `src/components/kb/FAQSection.astro`      | FAQ with schema markup             |
| Create | `src/components/kb/KBLayout.astro`        | KB page layout wrapper             |
| Modify | `src/components/Navbar.astro`             | Add KB link to navigation          |

### Content Seed Scripts (`apps/studio/`)

| Action | Path                         | Responsibility                             |
| ------ | ---------------------------- | ------------------------------------------ |
| Create | `seed/seed-wcag-rules.mjs`   | Seed all 87 WCAG rules with EN+TR content  |
| Create | `seed/seed-guides.mjs`       | Seed SEO/GEO/AEO guides with EN+TR content |
| Create | `seed/axe-rule-mapping.json` | Axe rule ID → WCAG criterion mapping       |

---

## Task 1: Clean Slate — Remove Existing Blog

**Files:**

- Delete: `apps/studio/schemaTypes/post.ts`
- Delete: `apps/studio/seed-posts.mjs`
- Delete: `apps/landing/src/pages/blog/index.astro`
- Delete: `apps/landing/src/pages/blog/[slug].astro`
- Delete: `apps/landing/src/pages/tr/blog/index.astro` (if exists)
- Delete: `apps/landing/src/pages/tr/blog/[slug].astro` (if exists)
- Delete: `apps/landing/src/components/BlogCard.astro`
- Modify: `apps/studio/schemaTypes/index.ts`

- [ ] **Step 1: Delete old Sanity post schema**

```bash
rm apps/studio/schemaTypes/post.ts
rm apps/studio/seed-posts.mjs
```

- [ ] **Step 2: Clear schemaTypes index**

Replace `apps/studio/schemaTypes/index.ts` with:

```typescript
export const schemaTypes: any[] = [];
```

- [ ] **Step 3: Delete old blog pages**

```bash
rm apps/landing/src/pages/blog/index.astro
rm apps/landing/src/pages/blog/[slug].astro
rm -f apps/landing/src/pages/tr/blog/index.astro
rm -f apps/landing/src/pages/tr/blog/[slug].astro
rm apps/landing/src/components/BlogCard.astro
```

- [ ] **Step 4: Delete existing Sanity content via CLI**

Run from `apps/studio/`:

```bash
npx sanity dataset export production production-backup.tar.gz
npx sanity documents delete --dataset production '*[_type == "post"]'
```

- [ ] **Step 5: Verify clean state**

```bash
cd apps/studio && npx sanity dev
# Should load with empty schema
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove existing blog schema, pages, and seed data for KB rebuild"
```

---

## Task 2: Sanity Localized Field Objects

**Files:**

- Create: `apps/studio/schemaTypes/objects/localizedString.ts`
- Create: `apps/studio/schemaTypes/objects/localizedText.ts`
- Create: `apps/studio/schemaTypes/objects/localizedPortableText.ts`
- Create: `apps/studio/schemaTypes/objects/localizedSeo.ts`
- Create: `apps/studio/schemaTypes/objects/resource.ts`

- [ ] **Step 1: Create localizedString type**

Create `apps/studio/schemaTypes/objects/localizedString.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "string",
    }),
  ],
});
```

- [ ] **Step 2: Create localizedText type**

Create `apps/studio/schemaTypes/objects/localizedText.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "text",
      rows: 3,
    }),
  ],
});
```

- [ ] **Step 3: Create localizedPortableText type**

Create `apps/studio/schemaTypes/objects/localizedPortableText.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const localizedPortableText = defineType({
  name: "localizedPortableText",
  title: "Localized Portable Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            languageAlternatives: [
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "tr",
      title: "Turkish",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            languageAlternatives: [
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
            ],
          },
        },
      ],
    }),
  ],
});
```

- [ ] **Step 4: Create localizedSeo type**

Create `apps/studio/schemaTypes/objects/localizedSeo.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const localizedSeo = defineType({
  name: "localizedSeo",
  title: "Localized SEO",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Max 60 characters",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "Max 160 characters",
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
    defineField({
      name: "tr",
      title: "Turkish SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Max 60 characters",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "Max 160 characters",
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
});
```

- [ ] **Step 5: Create resource type**

Create `apps/studio/schemaTypes/objects/resource.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "External Resource",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "W3C WCAG Spec", value: "w3c-spec" },
          { title: "W3C Understanding WCAG", value: "w3c-understanding" },
          { title: "W3C Techniques", value: "w3c-techniques" },
          { title: "W3C WAI Tutorials", value: "w3c-wai" },
          { title: "Deque University", value: "deque" },
          { title: "WebAIM", value: "webaim" },
          { title: "MDN Web Docs", value: "mdn" },
          { title: "A11Y Project", value: "a11y-project" },
          { title: "ACT Rules", value: "act-rules" },
          { title: "Axe-core", value: "axe-core" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Turkish", value: "tr" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "en",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "source",
    },
  },
});
```

- [ ] **Step 6: Install sanity code-input plugin**

```bash
cd apps/studio && npm install @sanity/code-input
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add localized field objects and resource schema for KB"
```

---

## Task 3: Sanity wcagRule Document Schema

**Files:**

- Create: `apps/studio/schemaTypes/documents/wcagRule.ts`

- [ ] **Step 1: Create wcagRule schema**

Create `apps/studio/schemaTypes/documents/wcagRule.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const wcagRule = defineType({
  name: "wcagRule",
  title: "WCAG Rule",
  type: "document",
  fields: [
    defineField({
      name: "criterionNumber",
      title: "Criterion Number",
      type: "string",
      description: "e.g. 1.1.1, 2.4.7",
      validation: (Rule) => Rule.required().regex(/^\d+\.\d+\.\d+$/),
    }),
    defineField({
      name: "level",
      title: "Conformance Level",
      type: "string",
      options: {
        list: [
          { title: "A", value: "A" },
          { title: "AA", value: "AA" },
          { title: "AAA", value: "AAA" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "principle",
      title: "Principle",
      type: "string",
      options: {
        list: [
          { title: "Perceivable", value: "perceivable" },
          { title: "Operable", value: "operable" },
          { title: "Understandable", value: "understandable" },
          { title: "Robust", value: "robust" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introducedIn",
      title: "Introduced In",
      type: "string",
      description: "WCAG version that first added this criterion",
      options: {
        list: [
          { title: "WCAG 2.0", value: "2.0" },
          { title: "WCAG 2.1", value: "2.1" },
          { title: "WCAG 2.2", value: "2.2" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "wcagVersions",
      title: "Present In Versions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "WCAG 2.0", value: "2.0" },
          { title: "WCAG 2.1", value: "2.1" },
          { title: "WCAG 2.2", value: "2.2" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "impact",
      title: "Impact",
      type: "string",
      options: {
        list: [
          { title: "Critical", value: "critical" },
          { title: "Serious", value: "serious" },
          { title: "Moderate", value: "moderate" },
          { title: "Minor", value: "minor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "axeRuleIds",
      title: "Axe-core Rule IDs",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Related axe-core rule identifiers (e.g. image-alt, color-contrast)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Images", value: "images" },
          { title: "Forms", value: "forms" },
          { title: "Color", value: "color" },
          { title: "ARIA", value: "aria" },
          { title: "Keyboard", value: "keyboard" },
          { title: "Navigation", value: "navigation" },
          { title: "Text", value: "text" },
          { title: "Media", value: "media" },
          { title: "Structure", value: "structure" },
          { title: "Tables", value: "tables" },
          { title: "Links", value: "links" },
          { title: "Timing", value: "timing" },
          { title: "Errors", value: "errors" },
          { title: "Language", value: "language" },
          { title: "Predictability", value: "predictability" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) => {
          const num = doc.criterionNumber || "";
          const title = doc.title?.en || "";
          return `${num.replace(/\./g, "-")}-${title}`;
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedPortableText",
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [{ type: "resource" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "localizedSeo",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Criterion Number",
      name: "criterionAsc",
      by: [{ field: "criterionNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      criterion: "criterionNumber",
      title: "title.en",
      level: "level",
      impact: "impact",
    },
    prepare({ criterion, title, level, impact }) {
      return {
        title: `${criterion} — ${title || "Untitled"}`,
        subtitle: `Level ${level} | ${impact}`,
      };
    },
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add wcagRule document schema"
```

---

## Task 4: Sanity guide Document Schema

**Files:**

- Create: `apps/studio/schemaTypes/documents/guide.ts`

- [ ] **Step 1: Create guide schema**

Create `apps/studio/schemaTypes/documents/guide.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const guide = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "SEO", value: "seo" },
          { title: "GEO", value: "geo" },
          { title: "AEO", value: "aeo" },
          { title: "Technique", value: "technique" },
          { title: "Best Practice", value: "best-practice" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "relatedWcagRules",
      title: "Related WCAG Rules",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "wcagRule" }],
        },
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedPortableText",
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [{ type: "resource" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "localizedSeo",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title: title || "Untitled",
        subtitle: category?.toUpperCase(),
      };
    },
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add guide document schema"
```

---

## Task 5: Sanity Schema Index & Desk Structure

**Files:**

- Modify: `apps/studio/schemaTypes/index.ts`
- Create: `apps/studio/deskStructure.ts`
- Modify: `apps/studio/sanity.config.ts`

- [ ] **Step 1: Update schema index**

Replace `apps/studio/schemaTypes/index.ts`:

```typescript
import { localizedString } from "./objects/localizedString";
import { localizedText } from "./objects/localizedText";
import { localizedPortableText } from "./objects/localizedPortableText";
import { localizedSeo } from "./objects/localizedSeo";
import { resource } from "./objects/resource";
import { wcagRule } from "./documents/wcagRule";
import { guide } from "./documents/guide";

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedPortableText,
  localizedSeo,
  resource,
  // Documents
  wcagRule,
  guide,
];
```

- [ ] **Step 2: Create desk structure**

Create `apps/studio/deskStructure.ts`:

```typescript
import type { StructureBuilder } from "sanity/desk";

const PRINCIPLES = [
  {
    id: "perceivable",
    title: "Perceivable",
    guidelines: ["1.1", "1.2", "1.3", "1.4"],
  },
  {
    id: "operable",
    title: "Operable",
    guidelines: ["2.1", "2.2", "2.3", "2.4", "2.5"],
  },
  {
    id: "understandable",
    title: "Understandable",
    guidelines: ["3.1", "3.2", "3.3"],
  },
  { id: "robust", title: "Robust", guidelines: ["4.1"] },
];

const GUIDELINE_NAMES: Record<string, string> = {
  "1.1": "1.1 Text Alternatives",
  "1.2": "1.2 Time-based Media",
  "1.3": "1.3 Adaptable",
  "1.4": "1.4 Distinguishable",
  "2.1": "2.1 Keyboard Accessible",
  "2.2": "2.2 Enough Time",
  "2.3": "2.3 Seizures and Physical Reactions",
  "2.4": "2.4 Navigable",
  "2.5": "2.5 Input Modalities",
  "3.1": "3.1 Readable",
  "3.2": "3.2 Predictable",
  "3.3": "3.3 Input Assistance",
  "4.1": "4.1 Compatible",
};

const GUIDE_CATEGORIES = [
  { id: "seo", title: "SEO" },
  { id: "geo", title: "GEO" },
  { id: "aeo", title: "AEO" },
  { id: "technique", title: "Techniques" },
  { id: "best-practice", title: "Best Practices" },
];

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Knowledge Base")
    .items([
      S.listItem()
        .title("WCAG Rules")
        .child(
          S.list()
            .title("WCAG Rules by Principle")
            .items(
              PRINCIPLES.map((principle) =>
                S.listItem()
                  .title(principle.title)
                  .child(
                    S.list()
                      .title(principle.title)
                      .items(
                        principle.guidelines.map((gl) =>
                          S.listItem()
                            .title(GUIDELINE_NAMES[gl] || gl)
                            .child(
                              S.documentList()
                                .title(GUIDELINE_NAMES[gl] || gl)
                                .filter(
                                  '_type == "wcagRule" && criterionNumber match $prefix',
                                )
                                .params({ prefix: `${gl}.*` })
                                .defaultOrdering([
                                  {
                                    field: "criterionNumber",
                                    direction: "asc",
                                  },
                                ]),
                            ),
                        ),
                      ),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Guides")
        .child(
          S.list()
            .title("Guides by Category")
            .items(
              GUIDE_CATEGORIES.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .child(
                    S.documentList()
                      .title(cat.title)
                      .filter('_type == "guide" && category == $category')
                      .params({ category: cat.id }),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("All WCAG Rules")
        .child(
          S.documentList()
            .title("All WCAG Rules")
            .filter('_type == "wcagRule"')
            .defaultOrdering([{ field: "criterionNumber", direction: "asc" }]),
        ),
      S.listItem()
        .title("All Guides")
        .child(S.documentList().title("All Guides").filter('_type == "guide"')),
    ]);
```

- [ ] **Step 3: Update sanity.config.ts**

Replace `apps/studio/sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { deskTool as structureTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

export default defineConfig({
  name: "default",
  title: "inculva Knowledge Base",
  projectId: "0w6yrm5e",
  dataset: "production",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
});
```

- [ ] **Step 4: Verify Studio loads**

```bash
cd apps/studio && npx sanity dev
# Should load with Knowledge Base desk structure
# Navigate: WCAG Rules → Perceivable → 1.1 Text Alternatives (empty)
# Navigate: Guides → SEO (empty)
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire up KB schemas with custom desk structure"
```

---

## Task 6: Sanity Client Queries for KB

**Files:**

- Modify: `apps/landing/src/lib/sanity.ts`

- [ ] **Step 1: Rewrite sanity.ts with KB queries**

Replace `apps/landing/src/lib/sanity.ts`:

```typescript
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || "0w6yrm5e",
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// --- Types ---

export interface WcagRule {
  _id: string;
  criterionNumber: string;
  level: "A" | "AA" | "AAA";
  principle: "perceivable" | "operable" | "understandable" | "robust";
  introducedIn: string;
  wcagVersions: string[];
  impact: "critical" | "serious" | "moderate" | "minor";
  axeRuleIds: string[];
  tags: string[];
  title: { en: string; tr: string };
  slug: { current: string };
  description: { en: string; tr: string };
  content: { en: any[]; tr: any[] };
  resources: Resource[];
  seo: {
    en: { metaTitle: string; metaDescription: string };
    tr: { metaTitle: string; metaDescription: string };
  };
  publishedAt: string;
}

export interface Guide {
  _id: string;
  category: "seo" | "geo" | "aeo" | "technique" | "best-practice";
  relatedWcagRules: WcagRule[];
  title: { en: string; tr: string };
  slug: { current: string };
  description: { en: string; tr: string };
  content: { en: any[]; tr: any[] };
  resources: Resource[];
  seo: {
    en: { metaTitle: string; metaDescription: string };
    tr: { metaTitle: string; metaDescription: string };
  };
  publishedAt: string;
}

export interface Resource {
  title: string;
  url: string;
  source: string;
  language: string;
}

// --- WCAG Rule Queries ---

export async function getAllWcagRules(): Promise<WcagRule[]> {
  try {
    return await client.fetch(
      `*[_type == "wcagRule"] | order(criterionNumber asc) {
        _id,
        criterionNumber,
        level,
        principle,
        introducedIn,
        wcagVersions,
        impact,
        axeRuleIds,
        tags,
        title,
        slug,
        description,
        publishedAt
      }`,
    );
  } catch {
    return [];
  }
}

export async function getWcagRuleBySlug(
  slug: string,
): Promise<WcagRule | null> {
  try {
    return await client.fetch(
      `*[_type == "wcagRule" && slug.current == $slug][0] {
        _id,
        criterionNumber,
        level,
        principle,
        introducedIn,
        wcagVersions,
        impact,
        axeRuleIds,
        tags,
        title,
        slug,
        description,
        content,
        resources,
        seo,
        publishedAt
      }`,
      { slug },
    );
  } catch {
    return null;
  }
}

// --- Guide Queries ---

export async function getAllGuides(): Promise<Guide[]> {
  try {
    return await client.fetch(
      `*[_type == "guide"] | order(publishedAt desc) {
        _id,
        category,
        title,
        slug,
        description,
        publishedAt
      }`,
    );
  } catch {
    return [];
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    return await client.fetch(
      `*[_type == "guide" && slug.current == $slug][0] {
        _id,
        category,
        relatedWcagRules[]-> {
          _id,
          criterionNumber,
          level,
          title,
          slug
        },
        title,
        slug,
        description,
        content,
        resources,
        seo,
        publishedAt
      }`,
      { slug },
    );
  } catch {
    return null;
  }
}

// --- Axe Rule Mapping ---

export async function getAxeRuleMapping(): Promise<Record<string, string>> {
  try {
    const rules = await client.fetch(
      `*[_type == "wcagRule" && defined(axeRuleIds)] {
        axeRuleIds,
        "slug": slug.current
      }`,
    );
    const mapping: Record<string, string> = {};
    for (const rule of rules) {
      for (const axeId of rule.axeRuleIds || []) {
        mapping[axeId] = rule.slug;
      }
    }
    return mapping;
  } catch {
    return {};
  }
}

export default client;
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: rewrite sanity client with KB queries and types"
```

---

## Task 7: Portable Text Renderer

**Files:**

- Create: `apps/landing/src/lib/portable-text.ts`

- [ ] **Step 1: Create Portable Text to HTML utility**

Create `apps/landing/src/lib/portable-text.ts`:

```typescript
interface Block {
  _type: string;
  _key?: string;
  style?: string;
  children?: Span[];
  listItem?: string;
  level?: number;
  markDefs?: MarkDef[];
  asset?: { url: string };
  alt?: string;
  code?: string;
  language?: string;
}

interface Span {
  _type: string;
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSpan(span: Span, markDefs: MarkDef[] = []): string {
  let html = escapeHtml(span.text);

  for (const mark of span.marks || []) {
    const def = markDefs.find((d) => d._key === mark);
    if (def?._type === "link" && def.href) {
      html = `<a href="${escapeHtml(
        def.href,
      )}" rel="noopener noreferrer">${html}</a>`;
    } else if (mark === "strong") {
      html = `<strong>${html}</strong>`;
    } else if (mark === "em") {
      html = `<em>${html}</em>`;
    } else if (mark === "code") {
      html = `<code>${html}</code>`;
    } else if (mark === "underline") {
      html = `<u>${html}</u>`;
    }
  }

  return html;
}

function renderBlock(block: Block): string {
  if (block._type === "image") {
    const alt = block.alt ? escapeHtml(block.alt) : "";
    const url = block.asset?.url || "";
    return `<figure><img src="${url}" alt="${alt}" loading="lazy" />${
      alt ? `<figcaption>${alt}</figcaption>` : ""
    }</figure>`;
  }

  if (block._type === "code") {
    const lang = block.language || "";
    const code = escapeHtml(block.code || "");
    return `<pre><code class="language-${lang}">${code}</code></pre>`;
  }

  if (block._type !== "block") return "";

  const children = (block.children || [])
    .map((span) => renderSpan(span, block.markDefs))
    .join("");

  switch (block.style) {
    case "h2":
      return `<h2>${children}</h2>`;
    case "h3":
      return `<h3>${children}</h3>`;
    case "h4":
      return `<h4>${children}</h4>`;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    default:
      return `<p>${children}</p>`;
  }
}

export function portableTextToHtml(blocks: Block[]): string {
  if (!blocks || blocks.length === 0) return "";

  const result: string[] = [];
  let currentList: string | null = null;
  let listItems: string[] = [];

  for (const block of blocks) {
    if (block.listItem) {
      if (currentList !== block.listItem) {
        if (currentList) {
          const tag = currentList === "number" ? "ol" : "ul";
          result.push(`<${tag}>${listItems.join("")}</${tag}>`);
          listItems = [];
        }
        currentList = block.listItem;
      }
      const children = (block.children || [])
        .map((span) => renderSpan(span, block.markDefs))
        .join("");
      listItems.push(`<li>${children}</li>`);
    } else {
      if (currentList) {
        const tag = currentList === "number" ? "ol" : "ul";
        result.push(`<${tag}>${listItems.join("")}</${tag}>`);
        listItems = [];
        currentList = null;
      }
      result.push(renderBlock(block));
    }
  }

  if (currentList) {
    const tag = currentList === "number" ? "ol" : "ul";
    result.push(`<${tag}>${listItems.join("")}</${tag}>`);
  }

  return result.join("\n");
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Portable Text to HTML renderer"
```

---

## Task 8: KB Layout and Shared Components

**Files:**

- Create: `apps/landing/src/components/kb/KBLayout.astro`
- Create: `apps/landing/src/components/kb/Breadcrumbs.astro`
- Create: `apps/landing/src/components/kb/RuleBadges.astro`
- Create: `apps/landing/src/components/kb/KBCard.astro`
- Create: `apps/landing/src/components/kb/ResourceList.astro`
- Create: `apps/landing/src/components/kb/RelatedRules.astro`
- Create: `apps/landing/src/components/kb/FAQSection.astro`
- Create: `apps/landing/src/components/kb/TableOfContents.astro`

- [ ] **Step 1: Create KBLayout**

Create `apps/landing/src/components/kb/KBLayout.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro'
import Breadcrumbs from './Breadcrumbs.astro'

interface Props {
  title: string
  description: string
  lang: 'en' | 'tr'
  breadcrumbs: { label: string; href: string }[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  jsonLd?: Record<string, any>
  hreflang?: { en: string; tr: string }
}

const { title, description, lang, breadcrumbs, seo, jsonLd, hreflang } = Astro.props
const metaTitle = seo?.metaTitle || title
const metaDescription = seo?.metaDescription || description
---

<BaseLayout title={metaTitle} description={metaDescription} lang={lang}>
  {hreflang && (
    <link rel="alternate" hreflang="en" href={hreflang.en} slot="head" />
    <link rel="alternate" hreflang="tr" href={hreflang.tr} slot="head" />
    <link rel="alternate" hreflang="x-default" href={hreflang.en} slot="head" />
  )}
  {jsonLd && (
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} slot="head" />
  )}

  <main id="main-content" class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbs} lang={lang} />
      <slot />
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Create Breadcrumbs**

Create `apps/landing/src/components/kb/Breadcrumbs.astro`:

```astro
---
interface Props {
  items: { label: string; href: string }[]
  lang: 'en' | 'tr'
}

const { items, lang } = Astro.props
const homeLabel = lang === 'tr' ? 'Ana Sayfa' : 'Home'
const allItems = [{ label: homeLabel, href: lang === 'tr' ? '/tr/' : '/' }, ...items]
---

<nav aria-label={lang === 'tr' ? 'İçerik haritası' : 'Breadcrumb'} class="mb-6">
  <ol class="flex flex-wrap items-center gap-1 text-sm text-gray-500" itemscope itemtype="https://schema.org/BreadcrumbList">
    {allItems.map((item, index) => (
      <li class="flex items-center" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        {index > 0 && <span class="mx-1" aria-hidden="true">/</span>}
        {index === allItems.length - 1 ? (
          <span itemprop="name" class="text-gray-900 font-medium">{item.label}</span>
        ) : (
          <a href={item.href} itemprop="item" class="hover:text-primary-600 transition-colors">
            <span itemprop="name">{item.label}</span>
          </a>
        )}
        <meta itemprop="position" content={String(index + 1)} />
      </li>
    ))}
  </ol>
</nav>
```

- [ ] **Step 3: Create RuleBadges**

Create `apps/landing/src/components/kb/RuleBadges.astro`:

```astro
---
interface Props {
  level?: string
  wcagVersions?: string[]
  impact?: string
  introducedIn?: string
}

const { level, wcagVersions, impact, introducedIn } = Astro.props

const levelColors: Record<string, string> = {
  A: 'bg-green-100 text-green-800',
  AA: 'bg-blue-100 text-blue-800',
  AAA: 'bg-purple-100 text-purple-800',
}

const impactColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-800',
  serious: 'bg-orange-100 text-orange-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  minor: 'bg-gray-100 text-gray-800',
}
---

<div class="flex flex-wrap gap-2">
  {level && (
    <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[level] || 'bg-gray-100 text-gray-800'}`}>
      Level {level}
    </span>
  )}
  {impact && (
    <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${impactColors[impact] || 'bg-gray-100 text-gray-800'}`}>
      {impact.charAt(0).toUpperCase() + impact.slice(1)}
    </span>
  )}
  {wcagVersions?.map((v) => (
    <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${v === introducedIn ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}>
      WCAG {v}{v === introducedIn ? ' (new)' : ''}
    </span>
  ))}
</div>
```

- [ ] **Step 4: Create KBCard**

Create `apps/landing/src/components/kb/KBCard.astro`:

```astro
---
import RuleBadges from './RuleBadges.astro'

interface Props {
  href: string
  criterionNumber?: string
  title: string
  description: string
  level?: string
  wcagVersions?: string[]
  impact?: string
  introducedIn?: string
  category?: string
}

const { href, criterionNumber, title, description, level, wcagVersions, impact, introducedIn, category } = Astro.props

const categoryLabels: Record<string, string> = {
  seo: 'SEO',
  geo: 'GEO',
  aeo: 'AEO',
  technique: 'Technique',
  'best-practice': 'Best Practice',
}
---

<a href={href} class="block group rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200">
  <div class="flex items-start justify-between mb-3">
    <div>
      {criterionNumber && (
        <span class="text-sm font-mono text-primary-600 font-semibold">{criterionNumber}</span>
      )}
      {category && (
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">{categoryLabels[category] || category}</span>
      )}
    </div>
  </div>

  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
    {title}
  </h3>

  <p class="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>

  {(level || wcagVersions || impact) && (
    <RuleBadges level={level} wcagVersions={wcagVersions} impact={impact} introducedIn={introducedIn} />
  )}
</a>
```

- [ ] **Step 5: Create ResourceList**

Create `apps/landing/src/components/kb/ResourceList.astro`:

```astro
---
interface Resource {
  title: string
  url: string
  source: string
  language: string
}

interface Props {
  resources: Resource[]
  lang: 'en' | 'tr'
}

const { resources, lang } = Astro.props
const heading = lang === 'tr' ? 'Kaynaklar' : 'Resources'

const sourceLabels: Record<string, string> = {
  'w3c-spec': 'W3C',
  'w3c-understanding': 'W3C',
  'w3c-techniques': 'W3C',
  'w3c-wai': 'W3C WAI',
  deque: 'Deque University',
  webaim: 'WebAIM',
  mdn: 'MDN',
  'a11y-project': 'A11Y Project',
  'act-rules': 'ACT Rules',
  'axe-core': 'Axe-core',
  other: '',
}
---

{resources && resources.length > 0 && (
  <section aria-labelledby="resources-heading" class="mt-12 pt-8 border-t border-gray-200">
    <h2 id="resources-heading" class="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
    <ul class="space-y-3">
      {resources.map((r) => (
        <li class="flex items-start gap-2">
          <span class="text-primary-500 mt-1" aria-hidden="true">→</span>
          <div>
            <a href={r.url} target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800 font-medium hover:underline">
              {r.title}
            </a>
            {sourceLabels[r.source] && (
              <span class="text-sm text-gray-500 ml-2">— {sourceLabels[r.source]}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
)}
```

- [ ] **Step 6: Create RelatedRules**

Create `apps/landing/src/components/kb/RelatedRules.astro`:

```astro
---
interface RelatedRule {
  criterionNumber: string
  level: string
  title: { en: string; tr: string }
  slug: { current: string }
}

interface Props {
  rules: RelatedRule[]
  lang: 'en' | 'tr'
}

const { rules, lang } = Astro.props
const heading = lang === 'tr' ? 'İlgili WCAG Kuralları' : 'Related WCAG Rules'
const prefix = lang === 'tr' ? '/tr' : ''
---

{rules && rules.length > 0 && (
  <div class="bg-gray-50 rounded-xl p-6">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">{heading}</h3>
    <ul class="space-y-2">
      {rules.map((rule) => (
        <li>
          <a href={`${prefix}/kb/wcag/${rule.slug.current}/`} class="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-600 transition-colors">
            <span class="font-mono text-xs text-primary-600">{rule.criterionNumber}</span>
            <span class="line-clamp-1">{rule.title[lang]}</span>
            <span class="text-xs text-gray-400 ml-auto">{rule.level}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

- [ ] **Step 7: Create FAQSection**

Create `apps/landing/src/components/kb/FAQSection.astro`:

```astro
---
interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
  lang: 'en' | 'tr'
}

const { faqs, lang } = Astro.props
const heading = lang === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'
---

{faqs && faqs.length > 0 && (
  <section aria-labelledby="faq-heading" class="mt-12 pt-8 border-t border-gray-200">
    <h2 id="faq-heading" class="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>
    <div class="space-y-4">
      {faqs.map((faq) => (
        <details class="group border border-gray-200 rounded-lg">
          <summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
            {faq.question}
            <span class="ml-2 text-gray-400 group-open:rotate-180 transition-transform" aria-hidden="true">▼</span>
          </summary>
          <div class="px-4 pb-4 text-gray-600">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 8: Create TableOfContents**

Create `apps/landing/src/components/kb/TableOfContents.astro`:

```astro
---
interface TocItem {
  id: string
  text: string
  level: number
}

interface Props {
  items: TocItem[]
  lang: 'en' | 'tr'
}

const { items, lang } = Astro.props
const heading = lang === 'tr' ? 'İçindekiler' : 'Table of Contents'
---

{items && items.length > 0 && (
  <nav aria-labelledby="toc-heading" class="bg-gray-50 rounded-xl p-6 sticky top-24">
    <h3 id="toc-heading" class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">{heading}</h3>
    <ul class="space-y-2">
      {items.map((item) => (
        <li style={`padding-left: ${(item.level - 2) * 0.75}rem`}>
          <a href={`#${item.id}`} class="text-sm text-gray-600 hover:text-primary-600 transition-colors line-clamp-2">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add KB layout and shared components"
```

---

## Task 9: KB Listing Pages (EN)

**Files:**

- Create: `apps/landing/src/pages/kb/index.astro`
- Create: `apps/landing/src/pages/kb/wcag/index.astro`
- Create: `apps/landing/src/pages/kb/guides/index.astro`

- [ ] **Step 1: Create KB landing page**

Create `apps/landing/src/pages/kb/index.astro`:

```astro
---
import KBLayout from '../../components/kb/KBLayout.astro'
import KBCard from '../../components/kb/KBCard.astro'
import { getAllWcagRules, getAllGuides } from '../../lib/sanity'

const rules = await getAllWcagRules()
const guides = await getAllGuides()

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'inculva Accessibility Knowledge Base',
  description: 'Comprehensive accessibility knowledge base covering all WCAG 2.0, 2.1, and 2.2 success criteria with practical testing and remediation guidance.',
  url: 'https://inculva.com/kb/',
}
---

<KBLayout
  title="Accessibility Knowledge Base | inculva"
  description="Comprehensive accessibility knowledge base covering all WCAG 2.0, 2.1, and 2.2 success criteria with practical testing and remediation guidance."
  lang="en"
  breadcrumbs={[{ label: 'Knowledge Base', href: '/kb/' }]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/', tr: 'https://inculva.com/tr/kb/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Accessibility Knowledge Base</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      Comprehensive guides and references for WCAG 2.0, 2.1, and 2.2 success criteria.
      Each article covers what the rule means, why it matters, how to test, and how to fix violations.
    </p>
  </div>

  <section aria-labelledby="wcag-heading" class="mb-16">
    <div class="flex items-center justify-between mb-6">
      <h2 id="wcag-heading" class="text-2xl font-bold text-gray-900">WCAG Rules</h2>
      <a href="/kb/wcag/" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
        View all {rules.length} rules →
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rules.slice(0, 6).map((rule) => (
        <KBCard
          href={`/kb/wcag/${rule.slug.current}/`}
          criterionNumber={rule.criterionNumber}
          title={rule.title.en}
          description={rule.description?.en || ''}
          level={rule.level}
          wcagVersions={rule.wcagVersions}
          impact={rule.impact}
          introducedIn={rule.introducedIn}
        />
      ))}
    </div>
  </section>

  {guides.length > 0 && (
    <section aria-labelledby="guides-heading">
      <div class="flex items-center justify-between mb-6">
        <h2 id="guides-heading" class="text-2xl font-bold text-gray-900">Guides</h2>
        <a href="/kb/guides/" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
          View all guides →
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.slice(0, 6).map((guide) => (
          <KBCard
            href={`/kb/guides/${guide.slug.current}/`}
            title={guide.title.en}
            description={guide.description?.en || ''}
            category={guide.category}
          />
        ))}
      </div>
    </section>
  )}
</KBLayout>
```

- [ ] **Step 2: Create WCAG rules listing page**

Create `apps/landing/src/pages/kb/wcag/index.astro`:

```astro
---
import KBLayout from '../../../components/kb/KBLayout.astro'
import KBCard from '../../../components/kb/KBCard.astro'
import { getAllWcagRules } from '../../../lib/sanity'

const rules = await getAllWcagRules()

const principleNames: Record<string, string> = {
  perceivable: 'Perceivable',
  operable: 'Operable',
  understandable: 'Understandable',
  robust: 'Robust',
}

const grouped = rules.reduce((acc, rule) => {
  const p = rule.principle
  if (!acc[p]) acc[p] = []
  acc[p].push(rule)
  return acc
}, {} as Record<string, typeof rules>)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'WCAG Success Criteria Reference',
  description: 'Complete reference for all WCAG 2.0, 2.1, and 2.2 success criteria with testing and remediation guidance.',
  url: 'https://inculva.com/kb/wcag/',
}
---

<KBLayout
  title="WCAG Success Criteria Reference | inculva"
  description="Complete reference for all WCAG 2.0, 2.1, and 2.2 success criteria with testing and remediation guidance."
  lang="en"
  breadcrumbs={[
    { label: 'Knowledge Base', href: '/kb/' },
    { label: 'WCAG Rules', href: '/kb/wcag/' },
  ]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/wcag/', tr: 'https://inculva.com/tr/kb/wcag/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">WCAG Success Criteria</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      All {rules.length} WCAG success criteria across versions 2.0, 2.1, and 2.2.
      Organized by the four principles of accessibility.
    </p>
  </div>

  {(['perceivable', 'operable', 'understandable', 'robust'] as const).map((principle) => (
    grouped[principle] && grouped[principle].length > 0 && (
      <section aria-labelledby={`${principle}-heading`} class="mb-16">
        <h2 id={`${principle}-heading`} class="text-2xl font-bold text-gray-900 mb-6">
          {principleNames[principle]}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped[principle].map((rule) => (
            <KBCard
              href={`/kb/wcag/${rule.slug.current}/`}
              criterionNumber={rule.criterionNumber}
              title={rule.title.en}
              description={rule.description?.en || ''}
              level={rule.level}
              wcagVersions={rule.wcagVersions}
              impact={rule.impact}
              introducedIn={rule.introducedIn}
            />
          ))}
        </div>
      </section>
    )
  ))}
</KBLayout>
```

- [ ] **Step 3: Create guides listing page**

Create `apps/landing/src/pages/kb/guides/index.astro`:

```astro
---
import KBLayout from '../../../components/kb/KBLayout.astro'
import KBCard from '../../../components/kb/KBCard.astro'
import { getAllGuides } from '../../../lib/sanity'

const guides = await getAllGuides()

const categoryNames: Record<string, string> = {
  seo: 'SEO',
  geo: 'GEO',
  aeo: 'AEO',
  technique: 'Techniques',
  'best-practice': 'Best Practices',
}

const grouped = guides.reduce((acc, guide) => {
  const c = guide.category
  if (!acc[c]) acc[c] = []
  acc[c].push(guide)
  return acc
}, {} as Record<string, typeof guides>)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Accessibility Guides',
  description: 'Expert guides on SEO, GEO, AEO, and accessibility best practices.',
  url: 'https://inculva.com/kb/guides/',
}
---

<KBLayout
  title="Accessibility Guides | inculva"
  description="Expert guides on SEO, GEO, AEO, and accessibility best practices."
  lang="en"
  breadcrumbs={[
    { label: 'Knowledge Base', href: '/kb/' },
    { label: 'Guides', href: '/kb/guides/' },
  ]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/guides/', tr: 'https://inculva.com/tr/kb/guides/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Guides</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      Expert guides on accessibility, SEO, and optimization best practices.
    </p>
  </div>

  {Object.entries(grouped).map(([category, categoryGuides]) => (
    <section aria-labelledby={`${category}-heading`} class="mb-16">
      <h2 id={`${category}-heading`} class="text-2xl font-bold text-gray-900 mb-6">
        {categoryNames[category] || category}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryGuides.map((guide) => (
          <KBCard
            href={`/kb/guides/${guide.slug.current}/`}
            title={guide.title.en}
            description={guide.description?.en || ''}
            category={guide.category}
          />
        ))}
      </div>
    </section>
  ))}
</KBLayout>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add KB listing pages (EN)"
```

---

## Task 10: WCAG Rule Detail Page (EN)

**Files:**

- Create: `apps/landing/src/pages/kb/wcag/[slug].astro`

- [ ] **Step 1: Create WCAG rule detail page**

Create `apps/landing/src/pages/kb/wcag/[slug].astro`:

```astro
---
import KBLayout from '../../../components/kb/KBLayout.astro'
import RuleBadges from '../../../components/kb/RuleBadges.astro'
import ResourceList from '../../../components/kb/ResourceList.astro'
import { getAllWcagRules, getWcagRuleBySlug } from '../../../lib/sanity'
import { portableTextToHtml } from '../../../lib/portable-text'

export async function getStaticPaths() {
  const rules = await getAllWcagRules()
  return rules.map((rule) => ({
    params: { slug: rule.slug.current },
  }))
}

const { slug } = Astro.params
const rule = await getWcagRuleBySlug(slug!)

if (!rule) {
  return Astro.redirect('/kb/wcag/')
}

const contentHtml = rule.content?.en ? portableTextToHtml(rule.content.en) : ''

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: `WCAG ${rule.criterionNumber}: ${rule.title.en}`,
  description: rule.description?.en || '',
  url: `https://inculva.com/kb/wcag/${rule.slug.current}/`,
  datePublished: rule.publishedAt,
  publisher: {
    '@type': 'Organization',
    name: 'inculva',
    url: 'https://inculva.com',
  },
  about: {
    '@type': 'Thing',
    name: 'Web Content Accessibility Guidelines (WCAG)',
  },
  proficiencyLevel: 'Beginner',
  inLanguage: 'en',
}

const principleNames: Record<string, string> = {
  perceivable: 'Perceivable',
  operable: 'Operable',
  understandable: 'Understandable',
  robust: 'Robust',
}
---

<KBLayout
  title={rule.seo?.en?.metaTitle || `WCAG ${rule.criterionNumber}: ${rule.title.en} | inculva`}
  description={rule.seo?.en?.metaDescription || rule.description?.en || ''}
  lang="en"
  breadcrumbs={[
    { label: 'Knowledge Base', href: '/kb/' },
    { label: 'WCAG Rules', href: '/kb/wcag/' },
    { label: `${rule.criterionNumber} ${rule.title.en}`, href: `/kb/wcag/${rule.slug.current}/` },
  ]}
  jsonLd={jsonLd}
  hreflang={{
    en: `https://inculva.com/kb/wcag/${rule.slug.current}/`,
    tr: `https://inculva.com/tr/kb/wcag/${rule.slug.current}/`,
  }}
>
  <article class="max-w-4xl">
    <header class="mb-8">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>{principleNames[rule.principle]}</span>
        <span aria-hidden="true">•</span>
        <span>WCAG {rule.criterionNumber}</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {rule.criterionNumber} {rule.title.en}
      </h1>
      {rule.description?.en && (
        <p class="text-xl text-gray-600 mb-6">{rule.description.en}</p>
      )}
      <RuleBadges
        level={rule.level}
        wcagVersions={rule.wcagVersions}
        impact={rule.impact}
        introducedIn={rule.introducedIn}
      />
      {rule.axeRuleIds && rule.axeRuleIds.length > 0 && (
        <div class="mt-4 flex flex-wrap gap-2">
          {rule.axeRuleIds.map((id) => (
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-700">
              {id}
            </span>
          ))}
        </div>
      )}
    </header>

    <div class="prose prose-lg prose-gray max-w-none" set:html={contentHtml} />

    <ResourceList resources={rule.resources || []} lang="en" />
  </article>
</KBLayout>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add WCAG rule detail page (EN)"
```

---

## Task 11: Guide Detail Page (EN)

**Files:**

- Create: `apps/landing/src/pages/kb/guides/[slug].astro`

- [ ] **Step 1: Create guide detail page**

Create `apps/landing/src/pages/kb/guides/[slug].astro`:

```astro
---
import KBLayout from '../../../components/kb/KBLayout.astro'
import ResourceList from '../../../components/kb/ResourceList.astro'
import RelatedRules from '../../../components/kb/RelatedRules.astro'
import { getAllGuides, getGuideBySlug } from '../../../lib/sanity'
import { portableTextToHtml } from '../../../lib/portable-text'

export async function getStaticPaths() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({
    params: { slug: guide.slug.current },
  }))
}

const { slug } = Astro.params
const guide = await getGuideBySlug(slug!)

if (!guide) {
  return Astro.redirect('/kb/guides/')
}

const contentHtml = guide.content?.en ? portableTextToHtml(guide.content.en) : ''

const categoryNames: Record<string, string> = {
  seo: 'SEO',
  geo: 'GEO',
  aeo: 'AEO',
  technique: 'Technique',
  'best-practice': 'Best Practice',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: guide.title.en,
  description: guide.description?.en || '',
  url: `https://inculva.com/kb/guides/${guide.slug.current}/`,
  datePublished: guide.publishedAt,
  publisher: {
    '@type': 'Organization',
    name: 'inculva',
    url: 'https://inculva.com',
  },
  inLanguage: 'en',
}
---

<KBLayout
  title={guide.seo?.en?.metaTitle || `${guide.title.en} | inculva`}
  description={guide.seo?.en?.metaDescription || guide.description?.en || ''}
  lang="en"
  breadcrumbs={[
    { label: 'Knowledge Base', href: '/kb/' },
    { label: 'Guides', href: '/kb/guides/' },
    { label: guide.title.en, href: `/kb/guides/${guide.slug.current}/` },
  ]}
  jsonLd={jsonLd}
  hreflang={{
    en: `https://inculva.com/kb/guides/${guide.slug.current}/`,
    tr: `https://inculva.com/tr/kb/guides/${guide.slug.current}/`,
  }}
>
  <div class="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
    <article class="max-w-4xl">
      <header class="mb-8">
        <span class="text-sm font-medium text-primary-600 uppercase tracking-wide">
          {categoryNames[guide.category] || guide.category}
        </span>
        <h1 class="text-4xl font-bold text-gray-900 mt-2 mb-4">{guide.title.en}</h1>
        {guide.description?.en && (
          <p class="text-xl text-gray-600">{guide.description.en}</p>
        )}
      </header>

      <div class="prose prose-lg prose-gray max-w-none" set:html={contentHtml} />

      <ResourceList resources={guide.resources || []} lang="en" />
    </article>

    <aside class="hidden lg:block">
      <RelatedRules rules={guide.relatedWcagRules || []} lang="en" />
    </aside>
  </div>
</KBLayout>
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add guide detail page (EN)"
```

---

## Task 12: Turkish (TR) KB Pages

**Files:**

- Create: `apps/landing/src/pages/tr/kb/index.astro`
- Create: `apps/landing/src/pages/tr/kb/wcag/index.astro`
- Create: `apps/landing/src/pages/tr/kb/wcag/[slug].astro`
- Create: `apps/landing/src/pages/tr/kb/guides/index.astro`
- Create: `apps/landing/src/pages/tr/kb/guides/[slug].astro`

- [ ] **Step 1: Create TR KB landing page**

Create `apps/landing/src/pages/tr/kb/index.astro`:

```astro
---
import KBLayout from '../../../components/kb/KBLayout.astro'
import KBCard from '../../../components/kb/KBCard.astro'
import { getAllWcagRules, getAllGuides } from '../../../lib/sanity'

const rules = await getAllWcagRules()
const guides = await getAllGuides()

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'inculva Erişilebilirlik Bilgi Bankası',
  description: 'WCAG 2.0, 2.1 ve 2.2 başarı kriterlerini kapsayan kapsamlı erişilebilirlik bilgi bankası.',
  url: 'https://inculva.com/tr/kb/',
  inLanguage: 'tr',
}
---

<KBLayout
  title="Erişilebilirlik Bilgi Bankası | inculva"
  description="WCAG 2.0, 2.1 ve 2.2 başarı kriterlerini kapsayan kapsamlı erişilebilirlik bilgi bankası."
  lang="tr"
  breadcrumbs={[{ label: 'Bilgi Bankası', href: '/tr/kb/' }]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/', tr: 'https://inculva.com/tr/kb/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Erişilebilirlik Bilgi Bankası</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      WCAG 2.0, 2.1 ve 2.2 başarı kriterleri için kapsamlı kılavuzlar ve referanslar.
      Her makale kuralın ne anlama geldiğini, neden önemli olduğunu, nasıl test edileceğini ve ihlallerin nasıl düzeltileceğini kapsar.
    </p>
  </div>

  <section aria-labelledby="wcag-heading" class="mb-16">
    <div class="flex items-center justify-between mb-6">
      <h2 id="wcag-heading" class="text-2xl font-bold text-gray-900">WCAG Kuralları</h2>
      <a href="/tr/kb/wcag/" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
        Tüm {rules.length} kuralı gör →
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rules.slice(0, 6).map((rule) => (
        <KBCard
          href={`/tr/kb/wcag/${rule.slug.current}/`}
          criterionNumber={rule.criterionNumber}
          title={rule.title.tr || rule.title.en}
          description={rule.description?.tr || rule.description?.en || ''}
          level={rule.level}
          wcagVersions={rule.wcagVersions}
          impact={rule.impact}
          introducedIn={rule.introducedIn}
        />
      ))}
    </div>
  </section>

  {guides.length > 0 && (
    <section aria-labelledby="guides-heading">
      <div class="flex items-center justify-between mb-6">
        <h2 id="guides-heading" class="text-2xl font-bold text-gray-900">Kılavuzlar</h2>
        <a href="/tr/kb/guides/" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
          Tüm kılavuzları gör →
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.slice(0, 6).map((guide) => (
          <KBCard
            href={`/tr/kb/guides/${guide.slug.current}/`}
            title={guide.title.tr || guide.title.en}
            description={guide.description?.tr || guide.description?.en || ''}
            category={guide.category}
          />
        ))}
      </div>
    </section>
  )}
</KBLayout>
```

- [ ] **Step 2: Create TR WCAG rules listing page**

Create `apps/landing/src/pages/tr/kb/wcag/index.astro`:

```astro
---
import KBLayout from '../../../../components/kb/KBLayout.astro'
import KBCard from '../../../../components/kb/KBCard.astro'
import { getAllWcagRules } from '../../../../lib/sanity'

const rules = await getAllWcagRules()

const principleNames: Record<string, string> = {
  perceivable: 'Algılanabilir',
  operable: 'Çalıştırılabilir',
  understandable: 'Anlaşılabilir',
  robust: 'Sağlam',
}

const grouped = rules.reduce((acc, rule) => {
  const p = rule.principle
  if (!acc[p]) acc[p] = []
  acc[p].push(rule)
  return acc
}, {} as Record<string, typeof rules>)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'WCAG Başarı Kriterleri Referansı',
  description: 'Tüm WCAG 2.0, 2.1 ve 2.2 başarı kriterleri için eksiksiz referans.',
  url: 'https://inculva.com/tr/kb/wcag/',
  inLanguage: 'tr',
}
---

<KBLayout
  title="WCAG Başarı Kriterleri Referansı | inculva"
  description="Tüm WCAG 2.0, 2.1 ve 2.2 başarı kriterleri için eksiksiz referans."
  lang="tr"
  breadcrumbs={[
    { label: 'Bilgi Bankası', href: '/tr/kb/' },
    { label: 'WCAG Kuralları', href: '/tr/kb/wcag/' },
  ]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/wcag/', tr: 'https://inculva.com/tr/kb/wcag/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">WCAG Başarı Kriterleri</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      2.0, 2.1 ve 2.2 sürümlerindeki tüm {rules.length} WCAG başarı kriteri.
      Erişilebilirliğin dört ilkesine göre düzenlenmiştir.
    </p>
  </div>

  {(['perceivable', 'operable', 'understandable', 'robust'] as const).map((principle) => (
    grouped[principle] && grouped[principle].length > 0 && (
      <section aria-labelledby={`${principle}-heading`} class="mb-16">
        <h2 id={`${principle}-heading`} class="text-2xl font-bold text-gray-900 mb-6">
          {principleNames[principle]}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped[principle].map((rule) => (
            <KBCard
              href={`/tr/kb/wcag/${rule.slug.current}/`}
              criterionNumber={rule.criterionNumber}
              title={rule.title.tr || rule.title.en}
              description={rule.description?.tr || rule.description?.en || ''}
              level={rule.level}
              wcagVersions={rule.wcagVersions}
              impact={rule.impact}
              introducedIn={rule.introducedIn}
            />
          ))}
        </div>
      </section>
    )
  ))}
</KBLayout>
```

- [ ] **Step 3: Create TR WCAG rule detail page**

Create `apps/landing/src/pages/tr/kb/wcag/[slug].astro`:

```astro
---
import KBLayout from '../../../../components/kb/KBLayout.astro'
import RuleBadges from '../../../../components/kb/RuleBadges.astro'
import ResourceList from '../../../../components/kb/ResourceList.astro'
import { getAllWcagRules, getWcagRuleBySlug } from '../../../../lib/sanity'
import { portableTextToHtml } from '../../../../lib/portable-text'

export async function getStaticPaths() {
  const rules = await getAllWcagRules()
  return rules.map((rule) => ({
    params: { slug: rule.slug.current },
  }))
}

const { slug } = Astro.params
const rule = await getWcagRuleBySlug(slug!)

if (!rule) {
  return Astro.redirect('/tr/kb/wcag/')
}

const contentHtml = rule.content?.tr ? portableTextToHtml(rule.content.tr) : (rule.content?.en ? portableTextToHtml(rule.content.en) : '')

const principleNames: Record<string, string> = {
  perceivable: 'Algılanabilir',
  operable: 'Çalıştırılabilir',
  understandable: 'Anlaşılabilir',
  robust: 'Sağlam',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: `WCAG ${rule.criterionNumber}: ${rule.title.tr || rule.title.en}`,
  description: rule.description?.tr || rule.description?.en || '',
  url: `https://inculva.com/tr/kb/wcag/${rule.slug.current}/`,
  datePublished: rule.publishedAt,
  publisher: {
    '@type': 'Organization',
    name: 'inculva',
    url: 'https://inculva.com',
  },
  inLanguage: 'tr',
}
---

<KBLayout
  title={rule.seo?.tr?.metaTitle || `WCAG ${rule.criterionNumber}: ${rule.title.tr || rule.title.en} | inculva`}
  description={rule.seo?.tr?.metaDescription || rule.description?.tr || rule.description?.en || ''}
  lang="tr"
  breadcrumbs={[
    { label: 'Bilgi Bankası', href: '/tr/kb/' },
    { label: 'WCAG Kuralları', href: '/tr/kb/wcag/' },
    { label: `${rule.criterionNumber} ${rule.title.tr || rule.title.en}`, href: `/tr/kb/wcag/${rule.slug.current}/` },
  ]}
  jsonLd={jsonLd}
  hreflang={{
    en: `https://inculva.com/kb/wcag/${rule.slug.current}/`,
    tr: `https://inculva.com/tr/kb/wcag/${rule.slug.current}/`,
  }}
>
  <article class="max-w-4xl">
    <header class="mb-8">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>{principleNames[rule.principle]}</span>
        <span aria-hidden="true">•</span>
        <span>WCAG {rule.criterionNumber}</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {rule.criterionNumber} {rule.title.tr || rule.title.en}
      </h1>
      {(rule.description?.tr || rule.description?.en) && (
        <p class="text-xl text-gray-600 mb-6">{rule.description.tr || rule.description.en}</p>
      )}
      <RuleBadges
        level={rule.level}
        wcagVersions={rule.wcagVersions}
        impact={rule.impact}
        introducedIn={rule.introducedIn}
      />
      {rule.axeRuleIds && rule.axeRuleIds.length > 0 && (
        <div class="mt-4 flex flex-wrap gap-2">
          {rule.axeRuleIds.map((id) => (
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-700">
              {id}
            </span>
          ))}
        </div>
      )}
    </header>

    <div class="prose prose-lg prose-gray max-w-none" set:html={contentHtml} />

    <ResourceList resources={rule.resources || []} lang="tr" />
  </article>
</KBLayout>
```

- [ ] **Step 4: Create TR guides listing page**

Create `apps/landing/src/pages/tr/kb/guides/index.astro`:

```astro
---
import KBLayout from '../../../../components/kb/KBLayout.astro'
import KBCard from '../../../../components/kb/KBCard.astro'
import { getAllGuides } from '../../../../lib/sanity'

const guides = await getAllGuides()

const categoryNames: Record<string, string> = {
  seo: 'SEO',
  geo: 'GEO',
  aeo: 'AEO',
  technique: 'Teknikler',
  'best-practice': 'En İyi Uygulamalar',
}

const grouped = guides.reduce((acc, guide) => {
  const c = guide.category
  if (!acc[c]) acc[c] = []
  acc[c].push(guide)
  return acc
}, {} as Record<string, typeof guides>)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Erişilebilirlik Kılavuzları',
  description: 'SEO, GEO, AEO ve erişilebilirlik en iyi uygulamaları hakkında uzman kılavuzları.',
  url: 'https://inculva.com/tr/kb/guides/',
  inLanguage: 'tr',
}
---

<KBLayout
  title="Erişilebilirlik Kılavuzları | inculva"
  description="SEO, GEO, AEO ve erişilebilirlik en iyi uygulamaları hakkında uzman kılavuzları."
  lang="tr"
  breadcrumbs={[
    { label: 'Bilgi Bankası', href: '/tr/kb/' },
    { label: 'Kılavuzlar', href: '/tr/kb/guides/' },
  ]}
  jsonLd={jsonLd}
  hreflang={{ en: 'https://inculva.com/kb/guides/', tr: 'https://inculva.com/tr/kb/guides/' }}
>
  <div class="mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Kılavuzlar</h1>
    <p class="text-xl text-gray-600 max-w-3xl">
      Erişilebilirlik, SEO ve optimizasyon en iyi uygulamaları hakkında uzman kılavuzları.
    </p>
  </div>

  {Object.entries(grouped).map(([category, categoryGuides]) => (
    <section aria-labelledby={`${category}-heading`} class="mb-16">
      <h2 id={`${category}-heading`} class="text-2xl font-bold text-gray-900 mb-6">
        {categoryNames[category] || category}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryGuides.map((guide) => (
          <KBCard
            href={`/tr/kb/guides/${guide.slug.current}/`}
            title={guide.title.tr || guide.title.en}
            description={guide.description?.tr || guide.description?.en || ''}
            category={guide.category}
          />
        ))}
      </div>
    </section>
  ))}
</KBLayout>
```

- [ ] **Step 5: Create TR guide detail page**

Create `apps/landing/src/pages/tr/kb/guides/[slug].astro`:

```astro
---
import KBLayout from '../../../../components/kb/KBLayout.astro'
import ResourceList from '../../../../components/kb/ResourceList.astro'
import RelatedRules from '../../../../components/kb/RelatedRules.astro'
import { getAllGuides, getGuideBySlug } from '../../../../lib/sanity'
import { portableTextToHtml } from '../../../../lib/portable-text'

export async function getStaticPaths() {
  const guides = await getAllGuides()
  return guides.map((guide) => ({
    params: { slug: guide.slug.current },
  }))
}

const { slug } = Astro.params
const guide = await getGuideBySlug(slug!)

if (!guide) {
  return Astro.redirect('/tr/kb/guides/')
}

const contentHtml = guide.content?.tr ? portableTextToHtml(guide.content.tr) : (guide.content?.en ? portableTextToHtml(guide.content.en) : '')

const categoryNames: Record<string, string> = {
  seo: 'SEO',
  geo: 'GEO',
  aeo: 'AEO',
  technique: 'Teknik',
  'best-practice': 'En İyi Uygulama',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: guide.title.tr || guide.title.en,
  description: guide.description?.tr || guide.description?.en || '',
  url: `https://inculva.com/tr/kb/guides/${guide.slug.current}/`,
  datePublished: guide.publishedAt,
  publisher: {
    '@type': 'Organization',
    name: 'inculva',
    url: 'https://inculva.com',
  },
  inLanguage: 'tr',
}
---

<KBLayout
  title={guide.seo?.tr?.metaTitle || `${guide.title.tr || guide.title.en} | inculva`}
  description={guide.seo?.tr?.metaDescription || guide.description?.tr || guide.description?.en || ''}
  lang="tr"
  breadcrumbs={[
    { label: 'Bilgi Bankası', href: '/tr/kb/' },
    { label: 'Kılavuzlar', href: '/tr/kb/guides/' },
    { label: guide.title.tr || guide.title.en, href: `/tr/kb/guides/${guide.slug.current}/` },
  ]}
  jsonLd={jsonLd}
  hreflang={{
    en: `https://inculva.com/kb/guides/${guide.slug.current}/`,
    tr: `https://inculva.com/tr/kb/guides/${guide.slug.current}/`,
  }}
>
  <div class="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
    <article class="max-w-4xl">
      <header class="mb-8">
        <span class="text-sm font-medium text-primary-600 uppercase tracking-wide">
          {categoryNames[guide.category] || guide.category}
        </span>
        <h1 class="text-4xl font-bold text-gray-900 mt-2 mb-4">{guide.title.tr || guide.title.en}</h1>
        {(guide.description?.tr || guide.description?.en) && (
          <p class="text-xl text-gray-600">{guide.description.tr || guide.description.en}</p>
        )}
      </header>

      <div class="prose prose-lg prose-gray max-w-none" set:html={contentHtml} />

      <ResourceList resources={guide.resources || []} lang="tr" />
    </article>

    <aside class="hidden lg:block">
      <RelatedRules rules={guide.relatedWcagRules || []} lang="tr" />
    </aside>
  </div>
</KBLayout>
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Turkish KB pages (listing + detail for WCAG rules and guides)"
```

---

## Task 13: Update Navbar with KB Link

**Files:**

- Modify: `apps/landing/src/components/Navbar.astro`

- [ ] **Step 1: Add Knowledge Base link to Navbar**

In `apps/landing/src/components/Navbar.astro`, find the nav links array/section and add a "Knowledge Base" link pointing to `/kb/` (EN) and `/tr/kb/` (TR) between existing links. The exact edit depends on how the Navbar currently structures links, but add:

For EN nav: `{ label: 'Knowledge Base', href: '/kb/' }`
For TR nav: `{ label: 'Bilgi Bankası', href: '/tr/kb/' }`

Place it after "Features" and before "Pricing" in the navigation order.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Knowledge Base link to navbar"
```

---

## Task 14: Seed WCAG Rules Content — Perceivable (1.x)

**Files:**

- Create: `apps/studio/seed/axe-rule-mapping.json`
- Create: `apps/studio/seed/seed-wcag-perceivable.mjs`

This is the largest content task. Each WCAG rule requires deep research from multiple sources and original bilingual content. The seed script creates Sanity documents programmatically.

- [ ] **Step 1: Create axe rule mapping**

Create `apps/studio/seed/axe-rule-mapping.json` — a JSON file mapping each axe-core rule ID to its WCAG criterion number. Research from the axe-core GitHub repository (`lib/rules/` directory) to build the complete mapping.

```json
{
  "image-alt": "1.1.1",
  "input-image-alt": "1.1.1",
  "area-alt": "1.1.1",
  "object-alt": "1.1.1",
  "svg-img-alt": "1.1.1",
  "role-img-alt": "1.1.1",
  "video-caption": "1.2.2",
  "audio-caption": "1.2.1",
  "td-headers-attr": "1.3.1",
  "th-has-data-cells": "1.3.1",
  "scope-attr-valid": "1.3.1",
  "table-fake-caption": "1.3.1",
  "table-duplicate-name": "1.3.1",
  "p-as-heading": "1.3.1",
  "list": "1.3.1",
  "listitem": "1.3.1",
  "definition-list": "1.3.1",
  "dlitem": "1.3.1",
  "empty-heading": "1.3.1",
  "heading-order": "1.3.1",
  "label": "1.3.1",
  "input-button-name": "1.3.1",
  "select-name": "1.3.1",
  "aria-required-children": "1.3.1",
  "aria-required-parent": "1.3.1",
  "color-contrast": "1.4.3",
  "color-contrast-enhanced": "1.4.6",
  "link-in-text-block": "1.4.1",
  "meta-viewport": "1.4.4",
  "meta-viewport-large": "1.4.4",
  "target-size": "2.5.8",
  "focus-visible": "2.4.7",
  "focus-order-semantics": "2.4.3",
  "tabindex": "2.4.3",
  "bypass": "2.4.1",
  "skip-link": "2.4.1",
  "page-has-heading-one": "2.4.6",
  "document-title": "2.4.2",
  "link-name": "2.4.4",
  "identical-links-same-purpose": "2.4.9",
  "frame-title": "2.4.1",
  "frame-title-unique": "2.4.1",
  "button-name": "4.1.2",
  "aria-label": "4.1.2",
  "aria-labelledby": "4.1.2",
  "aria-hidden-body": "4.1.2",
  "aria-hidden-focus": "4.1.2",
  "aria-valid-attr": "4.1.2",
  "aria-valid-attr-value": "4.1.2",
  "aria-allowed-attr": "4.1.2",
  "aria-allowed-role": "4.1.2",
  "aria-roles": "4.1.2",
  "duplicate-id": "4.1.1",
  "duplicate-id-active": "4.1.1",
  "duplicate-id-aria": "4.1.1",
  "html-has-lang": "3.1.1",
  "html-lang-valid": "3.1.1",
  "html-xml-lang-mismatch": "3.1.1",
  "valid-lang": "3.1.2",
  "autocomplete-valid": "1.3.5",
  "form-field-multiple-labels": "1.3.1",
  "landmark-banner-is-top-level": "1.3.1",
  "landmark-contentinfo-is-top-level": "1.3.1",
  "landmark-main-is-top-level": "1.3.1",
  "landmark-no-duplicate-banner": "1.3.1",
  "landmark-no-duplicate-contentinfo": "1.3.1",
  "landmark-one-main": "1.3.1",
  "region": "1.3.1",
  "accesskeys": "4.1.1",
  "server-side-image-map": "2.1.1",
  "no-autoplay-audio": "1.4.2",
  "blink": "2.2.2",
  "marquee": "2.2.2",
  "scrollable-region-focusable": "2.1.1",
  "image-redundant-alt": "1.1.1"
}
```

- [ ] **Step 2: Create seed script for Perceivable rules**

Create `apps/studio/seed/seed-wcag-perceivable.mjs`. This script must:

1. Import `@sanity/client`
2. Define each Perceivable criterion (1.1.1 through 1.4.13)
3. For each criterion, include:
   - All metadata (number, level, principle, versions, impact, axe IDs, tags)
   - Original EN content researched from W3C, Deque, WebAIM, MDN, etc.
   - Original TR content (not machine-translated)
   - Resources array with multiple external links
   - SEO metadata for both languages
4. Use `client.createOrReplace()` to upsert documents

The content for each rule must follow this article structure:

- What this rule means
- Why it matters
- Related axe-core rules
- How to test
- How to fix (with code examples)
- Common mistakes

**This is a research-intensive task.** For each of the ~30 Perceivable criteria, research from all 10 sources listed in the spec, then write original content in both languages.

Example document shape for 1.1.1:

```javascript
{
  _id: 'wcag-1-1-1',
  _type: 'wcagRule',
  criterionNumber: '1.1.1',
  level: 'A',
  principle: 'perceivable',
  introducedIn: '2.0',
  wcagVersions: ['2.0', '2.1', '2.2'],
  impact: 'critical',
  axeRuleIds: ['image-alt', 'input-image-alt', 'area-alt', 'object-alt', 'svg-img-alt', 'role-img-alt', 'image-redundant-alt'],
  tags: ['images', 'forms', 'media'],
  title: {
    en: 'Non-text Content',
    tr: 'Metin Dışı İçerik'
  },
  slug: { _type: 'slug', current: '1-1-1-non-text-content' },
  description: {
    en: 'All non-text content presented to the user must have a text alternative that serves the equivalent purpose.',
    tr: 'Kullanıcıya sunulan tüm metin dışı içerikler, eşdeğer amaca hizmet eden bir metin alternatifine sahip olmalıdır.'
  },
  content: {
    en: [/* Portable Text blocks - full article content in English */],
    tr: [/* Portable Text blocks - full article content in Turkish */]
  },
  resources: [
    { title: 'Understanding SC 1.1.1: Non-text Content', url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html', source: 'w3c-understanding', language: 'en' },
    { title: 'Sufficient Techniques for 1.1.1', url: 'https://www.w3.org/WAI/WCAG22/Techniques/#text-alternatives', source: 'w3c-techniques', language: 'en' },
    { title: 'Alternative Text', url: 'https://webaim.org/techniques/alttext/', source: 'webaim', language: 'en' },
    { title: 'An alt Decision Tree', url: 'https://www.w3.org/WAI/tutorials/images/decision-tree/', source: 'w3c-wai', language: 'en' },
    { title: 'image-alt rule', url: 'https://dequeuniversity.com/rules/axe/4.10/image-alt', source: 'deque', language: 'en' },
    { title: '<img>: The Image Embed element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img', source: 'mdn', language: 'en' },
    { title: 'Images Concepts', url: 'https://www.w3.org/WAI/tutorials/images/', source: 'w3c-wai', language: 'en' },
  ],
  seo: {
    en: { metaTitle: 'WCAG 1.1.1: Non-text Content — Accessibility Guide', metaDescription: 'Learn about WCAG 1.1.1 Non-text Content. Understand how to provide text alternatives for images, icons, and media to make your website accessible.' },
    tr: { metaTitle: 'WCAG 1.1.1: Metin Dışı İçerik — Erişilebilirlik Kılavuzu', metaDescription: 'WCAG 1.1.1 Metin Dışı İçerik hakkında bilgi edinin. Görseller, simgeler ve medya için metin alternatifleri sağlayarak web sitenizi erişilebilir hale getirin.' }
  },
  publishedAt: new Date().toISOString()
}
```

- [ ] **Step 3: Run the seed script**

```bash
cd apps/studio && node seed/seed-wcag-perceivable.mjs
```

- [ ] **Step 4: Verify in Sanity Studio**

```bash
cd apps/studio && npx sanity dev
# Navigate to WCAG Rules → Perceivable → verify content for each guideline
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: seed Perceivable WCAG rules content (1.1.1 - 1.4.13)"
```

---

## Task 15: Seed WCAG Rules Content — Operable (2.x)

**Files:**

- Create: `apps/studio/seed/seed-wcag-operable.mjs`

- [ ] **Step 1: Create seed script for Operable rules**

Same approach as Task 14 but for all Operable criteria (2.1.1 through 2.5.8). Covers guidelines:

- 2.1 Keyboard Accessible (2.1.1 - 2.1.4)
- 2.2 Enough Time (2.2.1 - 2.2.6)
- 2.3 Seizures and Physical Reactions (2.3.1 - 2.3.3)
- 2.4 Navigable (2.4.1 - 2.4.13)
- 2.5 Input Modalities (2.5.1 - 2.5.8)

Each criterion needs full research, original EN+TR content, resources, and SEO metadata.

- [ ] **Step 2: Run the seed script**

```bash
cd apps/studio && node seed/seed-wcag-operable.mjs
```

- [ ] **Step 3: Verify in Sanity Studio**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed Operable WCAG rules content (2.1.1 - 2.5.8)"
```

---

## Task 16: Seed WCAG Rules Content — Understandable (3.x)

**Files:**

- Create: `apps/studio/seed/seed-wcag-understandable.mjs`

- [ ] **Step 1: Create seed script for Understandable rules**

Same approach for all Understandable criteria (3.1.1 through 3.3.9). Covers:

- 3.1 Readable (3.1.1 - 3.1.6)
- 3.2 Predictable (3.2.1 - 3.2.6)
- 3.3 Input Assistance (3.3.1 - 3.3.9)

- [ ] **Step 2: Run the seed script**

```bash
cd apps/studio && node seed/seed-wcag-understandable.mjs
```

- [ ] **Step 3: Verify in Sanity Studio**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed Understandable WCAG rules content (3.1.1 - 3.3.9)"
```

---

## Task 17: Seed WCAG Rules Content — Robust (4.x)

**Files:**

- Create: `apps/studio/seed/seed-wcag-robust.mjs`

- [ ] **Step 1: Create seed script for Robust rules**

Same approach for Robust criteria (4.1.1 through 4.1.3). Covers:

- 4.1 Compatible (4.1.1 - 4.1.3)

Note: 4.1.1 Parsing was removed in WCAG 2.2 — include it for 2.0/2.1 but mark `wcagVersions: ['2.0', '2.1']` (not 2.2).

- [ ] **Step 2: Run the seed script**

```bash
cd apps/studio && node seed/seed-wcag-robust.mjs
```

- [ ] **Step 3: Verify in Sanity Studio**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed Robust WCAG rules content (4.1.1 - 4.1.3)"
```

---

## Task 18: Seed Guide Content — SEO, GEO, AEO

**Files:**

- Create: `apps/studio/seed/seed-guides.mjs`

- [ ] **Step 1: Create seed script for guides**

Create `apps/studio/seed/seed-guides.mjs` with ~20-25 guides across categories:

**SEO guides:**

- Accessibility and SEO: The Complete Guide
- Semantic HTML for SEO and Accessibility
- Image Optimization for SEO and Accessibility
- Internal Linking Best Practices for Accessible Sites
- Mobile Accessibility and SEO

**GEO guides:**

- Generative Engine Optimization: What It Is and Why It Matters
- Structured Data for AI Engines
- Content Structure for AI Citability
- EEAT and Accessibility Signals

**AEO guides:**

- Answer Engine Optimization Fundamentals
- Featured Snippets and Accessibility
- FAQ Schema Implementation Guide
- Voice Search and Accessibility

**Technique guides:**

- Keyboard Navigation Testing Guide
- Screen Reader Testing Guide
- Color Contrast Testing Guide
- ARIA Roles and Properties Reference
- Forms Accessibility Patterns

**Best Practice guides:**

- Accessibility Testing Workflow
- WCAG Conformance Levels Explained
- Accessibility Statement Template
- Inclusive Design Principles

Each guide needs original EN+TR content, related WCAG rule references, resources, and SEO metadata.

- [ ] **Step 2: Run the seed script**

```bash
cd apps/studio && node seed/seed-guides.mjs
```

- [ ] **Step 3: Verify in Sanity Studio**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seed SEO/GEO/AEO and technique guides"
```

---

## Task 19: Final Integration — Sitemap & Verification

**Files:**

- Modify: `apps/landing/astro.config.mjs` (if sitemap needs custom config)

- [ ] **Step 1: Verify Astro build succeeds**

```bash
cd apps/landing && npm run build
```

Expected: Build completes with all `/kb/` pages generated.

- [ ] **Step 2: Verify sitemap includes KB pages**

```bash
cat apps/landing/dist/sitemap-0.xml | grep "/kb/"
```

Expected: All KB URLs present in sitemap.

- [ ] **Step 3: Verify hreflang tags**

```bash
cat apps/landing/dist/kb/wcag/1-1-1-non-text-content/index.html | grep "hreflang"
```

Expected: Both `en` and `tr` hreflang links present.

- [ ] **Step 4: Verify JSON-LD markup**

```bash
cat apps/landing/dist/kb/wcag/1-1-1-non-text-content/index.html | grep "TechArticle"
```

Expected: JSON-LD TechArticle schema present.

- [ ] **Step 5: Run Sanity Studio and verify desk structure**

```bash
cd apps/studio && npx sanity dev
```

Navigate through: WCAG Rules → each principle → verify content exists.

- [ ] **Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "chore: finalize KB build and verify sitemap/SEO"
```

---

## Summary

| Task  | Description                   | Est. Files            |
| ----- | ----------------------------- | --------------------- |
| 1     | Clean slate                   | 7 deleted, 1 modified |
| 2     | Localized field objects       | 5 created             |
| 3     | wcagRule schema               | 1 created             |
| 4     | guide schema                  | 1 created             |
| 5     | Schema index & desk structure | 3 modified/created    |
| 6     | Sanity client queries         | 1 modified            |
| 7     | Portable Text renderer        | 1 created             |
| 8     | KB layout & components        | 8 created             |
| 9     | KB listing pages (EN)         | 3 created             |
| 10    | WCAG rule detail page (EN)    | 1 created             |
| 11    | Guide detail page (EN)        | 1 created             |
| 12    | Turkish KB pages              | 5 created             |
| 13    | Navbar update                 | 1 modified            |
| 14-17 | Seed WCAG rules (all 87)      | 5 created             |
| 18    | Seed guides (~25)             | 1 created             |
| 19    | Final verification            | 0-1 modified          |
