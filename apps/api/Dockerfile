# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy packages and apps
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build API
RUN pnpm run -F @clinora/api build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy from builder
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/api ./apps/api

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

# Start API
CMD ["pnpm", "start", "-F", "@clinora/api"]
