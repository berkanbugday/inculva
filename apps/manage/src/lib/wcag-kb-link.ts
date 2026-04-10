import { wcagKbArticleUrl, type KbLocale } from "@inculva/wcag-kb";

function landingBaseUrl(): string {
  const u = process.env["NEXT_PUBLIC_LANDING_URL"];
  return typeof u === "string" && u.length > 0 ? u : "https://inculva.com";
}

/** Absolute URL to the inculva KB WCAG article for this axe rule, or null if we have no article. */
export function scanRuleKnowledgeBaseUrl(
  ruleId: string,
  locale: KbLocale,
): string | null {
  return wcagKbArticleUrl(ruleId, {
    baseUrl: landingBaseUrl(),
    locale,
  });
}

type KbLinkScannerCopy = {
  wcagDocument: string;
  learnMore: string;
  wcagKbArticleGeneric: string;
};

/** Link text for a KB doc; `wcag` is the axe-derived tag (e.g. `1.4.3`, `best-practice`, `unknown`). */
export function scanKbDocLinkLabel(wcag: string, t: KbLinkScannerCopy): string {
  if (wcag === "best-practice") return t.learnMore;
  if (wcag === "unknown") return t.wcagKbArticleGeneric;
  return t.wcagDocument.replace("{wcag}", wcag);
}
