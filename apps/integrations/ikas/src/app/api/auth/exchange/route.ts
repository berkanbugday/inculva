import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { signJWT } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import {
  getMerchantInfo,
  getStorefronts,
  registerWidgetScript,
} from "@/lib/ikas-client";

/**
 * Exchange an ikas AppBridge token for our JWT.
 *
 * Updates the stored access token and auto-injects
 * the widget script if it's missing.
 */
export async function POST(request: NextRequest) {
  let body: { accessToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { accessToken } = body;
  if (!accessToken) {
    return NextResponse.json({ error: "missing_token" }, { status: 400 });
  }

  // Verify token by calling ikas API
  let merchant;
  try {
    merchant = await getMerchantInfo(accessToken);
  } catch {
    return NextResponse.json({ error: "invalid_token" }, { status: 401 });
  }

  const ikasStore = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: merchant.id },
  });

  if (!ikasStore || ikasStore.uninstalledAt) {
    return NextResponse.json({ error: "store_not_found" }, { status: 404 });
  }

  // Update the access token (AppBridge always gives a fresh one)
  const updateData: Record<string, unknown> = {
    accessToken: encrypt(accessToken),
    tokenExpiresAt: new Date(Date.now() + 14400 * 1000),
  };

  // Auto-inject widget script if missing
  if (!ikasStore.scriptId) {
    try {
      let storefrontId = ikasStore.storefrontId;
      if (!storefrontId) {
        const storefronts = await getStorefronts(accessToken);
        if (storefronts.length > 0) {
          storefrontId = storefronts[0]!.id;
          updateData.storefrontId = storefrontId;
        }
      }

      if (storefrontId) {
        console.log("[exchange] injecting widget script for:", merchant.storeName);
        const scriptId = await registerWidgetScript(
          accessToken,
          storefrontId,
          ikasStore.siteId,
        );
        if (scriptId) {
          updateData.scriptId = scriptId;
          console.log("[exchange] script injected:", scriptId);
        }
      }
    } catch (err) {
      console.error("[exchange] script injection failed:", err);
    }
  }

  await prisma.ikasStore.update({
    where: { id: ikasStore.id },
    data: updateData,
  });

  const jwt = await signJWT({
    storeId: ikasStore.id,
    siteId: ikasStore.siteId,
  });

  const res = NextResponse.json({ token: jwt });
  res.headers.append(
    "Set-Cookie",
    "__Secure-better-auth.session_token=; Max-Age=0; Path=/; Secure; SameSite=None",
  );
  res.headers.append(
    "Set-Cookie",
    "better-auth.session_token=; Max-Age=0; Path=/",
  );
  return res;
}
