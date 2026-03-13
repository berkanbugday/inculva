"use client";

import { useState } from "react";
import { PLAN_LIMITS } from "@inculva/types";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"]!;

const PLANS = {
  pro: {
    name: "Pro",
    month: { usd: 19, try: 599 },
    year: { usd: 190, try: 5990 },
    features: [
      "10 sites",
      "100,000 events / month",
      "Up to 5 team members",
      "Widget live preview",
      "Priority support",
    ],
  },
  business: {
    name: "Business",
    month: { usd: 49, try: 1499 },
    year: { usd: 490, try: 14990 },
    features: [
      "Unlimited sites",
      "Unlimited events",
      "Unlimited team members",
      "White-label widget",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
} as const;

export default function PricingPage() {
  const register = `${APP_URL}/register`;
  const [interval, setInterval] = useState<"month" | "year">("month");

  const proPrice = PLANS.pro[interval];
  const businessPrice = PLANS.business[interval];

  const monthlyEquiv = (annual: number) => Math.round(annual / 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <circle cx="12" cy="5" r="2.5"/>
                <path d="M12 9c-1.1 0-2 .9-2 2v4H7.5l-1.5 4h2l1-2.5H10v3h4v-3h1l1 2.5h2l-1.5-4H14V11c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            Inculva
          </a>
          <div className="flex items-center gap-3">
            <a href={`${APP_URL}/login`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Sign in</a>
            <a href={register} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Get started free
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Start free. Upgrade when you&apos;re ready.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setInterval("month")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                interval === "month"
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval("year")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                interval === "year"
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Annual
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-1.5 py-0.5 rounded-full">
                Save ~17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Free plan */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Free</h2>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-400 dark:text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Perfect for trying Inculva out.</p>
            </div>
            <ul className="space-y-2.5 mb-7">
              <PricingFeature text={`${PLAN_LIMITS.free.sites} site`} />
              <PricingFeature text={`${(PLAN_LIMITS.free.eventsPerMonth / 1000).toFixed(0)}k events / month`} />
              <PricingFeature text="Widget customization" />
              <PricingFeature text="Basic analytics" />
              <PricingFeatureMuted text="No team members" />
            </ul>
            <a
              href={register}
              className="block w-full py-2.5 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Get started
            </a>
          </div>

          {/* Pro */}
          <div className="bg-blue-600 border border-blue-600 text-white rounded-2xl p-7 relative shadow-xl shadow-blue-200 dark:shadow-blue-950">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Pro</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ${interval === "year" ? monthlyEquiv(proPrice.usd) : proPrice.usd}
                </span>
                <span className="text-blue-200 mb-1">/month</span>
              </div>
              {interval === "year" ? (
                <p className="text-blue-200 text-sm mt-1">
                  ${proPrice.usd}/year · ≈ ₺{proPrice.try.toLocaleString()} / yıl
                </p>
              ) : (
                <p className="text-blue-200 text-sm mt-1">≈ ₺{proPrice.try.toLocaleString()} / ay</p>
              )}
            </div>
            <ul className="space-y-2.5 mb-7">
              {PLANS.pro.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                  <span className="font-bold text-blue-200">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={register}
              className="block w-full py-2.5 text-center bg-white text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-medium transition-colors"
            >
              Start Pro
            </a>
          </div>

          {/* Business */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Business</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${interval === "year" ? monthlyEquiv(businessPrice.usd) : businessPrice.usd}
                </span>
                <span className="text-gray-400 dark:text-gray-500 mb-1">/month</span>
              </div>
              {interval === "year" ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ${businessPrice.usd}/year · ≈ ₺{businessPrice.try.toLocaleString()} / yıl
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ≈ ₺{businessPrice.try.toLocaleString()} / ay
                </p>
              )}
            </div>
            <ul className="space-y-2.5 mb-7">
              {PLANS.business.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={register}
              className="block w-full py-2.5 text-center bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-medium transition-colors"
            >
              Start Business
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-600 mt-10">
          All plans include SSL, GDPR-compliant data handling, and full widget feature set.{" "}
          {interval === "year" && (
            <span className="text-green-600 dark:text-green-400 font-medium">Annual plans are billed once per year. </span>
          )}
          Payments processed by <strong className="text-gray-500 dark:text-gray-500">LemonSqueezy</strong> — supports TRY, EUR, USD and 130+ currencies.
        </p>
      </main>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
      <span className="text-green-500 font-bold">✓</span>
      {text}
    </li>
  );
}

function PricingFeatureMuted({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600">
      <span className="font-bold">–</span>
      {text}
    </li>
  );
}
