import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { WebhooksManager } from "../webhooks-manager";

export default async function WebhooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const webhooks = await db.webhook.findMany({
    where: { userId: session.user.id },
    select: { id: true, url: true, events: true, enabled: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Webhooks</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive real-time notifications for events in your account.</p>
      </div>
      <WebhooksManager initialWebhooks={webhooks.map((w) => ({ ...w, createdAt: w.createdAt.toISOString() }))} />
    </main>
  );
}
