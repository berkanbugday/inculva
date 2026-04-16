"use client";

import { labels } from "./config-form.types";

type Locale = "tr" | "en";

export default function TrialBanner({
  locale,
  manageUrl,
}: {
  locale: Locale;
  manageUrl: string;
}) {
  const t = labels[locale];

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h3 className="mb-1 text-sm font-semibold text-blue-900">
        {t.trialBanner}
      </h3>
      <p className="mb-3 text-sm text-blue-700">{t.trialDescription}</p>
      <a
        href={manageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {t.openManage}
      </a>
    </div>
  );
}
