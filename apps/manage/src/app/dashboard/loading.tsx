function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-1/2 mb-4" />
      <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded-full w-16 mt-4" />
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-4">
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-12" />
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-14" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6 animate-pulse">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
          >
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2" />
            <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded w-16 mt-1" />
          </div>
        ))}
      </div>

      {/* Section header skeleton */}
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded w-28" />
        <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg w-20" />
      </div>

      {/* Site card skeletons */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  );
}
