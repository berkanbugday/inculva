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
    router.push(`/dashboard/sites/${siteId}/analytics?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {OPTIONS.map((opt) => {
        const active = current === Number(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => select(opt.value)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              active
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
