import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { signJWT } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import { detectLocale } from "@/lib/locale";
import {
  getMerchantInfo,
  getStorefronts,
  getStorefrontDomain,
  registerWidgetScript,
} from "@/lib/ikas-client";

/**
 * Exchange an ikas AppBridge token for our JWT.
 *
 * If the store doesn't exist yet, auto-provisions everything
 * (system user, site, widget config, ikas store, script injection).
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

  const merchantId = merchant.id;
  const storeName = merchant.storeName;

  let ikasStore = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: merchantId },
  });

  // ── Auto-provision if store doesn't exist or was uninstalled ────────
  if (!ikasStore || ikasStore.uninstalledAt) {
    try {
      // Fetch storefronts for domain + storefrontId
      let storefronts: Awaited<ReturnType<typeof getStorefronts>> = [];
      try {
        storefronts = await getStorefronts(accessToken);
      } catch {
        // Continue without storefronts
      }

      const storefront = storefronts[0];
      const domain = storefront
        ? getStorefrontDomain(storefront, storeName)
        : `${storeName}.myikas.com`;
      const locale = await detectLocale();
      const systemEmail = `${storeName}@ikas.inculva.com`;

      // Create system user
      const user = await prisma.user.upsert({
        where: { email: systemEmail },
        create: {
          email: systemEmail,
          name: storeName,
          role: "user",
          emailVerified: true,
        },
        update: {},
      });

      // Create site
      const site = await prisma.site.upsert({
        where: { domain },
        create: { name: storeName, domain, ownerId: user.id },
        update: { ownerId: user.id },
      });

      // Create widget config
      await prisma.widgetConfig.upsert({
        where: { siteId: site.id },
        create: {
          siteId: site.id,
          position: "bottom-right",
          primaryColor: "#0066cc",
          language: locale,
          buttonSize: "medium",
        },
        update: {},
      });

      // Inject widget script
      let scriptId: string | null = null;
      if (storefront) {
        try {
          scriptId = await registerWidgetScript(
            accessToken,
            storefront.id,
            site.id,
          );
        } catch (err) {
          console.error("[exchange] script injection failed:", err);
        }
      }

      if (ikasStore) {
        // Reinstall — clear uninstalledAt, update tokens
        await prisma.ikasStore.update({
          where: { id: ikasStore.id },
          data: {
            accessToken: encrypt(accessToken),
            tokenExpiresAt: new Date(Date.now() + 14400 * 1000),
            uninstalledAt: null,
            storefrontId: storefront?.id ?? ikasStore.storefrontId,
            ...(scriptId ? { scriptId } : {}),
          },
        });
      } else {
        // First install
        ikasStore = await prisma.ikasStore.create({
          data: {
            siteId: site.id,
            ikasStoreId: merchantId,
            ikasStoreName: storeName,
            accessToken: encrypt(accessToken),
            refreshToken: null,
            tokenExpiresAt: new Date(Date.now() + 14400 * 1000),
            storefrontId: storefront?.id ?? "",
            scriptId,
          },
        });
      }

      const jwt = await signJWT({
        storeId: ikasStore.id,
        siteId: site.id,
      });
      return NextResponse.json({ token: jwt });
    } catch (err) {
      console.error("[exchange] auto-provision failed:", err);
      return NextResponse.json({ error: "provision_failed" }, { status: 500 });
    }
  }

  // ── Existing store — update token and return JWT ────────────────────
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
        const scriptId = await registerWidgetScript(
          accessToken,
          storefrontId,
          ikasStore.siteId,
        );
        if (scriptId) {
          updateData.scriptId = scriptId;
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

  return NextResponse.json({ token: jwt });
}
