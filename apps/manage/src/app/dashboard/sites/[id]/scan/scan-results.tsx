"use client";

import type { DashboardMessages } from "@/i18n/messages";
import { ReportHeader } from "./report-header";
import { ReportPages } from "./report-pages";

import { ReportPrinciples } from "./report-principles";
import { ReportPassedRules } from "./report-passed-rules";
import { ReportViolations } from "./report-violations";
import { ReportIncomplete } from "./report-incomplete";

export interface ScanIssueData {
  id: string;
  ruleId: string;
  description: string;
  impact: string;
  wcag: string;
  wcagLevel: string;
  category: string;
  selector?: string | null;
  html?: string | null;
  helpUrl?: string | null;
  pageId?: string | null;
}

export interface PassedRuleData {
  id: string;
  ruleId: string;
  description: string;
  helpText?: string | null;
  wcag: string;
  wcagLevel: string;
  category: string;
  helpUrl?: string | null;
  nodeCount: number;
}

export interface IncompleteRuleData {
  id: string;
  ruleId: string;
  description: string;
  impact: string;
  wcag: string;
  wcagLevel: string;
  category: string;
  selector?: string | null;
  html?: string | null;
  helpUrl?: string | null;
  message: string;
}

export interface ScanPageData {
  id: string;
  url: string;
  status: string;
  violations?: number | null;
  passes?: number | null;
  score?: number | null;
}

export interface ScanData {
  id: string;
  status: string;
  wcagLevel?: string | null;
  complianceScore?: number | null;
  totalViolations?: number | null;
  totalPasses?: number | null;
  totalPages?: number | null;
  startedAt?: string | null;
  completedAt?: string | null;
  issues?: ScanIssueData[];
  passedRules?: PassedRuleData[];
  incompleteRules?: IncompleteRuleData[];
  pages?: ScanPageData[];
  progress?: { pagesScanned: number; pagesTotal: number };
}

interface Props {
  scan: ScanData;
  t: DashboardMessages;
}

export function ScanResults({ scan, t }: Props) {
  const issues = scan.issues ?? [];
  const passedRules = scan.passedRules ?? [];
  const incompleteRules = scan.incompleteRules ?? [];
  const pages = scan.pages ?? [];

  return (
    <div className="space-y-4">
      <ReportHeader scan={scan} t={t} />
      {pages.length > 1 && <ReportPages pages={pages} t={t} />}
      <ReportPrinciples issues={issues} passedRules={passedRules} t={t} />
      <ReportViolations issues={issues} t={t} />
      {incompleteRules.length > 0 && (
        <ReportIncomplete incompleteRules={incompleteRules} t={t} />
      )}
      {passedRules.length > 0 && (
        <ReportPassedRules passedRules={passedRules} t={t} />
      )}
    </div>
  );
}
