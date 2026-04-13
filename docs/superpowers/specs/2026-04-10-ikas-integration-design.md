# ikas Integration App — Design Spec

**Date:** 2026-04-10
**Approach:** B — Widget + Lightweight Admin Panel

## Overview

A Next.js 15 Admin App published on the ikas App Store that:
1. Injects the inculva accessibility widget into ikas storefronts via Storefront Events
2. Provides a widget configuration UI embedded in the ikas admin panel
3. Links out to app.inculva.com for scanner and dashboard features

## Architecture

### Folder Structure

```
apps/
├── plugins/              (renamed from cms-plugins — simple snippet integrations)
│   ├── bigcommerce/
│   ├── drupal/
│   ├── shopify/
│   ├── wordpress/
│   └── ...
├── integrations/         (new — full app integrations)
│   └── ikas/             (Next.js 15 admin app)
├── manage/
├── api/
└── ...
```

- `apps/plugins/` contains simple embed-code and CMS-specific snippets (no package.json)
- `apps/integrations/` contains full app integrations with their own build pipelines
- Add `"apps/integrations/*"` to `pnpm-workspace.yaml`

### Data Flow

```
ikas merchant installs app on App Store
  → OAuth2 Authorization Code flow
  → app exchanges code for access token, stores in DB
  → auto-creates inculva site via existing API (using store domain)
  → registers widget.js on ikas storefront via GraphQL mutation
  → merchant configures widget in ikas admin panel (iframe)
  → config saved to inculva API (same DB the manage app uses)
  → widget.js fetches config at runtime from /widget/config/{siteId}
```

### Key Principle

The ikas app is a **thin client**. It does not duplicate business logic. It calls the same inculva API that app.inculva.com uses. Widget config, site creation, and scanner all share the same backend.

## Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Landing/install — ikas redirects here during OAuth |
| `/api/auth/callback` | OAuth2 callback — exchanges code for token, creates session |
| `/api/auth/token` | App Bridge token exchange endpoint |
| `/api/webhooks/uninstall` | Handles app uninstall cleanup |
| `/dashboard` | Main admin panel (iframe) — widget config |
| `/dashboard/reports` | Link-out to app.inculva.com scanner/dashboard |

## Install Flow

1. Merchant clicks "Install" on ikas App Store
2. ikas redirects to our app with authorization code
3. We exchange code for access token, store in DB (encrypted)
4. Auto-create inculva site via existing API using the store's domain
5. Register `widget.js` on their storefront via ikas GraphQL mutation
6. Redirect to `/dashboard` — widget config UI embedded in ikas admin

## Data Model

New Prisma model added to `@inculva/db`:

```prisma
model IkasStore {
  id             String    @id @default(cuid())
  siteId         String    @unique
  site           Site      @relation(fields: [siteId], references: [id])
  ikasStoreId    String    @unique
  ikasStoreName  String
  accessToken    String    // encrypted
  refreshToken   String?   // encrypted
  storefrontId   String
  scriptId       String?   // ID of injected storefront script
  installedAt    DateTime  @default(now())
  uninstalledAt  DateTime?
}
```

Links an ikas merchant to their inculva site. When widget config changes, the existing `siteId` is used — widget fetches config from the same `/widget/config/{siteId}` endpoint.

## Authentication

- **OAuth2 Authorization Code** — ikas to our app, token exchange
- **Iron Session** — secure server-side session management
- **App Bridge JWT** — iframe-to-server communication via `jose`

## Script Injection

On install, call ikas GraphQL API to register the widget script. The exact mutation name and input shape should be confirmed against the ikas GraphQL Playground during development:

```graphql
mutation {
  CreateStorefrontJSScript(input: {
    storefrontId: "..."
    name: "inculva accessibility widget"
    scriptContent: "<script src=\"https://cdn.inculva.com/widget.js\" data-site-id=\"{siteId}\"></script>"
  })
}
```

The widget auto-initializes from `data-site-id` — zero config on the merchant side.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15, App Router, React 19, TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| API Client | `@ikas/admin-api-client` + GraphQL codegen |
| Session | Iron Session |
| Database | Prisma (shared `@inculva/db` package) |
| JWT | jose |
| Package Manager | pnpm |

### Shared monorepo packages:
- `@inculva/db` — Prisma client, IkasStore model added here
- `@inculva/types` — shared widget config types

### Environment Variables

```
NEXT_PUBLIC_IKAS_CLIENT_ID=
IKAS_CLIENT_SECRET=
NEXT_PUBLIC_IKAS_API_URL=https://api.myikas.com/api/v2/admin/graphql
NEXT_PUBLIC_DEPLOY_URL=https://ikas.inculva.com
SECRET_COOKIE_PASSWORD=
NEXT_PUBLIC_INCULVA_API_URL=
NEXT_PUBLIC_INCULVA_APP_URL=
```

## Widget Config UI

Same fields as the existing manage app widget-config-form, embedded in ikas admin iframe:
- Position (grid selector)
- Primary color
- Language
- Button size and icon
- Feature toggles (text resizing, dyslexia font, cursor, keyboard nav, etc.)
- Profile toggles (ADHD, blind, low vision, etc.)

Reads/writes to the same inculva API endpoint (`/api/sites/{id}/config`).

## Error Handling

### Install/Uninstall lifecycle:
- **Install fails mid-OAuth** — show retry screen, don't create partial records
- **Uninstall webhook** — remove storefront script via ikas API, soft-delete IkasStore record (keep siteId linkage for reinstall)
- **Reinstall** — detect existing site by domain, re-link instead of creating duplicate

### Script injection:
- **Script already exists** — check before creating, update if present
- **Storefront ID missing** — fetch from ikas API during install flow

### Token management:
- **Token expired (4h)** — refresh before API calls, store new token
- **Token revoked** — catch 401, prompt re-authorization

### Config sync:
- Single source of truth — inculva API
- No separate config store in the ikas app
- If inculva API unreachable, show error in ikas panel

## i18n

- ikas panel UI: Turkish and English
- Widget language: independent, configured per-site

## Deployment

- **Hosting** — Vercel at `ikas.inculva.com`
- **Build** — integrated into Turbo pipeline
- **Dev** — localhost + ngrok/tunnel for OAuth callback
- **Testing** — ikas Partner dev store

## ikas App Store Publishing

1. Register app on ikas Partner dashboard (builders.ikas.com)
2. Configure OAuth redirect URL → `https://ikas.inculva.com/api/auth/callback`
3. Set webhook URL for uninstall events
4. Submit for review: app description (TR/EN), screenshots, privacy policy
5. After approval → live on apps.ikas.com

## Workspace Changes

- Rename `apps/cms-plugins` → `apps/plugins`
- Create `apps/integrations/` directory
- Add `"apps/integrations/*"` to `pnpm-workspace.yaml`
- ikas app at `apps/integrations/ikas/`
