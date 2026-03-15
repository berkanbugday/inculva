import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { LS_PRODUCTS } from "@inculva/types";
import type { Plan } from "@inculva/types";
import { CancelSubscriptionButton } from "./cancel-button";
import { PlanCheckoutButton } from "./plan-checkout-button";

export default async function BillingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  const plan = (user?.plan ?? "free") as Plan;
  const sub = user?.subscription;

  const planLabel: Record<Plan, string> = {
    free: "Free Trial",
    pro: "Pro",
    business: "Business",
  };

  const proMonthly = LS_PRODUCTS.find((p) => p.plan === "pro" && p.interval === "month");
  const proAnnual = LS_PRODUCTS.find((p) => p.plan === "pro" && p.interval === "year");
  const bizMonthly = LS_PRODUCTS.find((p) => p.plan === "business" && p.interval === "month");

  const allPlanFeatures = [
    "Automatic updates",
    "Icon customization",
    "Widget color customization",
    "No feature limits",
    "No usage limits",
    "Mobile responsive",
    "Over 40 languages",
    "Sustainability mode",
    "Keyboard control",
    "Back-end dashboard",
    "Accessibility profiles",
    "Usage Statistics",
    "Section 508 compliance",
    "WCAG 2.1 AA compliance",
    "ADA compliance",
    "Unlimited user session",
    "24/7 support",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">Subscriptions</h1>

      {/* Current plan status */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Your current plan and status
        </h2>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Current Plan: </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{planLabel[plan]}</span>
            </p>
            {sub ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Status: <span className="font-medium capitalize">{sub.status}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">No active subscription</p>
            )}
            {sub?.status === "active" && (
              <CancelSubscriptionButton
                renewalDate={new Date(sub.currentPeriodEnd).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              />
            )}
          </div>
          <div className="text-sm text-right">
            {sub ? (
              <>
                <p className="text-gray-500 dark:text-gray-400">
                  Start date:{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {new Date(sub.currentPeriodStart).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Next payment date:{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {new Date(sub.currentPeriodEnd).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-400 dark:text-gray-600">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Discount code */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-5 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">Enter discount code</h3>
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Plan cards */}
      {plan !== "business" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Monthly plan */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
            <p className="font-semibold text-gray-900 dark:text-white">Monthly plan</p>
            <p className="text-xs text-gray-400 mt-0.5 mb-4">Billed monthly</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-0.5">
              ${proMonthly?.price.usd ?? 19}
              <span className="text-base font-normal text-gray-500"> / month</span>
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Billed monthly ${proMonthly?.price.usd ?? 19}
            </p>
            <PlanCheckoutButton variantId={proMonthly?.variantId ?? ""} label="Continue" />
          </div>

          {/* Annual plan – highlighted */}
          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl shadow-sm p-6 relative overflow-hidden">
            <p className="font-semibold text-white">Annual Plan</p>
            <p className="text-xs text-gray-400 mt-0.5 mb-4">17% off the monthly plan</p>
            <p className="text-3xl font-bold text-white mb-0.5">
              ${proAnnual ? Math.round(proAnnual.price.usd / 12) : 16}
              <span className="text-base font-normal text-gray-400"> / month</span>
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Billed as one payment of ${proAnnual?.price.usd ?? 190}
            </p>
            <PlanCheckoutButton variantId={proAnnual?.variantId ?? ""} label="Continue" />
          </div>

          {/* Business plan */}
          <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
            <p className="font-semibold text-gray-900 dark:text-white">Business Plan</p>
            <p className="text-xs text-gray-400 mt-0.5 mb-4">35% off the monthly plan</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-0.5">
              ${bizMonthly?.price.usd ?? 49}
              <span className="text-base font-normal text-gray-500"> / month</span>
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Billed monthly ${bizMonthly?.price.usd ?? 49}
            </p>
            <PlanCheckoutButton variantId={bizMonthly?.variantId ?? ""} label="Continue" />
          </div>
        </div>
      )}

      {/* Info text */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
          Subscription plans are structured based on your website&apos;s monthly traffic. Events and usage limits vary by plan — upgrade to unlock higher limits and additional features for your accessibility widget.
        </p>
      </div>

      {/* All plans include */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 text-center mb-5">
          All plans include
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2.5">
          {allPlanFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-blue-600 dark:text-blue-400">
                <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
                <path d="M4.5 8l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
