import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import apiKeyPlugin from "./plugins/api-key.js";
import { widgetRoutes } from "./routes/widget.js";
import { badgeRoutes } from "./routes/badge.js";
import { healthRoutes } from "./routes/health.js";

const PORT = Number(process.env["API_PORT"] ?? 3001);
const HOST = process.env["API_HOST"] ?? "0.0.0.0";

const isDev = process.env["NODE_ENV"] !== "production";

export const app = Fastify({
  logger: isDev
    ? { level: "debug", transport: { target: "pino-pretty" } }
    : { level: "info" },
});

async function bootstrap(): Promise<void> {
  await app.register(helmet, {
    contentSecurityPolicy: false,
    // Widget is loaded cross-origin on customer sites; allow any origin to read responses
    crossOriginResourcePolicy: { policy: "cross-origin" },
  });

  // Chrome Private Network Access — must be registered before @fastify/cors so the
  // header is present when the CORS plugin sends the preflight reply.
  app.addHook("onRequest", async (_request, reply) => {
    if (_request.headers["access-control-request-private-network"] === "true") {
      void reply.header("Access-Control-Allow-Private-Network", "true");
    }
  });

  // Widget routes must be accessible from any origin (embedded on external sites).
  // Other routes are gated by API keys or session cookies.
  await app.register(cors, {
    origin: true, // reflect request origin (equivalent to *) — safe since auth uses keys
    credentials: false,
    methods: ["GET", "POST", "OPTIONS"],
  });
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Global error handler — returns consistent JSON shape instead of HTML error pages
  app.setErrorHandler((err: Error & { statusCode?: number }, _request, reply) => {
    const statusCode = err.statusCode ?? 500;
    app.log.error(err);
    return reply.status(statusCode).send({
      success: false,
      error: statusCode === 500 ? "Internal server error" : (err.message || "Unknown error"),
    });
  });

  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send({ success: false, error: "Not found" });
  });

  await app.register(apiKeyPlugin);
  await app.register(healthRoutes);
  await app.register(widgetRoutes, { prefix: "/widget" });
  await app.register(badgeRoutes, { prefix: "/badge" });

  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

void bootstrap();
