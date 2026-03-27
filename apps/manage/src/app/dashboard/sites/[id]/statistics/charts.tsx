"use client";

interface DailyPoint {
  date: string;
  count: number;
}

interface FeatureStat {
  feature: string;
  label: string;
  count: number;
}

interface TrendChartProps {
  data: DailyPoint[];
  locale?: string;
}

interface FeatureChartProps {
  data: FeatureStat[];
}

export function TrendChart({ data, locale }: TrendChartProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.count), 1);
  const width = 800;
  const height = 160;
  const padX = 8;
  const padY = 12;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * innerW;
    const y = padY + innerH - (d.count / max) * innerH;
    return `${x},${y}`;
  });

  const areaPoints = [
    `${padX},${padY + innerH}`,
    ...points,
    `${padX + innerW},${padY + innerH}`,
  ].join(" ");

  const labelIndices = [0, Math.floor(data.length / 2), data.length - 1];
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: padY + innerH - ratio * innerH,
    label: Math.round(max * ratio),
  }));

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minHeight: 100 }}
        aria-label="Daily event trend chart"
        role="img"
      >
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map(({ y }) => (
          <line
            key={y}
            x1={padX}
            y1={y}
            x2={padX + innerW}
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}

        <polygon points={areaPoints} fill="url(#trendGrad)" />

        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((d, i) => {
          if (d.count === 0) return null;
          const x = padX + (i / (data.length - 1)) * innerW;
          const y = padY + innerH - (d.count / max) * innerH;
          return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />;
        })}

        {labelIndices.map((i) => {
          const d = data[i];
          if (!d) return null;
          const x = padX + (i / (data.length - 1)) * innerW;
          const label = new Date(d.date).toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
          });
          return (
            <text
              key={i}
              x={x}
              y={height - 1}
              textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
              fontSize="10"
              fill="currentColor"
              opacity="0.45"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function FeatureBarChart({ data }: FeatureChartProps) {
  if (data.length === 0) return null;
  const max = data[0]?.count ?? 1;

  return (
    <div className="space-y-3">
      {data.map(({ feature, label, count }) => (
        <div key={feature} className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 w-36 shrink-0 truncate">
            {label}
          </span>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10 text-right tabular-nums">
            {count.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
