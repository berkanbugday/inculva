import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

export default async function TeamsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const [ownedTeams, memberTeams] = await Promise.all([
    db.team.findMany({
      where: { ownerId: session!.user.id },
      include: { _count: { select: { members: true } } },
      orderBy: { createdAt: "asc" },
    }),
    db.teamMember.findMany({
      where: {
        userId: session!.user.id,
        team: { ownerId: { not: session!.user.id } },
      },
      include: {
        team: { include: { _count: { select: { members: true } } } },
      },
      orderBy: { joinedAt: "asc" },
    }),
  ]);

  const hasTeams = ownedTeams.length > 0 || memberTeams.length > 0;

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teams</h2>
        <a
          href="/dashboard/teams/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Create Team
        </a>
      </div>

      {!hasTeams ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">You don't belong to any teams yet.</p>
          <a
            href="/dashboard/teams/new"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Create your first team →
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {ownedTeams.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Your teams
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ownedTeams.map((team) => (
                  <a
                    key={team.id}
                    href={`/dashboard/teams/${team.id}`}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold shrink-0">
                        {team.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{team.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {team._count.members} member{team._count.members !== 1 ? "s" : ""} · Owner
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {memberTeams.length > 0 && (
            <section>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                Member of
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {memberTeams.map(({ team, role }) => (
                  <a
                    key={team.id}
                    href={`/dashboard/teams/${team.id}`}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 flex items-center justify-center text-sm font-bold shrink-0">
                        {team.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">{team.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {team._count.members} member{team._count.members !== 1 ? "s" : ""} · {role === "admin" ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
