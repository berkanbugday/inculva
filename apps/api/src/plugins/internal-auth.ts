import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";

async function internalAuthPlugin(app: FastifyInstance): Promise<void> {
  const secret = process.env["INTERNAL_API_SECRET"];

  app.decorate(
    "verifyInternalAuth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (!secret) {
        return reply
          .status(500)
          .send({ success: false, error: "Internal auth not configured" });
      }

      const authHeader = request.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${secret}`) {
        return reply
          .status(401)
          .send({ success: false, error: "Unauthorized" });
      }
    },
  );
}

export default fp(internalAuthPlugin, { name: "internal-auth" });

declare module "fastify" {
  interface FastifyInstance {
    verifyInternalAuth: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
