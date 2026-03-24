# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN corepack enable

WORKDIR /app

# Copy workspace manifests and lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/landing/package.json ./apps/landing/

# Install only landing deps
RUN pnpm install --frozen-lockfile --filter @inculva/landing

COPY apps/landing ./apps/landing
RUN pnpm --filter @inculva/landing build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/landing/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
