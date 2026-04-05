"use client";

import { useState } from "react";
import type { DashboardMessages, Locale } from "@/i18n/messages";
import { useLocale } from "@/i18n/useMessages";
import {
  scanKbDocLinkLabel,
  scanRuleKnowledgeBaseUrl,
} from "@/lib/wcag-kb-link";
import {
  localizedAxeManualReviewMessage,
  localizedAxeRuleDescription,
} from "@/lib/axe-scan-i18n";
import type { IncompleteRuleData } from "./scan-results";

interface GroupedIncomplete {
  ruleId: string;
  description: string;
  impact: string;
  wcag: string;
  wcagLevel: string;
  items: IncompleteRuleData[];
}

function groupByRule(items: IncompleteRuleData[]): GroupedIncomplete[] {
  const map = new Map<string, GroupedIncomplete>();
  for (const item of items) {
    const existing = map.get(item.ruleId);
    if (existing) {
      existing.items.push(item);
    } else {
      map.set(item.ruleId, {
        ruleId: item.ruleId,
        description: item.description,
        impact: item.impact,
        wcag: item.wcag,
        wcagLevel: item.wcagLevel,
        items: [item],
      });
    }
  }
  return Array.from(map.values());
}

function IncompleteInstance({
  item,
  index,
  t,
  locale,
}: {
  item: IncompleteRuleData;
  index: number;
  t: DashboardMessages;
  locale: Locale;
}) {
  return (
    <div className="rounded-lg border border-[#e8eaf0] dark:border-[#2a2a3e] bg-gray-50 dark:bg-[#141425] p-3 space-y-2">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        #{index + 1}
      </p>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {t.scanner.reviewReason}
        </p>
        <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 rounded-lg px-3 py-2">
          {localizedAxeManualReviewMessage(item.message, locale)}
        </p>
      </div>
      {item.selector && (
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {t.scanner.cssSelector}
          </p>
          <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap break-all">
            {item.selector}
          </code>
        </div>
      )}
      {item.html && (
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {t.scanner.affectedElements}
          </p>
          <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 rounded-lg px-3 py-2 overflow-x-auto whitespace-pre-wrap break-all">
            {item.html}
          </code>
        </div>
      )}
    </div>
  );
}

function IncompleteGroupCard({
  group,
  t,
}: {
  group: GroupedIncomplete;
  t: DashboardMessages;
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const kbUrl = scanRuleKnowledgeBaseUrl(group.ruleId, locale);

  return (
    <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-white dark:bg-[#1a1a2e] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
          {t.scanner.needsReview}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {group.ruleId}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {group.wcag === "best-practice"
                ? t.scanner.bestPractice
                : group.wcag === "unknown"
                ? ""
                : `WCAG ${group.wcag} ${group.wcagLevel}`}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
              {group.items.length} {t.scanner.instances}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
            {localizedAxeRuleDescription(
              group.ruleId,
              group.description,
              locale,
            )}
          </p>
        </div>
        <svg
          className={`shrink-0 mt-1 w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="border-t border-[#e8eaf0] dark:border-[#2a2a3e] px-4 pb-4 pt-3 space-y-3">
          {kbUrl && (
            <a
              href={kbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {scanKbDocLinkLabel(group.wcag, t.scanner)}
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          <div className="space-y-2">
            {group.items.map((item, i) => (
              <IncompleteInstance
                key={item.id}
                item={item}
                index={i}
                t={t}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  incompleteRules: IncompleteRuleData[];
  t: DashboardMessages;
}

export function ReportIncomplete({ incompleteRules, t }: Props) {
  const groups = groupByRule(incompleteRules);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-1">
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {t.scanner.needsManualReview}
          </h3>
          <span className="ml-auto text-sm font-bold text-amber-600 dark:text-amber-400">
            {incompleteRules.length}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0">
          {t.scanner.needsManualReviewDesc}
        </p>
      </div>
      <div className="space-y-3">
        {groups.map((group) => (
          <IncompleteGroupCard key={group.ruleId} group={group} t={t} />
        ))}
      </div>
    </div>
  );
}
