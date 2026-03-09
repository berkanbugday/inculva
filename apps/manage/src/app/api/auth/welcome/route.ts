import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sendEmail, welcomeTemplate } from "@inculva/email";

export async function POST(): Promise<NextResponse> {
  // Auth required — prevents abuse of Inculva's email sender for spam
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  void sendEmail({
    to: session.user.email,
    subject: "Welcome to Inculva 👋",
    html: welcomeTemplate(session.user.name ?? ""),
  }).catch((err) => console.error("[email] Welcome failed:", err));

  return NextResponse.json({ ok: true });
}
