import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { StatementClient } from "./statement-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StatementPage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const [site, user] = await Promise.all([
    db.site.findFirst({
      where: { id, ownerId: session!.user.id },
      include: { widgetConfig: { select: { lastScanViolations: true, lastScanAt: true, accessibilityStatementUrl: true } } },
    }),
    db.user.findUnique({
      where: { id: session!.user.id },
      select: { name: true, email: true },
    }),
  ]);

  if (!site) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <a href="/dashboard" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">
          Dashboard
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <a href={`/dashboard/sites/${site.id}`} className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">
          {site.name}
        </a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Accessibility Statement</span>
      </nav>

      {/* Sub-nav */}
      <nav className="flex gap-1 border-b border-gray-200 dark:border-gray-800 -mb-2">
        {[
          { label: "Config", href: `/dashboard/sites/${site.id}` },
          { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
          { label: "WCAG Scan", href: `/dashboard/sites/${site.id}/scan` },
          { label: "Statement", href: `/dashboard/sites/${site.id}/statement`, active: true },
        ].map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab.active
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
        currentStatementUrl={site.widgetConfig?.accessibilityStatementUrl ?? null}
      />
    </main>
  );
}
