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

  const totalOpens = sites.reduce((a, s) => a + s._count.widgetEvents, 0);
  const liveSites = sites.filter((s) => s.healthStatus === "healthy").length;

  function getComplianceScore(violations: number | null | undefined): {
    label: string;
    color: string;
    dot: string;
  } {
    if (violations === null || violations === undefined)
      return {
        label: t.siteHealth.notScanned,
        color: "text-gray-400 dark:text-gray-600",
        dot: "bg-gray-300 dark:bg-gray-700",
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

  function getHealthLabel(status: string | null) {
    if (status === "healthy") return t.siteHealth.live;
    if (status === "degraded") return t.siteHealth.offline;
    return t.siteHealth.checking;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          {t.dashboard.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {sites.length === 0
            ? t.dashboard.noSites
            : `${sites.length} ${sites.length !== 1 ? t.dashboard.sitesConnected : t.dashboard.siteConnected}`}
        </p>
      </div>

      {/* Stats row */}
      {sites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {[
            { label: t.dashboard.totalSites, value: sites.length },
            { label: t.dashboard.widgetOpens, value: totalOpens },
            { label: t.dashboard.liveSites, value: liveSites },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 sm:p-8"
            >
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => {
            const score = getComplianceScore(
              site.widgetConfig?.lastScanViolations,
            );
            const isLive = site.healthStatus === "healthy";
            const isDown = site.healthStatus === "degraded";

            return (
              <div
                key={site.id}
                className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
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
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                        {site.domain}
                      </p>
                      {site.name !== site.domain && (
                        <p className="text-xs text-gray-400 truncate">
                          {site.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {site.healthStatus && (
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        isLive
                          ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                          : isDown
                            ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500" : isDown ? "bg-red-500" : "bg-gray-400"}`}
                      />
                      {getHealthLabel(site.healthStatus)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{t.sites.opens}</p>
                    <p className="text-lg font-black text-gray-900 dark:text-white">
                      {site._count.widgetEvents.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{t.sites.wcagScore}</p>
                    <p
                      className={`text-sm font-bold flex items-center gap-1.5 mt-0.5 ${score.color}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${score.dot}`}
                      />
                      {score.label}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e8eaf0] dark:border-[#2a2a3e]">
                  <a
                    href={`/dashboard/sites/${site.id}`}
                    className="block text-center text-xs font-semibold text-blue-600 dark:text-blue-400 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors cursor-pointer"
                  >
                    {t.dashboard.open} &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
