import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function CheckIcon({ done }: { done: boolean }) {
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
        done ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      {done && (
        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7L5.5 10L11.5 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const sites = await db.site.findMany({
    where: { ownerId: session.user.id },
    include: {
      widgetConfig: true,
      _count: {
        select: {
          widgetEvents: { where: { createdAt: { gte: thirtyDaysAgo } } },
          widgetLoads: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const emailVerified = session.user.emailVerified;
  const hasSite = sites.length > 0;
  const widgetInstalled = sites.some((s) => s._count.widgetLoads > 0);
  const onboardingDone = emailVerified && hasSite && widgetInstalled;

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {!onboardingDone && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-blue-900 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Get started with Inculva
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Complete these steps to activate your accessibility widget.
          </p>

          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckIcon done={true} />
              <div>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-600 line-through">
                  Create your account
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckIcon done={!!emailVerified} />
              <div>
                <p className={`text-sm font-medium ${emailVerified ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-900 dark:text-white"}`}>
                  Verify your email address
                </p>
                {!emailVerified && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Check your inbox — we sent a link when you signed up.
                  </p>
                )}
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckIcon done={hasSite} />
              <div>
                <p className={`text-sm font-medium ${hasSite ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-900 dark:text-white"}`}>
                  Add your first site
                </p>
                {!hasSite && (
                  <a
                    href="/dashboard/sites/new"
                    className="inline-block mt-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add site →
                  </a>
                )}
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CheckIcon done={widgetInstalled} />
              <div>
                <p className={`text-sm font-medium ${widgetInstalled ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-900 dark:text-white"}`}>
                  Install the widget &amp; verify it&apos;s live
                </p>
                {!widgetInstalled && hasSite && (
                  <a
                    href={`/dashboard/sites/${sites[0]!.id}`}
                    className="inline-block mt-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Go to site settings → copy embed snippet
                  </a>
                )}
                {!widgetInstalled && !hasSite && (
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                    Available after you add a site.
                  </p>
                )}
              </div>
            </li>
          </ol>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Sites</h2>
        <a
          href="/dashboard/sites/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Add Site
        </a>
      </div>

      {sites.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No sites yet.</p>
          <a
            href="/dashboard/sites/new"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Add your first site →
          </a>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => {
            const eventCount = site._count.widgetEvents;
            const installed = site._count.widgetLoads > 0;
            return (
              <div
                key={site.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow"
              >
                <a href={`/dashboard/sites/${site.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {site.name}
                  </h3>
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{site.domain}</p>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  {installed ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300">
                      Not installed
                    </span>
                  )}
                  {site.healthStatus === "healthy" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Widget live
                    </span>
                  ) : site.healthStatus === "degraded" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      Widget offline
                    </span>
                  ) : null}
                  <span className="text-xs text-gray-400 dark:text-gray-600">
                    {site.widgetConfig?.theme ?? "auto"} theme
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-400 dark:text-gray-600">Last 30 days</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {eventCount.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-gray-400 dark:text-gray-600">events</span>
                  </p>
                </div>
                <div className="mt-4 flex gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <a
                    href={`/dashboard/sites/${site.id}`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Settings
                  </a>
                  <span className="text-gray-200 dark:text-gray-700">|</span>
                  <a
                    href={`/dashboard/sites/${site.id}/analytics`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Analytics
                  </a>
                  <span className="text-gray-200 dark:text-gray-700">|</span>
                  <a
                    href={`/dashboard/sites/${site.id}/scan`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    WCAG Scan
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
