import { db } from "@inculva/db";
import { cookies } from "next/headers";
import { SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";
import { AdminUserActions } from "./user-actions";

export const metadata = { title: "Admin — inculva" };

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersByPlan,
    totalSites,
    totalEvents,
    eventsThisMonth,
    activeSubscriptions,
    recentUsers,
    recentSubscriptions,
  ] = await Promise.all([
    db.user.count(),
    db.user.groupBy({ by: ["plan"], _count: { _all: true } }),
    db.site.count(),
    db.widgetEvent.count(),
    db.widgetEvent.count({ where: { createdAt: { gte: startOfMonth } } }),
    db.subscription.count({ where: { status: "active" } }),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
        emailVerified: true,
      },
    }),
    db.subscription.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const planCounts: Record<string, number> = {
    free: 0,
    small: 0,
    medium: 0,
    large: 0,
  };
  for (const row of usersByPlan) {
    planCounts[row.plan] = row._count._all;
  }

  const [smMonth, smYear, mdMonth, mdYear, lgMonth, lgYear] = await Promise.all(
    [
      db.subscription.count({
        where: { plan: "small", interval: "month", status: "active" },
      }),
      db.subscription.count({
        where: { plan: "small", interval: "year", status: "active" },
      }),
      db.subscription.count({
        where: { plan: "medium", interval: "month", status: "active" },
      }),
      db.subscription.count({
        where: { plan: "medium", interval: "year", status: "active" },
      }),
      db.subscription.count({
        where: { plan: "large", interval: "month", status: "active" },
      }),
      db.subscription.count({
        where: { plan: "large", interval: "year", status: "active" },
      }),
    ],
  );
  const mrr = Math.round(
    smMonth * 39 +
      smYear * (375 / 12) +
      mdMonth * 59 +
      mdYear * (566 / 12) +
      lgMonth * 119 +
      lgYear * (1133 / 12),
  );

  return {
    totalUsers,
    planCounts,
    totalSites,
    totalEvents,
    eventsThisMonth,
    activeSubscriptions,
    mrr,
    recentUsers,
    recentSubscriptions,
  };
}

export default async function AdminPage() {
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale: Locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const stats = await getStats();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold rounded-full uppercase tracking-wide">
          Admin
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
        />
        <StatCard
          label="Total Sites"
          value={stats.totalSites.toLocaleString()}
        />
        <StatCard
          label="Active Subscriptions"
          value={stats.activeSubscriptions.toLocaleString()}
        />
        <StatCard
          label="MRR (est.)"
          value={`$${stats.mrr.toLocaleString()}`}
          highlight
        />
      </div>

      {/* Events */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="Events This Month"
          value={stats.eventsThisMonth.toLocaleString()}
        />
        <StatCard
          label="Total Events (all time)"
          value={stats.totalEvents.toLocaleString()}
        />
      </div>

      {/* Plan distribution */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Users by Plan
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {(["free", "small", "medium", "large"] as const).map((plan) => {
            const count = stats.planCounts[plan] ?? 0;
            const pct =
              stats.totalUsers > 0
                ? Math.round((count / stats.totalUsers) * 100)
                : 0;
            const colors: Record<string, string> = {
              free: "bg-gray-200 dark:bg-gray-700",
              small: "bg-blue-400",
              medium: "bg-blue-600",
              large: "bg-indigo-600",
            };
            return (
              <div key={plan} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {plan}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colors[plan]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-600">
                  {pct}% of users
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent users */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Recent Signups
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  User
                </th>
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Plan
                </th>
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Verified
                </th>
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Joined
                </th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {stats.recentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name ?? "—"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </td>
                  <td className="py-2.5 pr-4">
                    <PlanBadge plan={user.plan} />
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`text-xs font-medium ${
                        user.emailVerified
                          ? "text-green-600 dark:text-green-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {user.emailVerified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2.5">
                    <AdminUserActions
                      userId={user.id}
                      currentPlan={user.plan}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent subscriptions */}
      {stats.recentSubscriptions.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Recent Subscriptions (30 days)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    User
                  </th>
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Plan
                  </th>
                  <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Renews
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {stats.recentSubscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-2.5 pr-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {sub.user.name ?? "—"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {sub.user.email}
                      </p>
                    </td>
                    <td className="py-2.5 pr-4">
                      <PlanBadge plan={sub.plan} />
                    </td>
                    <td className="py-2.5 pr-4">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="py-2.5 text-gray-500 dark:text-gray-400">
                      {new Date(sub.currentPeriodEnd).toLocaleDateString(
                        locale,
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-wide mb-1 ${
          highlight ? "text-blue-200" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-white" : "text-gray-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    free: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    small: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    medium: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    large:
      "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
        styles[plan] ?? styles["free"]
      }`}
    >
      {plan}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    canceled: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    past_due:
      "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
    paused: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
        styles[status] ?? styles["paused"]
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
