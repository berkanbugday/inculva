import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { verifyAuth } from "@/lib/auth";
import {
  getValidToken,
  getStorefronts,
  registerWidgetScript,
} from "@/lib/ikas-client";

const ALLOWED_CONFIG_FIELDS = [
  "position",
  "primaryColor",
  "language",
  "buttonSize",
] as const;

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const config = await prisma.widgetConfig.findUnique({
    where: { siteId: auth.siteId },
    select: {
      position: true,
      primaryColor: true,
      language: true,
      buttonSize: true,
    },
  });

  if (!config) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Also return domain and script status
  const [site, ikasStore] = await Promise.all([
    prisma.site.findUnique({
      where: { id: auth.siteId },
      select: { domain: true },
    }),
    prisma.ikasStore.findUnique({
      where: { id: auth.storeId },
      select: { scriptId: true },
    }),
  ]);

  return NextResponse.json({
    ...config,
    domain: site?.domain ?? "",
    scriptInstalled: !!ikasStore?.scriptId,
  });
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();

  // Update widget config fields
  const configData: Record<string, unknown> = {};
  for (const field of ALLOWED_CONFIG_FIELDS) {
    if (field in body) {
      configData[field] = body[field];
    }
  }

  if (Object.keys(configData).length > 0) {
    await prisma.widgetConfig.update({
      where: { siteId: auth.siteId },
      data: configData,
    });
  }

  // Update domain if provided
  if (typeof body.domain === "string" && body.domain.trim()) {
    const cleanDomain = body.domain
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "");

    // Check if domain is already taken by another site
    const existing = await prisma.site.findUnique({
      where: { domain: cleanDomain },
    });

    if (existing && existing.id !== auth.siteId) {
      return NextResponse.json({ error: "domain_taken" }, { status: 409 });
    }

    if (!existing || existing.id === auth.siteId) {
      await prisma.site.update({
        where: { id: auth.siteId },
        data: { domain: cleanDomain },
      });
    }
  }

  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (auth instanceof NextResponse) return auth;

  const ikasStore = await prisma.ikasStore.findUnique({
    where: { id: auth.storeId },
  });

  if (!ikasStore) {
    return NextResponse.json({ error: "store_not_found" }, { status: 404 });
  }

  if (ikasStore.scriptId) {
    return NextResponse.json({ success: true, scriptId: ikasStore.scriptId });
  }

  let accessToken: string;
  try {
    accessToken = await getValidToken(ikasStore);
  } catch {
    return NextResponse.json({ error: "token_expired" }, { status: 401 });
  }

  let storefrontId = ikasStore.storefrontId;
  if (!storefrontId) {
    try {
      const storefronts = await getStorefronts(accessToken);
      if (storefronts.length > 0) {
        storefrontId = storefronts[0]!.id;
      }
    } catch {
      // Continue
    }
  }

  if (!storefrontId) {
    return NextResponse.json({ error: "no_storefront" }, { status: 400 });
  }

  try {
    const scriptId = await registerWidgetScript(
      accessToken,
      storefrontId,
      ikasStore.siteId,
    );

    if (!scriptId) {
      return NextResponse.json(
        { error: "injection_failed" },
        { status: 500 },
      );
    }

    await prisma.ikasStore.update({
      where: { id: ikasStore.id },
      data: { scriptId, storefrontId },
    });

    return NextResponse.json({ success: true, scriptId });
  } catch {
    return NextResponse.json(
      { error: "injection_failed" },
      { status: 500 },
    );
  }
}
