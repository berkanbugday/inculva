# Database Reference

PostgreSQL 17 via Prisma ORM 6. The schema is defined in `packages/db/prisma/schema.prisma` and shared between `apps/api` and `apps/web`.

## Table of Contents

- [Connection](#connection)
- [Schema Overview](#schema-overview)
- [Models](#models)
  - [User](#user)
  - [Session](#session)
  - [Account](#account)
  - [Verification](#verification)
  - [Subscription](#subscription)
  - [Site](#site)
  - [WidgetConfig](#widgetconfig)
  - [WidgetEvent](#widgetevent)
  - [WidgetLoad](#widgetload)
  - [ApiKey](#apikey)
  - [Notification](#notification)
  - [Team](#team)
  - [TeamMember](#teammember)
  - [TeamInvite](#teaminvite)
- [Indexes](#indexes)
- [Relationships Diagram](#relationships-diagram)
- [Common Queries](#common-queries)
- [Migrations](#migrations)

---

## Connection

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/inculva"
```

**Local dev:** Docker Compose runs Postgres 17 on port 5432.

**Production:** Railway PostgreSQL (Railway-managed connection string, injected as env var).

**Singleton client** (`packages/db/src/client.ts`):

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
```

The global cache prevents multiple PrismaClient instances during Next.js hot-reload in development.

---

## Schema Overview

| Model          | Rows type                   | Purpose                                    |
| -------------- | --------------------------- | ------------------------------------------ |
| `User`         | One per registered user     | Auth, billing, roles                       |
| `Session`      | Many per user               | Better Auth HTTP sessions                  |
| `Account`      | Many per user               | OAuth provider linkage                     |
| `Verification` | Transient                   | Email verification / password reset tokens |
| `Subscription` | One per user                | Active LemonSqueezy subscription           |
| `Site`         | Many per user/team          | A domain with the widget installed         |
| `WidgetConfig` | One per site                | Widget appearance + feature flags          |
| `WidgetEvent`  | Many per site               | Raw interaction events from visitors       |
| `WidgetLoad`   | One per (site, domain, day) | Daily aggregated page-load counts          |
| `ApiKey`       | Many per user               | Hashed API keys for programmatic access    |
| `Notification` | Many per user               | In-app notification inbox                  |
| `Team`         | Many per user               | Organization/workspace                     |
| `TeamMember`   | Many per team               | User ↔ Team with role                     |
| `TeamInvite`   | Many per team               | Pending email invitations                  |

---

## Models

### User

Core user record. Created on registration by Better Auth.

```prisma
model User {
  id               String    @id @default(cuid())
  email            String    @unique
  emailVerified    Boolean   @default(false)
  name             String?
  image            String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  role             String    @default("user")  // "user" | "admin"
  plan             String    @default("free")  // "free" | "pro" | "business"
  lsCustomerId     String?   @unique           // LemonSqueezy customer ID

  usageAlertSent80  DateTime?   // Last time 80% usage alert was sent
  usageAlertSent100 DateTime?   // Last time 100% usage alert was sent

  // Relations
  sessions         Session[]
  accounts         Account[]
  sites            Site[]
  apiKeys          ApiKey[]
  subscription     Subscription?
  ownedTeams       Team[]         @relation("TeamOwner")
  teamMemberships  TeamMember[]
  notifications    Notification[]
}
```

**Key fields:**

- `role`: `"user"` (default) or `"admin"`. Admin users can access `/admin/*` routes.
- `plan`: `"free"` (default), `"pro"`, or `"business"`. Updated by the LemonSqueezy webhook.
- `lsCustomerId`: Set when a LemonSqueezy checkout is completed. Used for customer portal URL generation.
- `usageAlertSent80/100`: Timestamps used to prevent duplicate usage alert emails within a calendar month.

---

### Session

Better Auth session records. HTTP-only cookie stores the `token`.

```prisma
model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Sessions are created on sign-in and destroyed on sign-out. Better Auth manages expiry.

---

### Account

OAuth provider accounts linked to a user. Currently only used for email+password (providerId: `"credential"`).

```prisma
model Account {
  id                    String    @id @default(cuid())
  userId                String
  accountId             String
  providerId            String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?   // bcrypt hash (for credential provider)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([providerId, accountId])
}
```

---

### Verification

Transient tokens for email verification and password resets. Better Auth creates and deletes these automatically.

```prisma
model Verification {
  id         String   @id @default(cuid())
  identifier String   // email address
  value      String   // the verification token
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([identifier, value])
}
```

---

### Subscription

LemonSqueezy subscription data. One record per user (one-to-one via `userId @unique`).

```prisma
model Subscription {
  id                   String    @id @default(cuid())
  userId               String    @unique
  lsSubscriptionId     String    @unique   // LemonSqueezy subscription ID
  lsVariantId          String              // LS variant ID (maps to plan)
  plan                 String              // "pro" | "business"
  status               String              // "active" | "past_due" | "canceled" | "paused"
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  canceledAt           DateTime?
  lsCustomerPortalUrl  String?             // Direct link to LS customer portal
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Created/updated by the `/api/webhooks/lemonsqueezy` route handler.

---

### Site

A website that has the inculva widget installed.

```prisma
model Site {
  id        String   @id @default(cuid())
  name      String
  domain    String   @unique   // e.g. "example.com" (no protocol)
  ownerId   String
  teamId    String?            // Optional: site can belong to a team
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  owner         User          @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  team          Team?         @relation(fields: [teamId], references: [id], onDelete: SetNull)
  widgetConfig  WidgetConfig?
  widgetEvents  WidgetEvent[]
  widgetLoads   WidgetLoad[]
}
```

**Notes:**

- `domain` must be unique across the entire platform (one site per domain).
- `teamId` is optional. A site can be personal (no team) or team-owned.
- When a site is created, a `WidgetConfig` record is automatically created with all defaults.

---

### WidgetConfig

Widget appearance and feature flags. One-to-one with `Site`.

```prisma
model WidgetConfig {
  id           String   @id @default(cuid())
  siteId       String   @unique
  position     String   @default("bottom-right")  // "bottom-right" | "bottom-left" | "top-right" | "top-left"
  theme        String   @default("auto")           // "auto" | "light" | "dark"
  primaryColor String   @default("#0066cc")        // hex color
  language     String   @default("en")             // ISO 639-1 code (41 supported)

  // Feature toggles (all default true)
  textResizing       Boolean @default(true)
  highContrast       Boolean @default(true)
  dyslexiaFont       Boolean @default(true)
  cursorEnhancement  Boolean @default(true)
  keyboardNavigation Boolean @default(true)
  readingGuide       Boolean @default(true)
  screenReader       Boolean @default(true)
  pauseAnimations    Boolean @default(true)
  textSpacing        Boolean @default(true)
  highlightLinks     Boolean @default(true)
  colorBlindMode     Boolean @default(true)
  largeClickTargets  Boolean @default(true)
  focusHighlight     Boolean @default(true)
  grayscale          Boolean @default(true)
  skipNavigation     Boolean @default(true)
  muteMedia          Boolean @default(true)

  accessibilityStatementUrl String?   // EAA Article 13
  whiteLabelText            String?   // null = show "Powered by inculva", "" = hide, "Acme" = show custom
  allowedDomains            String[]  @default([])   // empty = allow all

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  site Site @relation(fields: [siteId], references: [id], onDelete: Cascade)
}
```

---

### WidgetEvent

Raw event log from visitors interacting with the widget.

```prisma
model WidgetEvent {
  id        String   @id @default(cuid())
  siteId    String
  sessionId String   // per-visitor UUID (from widget's sessionStorage)
  event     String   // "opened" | "closed" | "feature_enabled" | "feature_disabled"
  feature   String?  // feature key (only for feature_enabled/disabled)
  createdAt DateTime @default(now())

  site Site @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@index([siteId])
  @@index([siteId, createdAt])
}
```

**Event types:**
| event | feature | Description |
|---|---|---|
| `opened` | null | User opened the widget panel |
| `closed` | null | User closed the widget panel |
| `feature_enabled` | e.g. `"highContrast"` | User enabled an accessibility feature |
| `feature_disabled` | e.g. `"highContrast"` | User disabled an accessibility feature |

**Quota enforcement:** The count of events per month per user is checked on every `POST /widget/events` call.

---

### WidgetLoad

Daily aggregated page-load counts — how many times the widget was loaded per domain per day.

```prisma
model WidgetLoad {
  id      String   @id @default(cuid())
  siteId  String
  domain  String   // hostname extracted from Origin/Referer header
  date    DateTime // truncated to UTC midnight
  count   Int      @default(1)

  site Site @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@unique([siteId, domain, date])
  @@index([siteId, date])
}
```

**Upsert pattern:** On each widget config fetch, the count for `(siteId, domain, today)` is incremented atomically. This provides the "domains embedding your widget" table in the analytics dashboard.

---

### ApiKey

User-managed API keys for programmatic access to the Fastify API.

```prisma
model ApiKey {
  id          String    @id @default(cuid())
  userId      String
  name        String
  keyHash     String    @unique    // SHA-256 hash of the raw key
  keyPrefix   String               // First 8 chars of raw key (for display)
  lastUsedAt  DateTime?
  expiresAt   DateTime?            // Optional expiry
  createdAt   DateTime  @default(now())
  revokedAt   DateTime?            // Set when revoked; null = active

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

**Key format:** `ink_` + 32 random hex bytes = 68 characters total.

**Security:** The raw key is never stored. Only `SHA-256(rawKey)` is stored. A leaked database does not expose raw keys.

---

### Notification

In-app notification inbox per user.

```prisma
model Notification {
  id        String    @id @default(cuid())
  userId    String
  type      String    // "team_invite" | "plan_upgraded" | "usage_warning" | "usage_limit"
  title     String
  body      String
  href      String?   // Optional link
  readAt    DateTime? // null = unread
  createdAt DateTime  @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@index([userId, readAt])
}
```

Notifications are created alongside emails for: team invites, plan upgrades, usage warnings, and usage limit reached.

---

### Team

An organization workspace that can own multiple sites.

```prisma
model Team {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique   // URL-safe identifier, e.g. "my-team"
  ownerId   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  owner   User         @relation("TeamOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  members TeamMember[]
  invites TeamInvite[]
  sites   Site[]

  @@index([ownerId])
}
```

Teams are only available on Pro (max 5 members) and Business (unlimited) plans.

---

### TeamMember

Junction table between `Team` and `User`.

```prisma
model TeamMember {
  id         String    @id @default(cuid())
  teamId     String
  userId     String
  role       String    @default("member")  // "admin" | "member"
  joinedAt   DateTime  @default(now())

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
  @@index([userId])
}
```

Team admins can manage members and send invites. Team members have read access.

---

### TeamInvite

Pending team invitation records.

```prisma
model TeamInvite {
  id         String    @id @default(cuid())
  teamId     String
  email      String
  role       String    @default("member")  // "admin" | "member"
  token      String    @unique             // Random token sent in invite email
  expiresAt  DateTime                      // 7 days from creation
  acceptedAt DateTime?                     // Set when invite is accepted
  createdAt  DateTime  @default(now())

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([teamId])
}
```

Invite tokens expire after 7 days. The invite URL is `/invites/:token`.

---

## Indexes

| Model          | Index                              | Purpose                      |
| -------------- | ---------------------------------- | ---------------------------- |
| `User`         | `email` (unique)                   | Sign-in lookup               |
| `User`         | `lsCustomerId` (unique)            | Billing webhook lookup       |
| `Session`      | `token` (unique)                   | Session cookie validation    |
| `Account`      | `[providerId, accountId]` (unique) | OAuth account lookup         |
| `Verification` | `[identifier, value]` (unique)     | Token verification           |
| `Subscription` | `lsSubscriptionId` (unique)        | Webhook idempotency          |
| `Site`         | `domain` (unique)                  | Config fetch by domain       |
| `WidgetConfig` | `siteId` (unique)                  | One-to-one with Site         |
| `WidgetEvent`  | `[siteId]`                         | Count events per site        |
| `WidgetEvent`  | `[siteId, createdAt]`              | Date-range event queries     |
| `WidgetLoad`   | `[siteId, domain, date]` (unique)  | Daily load upsert            |
| `WidgetLoad`   | `[siteId, date]`                   | Load aggregation queries     |
| `ApiKey`       | `keyHash` (unique)                 | Auth header verification     |
| `ApiKey`       | `[userId]`                         | List keys per user           |
| `Notification` | `[userId, createdAt]`              | Fetch recent notifications   |
| `Notification` | `[userId, readAt]`                 | Unread count queries         |
| `Team`         | `slug` (unique)                    | URL routing                  |
| `Team`         | `[ownerId]`                        | List owned teams             |
| `TeamMember`   | `[teamId, userId]` (unique)        | Prevent duplicate members    |
| `TeamMember`   | `[userId]`                         | List user's team memberships |
| `TeamInvite`   | `[token]`                          | Invite acceptance lookup     |
| `TeamInvite`   | `[teamId]`                         | List pending invites         |

---

## Relationships Diagram

```
User ─────────┬─── Session (1:N)
              ├─── Account (1:N)
              ├─── Verification (1:N, via identifier=email)
              ├─── Subscription (1:1)
              ├─── Site (1:N, as owner)
              ├─── ApiKey (1:N)
              ├─── Notification (1:N)
              ├─── Team (1:N, as owner)
              └─── TeamMember (N:M via Team)

Site ─────────┬─── WidgetConfig (1:1)
              ├─── WidgetEvent (1:N)
              └─── WidgetLoad (1:N)

Team ─────────┬─── TeamMember (1:N)
              ├─── TeamInvite (1:N)
              └─── Site (1:N)
```

---

## Common Queries

### Get user with subscription and sites

```typescript
const user = await db.user.findUnique({
  where: { id: userId },
  include: {
    subscription: true,
    sites: { include: { widgetConfig: true } },
  },
});
```

### Count monthly events for quota enforcement

```typescript
const startOfMonth = new Date();
startOfMonth.setUTCDate(1);
startOfMonth.setUTCHours(0, 0, 0, 0);

const count = await db.widgetEvent.count({
  where: {
    site: { ownerId: userId },
    createdAt: { gte: startOfMonth },
  },
});
```

### Get analytics (events last 30 days)

```typescript
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const events = await db.widgetEvent.findMany({
  where: { siteId, createdAt: { gte: thirtyDaysAgo } },
  orderBy: { createdAt: "desc" },
  take: 1000,
});
```

### Upsert daily domain load

```typescript
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

await db.widgetLoad.upsert({
  where: { siteId_domain_date: { siteId, domain, date: today } },
  create: { siteId, domain, date: today, count: 1 },
  update: { count: { increment: 1 } },
});
```

---

## Migrations

Migrations are stored in `packages/db/prisma/migrations/`.

```bash
# Create and apply a new migration
pnpm --filter @inculva/db db:migrate

# Apply existing migrations (no new migration file)
pnpm --filter @inculva/db db:push

# Regenerate Prisma client after schema change
pnpm --filter @inculva/db db:generate

# Open Prisma Studio (visual DB browser)
pnpm --filter @inculva/db db:studio
# Or: make db-studio
```

> Always run `db:generate` after changing `schema.prisma` so the TypeScript types update.
