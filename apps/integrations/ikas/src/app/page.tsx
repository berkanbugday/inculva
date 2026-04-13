import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { getSession } from "@/lib/session";

interface Props {
  searchParams: Promise<{ error?: string; store?: string }>;
}

export default async function InstallPage({ searchParams }: Props) {
  const { error, store } = await searchParams;

  const session = await getSession();
  if (session.siteId) {
    redirect("/dashboard");
  }

  const oauthUrl = store
    ? `https://${store}.myikas.com/api/admin/oauth/authorize?client_id=${env.ikasClientId}&redirect_uri=${encodeURIComponent(`${env.deployUrl}/api/auth/callback`)}&response_type=code&store=${store}`
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          inculva accessibility widget
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Add an accessibility widget to your ikas store in one click.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error === "missing_params" && "Missing authorization parameters."}
            {error === "no_storefront" && "No storefront found for this store."}
            {error === "auth_failed" && "Authentication failed. Please try again."}
          </div>
        )}

        {oauthUrl ? (
          <a
            href={oauthUrl}
            className="block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Install widget
          </a>
        ) : (
          <p className="text-sm text-gray-400">
            This page is accessed from the ikas App Store during installation.
          </p>
        )}
      </div>
    </main>
  );
}
