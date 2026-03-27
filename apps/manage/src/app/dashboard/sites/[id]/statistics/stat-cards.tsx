interface StatCardsProps {
  widgetLoads: number;
  openCount: number;
  totalActivations: number;
  labels: {
    widgetLoads: string;
    widgetOpens: string;
    featureActivations: string;
  };
}

const COLOR_MAP: Record<string, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  gray: "text-gray-900 dark:text-white",
};

export function StatCards({
  widgetLoads,
  openCount,
  totalActivations,
  labels,
}: StatCardsProps) {
  const cards = [
    { label: labels.widgetLoads, value: widgetLoads.toLocaleString(), color: "blue" },
    { label: labels.widgetOpens, value: openCount.toLocaleString(), color: "purple" },
    { label: labels.featureActivations, value: totalActivations.toLocaleString(), color: "gray" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
        >
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className={`text-3xl font-black mt-1 ${COLOR_MAP[color]}`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
