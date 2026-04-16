import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { decrypt } from "@/lib/crypto";
import { removeWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    console.error("[uninstall] failed to parse body");
    return NextResponse.json({ ok: true });
  }

  console.log("[uninstall] received body:", JSON.stringify(body));

  const storeName =
    (body.store as string) ??
    (body.storeName as string) ??
    (body.merchantId as string) ??
    (body.name as string) ??
    "";

  if (!storeName) {
    console.error("[uninstall] no store name found in body");
    return NextResponse.json({ ok: true });
  }

  console.log("[uninstall] processing uninstall for:", storeName);

  const ikasStore = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: storeName },
    include: { site: true },
  });

  if (!ikasStore) {
    console.log("[uninstall] store not found:", storeName);
    return NextResponse.json({ ok: true });
  }

  console.log("[uninstall] found store:", ikasStore.id, "scriptId:", ikasStore.scriptId);

  // Remove widget script (token may still be valid briefly after uninstall)
  if (ikasStore.scriptId) {
    try {
      const token = decrypt(ikasStore.accessToken);
      const removed = await removeWidgetScript(token, ikasStore.scriptId);
      console.log("[uninstall] script removal:", removed ? "success" : "failed", ikasStore.scriptId);
    } catch (err) {
      console.log("[uninstall] script removal error:", err);
    }
  }

  // Hard-delete all records
  const siteId = ikasStore.siteId;
  const ownerId = ikasStore.site.ownerId;

  try {
    await prisma.ikasStore.delete({ where: { id: ikasStore.id } });
    await prisma.widgetConfig.deleteMany({ where: { siteId } });
    await prisma.site.delete({ where: { id: siteId } });

    const remainingSites = await prisma.site.count({
      where: { ownerId },
    });
    if (remainingSites === 0) {
      await prisma.account.deleteMany({ where: { userId: ownerId } });
      await prisma.user.delete({ where: { id: ownerId } });
    }

    console.log("[uninstall] all records deleted for:", storeName);
  } catch (err) {
    console.error("[uninstall] deletion failed:", err);
  }

  return NextResponse.json({ ok: true });
}
