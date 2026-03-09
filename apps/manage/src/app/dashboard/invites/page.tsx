import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { InviteActions } from "./invite-actions";

export const metadata = { title: "Team Invitations — Inculva" };

export default async function InvitesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const now = new Date();

  const invites = await db.teamInvite.findMany({
    where: {
      email: { equals: session.user.email, mode: "insensitive" },
      acceptedAt: null,
      expiresAt: { gt: now },
    },
    orderBy: { createdAt: "desc" },
    include: { team: { select: { id: true, name: true, slug: true } } },
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Invitations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pending invitations to join teams on Inculva.
        </p>
      </div>

      {invites.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 px-6 py-16 text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No pending invitations</p>
        </div>
      ) : (
        <div className="space-y-3">
          {invites.map((invite) => (
            <div
              key={invite.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 px-6 py-5 flex items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{invite.team.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="capitalize">{invite.role}</span>
                  <span>·</span>
                  <span>
                    Expires {new Date(invite.expiresAt).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <InviteActions token={invite.token} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
