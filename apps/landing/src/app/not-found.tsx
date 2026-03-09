export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <circle cx="12" cy="5" r="2.5"/>
            <path d="M12 9c-1.1 0-2 .9-2 2v4H7.5l-1.5 4h2l1-2.5H10v3h4v-3h1l1 2.5h2l-1.5-4H14V11c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">404</h1>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Page not found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Back to home
          </a>
          <a
            href="/pricing"
            className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
          >
            See pricing
          </a>
        </div>
      </div>
    </div>
  );
}
