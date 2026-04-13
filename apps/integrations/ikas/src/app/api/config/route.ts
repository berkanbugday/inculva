import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.siteId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await db.widgetConfig.findUnique({
    where: { siteId: session.siteId },
  });

  if (!config) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session.siteId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const VALID_POSITIONS = new Set(["bottom-right", "bottom-left", "top-right", "top-left"]);
  const VALID_BUTTON_SIZES = new Set(["small", "medium", "large"]);
  const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

  if (body.position !== undefined && !VALID_POSITIONS.has(body.position)) {
    return NextResponse.json({ error: "Invalid position" }, { status: 400 });
  }
  if (body.primaryColor !== undefined && !HEX_COLOR_RE.test(body.primaryColor)) {
    return NextResponse.json({ error: "Invalid color" }, { status: 400 });
  }
  if (body.buttonSize !== undefined && !VALID_BUTTON_SIZES.has(body.buttonSize)) {
    return NextResponse.json({ error: "Invalid button size" }, { status: 400 });
  }

  await db.widgetConfig.update({
    where: { siteId: session.siteId },
    data: body,
  });

  return NextResponse.json({ success: true });
}
