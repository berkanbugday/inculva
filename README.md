# Inculva

> WCAG-compliant SaaS accessibility widget platform — embed one script tag to give your visitors 24 accessibility features.

[![CI](https://github.com/inculva/inculva/actions/workflows/ci.yml/badge.svg)](https://github.com/inculva/inculva/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange)](https://pnpm.io/)

---

## Table of Contents

- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Available Commands](#available-commands)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Documentation](#documentation)

---

## Overview

Inculva is a full-stack SaaS platform that provides a drop-in accessibility widget for any website. Site owners register, add their domain, and paste one `<script>` tag. Their visitors get a floating panel with 16 WCAG-compliant accessibility features — no page rebuild required.

**Key features:**

- 16 WCAG-mapped accessibility features (text resizing, high contrast, dyslexia font, color-blind mode, etc.)
- 41-language widget panel (including RTL: Arabic, Hebrew, Farsi, Urdu)
- Real-time analytics dashboard (feature usage, session tracking, domain loads)
- Team collaboration (invite members, assign roles)
- LemonSqueezy billing with Free / Pro / Business plans
- Email notifications via Resend (welcome, usage alerts, team invites, billing)
- Admin panel (MRR, user management, plan overrides)
- Full TypeScript, zero-compromise security (hashed API keys, HMAC webhooks, HTTP-only sessions)

---

## Monorepo Structure

```
inculva/                          ← Turborepo + pnpm workspaces root
├── apps/
│   ├── api/                      ← Public widget API (Fastify, Railway)
│   └── web/                      ← Dashboard + landing (Next.js 15, Vercel)
└── packages/
    ├── db/                       ← Prisma ORM + PostgreSQL schema
    ├── email/                    ← Resend email templates
    ├── types/                    ← Shared TypeScript types
    ├── ui/                       ← Shared component utilities (cn, CVA)
    └── widget/                   ← Embeddable IIFE widget (Vite, Cloudflare R2)
```

---

## Tech Stack

| Layer       | Technology                                           |
| ----------- | ---------------------------------------------------- |
| Monorepo    | Turborepo 2, pnpm 9 workspaces                       |
| Language    | TypeScript 5.7 (strict ESM)                          |
| Database    | PostgreSQL 17, Prisma ORM 6                          |
| Backend API | Fastify 5 (Railway.app)                              |
| Frontend    | Next.js 15 App Router, React 19 (Vercel)             |
| Auth        | Better Auth 1.2 (email+password, HTTP-only sessions) |
| Billing     | LemonSqueezy (hosted checkout, HMAC webhooks)        |
| Email       | Resend                                               |
| Widget      | Vite IIFE bundle → Cloudflare R2 CDN                 |
| Styling     | Tailwind CSS 4                                       |
| CI/CD       | GitHub Actions                                       |
| Local dev   | Docker Compose (Postgres 17 + pgAdmin)               |

---

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop

### 1. Clone and install

```bash
git clone https://github.com/your-org/inculva.git
cd inculva
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values (see [Environment Variables](#environment-variables)).

### 3. First-time setup (one command)

```bash
make setup
```

This copies `.env.example → .env`, starts Postgres in Docker, generates the Prisma client, and runs all migrations.

### 4. Start everything

```bash
make dev
```

This starts Postgres in Docker and all dev servers concurrently via Turborepo:

| Service           | URL                                          |
| ----------------- | -------------------------------------------- |
| Next.js dashboard | http://localhost:3000                        |
| Fastify API       | http://localhost:3001                        |
| pgAdmin           | http://localhost:5050                        |
| Prisma Studio     | http://localhost:5555 (run `make db-studio`) |

### 5. Seed demo data (optional)

```bash
make seed
```

Creates `hi@inculva.com` user with a sample site at `demo.example.com`.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/inculva"

# API server
API_PORT=3001
API_HOST=0.0.0.0
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Web app
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WIDGET_URL=   # leave empty locally — falls back to /widget.js

# Auth (generate: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=re_xxxx
EMAIL_FROM=Inculva <hi@inculva.com>

# Billing
LEMONSQUEEZY_API_KEY=eyJ...
LEMONSQUEEZY_STORE_ID=12345
LEMONSQUEEZY_WEBHOOK_SECRET=xxxx
LS_PRO_VARIANT_ID=123456
LS_BUSINESS_VARIANT_ID=789012
```

> **Note:** Cloudflare R2 credentials (`R2_*`) are only needed as GitHub Actions secrets — not at runtime.

---

## Development

### Running individual apps

```bash
# API only
pnpm --filter @inculva/api dev

# Web only
pnpm --filter @inculva/web dev

# Widget (watch mode)
pnpm --filter @inculva/widget dev
```

### Database operations

```bash
make migrate      # create + run a new migration
make db-studio    # open Prisma Studio at http://localhost:5555
make db-reset     # wipe database and re-run all migrations
make seed         # seed demo user and site
```

### Building

```bash
pnpm build        # build all packages in dependency order
pnpm typecheck    # run TypeScript checks across all packages
pnpm lint         # run ESLint across all packages
```

---

## Available Commands

### Makefile (recommended for daily dev)

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `make setup`     | One-time first-run setup                  |
| `make dev`       | Start Docker + all dev servers            |
| `make db-up`     | Start Docker Compose (Postgres + pgAdmin) |
| `make db-down`   | Stop Docker Compose                       |
| `make db-reset`  | Wipe DB volumes + re-migrate              |
| `make db-studio` | Open Prisma Studio (port 5555)            |
| `make migrate`   | Run Prisma migrations                     |
| `make seed`      | Seed demo data                            |

### pnpm / Turborepo

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Start all dev servers (Turborepo TUI) |
| `pnpm build`     | Build all packages                    |
| `pnpm typecheck` | TypeScript check all packages         |
| `pnpm lint`      | Lint all packages                     |
| `pnpm clean`     | Remove all build outputs              |

---

## Architecture

```
Browser (visitor on external site)
  └── widget.iife.js (IIFE, self-contained, ~30kb minified)
        ├── GET  https://api.inculva.com/widget/config/:siteId
        ├── POST https://api.inculva.com/widget/events  (sendBeacon)
        └── Persists settings in localStorage

Browser (Inculva dashboard user)
  └── Next.js 15 App Router (Vercel)
        ├── Server Components → direct Prisma queries
        ├── Route Handlers → REST mutations
        ├── Better Auth → HTTP-only session cookies
        └── Client Components → React 19 hooks

apps/api — Fastify (Railway)
  ├── CORS: all origins (widget embedded on external sites)
  ├── Rate limit: 100 req/min
  ├── GET  /health
  ├── GET  /widget/config/:siteId  (public)
  ├── POST /widget/events          (public, quota-enforced)
  └── GET  /widget/events/:siteId (x-api-key required)

PostgreSQL 17
  └── Shared by both apps/api and apps/web via packages/db

Cloudflare R2 CDN
  └── https://cdn.inculva.com/widget.js  (deployed via GitHub Actions)
```

For a deep-dive see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Deployment

| Service               | Platform             | Trigger                                  |
| --------------------- | -------------------- | ---------------------------------------- |
| `apps/api`            | Railway.app (Docker) | Push to `main`                           |
| `apps/web`            | Vercel               | Push to `main`                           |
| `packages/widget` CDN | Cloudflare R2        | Push to `main` (widget src changes only) |
| Database              | Railway PostgreSQL   | Managed                                  |

For full deployment instructions see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Documentation

| Document                                               | Description                             |
| ------------------------------------------------------ | --------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)           | System design, data flow, key decisions |
| [docs/API.md](docs/API.md)                             | Full API reference (all endpoints)      |
| [docs/DATABASE.md](docs/DATABASE.md)                   | Schema reference, indexes, relations    |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)               | Production deployment guide             |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)           | Development workflow and conventions    |
| [apps/api/README.md](apps/api/README.md)               | Fastify API service docs                |
| [apps/web/README.md](apps/web/README.md)               | Next.js dashboard docs                  |
| [packages/widget/README.md](packages/widget/README.md) | Embeddable widget docs                  |

---

## Plans & Billing

| Plan     | Sites     | Events/month | Team members | Price  |
| -------- | --------- | ------------ | ------------ | ------ |
| Free     | 1         | 10,000       | —            | $0     |
| Pro      | 10        | 100,000      | 5            | $19/mo |
| Business | Unlimited | Unlimited    | Unlimited    | $49/mo |

Billing is fully integrated with LemonSqueezy via signed webhooks. On upgrade, the `User.plan` field and `Subscription` record are updated automatically.

---

## License

Proprietary. All rights reserved.
