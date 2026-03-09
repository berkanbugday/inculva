import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { WidgetConfigForm } from "./widget-config-form";
import { SiteInfoClient } from "./site-info-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SitePage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const [site, user] = await Promise.all([
    db.site.findFirst({
      where: { id, ownerId: session!.user.id },
      include: { widgetConfig: true },
    }),
    db.user.findUnique({
      where: { id: session!.user.id },
      select: { plan: true },
    }),
  ]);

  if (!site) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <a href="/dashboard" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Dashboard</a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{site.name}</span>
      </nav>

      <SiteInfoClient
        siteId={site.id}
        initialName={site.name}
        initialDomain={site.domain}
        widgetScriptSrc={
          process.env["NEXT_PUBLIC_WIDGET_URL"] ??
          `${process.env["NEXT_PUBLIC_APP_URL"] ?? "https://app.inculva.com"}/widget.js`
        }
      />

      {/* Sub-nav */}
      <nav className="flex gap-1 border-b border-gray-200 dark:border-gray-800 -mb-2">
        {[
          { label: "Config", href: `/dashboard/sites/${site.id}`, active: true },
          { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
          { label: "WCAG Scan", href: `/dashboard/sites/${site.id}/scan` },
          { label: "Statement", href: `/dashboard/sites/${site.id}/statement` },
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

      {/* Config editor */}
      {site.widgetConfig && (
        <WidgetConfigForm
          siteId={site.id}
          userPlan={user?.plan ?? "free"}
          config={{
            ...site.widgetConfig,
            accessibilityStatementUrl: site.widgetConfig.accessibilityStatementUrl ?? "",
            allowedDomains: site.widgetConfig.allowedDomains,
            whiteLabelText: site.widgetConfig.whiteLabelText ?? "",
            readingMask: site.widgetConfig.readingMask ?? true,
            textAlign: site.widgetConfig.textAlign ?? true,
            saturation: site.widgetConfig.saturation ?? true,
            borderRadius: site.widgetConfig.borderRadius ?? 8,
            buttonSize: site.widgetConfig.buttonSize ?? "medium",
            fontFamily: site.widgetConfig.fontFamily ?? "system",
          }}
        />
      )}

      {/* WCAG Badge */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WCAG Compliance Badge</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Embed this badge on your site to show visitors you take accessibility seriously.
          The badge color reflects your latest{" "}
          <a href={`/dashboard/sites/${site.id}/scan`} className="underline text-blue-600 dark:text-blue-400">WCAG scan</a> result.
        </p>
        <div className="flex items-center gap-3 mb-4">
          {/* Live preview of badge */}
          <img
            src={`${process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.inculva.com"}/badge/${site.id}.svg`}
            alt="WCAG 2.1 AA compliance badge"
            height={20}
          />
        </div>
        <pre className="bg-gray-50 dark:bg-gray-950 rounded-lg p-4 text-xs overflow-x-auto text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 select-all">
{`<img src="${process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.inculva.com"}/badge/${site.id}.svg" alt="WCAG 2.1 AA" height="20" />`}
        </pre>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-900 p-6">
        <h3 className="font-semibold text-red-700 dark:text-red-400 mb-1">Danger Zone</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Permanently delete this site and all its data.
        </p>
        <a
          href={`/dashboard/sites/${site.id}/delete`}
          className="px-4 py-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          Delete site
        </a>
      </div>
    </main>
  );
}
