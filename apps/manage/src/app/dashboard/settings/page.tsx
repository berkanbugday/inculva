import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";
import { DeleteAccount } from "./delete-account";
import { ReferralBanner } from "@/components/referral-banner";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale) ? cookieLocale : "en") as Locale;
  const t = getMessages(locale);

  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.settings.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.settings.titleDesc}</p>
      </div>

      <ProfileForm
        name={session.user.name ?? null}
        email={session.user.email}
      />

      <ReferralBanner />

      {/* GDPR Data Export */}
      <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{t.settings.exportData}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.settings.exportDataDesc}
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
          {t.settings.downloadExport}
        </a>
      </section>

      <DeleteAccount />
    </main>
  );
}
