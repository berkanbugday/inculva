# Manage Panel Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual redesign of the `/apps/manage` Next.js app — modern, large, rounded, UserWay-inspired aesthetic using brand primary `#0066cc`.

**Architecture:** Pure visual/CSS redesign — no API routes, no data logic, no new dependencies. All changes are Tailwind class swaps and layout restructuring within existing files. Design tokens updated in `packages/ui/src/globals.css`, then each page/component updated file by file.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4.2.1, Lucide React, react-hook-form + zod, `@inculva/ui` shared package.

**Component size limit:** Max 150 lines per component file. Split if needed.

**Design token reference:**

- Primary: `blue-600` (`#0066cc`) / dark: `blue-400` (`#4d9eff`)
- Background light: `#f8f9fc` (CSS var update) / dark: `#0e0e10`
- Card light: `#ffffff` / dark: `#1a1a2e`
- Border light: `#e8eaf0` / dark: `#2a2a3e`
- Accent gradient: `from-blue-600 to-violet-600`
- Buttons: `rounded-full`
- Cards: `rounded-3xl`
- Inputs: `rounded-2xl`
- Sidebar: `w-64`

---

## Chunk 1: Design Tokens

**Files:**

- Modify: `packages/ui/src/globals.css`

### Task 1: Update CSS design tokens

- [ ] **Step 1: Open `packages/ui/src/globals.css` and update `:root` and `.dark` tokens**

Replace `:root` block with:

```css
:root {
  --background: 220 33% 98%; /* #f8f9fc */
  --foreground: 224 71.4% 4.1%;
  --card: 0 0% 100%; /* #ffffff */
  --card-foreground: 224 71.4% 4.1%;
  --primary: 210 100% 40%; /* #0066cc */
  --primary-foreground: 210 20% 98%;
  --secondary: 220 14.3% 95.9%;
  --secondary-foreground: 220.9 39.3% 11%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  --accent: 220 14.3% 95.9%;
  --accent-foreground: 220.9 39.3% 11%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 20% 98%;
  --border: 228 20% 93%; /* #e8eaf0 */
  --input: 228 20% 93%;
  --ring: 210 100% 40%;
  --radius: 0.75rem;
}
```

Replace `.dark` block with:

```css
.dark {
  --background: 240 7% 6%; /* #0e0e10 */
  --foreground: 210 20% 98%;
  --card: 240 28% 14%; /* #1a1a2e */
  --card-foreground: 210 20% 98%;
  --primary: 210 100% 65%; /* #4d9eff */
  --primary-foreground: 220.9 39.3% 11%;
  --secondary: 240 19% 20%;
  --secondary-foreground: 210 20% 98%;
  --muted: 240 19% 20%;
  --muted-foreground: 217.9 10.6% 64.9%;
  --accent: 240 19% 20%;
  --accent-foreground: 210 20% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 20% 98%;
  --border: 240 19% 20%; /* ~#2a2a3e (HSL approximation, visually correct) */
  --input: 240 19% 20%;
  --ring: 210 100% 65%;
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/ui/src/globals.css
git commit -m "design: update CSS tokens for modern manage panel redesign"
```

---

## Chunk 2: Shell — Sidebar, Header, Dashboard Layout

**Files:**

- Modify: `apps/manage/src/components/sidebar.tsx`
- Modify: `apps/manage/src/components/dashboard-header.tsx`
- Modify: `apps/manage/src/app/dashboard/layout.tsx`

### Task 2: Redesign Sidebar

The sidebar grows from `w-56` to `w-64`, gets larger nav items with icons and labels, pill active states, blue accent bar, and a proper bottom user section.

- [ ] **Step 1: Replace `apps/manage/src/components/sidebar.tsx`**

```tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

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

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (userEmail[0]?.toUpperCase() ?? "?");

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#1a1a2e] border-r border-[#e8eaf0] dark:border-[#2a2a3e] min-h-[calc(100vh-56px)] flex flex-col overflow-y-auto">
      <nav className="flex-1 px-3 py-4 space-y-0.5">
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

        <a
          href="/dashboard/sites/new"
          className="flex items-center justify-center gap-2 mx-3 mt-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
        >
          <PlusIcon />
          Add new site
        </a>

        <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] mx-2 my-2" />

        <SidebarLink
          href="/dashboard/statistics"
          active={isActive("/dashboard/statistics")}
          icon={<ChartIcon />}
          label="Statistics"
        />
        <SidebarLink
          href="/dashboard/settings"
          active={isActive("/dashboard/settings")}
          icon={<SettingsIcon />}
          label="Settings"
        />
      </nav>

      <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 py-4">
        <a
          href="/dashboard/settings"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            {userName && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {userName}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
        </a>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Split into three files to stay under the 150-line limit**

Create `apps/manage/src/components/sidebar-icons.tsx` containing all 5 icon components (`GridIcon`, `GlobeIcon`, `ChartIcon`, `SettingsIcon`, `PlusIcon`).

Create `apps/manage/src/components/sidebar-parts.tsx` containing `SidebarLink` and `SiteGroup` components. Import `sidebar-icons.tsx` here.

`sidebar.tsx` imports from both and stays under 80 lines.

- [ ] **Step 3: Add sub-components to `sidebar-parts.tsx`**

```tsx
function SidebarLink({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl mx-1 text-sm font-semibold transition-colors relative ${
        active
          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full"
          aria-hidden="true"
        />
      )}
      {icon}
      {label}
    </a>
  );
}

function SiteGroup({
  site,
  expanded,
  onToggle,
  isActive,
  pathname,
}: {
  site: { id: string; name: string; domain: string };
  expanded: boolean;
  onToggle: () => void;
  isActive: (href: string) => boolean;
  pathname: string;
}) {
  const siteActive = pathname.includes(site.id);
  const subItems = [
    { label: "Customize", href: `/dashboard/sites/${site.id}` },
    { label: "Analytics", href: `/dashboard/sites/${site.id}/analytics` },
    { label: "WCAG Scan", href: `/dashboard/sites/${site.id}/scan` },
    { label: "Statement", href: `/dashboard/sites/${site.id}/statement` },
  ];
  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mx-1 text-sm font-semibold transition-colors text-left ${
          siteActive
            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
      >
        <GlobeIcon />
        <span className="flex-1 truncate text-xs">{site.domain}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M4 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {expanded && (
        <div className="ml-8 mt-0.5 space-y-0.5">
          {subItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold"
                  : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Icons
function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="1"
        y="1"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="9"
        y="1"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="1"
        y="9"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="9"
        y="9"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M1.5 8h13M8 1.5C6.5 3.5 5.5 5.7 5.5 8s1 4.5 2.5 6.5M8 1.5C9.5 3.5 10.5 5.7 10.5 8s-1 4.5-2.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="1"
        y="9"
        width="3"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="6.5"
        y="5"
        width="3"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="12"
        y="1"
        width="3"
        height="14"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M8 2v12M2 8h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
```

> Note: If the file exceeds 150 lines, split icons into `sidebar-icons.tsx` and sub-components into `sidebar-parts.tsx`, both in `src/components/`.

### Task 3: Redesign Dashboard Header

Header becomes minimal — no user dropdown (moved to sidebar bottom). Shows breadcrumb left, controls right.

- [ ] **Step 1: Replace `apps/manage/src/components/dashboard-header.tsx`**

```tsx
"use client";

import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./notification-bell";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

interface Props {
  locale: string;
}

export function DashboardHeader({ locale }: Props) {
  const pathname = usePathname();
  const label = getPageLabel(pathname);

  return (
    <header className="h-14 bg-white dark:bg-[#1a1a2e] border-b border-[#e8eaf0] dark:border-[#2a2a3e] px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div className="flex items-center gap-3">
        <a href="/dashboard">
          <img
            src={`${CDN_URL}/logos/logo-dark.png`}
            alt="Inculva"
            className="h-7 w-auto"
          />
        </a>
        {label && (
          <>
            <span className="text-gray-300 dark:text-gray-700 text-sm">/</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
        <NotificationBell />
        <a
          href="/dashboard/sites/new"
          className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors ml-2"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 1v10M1 6h10"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          New site
        </a>
      </div>
    </header>
  );
}

function getPageLabel(pathname: string): string | null {
  if (pathname === "/dashboard") return "My Websites";
  if (pathname.includes("/analytics")) return "Analytics";
  if (pathname.includes("/scan")) return "WCAG Scan";
  if (pathname.includes("/statement")) return "Statement";
  if (pathname.includes("/sites/new")) return "New Site";
  if (pathname.includes("/sites/")) return "Customize";
  if (pathname.includes("/billing")) return "Billing";
  if (pathname.includes("/audit-log")) return "Audit Log";
  if (pathname.includes("/settings")) return "Settings";
  if (pathname.includes("/statistics")) return "Statistics";
  if (pathname.includes("/notifications")) return "Notifications";
  return null;
}
```

### Task 4: Update Dashboard Layout

Pass `userName`/`userEmail` to Sidebar. Remove `isAdmin` from Sidebar (single-user product).

- [ ] **Step 1: Update `apps/manage/src/app/dashboard/layout.tsx`**

```tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers, cookies } from "next/headers";
import { DashboardHeader } from "@/components/dashboard-header";
import { VerificationBanner } from "@/components/verification-banner";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { email, name, emailVerified } = session.user;
  const locale = (await cookies()).get("locale")?.value ?? "en";

  const [user, sites] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { bannedAt: true },
    }),
    db.site.findMany({
      where: { ownerId: session.user.id },
      select: { id: true, name: true, domain: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  if (user?.bannedAt) redirect("/banned");

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex flex-col">
      <DashboardHeader locale={locale} />
      {!emailVerified && <VerificationBanner email={email} />}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sites={sites} userName={name ?? null} userEmail={email} />
        <main className="flex-1 min-w-0 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/manage/src/components/sidebar.tsx apps/manage/src/components/dashboard-header.tsx apps/manage/src/app/dashboard/layout.tsx
git commit -m "design: redesign sidebar, header, and dashboard layout shell"
```

---

## Chunk 3: Auth Pages

**Files:**

- Modify: `apps/manage/src/components/auth-brand-panel.tsx`
- Modify: `apps/manage/src/components/oauth-buttons.tsx`
- Modify: `apps/manage/src/app/login/page.tsx`
- Modify: `apps/manage/src/app/login/layout.tsx`
- Modify: `apps/manage/src/app/register/page.tsx`
- Modify: `apps/manage/src/app/register/layout.tsx`
- Modify: `apps/manage/src/app/forgot-password/page.tsx`
- Modify: `apps/manage/src/app/forgot-password/layout.tsx`
- Modify: `apps/manage/src/app/reset-password/page.tsx`
- Modify: `apps/manage/src/app/reset-password/layout.tsx`
- Modify: `apps/manage/src/app/banned/page.tsx`
- Modify: `apps/manage/src/app/not-found.tsx`
- Modify: `apps/manage/src/app/error.tsx`

**Shared CSS constants (define once, use across auth pages):**

```tsx
const inputCls =
  "w-full px-5 py-4 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow text-base";
const labelCls =
  "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const btnCls =
  "w-full py-4 px-6 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";
const cardCls =
  "bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-10 w-full max-w-md";
```

### Task 5: Update auth brand panel

The component already has a `gradient` prop with default `"from-blue-600 to-blue-800"`. The spec wants `from-blue-600 to-violet-600`.

- [ ] **Step 1: Update `apps/manage/src/components/auth-brand-panel.tsx`** — change the default gradient prop value:

```tsx
// Change from:
gradient = "from-blue-600 to-blue-800",
// To:
gradient = "from-blue-600 to-violet-600",
```

No other changes needed — logo, children slot, decorative circles, and standards badge are already correct.

### Task 6: Update OAuth buttons to pill shape

- [ ] **Step 1: Read `apps/manage/src/components/oauth-buttons.tsx`**
- [ ] **Step 2: Change all button `rounded-*` classes to `rounded-full`**
- [ ] **Step 3: Increase padding to `py-3.5`**

### Task 7: Redesign Login page

- [ ] **Step 1: Update `apps/manage/src/app/login/page.tsx`**

Apply the new shared constants. Key changes:

- Card container: wrap form content in `<div className={cardCls}>`
- `<main>` bg: `bg-[#f8f9fc] dark:bg-[#0e0e10]`
- Title: `text-2xl font-black`
- Input class → use new `inputCls`
- Submit button → use new `btnCls`
- Error/success alerts → `rounded-2xl` (already close, just update classes)
- Links → keep `text-blue-600 font-semibold hover:underline`

Full replacement of the `<main>` section:

```tsx
<main className="flex-1 flex items-center justify-center p-6 bg-[#f8f9fc] dark:bg-[#0e0e10]">
  <div className={cardCls}>
    <div className="lg:hidden text-center mb-8">
      <img
        src={`${CDN_URL}/logos/logo.png`}
        alt="Inculva"
        className="h-10 w-auto mx-auto"
      />
    </div>

    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
      Welcome back
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
      Sign in to manage your accessible sites.
    </p>

    {/* password reset success banner */}
    {passwordReset && (
      <div
        role="status"
        aria-live="polite"
        className="mb-6 flex items-start gap-2.5 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl px-4 py-3 text-sm text-green-700 dark:text-green-300"
      >
        {/* check icon */}
        Password updated. Sign in with your new password.
      </div>
    )}

    <OAuthButtons callbackURL={callbackUrl} />
    <OAuthDivider />

    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Sign in to your account"
      className="space-y-5"
    >
      <div>
        <label htmlFor="email" className={labelCls}>
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          aria-required="true"
          className={inputCls}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-describedby={errors.password ? "password-error" : undefined}
          aria-invalid={!!errors.password}
          aria-required="true"
          className={inputCls}
          {...register("password")}
        />
        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root && (
        <div
          role="alert"
          className="flex items-start gap-2.5 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {errors.root.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        aria-label={
          isSubmitting ? "Signing in, please wait" : "Sign in to your account"
        }
        className={btnCls}
      >
        {isSubmitting && <SpinnerIcon />}
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          Sign up free
        </a>
      </p>
    </form>
  </div>
</main>
```

### Task 8: Redesign Register page

- [ ] **Step 1: Read `apps/manage/src/app/register/page.tsx`**
- [ ] **Step 2: Apply same pattern as login** — `cardCls` wrapper, new `inputCls`/`labelCls`/`btnCls`, `text-2xl font-black` title, `rounded-2xl` error alerts, `bg-[#f8f9fc]` main bg.

### Task 9: Redesign Forgot Password page

- [ ] **Step 1: Read `apps/manage/src/app/forgot-password/page.tsx`**
- [ ] **Step 2: Apply same card/input/button pattern.** Title: `"Reset your password"`. Single email field. Submit button uses `btnCls`.

### Task 10: Redesign Reset Password page

- [ ] **Step 1: Read `apps/manage/src/app/reset-password/page.tsx`**
- [ ] **Step 2: Apply card/input/button pattern.** Two password fields. Title: `"Choose a new password"`.

### Task 11: Redesign Banned page

- [ ] **Step 1: Read `apps/manage/src/app/banned/page.tsx`**
- [ ] **Step 2: Update to centered layout:**

```tsx
<div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center p-6">
  <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-12 w-full max-w-md text-center">
    <div className="w-16 h-16 rounded-3xl bg-red-50 dark:bg-red-950 flex items-center justify-center mx-auto mb-6">
      {/* red ban icon */}
    </div>
    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
      Account Suspended
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
      Your account has been suspended. Contact support if you believe this is a
      mistake.
    </p>
    <a
      href="mailto:hi@inculva.com"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
    >
      Contact support
    </a>
  </div>
</div>
```

### Task 11b: Update auth layout files

Each auth layout file wraps the page in a full-height container. These need the background updated.

- [ ] **Step 1: Read each auth layout** (`login/layout.tsx`, `register/layout.tsx`, `forgot-password/layout.tsx`, `reset-password/layout.tsx`)
- [ ] **Step 2: For each layout, update the root container background** from `bg-gray-50 dark:bg-gray-950` (or similar) to `bg-[#f8f9fc] dark:bg-[#0e0e10]`. Keep all other layout logic (metadata, auth redirects, etc.) unchanged.

### Task 12: Redesign 404 and Error pages

- [ ] **Step 1: Read `apps/manage/src/app/not-found.tsx`**
- [ ] **Step 2: Update with gradient large number:**

```tsx
<div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10] flex items-center justify-center p-6">
  <div className="text-center">
    <p className="text-8xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
      404
    </p>
    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
      Page not found
    </h1>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
      This page doesn&apos;t exist or has been moved.
    </p>
    <a
      href="/dashboard"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
    >
      Back to dashboard
    </a>
  </div>
</div>
```

- [ ] **Step 3: Read `apps/manage/src/app/error.tsx` and apply same pattern with "Something went wrong" messaging.**

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/components/auth-brand-panel.tsx apps/manage/src/components/oauth-buttons.tsx apps/manage/src/app/login/page.tsx apps/manage/src/app/register/page.tsx apps/manage/src/app/forgot-password/page.tsx apps/manage/src/app/reset-password/page.tsx apps/manage/src/app/banned/page.tsx apps/manage/src/app/not-found.tsx apps/manage/src/app/error.tsx
git commit -m "design: redesign auth pages with modern rounded card layout"
```

---

## Chunk 4: Dashboard Home & Site Pages

**Files:**

- Modify: `apps/manage/src/app/dashboard/page.tsx`
- Modify: `apps/manage/src/app/dashboard/sites/new/page.tsx` (and wizard component)
- Modify: `apps/manage/src/app/dashboard/sites/[id]/page.tsx` (and sub-components)
- Modify: `apps/manage/src/app/dashboard/sites/[id]/analytics/page.tsx`
- Modify: `apps/manage/src/app/dashboard/sites/[id]/scan/page.tsx`
- Modify: `apps/manage/src/app/dashboard/sites/[id]/statement/page.tsx`
- Modify: `apps/manage/src/app/dashboard/sites/[id]/delete/page.tsx`

**Shared card class (use in all dashboard pages):**

```tsx
const cardCls = "bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm";
const sectionCls = "bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8";
```

### Task 13: Redesign Dashboard Home

- [ ] **Step 1: Update `apps/manage/src/app/dashboard/page.tsx`**

Key changes:

- Remove outer `px-6 py-8` — layout now handled by `main` in `layout.tsx` (`p-8`)
- Page header: `text-3xl font-black`
- Stats row: add 3 stat cards above the grid (total sites, total widget opens, total scans)
- Site cards: `rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border-0` (no border, use shadow)
- Site card domain: `text-base font-bold`, added date smaller
- Quick action links at card bottom: Analytics, Scan, Customize as pill links
- Empty state: `rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900` with gradient icon circle
- Add new site card: same dashed `rounded-3xl`

Updated structure:

```tsx
return (
  <div className="max-w-6xl">
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          My Websites
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {sites.length === 0
            ? "No sites yet"
            : `${sites.length} site${sites.length !== 1 ? "s" : ""} connected`}
        </p>
      </div>
      <a
        href="/dashboard/sites/new"
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 1v10M1 6h10"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        New site
      </a>
    </div>

    {/* Stats row */}
    {sites.length > 0 && (
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Total sites
          </p>
          <p className="text-4xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {sites.length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Widget opens
          </p>
          <p className="text-4xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {sites
              .reduce((a, s) => a + s._count.widgetEvents, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Live sites
          </p>
          <p className="text-4xl font-black bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {sites.filter((s) => s.healthStatus === "healthy").length}
          </p>
        </div>
      </div>
    )}

    {/* Sites grid or empty state */}
    {sites.length === 0 ? (
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 p-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">
          Add your first site
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
          Register your domain and get an embed snippet. Your accessibility
          widget goes live in under 5 minutes.
        </p>
        <a
          href="/dashboard/sites/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors"
        >
          Add first site
        </a>
      </div>
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => {
          const score = getComplianceScore(
            site.widgetConfig?.lastScanViolations,
          );
          const isLive = site.healthStatus === "healthy";
          const isDown = site.healthStatus === "degraded";
          return (
            <div
              key={site.id}
              className="bg-white dark:bg-[#1a1a2e] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M12 3C10 5.5 9 8.7 9 12s1 6.5 3 9M12 3c2 2.5 3 5.7 3 9s-1 6.5-3 9M3 12h18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                      {site.domain}
                    </p>
                    {site.name !== site.domain && (
                      <p className="text-xs text-gray-400 truncate">
                        {site.name}
                      </p>
                    )}
                  </div>
                </div>
                {site.healthStatus && (
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                      isLive
                        ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                        : isDown
                          ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500" : isDown ? "bg-red-500" : "bg-gray-400"}`}
                    />
                    {isLive ? "Live" : isDown ? "Offline" : "Checking"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">Widget opens</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    {site._count.widgetEvents.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#f8f9fc] dark:bg-[#0e0e10] rounded-2xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">WCAG score</p>
                  <p
                    className={`text-sm font-bold flex items-center gap-1.5 mt-0.5 ${score.color}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${score.dot}`}
                    />
                    {score.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#e8eaf0] dark:border-[#2a2a3e]">
                <a
                  href={`/dashboard/sites/${site.id}/analytics`}
                  className="flex-1 text-center text-xs font-semibold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                >
                  Analytics
                </a>
                <a
                  href={`/dashboard/sites/${site.id}/scan`}
                  className="flex-1 text-center text-xs font-semibold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                >
                  WCAG Scan
                </a>
                <a
                  href={`/dashboard/sites/${site.id}`}
                  className="flex-1 text-center text-xs font-semibold text-blue-600 dark:text-blue-400 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                >
                  Manage
                </a>
              </div>
            </div>
          );
        })}

        <a
          href="/dashboard/sites/new"
          className="bg-white dark:bg-[#1a1a2e] rounded-3xl border-2 border-dashed border-[#e8eaf0] dark:border-[#2a2a3e] p-6 flex flex-col items-center justify-center gap-3 text-center hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group min-h-[200px]"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              className="text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            >
              <path
                d="M8 2v12M2 8h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Add new site
            </p>
            <p className="text-xs text-gray-400">Live in under 5 min</p>
          </div>
        </a>
      </div>
    )}
  </div>
);
```

### Task 14: Read and redesign Site Customize page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/[id]/page.tsx`**
- [ ] **Step 2: Update layout** — remove outer padding (handled by layout), wrap each section in `<section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8">`, section headings `text-xl font-bold`, gap between sections `space-y-6`.
- [ ] **Step 3: Read and update `widget-config-form.tsx`** — inputs use `rounded-2xl border-[#e8eaf0]`, submit button `rounded-full bg-blue-600`.
- [ ] **Step 4: Read and update `site-name-form.tsx`** — same input/button pattern.
- [ ] **Step 5: Read and update `site-domain-form.tsx`** — same input/button pattern.
- [ ] **Step 6: Read and update `install-checker.tsx`** — wrap in `rounded-3xl shadow-sm` card, status icon larger.
- [ ] **Step 7: Read and update `widget-preview.tsx`** — preview container `rounded-3xl bg-[#f8f9fc] dark:bg-[#0e0e10] p-6`.

### Task 15: Read and redesign Analytics page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/[id]/analytics/page.tsx`**
- [ ] **Step 2: Update period tabs** — `rounded-full` pill group, active `bg-blue-600 text-white`, inactive `bg-gray-100 dark:bg-gray-800 text-gray-600`.
- [ ] **Step 3: Read and update `charts.tsx`** — chart wrapper `rounded-3xl shadow-sm p-8`.
- [ ] **Step 4: Read and update `period-tabs.tsx`** — pill group pattern.
- [ ] **Step 5: Add stat cards row** matching dashboard home style above charts.

### Task 16: Read and redesign WCAG Scan page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/[id]/scan/page.tsx`**
- [ ] **Step 2: Read and update `scanner-client.tsx`**
  - Trigger button: `rounded-full bg-blue-600 px-8 py-4 text-base font-bold`
  - Results cards: `rounded-3xl shadow-sm` per severity group with left border accent
  - Issue rows: `rounded-2xl` expandable items

### Task 17: Read and redesign Statement page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/[id]/statement/page.tsx`**
- [ ] **Step 2: Read and update `statement-client.tsx`** — `rounded-3xl p-10` document card, action buttons `rounded-full`.

### Task 18: Read and redesign Delete Site page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/[id]/delete/page.tsx`**
- [ ] **Step 2: Update** — centered `rounded-3xl` card, red accent `border-t-4 border-red-500`, confirmation input `rounded-2xl`, delete button `rounded-full bg-red-500`.

### Task 19: Read and redesign New Site Wizard

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/sites/new/page.tsx`** and any wizard components
- [ ] **Step 2: Update step indicator** — horizontal pill steps, active `bg-blue-600 text-white rounded-full px-4 py-1.5`, completed `bg-blue-50 text-blue-600 rounded-full`.
- [ ] **Step 3: Update wizard card** — `rounded-3xl shadow-sm p-10`, inputs `rounded-2xl`, next/back buttons `rounded-full`.

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/app/dashboard/
git commit -m "design: redesign dashboard home and site management pages"
```

---

## Chunk 5: Settings & Utility Pages

**Files:**

- Modify: `apps/manage/src/app/dashboard/settings/page.tsx` + sub-components
- Modify: `apps/manage/src/app/dashboard/settings/billing/page.tsx` + sub-components
- Modify: `apps/manage/src/app/dashboard/settings/audit-log/page.tsx`
- Modify: `apps/manage/src/app/dashboard/statistics/page.tsx`
- Modify: `apps/manage/src/app/dashboard/notifications/page.tsx`

### Task 20: Read and redesign Settings page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/settings/page.tsx`**
- [ ] **Step 2: Update layout** — stacked `rounded-3xl shadow-sm p-8` section cards with `space-y-6`.
- [ ] **Step 3: Read and update `profile-form.tsx`**
  - Avatar: `w-20 h-20 rounded-full bg-blue-600 text-white`
  - Inputs: `rounded-2xl border-[#e8eaf0]`
  - Save button: `rounded-full bg-blue-600`
- [ ] **Step 3b: Locate and update the password change form** — search for a password form component in `apps/manage/src/app/dashboard/settings/` (may be inside `page.tsx` or a separate file like `password-form.tsx`). Update its card wrapper to `rounded-3xl shadow-sm p-8`, inputs to `rounded-2xl border-[#e8eaf0]`, and save button to `rounded-full bg-blue-600`.

- [ ] **Step 4: Read and update `api-keys-manager.tsx`**
  - Container card: `rounded-3xl shadow-sm p-8`
  - Key rows: `flex items-center gap-3 p-3 rounded-2xl bg-[#f8f9fc] dark:bg-[#0e0e10]`
  - Copy/delete buttons: `rounded-xl p-2 hover:bg-gray-100`
  - Generate button: `rounded-full border border-[#e8eaf0]`
- [ ] **Step 5: Read and update `webhooks-manager.tsx`** — same card/row pattern as API keys.
- [ ] **Step 6: Read and update `delete-account.tsx`** — `rounded-3xl border-l-4 border-red-500 p-8` danger card.

### Task 21: Read and redesign Billing page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/settings/billing/page.tsx`**
- [ ] **Step 2: Update current plan card** — `rounded-3xl p-8`, plan name `text-2xl font-black`, active badge gradient `from-blue-600 to-violet-600 text-white rounded-full`.
- [ ] **Step 3: Update plan cards grid** — `rounded-3xl p-8`, price `text-3xl font-black`, CTA `rounded-full`, active plan `ring-2 ring-blue-600`.
- [ ] **Step 4: Read and update `plan-checkout-button.tsx`** — `rounded-full bg-blue-600`.
- [ ] **Step 5: Read and update `cancel-button.tsx`** — small `text-sm text-gray-400 hover:text-red-500 underline`.
- [ ] **Step 6: Read and update `upgrade-button.tsx`** — `rounded-full`.

### Task 22: Read and redesign Audit Log page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/settings/audit-log/page.tsx`**
- [ ] **Step 2: Update** — `rounded-3xl shadow-sm` wrapper, timeline rows with action badges `rounded-full bg-gray-100 text-xs font-semibold px-2.5 py-1`, alternating `bg-[#f8f9fc] dark:bg-[#0e0e10]` rows.

### Task 23: Read and redesign Statistics page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/statistics/page.tsx`**
- [ ] **Step 2: Update** — stat cards row matching dashboard home pattern, chart card `rounded-3xl shadow-sm p-8`, site filter `rounded-2xl`.

### Task 24: Read and redesign Notifications page

- [ ] **Step 1: Read `apps/manage/src/app/dashboard/notifications/page.tsx`** and `notifications-client.tsx`
- [ ] **Step 2: Update `notifications-client.tsx`**
  - Container: `rounded-3xl shadow-sm` card
  - Unread rows: `bg-blue-50 dark:bg-blue-950/30`
  - Unread dot: `w-2 h-2 rounded-full bg-blue-600`
  - "Mark all read" button: `rounded-full border border-[#e8eaf0]`

- [ ] **Final commit for Chunk 5**

```bash
git add apps/manage/src/app/dashboard/settings/ apps/manage/src/app/dashboard/statistics/ apps/manage/src/app/dashboard/notifications/
git commit -m "design: redesign settings, billing, audit log, statistics, and notifications pages"
```

---

## Chunk 6: Shared Utility Components

**Files:**

- Modify: `apps/manage/src/components/verification-banner.tsx`
- Modify: `apps/manage/src/components/cookie-banner.tsx`
- Modify: `apps/manage/src/components/referral-banner.tsx`
- Modify: `apps/manage/src/components/notification-bell.tsx`
- Modify: `apps/manage/src/components/theme-toggle.tsx`
- Modify: `apps/manage/src/components/language-switcher.tsx`

### Task 25: Update banners

- [ ] **Step 1: Read and update `verification-banner.tsx`** — `rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-5 py-3.5`, action button `rounded-full bg-amber-500 text-white px-4 py-1.5 text-sm font-semibold`.
- [ ] **Step 2: Read and update `cookie-banner.tsx`** — `rounded-3xl shadow-xl` floating card at bottom, accept button `rounded-full bg-blue-600`.
- [ ] **Step 3: Read and update `referral-banner.tsx`** — `rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-4`, CTA `rounded-full bg-white text-blue-600`.

### Task 26: Update header micro-components

- [ ] **Step 1: Read and update `notification-bell.tsx`** — button `rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800`, dropdown `rounded-3xl shadow-xl border border-[#e8eaf0] dark:border-[#2a2a3e]`.
- [ ] **Step 2: Read and update `theme-toggle.tsx`** — `rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800`.
- [ ] **Step 3: Read and update `language-switcher.tsx`** — `rounded-2xl p-2 hover:bg-gray-100`, dropdown `rounded-2xl shadow-xl border border-[#e8eaf0]`.

- [ ] **Step 4: Commit**

```bash
git add apps/manage/src/components/
git commit -m "design: update shared banners and header micro-components"
```

---

## Final Verification

- [ ] **Step 1: Run type check**

```bash
cd apps/manage && pnpm typecheck
```

Expected: no type errors

- [ ] **Step 2: Run dev server and visually verify**

```bash
pnpm dev
```

Open `http://localhost:3000` and check:

- [ ] Login page — gradient brand panel, rounded card form
- [ ] Dashboard home — stats row, site cards, empty state
- [ ] Sidebar — `w-64`, icons + labels, active pill state
- [ ] Header — breadcrumb, minimal, pill new-site button
- [ ] Settings — stacked section cards
- [ ] Dark mode toggle — all pages look correct in dark mode

- [ ] **Step 3: Final commit if any last fixes needed**

```bash
git add -p
git commit -m "design: final polish for manage panel redesign"
```
