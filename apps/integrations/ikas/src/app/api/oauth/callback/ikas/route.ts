import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { signJWT, signSetupJWT } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import { env } from "@/lib/env";
import {
  validateSignature,
  exchangeCodeForToken,
  getMerchantInfo,
  getStorefronts,
  getStorefrontDomain,
  registerWidgetScript,
  removeWidgetScript,
  type Storefront,
} from "@/lib/ikas-client";

const CLEAR_SESSION_COOKIES = [
  "__Secure-better-auth.session_token=; Max-Age=0; Path=/; Secure; SameSite=None",
  "better-auth.session_token=; Max-Age=0; Path=/",
];

function clearSessionCookies(res: NextResponse) {
  for (const cookie of CLEAR_SESSION_COOKIES) {
    res.headers.append("Set-Cookie", cookie);
  }
  return res;
}

function fail(msg: string) {
  return clearSessionCookies(
    NextResponse.redirect(
      `${env.deployUrl}?error=${encodeURIComponent(msg)}`,
    ),
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const code = searchParams.get("code");
  const signature = searchParams.get("signature");
  const storeName =
    searchParams.get("storeName") ??
    searchParams.get("store") ??
    "";

  if (!code || !storeName) {
    return fail("missing_params");
  }

  // Validate signature if present
  if (signature && !validateSignature(code, signature)) {
    console.error("[callback] invalid signature");
    return fail("invalid_signature");
  }

  // Exchange code for tokens
  let tokens;
  try {
    tokens = await exchangeCodeForToken(code, storeName);
  } catch (err) {
    console.error("[callback] token exchange error:", err);
    return fail("auth_failed");
  }

  const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Get merchant info
  let merchant;
  try {
    merchant = await getMerchantInfo(tokens.access_token);
  } catch (err) {
    console.error("[callback] getMerchant error:", err);
    return fail("auth_failed");
  }

  const merchantId = merchant.id;
  const merchantStoreName = merchant.storeName || storeName;

  // Fetch storefronts
  let storefronts: Storefront[] = [];
  try {
    storefronts = await getStorefronts(tokens.access_token);
  } catch {
    // Continue without storefronts
  }

  const storefront = storefronts[0];
  const domain = storefront
    ? getStorefrontDomain(storefront, merchantStoreName)
    : `${merchantStoreName}.myikas.com`;

  // ── Check for existing store ─────────────────────────────────────────
  const existing = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: merchantId },
    include: { site: true },
  });

  // If previously uninstalled, clean up stale records and do fresh install
  if (existing?.uninstalledAt) {
    console.log("[callback] cleaning up stale uninstalled store:", existing.id);
    // Try to delete old script from ikas
    if (existing.scriptId && storefront) {
      try {
        await removeWidgetScript(tokens.access_token, existing.scriptId);
      } catch {
        // Non-fatal
      }
    }
    // Hard-delete stale records
    try {
      const siteId = existing.siteId;
      const ownerId = existing.site.ownerId;
      await prisma.ikasStore.delete({ where: { id: existing.id } });
      await prisma.widgetConfig.deleteMany({ where: { siteId } });
      await prisma.site.delete({ where: { id: siteId } });
      await prisma.account.deleteMany({ where: { userId: ownerId } });
      await prisma.user.delete({ where: { id: ownerId } }).catch(() => {});
    } catch (err) {
      console.error("[callback] stale cleanup failed:", err);
    }
    // Fall through to first install below
  } else if (existing) {
    // ── Active reinstall (store exists, not uninstalled) ─────────────
    const updateData: Record<string, unknown> = {
      accessToken: encrypt(tokens.access_token),
      tokenExpiresAt,
    };
    if (tokens.refresh_token) {
      updateData.refreshToken = encrypt(tokens.refresh_token);
    }
    if (storefront) {
      updateData.storefrontId = storefront.id;
    }

    // Re-register script (delete old + create new)
    if (storefront) {
      try {
        const scriptId = await registerWidgetScript(
          tokens.access_token,
          storefront.id,
          existing.siteId,
          existing.scriptId,
        );
        if (scriptId) updateData.scriptId = scriptId;
      } catch {
        // Non-fatal
      }
    }

    await prisma.ikasStore.update({
      where: { id: existing.id },
      data: updateData,
    });

    const jwt = await signJWT({
      storeId: existing.id,
      siteId: existing.siteId,
    });

    return clearSessionCookies(
      NextResponse.redirect(`${env.deployUrl}/dashboard?token=${jwt}`),
    );
  }

  // ── First install → redirect to setup page ──────────────────────────
  const setupToken = await signSetupJWT({
    purpose: "setup",
    merchantId,
    storeName: merchantStoreName,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? null,
    expiresIn: tokens.expires_in,
    storefrontId: storefront?.id ?? "",
    defaultDomain: domain,
  });

  const setupUrl =
    `${env.deployUrl}/setup?token=${setupToken}` +
    `&domain=${encodeURIComponent(domain)}`;

  return clearSessionCookies(NextResponse.redirect(setupUrl));
}
