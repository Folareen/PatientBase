# Clinora

Monorepo using pnpm workspaces and Turborepo.

## Structure

```
clinora/
├── packages/           # Shared libraries
├── apps/
│   ├── web/            # React + Vite
│   ├── mobile/         # React Native + Expo
│   └── api/            # Express
```

## Setup

```bash
pnpm install
```

Set env vars before running the API:

```bash
export DATABASE_URL=postgres://user:pass@localhost:5432/clinora
export REDIS_URL=redis://localhost:6379
```

## Running

```bash
# All workspaces
pnpm dev
pnpm build
pnpm test
pnpm lint

# Specific app
pnpm run -F @clinora/web dev
pnpm run -F @clinora/mobile dev
pnpm run -F @clinora/mobile ios
pnpm run -F @clinora/mobile android
pnpm run -F @clinora/api dev
```

## Docker

```bash
# Start Postgres, Redis, and API
docker-compose up

# Stop
docker-compose down

# Reset database
docker-compose down -v && docker-compose up
```

## Adding a Package

1. Create `packages/my-lib/`
2. Add a `package.json` with `"name": "@clinora/my-lib"`
3. Run `pnpm install`
