import type { DashboardMessages } from "@/i18n/messages";

type AuthT = DashboardMessages["auth"];

/**
 * Better Auth `BASE_ERROR_CODES` strings returned as `error.message` on the client.
 * @see https://github.com/better-auth/better-auth (internal error codes)
 */
export function translateBetterAuthError(
  message: string | undefined,
  t: AuthT,
  fallback: string,
): string {
  if (!message) return fallback;
  switch (message) {
    case "Invalid email or password":
      return t.invalidEmailOrPassword;
    case "Invalid email":
      return t.invalidEmailApi;
    case "Email not verified":
      return t.emailNotVerified;
    case "Failed to create session":
      return t.authSessionFailed;
    case "User already exists":
      return t.userAlreadyExists;
    default:
      return message;
  }
}
