export type Plan = "free" | "small" | "medium" | "large";

export interface PlanLimits {
  pageviewsPerMonth: number; // 0 = no access (free plan)
  maxSites: number;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free:   { pageviewsPerMonth: 0,          maxSites: 1 },
  small:  { pageviewsPerMonth: 100_000,    maxSites: 5 },
  medium: { pageviewsPerMonth: 300_000,    maxSites: 10 },
  large:  { pageviewsPerMonth: 1_000_000,  maxSites: 25 },
};

export interface PolarProduct {
  productId: string;
  plan: Plan;
  name: string;
  price: { usd: number };
  interval: "month" | "year";
  features: string[];
}

const smallFeatures = [
  "Up to 100,000 pageviews/mo",
  "Up to 5 websites",
  "Full WCAG 2.1 AA & AAA scanning",
  "Automated auto-fixes",
  "Real-time monitoring",
  "7-day free trial",
];

const mediumFeatures = [
  "Up to 300,000 pageviews/mo",
  "Up to 10 websites",
  "Full WCAG 2.1 AA & AAA scanning",
  "Automated auto-fixes",
  "Real-time monitoring",
  "Priority email support",
  "7-day free trial",
];

const largeFeatures = [
  "Up to 1,000,000 pageviews/mo",
  "Up to 25 websites",
  "Full WCAG 2.1 AA & AAA scanning",
  "Automated auto-fixes",
  "Continuous monitoring",
  "Auto page translation (41+ languages)",
  "Custom branding",
  "Priority support (phone & email)",
  "7-day free trial",
];

export const POLAR_PRODUCTS: PolarProduct[] = [
  {
    productId: process.env["POLAR_SMALL_MONTHLY_PRODUCT_ID"] ?? "",
    plan: "small",
    name: "Small",
    price: { usd: 39 },
    interval: "month",
    features: smallFeatures,
  },
  {
    productId: process.env["POLAR_SMALL_ANNUAL_PRODUCT_ID"] ?? "",
    plan: "small",
    name: "Small",
    price: { usd: 375 },
    interval: "year",
    features: smallFeatures,
  },
  {
    productId: process.env["POLAR_MEDIUM_MONTHLY_PRODUCT_ID"] ?? "",
    plan: "medium",
    name: "Medium",
    price: { usd: 59 },
    interval: "month",
    features: mediumFeatures,
  },
  {
    productId: process.env["POLAR_MEDIUM_ANNUAL_PRODUCT_ID"] ?? "",
    plan: "medium",
    name: "Medium",
    price: { usd: 566 },
    interval: "year",
    features: mediumFeatures,
  },
  {
    productId: process.env["POLAR_LARGE_MONTHLY_PRODUCT_ID"] ?? "",
    plan: "large",
    name: "Large",
    price: { usd: 119 },
    interval: "month",
    features: largeFeatures,
  },
  {
    productId: process.env["POLAR_LARGE_ANNUAL_PRODUCT_ID"] ?? "",
    plan: "large",
    name: "Large",
    price: { usd: 1133 },
    interval: "year",
    features: largeFeatures,
  },
];
