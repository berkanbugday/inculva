# @inculva/web — Dashboard

Next.js 15 App Router application. The user-facing dashboard, landing page, admin panel, and all authenticated API routes. Deployed to Vercel.

## Overview

This app serves:
- **Public pages**: Landing page (`/`), pricing (`/pricing`), auth flows (`/login`, `/register`, etc.)
- **Dashboard**: Site management, widget configurator, analytics, teams, settings, billing
- **Admin panel**: MRR overview, user management, plan overrides
- **API routes**: All authenticated mutations, LemonSqueezy webhook handler, Better Auth handler

Server Components query the database **directly via Prisma** — no API hop for reads. Route Handlers handle client-side mutations.

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| React | 19 |
| Auth | Better Auth 1.2 (email+password, HTTP-only sessions) |
| Billing | LemonSqueezy (`@lemonsqueezy/lemonsqueezy.js`) |
| Styling | Tailwind CSS 4 |
| Database | Prisma 6 (`@inculva/db`) |
| Email | Resend (`@inculva/email`) |
| Deployment | Vercel |
| i18n | Custom (en, tr, de, fr, es) |

## Development

```bash
# From repo root
pnpm --filter @inculva/web dev

# Or directly
cd apps/web
pnpm dev
```

App starts on `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | App base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_API_URL` | Fastify API URL (e.g. `http://localhost:3001`) |
| `NEXT_PUBLIC_WIDGET_URL` | CDN URL for widget.js (leave empty in dev) |
| `BETTER_AUTH_SECRET` | Session signing secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Trusted origin for Better Auth |
| `RESEND_API_KEY` | Resend API key |
| `EMAIL_FROM` | Sender address |
| `LEMONSQUEEZY_API_KEY` | LemonSqueezy server-side API key |
| `LEMONSQUEEZY_STORE_ID` | LemonSqueezy store ID |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | HMAC webhook signing secret |
| `LS_PRO_VARIANT_ID` | Pro plan variant ID |
| `LS_BUSINESS_VARIANT_ID` | Business plan variant ID |

## Source Structure

```
src/
├── middleware.ts               ← Auth guard (session cookie check for all /dashboard/*)
├── lib/
│   ├── auth.ts                 ← Better Auth server configuration
│   ├── auth-client.ts          ← Better Auth React client (useSession)
│   ├── lemonsqueezy.ts         ← LemonSqueezy client setup
│   └── plan.ts                 ← Plan limit helper functions
├── i18n/
│   └── messages.ts             ← Dashboard i18n (en/tr/de/fr/es)
├── components/
│   ├── dashboard-header.tsx    ← Top navigation bar
│   ├── language-switcher.tsx   ← Dashboard language selector
│   ├── notification-bell.tsx   ← In-app notification bell
│   ├── theme-toggle.tsx        ← Light/dark mode toggle
│   └── verification-banner.tsx ← "Please verify your email" banner
└── app/
    ├── layout.tsx              ← Root layout
    ├── page.tsx                ← Landing page
    ├── login/
    ├── register/
    ├── forgot-password/
    ├── reset-password/
    ├── pricing/                ← Public pricing page
    ├── invites/[token]/        ← Team invite acceptance
    ├── admin/                  ← Admin-only section
    │   ├── page.tsx            ← MRR, user stats, recent activity
    │   └── users/page.tsx      ← User list with plan management
    ├── dashboard/
    │   ├── page.tsx            ← Sites list + onboarding checklist
    │   ├── sites/
    │   │   ├── new/page.tsx    ← Add site form
    │   │   └── [id]/
    │   │       ├── page.tsx              ← Site settings + widget config
    │   │       ├── analytics/page.tsx    ← 30-day analytics
    │   │       └── delete/page.tsx       ← Delete confirmation
    │   ├── settings/
    │   │   ├── page.tsx        ← Profile + API keys
    │   │   └── billing/page.tsx ← Subscription management
    │   └── teams/
    │       ├── page.tsx        ← Teams list
    │       ├── new/page.tsx    ← Create team
    │       └── [id]/page.tsx   ← Team members + invites
    └── api/
        ├── auth/[...all]/      ← Better Auth handler
        ├── checkout/           ← LemonSqueezy checkout creation
        ├── webhooks/lemonsqueezy/ ← Billing webhook handler
        ├── keys/               ← API key CRUD
        ├── notifications/      ← In-app notifications
        ├── sites/[id]/config/  ← Widget config update
        ├── sites/[id]/check-install/ ← Install verification
        └── teams/[id]/         ← Team management
```

## Authentication

Authentication is handled by [Better Auth](https://www.better-auth.com/).

**Session flow:**
1. User signs in → Better Auth creates a `Session` record + sets HTTP-only cookie
2. `middleware.ts` calls `getSessionCookie()` on every request to `/dashboard/*` and `/api/*`
3. No valid session → redirect to `/login`
4. Server Components use `auth.api.getSession({ headers })` to get the current user

**Email verification:**
- Required before accessing the dashboard
- Verification email sent via Resend
- `verification-banner.tsx` shows a prompt for unverified users

## Billing

Billing is handled by [LemonSqueezy](https://www.lemonsqueezy.com/).

**Checkout flow:**
1. User clicks upgrade → `POST /api/checkout` with `variantId`
2. LemonSqueezy creates a hosted checkout session
3. After payment → LemonSqueezy sends webhook to `POST /api/webhooks/lemonsqueezy`
4. Webhook verifies HMAC-SHA256 signature, updates `User.plan` and `Subscription` record
5. Sends plan-upgraded email + in-app notification

**Subscription management:**
- Users can view subscription status and billing period at `/dashboard/settings/billing`
- "Manage Billing" links to LemonSqueezy customer portal (`lsCustomerPortalUrl`)
- Cancel via `POST /api/billing/cancel-subscription`

## Middleware

`src/middleware.ts` guards all non-public routes:

```typescript
// Protected paths
/dashboard/*
/admin/*
/api/* (except /api/auth/*, /api/webhooks/*)
```

Returns HTTP 401 for API routes, redirects to `/login` for page routes.

## Build

```bash
pnpm build      # next build
pnpm start      # next start
pnpm lint       # next lint
pnpm typecheck  # tsc --noEmit
```

## Deployment

See [../../docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md) for full Vercel deployment instructions.

**Quick summary:**
1. Import GitHub repo in Vercel
2. Set all env vars in Vercel dashboard
3. Vercel auto-deploys on push to `main` using `vercel.json`:
   ```json
   {
     "buildCommand": "turbo run build --filter=web...",
     "outputDirectory": "apps/web/.next"
   }
   ```
