import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

async function createTeam(formData: FormData): Promise<void> {
  "use server";
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  const plan = (user?.plan ?? "free") as Plan;
  const limits = PLAN_LIMITS[plan];

  if (limits.teamMembers === 0) {
    redirect("/dashboard/teams/new?error=Teams are not available on the Free plan. Upgrade to Pro or Business.");
  }

  const name = (formData.get("name") as string)?.trim();
  if (!name) return;

  // Generate slug from name
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let slug = baseSlug;
  let suffix = 1;
  while (await db.team.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const team = await db.team.create({
    data: {
      name,
      slug,
      ownerId: session.user.id,
      members: {
        create: { userId: session.user.id, role: "admin" },
      },
    },
  });

  redirect(`/dashboard/teams/${team.id}`);
}

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewTeamPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="max-w-xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm mb-8">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600">Dashboard</a>
        <span className="text-gray-300">/</span>
        <a href="/dashboard/teams" className="text-gray-400 hover:text-gray-600">Teams</a>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium">New Team</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create a team</h2>
        <p className="text-sm text-gray-500 mb-6">
          Invite colleagues to collaborate on your accessibility widgets.
        </p>

        {error && (
          <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            {decodeURIComponent(error)}{" "}
            <a href="/dashboard/settings/billing" className="font-medium hover:underline">Upgrade →</a>
          </div>
        )}

        <form action={createTeam} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Team name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Acme Agency"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Create team
            </button>
            <a href="/dashboard/teams" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
