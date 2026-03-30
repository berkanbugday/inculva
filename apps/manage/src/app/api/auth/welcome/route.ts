import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sendEmail, welcomeTemplate, detectLocale } from "@inculva/email";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const locale = detectLocale(request);
  const { html, subject } = welcomeTemplate(session.user.name ?? "", locale);
  void sendEmail({
    to: session.user.email,
    subject,
    html,
  }).catch((err) => console.error("[email] Welcome failed:", err));

  return NextResponse.json({ ok: true });
}
