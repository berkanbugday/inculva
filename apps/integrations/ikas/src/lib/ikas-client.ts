import { createHmac } from "node:crypto";
import { db as prisma } from "@inculva/db";
import { env, IKAS_GRAPHQL_URL } from "./env";
import { encrypt, decrypt } from "./crypto";

// ── Types ────────────────────────────────────────────────────────────────────

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export interface Storefront {
  id: string;
  name: string;
  domain?: string | null;
  defaultAlias?: string | null;
}

export interface MerchantInfo {
  id: string;
  storeName: string;
}

// ── Signature Validation ─────────────────────────────────────────────────────

export function validateSignature(code: string, signature: string): boolean {
  const expected = createHmac("sha256", env.clientSecret)
    .update(code, "utf8")
    .digest("hex");
  return expected === signature;
}

// ── Redirect URI ────────────────────────────────────────────────────────────

export function getRedirectUri(): string {
  return `${env.deployUrl}/api/oauth/callback/ikas`;
}

// ── Token Exchange ───────────────────────────────────────────────────────────

export async function exchangeCodeForToken(
  code: string,
  storeName: string,
): Promise<TokenResponse> {
  // Use storeName for store-specific endpoint, fallback to api.myikas.com
  const tokenUrl = `https://${storeName || "api"}.myikas.com/api/admin/oauth/token`;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: env.clientId,
      client_secret: env.clientSecret,
      code,
      redirect_uri: getRedirectUri(),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[ikas] token exchange failed:", res.status, text);
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

// ── Token Refresh ────────────────────────────────────────────────────────────

async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const res = await fetch(
    "https://api.myikas.com/api/admin/oauth/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: env.clientId,
        client_secret: env.clientSecret,
        refresh_token: refreshToken,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

export async function getValidToken(ikasStore: {
  id: string;
  accessToken: string;
  refreshToken: string | null;
  tokenExpiresAt: Date | null;
  ikasStoreName: string;
}): Promise<string> {
  const now = new Date();
  const fiveMinutes = 5 * 60 * 1000;
  const isExpired =
    !ikasStore.tokenExpiresAt ||
    ikasStore.tokenExpiresAt.getTime() - now.getTime() < fiveMinutes;

  if (!isExpired) {
    return decrypt(ikasStore.accessToken);
  }

  if (!ikasStore.refreshToken) {
    throw new Error("Token expired and no refresh token available");
  }

  const decryptedRefresh = decrypt(ikasStore.refreshToken);
  const tokens = await refreshAccessToken(decryptedRefresh);

  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  await prisma.ikasStore.update({
    where: { id: ikasStore.id },
    data: {
      accessToken: encrypt(tokens.access_token),
      ...(tokens.refresh_token
        ? { refreshToken: encrypt(tokens.refresh_token) }
        : {}),
      tokenExpiresAt: newExpiresAt,
    },
  });

  return tokens.access_token;
}

// ── GraphQL ──────────────────────────────────────────────────────────────────

export async function ikasGraphQL<T = unknown>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(IKAS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ikas API error: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown[] };
  if (json.errors) {
    throw new Error(`ikas GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

// ── Merchant Info ────────────────────────────────────────────────────────────

export async function getMerchantInfo(
  accessToken: string,
): Promise<MerchantInfo> {
  const data = await ikasGraphQL<{ getMerchant: MerchantInfo }>(
    accessToken,
    `{ getMerchant { id storeName } }`,
  );
  return data.getMerchant;
}

// ── Storefronts ──────────────────────────────────────────────────────────────

export async function getStorefronts(
  accessToken: string,
): Promise<Storefront[]> {
  try {
    const data = await ikasGraphQL<{ listStorefront: Storefront[] }>(
      accessToken,
      `{ listStorefront { id name domain defaultAlias } }`,
    );
    return data.listStorefront;
  } catch {
    const data = await ikasGraphQL<{ listStorefront: Storefront[] }>(
      accessToken,
      `{ listStorefront { id name } }`,
    );
    return data.listStorefront;
  }
}

export function getStorefrontDomain(
  storefront: Storefront,
  storeName: string,
): string {
  if (storefront.domain) return storefront.domain;
  if (storefront.defaultAlias) return storefront.defaultAlias;
  return `${storeName}.myikas.com`;
}

// ── Script Injection ─────────────────────────────────────────────────────────

export async function registerWidgetScript(
  accessToken: string,
  storefrontId: string,
  siteId: string,
  oldScriptId?: string | null,
): Promise<string | null> {
  console.log("[ikas] registerWidgetScript siteId:", siteId, "oldScriptId:", oldScriptId);

  // Delete the known old script first
  if (oldScriptId) {
    await removeWidgetScript(accessToken, oldScriptId);
  }

  // Create fresh script with correct siteId
  const scriptContent = `<script src="${env.widgetUrl}" data-site-id="${siteId}" defer></script>`;

  const data = await ikasGraphQL<{
    createStorefrontJSScript: { id: string } | null;
  }>(
    accessToken,
    `mutation CreateScript($input: CreateStorefrontJSScriptInput!) {
      createStorefrontJSScript(input: $input) { id }
    }`,
    {
      input: {
        storefrontId,
        name: "inculva accessibility widget",
        scriptContent,
        contentType: "SCRIPT",
        isHighPriority: false,
      },
    },
  );

  const newScriptId = data.createStorefrontJSScript?.id ?? null;
  console.log("[ikas] script created:", newScriptId, "siteId:", siteId);
  return newScriptId;
}

// Cache the discovered delete mutation argument name
let _deleteArgName: string | null = null;

async function discoverDeleteArgName(accessToken: string): Promise<string | null> {
  if (_deleteArgName) return _deleteArgName;

  try {
    const data = await ikasGraphQL<{
      __type: {
        fields: { name: string; args: { name: string; type: { name: string | null; kind: string } }[] }[];
      } | null;
    }>(
      accessToken,
      `{
        __type(name: "Mutation") {
          fields {
            name
            args { name type { name kind } }
          }
        }
      }`,
    );

    const deleteField = data.__type?.fields?.find(
      (f) => f.name === "deleteStorefrontJSScript",
    );

    if (deleteField && deleteField.args.length > 0) {
      _deleteArgName = deleteField.args[0]!.name;
      console.log("[ikas] discovered delete arg name:", _deleteArgName, "type:", JSON.stringify(deleteField.args[0]!.type));
      return _deleteArgName;
    }

    // Log all storefront-related mutations for debugging
    const sfFields = data.__type?.fields?.filter(
      (f) => f.name.toLowerCase().includes("storefrontjsscript"),
    );
    console.log("[ikas] storefront script mutations:", JSON.stringify(sfFields));
  } catch (err) {
    console.error("[ikas] introspection failed:", err);
  }

  return null;
}

export async function removeWidgetScript(
  accessToken: string,
  scriptId: string,
): Promise<boolean> {
  try {
    console.log("[ikas] deleting script:", scriptId);

    // Discover the correct argument name via introspection
    const argName = await discoverDeleteArgName(accessToken);

    if (!argName) {
      console.error("[ikas] could not discover delete mutation argument name");
      return false;
    }

    const data = await ikasGraphQL<{ deleteStorefrontJSScript: boolean }>(
      accessToken,
      `mutation DeleteScript($val: String!) {
        deleteStorefrontJSScript(${argName}: $val)
      }`,
      { val: scriptId },
    );
    console.log("[ikas] delete result:", data.deleteStorefrontJSScript);
    return data.deleteStorefrontJSScript;
  } catch (err) {
    console.error("[ikas] delete script failed:", err);
    return false;
  }
}
