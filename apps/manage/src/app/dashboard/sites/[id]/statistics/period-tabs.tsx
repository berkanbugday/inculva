"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "7d", value: "7" },
  { label: "14d", value: "14" },
  { label: "30d", value: "30" },
  { label: "90d", value: "90" },
];

interface Props {
  siteId: string;
  current: number;
}

export function PeriodTabs({ siteId, current }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function select(days: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", days);
    router.push(`/dashboard/sites/${siteId}/statistics?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 bg-white dark:bg-[#1a1a2e] rounded-full p-1.5 shadow-sm border border-[#e8eaf0] dark:border-[#2a2a3e]">
      {OPTIONS.map((opt) => {
        const active = current === Number(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => select(opt.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
