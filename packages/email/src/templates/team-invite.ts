import { baseTemplate, escapeHtml } from "./base.js";
import { APP_URL } from "../client.js";

export function teamInviteTemplate(
  inviterName: string,
  teamName: string,
  role: string,
  inviteToken: string
): string {
  const acceptUrl = `${APP_URL}/invites/${inviteToken}`;
  const safeInviter = escapeHtml(inviterName);
  const safeTeam = escapeHtml(teamName);
  const safeRole = escapeHtml(role);
  return baseTemplate(
    `
    <h2>You've been invited to join a team</h2>
    <p><strong>${safeInviter}</strong> has invited you to join the <strong>${safeTeam}</strong> team on Inculva as a <strong>${safeRole}</strong>.</p>
    <p>Accept the invitation to start collaborating on accessibility widgets together.</p>
    <a href="${acceptUrl}" class="btn">Accept Invitation →</a>
    <hr class="divider">
    <p class="small">This invitation expires in <strong>7 days</strong>.<br>
    If you don't have an Inculva account yet, you'll be asked to create one first.<br>
    Not expecting this? You can safely ignore this email.</p>
    `,
    `${safeInviter} invited you to join ${safeTeam} on Inculva`
  );
}
