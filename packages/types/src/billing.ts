export type Plan = "free" | "small" | "medium" | "large";

export type ScanFrequency = "monthly" | "weekly" | "daily";

export interface PlanLimits {
  pageviewsPerMonth: number; // 0 = no access (free plan)
  maxSites: number;
  // Scanning limits
  maxPagesPerScan: number;
  scanFrequency: ScanFrequency;
  maxScansPerDay: number;
  scanHistoryDays: number;
  pdfReports: boolean;
  aiFixSuggestions: boolean;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: { pageviewsPerMonth: 0, maxSites: 1, maxPagesPerScan: 5, scanFrequency: "monthly", maxScansPerDay: 3, scanHistoryDays: 30, pdfReports: false, aiFixSuggestions: false },
  small: { pageviewsPerMonth: 100_000, maxSites: 5, maxPagesPerScan: 25, scanFrequency: "weekly", maxScansPerDay: 50, scanHistoryDays: 90, pdfReports: true, aiFixSuggestions: false },
  medium: { pageviewsPerMonth: 300_000, maxSites: 10, maxPagesPerScan: 100, scanFrequency: "weekly", maxScansPerDay: 20, scanHistoryDays: 180, pdfReports: true, aiFixSuggestions: true },
  large: { pageviewsPerMonth: 1_000_000, maxSites: 25, maxPagesPerScan: 500, scanFrequency: "daily", maxScansPerDay: 50, scanHistoryDays: 365, pdfReports: true, aiFixSuggestions: true },
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
