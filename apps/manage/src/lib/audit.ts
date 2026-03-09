import { db } from "@inculva/db";

export type AuditAction =
  | "site.created"
  | "site.renamed"
  | "site.domain_updated"
  | "site.deleted"
  | "site.config_updated"
  | "api_key.created"
  | "api_key.revoked"
  | "webhook.created"
  | "webhook.deleted";

export type AuditResource = "site" | "api_key" | "webhook";

interface LogOptions {
  userId: string;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  meta?: Record<string, unknown>;
  ip?: string;
}

/** Fire-and-forget — never throws, logs to console on failure. */
export function logAudit(opts: LogOptions): void {
  // Build data without optional-undefined fields to satisfy exactOptionalPropertyTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {
    userId: opts.userId,
    action: opts.action,
    resource: opts.resource,
  };
  if (opts.resourceId !== undefined) data.resourceId = opts.resourceId;
  if (opts.meta !== undefined) data.meta = opts.meta;
  if (opts.ip !== undefined) data.ip = opts.ip;

  db.auditLog
    .create({ data })
    .catch((err: unknown) => {
      console.error("[audit] Failed to write audit log:", err);
    });
}
