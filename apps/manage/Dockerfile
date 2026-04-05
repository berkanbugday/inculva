# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Baked into the client bundle and CSP (next.config.ts). Defaults match docs/DEPLOYMENT.md
# (production). Override any with: docker build --build-arg NEXT_PUBLIC_API_URL=https://staging/...
ARG NEXT_PUBLIC_API_URL=https://inculva-production.up.railway.app
ARG NEXT_PUBLIC_APP_URL=https://app.inculva.com
ARG NEXT_PUBLIC_CDN_URL=https://cdn.inculva.com
ARG NEXT_PUBLIC_LANDING_URL=https://inculva.com
ARG NEXT_PUBLIC_WIDGET_URL=https://cdn.inculva.com/widget.js
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}
ENV NEXT_PUBLIC_LANDING_URL=${NEXT_PUBLIC_LANDING_URL}
ENV NEXT_PUBLIC_WIDGET_URL=${NEXT_PUBLIC_WIDGET_URL}

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY packages/types/package.json packages/types/
COPY packages/email/package.json packages/email/
COPY packages/ui/package.json packages/ui/
COPY packages/wcag-kb/package.json packages/wcag-kb/
COPY packages/scanner/package.json packages/scanner/
COPY apps/manage/package.json apps/manage/

RUN pnpm install --frozen-lockfile

COPY packages/ packages/
COPY apps/manage/ apps/manage/
COPY tsconfig.base.json ./

RUN pnpm --filter @inculva/db db:generate
RUN pnpm --filter @inculva/db build
RUN pnpm --filter @inculva/email build
RUN pnpm --filter @inculva/types build
RUN pnpm --filter @inculva/wcag-kb build
RUN pnpm --filter @inculva/scanner build

RUN pnpm --filter @inculva/manage build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runner

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/manage/public ./apps/manage/public
COPY --from=builder /app/apps/manage/.next/standalone ./
COPY --from=builder /app/apps/manage/.next/static ./apps/manage/.next/static

EXPOSE 3000

CMD ["node", "apps/manage/server.js"]
