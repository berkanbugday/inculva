import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { Locale } from "@/i18n/messages";
import { getMessages, SUPPORTED_LOCALES } from "@/i18n/messages";

export const metadata: Metadata = {
  title: "Terms of Use — inculva",
};

export default async function TermsPage() {
  const cookieLocale = (await cookies()).get("locale")?.value;
  const locale = (
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)
      ? cookieLocale
      : "en"
  ) as Locale;
  const t = getMessages(locale);

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0e0e10]">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <a
          href="/login"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.auth.backToSignIn}
        </a>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {t.legal.termsTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {t.legal.termsLastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>{t.legal.termsIntro}</p>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsAcceptanceTitle}
            </h2>
            <p>{t.legal.termsAcceptanceP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsServicesTitle}
            </h2>
            <p>{t.legal.termsServicesP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsAccountTitle}
            </h2>
            <p>{t.legal.termsAccountP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsUseTitle}
            </h2>
            <p>{t.legal.termsUseP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsIpTitle}
            </h2>
            <p>{t.legal.termsIpP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsLiabilityTitle}
            </h2>
            <p>{t.legal.termsLiabilityP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsTerminationTitle}
            </h2>
            <p>{t.legal.termsTerminationP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsChangesTitle}
            </h2>
            <p>{t.legal.termsChangesP1}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              {t.legal.termsContactTitle}
            </h2>
            <p>
              {t.legal.termsContactP1}{" "}
              <a
                href={`mailto:${t.legal.contactEmail}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t.legal.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
