# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

ARG NEXT_PUBLIC_IKAS_CLIENT_ID=9adc317f-7f0d-476c-8ddd-0f1f771c22b8
ARG NEXT_PUBLIC_DEPLOY_URL=https://ikas-inculva.up.railway.app
ARG NEXT_PUBLIC_INCULVA_APP_URL=https://app.inculva.com
ARG NEXT_PUBLIC_WIDGET_URL=https://cdn.inculva.com/widget.js
ENV NEXT_PUBLIC_IKAS_CLIENT_ID=${NEXT_PUBLIC_IKAS_CLIENT_ID}
ENV NEXT_PUBLIC_DEPLOY_URL=${NEXT_PUBLIC_DEPLOY_URL}
ENV NEXT_PUBLIC_INCULVA_APP_URL=${NEXT_PUBLIC_INCULVA_APP_URL}
ENV NEXT_PUBLIC_WIDGET_URL=${NEXT_PUBLIC_WIDGET_URL}

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY packages/types/package.json packages/types/
COPY apps/integrations/ikas/package.json apps/integrations/ikas/

RUN pnpm install --frozen-lockfile

COPY packages/ packages/
COPY apps/integrations/ikas/ apps/integrations/ikas/
COPY tsconfig.base.json ./

RUN pnpm --filter @inculva/db db:generate
RUN pnpm --filter @inculva/db build
RUN pnpm --filter @inculva/types build

RUN pnpm --filter @inculva/ikas build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim AS runner

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/integrations/ikas/.next/standalone ./
COPY --from=builder /app/apps/integrations/ikas/.next/static ./apps/integrations/ikas/.next/static

# Prisma resolves ../../node_modules from apps/integrations/ikas/ which lands
# at apps/node_modules instead of the root node_modules. Symlink to fix.
RUN ln -s /app/node_modules /app/apps/node_modules

EXPOSE 3002

CMD ["node", "apps/integrations/ikas/server.js"]
