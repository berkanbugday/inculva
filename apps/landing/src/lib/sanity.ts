import { createClient } from "@sanity/client";

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || "0w6yrm5e",
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: import.meta.env.SANITY_TOKEN,
  useCdn: false,
});

// --- Types ---

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: { _type: string; text: string; marks?: string[] }[];
  listItem?: string;
  level?: number;
  markDefs?: { _key: string; _type: string; href?: string }[];
  asset?: { url: string };
  alt?: string;
  code?: string;
  language?: string;
}

export interface Resource {
  title: string;
  url: string;
  source: string;
  language: string;
}

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
  content: { en: PortableTextBlock[]; tr: PortableTextBlock[] };
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
  relatedWcagRules: Pick<
    WcagRule,
    "_id" | "criterionNumber" | "level" | "title" | "slug"
  >[];
  title: { en: string; tr: string };
  slug: { current: string };
  description: { en: string; tr: string };
  content: { en: PortableTextBlock[]; tr: PortableTextBlock[] };
  resources: Resource[];
  seo: {
    en: { metaTitle: string; metaDescription: string };
    tr: { metaTitle: string; metaDescription: string };
  };
  publishedAt: string;
}

export type WcagRuleSummary = Omit<WcagRule, "content" | "resources" | "seo">;

export type GuideSummary = Omit<
  Guide,
  "content" | "resources" | "seo" | "relatedWcagRules"
>;

// --- Queries ---

const ALL_WCAG_RULES_QUERY = `
  *[_type == "wcagRule"] | order(criterionNumber asc) {
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
  }
`;

const WCAG_RULE_BY_SLUG_QUERY = `
  *[_type == "wcagRule" && slug.current == $slug][0] {
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
    content {
      en[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      },
      tr[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      }
    },
    resources,
    seo,
    publishedAt
  }
`;

const ALL_GUIDES_QUERY = `
  *[_type == "guide"] | order(publishedAt desc) {
    _id,
    category,
    title,
    slug,
    description,
    publishedAt
  }
`;

const GUIDE_BY_SLUG_QUERY = `
  *[_type == "guide" && slug.current == $slug][0] {
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
    content {
      en[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      },
      tr[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      }
    },
    resources,
    seo,
    publishedAt
  }
`;

const AXE_RULE_MAPPING_QUERY = `
  *[_type == "wcagRule" && defined(axeRuleIds)] | order(criterionNumber asc) {
    axeRuleIds,
    "slug": slug.current
  }
`;

// --- WCAG Rule Queries ---

export async function getAllWcagRules(): Promise<WcagRuleSummary[]> {
  try {
    return await client.fetch(ALL_WCAG_RULES_QUERY);
  } catch (error) {
    console.error("[sanity] Failed to fetch WCAG rules:", error);
    return [];
  }
}

export async function getWcagRuleBySlug(
  slug: string,
): Promise<WcagRule | null> {
  try {
    return await client.fetch(WCAG_RULE_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(
      `[sanity] Failed to fetch WCAG rule by slug "${slug}":`,
      error,
    );
    return null;
  }
}

// --- Guide Queries ---

export async function getAllGuides(): Promise<GuideSummary[]> {
  try {
    return await client.fetch(ALL_GUIDES_QUERY);
  } catch (error) {
    console.error("[sanity] Failed to fetch guides:", error);
    return [];
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    return await client.fetch(GUIDE_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(`[sanity] Failed to fetch guide by slug "${slug}":`, error);
    return null;
  }
}

// --- Axe Rule Mapping ---

export async function getAxeRuleMapping(): Promise<Record<string, string>> {
  try {
    const rules: { axeRuleIds: string[]; slug: string }[] = await client.fetch(
      AXE_RULE_MAPPING_QUERY,
    );
    const mapping: Record<string, string> = {};
    for (const rule of rules) {
      for (const axeId of rule.axeRuleIds || []) {
        mapping[axeId] = rule.slug;
      }
    }
    return mapping;
  } catch (error) {
    console.error("[sanity] Failed to fetch axe rule mapping:", error);
    return {};
  }
}

// --- Blog Post Types ---

export interface BlogPost {
  _id: string;
  title: { en: string; tr: string };
  slug: { current: string };
  slugTr: { current: string };
  description: { en: string; tr: string };
  content: { en: PortableTextBlock[]; tr: PortableTextBlock[] };
  featuredImage: { asset: { url: string }; alt?: string };
  category: "accessibility" | "legal" | "wcag" | "tools" | "news";
  tags: string[];
  relatedPosts: BlogPostSummary[];
  relatedGuides: Pick<Guide, "_id" | "title" | "slug" | "category">[];
  relatedWcagRules: Pick<WcagRule, "_id" | "criterionNumber" | "level" | "title" | "slug">[];
  seo: {
    en: { metaTitle: string; metaDescription: string };
    tr: { metaTitle: string; metaDescription: string };
  };
  publishedAt: string;
}

export type BlogPostSummary = Omit<BlogPost, "content" | "seo" | "relatedPosts" | "relatedGuides" | "relatedWcagRules">;

// --- Blog Post Queries ---

const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    slugTr,
    description,
    featuredImage {
      asset->{ url },
      alt
    },
    category,
    tags,
    publishedAt
  }
`;

const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    slugTr,
    description,
    content {
      en[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      },
      tr[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      }
    },
    featuredImage {
      asset->{ url },
      alt
    },
    category,
    tags,
    relatedPosts[]-> {
      _id,
      title,
      slug,
      slugTr,
      description,
      category,
      tags,
      publishedAt
    },
    relatedGuides[]-> {
      _id,
      title,
      slug,
      category
    },
    relatedWcagRules[]-> {
      _id,
      criterionNumber,
      level,
      title,
      slug
    },
    seo,
    publishedAt
  }
`;

const BLOG_POST_BY_SLUG_TR_QUERY = `
  *[_type == "blogPost" && slugTr.current == $slug][0] {
    _id,
    title,
    slug,
    slugTr,
    description,
    content {
      en[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      },
      tr[] {
        ...,
        _type == "image" => {
          ...,
          asset->{ url }
        }
      }
    },
    featuredImage {
      asset->{ url },
      alt
    },
    category,
    tags,
    relatedPosts[]-> {
      _id,
      title,
      slug,
      slugTr,
      description,
      category,
      tags,
      publishedAt
    },
    relatedGuides[]-> {
      _id,
      title,
      slug,
      category
    },
    relatedWcagRules[]-> {
      _id,
      criterionNumber,
      level,
      title,
      slug
    },
    seo,
    publishedAt
  }
`;

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  try {
    return await client.fetch(ALL_BLOG_POSTS_QUERY);
  } catch (error) {
    console.error("[sanity] Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error(`[sanity] Failed to fetch blog post by slug "${slug}":`, error);
    return null;
  }
}

export async function getBlogPostBySlugTr(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(BLOG_POST_BY_SLUG_TR_QUERY, { slug });
  } catch (error) {
    console.error(`[sanity] Failed to fetch blog post by Turkish slug "${slug}":`, error);
    return null;
  }
}

export default client;

