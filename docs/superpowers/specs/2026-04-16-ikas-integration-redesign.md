# ikas Integration Redesign — Design Spec

## Goal

Rebuild the ikas integration app as a professional, production-grade embedded iframe application. One-click install, database-stored tokens with auto-refresh, JWT-based auth for iframe compatibility, and automatic site provisioning.

## Decisions

- **Install flow**: Fully automatic. No email/password registration. System user auto-created per store.
- **Embedding**: Iframe only. App loads inside ikas admin panel.
- **User model**: Auto-create system user (`{storeName}@ikas.inculva.com`) per store. Every Site keeps an owner.
- **Token management**: Refresh on API call. Check expiry before every ikas request, refresh if expired or within 5 minutes.
- **UI**: Keep current Tailwind + react-hook-form. No shadcn/ui rewrite.
- **Approach**: Full rewrite. Delete current src/ and rebuild clean.

## Architecture

The app is a Next.js 15 embedded iframe application. It uses database-stored OAuth tokens (not cookies) and short-lived JWTs for browser-server auth.

### Install Flow

```
Merchant clicks "Install" in ikas App Store
  → ikas redirects to OAuth authorize URL
  → Merchant approves
  → ikas redirects to /api/auth/callback with code + signature
  → Validate signature (HMAC-SHA256)
  → Exchange code for access_token + refresh_token
  → Auto-create: User → Site → WidgetConfig → IkasStore
  → Inject widget script into storefront via GraphQL
  → Generate short-lived JWT (1 hour)
  → Redirect to /dashboard?token={jwt}
  → Dashboard loads in ikas admin iframe
```

### Reinstall Flow

Same OAuth flow. Detects existing `IkasStore` by `ikasStoreId`. Updates tokens and expiry, clears `uninstalledAt`, re-registers script if `scriptId` is null. Redirects to dashboard.

### Uninstall Flow

ikas webhook hits `/api/webhooks/uninstall`. Soft-deletes the store (sets `uninstalledAt`), removes the widget script, clears `scriptId`.

## Auth System

No session cookies. Cookies don't work reliably in iframes due to third-party cookie restrictions.

### Server-side: Database tokens

- `IkasStore` stores `accessToken`, `refreshToken`, `tokenExpiresAt`
- Tokens encrypted with AES-256-GCM before saving to database
- Before any ikas API call, check `tokenExpiresAt`. If expired or within 5 minutes of expiry, refresh automatically using the refresh token
- On refresh, update `accessToken`, `refreshToken`, `tokenExpiresAt` in database

### Client-side: Short-lived JWT

- On successful auth, server creates a JWT containing `{ storeId, siteId }` signed with `SECRET_COOKIE_PASSWORD`
- JWT expires in 1 hour
- Dashboard stores it in `sessionStorage` (works in iframes, cleared on tab close)
- Every API request sends `Authorization: Bearer {jwt}` header
- Server middleware verifies JWT, extracts `storeId` to look up the `IkasStore`

### API route protection

- A `verifyAuth(request)` helper extracts and verifies the JWT from the `Authorization` header
- Returns `{ storeId, siteId }` or throws 401
- All dashboard API routes use this helper

## Database Changes

One field added to existing `IkasStore` model:

```prisma
model IkasStore {
  id             String    @id @default(cuid())
  siteId         String    @unique
  site           Site      @relation(fields: [siteId], references: [id], onDelete: Cascade)
  ikasStoreId    String    @unique
  ikasStoreName  String
  accessToken    String                  // encrypted
  refreshToken   String?                 // encrypted (now actually stored)
  tokenExpiresAt DateTime?              // NEW: track token expiry
  storefrontId   String
  scriptId       String?
  installedAt    DateTime  @default(now())
  uninstalledAt  DateTime?
}
```

Auto-created system user:
- `email`: `{storeName}@ikas.inculva.com`
- `name`: store name
- `role`: `"user"`
- `emailVerified`: `true`
- No `Account` record (no password, auth is via ikas OAuth)

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (minimal, no nav)
│   ├── page.tsx                      # Entry: redirect to OAuth or dashboard
│   ├── dashboard/
│   │   ├── page.tsx                  # Widget config dashboard
│   │   └── config-form.tsx           # Position, color, toggles form
│   └── api/
│       ├── auth/
│       │   └── callback/route.ts     # OAuth callback: validate, exchange, create, redirect
│       ├── config/route.ts           # GET/PUT widget config (JWT protected)
│       └── webhooks/
│           └── uninstall/route.ts    # ikas uninstall webhook
├── lib/
│   ├── auth.ts                       # JWT sign/verify, verifyAuth middleware
│   ├── crypto.ts                     # AES-256-GCM encrypt/decrypt
│   ├── ikas-client.ts                # OAuth exchange, token refresh, GraphQL, script injection
│   ├── env.ts                        # Environment variables
│   └── locale.ts                     # TR/EN detection from accept-language
└── tailwind.css
```

7 source files total. Removed: `/setup` page, `/api/setup` route, `session.ts`, `i18n/` directory, `domain-banner.tsx`, `reports/page.tsx`.

## Key Behaviors

### OAuth Callback (`/api/auth/callback`)

1. Receive `code`, `signature`, `store` query params
2. Validate signature: `HMAC-SHA256(code, clientSecret)` in hex must match `signature` param
3. Exchange code for tokens via `POST https://{store}.myikas.com/api/admin/oauth/token` with `grant_type=authorization_code`
4. Fetch storefronts via GraphQL, pick best domain (custom > defaultAlias > .myikas.com)
5. Check if `IkasStore` exists for this `ikasStoreId`:
   - **Reinstall**: Update tokens + expiry, clear `uninstalledAt`, re-register script if `scriptId` is null
   - **First install**: Create system user, create Site, create WidgetConfig (defaults: bottom-right, #0066cc, language from locale), inject widget script via `createStorefrontJSScript` mutation, create `IkasStore` with encrypted tokens
6. Sign JWT with `{ storeId, siteId }`, 1 hour expiry
7. Redirect to `/dashboard?token={jwt}`

### Dashboard (`/dashboard`)

1. On load, read `token` from URL params (first visit) or `sessionStorage` (subsequent)
2. Store token in `sessionStorage`, remove from URL
3. Fetch config via `GET /api/config` with `Authorization: Bearer {jwt}`
4. Show config form with bilingual labels (TR/EN based on locale)
5. Save changes via `PUT /api/config`
6. Include link to main inculva dashboard for scan reports

### Token Auto-Refresh (`ikas-client.ts`)

1. `getValidToken(ikasStore)` checks `tokenExpiresAt`
2. If expired or within 5 minutes of expiry: call refresh endpoint with `grant_type=refresh_token`, update DB with new tokens + expiry, return new access token
3. If valid: decrypt and return existing token
4. All ikas GraphQL calls go through this helper

### Uninstall Webhook (`/api/webhooks/uninstall`)

1. Receive `{ store }` body from ikas
2. Find `IkasStore` by store name
3. Try to remove widget script via `deleteStorefrontJSScript` (gracefully handle revoked tokens)
4. Set `uninstalledAt`, clear `scriptId`
5. Return 200 OK

## Error Handling

### OAuth failures
- Invalid/missing signature: redirect to error page with `error=invalid_signature`
- Token exchange fails: redirect with `error=auth_failed`
- No storefronts found: redirect with `error=no_storefront`
- Error page shows a simple message in TR/EN with "try again" link back to ikas

### JWT failures
- Expired/invalid JWT on API calls: return 401
- Dashboard shows "session expired, please reinstall from ikas" message
- No token in sessionStorage: show "please open this app from ikas admin panel"

### Token refresh failures
- Refresh token invalid/revoked: API returns 401
- Dashboard shows "please reinstall from ikas" message

### Webhook failures
- Store not found: return 200 OK (idempotent, don't cause ikas retries)
- Script removal fails: log error, continue with soft-delete (don't block uninstall)

## Environment Variables

Same as current, minus `better-auth` related ones:

```
NEXT_PUBLIC_IKAS_CLIENT_ID       # OAuth client ID
IKAS_CLIENT_SECRET               # OAuth client secret
NEXT_PUBLIC_DEPLOY_URL           # This app's public URL (redirect URI)
SECRET_COOKIE_PASSWORD           # JWT signing + AES encryption key (min 32 chars)
NEXT_PUBLIC_INCULVA_APP_URL      # Main inculva app URL
NEXT_PUBLIC_WIDGET_URL           # Widget JS CDN URL
DATABASE_URL                     # PostgreSQL connection
```

Removed: `NEXT_PUBLIC_IKAS_API_URL` (hardcode `https://api.myikas.com/api/v2/admin/graphql`).

## Dependencies

Remove: `iron-session`, `better-auth`.

Keep: `jose` (already installed, use for JWT sign/verify), `react-hook-form`, `@inculva/db`, `@inculva/types`, `zod`.

Use Node.js native `crypto` for HMAC-SHA256 signature validation and AES-256-GCM encryption.
