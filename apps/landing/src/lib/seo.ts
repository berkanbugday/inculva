export const SITE_URL = "https://inculva.com";
export const SITE_NAME = "Inculva";
const CDN_URL = import.meta.env.PUBLIC_CDN_URL || "https://cdn.inculva.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
}

export function getSEOProps(props: SEOProps) {
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

// --- JSON-LD Generators ---

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${CDN_URL}/logos/logo.png`,
    description:
      "Web accessibility platform that helps websites achieve WCAG compliance automatically.",
    sameAs: [
      "https://twitter.com/inculva",
      "https://github.com/inculva",
      "https://linkedin.com/company/inculva",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Web accessibility platform",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${CDN_URL}/logos/logo.png`,
      },
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    url: SITE_URL,
    description:
      "Automated web accessibility platform that detects, fixes, and monitors WCAG compliance issues. Supports 41+ languages, works with any website.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "39",
      highPrice: "119",
      offerCount: "3",
    },
    featureList: [
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

export function getHowToSchema(steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to make your website WCAG compliant with Inculva",
    description:
      "From installation to full WCAG compliance in minutes, not months.",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function getWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": page.type || "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
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

export function getProductSchema(
  plans: {
    name: string;
    description: string;
    price: string;
    features: string[];
  }[],
) {
  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} ${plan.name}`,
    description: plan.description,
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
      url: `${SITE_URL}/pricing`,
    },
  }));
}

export function getLocalizedCanonical(path: string, lang: string): string {
  if (lang === "en") return `${SITE_URL}${path === "/" ? "" : path}`;
  return `${SITE_URL}/${lang}${path === "/" ? "" : path}`;
}

export function getHreflangAlternates(path: string) {
  const enUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const trUrl = `${SITE_URL}/tr${path === "/" ? "" : path}`;
  return [
    { lang: "en", url: enUrl },
    { lang: "tr", url: trUrl },
    { lang: "x-default", url: enUrl },
  ];
}
