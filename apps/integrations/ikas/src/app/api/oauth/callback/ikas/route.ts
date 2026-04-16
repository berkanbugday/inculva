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
  type Storefront,
} from "@/lib/ikas-client";

function fail(msg: string) {
  return NextResponse.redirect(
    `${env.deployUrl}?error=${encodeURIComponent(msg)}`,
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

  // ── Reinstall (existing store) ──────────────────────────────────────
  const existing = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: merchantId },
  });

  if (existing) {
    const updateData: Record<string, unknown> = {
      accessToken: encrypt(tokens.access_token),
      tokenExpiresAt,
      uninstalledAt: null,
    };
    if (tokens.refresh_token) {
      updateData.refreshToken = encrypt(tokens.refresh_token);
    }
    if (storefront) {
      updateData.storefrontId = storefront.id;
    }

    // Re-register script if missing
    if (!existing.scriptId && storefront) {
      try {
        const scriptId = await registerWidgetScript(
          tokens.access_token,
          storefront.id,
          existing.siteId,
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

    return NextResponse.redirect(`${env.deployUrl}/dashboard?token=${jwt}`);
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

  return NextResponse.redirect(setupUrl);
}
