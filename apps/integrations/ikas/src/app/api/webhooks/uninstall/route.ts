import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { getValidToken, removeWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    console.error("[uninstall] failed to parse body");
    return NextResponse.json({ ok: true });
  }

  console.log("[uninstall] received body:", JSON.stringify(body));

  // ikas may send store name under different field names
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

  console.log("[uninstall] found store:", ikasStore.id, "siteId:", ikasStore.siteId);

  // Try to remove widget script
  if (ikasStore.scriptId) {
    try {
      const token = await getValidToken(ikasStore);
      await removeWidgetScript(token, ikasStore.scriptId);
      console.log("[uninstall] widget script removed");
    } catch {
      console.log("[uninstall] script removal failed (token likely revoked)");
    }
  }

  const siteId = ikasStore.siteId;
  const ownerId = ikasStore.site.ownerId;

  try {
    await prisma.ikasStore.delete({ where: { id: ikasStore.id } });
    await prisma.widgetConfig.deleteMany({ where: { siteId } });
    await prisma.site.delete({ where: { id: siteId } });

    // Delete the system user if they have no other sites
    const remainingSites = await prisma.site.count({
      where: { ownerId },
    });
    if (remainingSites === 0) {
      await prisma.user.delete({ where: { id: ownerId } });
    }

    console.log("[uninstall] all records deleted for:", storeName);
  } catch (err) {
    console.error("[uninstall] deletion failed:", err);
  }

  return NextResponse.json({ ok: true });
}
