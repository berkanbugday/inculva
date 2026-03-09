import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

async function createSite(formData: FormData): Promise<void> {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const name = formData.get("name") as string;
  const domain = formData.get("domain") as string;

  if (!name?.trim() || !domain?.trim()) return;
  if (name.trim().length > 100 || domain.trim().length > 253) return;

  const normalizedDomain = domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .toLowerCase();

  // Atomically enforce plan site limit and create — prevents concurrent bypasses
  let siteId: string | null = null;
  let errorMsg: string | null = null;

  try {
    const site = await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
      });
      const plan = (user?.plan ?? "free") as Plan;
      const limits = PLAN_LIMITS[plan];

      if (limits.sites !== Infinity) {
        const siteCount = await tx.site.count({ where: { ownerId: session.user.id } });
        if (siteCount >= limits.sites) {
          throw new Error(
            `Your ${plan} plan allows up to ${limits.sites} site${limits.sites === 1 ? "" : "s"}. Upgrade to add more.`
          );
        }
      }

      return tx.site.create({
        data: {
          name: name.trim(),
          domain: normalizedDomain,
          ownerId: session.user.id,
          widgetConfig: {
            create: {
              position: "bottom-right",
              theme: "auto",
              primaryColor: "#0066cc",
              language: "en",
            },
          },
        },
      });
    });
    siteId = site.id;
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Plan limit reached";
  }

  if (errorMsg) {
    redirect(`/dashboard/sites/new?error=${encodeURIComponent(errorMsg)}`);
  }
  if (siteId) {
    redirect(`/dashboard/sites/${siteId}`);
  }
}

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewSitePage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600">Dashboard</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">Add New Site</span>
      </nav>

      {error && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-amber-500 text-lg">⚠</span>
          <div>
            <p className="text-sm font-medium text-amber-800">{decodeURIComponent(error)}</p>
            <a href="/dashboard/settings/billing" className="text-sm text-amber-700 hover:underline font-medium mt-1 inline-block">
              View upgrade options →
            </a>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Add a new site</h2>
        <p className="text-gray-500 text-sm mb-8">
          Connect your website to get your accessibility widget embed code.
        </p>

        <form action={createSite} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Site name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="My Company Website"
            />
          </div>

          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Domain
            </label>
            <input
              id="domain"
              name="domain"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="example.com"
            />
            <p className="text-xs text-gray-400 mt-1">
              Without protocol — e.g. <code>example.com</code> or <code>app.example.com</code>
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Create site
            </button>
            <a
              href="/dashboard"
              className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
