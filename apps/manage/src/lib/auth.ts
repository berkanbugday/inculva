import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@inculva/db";
import {
  sendEmail,
  verifyEmailTemplate,
  resetPasswordTemplate,
  detectLocale,
} from "@inculva/email";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

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
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },

  trustedOrigins: [process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000"],
}) as ReturnType<typeof betterAuth>;

export type Session = (typeof auth)["$Infer"]["Session"];
