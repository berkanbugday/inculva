import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

function getServerLocale(cookieLocale: string | undefined): Locale {
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  return "en";
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const locale = getServerLocale((await cookies()).get("locale")?.value);
  const t = getMessages(locale);

  const sites = await db.site.findMany({
    where: { ownerId: session.user.id },
    select: {
      id: true,
      name: true,
      domain: true,
      createdAt: true,
      healthStatus: true,
      widgetConfig: { select: { lastScanViolations: true, lastScanAt: true } },
      _count: {
        select: {
          widgetLoads: true,
          widgetEvents: { where: { event: "opened" } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  function getComplianceScore(violations: number | null | undefined): {
    label: string;
    color: string;
    dot: string;
  } {
    if (violations === null || violations === undefined)
      return {
        label: t.siteHealth.notScanned,
        color: "text-gray-400 dark:text-gray-500",
        dot: "bg-gray-300 dark:bg-gray-600",
      };
    if (violations === 0)
      return {
        label: t.siteHealth.perfect,
        color: "text-green-600 dark:text-green-400",
        dot: "bg-green-500",
      };
    if (violations <= 3)
      return {
        label: t.siteHealth.good,
        color: "text-blue-600 dark:text-blue-400",
        dot: "bg-blue-500",
      };
    if (violations <= 8)
      return {
        label: t.siteHealth.fair,
        color: "text-amber-600 dark:text-amber-400",
        dot: "bg-amber-500",
      };
    return {
      label: t.siteHealth.needsWork,
      color: "text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    };
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {t.dashboard.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {sites.length === 0
              ? t.dashboard.noSites
              : `${sites.length} ${
                  sites.length !== 1
                    ? t.dashboard.sitesConnected
                    : t.dashboard.siteConnected
                }`}
          </p>
        </div>
      </div>

      {sites.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 p-8 sm:p-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">
            {t.dashboard.noSitesAction}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
            {t.dashboard.noSitesDesc}
          </p>
          <a
            href="/dashboard/sites/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors cursor-pointer"
          >
            {t.dashboard.noSitesAction}
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => {
            const score = getComplianceScore(
              site.widgetConfig?.lastScanViolations,
            );
            const opens = site._count.widgetEvents;

            return (
              <a
                key={site.id}
                href={`/dashboard/sites/${site.id}`}
                className="flex items-center gap-4 bg-white dark:bg-[#1a1a2e] rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                {/* Site icon */}
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                {/* Domain & name */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {site.domain}
                  </p>
                  {site.name !== site.domain && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {site.name}
                    </p>
                  )}
                </div>
                <div className="flex gap-10 mr-5">
                  {/* Widget opens */}
                  <div className="hidden sm:block text-center shrink-0">
                    <p className="text-xs  text-gray-400 dark:text-gray-500">
                      {t.sites.opens}
                    </p>
                    <p className="text-sm font-bold text-xl text-black dark:text-white tabular-nums">
                      {opens.toLocaleString()}
                    </p>
                  </div>

                  {/* WCAG score */}
                  <div className="hidden sm:flex items-center justify-end gap-1.5 shrink-0 min-w-[100px]">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${score.dot}`}
                    />
                    <span className={`text-sm font-semibold ${score.color}`}>
                      {score.label}
                    </span>
                  </div>
                </div>
                {/* Arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
