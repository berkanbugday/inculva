import { NextRequest, NextResponse } from "next/server";
import { db } from "@inculva/db";
import { exchangeCodeForToken, getStorefronts, registerWidgetScript } from "@/lib/ikas-client";
import { encrypt } from "@/lib/crypto";
import { getSession } from "@/lib/session";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const storeName = searchParams.get("store");

  if (!code || !storeName) {
    return NextResponse.redirect(`${env.deployUrl}?error=missing_params`);
  }

  try {
    const tokenData = await exchangeCodeForToken(code, storeName);

    const storefronts = await getStorefronts(tokenData.access_token);
    const storefront = storefronts[0];
    if (!storefront) {
      return NextResponse.redirect(`${env.deployUrl}?error=no_storefront`);
    }

    const existing = await db.ikasStore.findUnique({
      where: { ikasStoreId: storeName },
    });

    let siteId: string;

    if (existing && !existing.uninstalledAt) {
      await db.ikasStore.update({
        where: { id: existing.id },
        data: {
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
        },
      });
      siteId = existing.siteId;
    } else if (existing && existing.uninstalledAt) {
      await db.ikasStore.update({
        where: { id: existing.id },
        data: {
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
          uninstalledAt: null,
          installedAt: new Date(),
        },
      });
      siteId = existing.siteId;
    } else {
      const domain = `${storeName}.myikas.com`;

      const existingSite = await db.site.findUnique({
        where: { domain },
      });

      if (existingSite) {
        siteId = existingSite.id;
      } else {
        const site = await db.site.create({
          data: {
            name: storeName,
            domain,
            ownerId: await getOrCreateIkasOwner(),
            widgetConfig: {
              create: {
                position: "bottom-right",
                theme: "auto",
                primaryColor: "#0066cc",
                language: "tr",
              },
            },
          },
        });
        siteId = site.id;
      }

      await db.ikasStore.create({
        data: {
          siteId,
          ikasStoreId: storeName,
          ikasStoreName: storeName,
          accessToken: encrypt(tokenData.access_token),
          storefrontId: storefront.id,
        },
      });
    }

    const ikasStore = await db.ikasStore.findUnique({
      where: { siteId },
    });

    if (ikasStore && !ikasStore.scriptId) {
      const scriptId = await registerWidgetScript(
        tokenData.access_token,
        storefront.id,
        siteId,
      );
      if (scriptId) {
        await db.ikasStore.update({
          where: { id: ikasStore.id },
          data: { scriptId },
        });
      }
    }

    const session = await getSession();
    session.ikasStoreId = storeName;
    session.ikasStoreName = storeName;
    session.siteId = siteId;
    session.accessToken = tokenData.access_token;
    await session.save();

    return NextResponse.redirect(`${env.deployUrl}/dashboard`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(`${env.deployUrl}?error=auth_failed`);
  }
}

async function getOrCreateIkasOwner(): Promise<string> {
  const email = "ikas-integration@inculva.com";
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return existing.id;

  const user = await db.user.create({
    data: {
      email,
      name: "ikas integration",
      emailVerified: true,
      role: "admin",
    },
  });
  return user.id;
}
