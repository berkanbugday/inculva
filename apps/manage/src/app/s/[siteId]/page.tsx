import { notFound } from "next/navigation";
import { db } from "@inculva/db";
import type { Metadata } from "next";

export const revalidate = 3600; // ISR: refresh every hour

interface Props {
  params: Promise<{ siteId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteId } = await params;
  const site = await db.site.findUnique({ where: { id: siteId }, select: { name: true } });
  if (!site) return { title: "Not Found" };
  return {
    title: `Accessibility Statement — ${site.name}`,
    description: `WCAG 2.1 Level AA accessibility statement for ${site.name}.`,
  };
}

export default async function PublicStatementPage({ params }: Props) {
  const { siteId } = await params;

  const site = await db.site.findUnique({
    where: { id: siteId },
    include: {
      widgetConfig: {
        select: { lastScanViolations: true, lastScanAt: true },
      },
    },
  });

  if (!site) notFound();

  const { name: siteName, domain: siteDomain, createdAt } = site;
  const lastScanViolations = site.widgetConfig?.lastScanViolations ?? null;
  const lastScanAt = site.widgetConfig?.lastScanAt ?? null;
  const reviewDate = (lastScanAt ?? new Date()).toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const complianceDate = createdAt.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusNote =
    lastScanViolations === null
      ? "An automated accessibility scan has not yet been performed."
      : lastScanViolations === 0
      ? "The most recent automated WCAG scan found no violations."
      : `The most recent automated WCAG scan found ${lastScanViolations} potential violation(s). We are actively working to resolve them.`;

  return (
    <>
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { font-size: 12pt; color: #000; background: #fff; }
          a { color: #000; text-decoration: underline; }
          a[href]::after { content: none; }
          footer { page-break-inside: avoid; }
          h1, h2 { page-break-after: avoid; }
          p, li { orphans: 3; widows: 3; }
        }
      `}</style>
      <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem", lineHeight: 1.7 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Accessibility Statement
          </h1>
          <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
            This statement applies to:{" "}
            <strong>
              <a href={`https://${siteDomain}`} style={{ color: "#0066cc" }}>
                {siteDomain}
              </a>
            </strong>
          </p>
          <p style={{ color: "#4b5563" }}>
            Last reviewed: <strong>{reviewDate}</strong>
          </p>

          <SectionHeading>Our Commitment</SectionHeading>
          <p>
            {siteName} is committed to ensuring digital accessibility for people with disabilities. We continually
            improve the user experience for everyone and apply relevant accessibility standards.
          </p>

          <SectionHeading>Conformance Status</SectionHeading>
          <p>
            We aim for <strong>WCAG 2.1 Level AA</strong> conformance, as defined by the Web Content Accessibility
            Guidelines (WCAG) 2.1. This meets the requirements of the European Accessibility Act (EAA) and EN 301 549.
          </p>
          <p>
            Compliance work began on: <strong>{complianceDate}</strong>
          </p>
          <p>{statusNote}</p>

          <SectionHeading>Technical Specifications</SectionHeading>
          <p>This website relies on the following technologies for conformance:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            An accessibility widget (powered by Inculva) is embedded on this site to provide on-demand assistive
            features including text resizing, high contrast, dyslexia-friendly fonts, keyboard navigation, screen
            reader support, and more.
          </p>

          <SectionHeading>Feedback and Contact</SectionHeading>
          <p>
            We welcome your feedback on the accessibility of {siteName}. If you experience accessibility barriers,
            please contact the site owner directly via{" "}
            <a href={`https://${siteDomain}`} style={{ color: "#0066cc" }}>
              {siteDomain}
            </a>
            .
          </p>
          <p>We try to respond to accessibility feedback within 2 business days.</p>

          <SectionHeading>Enforcement Procedure</SectionHeading>
          <p>
            If you are not satisfied with our response, you may contact the relevant national supervisory body
            responsible for enforcing the European Accessibility Act in your country.
          </p>

          <footer style={{ marginTop: "3rem", fontSize: "0.875rem", color: "#6b7280", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
            <p>
              This accessibility statement was prepared in accordance with{" "}
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882" style={{ color: "#0066cc" }}>
                Directive (EU) 2019/882
              </a>{" "}
              (European Accessibility Act) and WCAG 2.1.
            </p>
            <p>
              Powered by{" "}
              <a href="https://inculva.com" style={{ color: "#0066cc" }}>
                Inculva
              </a>{" "}
              accessibility platform.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.125rem",
        fontWeight: 600,
        marginTop: "2rem",
        marginBottom: "0.5rem",
        color: "#0066cc",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: "0.25rem",
      }}
    >
      {children}
    </h2>
  );
}
