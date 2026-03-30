# Contributing Guide

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [Adding a New Feature](#adding-a-new-feature)
- [Database Changes](#database-changes)
- [Adding a New Widget Feature](#adding-a-new-widget-feature)
- [Adding a New Email Template](#adding-a-new-email-template)
- [Testing](#testing)
- [CI Requirements](#ci-requirements)
- [Pull Request Process](#pull-request-process)

---

## Prerequisites

| Tool           | Version | Install                                                       |
| -------------- | ------- | ------------------------------------------------------------- |
| Node.js        | 20+     | [nodejs.org](https://nodejs.org)                              |
| pnpm           | 9+      | `npm i -g pnpm`                                               |
| Docker Desktop | Latest  | [docker.com](https://www.docker.com/products/docker-desktop/) |

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/inculva.git
cd inculva

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values (see README.md → Environment Variables)

# 4. Start Postgres and run migrations
make setup

# 5. Start all dev servers
make dev
```

Services after `make dev`:
| Service | URL |
|---|---|
| Dashboard (Next.js) | http://localhost:3000 |
| Widget API (Fastify) | http://localhost:3001 |
| pgAdmin | http://localhost:5050 |

---

## Project Structure

```
apps/api/src/
  server.ts          ← Fastify bootstrap
  plugins/           ← Fastify plugins (API key auth)
  routes/            ← Route handlers
  i18n/              ← Widget label translations

apps/web/src/
  app/               ← Next.js App Router (pages + route handlers)
  components/        ← Shared UI components
  lib/               ← Auth, billing, plan helpers
  i18n/              ← Dashboard translations

packages/db/
  prisma/schema.prisma   ← Database schema (single source of truth)
  src/client.ts          ← Singleton PrismaClient
  src/seed.ts            ← Demo data seeder

packages/email/src/
  templates/         ← HTML email templates

packages/types/src/
  api.ts             ← API response types
  billing.ts         ← Plan limits and billing constants
  user.ts            ← User and Site interfaces
  widget.ts          ← WidgetConfig and WidgetEvent interfaces

packages/widget/src/
  index.ts           ← inculvaWidget class + auto-init
  features/          ← Feature implementations (DOM manipulation)
  ui/                ← Panel HTML and CSS
  utils/             ← Session and localStorage utilities
```

---

## Development Workflow

### Running a single app

```bash
# Only the API
pnpm --filter @inculva/api dev

# Only the web app
pnpm --filter @inculva/web dev

# Only the widget (watch mode rebuild)
pnpm --filter @inculva/widget dev
```

### Useful commands

```bash
make db-studio      # Prisma Studio at http://localhost:5555
make migrate        # Create + apply a new Prisma migration
make seed           # Seed demo user and site
make db-reset       # Wipe DB and re-run all migrations
pnpm typecheck      # TypeScript check all packages
pnpm lint           # Lint all packages
pnpm build          # Build all packages
```

### Turborepo cache

Turborepo caches build outputs. If you see stale results:

```bash
pnpm clean          # Remove all dist/ and .next/ outputs
pnpm build          # Rebuild from scratch
```

---

## Code Conventions

### TypeScript

- Strict mode enabled (`tsconfig.base.json` extends strict)
- ESM modules everywhere (`"type": "module"` in package.json files)
- No `any` — use proper types or `unknown`
- Prefer named exports over default exports
- Use `void` for fire-and-forget promises: `void somePromise().catch(() => {})`

### Imports

Internal packages are imported by workspace name:

```typescript
import { db } from "@inculva/db";
import type { WidgetConfig } from "@inculva/types";
import { sendEmail } from "@inculva/email";
```

### Next.js App Router

- Server Components by default — add `"use client"` only when needed
- Route Handlers in `app/api/**` for mutations
- Server Components for data fetching (direct Prisma, no fetch hop)
- Always handle errors in Route Handlers and return proper HTTP status codes

### Fastify

- Register plugins before routes
- Use typed request generics: `app.get<{ Params: { id: string } }>`
- Use `preHandler` for auth (e.g., `app.verifyApiKey`)

### Styling

- Tailwind CSS 4 utility classes
- Use `cn()` from `@inculva/ui` for conditional class merging
- No inline styles except for dynamic values (e.g., `primaryColor`)

### Database

- Always use the `db` singleton from `@inculva/db`
- Never construct raw SQL
- Use `select` to limit fields fetched from the database
- Wrap multi-step mutations in transactions: `db.$transaction([...])`

---

## Adding a New Feature

### 1. New dashboard page

Create a Server Component at `apps/web/src/app/dashboard/your-feature/page.tsx`:

```typescript
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function YourFeaturePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const data = await db.someModel.findMany({
    where: { userId: session.user.id },
  });

  return <div>{/* render data */}</div>;
}
```

### 2. New API route (mutation)

Create `apps/web/src/app/api/your-route/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  // ... validate and process

  return NextResponse.json({ ok: true });
}
```

### 3. New shared type

Add to `packages/types/src/` and export from `packages/types/src/index.ts`.

---

## Database Changes

### Adding a new model or field

1. Edit `packages/db/prisma/schema.prisma`
2. Create a migration:
   ```bash
   make migrate
   # Prisma prompts for a migration name, e.g. "add_widget_theme_presets"
   ```
3. Regenerate the client (auto-runs with `db:migrate`, or manually):
   ```bash
   pnpm --filter @inculva/db db:generate
   ```
4. TypeScript will now show errors in any code using the old schema — fix them.
5. Commit both the schema change AND the migration file.

### Naming conventions

- Model names: PascalCase singular (`WidgetConfig`, not `widget_configs`)
- Field names: camelCase (`createdAt`, `lsSubscriptionId`)
- Relation names: camelCase (`widgetConfig`, `teamMemberships`)
- Index names: auto-generated by Prisma

---

## Adding a New Widget Feature

Widget features are defined in three places:

### 1. `packages/db/prisma/schema.prisma`

Add a Boolean field to `WidgetConfig`:

```prisma
model WidgetConfig {
  // ...existing fields...
  myNewFeature Boolean @default(true)
}
```

Run `make migrate`.

### 2. `packages/types/src/widget.ts`

Add the key to `WidgetFeatures`:

```typescript
export interface WidgetFeatures {
  // ...existing keys...
  myNewFeature: boolean;
}
```

### 3. `packages/widget/src/features/index.ts`

Add the feature implementation:

```typescript
export function applyMyNewFeature(enable: boolean): void {
  if (enable) {
    // Apply DOM manipulation
    document.documentElement.classList.add("inculva-my-feature");
  } else {
    document.documentElement.classList.remove("inculva-my-feature");
  }
}
```

### 4. `apps/api/src/routes/widget.ts`

Add the new field to the config response in `GET /widget/config/:siteId`.

### 5. `apps/api/src/i18n/labels.ts`

Add a label for the feature in all 41 language objects.

### 6. `apps/web/src/app/dashboard/sites/[id]/widget-config-form.tsx`

Add a toggle for the feature in the dashboard configurator.

---

## Adding a New Email Template

1. Create `packages/email/src/templates/my-template.ts`:

```typescript
export function myTemplate(name: string, param: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <p>Hello ${name},</p>
        <p>${param}</p>
      </body>
    </html>
  `;
}
```

2. Export from `packages/email/src/index.ts`:

```typescript
export { myTemplate } from "./templates/my-template.js";
```

3. Use it:

```typescript
import { sendEmail, myTemplate } from "@inculva/email";

await sendEmail({
  to: user.email,
  subject: "Your subject",
  html: myTemplate(user.name ?? "", someParam),
});
```

---

## Testing

Currently the project does not have automated unit/integration tests. Manual testing checklist:

### Widget testing

1. Run `pnpm --filter @inculva/widget dev` (watch mode)
2. Open `http://localhost:3000/dashboard/sites/[id]` to get your site ID
3. Create a test HTML file:
   ```html
   <!doctype html>
   <html>
     <body>
       <h1>Test page</h1>
       <script
         src="http://localhost:3000/widget.js"
         data-site-id="YOUR_SITE_ID"
       ></script>
     </body>
   </html>
   ```
4. Open in browser and verify the widget panel renders and features work

### API testing

Use the health endpoint to verify the API is running:

```bash
curl http://localhost:3001/health
# {"status":"ok","timestamp":"..."}
```

Test the widget config endpoint:

```bash
curl http://localhost:3001/widget/config/YOUR_SITE_ID
```

### Auth testing

1. Register at `http://localhost:3000/register`
2. Check your email for the verification link (requires valid `RESEND_API_KEY`)
3. Sign in, navigate dashboard, create a site

---

## CI Requirements

Every pull request must pass the CI pipeline:

```bash
pnpm typecheck    # Must have zero TypeScript errors
pnpm lint         # Must have zero ESLint errors
pnpm build        # Must build all packages without errors
```

Run locally before pushing:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

---

## Pull Request Process

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make changes with clear, atomic commits
3. Run `pnpm typecheck && pnpm lint` — fix any issues
4. Push and open a PR against `main`
5. CI must pass (typecheck + lint + build)
6. Get at least one review approval
7. Squash merge into `main`

### Commit message format

```
type(scope): short description

feat(widget): add color-blind deuteranopia filter
fix(api): handle missing Origin header in domain extraction
chore(db): add index on WidgetEvent.siteId
docs: update API reference for POST /widget/events
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `ci`
