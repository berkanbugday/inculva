import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { getValidToken, removeWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  let body: { store?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const storeName = body.store;
  if (!storeName) {
    return NextResponse.json({ ok: true });
  }

  const ikasStore = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: storeName },
  });

  if (!ikasStore) {
    return NextResponse.json({ ok: true });
  }

  // Try to remove widget script
  if (ikasStore.scriptId) {
    try {
      const token = await getValidToken(ikasStore);
      await removeWidgetScript(token, ikasStore.scriptId);
    } catch {
      // Token likely revoked — continue with soft delete
    }
  }

  // Soft delete
  await prisma.ikasStore.update({
    where: { id: ikasStore.id },
    data: {
      uninstalledAt: new Date(),
      scriptId: null,
    },
  });

  return NextResponse.json({ ok: true });
}
