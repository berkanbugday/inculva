import { notFound } from "next/navigation";
import { db } from "@inculva/db";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

const landingUrl = process.env["NEXT_PUBLIC_LANDING_URL"]!;

export const revalidate = 3600; // ISR: refresh every hour

interface Props {
  params: Promise<{ siteId: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { siteId } = await params;
  const { lang } = await searchParams;
  const site = await db.site.findUnique({
    where: { id: siteId },
    select: { name: true },
  });
  if (!site) return { title: "Not Found" };
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    lang && SUPPORTED_LOCALES.includes(lang as Locale)
      ? lang
      : cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);
  return {
    title: `${t.statement.publicTitle} — ${site.name}`,
    description: t.statement.conformanceBodyGeneric
      .replace("{level}", "AA")
      .replace(/\.$/, ` — ${site.name}.`),
  };
}

export default async function PublicStatementPage({ params, searchParams }: Props) {
  const { siteId } = await params;
  const { lang } = await searchParams;
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    lang && SUPPORTED_LOCALES.includes(lang as Locale)
      ? lang
      : cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);

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
  const reviewDate = (lastScanAt ?? new Date()).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const complianceDate = createdAt.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusNote =
    lastScanViolations === null
      ? t.statement.statusNoteNotScanned
      : lastScanViolations === 0
      ? t.statement.statusNoteNoViolationsPublic
      : t.statement.statusNoteViolationsPublic.replace(
          "{count}",
          String(lastScanViolations),
        );

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
      <div
        lang={locale}
        className="min-h-screen bg-white text-gray-900"
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "2rem 1.5rem",
            lineHeight: 1.7,
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "0.25rem",
            }}
          >
            {t.statement.publicTitle}
          </h1>
          <p style={{ color: "#4b5563", marginBottom: "0.25rem" }}>
            {t.statement.appliesTo}{" "}
            <strong>
              <a href={`https://${siteDomain}`} style={{ color: "#0066cc" }}>
                {siteDomain}
              </a>
            </strong>
          </p>
          <p style={{ color: "#4b5563" }}>
            {t.statement.lastReviewed} <strong>{reviewDate}</strong>
          </p>

          <SectionHeading>{t.statement.ourCommitmentTitle}</SectionHeading>
          <p>{t.statement.ourCommitmentBody.replace("{siteName}", siteName)}</p>

          <SectionHeading>{t.statement.conformanceStatusTitle}</SectionHeading>
          <p>{t.statement.conformanceStatusBody}</p>
          <p>
            {t.statement.complianceWorkBegan} <strong>{complianceDate}</strong>
          </p>
          <p>{statusNote}</p>

          <SectionHeading>
            {t.statement.technicalSpecificationsTitle}
          </SectionHeading>
          <p>{t.statement.technicalSpecificationsBody}</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>{t.statement.widgetNote}</p>

          <SectionHeading>{t.statement.feedbackAndContactTitle}</SectionHeading>
          <p>
            {t.statement.feedbackAndContactBody
              .replace("{siteName}", siteName)
              .replace("{email}", siteDomain)}
          </p>
          <p>{t.statement.responseTime}</p>

          <SectionHeading>{t.statement.enforcementTitle}</SectionHeading>
          <p>{t.statement.enforcementBody}</p>

          <footer
            style={{
              marginTop: "3rem",
              fontSize: "0.875rem",
              color: "#6b7280",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1rem",
            }}
          >
            <p>
              {t.statement.footerPrepared.split("{directive}")[0]}
              <a
                href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882"
                style={{ color: "#0066cc" }}
              >
                {t.statement.footerDirectiveName}
              </a>
              {t.statement.footerPrepared.split("{directive}")[1]}
            </p>
            <p>
              {t.statement.footerPowered.split("{inculva}")[0]}
              <a href={landingUrl} style={{ color: "#0066cc" }}>
                inculva
              </a>
              {t.statement.footerPowered.split("{inculva}")[1]}
            </p>
            <p>
              {
                t.statement.footerGenerated
                  .replace("{date}", reviewDate)
                  .split("{inculva}")[0]
              }
              <a href={landingUrl} style={{ color: "#0066cc" }}>
                inculva
              </a>
              {t.statement.footerGenerated
                .replace("{date}", reviewDate)
                .split("{inculva}")[1] ?? ""}
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
