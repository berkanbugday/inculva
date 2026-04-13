import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { decrypt } from "@/lib/crypto";
import { removeWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      store?: string;
      topic?: string;
    };

    const storeName = body.store;
    if (!storeName) {
      return NextResponse.json({ error: "Missing store" }, { status: 400 });
    }

    const ikasStore = await db.ikasStore.findUnique({
      where: { ikasStoreId: storeName },
    });

    if (!ikasStore) {
      return NextResponse.json({ ok: true });
    }

    if (ikasStore.scriptId) {
      try {
        const token = decrypt(ikasStore.accessToken);
        await removeWidgetScript(token, ikasStore.scriptId);
      } catch {
        // Token may be revoked — continue with soft delete
      }
    }

    await db.ikasStore.update({
      where: { id: ikasStore.id },
      data: {
        uninstalledAt: new Date(),
        scriptId: null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Uninstall webhook error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }
}
