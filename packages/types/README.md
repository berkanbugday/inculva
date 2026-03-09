# @inculva/types — Shared Types

Pure TypeScript type definitions shared across the entire monorepo. No runtime dependencies.

## Exports

### `api.ts` — API response types

```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
}

interface ApiError {
  success: false;
  error: string;
}

interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### `billing.ts` — Billing constants

```typescript
export type Plan = "free" | "pro" | "business";

export interface PlanLimits {
  sites: number;
  events: number;
  members: number;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free:     { sites: 1,        events: 10_000,   members: 0 },
  pro:      { sites: 10,       events: 100_000,  members: 5 },
  business: { sites: Infinity, events: Infinity, members: Infinity },
};

export const LS_PRODUCTS: Record<"pro" | "business", string> = {
  pro:      process.env.LS_PRO_VARIANT_ID ?? "",
  business: process.env.LS_BUSINESS_VARIANT_ID ?? "",
};
```

### `user.ts` — User and Site interfaces

```typescript
interface User {
  id: string;
  email: string;
  name: string | null;
  role: "user" | "admin";
  plan: Plan;
}

interface Site {
  id: string;
  name: string;
  domain: string;
  ownerId: string;
  teamId: string | null;
}
```

### `widget.ts` — Widget types

```typescript
interface WidgetConfig {
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme: "auto" | "light" | "dark";
  primaryColor: string;
  language: string;
  features: WidgetFeatures;
  labels: Record<string, string>;
  accessibilityStatementUrl?: string;
  whiteLabelText?: string | null;
}

interface WidgetFeatures {
  textResizing: boolean;
  highContrast: boolean;
  dyslexiaFont: boolean;
  cursorEnhancement: boolean;
  keyboardNavigation: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  pauseAnimations: boolean;
  textSpacing: boolean;
  highlightLinks: boolean;
  colorBlindMode: boolean;
  largeClickTargets: boolean;
  focusHighlight: boolean;
  grayscale: boolean;
  skipNavigation: boolean;
  muteMedia: boolean;
}

interface WidgetEvent {
  siteId: string;
  sessionId: string;
  event: "opened" | "closed" | "feature_enabled" | "feature_disabled";
  feature?: string;
  timestamp?: string;
}
```

## Usage

```typescript
import type { ApiResponse, Plan, WidgetConfig, WidgetEvent } from "@inculva/types";
import { PLAN_LIMITS } from "@inculva/types";

const limit = PLAN_LIMITS[user.plan].events;
```
