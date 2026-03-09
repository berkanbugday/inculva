export const metadata = { title: "Account Suspended — Inculva" };

export default function BannedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Suspended</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your account has been suspended. If you believe this is a mistake, please contact us.
          </p>
        </div>

        <a
          href="mailto:support@inculva.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </a>

        <p className="text-xs text-gray-400 dark:text-gray-600">
          support@inculva.com
        </p>
      </div>
    </div>
  );
}
