# ikas Integration Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full rewrite of the ikas integration app as a clean, production-grade embedded iframe application with automatic provisioning, database-stored tokens with auto-refresh, and JWT-based auth.

**Architecture:** Next.js 15 App Router embedded in ikas admin iframe. OAuth callback auto-creates system user + site + widget config + ikas store. Dashboard uses short-lived JWT (sessionStorage). ikas tokens stored encrypted in DB with automatic refresh. AppBridge token exchange for returning iframe visits.

**Tech Stack:** Next.js 15, jose (JWT), react-hook-form, Tailwind CSS 4, @inculva/db (Prisma), Node.js native crypto

---

## File Structure

```
src/
├── tailwind.css                         (keep as-is)
├── lib/
│   ├── env.ts                           (rewrite — remove adminUrl)
│   ├── crypto.ts                        (keep as-is)
│   ├── auth.ts                          (rewrite — remove setup JWT)
│   ├── locale.ts                        (keep as-is)
│   └── ikas-client.ts                   (rewrite — remove getAuthorizeUrl, update redirect URI)
├── app/
│   ├── layout.tsx                       (keep as-is)
│   ├── page.tsx                         (rewrite — entry page with error display)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── callback/route.ts        (rewrite — unified OAuth callback with auto-provisioning)
│   │   │   └── exchange/route.ts        (keep — AppBridge token exchange for iframe)
│   │   ├── config/route.ts              (rewrite — add POST for inject-script)
│   │   └── webhooks/
│   │       └── uninstall/route.ts       (keep as-is)
│   └── dashboard/
│       ├── page.tsx                     (keep as-is)
│       ├── config-form.types.ts         (keep as-is)
│       └── config-form.tsx              (modify — update inject-script URL)
```

**Files to delete:**
- `src/lib/session.ts` — iron-session, not needed
- `src/lib/password.ts` — scrypt hashing, not needed (no user password)
- `src/app/setup/` — entire directory (setup page + form)
- `src/app/authorize-store/` — entire directory (old authorize page)
- `src/app/callback/` — entire directory (old callback page)
- `src/app/api/setup/` — entire directory (setup API route)
- `src/app/api/oauth/` — entire directory (old OAuth routes using iron-session)
- `src/app/api/config/inject-script/` — entire directory (merged into config route POST)

---

### Task 1: Delete old files and unused directories

**Files:**
- Delete: `src/lib/session.ts`
- Delete: `src/lib/password.ts`
- Delete: `src/app/setup/` (entire directory)
- Delete: `src/app/authorize-store/` (entire directory)
- Delete: `src/app/callback/` (entire directory)
- Delete: `src/app/api/setup/` (entire directory)
- Delete: `src/app/api/oauth/` (entire directory)
- Delete: `src/app/api/config/inject-script/` (entire directory)

- [ ] **Step 1: Delete all unused files and directories**

```bash
cd apps/integrations/ikas/src
rm -f lib/session.ts lib/password.ts
rm -rf app/setup app/authorize-store app/callback
rm -rf app/api/setup app/api/oauth app/api/config/inject-script
```

- [ ] **Step 2: Verify directory structure is clean**

```bash
find apps/integrations/ikas/src -type f | sort
```

Expected remaining files:
```
app/api/auth/callback/route.ts
app/api/auth/exchange/route.ts
app/api/config/route.ts
app/api/webhooks/uninstall/route.ts
app/dashboard/config-form.tsx
app/dashboard/config-form.types.ts
app/dashboard/page.tsx
app/layout.tsx
app/page.tsx
lib/auth.ts
lib/crypto.ts
lib/env.ts
lib/ikas-client.ts
lib/locale.ts
tailwind.css
```

- [ ] **Step 3: Commit deletion**

```bash
git add -A apps/integrations/ikas/src/
git commit -m "chore(ikas): delete unused files for clean rewrite

Remove setup page, old OAuth routes, iron-session, password hashing,
and manual inject-script endpoint. Preparing for automatic provisioning flow."
```

---

### Task 2: Rewrite lib/env.ts — remove adminUrl

**Files:**
- Modify: `src/lib/env.ts`

Remove `adminUrl` which is unused in the new flow.

- [ ] **Step 1: Rewrite env.ts**

```typescript
export const env = {
  clientId: process.env["NEXT_PUBLIC_IKAS_CLIENT_ID"]!,
  clientSecret: process.env["IKAS_CLIENT_SECRET"]!,
  deployUrl: process.env["NEXT_PUBLIC_DEPLOY_URL"]!,
  secretKey: process.env["SECRET_COOKIE_PASSWORD"]!,
  inculvaAppUrl: process.env["NEXT_PUBLIC_INCULVA_APP_URL"]!,
  widgetUrl: process.env["NEXT_PUBLIC_WIDGET_URL"]!,
} as const;

export const IKAS_GRAPHQL_URL =
  "https://api.myikas.com/api/v2/admin/graphql";
```

- [ ] **Step 2: Verify no code references env.adminUrl**

```bash
grep -r "env.adminUrl\|adminUrl" apps/integrations/ikas/src/
```

Expected: no matches.

---

### Task 3: Rewrite lib/auth.ts — remove setup JWT, keep dashboard JWT

**Files:**
- Modify: `src/lib/auth.ts`

Remove `SetupJWTPayload`, `signSetupJWT`, `verifySetupJWT`. Keep `signJWT`, `verifyJWT`, `verifyAuth`.

- [ ] **Step 1: Rewrite auth.ts**

```typescript
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { env } from "./env";

interface JWTPayload {
  storeId: string;
  siteId: string;
}

function getSecret() {
  return new TextEncoder().encode(env.secretKey);
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getSecret());
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    storeId: payload.storeId as string,
    siteId: payload.siteId as string,
  };
}

export async function verifyAuth(
  request: Request,
): Promise<JWTPayload | NextResponse> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    return await verifyJWT(authHeader.slice(7));
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }
}
```

- [ ] **Step 2: Verify no code imports setup JWT functions**

```bash
grep -r "signSetupJWT\|verifySetupJWT\|SetupJWTPayload" apps/integrations/ikas/src/
```

Expected: no matches (setup route was deleted in Task 1).

---

### Task 4: Rewrite lib/ikas-client.ts — remove getAuthorizeUrl, update redirect URI

**Files:**
- Modify: `src/lib/ikas-client.ts`

Changes:
1. Remove `getAuthorizeUrl()` — no longer needed, ikas handles OAuth redirect directly
2. Update `getRedirectUri()` from `/api/oauth/callback/ikas` to `/api/auth/callback`
3. Remove console.log from `exchangeCodeForToken` (keep only error logs)
4. Remove unused `text` variable in `refreshAccessToken`

- [ ] **Step 1: Rewrite ikas-client.ts**

```typescript
import { createHmac } from "node:crypto";
import { db as prisma } from "@inculva/db";
import { env, IKAS_GRAPHQL_URL } from "./env";
import { encrypt, decrypt } from "./crypto";

// ── Types ────────────────────────────────────────────────────────────────────

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export interface Storefront {
  id: string;
  name: string;
  domain?: string | null;
  defaultAlias?: string | null;
}

export interface MerchantInfo {
  id: string;
  storeName: string;
}

// ── Signature Validation ─────────────────────────────────────────────────────

export function validateSignature(code: string, signature: string): boolean {
  const expected = createHmac("sha256", env.clientSecret)
    .update(code, "utf8")
    .digest("hex");
  return expected === signature;
}

// ── Redirect URI ────────────────────────────────────────────────────────────

export function getRedirectUri(): string {
  return `${env.deployUrl}/api/auth/callback`;
}

// ── Token Exchange ───────────────────────────────────────────────────────────

export async function exchangeCodeForToken(
  code: string,
  storeName: string,
): Promise<TokenResponse> {
  const tokenUrl = `https://${storeName}.myikas.com/api/admin/oauth/token`;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: env.clientId,
      client_secret: env.clientSecret,
      code,
      redirect_uri: getRedirectUri(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[ikas] token exchange failed:", res.status, text);
    throw new Error(`Token exchange failed: ${res.status}`);
  }

  return res.json() as Promise<TokenResponse>;
}

// ── Token Refresh ────────────────────────────────────────────────────────────

async function refreshAccessToken(
  refreshToken: string,
): Promise<TokenResponse> {
  const res = await fetch("https://api.myikas.com/api/admin/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: env.clientId,
      client_secret: env.clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

export async function getValidToken(ikasStore: {
  id: string;
  accessToken: string;
  refreshToken: string | null;
  tokenExpiresAt: Date | null;
  ikasStoreName: string;
}): Promise<string> {
  const now = new Date();
  const fiveMinutes = 5 * 60 * 1000;
  const isExpired =
    !ikasStore.tokenExpiresAt ||
    ikasStore.tokenExpiresAt.getTime() - now.getTime() < fiveMinutes;

  if (!isExpired) {
    return decrypt(ikasStore.accessToken);
  }

  if (!ikasStore.refreshToken) {
    throw new Error("Token expired and no refresh token available");
  }

  const decryptedRefresh = decrypt(ikasStore.refreshToken);
  const tokens = await refreshAccessToken(decryptedRefresh);

  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  await prisma.ikasStore.update({
    where: { id: ikasStore.id },
    data: {
      accessToken: encrypt(tokens.access_token),
      ...(tokens.refresh_token
        ? { refreshToken: encrypt(tokens.refresh_token) }
        : {}),
      tokenExpiresAt: newExpiresAt,
    },
  });

  return tokens.access_token;
}

// ── GraphQL ──────────────────────────────────────────────────────────────────

export async function ikasGraphQL<T = unknown>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(IKAS_GRAPHQL_URL, {
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

// ── Merchant Info ────────────────────────────────────────────────────────────

export async function getMerchantInfo(
  accessToken: string,
): Promise<MerchantInfo> {
  const data = await ikasGraphQL<{ getMerchant: MerchantInfo }>(
    accessToken,
    `{ getMerchant { id storeName } }`,
  );
  return data.getMerchant;
}

// ── Storefronts ──────────────────────────────────────────────────────────────

export async function getStorefronts(
  accessToken: string,
): Promise<Storefront[]> {
  try {
    const data = await ikasGraphQL<{ listStorefront: Storefront[] }>(
      accessToken,
      `{ listStorefront { id name domain defaultAlias } }`,
    );
    return data.listStorefront;
  } catch {
    const data = await ikasGraphQL<{ listStorefront: Storefront[] }>(
      accessToken,
      `{ listStorefront { id name } }`,
    );
    return data.listStorefront;
  }
}

export function getStorefrontDomain(
  storefront: Storefront,
  storeName: string,
): string {
  if (storefront.domain) return storefront.domain;
  if (storefront.defaultAlias) return storefront.defaultAlias;
  return `${storeName}.myikas.com`;
}

// ── Script Injection ─────────────────────────────────────────────────────────

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
        contentType: "SCRIPT",
        isHighPriority: false,
      },
    },
  );

  return data.createStorefrontJSScript?.id ?? null;
}

export async function removeWidgetScript(
  accessToken: string,
  scriptId: string,
): Promise<boolean> {
  try {
    const data = await ikasGraphQL<{ deleteStorefrontJSScript: boolean }>(
      accessToken,
      `mutation DeleteScript($id: String!) {
        deleteStorefrontJSScript(id: $id)
      }`,
      { id: scriptId },
    );
    return data.deleteStorefrontJSScript;
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Verify no code references getAuthorizeUrl**

```bash
grep -r "getAuthorizeUrl" apps/integrations/ikas/src/
```

Expected: no matches.

---

### Task 5: Rewrite api/auth/callback/route.ts — unified OAuth callback with auto-provisioning

**Files:**
- Modify: `src/app/api/auth/callback/route.ts`

This is the most critical file. It handles:
1. Receive `code`, `signature`, `storeName`/`store` from ikas
2. Validate HMAC-SHA256 signature
3. Exchange code for tokens
4. Fetch merchant info and storefronts
5. **Reinstall**: update tokens, clear uninstalledAt, re-register script
6. **First install**: auto-create system user (`{storeName}@ikas.inculva.com`), Site, WidgetConfig, IkasStore, inject script
7. Sign JWT, redirect to `/dashboard?token={jwt}`

- [ ] **Step 1: Write the callback route**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { signJWT } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import { detectLocale } from "@/lib/locale";
import { env } from "@/lib/env";
import {
  validateSignature,
  exchangeCodeForToken,
  getMerchantInfo,
  getStorefronts,
  getStorefrontDomain,
  registerWidgetScript,
  type Storefront,
} from "@/lib/ikas-client";

function fail(msg: string) {
  return NextResponse.redirect(
    `${env.deployUrl}?error=${encodeURIComponent(msg)}`,
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const code = searchParams.get("code");
  const signature = searchParams.get("signature");
  const storeName =
    searchParams.get("storeName") ??
    searchParams.get("store") ??
    "";

  if (!code || !storeName) {
    return fail("missing_params");
  }

  // Validate signature if present
  if (signature && !validateSignature(code, signature)) {
    console.error("[callback] invalid signature");
    return fail("invalid_signature");
  }

  // Exchange code for tokens
  let tokens;
  try {
    tokens = await exchangeCodeForToken(code, storeName);
  } catch (err) {
    console.error("[callback] token exchange error:", err);
    return fail("auth_failed");
  }

  const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Get merchant info
  let merchant;
  try {
    merchant = await getMerchantInfo(tokens.access_token);
  } catch (err) {
    console.error("[callback] getMerchant error:", err);
    return fail("auth_failed");
  }

  const merchantStoreName = merchant.storeName || storeName;

  // Fetch storefronts
  let storefronts: Storefront[] = [];
  try {
    storefronts = await getStorefronts(tokens.access_token);
  } catch {
    // Continue without storefronts
  }

  const storefront = storefronts[0];
  const domain = storefront
    ? getStorefrontDomain(storefront, merchantStoreName)
    : `${merchantStoreName}.myikas.com`;

  // ── Reinstall (existing store) ──────────────────────────────────────
  const existing = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: merchantStoreName },
  });

  if (existing) {
    const updateData: Record<string, unknown> = {
      accessToken: encrypt(tokens.access_token),
      tokenExpiresAt,
      uninstalledAt: null,
    };
    if (tokens.refresh_token) {
      updateData.refreshToken = encrypt(tokens.refresh_token);
    }
    if (storefront) {
      updateData.storefrontId = storefront.id;
    }

    // Re-register script if missing
    if (!existing.scriptId && storefront) {
      try {
        const scriptId = await registerWidgetScript(
          tokens.access_token,
          storefront.id,
          existing.siteId,
        );
        if (scriptId) updateData.scriptId = scriptId;
      } catch {
        // Non-fatal
      }
    }

    await prisma.ikasStore.update({
      where: { id: existing.id },
      data: updateData,
    });

    const jwt = await signJWT({
      storeId: existing.id,
      siteId: existing.siteId,
    });

    return NextResponse.redirect(`${env.deployUrl}/dashboard?token=${jwt}`);
  }

  // ── First install — auto-provision ──────────────────────────────────
  const locale = await detectLocale();
  const systemEmail = `${merchantStoreName}@ikas.inculva.com`;

  // Create system user (or reuse if email exists)
  const user = await prisma.user.upsert({
    where: { email: systemEmail },
    create: {
      email: systemEmail,
      name: merchantStoreName,
      role: "user",
      emailVerified: true,
    },
    update: {},
  });

  // Create site
  const site = await prisma.site.upsert({
    where: { domain: domain },
    create: { name: merchantStoreName, domain, ownerId: user.id },
    update: { ownerId: user.id },
  });

  // Create widget config with defaults
  await prisma.widgetConfig.upsert({
    where: { siteId: site.id },
    create: {
      siteId: site.id,
      position: "bottom-right",
      primaryColor: "#0066cc",
      language: locale,
      buttonSize: "medium",
    },
    update: {},
  });

  // Inject widget script
  let scriptId: string | null = null;
  if (storefront) {
    try {
      scriptId = await registerWidgetScript(
        tokens.access_token,
        storefront.id,
        site.id,
      );
    } catch (err) {
      console.error("[callback] script injection failed:", err);
    }
  }

  // Create IkasStore
  const ikasStore = await prisma.ikasStore.create({
    data: {
      siteId: site.id,
      ikasStoreId: merchantStoreName,
      ikasStoreName: merchantStoreName,
      accessToken: encrypt(tokens.access_token),
      refreshToken: tokens.refresh_token
        ? encrypt(tokens.refresh_token)
        : null,
      tokenExpiresAt,
      storefrontId: storefront?.id ?? "",
      scriptId,
    },
  });

  const jwt = await signJWT({ storeId: ikasStore.id, siteId: site.id });

  return NextResponse.redirect(`${env.deployUrl}/dashboard?token=${jwt}`);
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd apps/integrations/ikas && pnpm typecheck
```

Expected: Should pass.

---

### Task 6: Rewrite api/config/route.ts — add POST for inject-script

**Files:**
- Modify: `src/app/api/config/route.ts`

The inject-script endpoint was in a separate directory that we deleted. Add a `POST` handler to the config route that handles manual script injection.

- [ ] **Step 1: Rewrite config route with inline inject-script**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { verifyAuth } from "@/lib/auth";
import {
  getValidToken,
  getStorefronts,
  registerWidgetScript,
} from "@/lib/ikas-client";

const ALLOWED_CONFIG_FIELDS = [
  "position",
  "primaryColor",
  "language",
  "buttonSize",
] as const;

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const config = await prisma.widgetConfig.findUnique({
    where: { siteId: auth.siteId },
    select: {
      position: true,
      primaryColor: true,
      language: true,
      buttonSize: true,
    },
  });

  if (!config) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const [site, ikasStore] = await Promise.all([
    prisma.site.findUnique({
      where: { id: auth.siteId },
      select: { domain: true },
    }),
    prisma.ikasStore.findUnique({
      where: { id: auth.storeId },
      select: { scriptId: true },
    }),
  ]);

  return NextResponse.json({
    ...config,
    domain: site?.domain ?? "",
    scriptInstalled: !!ikasStore?.scriptId,
  });
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();

  const configData: Record<string, unknown> = {};
  for (const field of ALLOWED_CONFIG_FIELDS) {
    if (field in body) {
      configData[field] = body[field];
    }
  }

  if (Object.keys(configData).length > 0) {
    await prisma.widgetConfig.update({
      where: { siteId: auth.siteId },
      data: configData,
    });
  }

  if (typeof body.domain === "string" && body.domain.trim()) {
    const cleanDomain = body.domain
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "");
    await prisma.site.update({
      where: { id: auth.siteId },
      data: { domain: cleanDomain },
    });
  }

  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const ikasStore = await prisma.ikasStore.findUnique({
    where: { id: auth.storeId },
  });

  if (!ikasStore) {
    return NextResponse.json({ error: "store_not_found" }, { status: 404 });
  }

  if (ikasStore.scriptId) {
    return NextResponse.json({ success: true, scriptId: ikasStore.scriptId });
  }

  let accessToken: string;
  try {
    accessToken = await getValidToken(ikasStore);
  } catch {
    return NextResponse.json({ error: "token_expired" }, { status: 401 });
  }

  let storefrontId = ikasStore.storefrontId;
  if (!storefrontId) {
    try {
      const storefronts = await getStorefronts(accessToken);
      if (storefronts.length > 0) {
        storefrontId = storefronts[0]!.id;
      }
    } catch {
      // Continue
    }
  }

  if (!storefrontId) {
    return NextResponse.json({ error: "no_storefront" }, { status: 400 });
  }

  try {
    const scriptId = await registerWidgetScript(
      accessToken,
      storefrontId,
      ikasStore.siteId,
    );

    if (!scriptId) {
      return NextResponse.json(
        { error: "injection_failed" },
        { status: 500 },
      );
    }

    await prisma.ikasStore.update({
      where: { id: ikasStore.id },
      data: { scriptId, storefrontId },
    });

    return NextResponse.json({ success: true, scriptId });
  } catch {
    return NextResponse.json(
      { error: "injection_failed" },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Update config-form.tsx inject-script URL**

In `src/app/dashboard/config-form.tsx`, change the `handleInstallScript` fetch URL:

```typescript
// Change this line (around line 52):
const res = await fetch("/api/config/inject-script", {
// To:
const res = await fetch("/api/config", {
```

The method (`POST`) and headers remain the same.

- [ ] **Step 3: Run typecheck**

```bash
cd apps/integrations/ikas && pnpm typecheck
```

---

### Task 7: Rewrite app/page.tsx — entry page with error display

**Files:**
- Modify: `src/app/page.tsx`

The entry page needs to:
1. Show error if redirected from failed OAuth callback (`?error=...`)
2. Detect iframe → exchange AppBridge token → redirect to dashboard
3. Show "open from ikas" message otherwise

Removed: the `storeName` → OAuth redirect path (ikas handles the redirect directly to our callback).

- [ ] **Step 1: Rewrite page.tsx**

```typescript
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const errorMessages: Record<string, Record<string, string>> = {
  en: {
    missing_params:
      "Missing required parameters. Please try again from ikas.",
    invalid_signature:
      "Invalid request signature. Please try again from ikas.",
    auth_failed:
      "Authentication failed. Please try again from ikas.",
    no_storefront:
      "No storefront found. Please set up a storefront in ikas first.",
    default: "Something went wrong. Please try again from ikas.",
    open_from_ikas: "Please open this app from your ikas admin panel.",
  },
  tr: {
    missing_params:
      "Gerekli parametreler eksik. Lütfen ikas üzerinden tekrar deneyin.",
    invalid_signature:
      "Geçersiz istek imzası. Lütfen ikas üzerinden tekrar deneyin.",
    auth_failed:
      "Kimlik doğrulama başarısız. Lütfen ikas üzerinden tekrar deneyin.",
    no_storefront:
      "Mağaza bulunamadı. Lütfen önce ikas'ta bir mağaza oluşturun.",
    default:
      "Bir hata oluştu. Lütfen ikas üzerinden tekrar deneyin.",
    open_from_ikas:
      "Lütfen bu uygulamayı ikas yönetim panelinizden açın.",
  },
};

function getLocale(): "tr" | "en" {
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
  }
  return "en";
}

export default function HomePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const locale = getLocale();
      const msgs = errorMessages[locale]!;

      // Show error if redirected from failed callback
      const error = params.get("error");
      if (error) {
        setErrorMsg(msgs[error] ?? msgs.default!);
        setStatus("error");
        return;
      }

      try {
        // Check if running inside ikas iframe
        if (window.self !== window.top) {
          const { AppBridgeHelper } = await import("@ikas/app-helpers");
          AppBridgeHelper.closeLoader();

          const ikasToken = await AppBridgeHelper.getNewToken();
          if (ikasToken) {
            const res = await fetch("/api/auth/exchange", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: ikasToken }),
            });

            if (res.ok) {
              const { token } = (await res.json()) as { token: string };
              sessionStorage.setItem("ikas_token", token);
              router.push("/dashboard");
              return;
            }
          }
        }

        // No iframe context — show message
        setErrorMsg(msgs.open_from_ikas!);
        setStatus("error");
      } catch {
        setErrorMsg(msgs.default!);
        setStatus("error");
      }
    };

    init();
  }, [router]);

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            inculva for ikas
          </h1>
          <p className="text-gray-500">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd apps/integrations/ikas && pnpm typecheck
```

---

### Task 8: Clean up package.json — remove unused dependencies

**Files:**
- Modify: `apps/integrations/ikas/package.json`

Remove: `iron-session`, `@noble/hashes`, `@ikas/admin-api-client`

- [ ] **Step 1: Remove unused dependencies**

```bash
cd apps/integrations/ikas && pnpm remove iron-session @noble/hashes @ikas/admin-api-client
```

- [ ] **Step 2: Verify remaining dependencies**

```json
{
  "@ikas/app-helpers": "^1.0.10",
  "@inculva/db": "workspace:*",
  "@inculva/types": "workspace:*",
  "jose": "6.0.11",
  "next": "15.1.6",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "react-hook-form": "7.54.0",
  "zod": "3.23.8"
}
```

- [ ] **Step 3: Install to update lockfile**

```bash
cd /Users/berkan/Projects/inculva && pnpm install
```

---

### Task 9: Update Dockerfile — remove NEXT_PUBLIC_ADMIN_URL

**Files:**
- Modify: `apps/integrations/ikas/Dockerfile`

Remove the `NEXT_PUBLIC_ADMIN_URL` ARG and ENV lines.

- [ ] **Step 1: Remove ADMIN_URL from Dockerfile**

Remove these two lines:
```dockerfile
ARG NEXT_PUBLIC_ADMIN_URL=https://{storeName}.myikas.com/admin
ENV NEXT_PUBLIC_ADMIN_URL=${NEXT_PUBLIC_ADMIN_URL}
```

- [ ] **Step 2: Verify remaining build args**

Should only have: `NEXT_PUBLIC_IKAS_CLIENT_ID`, `NEXT_PUBLIC_DEPLOY_URL`, `NEXT_PUBLIC_INCULVA_APP_URL`, `NEXT_PUBLIC_WIDGET_URL`.

---

### Task 10: Full typecheck, build, and verification

**Files:**
- All files in `apps/integrations/ikas/`

- [ ] **Step 1: Run full typecheck**

```bash
cd apps/integrations/ikas && pnpm typecheck
```

Expected: 0 errors.

- [ ] **Step 2: Verify file count**

```bash
find apps/integrations/ikas/src -name "*.ts" -o -name "*.tsx" | wc -l
```

Expected: 14 TypeScript files.

- [ ] **Step 3: Verify no references to deleted modules**

```bash
grep -r "iron-session\|@noble/hashes\|getSession\|hashPassword\|signSetupJWT\|verifySetupJWT\|getAuthorizeUrl\|/api/setup\|/api/oauth\|/authorize-store\|session\.ts\|password\.ts" apps/integrations/ikas/src/
```

Expected: no matches.

- [ ] **Step 4: Verify inject-script URL was updated**

```bash
grep -r "inject-script" apps/integrations/ikas/src/
```

Expected: no matches.

- [ ] **Step 5: Build the app**

```bash
cd apps/integrations/ikas && pnpm build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit all changes**

```bash
git add apps/integrations/ikas/
git commit -m "feat(ikas): rewrite integration with automatic provisioning

- Auto-create system user ({storeName}@ikas.inculva.com) on first install
- Remove setup page and email/password registration flow
- Add HMAC-SHA256 signature validation on OAuth callback
- Merge inject-script endpoint into config route (POST /api/config)
- Remove iron-session, @noble/hashes, @ikas/admin-api-client dependencies
- Remove NEXT_PUBLIC_ADMIN_URL from Dockerfile
- Keep AppBridge token exchange for iframe returning visits
- Keep bilingual dashboard (EN/TR) with widget config form"
```

---

## Summary of Changes

| Area | Before | After |
|------|--------|-------|
| Install flow | OAuth → setup page (email/password/domain) | OAuth → auto-provision (no user input) |
| User model | Real user with email + password | System user (`{storeName}@ikas.inculva.com`) |
| OAuth callback | `/api/oauth/callback/ikas` | `/api/auth/callback` |
| Signature validation | None | HMAC-SHA256 on callback |
| Setup JWT | Yes (15 min, passes data to setup page) | Removed |
| Script injection | Separate `/api/config/inject-script` | Merged into `POST /api/config` |
| Dependencies | iron-session, @noble/hashes, @ikas/admin-api-client | Removed |
| Error handling | Generic error page | Bilingual error messages on entry page |
| Files count | ~25 files | 15 files |
