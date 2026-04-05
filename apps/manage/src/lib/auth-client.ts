import { createAuthClient } from "better-auth/react";
import type { ClientOptions } from "better-auth/types";

// When unset (e.g. Docker build without NEXT_PUBLIC_APP_URL), better-auth uses
// window.location.origin in the browser — avoids baking localhost into prod.
const publicAppUrl = process.env["NEXT_PUBLIC_APP_URL"];
const client = createAuthClient(
  publicAppUrl ? { baseURL: publicAppUrl } : {},
);

export const authClient: ReturnType<typeof createAuthClient<ClientOptions>> =
  client;

export const { signIn, signOut, signUp, useSession } = authClient;
