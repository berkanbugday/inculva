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
