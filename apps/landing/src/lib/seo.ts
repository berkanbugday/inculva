const SITE_URL = 'https://inculva.com';
const SITE_NAME = 'Inculva';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
}

export function getSEOProps(props: SEOProps) {
  const fullTitle = props.title === SITE_NAME
    ? `${SITE_NAME} — AI-Powered Web Accessibility`
    : `${props.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: props.description,
    canonical: props.canonical || SITE_URL,
    noindex: props.noindex || false,
    openGraph: {
      basic: {
        title: fullTitle,
        type: props.ogType || 'website',
        image: props.ogImage || DEFAULT_OG_IMAGE,
        url: props.canonical || SITE_URL,
      },
      optional: {
        description: props.description,
        siteName: SITE_NAME,
      },
      article: props.ogType === 'article'
        ? {
            publishedTime: props.publishedAt,
            modifiedTime: props.modifiedAt,
          }
        : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description: props.description,
      image: props.ogImage || DEFAULT_OG_IMAGE,
    },
  };
}

// --- JSON-LD Generators ---

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: 'AI-powered web accessibility platform that helps websites achieve WCAG compliance automatically.',
    sameAs: [
      'https://twitter.com/inculva',
      'https://github.com/inculva',
      'https://linkedin.com/company/inculva',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'AI-powered web accessibility platform',
    publisher: {
      '@type': 'Organization',
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
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}
