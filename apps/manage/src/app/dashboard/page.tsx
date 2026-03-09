import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function getComplianceScore(violations: number | null | undefined): { label: string; color: string } {
  if (violations === null || violations === undefined) return { label: "Not scanned", color: "text-gray-400" };
  if (violations === 0) return { label: "100 — Perfect", color: "text-green-600" };
  if (violations <= 3) return { label: `${Math.max(70, 100 - violations * 10)} — Good`, color: "text-blue-600" };
  if (violations <= 8) return { label: `${Math.max(40, 100 - violations * 7)} — Fair`, color: "text-amber-600" };
  return { label: `${Math.max(10, 100 - violations * 5)} — Needs work`, color: "text-red-600" };
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
    <div className="px-8 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Websites</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
        {sites.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No sites yet.</p>
            <a
              href="/dashboard/sites/new"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Add new site +
            </a>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 dark:text-gray-600 w-10">#</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">URL</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">Widget Opens</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">Compliance Score</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 dark:text-gray-600">License start date</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {sites.map((site, i) => (
                <tr
                  key={site.id}
                  className="border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 text-gray-400 dark:text-gray-600 text-xs">{i + 1}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-gray-900 dark:text-white">{site.domain}</p>
                    {site.name !== site.domain && (
                      <p className="text-xs text-gray-400 mt-0.5">{site.name}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-xs">
                    {site._count.widgetEvents.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-xs">
                    {(() => {
                      const score = getComplianceScore(site.widgetConfig?.lastScanViolations);
                      return <span className={score.color}>{score.label}</span>;
                    })()}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 text-xs">
                    {site.createdAt.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={`/dashboard/sites/${site.id}`}
                      className="inline-flex items-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors"
                    >
                      Manage widget
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
