import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { StatementClient } from "./statement-client";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StatementPage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const [site, user] = await Promise.all([
    db.site.findFirst({
      where: { id, ownerId: session!.user.id },
      include: {
        widgetConfig: {
          select: {
            lastScanViolations: true,
            lastScanAt: true,
            accessibilityStatementUrl: true,
          },
        },
      },
    }),
    db.user.findUnique({
      where: { id: session!.user.id },
      select: { name: true, email: true },
    }),
  ]);

  if (!site) notFound();

  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);

  return (
    <main className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <a
          href="/dashboard"
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          {t.breadcrumb.dashboard}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <a
          href={`/dashboard/sites/${site.id}`}
          className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          {site.name}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {t.siteTabs.statement}
        </span>
      </nav>

      {/* Sub-nav */}
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { label: t.siteTabs.config, href: `/dashboard/sites/${site.id}` },
          {
            label: t.nav.statistics,
            href: `/dashboard/sites/${site.id}/statistics`,
          },
          {
            label: t.siteTabs.wcagScan,
            href: `/dashboard/sites/${site.id}/scan`,
          },
          {
            label: t.siteTabs.statement,
            href: `/dashboard/sites/${site.id}/statement`,
            active: true,
          },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              tab.active
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <StatementClient
        siteId={site.id}
        siteName={site.name}
        siteDomain={site.domain}
        contactEmail={user?.email ?? ""}
        contactName={user?.name ?? ""}
        lastScanViolations={site.widgetConfig?.lastScanViolations ?? null}
        lastScanAt={site.widgetConfig?.lastScanAt?.toISOString() ?? null}
        currentStatementUrl={
          site.widgetConfig?.accessibilityStatementUrl ?? null
        }
      />
    </main>
  );
}
