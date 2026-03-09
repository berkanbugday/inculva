# Architecture

## Table of Contents

- [System Overview](#system-overview)
- [Monorepo Layout](#monorepo-layout)
- [Service Responsibilities](#service-responsibilities)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Key Architectural Decisions](#key-architectural-decisions)
- [Authentication & Authorization](#authentication--authorization)
- [Billing Flow](#billing-flow)
- [Widget Distribution](#widget-distribution)
- [Security Model](#security-model)
- [i18n Architecture](#i18n-architecture)

---

## System Overview

Inculva is a **TypeScript monorepo** built on Turborepo with pnpm workspaces. It has two deployable applications and four shared packages.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        External Sites (any domain)                  │
│  <script src="https://cdn.inculva.com/widget.js"                    │
│           data-site-id="cm...">                                     │
└────────────────────────┬────────────────────────────────────────────┘
                         │ 1. Fetch config
                         │ 2. Send events (sendBeacon)
                         ▼
┌──────────────────────────────────┐     ┌──────────────────────────┐
│  apps/api (Fastify 5 — Railway)  │────▶│  PostgreSQL 17 (Railway) │
│  Port 3001                       │     └──────────────────────────┘
│  CORS: all origins               │              ▲
│  Rate limit: 100 req/min         │              │ (direct Prisma)
└──────────────────────────────────┘              │
                                      ┌───────────┴──────────────────┐
                                      │  apps/web (Next.js 15 —      │
                                      │  Vercel)  Port 3000          │
                                      │  Session-cookie auth         │
                                      │  Server Components + RSC     │
                                      └──────────────────────────────┘
                                                  ▲
                                                  │ Dashboard users
                                      ┌───────────┴──────────────────┐
                                      │  Browser (dashboard)         │
                                      │  React 19, Tailwind CSS 4    │
                                      └──────────────────────────────┘

┌──────────────────────────────────────┐
│  Cloudflare R2 CDN                   │
│  https://cdn.inculva.com/widget.js   │
│  Cache-Control: public, max-age=300  │
│  Deployed via GitHub Actions         │
└──────────────────────────────────────┘
```

---

## Monorepo Layout

```
inculva/
├── apps/
│   ├── api/          → Public Fastify REST API (widget traffic only)
│   └── web/          → Next.js 15 dashboard + landing + admin
└── packages/
    ├── db/           → Prisma schema + singleton client (shared by both apps)
    ├── email/        → Resend email client + HTML templates
    ├── types/        → Shared TypeScript interfaces and billing constants
    ├── ui/           → cn() utility, Tailwind globals, CVA
    └── widget/       → Self-contained IIFE widget bundle (Vite)
```

**Build order** (enforced by Turborepo `dependsOn: ["^build"]`):

```
packages/types  ─┐
packages/ui     ─┤
packages/email  ─┤──▶  packages/db  ──▶  apps/api
                 │                   ──▶  apps/web
packages/widget  ┘  (standalone — no deps on other packages)
```

---

## Service Responsibilities

### `apps/api` — Public Widget API

The Fastify API is the **only service exposed to the open internet with permissive CORS**. It exists because the widget is embedded on external domains, and those browsers must be able to fetch config and send events cross-origin.

Responsibilities:
- Serve widget configuration to embedded scripts
- Receive and store interaction events from visitors
- Enforce monthly event quotas per plan
- Send usage alert emails at 80% and 100% thresholds
- Expose analytics data to authenticated callers (API key)

This API is intentionally minimal — it has **only 4 routes**. All authenticated dashboard operations go through the Next.js app instead.

### `apps/web` — Dashboard + Landing

The Next.js app handles all user-facing functionality:

- Landing page and pricing
- Registration, email verification, password reset
- Site management (CRUD, widget configurator, install checker)
- Analytics dashboard (charts, event logs, domain loads)
- Team management and invite flow
- API key management
- Billing (LemonSqueezy checkout, subscription management)
- Admin panel (MRR estimates, user/plan management)
- Webhook handler for LemonSqueezy events

Next.js Server Components query the database **directly via Prisma** — there is no unnecessary API hop for dashboard reads. Mutations go through Next.js Route Handlers.

### `packages/db` — Database Layer

Single source of truth for all database access:
- Prisma schema (`schema.prisma`) with 15 models
- Singleton `PrismaClient` with `global` caching to survive Next.js hot-reload
- Seed script for demo data

Both `apps/api` and `apps/web` import from `@inculva/db` — they share the same Prisma client and schema.

### `packages/widget` — Embeddable Widget

A completely **self-contained IIFE bundle** built with Vite. At runtime it has zero framework dependencies. It:
- Auto-initializes via the `DOMContentLoaded` event listener
- Reads `data-site-id` from the `<script>` tag
- Fetches configuration from `apps/api`
- Renders a floating panel with 16 feature toggles
- Applies DOM manipulation directly (no virtual DOM)
- Persists user preferences in `localStorage`
- Sends interaction events to `apps/api` via `navigator.sendBeacon`
- Generates per-session UUIDs for analytics

---

## Data Flow Diagrams

### Widget Initialization Flow

```
1. Browser loads page with <script src="widget.js" data-site-id="cm...">
2. widget.iife.js auto-executes (IIFE)
3. DOMContentLoaded → InculvaWidget.init()
4. GET /widget/config/:siteId
   ├── Server extracts domain from Origin/Referer header
   ├── Checks allowedDomains allowlist
   ├── Records daily domain load (upsert, async/fire-forget)
   └── Returns: config + features + labels (41 languages)
5. Widget renders floating button (bottom-right by default)
6. User clicks → panel opens
7. User toggles feature → DOM manipulation applied immediately
8. Event sent: POST /widget/events (sendBeacon, non-blocking)
9. Preferences saved to localStorage
```

### Dashboard Authentication Flow

```
1. User visits /dashboard/* → middleware.ts runs
2. getSessionCookie() checks HTTP-only session cookie
3. No cookie → redirect to /login
4. Valid cookie → Server Component renders with user context
5. useSession() on client → Better Auth React hooks
```

### Billing Flow

```
1. User clicks "Upgrade to Pro"
2. POST /api/checkout → createCheckout() on LemonSqueezy
3. Redirect to LemonSqueezy hosted checkout
4. Payment complete → LemonSqueezy sends webhook
5. POST /api/webhooks/lemonsqueezy
   ├── Verify HMAC-SHA256 signature
   ├── Handle event: subscription_created/updated/cancelled/expired
   ├── Upsert Subscription record
   ├── Update User.plan
   ├── Send plan-upgraded email (Resend)
   └── Create in-app notification
```

### API Key Authentication Flow

```
1. User creates API key: POST /api/keys
   ├── Generate: "ink_" + 32 random hex bytes
   ├── Hash: SHA-256(rawKey)
   ├── Store: keyHash + keyPrefix
   └── Return raw key ONCE (never stored plain)

2. API call: GET /api (or Fastify) with x-api-key: ink_abc...
   ├── Hash incoming key with SHA-256
   ├── Look up by keyHash in database
   ├── Check: not revoked, not expired
   ├── Update lastUsedAt
   └── Allow/deny
```

---

## Key Architectural Decisions

### 1. Two separate apps instead of one

The Fastify API (`apps/api`) and Next.js app (`apps/web`) are deliberately separate:

- The widget API must allow CORS from **all origins** (it serves external sites). Bundling this into Next.js would mean the dashboard API also has open CORS.
- Separation keeps the widget API extremely minimal and fast (Fastify is ~2x faster than Next.js Route Handlers for raw throughput).
- Independent deployment targets (Railway for API, Vercel for web).

### 2. Next.js Server Components query DB directly

Dashboard Server Components use Prisma directly — no REST layer between Next.js and the database. This eliminates a network hop, reduces latency, and simplifies code. Route Handlers are only used for mutations that are called from Client Components.

### 3. Widget as IIFE, not a framework component

The widget must work on any site regardless of tech stack. An IIFE:
- Adds zero dependencies to the host site
- Works with React, Vue, Angular, or plain HTML
- Has maximum browser compatibility (ES2018 target)
- Is small (~30kb minified, no framework overhead)
- Doesn't conflict with the host site's CSS (scoped to a shadow-root-like container)

### 4. Shared `packages/db` between both apps

A single Prisma schema means:
- Schema changes propagate to both apps simultaneously
- No schema drift between services
- One migration history
- Type safety shared across the codebase

### 5. API keys are SHA-256 hashed

Raw keys are never stored. Only the SHA-256 hash is persisted. The raw key is shown exactly once at creation. This means a database breach doesn't expose raw API keys.

---

## Authentication & Authorization

### Session Auth (dashboard)

- **Provider**: Better Auth 1.2
- **Storage**: HTTP-only cookie (`better-auth.session_token`)
- **Verification**: `getSessionCookie()` in `middleware.ts` guards all `/dashboard/*` and `/api/*` routes (except auth endpoints and webhooks)
- **Roles**: `user` (default) or `admin` — stored in `User.role`

### API Key Auth (Fastify)

- **Format**: `ink_` + 32 random hex bytes (256 bits entropy)
- **Storage**: SHA-256 hash + first 8 chars prefix (for display)
- **Header**: `x-api-key: <raw-key>`
- **Plugin**: `src/plugins/api-key.ts` — decorates Fastify with `app.verifyApiKey` preHandler
- **Currently used**: `GET /widget/events/:siteId`

### Role-Based Access Control

| Role | Access |
|---|---|
| `user` | Own sites, teams (if Pro/Business), settings, billing |
| `admin` | All `user` permissions + `/admin/*` routes + force-set any user's plan |
| Team `admin` | Manage team members, send invites |
| Team `member` | Read-only access to team resources |

---

## Billing Flow

### Plans

Defined in `packages/types/src/billing.ts`:

```typescript
export const PLAN_LIMITS = {
  free:     { sites: 1,         events: 10_000,  members: 0 },
  pro:      { sites: 10,        events: 100_000, members: 5 },
  business: { sites: Infinity,  events: Infinity, members: Infinity },
};
```

### White-label

Only `business` plan users receive `whiteLabelText` in widget config responses. For all other plans, the "Powered by Inculva" footer is always shown.

### Usage Alerts

The Fastify API checks event count at each `POST /widget/events` call:
- At **80%** of monthly quota: sends email + in-app notification (once per calendar month)
- At **100%** of monthly quota: events are dropped (HTTP 429), email + notification sent

Alert deduplication uses `User.usageAlertSent80` and `User.usageAlertSent100` — only one alert per threshold per calendar month.

---

## Widget Distribution

```
packages/widget/src/
  └── vite build → dist/widget.iife.js (IIFE, ES2018, minified)
                    dist/fonts/*.woff2  (copied from public/fonts/)

On build: cp dist/widget.iife.js → apps/manage/public/widget.js
          cp dist/fonts/         → apps/manage/public/fonts/
          (local dev fallback — served from Next.js manage public dir at localhost:3000)

On push to main (GitHub Actions):
  1. Build widget (build:cdn script)
  2. Upload widget.js  → cdn.inculva.com/widget.js
     Cache-Control: public, max-age=300, stale-while-revalidate=60
  3. Upload source map → cdn.inculva.com/widget.iife.js.map
  4. Upload fonts/     → cdn.inculva.com/fonts/*.woff2 + *.otf
     Cache-Control: public, max-age=31536000, immutable
     (fonts are content-addressed by filename and never change)
```

**Embed snippet** (shown in dashboard):

```html
<script
  src="https://cdn.inculva.com/widget.js"
  data-site-id="YOUR_SITE_ID"
  async
></script>
```

---

## Security Model

| Vector | Mitigation |
|---|---|
| XSS via widget | Widget is IIFE, no innerHTML with untrusted data; labels come from server config |
| CSRF | Better Auth uses `SameSite=Lax` cookies + CSRF token for mutations |
| API key leakage | Only SHA-256 hash stored; raw key shown once |
| Webhook forgery | HMAC-SHA256 signature verified on every LemonSqueezy webhook |
| Domain spoofing | Widget `allowedDomains` list enforced server-side using Origin/Referer headers |
| Rate limiting | 100 req/min per IP on `apps/api` via `@fastify/rate-limit` |
| Security headers | `@fastify/helmet` on API; Next.js default headers on web |
| SQL injection | Prisma parameterized queries only |
| Password storage | Better Auth bcrypt hashing |

---

## i18n Architecture

### Widget Panel (41 languages)

Located in `apps/api/src/i18n/labels.ts`. Every widget config response includes the full label set for the configured language. Supported languages span Latin, CJK, Cyrillic, and RTL scripts.

RTL languages (Arabic, Hebrew, Farsi, Urdu) — the widget panel applies `dir="rtl"` when any RTL language is active.

### Dashboard (5 languages)

Located in `apps/web/src/i18n/messages.ts`. A simple custom i18n approach using a `messages` map keyed by locale code (`en`, `tr`, `de`, `fr`, `es`). Language is persisted per-user and selectable from the dashboard header.
