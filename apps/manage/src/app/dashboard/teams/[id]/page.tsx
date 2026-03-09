import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { TeamMembersPanel } from "./team-members-panel";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const team = await db.team.findFirst({
    where: {
      id,
      members: { some: { userId: session!.user.id } },
    },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
        orderBy: { joinedAt: "asc" },
      },
      invites: {
        where: { acceptedAt: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!team) notFound();

  const isAdmin =
    team.ownerId === session!.user.id ||
    team.members.find((m) => m.userId === session!.user.id)?.role === "admin";

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-sm">
        <a href="/dashboard" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Dashboard</a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <a href="/dashboard/teams" className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400">Teams</a>
        <span className="text-gray-300 dark:text-gray-700">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{team.name}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{team.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {team.members.length} member{team.members.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <TeamMembersPanel
        teamId={team.id}
        members={team.members.map((m) => ({
          id: m.id,
          userId: m.userId,
          name: m.user.name,
          email: m.user.email,
          role: m.role,
          joinedAt: m.joinedAt,
        }))}
        pendingInvites={team.invites.map((inv) => ({
          id: inv.id,
          email: inv.email,
          role: inv.role,
          expiresAt: inv.expiresAt,
        }))}
        isAdmin={isAdmin ?? false}
        ownerId={team.ownerId}
        currentUserId={session!.user.id}
      />
    </main>
  );
}
