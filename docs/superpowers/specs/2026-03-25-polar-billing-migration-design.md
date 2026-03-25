# Polar.sh Billing Migration Design

**Date:** 2026-03-25
**Status:** Approved

---

## Context

Inculva's manage app currently uses Lemon Squeezy for subscription billing. The product is an accessibility widget with three subscription tiers (Small, Medium, Large). The goal is to migrate entirely to Polar.sh — a Merchant of Record platform with a TypeScript SDK and official Next.js adapter — removing all Lemon Squeezy dependencies. No existing paid subscribers, so a clean cutover is safe.

Polar handles tax compliance (EU VAT, UK VAT, US Sales Tax) automatically as MoR, which removes a compliance burden going forward.

---

## Plans (Source of Truth: Landing Page)

| Plan   | Monthly | Annual (20% off) |
|--------|---------|-----------------|
| Small  | $39     | $375/yr         |
| Medium | $59     | $566/yr         |
| Large  | $119    | $1,133/yr       |

All plans include a 7-day free trial. During trial, `user.plan` is set to the trial tier immediately so the user can access plan features.

---

## Architecture

### Payment Flow

```
User clicks Upgrade (productId as query param)
        ↓
GET /api/billing/checkout?productId=POLAR_PRODUCT_ID
        ↓  (Polar Next.js adapter Checkout handler)
Redirect → polar.sh/checkout/...?metadata[userId]=...
        ↓
User enters payment info → starts 7-day trial
        ↓
Polar webhook: subscription.created (status: "trialing")
        → Set user.plan = tier, create Subscription record, send welcome email
        ↓
After trial: Polar webhook: subscription.active
        → Confirm user.plan (no-op if already set), send plan upgraded email
        ↓
User pays successfully → Polar webhook: subscription.updated (status: "active")
```

### Cancellation Flow (End-of-Period)

```
User clicks Cancel
        ↓
POST /api/billing/cancel-subscription
        ↓
polar.subscriptions.update({ id: polarSubscriptionId, subscriptionUpdate: { cancelAtPeriodEnd: true } })
  (schedules cancellation at period end; user retains access)
        ↓
Optimistic DB update: add canceledAt timestamp, keep status "active"
        ↓
Polar webhook: subscription.canceled
  → Set canceledAt, keep status "active" (access continues to period end)
        ↓
Later: Polar webhook: subscription.revoked
  → Set user.plan = "free", status = "canceled" (access ends)
```

**Note:** `polar.subscriptions.update({ cancelAtPeriodEnd: true })` schedules end-of-period cancellation (keeps access). `polar.subscriptions.revoke()` is for immediate termination (account deletion). The webhook `subscription.revoked` fires when access actually ends.

### Customer Portal Flow

```
User clicks "Manage Billing"
        ↓
GET /api/billing/customer-portal
        ↓
polar.customerSessions.create({ customerId: user.polarCustomerId })
        ↓
Return { url } → redirect to pre-authenticated portal
```

---

## Database Changes

**File:** `packages/db/prisma/schema.prisma`

### User model

| Before | After |
|--------|-------|
| `lsCustomerId String? @unique` | `polarCustomerId String? @unique` |
| `plan: "free"\|"pro"\|"business"` | `plan: "free"\|"small"\|"medium"\|"large"` |

### Subscription model

| Before | After |
|--------|-------|
| `lsSubscriptionId String @unique` | `polarSubscriptionId String @unique` |
| `lsVariantId String` | `polarProductId String` |
| `lsCustomerPortalUrl String?` | *(removed — generated dynamically)* |
| *(missing)* | `interval String` — `"month"` or `"year"` |

**New field:** `interval` must be stored to distinguish monthly/annual subscribers for correct MRR calculation and billing UI display.

**Prisma migration required.** One migration file: renames `ls*` fields to `polar*`, adds `interval`, drops `lsCustomerPortalUrl`.

---

## Types Package

**File:** `packages/types/src/billing.ts`

```typescript
// Plan type — aligned to landing page naming
export type Plan = "free" | "small" | "medium" | "large";

export interface PlanLimits {
  pageviewsPerMonth: number;  // 0 = no access (free)
  teamMembers: number;        // 0 = solo only
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free:   { pageviewsPerMonth: 0,          teamMembers: 0         },
  small:  { pageviewsPerMonth: 100_000,    teamMembers: 0         },
  medium: { pageviewsPerMonth: 300_000,    teamMembers: 5         },
  large:  { pageviewsPerMonth: 1_000_000,  teamMembers: Infinity  },
};

// Product config
export interface PolarProduct {
  productId: string;  // populated from env vars at runtime
  plan: Plan;
  name: string;
  price: { usd: number };
  interval: "month" | "year";
  features: string[];
}

export const POLAR_PRODUCTS: PolarProduct[] = [
  { plan: "small",  interval: "month", price: { usd: 39   }, name: "Small",  features: [...] },
  { plan: "small",  interval: "year",  price: { usd: 375  }, name: "Small",  features: [...] },
  { plan: "medium", interval: "month", price: { usd: 59   }, name: "Medium", features: [...] },
  { plan: "medium", interval: "year",  price: { usd: 566  }, name: "Medium", features: [...] },
  { plan: "large",  interval: "month", price: { usd: 119  }, name: "Large",  features: [...] },
  { plan: "large",  interval: "year",  price: { usd: 1133 }, name: "Large",  features: [...] },
];
```

---

## Plan Enforcement (`apps/manage/src/lib/plan.ts`)

`PlanLimits` interface changes from `sites`/`eventsPerMonth` to `pageviewsPerMonth`/`teamMembers`. Update:

- `canCreateSite()` → remove sites-based gating (Small/Medium/Large all allow sites). Gate on `plan === "free"` instead.
- `canTrackEvent()` → change from `eventsPerMonth` check to `pageviewsPerMonth` check.

---

## Plan Feature Gating — All Files with Hardcoded "business" / "pro"

These files check `user.plan === "business"` or `user.plan === "pro"` and must be updated to use the new plan names. Replace `=== "business"` with `=== "large"` and `=== "pro"` with `=== "small" || user.plan === "medium"` (or the appropriate tier).

| File | What to update |
|------|----------------|
| `apps/manage/src/app/api/sites/[id]/config/route.ts` | `=== "business"` → `=== "large"` |
| `apps/manage/src/app/dashboard/sites/[id]/config-tab-general.tsx` | same |
| `apps/manage/src/app/dashboard/sites/[id]/config-tab-appearance.tsx` | same |
| `apps/manage/src/app/dashboard/sites/[id]/widget-config-form.tsx` | same |
| `apps/manage/src/app/dashboard/sites/[id]/page.tsx` | same |
| `apps/manage/src/app/s/[siteId]/page.tsx` | same |
| `apps/manage/src/app/api/account/export/route.ts` | same |
| `apps/manage/src/app/api/keys/route.ts` | same |

---

## Environment Variables

### Remove (all Lemon Squeezy vars)
```
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_WEBHOOK_SECRET
LS_PRO_VARIANT_ID
LS_PRO_ANNUAL_VARIANT_ID
LS_BUSINESS_VARIANT_ID
LS_BUSINESS_ANNUAL_VARIANT_ID
```

### Add (Polar vars)
```
POLAR_ACCESS_TOKEN              # Organization Access Token from Polar dashboard
POLAR_WEBHOOK_SECRET            # Webhook signing secret (auto-generated by Polar)
POLAR_SERVER                    # "sandbox" | "production"
POLAR_SMALL_MONTHLY_PRODUCT_ID
POLAR_SMALL_ANNUAL_PRODUCT_ID
POLAR_MEDIUM_MONTHLY_PRODUCT_ID
POLAR_MEDIUM_ANNUAL_PRODUCT_ID
POLAR_LARGE_MONTHLY_PRODUCT_ID
POLAR_LARGE_ANNUAL_PRODUCT_ID
```

---

## Files: Create / Replace / Delete / Update

### Create
- `apps/manage/src/lib/polar.ts` — Polar SDK client singleton
- `apps/manage/src/app/api/billing/customer-portal/route.ts` — generates pre-authenticated portal URL
- `apps/manage/src/app/api/webhooks/polar/route.ts` — Polar webhook handler

### Replace
- `apps/manage/src/app/api/billing/checkout/route.ts` — Polar checkout (GET, not POST)
- `apps/manage/src/app/api/billing/cancel-subscription/route.ts` — uses `polar.subscriptions.update({ cancelAtPeriodEnd: true })`

### Delete
- `apps/manage/src/lib/lemonsqueezy.ts`
- `apps/manage/src/app/api/webhooks/lemonsqueezy/` (entire directory)

### Update
- `packages/types/src/billing.ts` — Plan type, PLAN_LIMITS, POLAR_PRODUCTS
- `packages/db/prisma/schema.prisma` — field renames + new migration
- `apps/manage/src/lib/plan.ts` — plan names + PlanLimits field references
- `apps/manage/src/app/api/account/delete/route.ts` — replace LS `cancelSubscription()` with `polar.subscriptions.revoke({ id })` (immediate, correct for account deletion)
- `apps/manage/src/app/dashboard/settings/billing/page.tsx` — new plan cards, pricing, portal link
- `apps/manage/src/app/dashboard/settings/billing/plan-checkout-button.tsx` — change from POST fetch to GET navigation
- `apps/manage/src/app/admin/page.tsx` — MRR calculation + plan distribution chart
- `apps/manage/src/app/admin/users/change-plan-form.tsx` — plan options: small/medium/large
- `apps/manage/src/app/api/admin/users/[id]/plan/route.ts` — validate new plan names
- All 8 "business"-gated feature files listed above
- `apps/manage/package.json` — remove `@lemonsqueezy/lemonsqueezy.js`, add `@polar-sh/sdk` and `@polar-sh/nextjs`

---

## Webhook Handler (`/api/webhooks/polar/route.ts`)

### Event Table

| Polar Event | Status | Action |
|-------------|--------|--------|
| `subscription.created` | `trialing` | Upsert Subscription (status: "trialing"), set `user.plan` to tier, send welcome email |
| `subscription.active` | `active` | Confirm `user.plan` is set (idempotent), send `planUpgradedTemplate()` email + in-app notification |
| `subscription.past_due` | `past_due` | Send `paymentFailedTemplate()` email + in-app notification |
| `subscription.canceled` | `active` (cancel scheduled) | Set `canceledAt` on Subscription; keep status `"active"` (user retains access) |
| `subscription.revoked` | *(terminal)* | Set `user.plan = "free"`, set Subscription status `"canceled"` |

**Note:** `subscription.canceled` (American spelling, single-l) is the correct Polar event name.

### Product → Plan Mapping

```typescript
const PRODUCT_TO_PLAN: Record<string, Plan> = {
  [process.env.POLAR_SMALL_MONTHLY_PRODUCT_ID ?? "~"]:  "small",
  [process.env.POLAR_SMALL_ANNUAL_PRODUCT_ID ?? "~~"]:  "small",
  [process.env.POLAR_MEDIUM_MONTHLY_PRODUCT_ID ?? "~~~"]: "medium",
  [process.env.POLAR_MEDIUM_ANNUAL_PRODUCT_ID ?? "~~~~"]: "medium",
  [process.env.POLAR_LARGE_MONTHLY_PRODUCT_ID ?? "~~~~~"]: "large",
  [process.env.POLAR_LARGE_ANNUAL_PRODUCT_ID ?? "~~~~~~"]: "large",
};

// Safety check — never silently downgrade a paying customer to "free"
const plan = PRODUCT_TO_PLAN[productId];
if (!plan) {
  console.error(`[Polar] Unknown product ID: ${productId}`);
  return new Response("Unknown product", { status: 400 });
}
```

### Validation

```typescript
import { validateEvent } from "@polar-sh/sdk/webhooks";

const event = validateEvent(
  await request.text(),   // raw body string
  Object.fromEntries(request.headers),
  process.env.POLAR_WEBHOOK_SECRET!
);
```

---

## Key Implementation Details

### `lib/polar.ts`

```typescript
import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: (process.env.POLAR_SERVER ?? "sandbox") as "sandbox" | "production",
});
```

### Checkout route (`/api/billing/checkout/route.ts`)

- Method: **GET** (Polar Next.js adapter uses GET with query params — **breaking change from current POST**)
- Query: `?productId=xxx`
- Reads session from Better Auth → attaches `userId` as checkout metadata
- `successUrl`: `/dashboard/settings/billing`
- **`plan-checkout-button.tsx` must be updated** to use `router.push('/api/billing/checkout?productId=...')` or a link instead of `fetch()` POST

### Customer portal route (`/api/billing/customer-portal/route.ts`)

- Method: GET
- Reads `user.polarCustomerId` from DB
- Calls `polar.customerSessions.create({ customerId })`
- Returns redirect to portal URL

---

## Admin Panel

`apps/manage/src/app/admin/page.tsx`:

```typescript
// MRR — separate monthly vs annual for accuracy
const smallMonthly  = await db.subscription.count({ where: { plan: "small",  interval: "month", status: "active" } });
const smallAnnual   = await db.subscription.count({ where: { plan: "small",  interval: "year",  status: "active" } });
const mediumMonthly = await db.subscription.count({ where: { plan: "medium", interval: "month", status: "active" } });
const mediumAnnual  = await db.subscription.count({ where: { plan: "medium", interval: "year",  status: "active" } });
const largeMonthly  = await db.subscription.count({ where: { plan: "large",  interval: "month", status: "active" } });
const largeAnnual   = await db.subscription.count({ where: { plan: "large",  interval: "year",  status: "active" } });

const mrr =
  smallMonthly * 39  + smallAnnual * (375/12) +
  mediumMonthly * 59 + mediumAnnual * (566/12) +
  largeMonthly * 119 + largeAnnual * (1133/12);

// Plan distribution chart — update from ["free","pro","business"] to:
const planCounts = { free: 0, small: 0, medium: 0, large: 0 };
```

---

## Packages

```bash
# In apps/manage:
pnpm remove @lemonsqueezy/lemonsqueezy.js
pnpm add @polar-sh/sdk @polar-sh/nextjs
```

---

## Verification Plan

1. **Sandbox setup** — Set `POLAR_SERVER=sandbox`, create 6 test products in Polar sandbox dashboard, set all 6 product ID env vars
2. **Checkout flow** — Click upgrade → verify GET redirect to Polar checkout → complete test payment → verify redirect back to `/dashboard/settings/billing`
3. **Trial webhook** — Verify `subscription.created` (trialing) sets `user.plan` correctly
4. **Trial activation** — Verify `subscription.active` fires after trial and email is sent
5. **Webhook delivery** — Use `polar listen http://localhost:3000/` CLI for local testing; verify Subscription record created in DB with correct `plan`, `interval`, and `polarSubscriptionId`
6. **Customer portal** — Click "Manage Billing" → verify pre-authenticated portal opens
7. **Cancellation** — Cancel subscription → verify `canceledAt` set but `user.plan` stays active → verify `subscription.revoked` event downgrades to `"free"`
8. **Plan gating** — Verify Large plan users can access appearance/white-label controls; free users cannot
9. **Account delete** — Delete account with active subscription → verify subscription is cancelled via Polar API
10. **Admin panel** — Verify MRR and plan distribution chart reflect correct plan names
11. **TypeScript build** — Run `pnpm build` in `apps/manage` — zero type errors
12. **Production cutover** — Swap `POLAR_SERVER=production` + real product IDs
