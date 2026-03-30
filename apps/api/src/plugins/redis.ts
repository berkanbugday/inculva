import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Redis } from "ioredis";

async function redisPlugin(app: FastifyInstance): Promise<void> {
  const redisUrl = process.env["REDIS_URL"] ?? "redis://localhost:6379";
  const redis = new Redis(redisUrl, { maxRetriesPerRequest: null });

  redis.on("error", (err) => {
    app.log.error({ err }, "Redis connection error");
  });

  redis.on("connect", () => {
    app.log.info("Redis connected");
  });

  app.decorate("redis", redis);

  app.addHook("onClose", async () => {
    await redis.quit();
  });
}

export default fp(redisPlugin, { name: "redis" });

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
  }
}
