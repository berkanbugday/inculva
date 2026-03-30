import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@inculva/db";
import {
  sendEmail,
  verifyEmailTemplate,
  resetPasswordTemplate,
} from "@inculva/email";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your inculva password",
        html: resetPasswordTemplate(url),
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 24, // 24 hours
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your inculva email",
        html: verifyEmailTemplate(user.name ?? "", url),
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"] ?? "",
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] ?? "",
    },
    github: {
      clientId: process.env["GITHUB_CLIENT_ID"] ?? "",
      clientSecret: process.env["GITHUB_CLIENT_SECRET"] ?? "",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },

  trustedOrigins: [process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
