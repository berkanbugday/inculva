export const SITE_URL = "https://inculva.com";
export const SITE_NAME = "inculva";
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
  lang?: "en" | "tr";
}

export function getSEOProps(props: SEOProps) {
  const fullTitle =
    props.title === SITE_NAME
      ? `${SITE_NAME} — Web Accessibility Platform`
      : `${props.title} | ${SITE_NAME}`;

  const locale = props.lang === "tr" ? "tr_TR" : "en_US";
  const alternateLocale = props.lang === "tr" ? "en_US" : "tr_TR";

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

// --- JSON-LD Generators ---

export function getOrganizationSchema(lang?: "en" | "tr") {
  const base = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${CDN_URL}/logos/logo-dark.png`,
    sameAs: ["https://youtube.com/@inculva", "https://x.com/inculva"],
  };

  if (lang === "tr") {
    return {
      ...base,
      description:
        "Web erişilebilirlik platformu. Web sitelerinin otomatik olarak WCAG uyumluluğu sağlamasına yardımcı olur.",
      inLanguage: "tr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Abdulhalik Renda Mahallesi, Ankara Caddesi",
        addressLocality: "Merkez",
        addressRegion: "Çankırı",
        addressCountry: "TR",
      },
      areaServed: { "@type": "Country", name: "Türkiye" },
      contactPoint: {
        "@type": "ContactPoint",
        email: "bilgi@inculva.com",
        contactType: "customer support",
        availableLanguage: ["Turkish", "English"],
      },
    };
  }

  return {
    ...base,
    description:
      "Web accessibility platform that helps websites achieve WCAG compliance automatically.",
    inLanguage: "en",
  };
}

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
    inLanguage: lang === "tr" ? "tr" : "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

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
    inLanguage: lang === "tr" ? "tr" : "en",
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

export function getFAQSchema(
  faqs: { question: string; answer: string }[],
  lang?: "en" | "tr",
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "tr" ? "tr" : "en",
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

export function getSoftwareApplicationSchema(lang?: "en" | "tr") {
  const base = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    url: SITE_URL,
    availableLanguage: ["en", "tr"],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "39",
      highPrice: "119",
      offerCount: "3",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (lang === "tr") {
    return {
      ...base,
      description:
        "Web sitelerinin WCAG uyumluluk sorunlarını otomatik olarak tespit eden, düzelten ve izleyen platform. 41'den fazla dili destekler, her web sitesiyle çalışır.",
      inLanguage: "tr",
      featureList: [
        "Otomatik WCAG 2.1 AA & AAA taraması",
        "Tek tıkla erişilebilirlik düzeltmeleri",
        "Gerçek zamanlı uyumluluk izleme",
        "Çoklu dil desteği (41+ dil)",
        "Her framework ve CMS ile çalışır",
        "ADA, Section 508, EN 301 549 uyumluluğu",
      ],
    };
  }

  return {
    ...base,
    description:
      "Automated web accessibility platform that detects, fixes, and monitors WCAG compliance issues. Supports 41+ languages, works with any website.",
    inLanguage: "en",
    featureList: [
      "Automated WCAG 2.1 AA & AAA scanning",
      "One-click accessibility fixes",
      "Real-time compliance monitoring",
      "Multi-language support (41+ languages)",
      "Works with any framework or CMS",
      "ADA, Section 508, EN 301 549 compliance",
    ],
  };
}

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
    inLanguage: lang === "tr" ? "tr" : "en",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

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
    inLanguage: lang === "tr" ? "tr" : "en",
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
  lang?: "en" | "tr",
) {
  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} ${plan.name}`,
    description: plan.description,
    image: DEFAULT_OG_IMAGE,
    inLanguage: lang === "tr" ? "tr" : "en",
    brand: {
      "@type": "Brand",
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
      url: lang === "tr" ? `${SITE_URL}/tr/pricing` : `${SITE_URL}/pricing`,
    },
  }));
}

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
    areaServed: { "@type": "Country", name: "Türkiye" },
    priceRange: "$$",
    sameAs: ["https://youtube.com/@inculva", "https://x.com/inculva"],
  };
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
