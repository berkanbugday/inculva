"use client";

import { useState } from "react";
import { FadeUp } from "./motion";

const plans = [
  {
    name: "Free",
    usdMonth: 0,
    usdYear: 0,
    desc: "Try Inculva with no commitment.",
    features: [
      "1 site",
      "10,000 events / month",
      "All 25 widget features",
      "Basic analytics",
    ],
    missing: ["Team members", "Expert review"],
    cta: "Get started free",
    variant: "gray" as const,
  },
  {
    name: "Pro",
    usdMonth: 19,
    usdYear: 190,
    desc: "For teams that need more.",
    features: [
      "10 sites",
      "100,000 events / month",
      "Up to 5 team members",
      "Advanced analytics + CSV export",
      "Expert configuration review",
      "Priority support",
    ],
    missing: [],
    cta: "Start Pro",
    variant: "blue" as const,
    popular: true,
  },
  {
    name: "Business",
    usdMonth: 49,
    usdYear: 490,
    desc: "For agencies and enterprises.",
    features: [
      "Unlimited sites",
      "Unlimited events",
      "Unlimited team members",
      "White-label widget",
      "Dedicated accessibility specialist",
      "SLA guarantee",
    ],
    missing: [],
    cta: "Start Business",
    variant: "dark" as const,
  },
];

export function Pricing({ appUrl }: { appUrl: string }) {
  const [billing, setBilling] = useState<"month" | "year">("month");
  const register = `${appUrl}/register`;

  return (
    <section id="pricing" className="px-8 py-28">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-5">
              Simple, honest pricing.
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
              Start free. Upgrade when you're ready.
            </p>
            <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5">
              {(["month", "year"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    billing === b
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {b === "month" ? "Monthly" : "Annual"}
                  {b === "year" && plans.length > 1 && (
                    <span className="text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-400 px-2 py-0.5 rounded-full">
                      Save 17%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan) => {
              const price =
                plan.usdMonth === 0
                  ? 0
                  : billing === "year"
                    ? Math.round(plan.usdYear / 12)
                    : plan.usdMonth;
              const isBlue = plan.variant === "blue";
              const isDark = plan.variant === "dark";

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-8 ${
                    isBlue
                      ? "bg-blue-600 border-blue-600"
                      : isDark
                        ? "bg-gray-900 border-gray-700"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1.5 rounded-full">
                        Most popular
                      </span>
                    </div>
                  )}

                  <p
                    className={`text-xl font-bold mb-1 ${isBlue || isDark ? "text-white" : "text-gray-900 dark:text-white"}`}
                  >
                    {plan.name}
                  </p>
                  <p
                    className={`text-base mb-6 ${isBlue ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}
                  >
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span
                      className={`text-4xl font-bold ${isBlue || isDark ? "text-white" : "text-gray-900 dark:text-white"}`}
                    >
                      ${price}
                    </span>
                    <span
                      className={`text-base ${isBlue ? "text-blue-200" : "text-gray-400"}`}
                    >
                      /mo
                    </span>
                    {billing === "year" && plan.usdMonth > 0 && (
                      <span
                        className={`text-sm ml-1 ${isBlue ? "text-blue-200" : "text-gray-400"}`}
                      >
                        billed ${plan.usdYear}/yr
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm ${
                          isBlue
                            ? "text-blue-100"
                            : isDark
                              ? "text-gray-300"
                              : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span
                          className={`font-bold mt-px ${isBlue ? "text-blue-300" : "text-green-500"}`}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                    {plan.missing.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm ${isBlue ? "text-blue-400/60" : "text-gray-400 dark:text-gray-600"}`}
                      >
                        <span className="mt-px">–</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={register}
                    className={`block w-full py-3 text-center rounded-xl text-sm font-bold transition-colors ${
                      isBlue
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-center text-base text-gray-400 dark:text-gray-600 mt-10">
            All plans include SSL, GDPR-compliant data handling, and all 25
            widget features. Payments by LemonSqueezy — supports USD, EUR, TRY,
            and 130+ currencies.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
