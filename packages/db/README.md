# @inculva/db — Database Package

Shared Prisma ORM package. Defines the PostgreSQL schema and exports a singleton `PrismaClient`. Used by both `apps/api` and `apps/web`.

## Overview

This package is the **single source of truth** for the database schema. Both applications share the same Prisma schema, client, and migration history — ensuring no schema drift between services.

## Usage

```typescript
import { db } from "@inculva/db";

// Query
const user = await db.user.findUnique({ where: { id: userId } });

// Create
const site = await db.site.create({
  data: { name, domain, ownerId: userId },
});

// Transaction
await db.$transaction([
  db.site.delete({ where: { id: siteId } }),
  db.notification.create({ data: { ... } }),
]);
```

## Schema

15 models: `User`, `Session`, `Account`, `Verification`, `Subscription`, `Site`, `WidgetConfig`, `WidgetEvent`, `WidgetLoad`, `ApiKey`, `Notification`, `Team`, `TeamMember`, `TeamInvite`

See [../../docs/DATABASE.md](../../docs/DATABASE.md) for full schema documentation.

## Commands

```bash
pnpm db:generate   # Regenerate Prisma client after schema changes
pnpm db:migrate    # Create + apply a new migration (dev)
pnpm db:push       # Push schema without creating migration files
pnpm db:studio     # Open Prisma Studio at http://localhost:5555
pnpm db:seed       # Seed demo user + site
```

Or via Makefile from the repo root:

```bash
make migrate       # Run db:migrate
make db-studio     # Open Prisma Studio
make seed          # Run seeder
make db-reset      # Wipe DB + re-migrate
```

## Seed Data

`src/seed.ts` creates:
- User: `demo@inculva.com` / name "Demo User" (emailVerified: true)
- Site: `demo.example.com` with default `WidgetConfig`

## Client Singleton

The `db` export uses `globalThis` caching to prevent multiple `PrismaClient` instances during Next.js hot-reload:

```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```
