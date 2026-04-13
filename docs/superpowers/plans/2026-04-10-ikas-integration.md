# ikas Integration App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js 15 Admin App for the ikas App Store that injects the inculva accessibility widget into ikas storefronts and provides widget configuration in the ikas admin panel.

**Architecture:** Thin client at `apps/integrations/ikas/` — OAuth2 install flow creates an inculva site, injects `widget.js` via ikas Storefront Events API, and embeds a config UI in the ikas admin iframe. All data writes go through the existing inculva API/DB. New `IkasStore` Prisma model links ikas merchants to inculva sites.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Iron Session, jose (JWT), Prisma, pnpm

---

## File Structure

```
apps/integrations/ikas/
├── .env.example
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── tailwind.css
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Tailwind, fonts)
│   │   ├── page.tsx                      # Install landing — starts OAuth
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                # Dashboard layout (iframe-friendly, no nav)
│   │   │   ├── page.tsx                  # Widget config form (main admin panel page)
│   │   │   └── reports/
│   │   │       └── page.tsx              # Link-out to app.inculva.com
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── callback/route.ts     # OAuth2 callback — token exchange + site creation
│   │       │   └── token/route.ts        # App Bridge token exchange
│   │       └── webhooks/
│   │           └── uninstall/route.ts    # App uninstall cleanup
│   ├── lib/
│   │   ├── ikas-client.ts               # ikas GraphQL API client (token, queries, mutations)
│   │   ├── session.ts                    # Iron Session config
│   │   ├── crypto.ts                     # Token encryption/decryption helpers
│   │   └── env.ts                        # Typed env var access
│   └── i18n/
│       ├── tr.ts                         # Turkish translations
│       ├── en.ts                         # English translations
│       └── useMessages.ts               # Hook to get messages by locale
```

Additionally modified:
- `packages/db/prisma/schema.prisma` — add `IkasStore` model
- `packages/db/src/index.ts` — export `IkasStore` type
- `pnpm-workspace.yaml` — add `apps/integrations/*`

---

### Task 1: Workspace Setup — Rename cms-plugins, Create integrations Directory

**Files:**
- Rename: `apps/cms-plugins/` → `apps/plugins/`
- Create: `apps/integrations/` directory
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: Rename cms-plugins to plugins**

```bash
cd /Users/berkan/Projects/inculva
mv apps/cms-plugins apps/plugins
```

- [ ] **Step 2: Create integrations directory**

```bash
mkdir -p apps/integrations
```

- [ ] **Step 3: Update pnpm-workspace.yaml**

Edit `pnpm-workspace.yaml` to:

```yaml
packages:
  - "apps/*"
  - "apps/integrations/*"
  - "packages/*"
```

- [ ] **Step 4: Verify workspace resolution**

```bash
pnpm install --frozen-lockfile
```

Expected: no errors, lockfile unchanged (no packages in integrations yet, plugins has no package.json).

- [ ] **Step 5: Commit**

```bash
git add apps/plugins apps/integrations pnpm-workspace.yaml
git rm -r --cached apps/cms-plugins 2>/dev/null || true
git commit -m "chore: rename cms-plugins to plugins, add integrations workspace"
```

---

### Task 2: Prisma Schema — Add IkasStore Model

**Files:**
- Modify: `packages/db/prisma/schema.prisma`
- Modify: `packages/db/src/index.ts`

- [ ] **Step 1: Add IkasStore model to schema.prisma**

Add at the end of `packages/db/prisma/schema.prisma`:

```prisma
// ─── ikas Integration ────────────────────────────────────────────────────────

model IkasStore {
  id             String    @id @default(cuid())
  siteId         String    @unique
  site           Site      @relation(fields: [siteId], references: [id], onDelete: Cascade)
  ikasStoreId    String    @unique
  ikasStoreName  String
  accessToken    String
  refreshToken   String?
  storefrontId   String
  scriptId       String?
  installedAt    DateTime  @default(now())
  uninstalledAt  DateTime?
}
```

- [ ] **Step 2: Add ikasStore relation to Site model**

In the `Site` model, add after the existing relations:

```prisma
  // Integrations
  ikasStore       IkasStore?
```

- [ ] **Step 3: Export IkasStore type**

Edit `packages/db/src/index.ts` — add `IkasStore` to the type export:

```typescript
export type {
  User,
  Site,
  WidgetConfig,
  WidgetEvent,
  Session,
  Account,
  Subscription,
  IkasStore,
} from "@prisma/client";
```

- [ ] **Step 4: Generate Prisma client and create migration**

```bash
cd packages/db
pnpm db:migrate --name add_ikas_store
```

Expected: migration created successfully, Prisma client regenerated.

- [ ] **Step 5: Build db package**

```bash
cd /Users/berkan/Projects/inculva
pnpm --filter @inculva/db build
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add packages/db/prisma packages/db/src/index.ts
git commit -m "feat: add IkasStore model for ikas integration"
```

---

### Task 3: Scaffold ikas Next.js App

**Files:**
- Create: `apps/integrations/ikas/package.json`
- Create: `apps/integrations/ikas/tsconfig.json`
- Create: `apps/integrations/ikas/next.config.ts`
- Create: `apps/integrations/ikas/postcss.config.mjs`
- Create: `apps/integrations/ikas/tailwind.css`
- Create: `apps/integrations/ikas/.env.example`
- Create: `apps/integrations/ikas/src/app/layout.tsx`
- Create: `apps/integrations/ikas/src/app/page.tsx` (placeholder)

- [ ] **Step 1: Create package.json**

Create `apps/integrations/ikas/package.json`:

```json
{
  "name": "@inculva/ikas",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3002",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "@inculva/db": "workspace:*",
    "@inculva/types": "workspace:*",
    "iron-session": "8.0.4",
    "jose": "6.0.11",
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-hook-form": "7.54.0",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.2.1",
    "@types/node": "22.10.7",
    "@types/react": "19",
    "@types/react-dom": "19",
    "tailwindcss": "4.2.1",
    "typescript": "5.7.3"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `apps/integrations/ikas/tsconfig.json`:

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

Create `apps/integrations/ikas/next.config.ts`:

```typescript
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: monorepoRoot,
  outputFileTracingIncludes: {
    "/**": [
      "../../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/**/*",
    ],
  },
  serverExternalPackages: ["@prisma/client"],
  transpilePackages: ["@inculva/db", "@inculva/types"],
  async headers() {
    return [
      {
        // Allow ikas admin to embed this app in an iframe
        source: "/dashboard/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://*.myikas.com https://*.ikas.com",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create postcss.config.mjs**

Create `apps/integrations/ikas/postcss.config.mjs`:

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Create tailwind.css**

Create `apps/integrations/ikas/tailwind.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 6: Create .env.example**

Create `apps/integrations/ikas/.env.example`:

```bash
# ikas OAuth credentials (from builders.ikas.com partner dashboard)
NEXT_PUBLIC_IKAS_CLIENT_ID=
IKAS_CLIENT_SECRET=

# ikas API
NEXT_PUBLIC_IKAS_API_URL=https://api.myikas.com/api/v2/admin/graphql

# This app's public URL (used for OAuth redirect and iframe embedding)
NEXT_PUBLIC_DEPLOY_URL=http://localhost:3002

# Iron Session encryption key (min 32 chars)
SECRET_COOKIE_PASSWORD=

# inculva platform URLs
NEXT_PUBLIC_INCULVA_APP_URL=http://localhost:3000
NEXT_PUBLIC_WIDGET_URL=http://localhost:3000/widget.js

# Database (shared with other apps)
DATABASE_URL=
```

- [ ] **Step 7: Create root layout**

Create `apps/integrations/ikas/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "../tailwind.css";

export const metadata: Metadata = {
  title: "inculva — ikas accessibility widget",
  description: "Accessibility widget integration for ikas stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create placeholder landing page**

Create `apps/integrations/ikas/src/app/page.tsx`:

```tsx
export default function InstallPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">ikas integration — install flow pending</p>
    </main>
  );
}
```

- [ ] **Step 9: Install dependencies and verify build**

```bash
cd /Users/berkan/Projects/inculva
pnpm install
pnpm --filter @inculva/ikas build
```

Expected: Next.js build succeeds.

- [ ] **Step 10: Commit**

```bash
git add apps/integrations/ikas pnpm-lock.yaml
git commit -m "feat: scaffold ikas integration Next.js app"
```

---

### Task 4: Lib Layer — Environment, Session, Crypto, ikas Client

**Files:**
- Create: `apps/integrations/ikas/src/lib/env.ts`
- Create: `apps/integrations/ikas/src/lib/session.ts`
- Create: `apps/integrations/ikas/src/lib/crypto.ts`
- Create: `apps/integrations/ikas/src/lib/ikas-client.ts`

- [ ] **Step 1: Create env.ts**

Create `apps/integrations/ikas/src/lib/env.ts`:

```typescript
export const env = {
  ikasClientId: process.env["NEXT_PUBLIC_IKAS_CLIENT_ID"]!,
  ikasClientSecret: process.env["IKAS_CLIENT_SECRET"]!,
  ikasApiUrl:
    process.env["NEXT_PUBLIC_IKAS_API_URL"] ??
    "https://api.myikas.com/api/v2/admin/graphql",
  deployUrl: process.env["NEXT_PUBLIC_DEPLOY_URL"]!,
  cookiePassword: process.env["SECRET_COOKIE_PASSWORD"]!,
  inculvaAppUrl: process.env["NEXT_PUBLIC_INCULVA_APP_URL"]!,
  widgetUrl: process.env["NEXT_PUBLIC_WIDGET_URL"]!,
  databaseUrl: process.env["DATABASE_URL"]!,
} as const;
```

- [ ] **Step 2: Create session.ts**

Create `apps/integrations/ikas/src/lib/session.ts`:

```typescript
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";

export interface SessionData {
  ikasStoreId?: string;
  ikasStoreName?: string;
  siteId?: string;
  accessToken?: string;
}

const sessionOptions: SessionOptions = {
  password: env.cookiePassword,
  cookieName: "ikas_session",
  cookieOptions: {
    secure: process.env["NODE_ENV"] === "production",
    httpOnly: true,
    sameSite: "none" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
```

- [ ] **Step 3: Create crypto.ts**

Create `apps/integrations/ikas/src/lib/crypto.ts`:

```typescript
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getKey(): Buffer {
  const secret = process.env["SECRET_COOKIE_PASSWORD"]!;
  // Use first 32 bytes of the secret as AES key
  return Buffer.from(secret.padEnd(32, "0").slice(0, 32), "utf-8");
}

export function encrypt(text: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf-8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  // Format: iv:authTag:encrypted (all base64)
  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decrypt(data: string): string {
  const [ivB64, authTagB64, encryptedB64] = data.split(":");
  const iv = Buffer.from(ivB64!, "base64");
  const authTag = Buffer.from(authTagB64!, "base64");
  const encrypted = Buffer.from(encryptedB64!, "base64");
  const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf-8");
}
```

- [ ] **Step 4: Create ikas-client.ts**

Create `apps/integrations/ikas/src/lib/ikas-client.ts`:

```typescript
import { env } from "./env";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Exchange OAuth authorization code for an access token.
 * Used during the install flow (Authorization Code grant).
 */
export async function exchangeCodeForToken(
  code: string,
  storeName: string,
): Promise<TokenResponse> {
  const res = await fetch(
    `https://${storeName}.myikas.com/api/admin/oauth/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.ikasClientId,
        client_secret: env.ikasClientSecret,
        code,
        redirect_uri: `${env.deployUrl}/api/auth/callback`,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

/**
 * Execute a GraphQL query/mutation against the ikas Admin API.
 */
export async function ikasGraphQL<T = unknown>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(env.ikasApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ikas API error: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown[] };
  if (json.errors) {
    throw new Error(`ikas GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

/**
 * Fetch the merchant's storefronts to find the storefront ID.
 */
export async function getStorefronts(
  accessToken: string,
): Promise<{ id: string; name: string }[]> {
  const data = await ikasGraphQL<{
    listStorefront: { id: string; name: string }[];
  }>(accessToken, `{ listStorefront { id name } }`);
  return data.listStorefront;
}

/**
 * Register the inculva widget script on the storefront.
 * Returns the script ID for later removal.
 */
export async function registerWidgetScript(
  accessToken: string,
  storefrontId: string,
  siteId: string,
): Promise<string | null> {
  const scriptContent = `<script src="${env.widgetUrl}" data-site-id="${siteId}" defer></script>`;

  const data = await ikasGraphQL<{
    createStorefrontJSScript: { id: string } | null;
  }>(
    accessToken,
    `mutation CreateScript($input: CreateStorefrontJSScriptInput!) {
      createStorefrontJSScript(input: $input) { id }
    }`,
    {
      input: {
        storefrontId,
        name: "inculva accessibility widget",
        scriptContent,
        isHighPriority: false,
      },
    },
  );

  return data.createStorefrontJSScript?.id ?? null;
}

/**
 * Remove the widget script from the storefront.
 */
export async function removeWidgetScript(
  accessToken: string,
  scriptId: string,
): Promise<boolean> {
  const data = await ikasGraphQL<{
    deleteStorefrontJSScript: boolean;
  }>(
    accessToken,
    `mutation DeleteScript($id: String!) {
      deleteStorefrontJSScript(id: $id)
    }`,
    { id: scriptId },
  );

  return data.deleteStorefrontJSScript;
}
```

- [ ] **Step 5: Verify typecheck**

```bash
pnpm --filter @inculva/ikas typecheck
```

Expected: passes (some env warnings acceptable in dev, no type errors).

- [ ] **Step 6: Commit**

```bash
git add apps/integrations/ikas/src/lib
git commit -m "feat(ikas): add lib layer — env, session, crypto, ikas API client"
```

---

### Task 5: i18n — Turkish and English Translations

**Files:**
- Create: `apps/integrations/ikas/src/i18n/en.ts`
- Create: `apps/integrations/ikas/src/i18n/tr.ts`
- Create: `apps/integrations/ikas/src/i18n/useMessages.ts`

- [ ] **Step 1: Create en.ts**

Create `apps/integrations/ikas/src/i18n/en.ts`:

```typescript
export const en = {
  install: {
    title: "inculva accessibility widget",
    description: "Add an accessibility widget to your ikas store in one click.",
    installing: "Setting up your accessibility widget…",
    success: "Widget installed successfully!",
    error: "Installation failed. Please try again.",
    retry: "Retry",
  },
  dashboard: {
    title: "accessibility widget settings",
    save: "Save",
    saving: "Saving…",
    saved: "Settings saved",
    error: "Failed to save settings",
    viewReports: "View scan reports",
    viewReportsDescription: "Open the full accessibility dashboard on inculva",
    position: "Widget position",
    primaryColor: "Primary color",
    language: "Widget language",
    buttonSize: "Button size",
    buttonIcon: "Button icon",
    features: "Features",
    profiles: "Accessibility profiles",
    small: "Small",
    medium: "Medium",
    large: "Large",
  },
  uninstall: {
    removed: "Widget removed from your store.",
  },
} as const;
```

- [ ] **Step 2: Create tr.ts**

Create `apps/integrations/ikas/src/i18n/tr.ts`:

```typescript
export const tr = {
  install: {
    title: "inculva erişilebilirlik widget'ı",
    description:
      "Tek tıkla ikas mağazanıza erişilebilirlik widget'ı ekleyin.",
    installing: "Erişilebilirlik widget'ınız kuruluyor…",
    success: "Widget başarıyla kuruldu!",
    error: "Kurulum başarısız oldu. Lütfen tekrar deneyin.",
    retry: "Tekrar dene",
  },
  dashboard: {
    title: "erişilebilirlik widget ayarları",
    save: "Kaydet",
    saving: "Kaydediliyor…",
    saved: "Ayarlar kaydedildi",
    error: "Ayarlar kaydedilemedi",
    viewReports: "Tarama raporlarını görüntüle",
    viewReportsDescription:
      "inculva üzerinde tam erişilebilirlik panosunu açın",
    position: "Widget konumu",
    primaryColor: "Ana renk",
    language: "Widget dili",
    buttonSize: "Buton boyutu",
    buttonIcon: "Buton ikonu",
    features: "Özellikler",
    profiles: "Erişilebilirlik profilleri",
    small: "Küçük",
    medium: "Orta",
    large: "Büyük",
  },
  uninstall: {
    removed: "Widget mağazanızdan kaldırıldı.",
  },
} as const;
```

- [ ] **Step 3: Create useMessages.ts**

Create `apps/integrations/ikas/src/i18n/useMessages.ts`:

```typescript
import { en } from "./en";
import { tr } from "./tr";

const messages: Record<string, typeof en> = { en, tr };

export function getMessages(locale: string): typeof en {
  return messages[locale] ?? en;
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/integrations/ikas/src/i18n
git commit -m "feat(ikas): add i18n translations for Turkish and English"
```

---

### Task 6: OAuth Callback Route — Install Flow

**Files:**
- Create: `apps/integrations/ikas/src/app/api/auth/callback/route.ts`

- [ ] **Step 1: Create the OAuth callback route**

Create `apps/integrations/ikas/src/app/api/auth/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { exchangeCodeForToken, getStorefronts, registerWidgetScript } from "@/lib/ikas-client";
import { encrypt } from "@/lib/crypto";
import { getSession } from "@/lib/session";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const storeName = searchParams.get("store");

  if (!code || !storeName) {
    return NextResponse.redirect(
      `${env.deployUrl}?error=missing_params`,
    );
  }

  try {
    // 1. Exchange authorization code for access token
    const tokenData = await exchangeCodeForToken(code, storeName);

    // 2. Get storefront ID
    const storefronts = await getStorefronts(tokenData.access_token);
    const storefront = storefronts[0];
    if (!storefront) {
      return NextResponse.redirect(
        `${env.deployUrl}?error=no_storefront`,
      );
    }

    // 3. Check if this ikas store is already linked
    const existing = await db.ikasStore.findUnique({
      where: { ikasStoreId: storeName },
    });

    let siteId: string;

    if (existing && !existing.uninstalledAt) {
      // Already installed — update tokens
      await db.ikasStore.update({
        where: { id: existing.id },
        data: {
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
        },
      });
      siteId = existing.siteId;
    } else if (existing && existing.uninstalledAt) {
      // Reinstall — reactivate
      await db.ikasStore.update({
        where: { id: existing.id },
        data: {
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
          uninstalledAt: null,
          installedAt: new Date(),
        },
      });
      siteId = existing.siteId;
    } else {
      // New install — create inculva site + ikas store record
      const domain = `${storeName}.myikas.com`;

      // Check if a site with this domain already exists
      const existingSite = await db.site.findUnique({
        where: { domain },
      });

      if (existingSite) {
        siteId = existingSite.id;
      } else {
        // Create a system user for ikas-managed sites (or use a dedicated ikas owner)
        const site = await db.site.create({
          data: {
            name: storeName,
            domain,
            // Use a dedicated ikas integration owner ID — set via env or create on first use
            ownerId: await getOrCreateIkasOwner(),
            widgetConfig: {
              create: {
                position: "bottom-right",
                theme: "auto",
                primaryColor: "#0066cc",
                language: "tr",
              },
            },
          },
        });
        siteId = site.id;
      }

      await db.ikasStore.create({
        data: {
          siteId,
          ikasStoreId: storeName,
          ikasStoreName: storeName,
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
        },
      });
    }

    // 4. Register widget script on the storefront
    const ikasStore = await db.ikasStore.findUnique({
      where: { siteId },
    });

    if (ikasStore && !ikasStore.scriptId) {
      const scriptId = await registerWidgetScript(
        tokenData.access_token,
        storefront.id,
        siteId,
      );
      if (scriptId) {
        await db.ikasStore.update({
          where: { id: ikasStore.id },
          data: { scriptId },
        });
      }
    }

    // 5. Set session and redirect to dashboard
    const session = await getSession();
    session.ikasStoreId = storeName;
    session.ikasStoreName = storeName;
    session.siteId = siteId;
    session.accessToken = tokenData.access_token;
    await session.save();

    return NextResponse.redirect(`${env.deployUrl}/dashboard`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      `${env.deployUrl}?error=auth_failed`,
    );
  }
}

/**
 * Get or create a dedicated system user for ikas-managed sites.
 * This user owns all sites created via the ikas integration.
 */
async function getOrCreateIkasOwner(): Promise<string> {
  const email = "ikas-integration@inculva.com";
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return existing.id;

  const user = await db.user.create({
    data: {
      email,
      name: "ikas integration",
      emailVerified: true,
      role: "admin",
    },
  });
  return user.id;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
pnpm --filter @inculva/ikas typecheck
```

Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add apps/integrations/ikas/src/app/api/auth
git commit -m "feat(ikas): add OAuth callback route with site creation and script injection"
```

---

### Task 7: App Bridge Token Route

**Files:**
- Create: `apps/integrations/ikas/src/app/api/auth/token/route.ts`

- [ ] **Step 1: Create App Bridge token route**

Create `apps/integrations/ikas/src/app/api/auth/token/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getSession } from "@/lib/session";
import { env } from "@/lib/env";

/**
 * App Bridge sends a signed JWT to verify the iframe context.
 * This endpoint validates it and returns session data.
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = (await request.json()) as { token?: string };
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Verify JWT signed by ikas with the client secret
    const secret = new TextEncoder().encode(env.ikasClientSecret);
    const { payload } = await jwtVerify(token, secret);

    const storeName = payload["store"] as string | undefined;
    if (!storeName) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }

    // Refresh session from JWT context
    const session = await getSession();
    session.ikasStoreId = storeName;
    session.ikasStoreName = storeName;
    await session.save();

    return NextResponse.json({ ok: true, store: storeName });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/integrations/ikas/src/app/api/auth/token
git commit -m "feat(ikas): add App Bridge JWT token verification route"
```

---

### Task 8: Uninstall Webhook Route

**Files:**
- Create: `apps/integrations/ikas/src/app/api/webhooks/uninstall/route.ts`

- [ ] **Step 1: Create uninstall webhook route**

Create `apps/integrations/ikas/src/app/api/webhooks/uninstall/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { decrypt } from "@/lib/crypto";
import { removeWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      store?: string;
      topic?: string;
    };

    const storeName = body.store;
    if (!storeName) {
      return NextResponse.json({ error: "Missing store" }, { status: 400 });
    }

    const ikasStore = await db.ikasStore.findUnique({
      where: { ikasStoreId: storeName },
    });

    if (!ikasStore) {
      // Already removed or never existed — acknowledge
      return NextResponse.json({ ok: true });
    }

    // Try to remove the script from the storefront
    if (ikasStore.scriptId) {
      try {
        const token = decrypt(ikasStore.accessToken);
        await removeWidgetScript(token, ikasStore.scriptId);
      } catch {
        // Token may be revoked — continue with soft delete
      }
    }

    // Soft-delete: mark as uninstalled, keep siteId for reinstall
    await db.ikasStore.update({
      where: { id: ikasStore.id },
      data: {
        uninstalledAt: new Date(),
        scriptId: null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Uninstall webhook error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/integrations/ikas/src/app/api/webhooks
git commit -m "feat(ikas): add uninstall webhook with script cleanup"
```

---

### Task 9: Install Landing Page

**Files:**
- Modify: `apps/integrations/ikas/src/app/page.tsx`

- [ ] **Step 1: Implement the install landing page**

Replace `apps/integrations/ikas/src/app/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { getSession } from "@/lib/session";

interface Props {
  searchParams: Promise<{ error?: string; store?: string }>;
}

export default async function InstallPage({ searchParams }: Props) {
  const { error, store } = await searchParams;

  // If already authenticated, go to dashboard
  const session = await getSession();
  if (session.siteId) {
    redirect("/dashboard");
  }

  // Build OAuth URL for ikas
  const oauthUrl = store
    ? `https://${store}.myikas.com/api/admin/oauth/authorize?client_id=${env.ikasClientId}&redirect_uri=${encodeURIComponent(`${env.deployUrl}/api/auth/callback`)}&response_type=code&store=${store}`
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          inculva accessibility widget
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Add an accessibility widget to your ikas store in one click.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error === "missing_params" && "Missing authorization parameters."}
            {error === "no_storefront" && "No storefront found for this store."}
            {error === "auth_failed" && "Authentication failed. Please try again."}
          </div>
        )}

        {oauthUrl ? (
          <a
            href={oauthUrl}
            className="block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Install widget
          </a>
        ) : (
          <p className="text-sm text-gray-400">
            This page is accessed from the ikas App Store during installation.
          </p>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/integrations/ikas/src/app/page.tsx
git commit -m "feat(ikas): implement install landing page with OAuth redirect"
```

---

### Task 10: Dashboard Layout (iframe-friendly)

**Files:**
- Create: `apps/integrations/ikas/src/app/dashboard/layout.tsx`

- [ ] **Step 1: Create dashboard layout**

Create `apps/integrations/ikas/src/app/dashboard/layout.tsx`:

```tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.siteId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/integrations/ikas/src/app/dashboard/layout.tsx
git commit -m "feat(ikas): add dashboard layout with session guard"
```

---

### Task 11: Dashboard Page — Widget Config Form

**Files:**
- Create: `apps/integrations/ikas/src/app/dashboard/page.tsx`
- Create: `apps/integrations/ikas/src/app/dashboard/config-form.tsx`
- Create: `apps/integrations/ikas/src/app/api/config/route.ts`

- [ ] **Step 1: Create the config API route**

Create `apps/integrations/ikas/src/app/api/config/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.siteId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await db.widgetConfig.findUnique({
    where: { siteId: session.siteId },
  });

  if (!config) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session.siteId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const VALID_POSITIONS = new Set(["bottom-right", "bottom-left", "top-right", "top-left"]);
  const VALID_BUTTON_SIZES = new Set(["small", "medium", "large"]);
  const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

  if (body.position !== undefined && !VALID_POSITIONS.has(body.position)) {
    return NextResponse.json({ error: "Invalid position" }, { status: 400 });
  }
  if (body.primaryColor !== undefined && !HEX_COLOR_RE.test(body.primaryColor)) {
    return NextResponse.json({ error: "Invalid color" }, { status: 400 });
  }
  if (body.buttonSize !== undefined && !VALID_BUTTON_SIZES.has(body.buttonSize)) {
    return NextResponse.json({ error: "Invalid button size" }, { status: 400 });
  }

  await db.widgetConfig.update({
    where: { siteId: session.siteId },
    data: body,
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Create config-form.tsx (client component)**

Create `apps/integrations/ikas/src/app/dashboard/config-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface Config {
  position: string;
  primaryColor: string;
  language: string;
  buttonSize: string;
  textResizing: boolean;
  dyslexiaFont: boolean;
  cursorEnhancement: boolean;
  keyboardNavigation: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  pauseAnimations: boolean;
  textSpacing: boolean;
  highlightLinks: boolean;
  colorBlindMode: boolean;
  focusHighlight: boolean;
  skipNavigation: boolean;
  darkMode: boolean;
  profileAdhd: boolean;
  profileBlind: boolean;
  profileLowVision: boolean;
  profileColorBlind: boolean;
  profileDyslexia: boolean;
  profileMotorImpaired: boolean;
}

const POSITIONS = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
] as const;

const BUTTON_SIZES = ["small", "medium", "large"] as const;

const FEATURES: { key: keyof Config; label: string }[] = [
  { key: "textResizing", label: "Text Resizing" },
  { key: "dyslexiaFont", label: "Dyslexia Font" },
  { key: "cursorEnhancement", label: "Cursor Enhancement" },
  { key: "keyboardNavigation", label: "Keyboard Navigation" },
  { key: "readingGuide", label: "Reading Guide" },
  { key: "screenReader", label: "Screen Reader" },
  { key: "pauseAnimations", label: "Pause Animations" },
  { key: "textSpacing", label: "Text Spacing" },
  { key: "highlightLinks", label: "Highlight Links" },
  { key: "colorBlindMode", label: "Color Blind Mode" },
  { key: "focusHighlight", label: "Focus Highlight" },
  { key: "skipNavigation", label: "Skip Navigation" },
  { key: "darkMode", label: "Dark Mode" },
];

const PROFILES: { key: keyof Config; label: string }[] = [
  { key: "profileAdhd", label: "ADHD" },
  { key: "profileBlind", label: "Blind" },
  { key: "profileLowVision", label: "Low Vision" },
  { key: "profileColorBlind", label: "Color Blind" },
  { key: "profileDyslexia", label: "Dyslexia" },
  { key: "profileMotorImpaired", label: "Motor Impaired" },
];

interface Props {
  initialConfig: Config;
  locale: string;
}

export function ConfigForm({ initialConfig, locale }: Props) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const { register, handleSubmit, watch } = useForm<Config>({
    defaultValues: initialConfig,
  });

  const isEn = locale !== "tr";

  async function onSubmit(data: Config) {
    setStatus("saving");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Position */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {isEn ? "Widget position" : "Widget konumu"}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {POSITIONS.map((pos) => (
            <label
              key={pos.value}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                watch("position") === pos.value
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                value={pos.value}
                {...register("position")}
                className="sr-only"
              />
              {pos.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Primary Color */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          {isEn ? "Primary color" : "Ana renk"}
        </span>
        <div className="mt-1 flex items-center gap-3">
          <input
            type="color"
            {...register("primaryColor")}
            className="h-9 w-9 cursor-pointer rounded border border-gray-200"
          />
          <input
            type="text"
            {...register("primaryColor")}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-mono"
          />
        </div>
      </label>

      {/* Button Size */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {isEn ? "Button size" : "Buton boyutu"}
        </legend>
        <div className="flex gap-2">
          {BUTTON_SIZES.map((size) => (
            <label
              key={size}
              className={`rounded-lg border px-4 py-2 text-sm cursor-pointer transition-colors ${
                watch("buttonSize") === size
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                value={size}
                {...register("buttonSize")}
                className="sr-only"
              />
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Features */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {isEn ? "Features" : "Özellikler"}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map((f) => (
            <label
              key={f.key}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:border-gray-300"
            >
              <input
                type="checkbox"
                {...register(f.key)}
                className="rounded border-gray-300"
              />
              {f.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Profiles */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700 mb-2">
          {isEn ? "Accessibility profiles" : "Erişilebilirlik profilleri"}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {PROFILES.map((p) => (
            <label
              key={p.key}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:border-gray-300"
            >
              <input
                type="checkbox"
                {...register(p.key)}
                className="rounded border-gray-300"
              />
              {p.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {status === "saving"
            ? isEn ? "Saving…" : "Kaydediliyor…"
            : isEn ? "Save" : "Kaydet"}
        </button>
        {status === "saved" && (
          <span className="text-sm text-green-600">
            {isEn ? "Settings saved" : "Ayarlar kaydedildi"}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">
            {isEn ? "Failed to save" : "Kayıt başarısız"}
          </span>
        )}
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Create dashboard page (server component)**

Create `apps/integrations/ikas/src/app/dashboard/page.tsx`:

```tsx
import { db } from "@inculva/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { ConfigForm } from "./config-form";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.siteId) redirect("/");

  const config = await db.widgetConfig.findUnique({
    where: { siteId: session.siteId },
  });

  if (!config) redirect("/");

  const initialConfig = {
    position: config.position,
    primaryColor: config.primaryColor,
    language: config.language,
    buttonSize: (config.buttonSize as string) ?? "medium",
    textResizing: config.textResizing,
    dyslexiaFont: config.dyslexiaFont,
    cursorEnhancement: config.cursorEnhancement,
    keyboardNavigation: config.keyboardNavigation,
    readingGuide: config.readingGuide,
    screenReader: config.screenReader,
    pauseAnimations: config.pauseAnimations,
    textSpacing: config.textSpacing,
    highlightLinks: config.highlightLinks,
    colorBlindMode: config.colorBlindMode,
    focusHighlight: config.focusHighlight,
    skipNavigation: config.skipNavigation,
    darkMode: config.darkMode,
    profileAdhd: config.profileAdhd,
    profileBlind: config.profileBlind,
    profileLowVision: config.profileLowVision,
    profileColorBlind: config.profileColorBlind,
    profileDyslexia: config.profileDyslexia,
    profileMotorImpaired: config.profileMotorImpaired,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          inculva widget settings
        </h1>
        <a
          href={`${env.inculvaAppUrl}/dashboard/sites/${session.siteId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          View scan reports &rarr;
        </a>
      </div>

      <ConfigForm initialConfig={initialConfig} locale={config.language} />
    </div>
  );
}
```

- [ ] **Step 4: Verify typecheck**

```bash
pnpm --filter @inculva/ikas typecheck
```

Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add apps/integrations/ikas/src/app/dashboard apps/integrations/ikas/src/app/api/config
git commit -m "feat(ikas): add dashboard with widget config form and config API"
```

---

### Task 12: Reports Link-Out Page

**Files:**
- Create: `apps/integrations/ikas/src/app/dashboard/reports/page.tsx`

- [ ] **Step 1: Create reports page**

Create `apps/integrations/ikas/src/app/dashboard/reports/page.tsx`:

```tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export default async function ReportsPage() {
  const session = await getSession();
  if (!session.siteId) redirect("/");

  const dashboardUrl = `${env.inculvaAppUrl}/dashboard/sites/${session.siteId}`;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-lg font-semibold text-gray-900 mb-2">
        Accessibility reports
      </h1>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        View detailed WCAG compliance scans, issue reports, and accessibility
        scores on the inculva dashboard.
      </p>
      <a
        href={dashboardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Open inculva dashboard &rarr;
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/integrations/ikas/src/app/dashboard/reports
git commit -m "feat(ikas): add reports link-out page to inculva dashboard"
```

---

### Task 13: Final Build Verification & Cleanup

**Files:**
- Verify all files compile and build

- [ ] **Step 1: Create .env.local for local testing**

```bash
cp apps/integrations/ikas/.env.example apps/integrations/ikas/.env.local
```

Fill in test values (at minimum `SECRET_COOKIE_PASSWORD` with a 32+ char string and `DATABASE_URL`).

- [ ] **Step 2: Run full typecheck**

```bash
pnpm --filter @inculva/ikas typecheck
```

Expected: passes with no errors.

- [ ] **Step 3: Run full build**

```bash
pnpm --filter @inculva/ikas build
```

Expected: Next.js build completes successfully.

- [ ] **Step 4: Run monorepo-wide typecheck**

```bash
pnpm typecheck
```

Expected: all packages pass.

- [ ] **Step 5: Final commit if any cleanup needed**

```bash
git add -A
git status
# Only commit if there are changes
git commit -m "chore(ikas): build verification and cleanup"
```
