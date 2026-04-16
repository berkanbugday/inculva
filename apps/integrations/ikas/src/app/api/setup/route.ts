import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db as prisma } from "@inculva/db";
import { signJWT, verifySetupJWT } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import { detectLocale } from "@/lib/locale";
import { hashPassword } from "@/lib/password";
import { registerWidgetScript } from "@/lib/ikas-client";

export async function POST(request: NextRequest) {
  let body: {
    setupToken?: string;
    email?: string;
    password?: string;
    domain?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { setupToken, email, password, domain } = body;
  if (!setupToken || !email || !password || !domain) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "weak_password" }, { status: 400 });
  }

  const cleanDomain = domain
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  if (!cleanDomain || cleanDomain.includes(" ")) {
    return NextResponse.json({ error: "invalid_domain" }, { status: 400 });
  }

  // Verify setup token
  let setup;
  try {
    setup = await verifySetupJWT(setupToken);
  } catch {
    return NextResponse.json({ error: "expired_token" }, { status: 401 });
  }

  // Check if store already exists
  const existingStore = await prisma.ikasStore.findUnique({
    where: { ikasStoreId: setup.merchantId },
  });
  if (existingStore) {
    return NextResponse.json(
      { error: "already_installed" },
      { status: 409 },
    );
  }

  // Check if email already taken
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const locale = await detectLocale();
  const tokenExpiresAt = new Date(Date.now() + setup.expiresIn * 1000);
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name: setup.storeName,
      role: "user",
      emailVerified: true,
    },
  });

  // Create credential account (compatible with better-auth)
  await prisma.account.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: hashedPassword,
    },
  });

  // Create site
  const site = await prisma.site.upsert({
    where: { domain: cleanDomain },
    create: { name: setup.storeName, domain: cleanDomain, ownerId: user.id },
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
  if (setup.storefrontId) {
    try {
      scriptId = await registerWidgetScript(
        setup.accessToken,
        setup.storefrontId,
        site.id,
      );
      console.log("[setup] script injected:", scriptId);
    } catch (err) {
      console.error("[setup] script injection failed:", err);
    }
  }

  // Create IkasStore
  const ikasStore = await prisma.ikasStore.create({
    data: {
      siteId: site.id,
      ikasStoreId: setup.merchantId,
      ikasStoreName: setup.storeName,
      accessToken: encrypt(setup.accessToken),
      refreshToken: setup.refreshToken
        ? encrypt(setup.refreshToken)
        : null,
      tokenExpiresAt,
      storefrontId: setup.storefrontId,
      scriptId,
    },
  });

  const jwt = await signJWT({ storeId: ikasStore.id, siteId: site.id });

  return NextResponse.json({ token: jwt });
}
