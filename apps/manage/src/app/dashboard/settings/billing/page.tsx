import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { PLAN_LIMITS, LS_PRODUCTS } from "@inculva/types";
import type { Plan } from "@inculva/types";
import { CancelSubscriptionButton } from "./cancel-button";
import { UpgradeButton } from "./upgrade-button";

export default async function BillingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  const plan = (user?.plan ?? "free") as Plan;
  const limits = PLAN_LIMITS[plan];
  const sub = user?.subscription;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [siteCount, eventCount] = await Promise.all([
    db.site.count({ where: { ownerId: userId } }),
    db.widgetEvent.count({
      where: { site: { ownerId: userId }, createdAt: { gte: startOfMonth } },
    }),
  ]);

  const planLabel: Record<Plan, string> = {
    free: "Free",
    pro: "Pro",
    business: "Business",
  };

  function usagePercent(used: number, limit: number): number {
    if (limit === Infinity) return 0;
    return Math.min(100, Math.round((used / limit) * 100));
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and API access.</p>
      </div>

      {/* Settings sub-nav */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <a
          href="/dashboard/settings"
          className="px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
        >
          Account
        </a>
        <span className="px-4 py-1.5 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white shadow-sm">
          Billing
        </span>
      </div>

      {/* Current plan */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Current Plan</h3>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
            {planLabel[plan]}
          </span>
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <UsageBar
            label="Sites"
            used={siteCount}
            limit={limits.sites}
            percent={usagePercent(siteCount, limits.sites)}
          />
          <UsageBar
            label="Events this month"
            used={eventCount}
            limit={limits.eventsPerMonth}
            percent={usagePercent(eventCount, limits.eventsPerMonth)}
          />
          {limits.eventsPerMonth !== Infinity && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Quota resets at UTC midnight on the 1st of each month.
            </p>
          )}
        </div>

        {sub && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 space-y-3">
            <div className="space-y-1">
              <p>Status: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{sub.status}</span></p>
              <p>
                {sub.status === "canceled" ? "Ends:" : "Renews:"}{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {new Date(sub.currentPeriodEnd).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {sub.lsCustomerPortalUrl && (
                <a
                  href={sub.lsCustomerPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Manage billing →
                </a>
              )}
              {sub.status === "active" && (
                <CancelSubscriptionButton
                  renewalDate={new Date(sub.currentPeriodEnd).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                />
              )}
            </div>
          </div>
        )}

        {plan === "free" && (
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <a
              href="/dashboard/settings/billing"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Upgrade plan →
            </a>
          </div>
        )}
      </div>

      {/* Plan comparison quick view */}
      {plan !== "business" && (() => {
        const targetPlan = plan === "free" ? "pro" : "business";
        const monthly = LS_PRODUCTS.find((p) => p.plan === targetPlan && p.interval === "month");
        const annual = LS_PRODUCTS.find((p) => p.plan === targetPlan && p.interval === "year");
        if (!monthly) return null;
        return (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl border border-blue-100 dark:border-blue-900 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {plan === "free" ? "Unlock more with Pro" : "Go further with Business"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {plan === "free"
                ? "Up to 10 sites, 100k events/month, and team collaboration."
                : "Unlimited everything, white-label widget, and dedicated support."}
            </p>
            <UpgradeButton
              monthlyVariantId={monthly.variantId}
              annualVariantId={annual?.variantId ?? ""}
              planName={monthly.name}
              monthlyUsd={monthly.price.usd}
              annualUsd={annual?.price.usd ?? monthly.price.usd * 12}
            />
          </div>
        );
      })()}
    </main>
  );
}

function UsageBar({
  label,
  used,
  limit,
  percent,
}: {
  label: string;
  used: number;
  limit: number;
  percent: number;
}) {
  const isUnlimited = limit === Infinity;
  const isOverLimit = !isUnlimited && used > limit;
  const isNearLimit = !isOverLimit && percent >= 80;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {used.toLocaleString()} / {isUnlimited ? "∞" : limit.toLocaleString()}
          </span>
          {isOverLimit && (
            <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs font-semibold rounded">
              OVER LIMIT
            </span>
          )}
        </div>
      </div>
      {!isUnlimited && (
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isOverLimit ? "bg-red-500" : isNearLimit ? "bg-amber-500" : "bg-blue-500"
            }`}
            style={{ width: isOverLimit ? "100%" : `${percent}%` }}
          />
        </div>
      )}
      {isOverLimit && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
          New events are being dropped. Upgrade to restore tracking.
        </p>
      )}
    </div>
  );
}
