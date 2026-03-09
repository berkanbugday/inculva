import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { ApiKeysManager } from "./api-keys-manager";
import { ProfileForm } from "./profile-form";
import { DeleteAccount } from "./delete-account";
import { WebhooksManager } from "./webhooks-manager";
import { ReferralBanner } from "@/components/referral-banner";
export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const [apiKeys, webhooks] = await Promise.all([db.apiKey.findMany({
    where: { userId: session!.user.id, revokedAt: null },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  }), db.webhook.findMany({
    where: { userId: session!.user.id },
    select: { id: true, url: true, events: true, enabled: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and API access.</p>
      </div>

      {/* Settings sub-nav */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <span className="px-4 py-1.5 bg-white dark:bg-gray-900 rounded-lg text-sm font-medium text-gray-900 dark:text-white shadow-sm">
          Account
        </span>
        <a
          href="/dashboard/settings/billing"
          className="px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
        >
          Billing
        </a>
        <a
          href="/dashboard/settings/audit-log"
          className="px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg transition-colors"
        >
          Audit Log
        </a>
      </div>

      <ProfileForm
        name={session!.user.name ?? null}
        email={session!.user.email}
      />

      <ReferralBanner />

      <ApiKeysManager initialKeys={apiKeys} />

      <WebhooksManager initialWebhooks={webhooks.map(w => ({ ...w, createdAt: w.createdAt.toISOString() }))} />

      {/* GDPR Data Export */}
      <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Export Your Data</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Download a copy of all personal data we hold about you — your profile, sites, and API keys. This satisfies your GDPR Article 20 right to data portability.
          </p>
        </div>
        <a
          href="/api/account/export"
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1v9M4 7l4 4 4-4M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download data export (JSON)
        </a>
      </section>

      <DeleteAccount />
    </main>
  );
}
