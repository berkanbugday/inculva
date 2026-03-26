import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@inculva/db";
import { headers } from "next/headers";
import { logAudit } from "@/lib/audit";
import { PLAN_LIMITS } from "@inculva/types";
import type { Plan } from "@inculva/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [site, user] = await Promise.all([
    db.site.findFirst({ where: { id, ownerId: session.user.id } }),
    db.user.findUnique({ where: { id: session.user.id }, select: { plan: true } }),
  ]);

  if (!site) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as {
    position?: string;
    theme?: string;
    primaryColor?: string;
    language?: string;
    accessibilityStatementUrl?: string;
    whiteLabelText?: string;
    allowedDomains?: string[];
    textResizing?: boolean;
    highContrast?: boolean;
    dyslexiaFont?: boolean;
    cursorEnhancement?: boolean;
    keyboardNavigation?: boolean;
    readingGuide?: boolean;
    screenReader?: boolean;
    pauseAnimations?: boolean;
    textSpacing?: boolean;
    highlightLinks?: boolean;
    colorBlindMode?: boolean;
    largeClickTargets?: boolean;
    focusHighlight?: boolean;
    grayscale?: boolean;
    skipNavigation?: boolean;
    muteMedia?: boolean;
    readingMask?: boolean;
    textAlign?: boolean;
    saturation?: boolean;
    // New features
    blueLightFilter?: boolean;
    hideImages?: boolean;
    darkMode?: boolean;
    contentMagnifier?: boolean;
    toolTips?: boolean;
    sustainabilityMode?: boolean;
    slowCursor?: boolean;
    dictionary?: boolean;
    lineHeight?: boolean;
    highlightTitles?: boolean;
    // Accessibility Profiles
    profileAdhd?: boolean;
    profileBlind?: boolean;
    profileLowVision?: boolean;
    profileColorBlind?: boolean;
    profileDyslexia?: boolean;
    profileMotorImpaired?: boolean;
    profileCognitive?: boolean;
    profileSeizure?: boolean;
    profileParkinson?: boolean;
    // Visual customization (Large plan only)
    borderRadius?: number;
    buttonSize?: string;
    fontFamily?: string;
  };

  // Validate enum fields
  const VALID_POSITIONS = new Set(["bottom-right", "bottom-left", "top-right", "top-left"]);
  const VALID_THEMES = new Set(["auto", "light", "dark"]);
  const VALID_BUTTON_SIZES = new Set(["small", "medium", "large"]);
  const VALID_FONT_FAMILIES = new Set(["system", "inter", "roboto", "opensans"]);
  const VALID_LANGUAGES = new Set([
    "en","tr","de","fr","es","pt","it","nl","pl","ru","uk","cs","hu","ro","bg","hr",
    "sk","sl","el","fi","sv","no","da","lt","lv","et","ar","he","fa","zh","ja","ko",
    "th","vi","id","ms","hi","bn","ur","sw",
  ]);
  const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

  if (body.position !== undefined && !VALID_POSITIONS.has(body.position)) {
    return NextResponse.json({ error: "Invalid position" }, { status: 400 });
  }
  if (body.theme !== undefined && !VALID_THEMES.has(body.theme)) {
    return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
  }
  if (body.language !== undefined && !VALID_LANGUAGES.has(body.language)) {
    return NextResponse.json({ error: "Invalid language" }, { status: 400 });
  }
  if (body.primaryColor !== undefined && !HEX_COLOR_RE.test(body.primaryColor)) {
    return NextResponse.json({ error: "Invalid primaryColor — must be a hex color (e.g. #0066cc)" }, { status: 400 });
  }
  if (body.borderRadius !== undefined && (typeof body.borderRadius !== "number" || body.borderRadius < 0 || body.borderRadius > 50)) {
    return NextResponse.json({ error: "Invalid borderRadius — must be 0–50" }, { status: 400 });
  }
  if (body.buttonSize !== undefined && !VALID_BUTTON_SIZES.has(body.buttonSize)) {
    return NextResponse.json({ error: "Invalid buttonSize" }, { status: 400 });
  }
  if (body.fontFamily !== undefined && !VALID_FONT_FAMILIES.has(body.fontFamily)) {
    return NextResponse.json({ error: "Invalid fontFamily" }, { status: 400 });
  }

  // Sanitize allowedDomains — strip protocols/paths, keep hostname only
  // null = explicit clear (remove all domains), undefined = not sent (leave unchanged)
  const HOSTNAME_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/;
  let sanitizedDomains: string[] | undefined;
  if (body.allowedDomains === null) {
    sanitizedDomains = []; // explicit clear
  } else if (Array.isArray(body.allowedDomains)) {
    sanitizedDomains = body.allowedDomains
      .map((d): string | null => {
        const trimmed = d.trim().toLowerCase();
        try {
          const hostname = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`).hostname;
          return HOSTNAME_RE.test(hostname) ? hostname : null;
        } catch {
          return null;
        }
      })
      .filter((d): d is string => d !== null);
  }

  // Enforce root domain constraint — all entries must be subdomains of the site's own root domain
  // Skip for localhost or single-part domains (dev environments)
  const siteParts = site.domain.split(".");
  if (sanitizedDomains !== undefined && sanitizedDomains.length > 0 && siteParts.length >= 2) {
    const rootDomain = siteParts.slice(-2).join(".");
    const invalid = sanitizedDomains.filter(d => !d.endsWith(`.${rootDomain}`));
    if (invalid.length > 0) {
      return NextResponse.json(
        { error: `All subdomains must belong to ${rootDomain}.` },
        { status: 400 }
      );
    }
  }

  // Enforce subdomain limit per plan
  if (sanitizedDomains !== undefined) {
    const plan = (user?.plan ?? "free") as Plan;
    const limit = PLAN_LIMITS[plan]?.maxAllowedSubdomains ?? 0;

    if (isFinite(limit)) {
      const newSubdomainCount = sanitizedDomains.length;

      const currentConfig = await db.widgetConfig.findUnique({
        where: { siteId: id },
        select: { allowedDomains: true },
      });
      const currentSubdomainCount = currentConfig?.allowedDomains.length ?? 0;

      if (newSubdomainCount > limit && newSubdomainCount > currentSubdomainCount) {
        return NextResponse.json(
          { error: `Your ${plan} plan allows up to ${limit} subdomain${limit === 1 ? "" : "s"}. Upgrade to add more.` },
          { status: 403 }
        );
      }
    }
  }

  await db.widgetConfig.update({
    where: { siteId: id },
    data: {
      ...(body.position !== undefined && { position: body.position }),
      ...(body.theme !== undefined && { theme: body.theme }),
      ...(body.primaryColor !== undefined && { primaryColor: body.primaryColor }),
      ...(body.language !== undefined && { language: body.language }),
      ...(body.accessibilityStatementUrl !== undefined && { accessibilityStatementUrl: body.accessibilityStatementUrl || null }),
      // White-label: only Large plan users may set this
      ...(body.whiteLabelText !== undefined && user?.plan === "large" && { whiteLabelText: body.whiteLabelText }),
      // Visual customization: only Large plan users may set these
      ...(body.borderRadius !== undefined && user?.plan === "large" && { borderRadius: body.borderRadius }),
      ...(body.buttonSize !== undefined && user?.plan === "large" && { buttonSize: body.buttonSize }),
      ...(body.fontFamily !== undefined && user?.plan === "large" && { fontFamily: body.fontFamily }),
      ...(sanitizedDomains !== undefined && { allowedDomains: sanitizedDomains }),
      ...(body.textResizing !== undefined && { textResizing: body.textResizing }),
      ...(body.highContrast !== undefined && { highContrast: body.highContrast }),
      ...(body.dyslexiaFont !== undefined && { dyslexiaFont: body.dyslexiaFont }),
      ...(body.cursorEnhancement !== undefined && { cursorEnhancement: body.cursorEnhancement }),
      ...(body.keyboardNavigation !== undefined && { keyboardNavigation: body.keyboardNavigation }),
      ...(body.readingGuide !== undefined && { readingGuide: body.readingGuide }),
      ...(body.screenReader !== undefined && { screenReader: body.screenReader }),
      ...(body.pauseAnimations !== undefined && { pauseAnimations: body.pauseAnimations }),
      ...(body.textSpacing !== undefined && { textSpacing: body.textSpacing }),
      ...(body.highlightLinks !== undefined && { highlightLinks: body.highlightLinks }),
      ...(body.colorBlindMode !== undefined && { colorBlindMode: body.colorBlindMode }),
      ...(body.largeClickTargets !== undefined && { largeClickTargets: body.largeClickTargets }),
      ...(body.focusHighlight !== undefined && { focusHighlight: body.focusHighlight }),
      ...(body.grayscale !== undefined && { grayscale: body.grayscale }),
      ...(body.skipNavigation !== undefined && { skipNavigation: body.skipNavigation }),
      ...(body.muteMedia !== undefined && { muteMedia: body.muteMedia }),
      ...(body.readingMask !== undefined && { readingMask: body.readingMask }),
      ...(body.textAlign !== undefined && { textAlign: body.textAlign }),
      ...(body.saturation !== undefined && { saturation: body.saturation }),
      ...(body.blueLightFilter !== undefined && { blueLightFilter: body.blueLightFilter }),
      ...(body.hideImages !== undefined && { hideImages: body.hideImages }),
      ...(body.darkMode !== undefined && { darkMode: body.darkMode }),
      ...(body.contentMagnifier !== undefined && { contentMagnifier: body.contentMagnifier }),
      ...(body.toolTips !== undefined && { toolTips: body.toolTips }),
      ...(body.sustainabilityMode !== undefined && { sustainabilityMode: body.sustainabilityMode }),
      ...(body.slowCursor !== undefined && { slowCursor: body.slowCursor }),
      ...(body.dictionary !== undefined && { dictionary: body.dictionary }),
      ...(body.lineHeight !== undefined && { lineHeight: body.lineHeight }),
      ...(body.highlightTitles !== undefined && { highlightTitles: body.highlightTitles }),
      ...(body.profileAdhd !== undefined && { profileAdhd: body.profileAdhd }),
      ...(body.profileBlind !== undefined && { profileBlind: body.profileBlind }),
      ...(body.profileLowVision !== undefined && { profileLowVision: body.profileLowVision }),
      ...(body.profileColorBlind !== undefined && { profileColorBlind: body.profileColorBlind }),
      ...(body.profileDyslexia !== undefined && { profileDyslexia: body.profileDyslexia }),
      ...(body.profileMotorImpaired !== undefined && { profileMotorImpaired: body.profileMotorImpaired }),
      ...(body.profileCognitive !== undefined && { profileCognitive: body.profileCognitive }),
      ...(body.profileSeizure !== undefined && { profileSeizure: body.profileSeizure }),
      ...(body.profileParkinson !== undefined && { profileParkinson: body.profileParkinson }),
    },
  });

  logAudit({
    userId: session.user.id,
    action: "site.config_updated",
    resource: "site",
    resourceId: id,
    meta: { domain: site.domain },
  });

  return NextResponse.json({ success: true });
}
