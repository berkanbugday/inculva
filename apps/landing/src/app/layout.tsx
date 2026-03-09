import type { Metadata } from "next";
import "@inculva/ui/globals.css";
import { CookieBanner } from "@/components/cookie-banner";

const siteUrl = "https://inculva.com";

export const metadata: Metadata = {
  title: "Inculva — Web Accessibility Widget",
  description:
    "Add 19 real accessibility features to any website in under 5 minutes. WCAG 2.1 AA, EAA 2025, ADA compliant. One script tag.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Inculva — Web Accessibility Widget",
    description:
      "Add 19 real accessibility features to any website in under 5 minutes. WCAG 2.1 AA, EAA 2025 compliant. One script tag, no developer required.",
    siteName: "Inculva",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inculva — Web Accessibility Widget",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inculva — Web Accessibility Widget",
    description:
      "19 accessibility features. One script tag. WCAG 2.1 AA & EAA 2025 compliant.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Inculva",
                url: siteUrl,
                logo: `${siteUrl}/favicon.svg`,
                description:
                  "Web accessibility widget for any website. 19 features, WCAG 2.1 AA compliant, one script tag.",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "support@inculva.com",
                  contactType: "customer support",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Does adding Inculva make my site fully WCAG compliant?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. The widget provides meaningful user-facing controls but full WCAG compliance also requires semantic HTML, accessible forms, and keyboard-navigable components built into your site.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Will the widget slow down my website?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. The widget is 24KB (7KB gzip) loaded asynchronously from a global CDN with no impact on your Lighthouse performance score.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does the widget collect data about my visitors?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We record anonymized events tied to a random session ID — not a user ID or IP address. Preferences are stored only in the visitor's browser localStorage.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the European Accessibility Act?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The EAA (Directive 2019/882) requires digital products sold to EU consumers to meet WCAG 2.1 AA standards. Fines can reach €500,000 for non-compliance. It took effect 28 June 2025.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.INCULVA_API_URL = "http://localhost:3001";`,
            }}
          />
        )}
        <script
          src={
            process.env.NEXT_PUBLIC_WIDGET_URL ??
            (process.env.NODE_ENV === "development"
              ? "http://localhost:3000/widget.js"
              : "https://cdn.inculva.com/widget.js")
          }
          data-site-id="cmmjb1jzv0001i3jiilvu3xp5"
          defer
        />
      </body>
    </html>
  );
}
