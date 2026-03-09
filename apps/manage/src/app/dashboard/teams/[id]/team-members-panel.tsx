"use client";

import { useState } from "react";
import { cn } from "@inculva/ui";

type Member = {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  role: string;
  joinedAt: Date;
};

type PendingInvite = {
  id: string;
  email: string;
  role: string;
  expiresAt: Date;
};

interface Props {
  teamId: string;
  members: Member[];
  pendingInvites: PendingInvite[];
  isAdmin: boolean;
  ownerId: string;
  currentUserId: string;
}

export function TeamMembersPanel({
  teamId,
  members: initialMembers,
  pendingInvites: initialInvites,
  isAdmin,
  ownerId,
  currentUserId,
}: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [invites, setInvites] = useState(initialInvites);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setInviteError(null);
    setInviteSent(false);

    const res = await fetch(`/api/teams/${teamId}/invites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });

    const data = (await res.json()) as {
      success?: boolean;
      error?: string;
      data?: PendingInvite;
    };

    if (!res.ok || !data.success) {
      setInviteError(data.error ?? "Failed to send invite");
    } else {
      setInviteSent(true);
      setInviteEmail("");
      if (data.data) setInvites((prev) => [data.data!, ...prev]);
    }
    setInviting(false);
  }

  async function handleRemoveMember(memberId: string) {
    setRemoving(memberId);
    await fetch(`/api/teams/${teamId}/members/${memberId}`, { method: "DELETE" });
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    setRemoving(null);
  }

  async function handleLeaveTeam() {
    if (!confirm("Are you sure you want to leave this team?")) return;
    setLeaving(true);
    const res = await fetch(`/api/teams/${teamId}/leave`, { method: "DELETE" });
    if (res.ok) {
      window.location.href = "/dashboard/teams";
    } else {
      const data = (await res.json()) as { error?: string };
      alert(data.error ?? "Failed to leave team");
      setLeaving(false);
    }
  }

  async function handleRevokeInvite(inviteId: string) {
    setRevoking(inviteId);
    await fetch(`/api/teams/${teamId}/invites/${inviteId}`, { method: "DELETE" });
    setInvites((prev) => prev.filter((i) => i.id !== inviteId));
    setRevoking(null);
  }

  function initials(name: string | null, email: string): string {
    return (name ?? email).split(/\s|@/)[0]?.[0]?.toUpperCase() ?? "?";
  }

  return (
    <div className="space-y-6">
      {/* Members list */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Members</h3>
        <div className="divide-y divide-gray-100">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between py-3 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {initials(member.name, member.email)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name ?? member.email}</p>
                  {member.name && <p className="text-xs text-gray-400">{member.email}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    member.userId === ownerId
                      ? "bg-purple-100 text-purple-700"
                      : member.role === "admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {member.userId === ownerId ? "Owner" : member.role}
                </span>
                {isAdmin && member.userId !== ownerId && member.userId !== currentUserId && (
                  <button
                    onClick={() => void handleRemoveMember(member.id)}
                    disabled={removing === member.id}
                    className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {removing === member.id ? "Removing…" : "Remove"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave team — shown to non-owner current user */}
      {currentUserId !== ownerId && (
        <div className="bg-white rounded-2xl border border-red-100 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Leave this team</p>
            <p className="text-xs text-gray-500 mt-0.5">You will lose access to all sites and resources shared through this team.</p>
          </div>
          <button
            onClick={() => void handleLeaveTeam()}
            disabled={leaving}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 shrink-0"
          >
            {leaving ? "Leaving…" : "Leave team"}
          </button>
        </div>
      )}

      {/* Invite form */}
      {isAdmin && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Invite a member</h3>
          <p className="text-sm text-gray-500 mb-4">
            They'll receive an email invitation to join this team.
          </p>

          {inviteSent && (
            <p className="text-sm text-green-600 font-medium mb-3">✓ Invitation sent!</p>
          )}
          {inviteError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-3">
              {inviteError}
            </p>
          )}

          <form onSubmit={(e) => void handleInvite(e)} className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as "admin" | "member")}
              className="px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={inviting}
              className={cn(
                "px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shrink-0",
                inviting && "opacity-60 cursor-not-allowed"
              )}
            >
              {inviting ? "Sending…" : "Invite"}
            </button>
          </form>

          {/* Pending invites */}
          {invites.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Pending Invites
              </p>
              <div className="space-y-2">
                {invites.map((invite) => (
                  <div key={invite.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <span className="text-sm text-gray-700">{invite.email}</span>
                      <span className="ml-2 text-xs text-gray-400">({invite.role})</span>
                    </div>
                    <button
                      onClick={() => void handleRevokeInvite(invite.id)}
                      disabled={revoking === invite.id}
                      className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      {revoking === invite.id ? "Revoking…" : "Revoke"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
