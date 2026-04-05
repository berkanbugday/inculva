/**
 * WCAG scan result copy for Turkish UI. Single source: `i18n/axe-tr.json`
 * (`rules` + `incompleteEnToTr`). Keep contrast incomplete strings aligned with
 * `packages/scanner/src/locales/axe-tr-partial.json` (axe runtime locale).
 */
import type { Locale } from "@/i18n/messages";
import axeTr from "@/i18n/axe-tr.json";

type RuleEntry = { description: string; help: string };

type AxeTrBundle = {
  rules: Record<string, RuleEntry>;
  incompleteEnToTr: Record<string, string>;
};

const { rules, incompleteEnToTr } = axeTr as AxeTrBundle;

const incompleteTrToEn: Record<string, string> = {};
for (const [en, tr] of Object.entries(incompleteEnToTr)) {
  incompleteTrToEn[tr] = en;
}

export function localizedAxeRuleDescription(
  ruleId: string,
  fallback: string,
  locale: Locale,
): string {
  if (locale !== "tr") return fallback;
  return rules[ruleId]?.description ?? fallback;
}

/**
 * Incomplete-rule detail line from axe (per-node check message). Stored text
 * follows scan `contentLocale`; dashboard `locale` may differ — normalize both ways.
 */
export function localizedAxeManualReviewMessage(
  message: string,
  locale: Locale,
): string {
  if (locale === "tr") {
    return incompleteEnToTr[message] ?? message;
  }
  return incompleteTrToEn[message] ?? message;
}
