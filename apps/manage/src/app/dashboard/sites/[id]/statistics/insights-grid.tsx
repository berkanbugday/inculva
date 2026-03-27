interface FeatureStat {
  feature: string;
  label: string;
  count: number;
}

interface ProfileStat {
  key: string;
  label: string;
  count: number;
}

interface InsightsGridProps {
  featureStats: FeatureStat[];
  profileStats: ProfileStat[];
  labels: {
    featureUsage: string;
    profileUsage: string;
  };
}

export function InsightsGrid({
  featureStats,
  profileStats,
  labels,
}: InsightsGridProps) {
  const hasFeatures = featureStats.length > 0;
  const hasProfiles = profileStats.length > 0;

  if (!hasFeatures && !hasProfiles) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {hasFeatures && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {labels.featureUsage}
          </h3>
          <div className="divide-y divide-[#e8eaf0] dark:divide-[#2a2a3e] max-h-[480px] overflow-y-auto pr-3 scrollbar-thin">
            {featureStats.map((f) => (
              <div key={f.feature} className="flex items-center justify-between py-2.5">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {f.label}
                </p>
                <span className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                  {f.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasProfiles && (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {labels.profileUsage}
          </h3>
          <div className="divide-y divide-[#e8eaf0] dark:divide-[#2a2a3e]">
            {profileStats.map((profile) => (
              <div key={profile.key} className="flex items-center justify-between py-2.5">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {profile.label}
                </p>
                <span className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
                  {profile.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
