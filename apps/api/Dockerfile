# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy manifests first (layer-cache friendly)
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY packages/types/package.json packages/types/
COPY packages/email/package.json packages/email/
COPY packages/ui/package.json packages/ui/
COPY apps/api/package.json apps/api/

# Install all deps (including dev — needed for tsc)
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/ packages/
COPY apps/api/ apps/api/
COPY tsconfig.base.json ./

# Generate Prisma client
RUN pnpm --filter @inculva/db db:generate

# Build
RUN pnpm --filter @inculva/api build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy workspace manifests (needed for pnpm to resolve workspace links)
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/db/package.json packages/db/
COPY packages/types/package.json packages/types/
COPY packages/email/package.json packages/email/
COPY packages/ui/package.json packages/ui/
COPY apps/api/package.json apps/api/

# Production deps only
RUN pnpm install --frozen-lockfile --prod

# Copy build output + generated Prisma client
COPY --from=builder /app/apps/api/dist apps/api/dist
COPY --from=builder /app/packages/db/prisma packages/db/prisma
COPY --from=builder /app/node_modules/.pnpm node_modules/.pnpm
COPY --from=builder /app/packages/db/node_modules packages/db/node_modules

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "apps/api/dist/server.js"]
