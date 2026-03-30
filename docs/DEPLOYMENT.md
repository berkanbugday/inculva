# Deployment Guide

## Table of Contents

- [Overview](#overview)
- [Infrastructure](#infrastructure)
- [Environment Variables](#environment-variables)
- [apps/api — Railway](#appsapi--railway)
- [apps/web — Vercel](#appsweb--vercel)
- [packages/widget — Cloudflare R2 CDN](#packageswidget--cloudflare-r2-cdn)
- [Database — Railway PostgreSQL](#database--railway-postgresql)
- [CI/CD — GitHub Actions](#cicd--github-actions)
- [Production Checklist](#production-checklist)
- [Rollback Procedures](#rollback-procedures)

---

## Overview

| Service    | Platform             | Deployment trigger                                                             |
| ---------- | -------------------- | ------------------------------------------------------------------------------ |
| `apps/api` | Railway.app (Docker) | `railway.toml` on push to `main`                                               |
| `apps/web` | Vercel               | Automatic on push to `main`                                                    |
| Widget CDN | Cloudflare R2        | GitHub Actions (`deploy-widget.yml`) on push to `main` when widget src changes |
| Database   | Railway PostgreSQL   | Managed — migrations run manually or in CI                                     |

---

## Infrastructure

```
GitHub (source)
  │
  ├── push to main
  │     ├── GitHub Actions: ci.yml (typecheck → lint → build)
  │     ├── GitHub Actions: deploy-widget.yml (build widget → upload to R2)
  │     ├── Vercel: auto-deploy apps/web
  │     └── Railway: auto-deploy apps/api (via railway.toml)
  │
  └── PR branch
        └── GitHub Actions: ci.yml (typecheck → lint)

Cloudflare R2
  └── cdn.inculva.com/widget.js  (Cache-Control: public, max-age=300)

Vercel
  └── app.inculva.com  (Next.js 15, Edge Network CDN)

Railway
  ├── api.inculva.com  (Fastify Docker container, autoscale)
  └── PostgreSQL 17    (managed, persistent volume)
```

---

## Environment Variables

### `apps/api` (Railway Service)

Set these in the Railway service dashboard under "Variables":

```env
DATABASE_URL=<Railway PostgreSQL connection string>
API_PORT=3001
API_HOST=0.0.0.0
NODE_ENV=production
CORS_ORIGIN=https://app.inculva.com
RESEND_API_KEY=re_xxxx
EMAIL_FROM=inculva <hi@inculva.com>
NEXT_PUBLIC_APP_URL=https://app.inculva.com
```

### `apps/web` (Vercel Project)

Set these in the Vercel project dashboard under "Settings → Environment Variables":

```env
DATABASE_URL=<Railway PostgreSQL connection string>
NEXT_PUBLIC_APP_URL=https://app.inculva.com
NEXT_PUBLIC_API_URL=https://api.inculva.com
NEXT_PUBLIC_WIDGET_URL=https://cdn.inculva.com/widget.js
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=https://app.inculva.com
RESEND_API_KEY=re_xxxx
EMAIL_FROM=inculva <hi@inculva.com>
LEMONSQUEEZY_API_KEY=eyJ...
LEMONSQUEEZY_STORE_ID=12345
LEMONSQUEEZY_WEBHOOK_SECRET=xxxx
LS_PRO_VARIANT_ID=123456
LS_BUSINESS_VARIANT_ID=789012
```

### GitHub Actions Secrets

Set these in the repository under "Settings → Secrets and variables → Actions":

```
R2_ACCOUNT_ID          # Cloudflare account ID
R2_ACCESS_KEY_ID       # R2 API token access key ID
R2_SECRET_ACCESS_KEY   # R2 API token secret access key
R2_BUCKET_NAME         # e.g. inculva-widget
```

---

## apps/api — Railway

### Initial setup

1. Create a new Railway project.
2. Add a **PostgreSQL** plugin to the project.
3. Create a new **Service** from GitHub repo, pointing to this monorepo.
4. Railway will detect `railway.toml` at the root:

```toml
[build]
builder = "dockerfile"
dockerfilePath = "apps/api/Dockerfile"

[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
```

5. Set all [environment variables](#appsapi-railway) in the Railway service dashboard.
6. Railway will build the Docker image and deploy.

### Dockerfile

The `apps/api/Dockerfile` uses a multi-stage build:

- **Stage 1 (builder):** Installs all deps, generates Prisma client, compiles TypeScript → `dist/`
- **Stage 2 (runner):** Copies only `dist/` and production `node_modules`, runs `node dist/server.js`

### Database migrations

Migrations are **not** run automatically on deploy. Run them manually when deploying schema changes:

```bash
# Using Railway CLI
railway run --service api pnpm --filter @inculva/db db:migrate

# Or connect directly with the Railway DATABASE_URL
DATABASE_URL="<railway-url>" pnpm --filter @inculva/db db:migrate
```

### Custom domain

In Railway: Service → Settings → Domains → Add Custom Domain → point `api.inculva.com` to the Railway-provided domain via CNAME.

---

## apps/web — Vercel

### Initial setup

1. Import the GitHub repository in Vercel.
2. Configure the project:
   - **Framework preset:** Next.js
   - **Root directory:** Leave empty (Vercel reads `vercel.json`)
   - **Build command:** `turbo run build --filter=web...` (defined in `vercel.json`)
   - **Output directory:** `apps/web/.next`
3. Set all [environment variables](#appsweb-vercel).
4. Deploy.

### `vercel.json`

```json
{
  "buildCommand": "turbo run build --filter=web...",
  "outputDirectory": "apps/web/.next",
  "installCommand": "pnpm install"
}
```

### Custom domain

In Vercel: Project → Settings → Domains → Add `app.inculva.com`.

### Prisma client for Vercel

Vercel requires the Prisma client to be generated at build time. The CI build step (`pnpm --filter @inculva/db db:generate`) handles this. Alternatively, the Vercel build command can include `prisma generate`.

---

## packages/widget — Cloudflare R2 CDN

### Initial setup

1. Create a Cloudflare R2 bucket named `inculva-widget`.
2. Enable public access on the bucket (or use a custom domain via Cloudflare Workers).
3. Create an R2 API token with "Object Write" permission.
4. Add the 4 R2 secrets to GitHub Actions (see [GitHub Actions Secrets](#github-actions-secrets)).

### Deployment workflow (`.github/workflows/deploy-widget.yml`)

Triggers on push to `main` **only when files in `packages/widget/src/**` change\*\* (path filter).

Steps:

1. Install pnpm + Node 20
2. `pnpm install --frozen-lockfile`
3. `pnpm --filter @inculva/widget build:cdn` → produces `packages/widget/dist/widget.iife.js`
4. Upload to R2 as `widget.js` with `Cache-Control: public, max-age=300`
5. Upload source map as `widget.iife.js.map`

### CDN URL

```
https://cdn.inculva.com/widget.js
```

Configure `cdn.inculva.com` as a custom domain on the R2 bucket in the Cloudflare dashboard.

### Cache invalidation

The `max-age=300` (5 minutes) TTL means widget updates propagate within 5 minutes globally. For an emergency rollback, you can upload a previous `widget.js` build directly to R2.

---

## Database — Railway PostgreSQL

### Initial migration

After first deploy, run the initial migration:

```bash
railway run pnpm --filter @inculva/db db:migrate
```

### Schema changes

For every schema change:

1. Edit `packages/db/prisma/schema.prisma`
2. Run locally: `make migrate` (creates migration file)
3. Commit migration file alongside schema change
4. After deploying the new code to Railway, run the migration on the production database

### Backups

Railway provides automatic daily backups for PostgreSQL. Enable in Railway → Database → Settings → Backups.

### Seed production (optional)

```bash
railway run pnpm --filter @inculva/db db:seed
```

---

## CI/CD — GitHub Actions

### `ci.yml` — Runs on every push and PR to `main`

```yaml
jobs:
  ci:
    steps:
      - pnpm install --frozen-lockfile
      - pnpm --filter @inculva/db db:generate
      - pnpm typecheck
      - pnpm lint

  build:
    needs: ci
    steps:
      - pnpm build
```

### `deploy-widget.yml` — Runs on push to `main` (widget src changes only)

```yaml
on:
  push:
    branches: [main]
    paths: ["packages/widget/src/**"]

steps:
  - pnpm --filter @inculva/widget build:cdn
  - Upload to Cloudflare R2
```

---

## Production Checklist

### Before first deploy

- [ ] Generate `BETTER_AUTH_SECRET`: `openssl rand -base64 32`
- [ ] Set up LemonSqueezy store, create Pro and Business products/variants
- [ ] Configure LemonSqueezy webhook pointing to `https://app.inculva.com/api/webhooks/lemonsqueezy`
- [ ] Set up Resend domain (verify DNS records for `inculva.com`)
- [ ] Create Cloudflare R2 bucket and configure custom domain `cdn.inculva.com`
- [ ] Set all env vars in Railway, Vercel, and GitHub Actions
- [ ] Run initial database migration on Railway PostgreSQL
- [ ] Verify `/health` endpoint returns `{"status":"ok"}` on production API

### After first deploy

- [ ] Register an account and verify email works (Resend)
- [ ] Create a site and copy the embed script
- [ ] Paste embed script on a test page and verify widget loads
- [ ] Complete a test upgrade (LemonSqueezy test mode) and verify plan changes
- [ ] Create an API key and query `GET /widget/events/:siteId`
- [ ] Verify admin panel is accessible for admin-role users

---

## Rollback Procedures

### API rollback (Railway)

In Railway: Service → Deployments → find previous deployment → "Redeploy"

### Web rollback (Vercel)

In Vercel: Project → Deployments → find previous deployment → "Promote to Production"

### Widget rollback (Cloudflare R2)

1. Check out the previous git commit
2. Build the widget: `pnpm --filter @inculva/widget build:cdn`
3. Upload manually to R2: use Cloudflare dashboard or AWS CLI with R2 endpoint

### Database rollback

Prisma does not support automatic down-migrations. To rollback:

1. Create a new migration that reverses the changes
2. Apply it to the production database

For data loss scenarios, restore from Railway's automatic backups.
