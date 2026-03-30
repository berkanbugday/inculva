"use client";

import { useState } from "react";
import { Snackbar } from "@/components/ui/snackbar";
import type { DashboardMessages } from "@/i18n/messages";
import { useMessages, useLocale } from "@/i18n/useMessages";

interface Props {
  siteId: string;
  siteName: string;
  siteDomain: string;
  contactEmail: string;
  contactName: string;
  lastScanViolations: number | null;
  lastScanAt: string | null;
  currentStatementUrl: string | null;
}

function generateHtml(opts: {
  siteName: string;
  siteDomain: string;
  contactEmail: string;
  contactName: string;
  conformanceLevel: string;
  reviewDate: string;
  limitations: string;
  lastScanViolations: number | null;
  landingUrl: string;
  t: DashboardMessages;
  locale: string;
}): string {
  const {
    siteName,
    siteDomain,
    contactEmail,
    contactName,
    conformanceLevel,
    reviewDate,
    limitations,
    lastScanViolations,
    landingUrl,
    t,
    locale,
  } = opts;

  const statusNote =
    lastScanViolations === null
      ? t.statement.statusNoteNotScanned
      : lastScanViolations === 0
      ? t.statement.statusNoteNoViolationsPublic
      : t.statement.statusNoteViolationsPublic.replace(
          "{count}",
          String(lastScanViolations),
        );

  const conformanceBody = t.statement.conformanceBodyGeneric.replace(
    "{level}",
    conformanceLevel,
  );
  const eaaNote =
    conformanceLevel === "AA" ? ` ${t.statement.conformanceEaaNote}` : "";

  const formattedReviewDate = new Date(reviewDate).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const footerPreparedParts = t.statement.footerPrepared.split("{directive}");
  const generatedDate = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const footerGeneratedWithDate = t.statement.footerGenerated.replace(
    "{date}",
    generatedDate,
  );
  const footerGeneratedParts = footerGeneratedWithDate.split("{inculva}");
  const footerGeneratedText =
    footerGeneratedParts[0] +
    `<a href="${landingUrl}">inculva</a>` +
    (footerGeneratedParts[1] ?? "");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t.statement.publicTitle} — ${siteName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #1a1a1a; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    h2 { font-size: 1.25rem; margin-top: 2rem; color: #0066cc; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.25rem; }
    p, li { margin-bottom: 0.75rem; }
    ul { padding-left: 1.5rem; }
    a { color: #0066cc; }
    footer { margin-top: 3rem; font-size: 0.85rem; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 1rem; }
  </style>
</head>
<body>
  <h1>${t.statement.publicTitle}</h1>
  <p>${
    t.statement.appliesTo
  } <strong><a href="https://${siteDomain}">${siteDomain}</a></strong></p>
  <p>${t.statement.lastReviewed} <strong>${formattedReviewDate}</strong></p>

  <h2>${t.statement.ourCommitmentTitle}</h2>
  <p>${t.statement.ourCommitmentBody.replace("{siteName}", siteName)}</p>

  <h2>${t.statement.conformanceStatusTitle}</h2>
  <p>${conformanceBody}${eaaNote}</p>
  <p>${statusNote}</p>

  <h2>${t.statement.technicalSpecificationsTitle}</h2>
  <p>${t.statement.technicalSpecificationsBody}</p>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  <p>${t.statement.widgetNote}</p>

  ${
    limitations
      ? `<h2>${t.statement.knownLimitations}</h2>\n  <p>${limitations.replace(
          /\n/g,
          "</p>\n  <p>",
        )}</p>`
      : ""
  }

  <h2>${t.statement.feedbackAndContactTitle}</h2>
  <p>${t.statement.feedbackIntro.replace("{siteName}", siteName)}</p>
  <ul>
    ${
      contactName
        ? `<li><strong>${t.statement.contactNameLabel}</strong> ${contactName}</li>`
        : ""
    }
    <li><strong>${
      t.statement.contactEmailLabel
    }</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></li>
    <li><strong>${
      t.statement.contactWebsiteLabel
    }</strong> <a href="https://${siteDomain}">${siteDomain}</a></li>
  </ul>
  <p>${t.statement.responseTime}</p>

  <h2>${t.statement.enforcementTitle}</h2>
  <p>${t.statement.enforcementBody}</p>

  <footer>
    <p>${
      footerPreparedParts[0]
    }<a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882">${
      t.statement.footerDirectiveName
    }</a>${footerPreparedParts[1] ?? ""}</p>
    <p>${footerGeneratedText}</p>
  </footer>
</body>
</html>`;
}

export function StatementClient({
  siteId,
  siteName,
  siteDomain,
  contactEmail,
  contactName,
  lastScanViolations,
  lastScanAt,
  currentStatementUrl,
}: Props) {
  const t = useMessages();
  const locale = useLocale();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    contactEmail,
    contactName,
    conformanceLevel: "AA",
    reviewDate: today,
    limitations: "",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statementUrl, setStatementUrl] = useState(currentStatementUrl || "");
  const [urlSaving, setUrlSaving] = useState(false);
  const [urlSaved, setUrlSaved] = useState(false);

  const appUrl = process.env["NEXT_PUBLIC_APP_URL"]!;
  const landingUrl = process.env["NEXT_PUBLIC_LANDING_URL"]!;
  const hostedUrl = `${appUrl}/s/${siteId}`;

  function copyHostedUrl() {
    void navigator.clipboard.writeText(hostedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const html = generateHtml({
    ...form,
    siteName,
    siteDomain,
    lastScanViolations,
    landingUrl,
    t,
    locale,
  });

  function downloadHtml() {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `accessibility-statement-${siteDomain}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function saveUrl() {
    setUrlSaving(true);
    try {
      const res = await fetch(`/api/sites/${siteId}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessibilityStatementUrl: statementUrl }),
      });
      if (res.ok) {
        setUrlSaved(true);
        setTimeout(() => setUrlSaved(false), 4000);
      }
    } finally {
      setUrlSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Hosted URL banner */}
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-green-900 dark:text-green-200 mb-1">
            {t.statement.hostedTitle}
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            {t.statement.hostedDesc}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <code className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
            {hostedUrl}
          </code>
          <button
            onClick={copyHostedUrl}
            className="px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            {copied ? t.statement.copied : t.statement.copyUrl}
          </button>
          <a
            href={hostedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
          >
            {t.statement.preview}
          </a>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
          {t.statement.eaaTitle}
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {t.statement.eaaDesc}
        </p>
      </div>

      {/* Scan status */}
      {lastScanAt && (
        <div
          className={`rounded-xl border p-4 text-sm ${
            lastScanViolations === 0
              ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
              : "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300"
          }`}
        >
          {lastScanViolations === 0
            ? t.statement.lastScanNoViolations.replace(
                "{date}",
                new Date(lastScanAt).toLocaleDateString(locale),
              )
            : t.statement.lastScanViolations
                .replace(
                  "{date}",
                  new Date(lastScanAt).toLocaleDateString(locale),
                )
                .replace("{count}", String(lastScanViolations))}
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {t.statement.detailsTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.statement.contactName}
            </label>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactName: e.target.value }))
              }
              className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.statement.contactNamePlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.statement.contactEmail}
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactEmail: e.target.value }))
              }
              className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="accessibility@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.statement.conformanceLevel}
            </label>
            <select
              value={form.conformanceLevel}
              onChange={(e) =>
                setForm((f) => ({ ...f, conformanceLevel: e.target.value }))
              }
              className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="A">{t.statement.conformanceLevelA}</option>
              <option value="AA">{t.statement.conformanceLevelAA}</option>
              <option value="AAA">{t.statement.conformanceLevelAAA}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.statement.reviewDate}
            </label>
            <input
              type="date"
              value={form.reviewDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, reviewDate: e.target.value }))
              }
              className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.statement.knownLimitations}
          </label>
          <textarea
            value={form.limitations}
            onChange={(e) =>
              setForm((f) => ({ ...f, limitations: e.target.value }))
            }
            rows={3}
            className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder={t.statement.knownLimitationsPlaceholder}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={downloadHtml}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.statement.downloadHtml}
          </button>
          <button
            onClick={() => setPreview((p) => !p)}
            className="px-5 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 border border-[#e8eaf0] dark:border-[#2a2a3e] transition-colors"
          >
            {preview ? t.statement.hidePreview : t.statement.preview}
          </button>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {t.statement.preview}
          </h3>
          <iframe
            srcDoc={html}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
            style={{ height: 480 }}
            title={t.statement.previewIframeTitle}
          />
        </div>
      )}

      {/* Link to statement in widget */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {t.statement.linkInWidget}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t.statement.linkInWidgetDesc}
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t.statement.statementUrl}
          </label>
          <input
            type="url"
            value={statementUrl}
            onChange={(e) => {
              setStatementUrl(e.target.value);
              setUrlSaved(false);
            }}
            className="w-full px-4 py-2.5 text-sm rounded-2xl border border-[#e8eaf0] dark:border-[#2a2a3e] bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.statement.statementUrlPlaceholder}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => void saveUrl()}
            disabled={urlSaving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {urlSaving ? t.statement.saving : t.statement.saveUrl}
          </button>
        </div>
      </div>
      <Snackbar open={urlSaved} message={t.statement.saved} />
    </div>
  );
}
