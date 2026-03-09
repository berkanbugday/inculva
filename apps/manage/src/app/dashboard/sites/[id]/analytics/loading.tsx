function SkeletonStatCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 animate-pulse">
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2" />
      <div className="h-9 bg-gray-100 dark:bg-gray-700 rounded w-16 mt-1" />
    </div>
  );
}

export default function AnalyticsLoading() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16" />
      </div>

      {/* Title skeleton */}
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-2" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-40" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Chart skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-40 mb-5" />
        <div className="space-y-3">
          {[80, 60, 45, 30, 20, 15].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-36" />
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                <div
                  className="bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full"
                  style={{ width: `${w}%` }}
                />
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded w-24" />
              <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded w-32" />
              <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded w-28 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
