import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { POLAR_PRODUCTS } from "@inculva/types";
import type { Plan } from "@inculva/types";
import { CancelSubscriptionButton } from "./cancel-button";
import { BillingPlanCards } from "./billing-plan-cards";
import { getFreeTrialEnd } from "@/lib/plan";
import { polar, isPolarConfigured } from "@/lib/polar";
import Link from "next/link";
import { redirect } from "next/navigation";

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  trialing: "Trial",
  past_due: "Payment overdue",
  canceled: "Canceled",
};

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ checkoutId?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  // Process checkout success — verify with Polar and update plan
  const { checkoutId } = await searchParams;
  if (checkoutId && isPolarConfigured()) {
    try {
      console.log("[billing] verifying checkoutId:", checkoutId);
      const checkout = await polar.checkouts.get({ id: checkoutId });
      console.log(
        "[billing] checkout status:",
        checkout.status,
        "productId:",
        checkout.productId,
      );
      if (checkout.status === "succeeded" || checkout.status === "confirmed") {
        const productId = checkout.productId ?? checkout.products?.[0]?.id;

        if (productId) {
          const product = POLAR_PRODUCTS.find(
            (p) => p.productId === productId && p.productId !== "",
          );
          if (product) {
            const plan = product.plan as Plan;
            const customerId = checkout.customerId;
            const now = new Date();
            const periodEnd = new Date(
              now.getTime() + 30 * 24 * 60 * 60 * 1000,
            );

            await db.$transaction([
              db.user.update({
                where: { id: userId },
                data: {
                  plan,
                  ...(customerId ? { polarCustomerId: customerId } : {}),
                },
              }),
              db.subscription.upsert({
                where: { userId },
                create: {
                  userId,
                  polarSubscriptionId: checkout.id,
                  polarProductId: productId,
                  plan,
                  interval: product.interval,
                  status: "active",
                  currentPeriodStart: now,
                  currentPeriodEnd: periodEnd,
                },
                update: {
                  polarProductId: productId,
                  plan,
                  interval: product.interval,
                  status: "active",
                  currentPeriodEnd: periodEnd,
                },
              }),
            ]);
          }
        }
      }
    } catch (err) {
      console.error("[billing] checkout verification error:", err);
    }
    // Redirect to clean URL regardless of outcome
    redirect("/dashboard/settings/billing");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  const plan = (user?.plan ?? "free") as Plan;
  const sub = user?.subscription;

  const planLabel: Record<Plan, string> = {
    free: "Free",
    small: "Small",
    medium: "Medium",
    large: "Large",
  };

  const renewalDate = sub
    ? new Date(sub.currentPeriodEnd).toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  // Free trial countdown
  const freeTrialEnd = plan === "free" ? await getFreeTrialEnd(userId) : null;
  const freeTrialDaysLeft = freeTrialEnd
    ? Math.max(
        0,
        Math.ceil(
          (freeTrialEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        ),
      )
    : null;
  const freeTrialActive = freeTrialDaysLeft !== null && freeTrialDaysLeft > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Billing
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your subscription and payment details
        </p>
      </div>

      {/* Current subscription */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-[#2a2a3e] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2a2a3e]">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Current subscription
          </p>
        </div>
        <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="5"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 9h16"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 13h3"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {planLabel[plan]} Plan
                {freeTrialActive && (
                  <span className="ml-2 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                    {freeTrialDaysLeft}d left
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {sub
                  ? sub.canceledAt
                    ? `Access until ${renewalDate}`
                    : `Renews ${renewalDate}`
                  : freeTrialActive
                  ? `Free trial — ${freeTrialDaysLeft} day${
                      freeTrialDaysLeft === 1 ? "" : "s"
                    } remaining`
                  : freeTrialEnd
                  ? "Free trial expired — subscribe to continue"
                  : "No active subscription"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {user?.polarCustomerId && (
              <Link
                href="/api/billing/customer-portal"
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              >
                Manage billing
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
            {sub?.status === "active" && !sub.canceledAt && (
              <CancelSubscriptionButton renewalDate={renewalDate} />
            )}
          </div>
        </div>

        {sub && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-[#0e0e10] border-t border-gray-100 dark:border-[#2a2a3e] flex flex-wrap gap-x-8 gap-y-1 bg-white">
            {[
              [
                "Status",
                sub.canceledAt
                  ? "Canceling"
                  : STATUS_LABEL[sub.status] ?? sub.status,
              ],
              ["Billing", sub.interval === "year" ? "Annual" : "Monthly"],
              [
                "Period start",
                new Date(sub.currentPeriodStart).toLocaleDateString("en-GB"),
              ],
            ].map(([label, value]) => (
              <p
                key={label}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {label}:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {value}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Expired trial warning */}
      {freeTrialEnd && !freeTrialActive && plan === "free" && (
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path
              d="M10 2L2 17h16L10 2z"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M10 8v4M10 14.5v.5"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Your free trial has ended
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              Subscribe to a plan below to continue using the accessibility
              widget on your sites.
            </p>
          </div>
        </div>
      )}

      {/* Plan picker */}
      {plan !== "large" && (
        <BillingPlanCards products={POLAR_PRODUCTS} currentPlan={plan} />
      )}
    </div>
  );
}
