import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function getComplianceScore(violations: number | null | undefined): {
  label: string;
  color: string;
  dot: string;
} {
  if (violations === null || violations === undefined)
    return { label: "Not scanned", color: "text-gray-400 dark:text-gray-600", dot: "bg-gray-300 dark:bg-gray-700" };
  if (violations === 0)
    return { label: "Perfect", color: "text-green-600 dark:text-green-400", dot: "bg-green-500" };
  if (violations <= 3)
    return { label: "Good", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" };
  if (violations <= 8)
    return { label: "Fair", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
  return { label: "Needs work", color: "text-red-600 dark:text-red-400", dot: "bg-red-500" };
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

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

  return (
    <div className="px-6 py-8 max-w-5xl">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Websites</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {sites.length === 0 ? "No sites yet" : `${sites.length} site${sites.length > 1 ? "s" : ""} connected`}
          </p>
        </div>
        <a
          href="/dashboard/sites/new"
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          New site
        </a>
      </div>

      {sites.length === 0 ? (
        /* Empty state */
        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-16 text-center">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600 dark:text-blue-400" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add your first site</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 leading-relaxed">
            Register your domain and get an embed snippet. Your accessibility widget goes live in under 5 minutes.
          </p>
          <a
            href="/dashboard/sites/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Add first site
          </a>
        </div>
      ) : (
        /* Card grid */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site) => {
            const score = getComplianceScore(site.widgetConfig?.lastScanViolations);
            const isLive = site.healthStatus === "healthy";
            const isDown = site.healthStatus === "degraded";

            return (
              <div
                key={site.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-4 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm transition-all"
              >
                {/* Top row: favicon + domain + health */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500 dark:text-gray-400" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{site.domain}</p>
                      {site.name !== site.domain && (
                        <p className="text-xs text-gray-400 dark:text-gray-600 truncate">{site.name}</p>
                      )}
                    </div>
                  </div>
                  {site.healthStatus && (
                    <span
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        isLive
                          ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                          : isDown
                          ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500" : isDown ? "bg-red-500" : "bg-gray-400"}`} />
                      {isLive ? "Live" : isDown ? "Offline" : "Checking"}
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 dark:text-gray-600 mb-0.5">Widget opens</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {site._count.widgetEvents.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <p className="text-xs text-gray-400 dark:text-gray-600 mb-0.5">WCAG score</p>
                    <p className={`text-sm font-bold flex items-center gap-1.5 mt-0.5 ${score.color}`}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${score.dot}`} />
                      {score.label}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    Added {site.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <a
                    href={`/dashboard/sites/${site.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Manage
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            );
          })}

          {/* Add new site card */}
          <a
            href="/dashboard/sites/new"
            className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all group min-h-[160px]"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600 dark:text-blue-400" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add new site</p>
              <p className="text-xs text-gray-400 dark:text-gray-600">Live in under 5 min</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
