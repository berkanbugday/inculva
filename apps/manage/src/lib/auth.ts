import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@inculva/db";
import {
  sendEmail,
  verifyEmailTemplate,
  resetPasswordTemplate,
  welcomeTemplate,
  detectLocale,
} from "@inculva/email";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          const request =
            ctx && "request" in ctx && ctx.request instanceof Request
              ? ctx.request
              : undefined;
          const locale = request ? detectLocale(request) : "en";
          const { html, subject } = welcomeTemplate(user.name ?? "", locale);
          void sendEmail({ to: user.email, subject, html }).catch((err) =>
            console.error("[email] Welcome failed:", err),
          );
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, request) => {
      const locale = request ? detectLocale(request) : "en";
      const { html, subject } = resetPasswordTemplate(url, locale);
      await sendEmail({ to: user.email, subject, html });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 24, // 24 hours
    sendVerificationEmail: async ({ user, url }, request) => {
      const locale = request ? detectLocale(request) : "en";
      const { html, subject } = verifyEmailTemplate(user.name ?? "", url, locale);
      await sendEmail({ to: user.email, subject, html });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"] ?? "",
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] ?? "",
    },
  },

  session: {
    // Session timeout (seconds). Keep short for security; override per env if needed.
    // `updateAge` controls how often the session is refreshed during active use.
    expiresIn: Number(process.env["BETTER_AUTH_SESSION_EXPIRES_IN_SECONDS"] ?? "") || 60 * 60, // default: 1 hour
    updateAge: Number(process.env["BETTER_AUTH_SESSION_UPDATE_AGE_SECONDS"] ?? "") || 15 * 60, // default: 15 min
  },

  trustedOrigins: [process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000"],
}) as ReturnType<typeof betterAuth>;

export type Session = (typeof auth)["$Infer"]["Session"];
