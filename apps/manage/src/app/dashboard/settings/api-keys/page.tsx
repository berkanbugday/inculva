import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ApiKeysManager } from "../api-keys-manager";

export default async function ApiKeysPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id, revokedAt: null },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">API Keys</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your API keys for programmatic access.</p>
      </div>
      <ApiKeysManager initialKeys={apiKeys} />
    </main>
  );
}
