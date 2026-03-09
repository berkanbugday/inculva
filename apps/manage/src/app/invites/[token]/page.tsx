import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ token: string }>;
}

async function acceptInvite(token: string): Promise<void> {
  "use server";

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/login?callbackUrl=/invites/${token}`);

  const invite = await db.teamInvite.findUnique({
    where: { token },
    include: { team: true },
  });

  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    redirect("/dashboard?error=This invitation is invalid or expired.");
  }

  // Check if user email matches invite email
  if (invite.email !== session.user.email) {
    redirect("/dashboard?error=This invitation was sent to a different email address.");
  }

  const alreadyMember = await db.teamMember.findUnique({
    where: { teamId_userId: { teamId: invite.teamId, userId: session.user.id } },
  });

  if (!alreadyMember) {
    await db.$transaction([
      db.teamMember.create({
        data: { teamId: invite.teamId, userId: session.user.id, role: invite.role },
      }),
      db.teamInvite.update({
        where: { id: invite.id },
        data: { acceptedAt: new Date() },
      }),
    ]);
  }

  redirect(`/dashboard/teams/${invite.teamId}`);
}

export default async function AcceptInvitePage({ params }: Props) {
  const { token } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const invite = await db.teamInvite.findUnique({
    where: { token },
    include: { team: true },
  });

  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invitation expired</h1>
          <p className="text-gray-500 text-sm mb-6">
            This invitation link is invalid or has already been used.
          </p>
          <a href="/dashboard" className="text-blue-600 hover:underline text-sm">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const acceptWithToken = acceptInvite.bind(null, token);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🤝</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">You've been invited</h1>
          <p className="text-gray-500 text-sm mt-2">
            Join <strong className="text-gray-900">{invite.team.name}</strong> as a{" "}
            <strong className="text-gray-900">{invite.role}</strong>.
          </p>
        </div>

        {!session ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center">
              Sign in or create an account to accept this invitation.
            </p>
            <a
              href={`/login?callbackUrl=/invites/${token}`}
              className="block w-full py-2.5 text-center bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign in to accept
            </a>
            <a
              href={`/register?callbackUrl=/invites/${token}`}
              className="block w-full py-2.5 text-center bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Create an account
            </a>
          </div>
        ) : (
          <form action={acceptWithToken}>
            <p className="text-sm text-gray-500 text-center mb-4">
              Accepting as <strong>{session.user.email}</strong>
            </p>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Accept invitation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
