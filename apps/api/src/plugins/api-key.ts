import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { db } from "@inculva/db";
import { createHash } from "crypto";

export function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

async function apiKeyPlugin(app: FastifyInstance): Promise<void> {
  app.decorate(
    "verifyApiKey",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const rawKey = request.headers["x-api-key"];

      if (!rawKey || typeof rawKey !== "string") {
        return reply.status(401).send({ success: false, error: "Missing API key" });
      }

      const keyHash = hashKey(rawKey);

      const apiKey = await db.apiKey.findUnique({
        where: { keyHash },
      });

      if (!apiKey || apiKey.revokedAt) {
        return reply.status(401).send({ success: false, error: "Invalid or revoked API key" });
      }

      if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
        return reply.status(401).send({ success: false, error: "API key expired" });
      }

      // Update lastUsedAt asynchronously — don't block the request
      void db.apiKey.update({
        where: { id: apiKey.id },
        data: { lastUsedAt: new Date() },
      });

      request.apiKeyUserId = apiKey.userId;
    }
  );
}

export default fp(apiKeyPlugin, { name: "api-key" });

declare module "fastify" {
  interface FastifyInstance {
    verifyApiKey: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    apiKeyUserId?: string;
  }
}
