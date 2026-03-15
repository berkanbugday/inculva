"use client";

interface Props {
  label: string;
  description: string;
  wcag?: string;
  enabled: boolean;
  disabled?: boolean;
  comingSoon?: boolean;
  onChange: (value: boolean) => void;
}

export function FeatureToggle({
  label,
  description,
  wcag,
  enabled,
  disabled,
  comingSoon,
  onChange,
}: Props) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-2xl ${disabled ? "opacity-60" : ""}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </span>
          {wcag && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded border border-blue-100 dark:border-blue-900">
              WCAG {wcag}
            </span>
          )}
          {comingSoon && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded border border-amber-100 dark:border-amber-900">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        disabled={disabled || comingSoon}
        onClick={() => onChange(!enabled)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-all cursor-pointer ${
          enabled && !comingSoon
            ? "bg-blue-600"
            : "bg-gray-200 dark:bg-gray-700"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
            enabled && !comingSoon ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
