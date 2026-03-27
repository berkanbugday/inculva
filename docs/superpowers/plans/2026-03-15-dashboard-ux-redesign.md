# Dashboard UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the manage dashboard to fix the sidebar layout, add an account popup, simplify site cards, split settings into focused pages, and rebuild the widget config form based on actual widget capabilities.

**Architecture:** All changes are confined to `apps/manage/src`. The sidebar becomes a fixed full-height column with a pinned user popup. Settings pages are split by responsibility. The widget config form is decomposed into a tab shell + four focused tab components. No schema or API changes are required.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS, TypeScript, better-auth, Prisma (read-only in new pages), pnpm workspaces / Turbo

**Typecheck command:** `cd apps/manage && pnpm typecheck`
**Spec:** `docs/superpowers/specs/2026-03-15-dashboard-ux-redesign.md`

---

## Chunk 1: Sidebar — Icons, Layout, Account Popup, Nav Structure

> **Implementation order:** Task 1 → Task 3 → Task 2. Task 2 (`sidebar.tsx`) imports `SettingsGroup` from Task 3 (`sidebar-parts.tsx`), so Task 3 must land first. Task 3 imports new icons from Task 1, so Task 1 must land first.

### Task 1: Add missing sidebar icons

**Files:**
- Modify: `apps/manage/src/components/sidebar-icons.tsx`

- [ ] **Step 1: Add 4 new icon components**

Open `apps/manage/src/components/sidebar-icons.tsx`. Append after the existing `PlusIcon`:

```tsx
export function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 14.5c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="6" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5l5 5M12 12l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WebhookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M6 3a3 3 0 1 1 0 4H5l-3 5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 13a3 3 0 1 0 0-4h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CreditCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="2.5" cy="4" r="1" fill="currentColor" />
      <circle cx="2.5" cy="8" r="1" fill="currentColor" />
      <circle cx="2.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/components/sidebar-icons.tsx
git commit -m "feat(sidebar): add UserIcon, KeyIcon, WebhookIcon, CreditCardIcon, ListIcon"
```

---

### Task 2: Fix sidebar height and add account popup

> **Implement after Task 3** — imports `SettingsGroup` which Task 3 creates.

**Files:**
- Modify: `apps/manage/src/components/sidebar.tsx`

- [ ] **Step 1: Rewrite `sidebar.tsx`**

Replace the entire file content with:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarLink, SiteGroup, SettingsGroup } from "./sidebar-parts";
import { GridIcon, ChartIcon } from "./sidebar-icons";
import { signOut } from "@/lib/auth-client";

interface Site {
  id: string;
  name: string;
  domain: string;
}

interface Props {
  sites: Site[];
  userName: string | null;
  userEmail: string;
}

export function Sidebar({ sites, userName, userEmail }: Props) {
  const pathname = usePathname();
  const [expandedSites, setExpandedSites] = useState<Set<string>>(() => {
    const matched = sites.find((s) => pathname.includes(s.id));
    return matched ? new Set([matched.id]) : new Set();
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  function toggleSite(id: string) {
    setExpandedSites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/login";
  }

  const signOutBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPopupOpen(false);
    }
    if (popupOpen) {
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKeyDown);
      signOutBtnRef.current?.focus();
    }
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popupOpen]);

  const initials = userName
    ? userName.split(" ").filter((n) => n.length > 0).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : (userEmail[0]?.toUpperCase() ?? "?");

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#1a1a2e] border-r border-[#e8eaf0] dark:border-[#2a2a3e] h-screen sticky top-0 flex flex-col">
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <SidebarLink
          href="/dashboard"
          active={pathname === "/dashboard"}
          icon={<GridIcon />}
          label="My Websites"
        />

        {sites.map((site) => (
          <SiteGroup
            key={site.id}
            site={site}
            expanded={expandedSites.has(site.id)}
            onToggle={() => toggleSite(site.id)}
            isActive={isActive}
            pathname={pathname}
          />
        ))}

        <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] mx-2 my-3" />

        <SidebarLink
          href="/dashboard/statistics"
          active={isActive("/dashboard/statistics")}
          icon={<ChartIcon />}
          label="Statistics"
        />

        <SettingsGroup isActive={isActive} />
      </nav>

      {/* Pinned user area */}
      <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 py-4 relative" ref={popupRef}>
        {popupOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white dark:bg-[#1a1a2e] border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl shadow-lg overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  {userName && <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userName}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                </div>
              </div>
            </div>
            <button
              ref={signOutBtnRef}
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}

        <button
          onClick={() => setPopupOpen((v) => !v)}
          aria-expanded={popupOpen}
          aria-label="Account menu"
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0 text-left">
            {userName && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{userName}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors. If `SettingsGroup` is missing, it will error — that's fine, implement it in Task 3 first.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/components/sidebar.tsx
git commit -m "feat(sidebar): fix full-height layout, add account popup with sign-out"
```

---

### Task 3: Add SettingsGroup to sidebar-parts

> **Implement after Task 1** (needs new icons). **Implement before Task 2** (sidebar.tsx imports SettingsGroup).

**Files:**
- Modify: `apps/manage/src/components/sidebar-parts.tsx`

The existing file has `SidebarLink` and `SiteGroup`. Add `SettingsGroup` which renders the settings sub-nav section.

- [ ] **Step 1: Add imports and SettingsGroup to `sidebar-parts.tsx`**

Add to the top of the file (after existing imports):

```tsx
import { UserIcon, KeyIcon, WebhookIcon, CreditCardIcon, ListIcon } from "./sidebar-icons";
```

Then append `SettingsGroup` at the end of the file:

```tsx
const SETTINGS_LINKS = [
  { href: "/dashboard/settings", label: "Account", icon: <UserIcon /> },
  { href: "/dashboard/settings/api-keys", label: "API Keys", icon: <KeyIcon /> },
  { href: "/dashboard/settings/webhooks", label: "Webhooks", icon: <WebhookIcon /> },
  { href: "/dashboard/settings/billing", label: "Billing", icon: <CreditCardIcon /> },
  { href: "/dashboard/settings/audit-log", label: "Audit Log", icon: <ListIcon /> },
] as const;

export function SettingsGroup({ isActive }: { isActive: (href: string) => boolean }) {
  return (
    <div>
      <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
        Settings
      </p>
      {SETTINGS_LINKS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl mx-1 text-sm font-semibold transition-colors relative ${
            isActive(item.href)
              ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          {isActive(item.href) && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full" aria-hidden="true" />
          )}
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  );
}
```

Note: The active check for `/dashboard/settings` must be exact to avoid it staying active on all sub-routes. Update `isActive` usage: for the Account link specifically, use `pathname === "/dashboard/settings"`. This is handled by the parent's `isActive` function which already does exact match for `/dashboard` — but `/dashboard/settings` uses `startsWith`. To avoid "Account" staying highlighted on all settings sub-pages, change the Account entry's active check to exact match in the component:

Replace the `SettingsGroup` implementation with this version that handles the exact-match edge case:

```tsx
export function SettingsGroup({ isActive }: { isActive: (href: string) => boolean }) {
  return (
    <div>
      <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
        Settings
      </p>
      {SETTINGS_LINKS.map((item) => {
        // Account page is exact-match only so sub-pages don't highlight it
        const active = item.href === "/dashboard/settings"
          ? typeof window !== "undefined" && window.location.pathname === "/dashboard/settings"
          : isActive(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl mx-1 text-sm font-semibold transition-colors relative ${
              active
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full" aria-hidden="true" />
            )}
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
```

Wait — `window` is not available server-side and this is a client component (`"use client"` is already at the top of `sidebar-parts.tsx`). Use `usePathname` instead. Add to imports: `import { usePathname } from "next/navigation";` and update `SettingsGroup`:

```tsx
export function SettingsGroup({ isActive }: { isActive: (href: string) => boolean }) {
  const pathname = usePathname();
  return (
    <div>
      <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 select-none">
        Settings
      </p>
      {SETTINGS_LINKS.map((item) => {
        const active = item.href === "/dashboard/settings"
          ? pathname === "/dashboard/settings"
          : isActive(item.href);
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl mx-1 text-sm font-semibold transition-colors relative ${
              active
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full" aria-hidden="true" />
            )}
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual verify**

Start the dev server (`pnpm dev` from repo root). Navigate to the dashboard. Confirm:
- Sidebar is full-height regardless of page content length
- Settings section label + 5 sub-links visible
- Clicking user area at bottom opens popup with name/email and "Sign out"
- Clicking outside popup closes it
- No "Add new site" button in sidebar

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/components/sidebar-parts.tsx
git commit -m "feat(sidebar): add SettingsGroup with Account/API Keys/Webhooks/Billing/Audit Log links"
```

---

## Chunk 2: Header, Dashboard Home, Settings Split

### Task 4: Reorder header controls

**Files:**
- Modify: `apps/manage/src/components/dashboard-header.tsx`

- [ ] **Step 1: Move "New site" button left of icon controls**

In `dashboard-header.tsx`, the right-side `<div className="flex items-center gap-2">` currently has ThemeToggle, LanguageSwitcher, NotificationBell, then the New site `<a>`. Move the `<a>` to be first inside that div:

```tsx
<div className="flex items-center gap-2">
  <a
    href="/dashboard/sites/new"
    className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    New site
  </a>
  <ThemeToggle />
  <LanguageSwitcher locale={locale} />
  <NotificationBell />
</div>
```

Note: remove `ml-2` from the `<a>` className since it's no longer the last item.

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/components/dashboard-header.tsx
git commit -m "feat(header): move New site button to left of icon controls"
```

---

### Task 5: Simplify dashboard home site cards

**Files:**
- Modify: `apps/manage/src/app/dashboard/page.tsx`

Changes: remove max-w-6xl, remove the page-body "New site" header button, replace 3-button card footer with single "Open →" link.

- [ ] **Step 1: Apply all three changes to `page.tsx`**

**Change A** — Remove `max-w-6xl`:
```tsx
// Before:
<div className="max-w-6xl">
// After:
<div>
```

**Change B** — Remove the inline page header with the duplicate "New site" button (lines 71–102). Replace with just the heading:
```tsx
<div className="mb-8">
  <h1 className="text-3xl font-black text-gray-900 dark:text-white">My Websites</h1>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
    {sites.length === 0
      ? "No sites yet"
      : `${sites.length} site${sites.length !== 1 ? "s" : ""} connected`}
  </p>
</div>
```

**Change C** — Replace the 3-button card footer with a single link. Find the `<div className="flex items-center gap-1 pt-2 border-t ...">` block and replace with:
```tsx
<div className="pt-2 border-t border-[#e8eaf0] dark:border-[#2a2a3e]">
  <a
    href={`/dashboard/sites/${site.id}`}
    className="flex items-center justify-center gap-1.5 w-full text-sm font-semibold text-blue-600 dark:text-blue-400 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
  >
    Open
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </a>
</div>
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Visual verify**

Navigate to `/dashboard`. Confirm:
- No max-width container limiting the grid
- No "New site" button in the page body (only in header)
- Each site card has one "Open →" button instead of three action links

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/app/dashboard/page.tsx
git commit -m "feat(dashboard): simplify site cards to single Open button, remove max-w, deduplicate New site button"
```

---

### Task 6: Clean up settings/page.tsx

**Files:**
- Modify: `apps/manage/src/app/dashboard/settings/page.tsx`

Remove: inline tab nav, `ApiKeysManager`, `WebhooksManager` and their DB queries, `max-w-3xl`.

- [ ] **Step 1: Rewrite `settings/page.tsx`**

Replace the entire file with:

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProfileForm } from "./profile-form";
import { DeleteAccount } from "./delete-account";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your profile and account.</p>
      </div>

      <ProfileForm
        name={session!.user.name ?? null}
        email={session!.user.email}
      />


      {/* GDPR Data Export */}
      <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Export Your Data</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Download a copy of all personal data we hold about you. Satisfies GDPR Article 20 right to data portability.
          </p>
        </div>
        <a
          href="/api/account/export"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-sm font-semibold transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1v9M4 7l4 4 4-4M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download data export (JSON)
        </a>
      </section>

      <DeleteAccount />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/settings/page.tsx
git commit -m "feat(settings): remove tab nav, extract API keys and webhooks to own pages, full-width layout"
```

---

### Task 7: Create API Keys page

**Files:**
- Create: `apps/manage/src/app/dashboard/settings/api-keys/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { ApiKeysManager } from "../api-keys-manager";

export default async function ApiKeysPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id, revokedAt: null },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">API Keys</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your API access keys.</p>
      </div>
      <ApiKeysManager initialKeys={apiKeys} />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/settings/api-keys/page.tsx
git commit -m "feat(settings): add dedicated API Keys page at /settings/api-keys"
```

---

### Task 8: Create Webhooks page

**Files:**
- Create: `apps/manage/src/app/dashboard/settings/webhooks/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { WebhooksManager } from "../webhooks-manager";

export default async function WebhooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const webhooks = await db.webhook.findMany({
    where: { userId: session.user.id },
    select: { id: true, url: true, events: true, enabled: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Webhooks</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your webhook endpoints.</p>
      </div>
      <WebhooksManager initialWebhooks={webhooks.map(w => ({ ...w, createdAt: w.createdAt.toISOString() }))} />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/settings/webhooks/page.tsx
git commit -m "feat(settings): add dedicated Webhooks page at /settings/webhooks"
```

---

### Task 9: Remove max-w from billing and audit-log pages

**Files:**
- Modify: `apps/manage/src/app/dashboard/settings/billing/page.tsx`
- Modify: `apps/manage/src/app/dashboard/settings/audit-log/page.tsx`

- [ ] **Step 1: Remove `max-w-4xl` from billing page**

In `billing/page.tsx` line 52, change:
```tsx
// Before:
<div className="max-w-4xl space-y-6">
// After:
<div className="space-y-6">
```

- [ ] **Step 2: Remove `max-w-3xl` from audit-log page**

In `audit-log/page.tsx` line 47, change:
```tsx
// Before:
<main className="max-w-3xl space-y-8">
// After:
<main className="space-y-8">
```

- [ ] **Step 3: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/app/dashboard/settings/billing/page.tsx apps/manage/src/app/dashboard/settings/audit-log/page.tsx
git commit -m "feat(settings): remove max-width constraints for full-width layout"
```

---

## Chunk 3: Widget Config — Shell and Setup Tab

### Task 10: Create FeatureToggle sub-component

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/feature-toggle.tsx`

This reusable card is used by `config-tab-features.tsx`.

- [ ] **Step 1: Create `feature-toggle.tsx`**

```tsx
"use client";

interface Props {
  label: string;
  description: string;
  wcag?: string;
  enabled: boolean;
  disabled?: boolean;
  comingSoon?: boolean;
  onChange: (value: boolean) => void;
}

export function FeatureToggle({ label, description, wcag, enabled, disabled, comingSoon, onChange }: Props) {
  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-2xl border ${
      disabled ? "opacity-50" : ""
    } border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e]`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{label}</span>
          {wcag && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {wcag}
            </span>
          )}
          {comingSoon && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`} />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/feature-toggle.tsx
git commit -m "feat(customize): add reusable FeatureToggle card component"
```

---

### Task 11: Create config-tab-setup.tsx

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/languages.ts`
- Create: `apps/manage/src/app/dashboard/sites/[id]/config-tab-setup.tsx`

- [ ] **Step 1: Extract languages to `languages.ts`**

Create `apps/manage/src/app/dashboard/sites/[id]/languages.ts`:

```ts
export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
  { value: "nl", label: "Nederlands" },
  { value: "ar", label: "العربية", rtl: true },
  { value: "he", label: "עברית", rtl: true },
  { value: "fa", label: "فارسی", rtl: true },
  { value: "ur", label: "اردو", rtl: true },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "ru", label: "Русский" },
  { value: "pl", label: "Polski" },
  { value: "cs", label: "Čeština" },
  { value: "da", label: "Dansk" },
  { value: "fi", label: "Suomi" },
  { value: "el", label: "Ελληνικά" },
  { value: "hu", label: "Magyar" },
  { value: "ro", label: "Română" },
  { value: "sk", label: "Slovenčina" },
  { value: "sv", label: "Svenska" },
  { value: "uk", label: "Українська" },
  { value: "bg", label: "Български" },
  { value: "hr", label: "Hrvatski" },
  { value: "lt", label: "Lietuvių" },
  { value: "lv", label: "Latviešu" },
  { value: "et", label: "Eesti" },
  { value: "sl", label: "Slovenščina" },
  { value: "sr", label: "Srpski" },
  { value: "no", label: "Norsk" },
  { value: "th", label: "ภาษาไทย" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "ms", label: "Bahasa Melayu" },
  { value: "ca", label: "Català" },
  { value: "sq", label: "Shqip" },
  { value: "sw", label: "Kiswahili" },
] as const;
```

- [ ] **Step 2: Create `config-tab-setup.tsx`**

```tsx
"use client";

import { useState } from "react";
import { SiteNameForm } from "./site-name-form";
import { SiteDomainForm } from "./site-domain-form";
import { LANGUAGES } from "./languages";

interface Props {
  siteId: string;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
  badgeSrc: string;
  language: string;
  accessibilityStatementUrl: string;
  allowedDomains: string[];
  domainInput: string;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onLanguageChange: (v: string) => void;
  onStatementUrlChange: (v: string) => void;
  onDomainInputChange: (v: string) => void;
  onAddDomain: () => void;
  onRemoveDomain: (d: string) => void;
  onSave: () => void;
}

export function ConfigTabSetup({
  siteId, initialName, initialDomain, widgetScriptSrc, badgeSrc,
  language, accessibilityStatementUrl, allowedDomains,
  domainInput, saving, saved, saveError,
  onLanguageChange, onStatementUrlChange, onDomainInputChange,
  onAddDomain, onRemoveDomain, onSave,
}: Props) {
  const [domain, setDomain] = useState(initialDomain);
  const [copied, setCopied] = useState(false);
  const snippet = `<script\n  src="${widgetScriptSrc}"\n  data-site-id="${siteId}"\n  defer\n></script>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      const el = document.createElement("textarea");
      el.value = snippet;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass = "w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
  const cardClass = "bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-4";

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Site Info</h3>
        <SiteNameForm siteId={siteId} initialName={initialName} />
        <SiteDomainForm siteId={siteId} initialDomain={initialDomain} onDomainChange={setDomain} />
      </div>

      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-3xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Embed Code</h3>
          <button onClick={handleCopy} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          Add before the closing <code className="text-green-400">&lt;/body&gt;</code> tag on <strong className="text-white">{domain}</strong>:
        </p>
        <pre className="bg-gray-800 dark:bg-gray-900 rounded-xl p-4 text-sm overflow-x-auto text-green-300 select-all">{snippet}</pre>
      </div>

      <div className={cardClass}>
        <div>
          <label className={labelClass}>Widget Language</label>
          <select value={language} onChange={(e) => onLanguageChange(e.target.value)} className={inputClass}>
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}{("rtl" in l && l.rtl) ? " (RTL)" : ""} — {l.value}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Accessibility Statement URL</label>
          <input type="url" value={accessibilityStatementUrl} onChange={(e) => onStatementUrlChange(e.target.value)} placeholder="https://example.com/accessibility" className={inputClass} />
          <p className="text-xs text-gray-400 mt-1">Required by EAA Article 13. Link shown in widget footer.</p>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Allowed Domains</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Restrict widget to specific domains. Leave empty to allow all.</p>
        <div className="flex gap-2">
          <input value={domainInput} onChange={(e) => onDomainInputChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onAddDomain()} placeholder="example.com" className={inputClass} />
          <button onClick={onAddDomain} className="px-4 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">Add</button>
        </div>
        {allowedDomains.length > 0 && (
          <ul className="space-y-2">
            {allowedDomains.map((d) => (
              <li key={d} className="flex items-center justify-between px-4 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl text-sm">
                <span className="font-mono text-gray-700 dark:text-gray-300">{d}</span>
                <button onClick={() => onRemoveDomain(d)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">WCAG Compliance Badge</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Embed this badge to show visitors you take accessibility seriously.</p>
        <img src={badgeSrc} alt="WCAG 2.1 AA compliance badge" height={20} />
        <pre className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-4 text-xs overflow-x-auto text-gray-700 dark:text-gray-300 border border-[#e8eaf0] dark:border-[#2a2a3e] select-all">
{`<img src="${badgeSrc}" alt="WCAG 2.1 AA" height="20" />`}
        </pre>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Saved!</span>}
        {saveError && <span className="text-sm text-red-600 dark:text-red-400">{saveError}</span>}
      </div>

      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 border-l-4 border-red-500">
        <h3 className="font-bold text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Permanently delete this site and all its data.</p>
        <a href={`/dashboard/sites/${siteId}/delete`} className="inline-flex px-5 py-2.5 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
          Delete site
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/config-tab-setup.tsx
git commit -m "feat(customize): add Setup tab with embed code copy, language select, domains, WCAG badge"
```

---

## Chunk 4: Widget Config — Appearance, Features, Profiles Tabs

### Task 12: Create config-tab-appearance.tsx

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/config-tab-appearance.tsx`

- [ ] **Step 1: Create `config-tab-appearance.tsx`**

```tsx
"use client";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

const POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
const POSITION_GRID = [
  ["top-left", null, "top-right"],
  [null, null, null],
  ["bottom-left", null, "bottom-right"],
] as const;

const SIZES = [
  { value: "small", label: "Mini" },
  { value: "medium", label: "Regular" },
  { value: "large", label: "Large" },
] as const;

const FONTS = [
  { value: "system", label: "System Default" },
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
] as const;

interface Props {
  primaryColor: string;
  position: string;
  buttonSize: string;
  fontFamily: string;
  borderRadius: number;
  whiteLabelText: string | null;
  headerBgColor?: string;
  footerBgColor?: string;
  userPlan: string;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onField: (key: string, value: unknown) => void;
  onSave: () => void;
}

export function ConfigTabAppearance({
  primaryColor, position, buttonSize, fontFamily, borderRadius,
  whiteLabelText, headerBgColor, footerBgColor, userPlan,
  saving, saved, saveError, onField, onSave,
}: Props) {
  const isBusiness = userPlan === "business";
  const inputClass = "w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
  const cardClass = "bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-4";

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Brand Color</h3>
        <div className="flex items-center gap-3">
          <input type="color" value={primaryColor} onChange={(e) => onField("primaryColor", e.target.value)}
            className="w-12 h-12 rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] cursor-pointer" />
          <input type="text" value={primaryColor} onChange={(e) => onField("primaryColor", e.target.value)}
            placeholder="#0066cc" className={`${inputClass} font-mono`} maxLength={7} />
          <div className="w-12 h-12 rounded-2xl shrink-0 border border-[#e8eaf0] dark:border-[#2a2a3e] flex items-center justify-center overflow-hidden"
            style={{ background: primaryColor }}>
            <img src={`${CDN_URL}/icons/universal-access.svg`} alt="" className="w-7 h-7" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
        </div>
        <p className="text-xs text-gray-400">Applied to the widget trigger button and active feature highlights.</p>
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Widget Position</h3>
        <div className="grid grid-cols-3 gap-2 w-36">
          {POSITION_GRID.map((row, ri) =>
            row.map((cell, ci) =>
              cell ? (
                <button key={cell} onClick={() => onField("position", cell)}
                  className={`w-10 h-10 rounded-xl border-2 transition-colors ${
                    position === cell
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                      : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-300"
                  }`} aria-label={cell} title={cell}>
                  <span className="sr-only">{cell}</span>
                </button>
              ) : (
                <div key={`${ri}-${ci}`} className="w-10 h-10 rounded-xl bg-[#f8f9fc] dark:bg-[#0e0e10] opacity-30" />
              )
            )
          )}
        </div>
        <p className="text-xs text-gray-400">Selected: {position}</p>
      </div>

      <div className={cardClass}>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Button Size</h3>
        <div className="flex gap-2">
          {SIZES.map((s) => (
            <button key={s.value} onClick={() => onField("buttonSize", s.value)}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-colors ${
                buttonSize === s.value
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                  : "border-[#e8eaf0] dark:border-[#2a2a3e] text-gray-600 dark:text-gray-400 hover:border-blue-300"
              }`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${cardClass} ${!isBusiness ? "opacity-60" : ""}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Advanced Appearance</h3>
          {!isBusiness && (
            <a href="/dashboard/settings/billing" className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors">
              Business plan
            </a>
          )}
        </div>
        <div>
          <label className={labelClass}>White Label</label>
          <input type="text" value={whiteLabelText ?? ""} disabled={!isBusiness}
            onChange={(e) => onField("whiteLabelText", e.target.value)}
            placeholder='Custom text or leave empty to hide "Powered by Inculva"' className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Font Family</label>
          <select value={fontFamily} disabled={!isBusiness} onChange={(e) => onField("fontFamily", e.target.value)} className={inputClass}>
            {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Border Radius — {borderRadius}px</label>
          <input type="range" min={0} max={50} value={borderRadius} disabled={!isBusiness}
            onChange={(e) => onField("borderRadius", Number(e.target.value))} className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Header Background</label>
            <input type="color" value={headerBgColor ?? "#000000"} disabled={!isBusiness}
              onChange={(e) => onField("headerBgColor", e.target.value)} className="w-full h-10 rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] cursor-pointer" />
          </div>
          <div>
            <label className={labelClass}>Footer Background</label>
            <input type="color" value={footerBgColor ?? "#000000"} disabled={!isBusiness}
              onChange={(e) => onField("footerBgColor", e.target.value)} className="w-full h-10 rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Saved!</span>}
        {saveError && <span className="text-sm text-red-600 dark:text-red-400">{saveError}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/config-tab-appearance.tsx
git commit -m "feat(customize): add Appearance tab with color, position grid, button size, business features"
```

---

### Task 13: Create config-tab-features.tsx

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/config-tab-features.tsx`

- [ ] **Step 1: Create `config-tab-features.tsx`**

```tsx
"use client";

import { FeatureToggle } from "./feature-toggle";
import type { WidgetFeatures } from "@inculva/types";

type FeatureDef = { key: keyof WidgetFeatures; label: string; description: string; wcag?: string; comingSoon?: boolean };

const CATEGORIES: { label: string; features: FeatureDef[] }[] = [
  {
    label: "Vision",
    features: [
      { key: "darkMode", label: "Dark Mode", description: "Switch the widget UI to a dark theme." },
      { key: "blueLightFilter", label: "Blue Light Filter", description: "Warm-tone overlay to reduce eye strain.", wcag: "WCAG 1.4.3" },
      { key: "colorBlindMode", label: "Color Blind Mode", description: "Simulate 4 types: deuteranopia, protanopia, tritanopia, achromatopsia." },
      { key: "saturation", label: "Saturation / Contrast", description: "Boost saturation or enable high-contrast mode (5 levels)." },
      { key: "highlightLinks", label: "Highlight Links", description: "Underline and color all links for clarity.", wcag: "WCAG 1.4.1" },
      { key: "highlightTitles", label: "Highlight Titles", description: "Visually emphasize page headings." },
      { key: "hideImages", label: "Hide Images", description: "Remove decorative images to reduce distraction." },
    ],
  },
  {
    label: "Reading",
    features: [
      { key: "textResizing", label: "Text Resizing", description: "Scale text from 110% to 155% (4 levels).", wcag: "WCAG 1.4.4" },
      { key: "textSpacing", label: "Text Spacing", description: "Increase letter, word, and line spacing.", wcag: "WCAG 1.4.12" },
      { key: "textAlign", label: "Text Alignment", description: "Switch body text alignment: left, center, right." },
      { key: "lineHeight", label: "Line Height", description: "Increase line spacing from 1.6× to 2.6× (4 levels)." },
      { key: "dyslexiaFont", label: "Dyslexia Font", description: "Replace body font with OpenDyslexic." },
      { key: "readingGuide", label: "Reading Guide", description: "Horizontal focus bar follows the cursor." },
      { key: "readingMask", label: "Reading Mask", description: "Dim everything except the active line." },
      { key: "contentMagnifier", label: "Content Magnifier", description: "Hover magnification from 1.15× to 1.5× (4 levels)." },
      { key: "screenReader", label: "Screen Reader", description: "3 levels: alt hints, read on hover, read on tap." },
    ],
  },
  {
    label: "Motor",
    features: [
      { key: "keyboardNavigation", label: "Keyboard Navigation", description: "Enhanced keyboard-only navigation support.", wcag: "WCAG 2.1.1" },
      { key: "focusHighlight", label: "Focus Indicator", description: "Prominent focus ring on interactive elements.", wcag: "WCAG 2.4.11" },
      { key: "largeClickTargets", label: "Large Click Targets", description: "Expand all click targets to 44×44px.", wcag: "WCAG 2.5.8" },
      { key: "cursorEnhancement", label: "Big Cursor", description: "Enlarge cursor to 32, 48, or 64px (3 sizes)." },
      { key: "slowCursor", label: "Slow Cursor", description: "Dampen cursor movement for tremor reduction (3 levels)." },
      { key: "skipNavigation", label: "Skip Navigation", description: "Skip-to-content link for keyboard users.", wcag: "WCAG 2.4.1" },
    ],
  },
  {
    label: "Calm",
    features: [
      { key: "pauseAnimations", label: "Pause Animations", description: "Stop CSS/JS animations and transitions.", wcag: "WCAG 2.3.3" },
      { key: "muteMedia", label: "Mute Media", description: "Mute all audio and video elements.", wcag: "WCAG 1.4.2" },
    ],
  },
];

const COMING_SOON: FeatureDef[] = [
  { key: "toolTips", label: "Alt Text Tooltips", description: "Show alt text as tooltip on image hover.", comingSoon: true },
  { key: "sustainabilityMode", label: "Sustainability Mode", description: "Energy-saving visual mode.", comingSoon: true },
  { key: "dictionary", label: "Dictionary", description: "Highlight a word to see its definition.", comingSoon: true },
];

interface Props {
  features: WidgetFeatures;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onFeatureChange: (key: keyof WidgetFeatures, value: boolean) => void;
  onSave: () => void;
}

export function ConfigTabFeatures({ features, saving, saved, saveError, onFeatureChange, onSave }: Props) {
  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3">{cat.label}</h3>
          <div className="space-y-2">
            {cat.features.map((f) => (
              <FeatureToggle
                key={f.key}
                label={f.label}
                description={f.description}
                wcag={f.wcag}
                enabled={features[f.key]}
                onChange={(v) => onFeatureChange(f.key, v)}
              />
            ))}
          </div>
        </div>
      ))}

      {COMING_SOON.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3">Coming Soon</h3>
          <div className="space-y-2">
            {COMING_SOON.map((f) => (
              <FeatureToggle key={f.key} label={f.label} description={f.description} enabled={false} disabled comingSoon onChange={() => {}} />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button onClick={onSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
          {saving ? "Saving…" : "Save features"}
        </button>
        {saved && <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Saved!</span>}
        {saveError && <span className="text-sm text-red-600 dark:text-red-400">{saveError}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/config-tab-features.tsx
git commit -m "feat(customize): add Features tab with 24 live features grouped by widget categories"
```

---

### Task 14: Create config-tab-profiles.tsx

**Files:**
- Create: `apps/manage/src/app/dashboard/sites/[id]/config-tab-profiles.tsx`

- [ ] **Step 1: Create `config-tab-profiles.tsx`**

```tsx
"use client";

import type { WidgetProfiles } from "@inculva/types";

const PROFILES: {
  key: keyof Pick<WidgetProfiles, "profileBlind" | "profileLowVision" | "profileDyslexia" | "profileColorBlind" | "profileMotorImpaired" | "profileAdhd">;
  icon: string;
  label: string;
  description: string;
}[] = [
  { key: "profileBlind", icon: "👁️", label: "Blind", description: "Screen reader, keyboard navigation, skip nav, text resizing." },
  { key: "profileLowVision", icon: "🔍", label: "Low Vision", description: "Text resizing, saturation, big cursor, large click targets." },
  { key: "profileDyslexia", icon: "📖", label: "Dyslexia", description: "Dyslexia font, text spacing, reading guide." },
  { key: "profileColorBlind", icon: "🎨", label: "Color Blind", description: "Color blind mode (deuteranopia by default)." },
  { key: "profileMotorImpaired", icon: "♿", label: "Motor Impaired", description: "Keyboard navigation, large click targets, focus highlight." },
  { key: "profileAdhd", icon: "⚡", label: "ADHD", description: "Reading guide, pause animations, reading mask." },
];

interface Props {
  profiles: Pick<WidgetProfiles, "profileBlind" | "profileLowVision" | "profileDyslexia" | "profileColorBlind" | "profileMotorImpaired" | "profileAdhd">;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
  onProfileChange: (key: keyof WidgetProfiles, value: boolean) => void;
  onSave: () => void;
}

export function ConfigTabProfiles({ profiles, saving, saved, saveError, onProfileChange, onSave }: Props) {
  const enabled = PROFILES.filter((p) => profiles[p.key]).length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">{enabled} of {PROFILES.length} profiles enabled</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROFILES.map((p) => {
          const active = profiles[p.key];
          return (
            <button
              key={p.key}
              onClick={() => onProfileChange(p.key, !active)}
              className={`text-left p-5 rounded-3xl border-2 transition-all ${
                active
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                  : "border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#1a1a2e] hover:border-blue-300"
              }`}
            >
              <div className="text-2xl mb-2">{p.icon}</div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{p.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.description}</p>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
          {saving ? "Saving…" : "Save profiles"}
        </button>
        {saved && <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Saved!</span>}
        {saveError && <span className="text-sm text-red-600 dark:text-red-400">{saveError}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/config-tab-profiles.tsx
git commit -m "feat(customize): add Profiles tab with 6 profiles matching widget capabilities"
```

---

## Chunk 5: Widget Config — Shell + Sites Page

### Task 15: Rewrite widget-config-form.tsx as tab shell

**Files:**
- Modify: `apps/manage/src/app/dashboard/sites/[id]/widget-config-form.tsx`

Replace the 1038-line form with a focused tab shell that owns state and delegates rendering to the 4 tab components.

- [ ] **Step 1: Rewrite `widget-config-form.tsx`**

```tsx
"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { WidgetFeatures, WidgetProfiles } from "@inculva/types";
import { ConfigTabSetup } from "./config-tab-setup";
import { ConfigTabAppearance } from "./config-tab-appearance";
import { ConfigTabFeatures } from "./config-tab-features";
import { ConfigTabProfiles } from "./config-tab-profiles";

type Tab = "setup" | "appearance" | "features" | "profiles";
const TABS: { id: Tab; label: string }[] = [
  { id: "setup", label: "Setup" },
  { id: "appearance", label: "Appearance" },
  { id: "features", label: "Features" },
  { id: "profiles", label: "Profiles" },
];

type Config = {
  position: string; primaryColor: string; language: string;
  accessibilityStatementUrl: string; whiteLabelText: string | null;
  allowedDomains: string[]; borderRadius: number; buttonSize: string;
  fontFamily: string; headerBgColor?: string; footerBgColor?: string;
} & WidgetFeatures & WidgetProfiles;

interface Props {
  siteId: string;
  userPlan: string;
  config: Config;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
  badgeSrc: string;
}

export function WidgetConfigForm({ siteId, userPlan, config, initialName, initialDomain, widgetScriptSrc, badgeSrc }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get("tab") as Tab) ?? "setup";

  const [form, setForm] = useState<Config>(config);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");

  const setField = useCallback(<K extends keyof Config>(key: K, value: Config[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  function setTab(t: Tab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", t);
    router.push(`?${params.toString()}`, { scroll: false });
    setSaved(false);
    setSaveError(null);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/sites/${siteId}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = (await res.json()) as { error?: string };
        setSaveError(data.error ?? "Failed to save — please try again");
      }
    } catch {
      setSaveError("Network error — please check your connection");
    } finally {
      setSaving(false);
    }
  }

  function addDomain() {
    const d = domainInput.trim();
    if (d && !form.allowedDomains.includes(d)) {
      setField("allowedDomains", [...form.allowedDomains, d]);
    }
    setDomainInput("");
  }

  function removeDomain(d: string) {
    setField("allowedDomains", form.allowedDomains.filter((x) => x !== d));
  }

  const saveProps = { saving, saved, saveError, onSave: handleSave };

  return (
    <div className="space-y-6">
      <nav className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-2xl p-1.5 shadow-sm w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              tab === t.id
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "setup" && (
        <ConfigTabSetup
          siteId={siteId} initialName={initialName} initialDomain={initialDomain}
          widgetScriptSrc={widgetScriptSrc} badgeSrc={badgeSrc}
          language={form.language} accessibilityStatementUrl={form.accessibilityStatementUrl}
          allowedDomains={form.allowedDomains} domainInput={domainInput}
          onLanguageChange={(v) => setField("language", v)}
          onStatementUrlChange={(v) => setField("accessibilityStatementUrl", v)}
          onDomainInputChange={setDomainInput} onAddDomain={addDomain} onRemoveDomain={removeDomain}
          {...saveProps}
        />
      )}
      {tab === "appearance" && (
        <ConfigTabAppearance
          primaryColor={form.primaryColor} position={form.position}
          buttonSize={form.buttonSize} fontFamily={form.fontFamily}
          borderRadius={form.borderRadius} whiteLabelText={form.whiteLabelText}
          headerBgColor={form.headerBgColor} footerBgColor={form.footerBgColor}
          userPlan={userPlan}
          onField={(k, v) => setField(k as keyof Config, v as Config[keyof Config])}
          {...saveProps}
        />
      )}
      {tab === "features" && (
        <ConfigTabFeatures
          features={form as unknown as WidgetFeatures}
          onFeatureChange={(k, v) => setField(k as keyof Config, v as Config[keyof Config])}
          {...saveProps}
        />
      )}
      {tab === "profiles" && (
        <ConfigTabProfiles
          profiles={form as unknown as WidgetProfiles}
          onProfileChange={(k, v) => setField(k as keyof Config, v as Config[keyof Config])}
          {...saveProps}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors. If type casting causes issues with the `as unknown as` casts, adjust — these are needed because `Config` is a union of all config + feature + profile fields.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/widget-config-form.tsx
git commit -m "feat(customize): rewrite widget config form as 4-tab shell with URL state"
```

---

### Task 15b: Add headerBgColor and footerBgColor to Prisma schema

> **Must run before Task 16** — `wc.headerBgColor` and `wc.footerBgColor` do not exist in the current Prisma schema. This task adds them.

**Files:**
- Modify: `packages/db/prisma/schema.prisma`

- [ ] **Step 1: Add two optional fields to the `WidgetConfig` model**

Find the `WidgetConfig` model in `packages/db/prisma/schema.prisma`. Add after the `footerBgColor`-adjacent fields (near `borderRadius`, `buttonSize`, `fontFamily`):

```prisma
headerBgColor String?
footerBgColor String?
```

- [ ] **Step 2: Run migration**

```bash
cd packages/db && npx prisma migrate dev --name add_header_footer_bg_color
```

Expected: migration file created, schema updated.

- [ ] **Step 3: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: `wc.headerBgColor` and `wc.footerBgColor` now exist on the Prisma-generated type.

- [ ] **Step 4: Commit**

```bash
git add packages/db/prisma/schema.prisma packages/db/prisma/migrations/
git commit -m "feat(db): add headerBgColor and footerBgColor to WidgetConfig schema"
```

---

### Task 15c: Update config PUT route — languages and headerBgColor/footerBgColor

> **Implement after Task 15b** (Prisma schema must exist first).

**Files:**
- Modify: `apps/manage/src/app/api/sites/[id]/config/route.ts`

Three changes needed:

**Change A — Fix VALID_LANGUAGES** (line 88–92): remove `"hi"` and `"bn"`, add `"ca"`, `"sq"`, `"sr"`:

```ts
const VALID_LANGUAGES = new Set([
  "en","tr","de","fr","es","pt","it","nl","pl","ru","uk","cs","hu","ro","bg","hr",
  "sk","sl","el","fi","sv","no","da","lt","lv","et","ar","he","fa","zh","ja","ko",
  "th","vi","id","ms","ur","sw","ca","sq","sr",
]);
```

**Change B — Add `headerBgColor`/`footerBgColor` to body type** (after line 80 `fontFamily?: string;`):

```ts
headerBgColor?: string;
footerBgColor?: string;
```

**Change C — Add validation and DB update spreads**

After the `fontFamily` validation block (line 113–115), add:

```ts
if (body.headerBgColor !== undefined && !HEX_COLOR_RE.test(body.headerBgColor)) {
  return NextResponse.json({ error: "Invalid headerBgColor — must be a hex color" }, { status: 400 });
}
if (body.footerBgColor !== undefined && !HEX_COLOR_RE.test(body.footerBgColor)) {
  return NextResponse.json({ error: "Invalid footerBgColor — must be a hex color" }, { status: 400 });
}
```

After the `fontFamily` DB spread (line 150), add:

```ts
...(body.headerBgColor !== undefined && user?.plan === "business" && { headerBgColor: body.headerBgColor }),
...(body.footerBgColor !== undefined && user?.plan === "business" && { footerBgColor: body.footerBgColor }),
```

- [ ] **Step 1: Apply all three changes to the route**

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors. If `headerBgColor`/`footerBgColor` don't exist on the Prisma `WidgetConfig` update type yet, run Task 15b first.

- [ ] **Step 3: Commit**

```bash
git add apps/manage/src/app/api/sites/\[id\]/config/route.ts
git commit -m "feat(api): add headerBgColor/footerBgColor to config route, fix VALID_LANGUAGES (add ca/sq/sr, remove hi/bn)"
```

---

### Task 16: Update sites/[id]/page.tsx

> **Implement after Task 15c** — requires `headerBgColor`/`footerBgColor` to exist on the Prisma type.

**Files:**
- Modify: `apps/manage/src/app/dashboard/sites/[id]/page.tsx`

Remove `max-w-3xl`, remove the WCAG badge section (moved to Setup tab), remove the Danger Zone section (moved to Setup tab), pass new props to `WidgetConfigForm`, remove outer sub-nav (Analytics/WCAG/Statement stay as sidebar nav from SiteGroup). Wrap `WidgetConfigForm` in `<Suspense>` (required by `useSearchParams`).

- [ ] **Step 1: Rewrite `sites/[id]/page.tsx`**

```tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { WidgetConfigForm } from "./widget-config-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SitePage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const [site, user] = await Promise.all([
    db.site.findFirst({
      where: { id, ownerId: session!.user.id },
      include: { widgetConfig: true },
    }),
    db.user.findUnique({
      where: { id: session!.user.id },
      select: { plan: true },
    }),
  ]);

  if (!site) notFound();

  const wc = site.widgetConfig;
  if (!wc) notFound();

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm">
        <a href="/dashboard" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Dashboard</a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-semibold">{site.name}</span>
      </nav>

      <Suspense fallback={<div className="h-10" />}>
        <WidgetConfigForm
          siteId={site.id}
          userPlan={user?.plan ?? "free"}
          initialName={site.name}
          initialDomain={site.domain}
          widgetScriptSrc={process.env["NEXT_PUBLIC_WIDGET_URL"]!}
          badgeSrc={`${process.env["NEXT_PUBLIC_API_URL"]!}/badge/${site.id}.svg`}
          config={{
          position: wc.position,
          primaryColor: wc.primaryColor,
          language: wc.language,
          accessibilityStatementUrl: wc.accessibilityStatementUrl ?? "",
          whiteLabelText: wc.whiteLabelText ?? null,
          allowedDomains: wc.allowedDomains,
          borderRadius: wc.borderRadius ?? 8,
          buttonSize: wc.buttonSize ?? "medium",
          fontFamily: wc.fontFamily ?? "system",
          headerBgColor: wc.headerBgColor ?? undefined,
          footerBgColor: wc.footerBgColor ?? undefined,
          // Features
          textResizing: wc.textResizing, dyslexiaFont: wc.dyslexiaFont,
          cursorEnhancement: wc.cursorEnhancement, keyboardNavigation: wc.keyboardNavigation,
          readingGuide: wc.readingGuide, screenReader: wc.screenReader,
          pauseAnimations: wc.pauseAnimations, textSpacing: wc.textSpacing,
          highlightLinks: wc.highlightLinks, colorBlindMode: wc.colorBlindMode,
          largeClickTargets: wc.largeClickTargets, focusHighlight: wc.focusHighlight,
          skipNavigation: wc.skipNavigation, muteMedia: wc.muteMedia,
          readingMask: wc.readingMask, textAlign: wc.textAlign, saturation: wc.saturation,
          blueLightFilter: wc.blueLightFilter, hideImages: wc.hideImages, darkMode: wc.darkMode,
          contentMagnifier: wc.contentMagnifier, toolTips: wc.toolTips,
          sustainabilityMode: wc.sustainabilityMode, slowCursor: wc.slowCursor,
          dictionary: wc.dictionary, lineHeight: wc.lineHeight, highlightTitles: wc.highlightTitles,
          // Profiles
          profileAdhd: wc.profileAdhd, profileBlind: wc.profileBlind,
          profileLowVision: wc.profileLowVision, profileColorBlind: wc.profileColorBlind,
          profileDyslexia: wc.profileDyslexia, profileMotorImpaired: wc.profileMotorImpaired,
          profileCognitive: wc.profileCognitive, profileSeizure: wc.profileSeizure,
          profileParkinson: wc.profileParkinson,
        }}
        />
      </Suspense>
    </div>
  );
}
```

Note: `highContrast` and `grayscale` are intentionally omitted — they exist in the DB schema but are not in `WidgetFeatures` and not surfaced in the form.

- [ ] **Step 2: Typecheck**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no errors. If `headerBgColor`/`footerBgColor` don't exist on `wc` yet (Prisma schema), set them to `undefined` and they'll be treated as optional.

- [ ] **Step 3: Visual verify**

Navigate to a site's customize page. Confirm:
- 4 tabs: Setup / Appearance / Features / Profiles
- Tab state persists in URL (`?tab=appearance`)
- Setup tab: embed code with copy button, language dropdown, allowed domains, WCAG badge, Danger Zone
- Appearance tab: color picker, position grid (4 corners), Mini/Regular/Large buttons, business gates
- Features tab: 4 categories, 24 toggles, 3 coming-soon disabled
- Profiles tab: 6 cards, toggle on click

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/app/dashboard/sites/\[id\]/page.tsx
git commit -m "feat(customize): update site page to use new tab shell, remove max-w, pass all config props"
```

---

## Final Verification

- [ ] **Full typecheck**

```bash
cd /Users/berkan/Projects/inculva && pnpm typecheck
```

Expected: zero errors across all packages.

- [ ] **End-to-end visual checklist**

| Screen | Check |
|---|---|
| Any dashboard page | Sidebar full height, user area always visible at bottom |
| Click user area | Popup appears with name/email + Sign out |
| Click Sign out | Redirected to /login |
| Click outside popup | Popup closes |
| Dashboard `/dashboard` | Stats row + site cards with single "Open →" button |
| Header | New site button left of ThemeToggle/Lang/Bell |
| `/settings` | Account page only: Profile, data export, delete |
| `/settings/api-keys` | API keys page, sidebar "API Keys" highlighted |
| `/settings/webhooks` | Webhooks page, sidebar "Webhooks" highlighted |
| `/settings/billing` | Full width, no max-w |
| `/settings/audit-log` | Full width, no max-w |
| `/sites/[id]?tab=setup` | Embed code + copy, language dropdown 41 langs, domains, WCAG badge, danger zone |
| `/sites/[id]?tab=appearance` | Color picker, 4-corner grid, Mini/Regular/Large, business gates |
| `/sites/[id]?tab=features` | 4 categories, 24 live toggles, 3 coming-soon disabled |
| `/sites/[id]?tab=profiles` | 6 profile cards toggle on click |
| Save on any tab | PUT request fires, success/error shown |

- [ ] **Final commit if any cleanup needed**

```bash
git add -p  # review and stage any remaining changes
git commit -m "chore(dashboard): final cleanup and full-width layout consistency"
```
