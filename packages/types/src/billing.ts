export type Plan = "free" | "pro" | "business";

export interface PlanLimits {
  sites: number;        // max sites (Infinity = unlimited)
  eventsPerMonth: number;
  teamMembers: number;  // max team members per team
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    sites: 1,
    eventsPerMonth: 10_000,
    teamMembers: 0, // no teams on free
  },
  pro: {
    sites: 10,
    eventsPerMonth: 100_000,
    teamMembers: 5,
  },
  business: {
    sites: Infinity,
    eventsPerMonth: Infinity,
    teamMembers: Infinity,
  },
};

export interface LsProduct {
  variantId: string;   // LemonSqueezy variant ID
  plan: Plan;
  name: string;
  price: { usd: number; try: number };
  interval: "month" | "year";
  features: string[];
}

export const LS_PRODUCTS: LsProduct[] = [
  {
    variantId: process.env["LS_PRO_VARIANT_ID"] ?? "",
    plan: "pro",
    name: "Pro",
    price: { usd: 19, try: 599 },
    interval: "month",
    features: [
      "10 sites",
      "100,000 events / month",
      "Up to 5 team members",
      "Widget live preview",
      "Priority support",
    ],
  },
  {
    variantId: process.env["LS_PRO_ANNUAL_VARIANT_ID"] ?? "",
    plan: "pro",
    name: "Pro",
    price: { usd: 190, try: 5990 },
    interval: "year",
    features: [
      "10 sites",
      "100,000 events / month",
      "Up to 5 team members",
      "Widget live preview",
      "Priority support",
    ],
  },
  {
    variantId: process.env["LS_BUSINESS_VARIANT_ID"] ?? "",
    plan: "business",
    name: "Business",
    price: { usd: 49, try: 1499 },
    interval: "month",
    features: [
      "Unlimited sites",
      "Unlimited events",
      "Unlimited team members",
      "White-label widget",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
  {
    variantId: process.env["LS_BUSINESS_ANNUAL_VARIANT_ID"] ?? "",
    plan: "business",
    name: "Business",
    price: { usd: 490, try: 14990 },
    interval: "year",
    features: [
      "Unlimited sites",
      "Unlimited events",
      "Unlimited team members",
      "White-label widget",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];
