"use client";

import { useState } from "react";
import { PlanCheckoutButton } from "./plan-checkout-button";
import type { PolarProduct, Plan } from "@inculva/types";
import { useMessages } from "@/i18n/useMessages";

export function BillingPlanCards({
  products,
  currentPlan,
}: {
  products: PolarProduct[];
  currentPlan: Plan;
}) {
  const t = useMessages();
  const [interval, setInterval] = useState<"month" | "year">("month");
  const shown = products.filter((p) => p.interval === interval);

  const PLAN_DESC: Record<string, string> = {
    small: t.billing.planSmallDesc,
    medium: t.billing.planMediumDesc,
    large: t.billing.planLargeDesc,
  };

  const PLAN_NAME: Record<string, string> = {
    free: t.billing.planNameFree,
    small: t.billing.planNameSmall,
    medium: t.billing.planNameMedium,
    large: t.billing.planNameLarge,
  };

  const FEATURE_MAP: Record<string, string[]> = {
    small: [
      t.billing.featurePageviews.replace("{count}", "100,000"),
      t.billing.featureWebsites.replace("{count}", "5"),
      t.billing.featureWcagScan,
      t.billing.featureAutoFixes,
      t.billing.featureRealTimeMonitoring,
      t.billing.featureFreeTrial,
    ],
    medium: [
      t.billing.featurePageviews.replace("{count}", "300,000"),
      t.billing.featureWebsites.replace("{count}", "10"),
      t.billing.featureWcagScan,
      t.billing.featureAutoFixes,
      t.billing.featureRealTimeMonitoring,
      t.billing.featurePriorityEmail,
      t.billing.featureFreeTrial,
    ],
    large: [
      t.billing.featurePageviews.replace("{count}", "1,000,000"),
      t.billing.featureWebsites.replace("{count}", "25"),
      t.billing.featureWcagScan,
      t.billing.featureAutoFixes,
      t.billing.featureContinuousMonitoring,
      t.billing.featureAutoTranslation,
      t.billing.featureCustomBranding,
      t.billing.featurePriorityPhoneEmail,
      t.billing.featureFreeTrial,
    ],
  };

  // Monthly prices for savings calculation
  const monthlyPrice: Record<string, number> = {};
  for (const p of products) {
    if (p.interval === "month") monthlyPrice[p.plan] = p.price.usd;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            {t.billing.choosePlan}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t.billing.choosePlanDesc}
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-[#2a2a3e] rounded-xl">
          {(["month", "year"] as const).map((iv) => (
            <button
              key={iv}
              onClick={() => setInterval(iv)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                interval === iv
                  ? "bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {iv === "month"
                ? t.billing.intervalMonthly
                : t.billing.intervalYearly}
              {iv === "year" && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full">
                  -20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
        {shown.map((product) => {
          const popular = product.plan === "medium";
          const current = product.plan === currentPlan;
          const monthly = monthlyPrice[product.plan] ?? 0;
          const annualTotal = Math.round(monthly * 12 * 0.8);
          const savings =
            interval === "year" && monthly ? monthly * 12 - annualTotal : 0;

          return (
            <div
              key={`${product.plan}-${product.interval}`}
              className={`relative flex flex-col rounded-2xl border p-8 bg-white dark:bg-[#1a1a2e] ${
                popular
                  ? "border-blue-600 shadow-lg shadow-blue-100 dark:shadow-blue-950/40 scale-105 z-10"
                  : "border-gray-200 dark:border-[#2a2a3e]"
              }`}
            >
              {popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  {t.billing.mostPopular}
                </span>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {PLAN_NAME[product.plan] ?? product.name}
                  </p>
                  {current && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                      {t.billing.currentBadge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {PLAN_DESC[product.plan]}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {interval === "year" ? (
                  <>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${annualTotal}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                        {t.billing.perYear}
                      </span>
                    </p>
                    {savings > 0 && (
                      <span className="inline-block mt-2 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950 px-2 py-0.5 rounded-full">
                        {t.billing.save} ${savings}
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${product.price.usd}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                      {t.billing.perMonth}
                    </span>
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {(FEATURE_MAP[product.plan] ?? product.features).map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-blue-500 mt-0.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {current ? (
                <div className="py-3 text-center text-sm font-semibold rounded-full bg-gray-100 dark:bg-[#2a2a3e] text-gray-400 dark:text-gray-500">
                  {t.billing.currentPlan}
                </div>
              ) : (
                <PlanCheckoutButton
                  productId={product.productId}
                  label={t.billing.getStarted}
                  popular={popular}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
