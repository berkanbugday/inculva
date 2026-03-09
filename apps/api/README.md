# @inculva/api — Widget API

Fastify 5 REST API. The public-facing backend for the embeddable accessibility widget. Deployed to Railway.app via Docker.

## Overview

This API is the **only service with open CORS** — it must be accessible from any origin because the widget is embedded on external third-party websites. All dashboard mutations go through the Next.js app (`apps/web`) instead.

**Routes:**
- `GET /health` — health check
- `GET /widget/config/:siteId` — serves widget config to embedded scripts (public)
- `POST /widget/events` — receives visitor interaction events (public, quota-enforced)
- `GET /widget/events/:siteId` — analytics data (requires `x-api-key` header)

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Fastify 5 |
| Language | TypeScript 5.7 (ESM) |
| Database | Prisma 6 (`@inculva/db`) |
| Email | Resend (`@inculva/email`) |
| CORS | `@fastify/cors` (all origins) |
| Security headers | `@fastify/helmet` |
| Rate limiting | `@fastify/rate-limit` (100 req/min) |
| Auth | API key via `x-api-key` header (SHA-256 hashed) |
| Deployment | Railway.app (Docker, multi-stage) |

## Development

```bash
# From repo root
pnpm --filter @inculva/api dev

# Or directly
cd apps/api
pnpm dev
```

Server starts on `http://localhost:3001` (configurable via `API_PORT` env var).

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | — | PostgreSQL connection string |
| `API_PORT` | `3001` | Port to listen on |
| `API_HOST` | `0.0.0.0` | Bind host |
| `NODE_ENV` | `development` | Enables pretty-print logging in dev |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed origin for non-widget routes |
| `RESEND_API_KEY` | — | Resend API key for usage alert emails |
| `EMAIL_FROM` | — | Sender address |
| `NEXT_PUBLIC_APP_URL` | — | Dashboard URL (used in email links) |

## Build

```bash
pnpm build      # tsc → dist/server.js
pnpm start      # node dist/server.js
```

## Docker

```bash
# Build image
docker build -f apps/api/Dockerfile -t inculva-api .

# Run container
docker run -p 3001:3001 --env-file .env inculva-api
```

The `Dockerfile` uses a multi-stage build:
1. **builder** — installs all deps, generates Prisma client, compiles TypeScript
2. **runner** — copies `dist/` and production `node_modules` only

## API Key Authentication

The `GET /widget/events/:siteId` route requires an API key:

```bash
curl -H "x-api-key: ink_your_key_here" \
  http://localhost:3001/widget/events/SITE_ID
```

API keys are managed in the dashboard at `/dashboard/settings`.

## Source Structure

```
src/
├── server.ts           ← Fastify app bootstrap + plugin registration
├── plugins/
│   └── api-key.ts      ← Fastify plugin: app.verifyApiKey decorator
├── routes/
│   ├── health.ts       ← GET /health
│   └── widget.ts       ← All /widget/* routes
└── i18n/
    └── labels.ts       ← Widget panel labels for 41 languages
```

## Rate Limiting

Global rate limit via `@fastify/rate-limit`:
- **100 requests per minute per IP**
- Returns HTTP 429 when exceeded

## Usage Quota Enforcement

On every `POST /widget/events`:
1. Count events created this calendar month for the site's owner
2. If count ≥ 80% of plan limit → send usage warning (once per month)
3. If count ≥ plan limit → send usage limit alert (once per month) + return HTTP 429

Plan limits:
| Plan | Events/month |
|---|---|
| `free` | 10,000 |
| `pro` | 100,000 |
| `business` | Unlimited |

## Deployment

See [../../docs/DEPLOYMENT.md](../../docs/DEPLOYMENT.md) for full Railway deployment instructions.

**Quick summary:**
1. Railway detects `railway.toml` and builds the Docker image
2. Set env vars in Railway service dashboard
3. Railway health-checks `GET /health` before routing traffic
4. Run Prisma migrations manually after schema changes
