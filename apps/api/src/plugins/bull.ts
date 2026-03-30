import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Queue } from "bullmq";

export const SCAN_PAGE_QUEUE = "scan-page";
export const SCAN_REPORT_QUEUE = "scan-report";
export const SCAN_SITE_QUEUE = "scan-site";

async function bullPlugin(app: FastifyInstance): Promise<void> {
  const connection = app.redis;

  const scanPageQueue = new Queue(SCAN_PAGE_QUEUE, { connection });
  const scanReportQueue = new Queue(SCAN_REPORT_QUEUE, { connection });
  const scanSiteQueue = new Queue(SCAN_SITE_QUEUE, { connection });

  app.decorate("scanPageQueue", scanPageQueue);
  app.decorate("scanReportQueue", scanReportQueue);
  app.decorate("scanSiteQueue", scanSiteQueue);

  app.addHook("onClose", async () => {
    await scanPageQueue.close();
    await scanReportQueue.close();
    await scanSiteQueue.close();
  });
}

export default fp(bullPlugin, { name: "bull", dependencies: ["redis"] });

declare module "fastify" {
  interface FastifyInstance {
    scanPageQueue: Queue;
    scanReportQueue: Queue;
    scanSiteQueue: Queue;
  }
}
