import { env } from "./env";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function exchangeCodeForToken(
  code: string,
  storeName: string,
): Promise<TokenResponse> {
  const res = await fetch(
    `https://${storeName}.myikas.com/api/admin/oauth/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.ikasClientId,
        client_secret: env.ikasClientSecret,
        code,
        redirect_uri: `${env.deployUrl}/api/auth/callback`,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<TokenResponse>;
}

export async function ikasGraphQL<T = unknown>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(env.ikasApiUrl, {
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

export async function getStorefronts(
  accessToken: string,
): Promise<{ id: string; name: string }[]> {
  const data = await ikasGraphQL<{
    listStorefront: { id: string; name: string }[];
  }>(accessToken, `{ listStorefront { id name } }`);
  return data.listStorefront;
}

export async function registerWidgetScript(
  accessToken: string,
  storefrontId: string,
  siteId: string,
): Promise<string | null> {
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
        isHighPriority: false,
      },
    },
  );

  return data.createStorefrontJSScript?.id ?? null;
}

export async function removeWidgetScript(
  accessToken: string,
  scriptId: string,
): Promise<boolean> {
  const data = await ikasGraphQL<{
    deleteStorefrontJSScript: boolean;
  }>(
    accessToken,
    `mutation DeleteScript($id: String!) {
      deleteStorefrontJSScript(id: $id)
    }`,
    { id: scriptId },
  );

  return data.deleteStorefrontJSScript;
}
