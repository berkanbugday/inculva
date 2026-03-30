"use client";

import { useState } from "react";
import type { DashboardMessages } from "@/i18n/messages";

interface Props {
  ruleCount: number;
  wcagLevel: string;
  t: DashboardMessages;
}

export function ReportMethodology({ ruleCount, wcagLevel, t }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" aria-expanded={open}>
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.scanner.methodology}</span>
        <svg className={`ml-auto shrink-0 w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {t.scanner.methodologyDesc
              .replace("{ruleCount}", String(ruleCount))
              .replace("{level}", wcagLevel)}
          </p>
        </div>
      )}
    </div>
  );
}
