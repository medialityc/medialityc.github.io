# Multi-stage Dockerfile for Next.js (pnpm)
# Build stage
FROM node:20-alpine AS builder

# Install system deps if needed (optional)
# RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm via Corepack and pin version
RUN corepack enable && corepack prepare pnpm@9.12.2 --activate

# Only copy manifest files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js app
RUN pnpm build

# Prune dev dependencies for smaller runtime image
RUN pnpm prune --prod

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary build artifacts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copy Next config if present
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

# Default command: start Next.js server
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
