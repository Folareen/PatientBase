# Clinora Monorepo

A modern monorepo setup using **pnpm workspaces** and **Turborepo**.

## Structure

```
clinora/
├── packages/              # Shared libraries
│   └── ui/               # UI component library (@clinora/ui)
├── apps/                 # Applications
│   ├── web/              # React web app (@clinora/web)
│   ├── mobile/           # React Native app (@clinora/mobile)
│   └── api/              # Express backend (@clinora/api)
├── package.json          # Root package.json
├── pnpm-workspace.yaml   # pnpm workspace config
├── turbo.json            # Turborepo config
└── pnpm-lock.yaml        # Lock file (auto-generated)
```

## Getting Started

### Option A: With Docker (Recommended for Backend Dev)

**Start all services with Docker:**
```bash
docker-compose up
```

This starts:
- PostgreSQL at `localhost:5432`
- Redis at `localhost:6379`
- API at `http://localhost:3000`

In separate terminals, run frontend/mobile:
```bash
pnpm run -F @clinora/web dev    # http://localhost:5173
pnpm run -F @clinora/mobile dev # Expo
```

**API will auto-reload on code changes** (hot reload via volumes)

### Option B: Without Docker (Manual Setup)

Install dependencies:
```bash
pnpm install
```

Install and run PostgreSQL & Redis separately, then set:
```bash
export DATABASE_URL=postgres://user:pass@localhost:5432/clinora
export REDIS_URL=redis://localhost:6379
```

### Run Commands Across All Workspaces

```bash
# Run dev in all packages
pnpm dev

# Run build in all packages
pnpm build

# Run tests in all packages
pnpm test

# Run lint in all packages
pnpm lint
```

### Run Commands in Specific Package

```bash
# React Web App
pnpm run -F @clinora/web dev      # Start Vite dev server (http://localhost:5173)
pnpm run -F @clinora/web build    # Build for production

# React Native Mobile
pnpm run -F @clinora/mobile dev   # Start Expo
pnpm run -F @clinora/mobile ios   # Run on iOS simulator
pnpm run -F @clinora/mobile android # Run on Android emulator

# Express API
pnpm run -F @clinora/api dev      # Start dev server (http://localhost:3000)
pnpm run -F @clinora/api build    # Build TypeScript
pnpm run -F @clinora/api start    # Run production build
```

### Run Across Selected Apps

```bash
# Build only apps
pnpm run -F '@clinora/*' build

# Lint all apps & packages
pnpm lint
```

## Adding New Packages

1. Create folder: `mkdir packages/my-lib`
2. Add `package.json` with name like `@clinora/my-lib`
3. pnpm recognizes it automatically (due to `pnpm-workspace.yaml`)
4. Run `pnpm install` to link dependencies

## How It Works

- **pnpm workspaces**: Links packages together, saves disk space (uses symlinks)
- **Turborepo**: Orchestrates tasks, enables build caching, parallelizes execution
- `workspace:*` in dependencies = use local version

## Apps Overview

### 🌐 Web App (`apps/web`) - React + Vite
- **Tech Stack**: React 18, Vite, TypeScript
- **Purpose**: Main web application
- **Dev**: `pnpm run -F @clinora/web dev`
- **Build**: `pnpm run -F @clinora/web build`
- **Output**: Static files in `dist/`

### 📱 Mobile App (`apps/mobile`) - React Native + Expo
- **Tech Stack**: React Native, Expo, TypeScript
- **Purpose**: iOS & Android mobile application
- **Dev**: `pnpm run -F @clinora/mobile dev`
- **iOS**: `pnpm run -F @clinora/mobile ios`
- **Android**: `pnpm run -F @clinora/mobile android`
- **Output**: Managed by Expo

### 🔧 API Server (`apps/api`) - Express
- **Tech Stack**: Express, Node.js, TypeScript
- **Purpose**: Backend API server
- **Dev**: `pnpm run -F @clinora/api dev`
- **Build**: `pnpm run -F @clinora/api build`
- **Start**: `pnpm run -F @clinora/api start`
- **Output**: JavaScript in `dist/`

## 🐳 Docker Setup

### Local Development with Docker

Start all services:
```bash
docker-compose up
```

Services:
- **PostgreSQL**: `postgres://postgres:dev_password@localhost:5432/clinora`
- **Redis**: `redis://localhost:6379`
- **API**: `http://localhost:3000` (auto-reload on changes)

Stop services:
```bash
docker-compose down
```

Fresh database:
```bash
docker-compose down -v
docker-compose up
```

### Docker Files

- `docker-compose.yml` — Local dev environment (Postgres, Redis, API)
- `apps/api/Dockerfile` — Production API image (multi-stage build)
- `.dockerignore` — Files to exclude from Docker
- `docker/README.md` — Detailed Docker documentation

### Deployment

**Build production API image:**
```bash
docker build -f apps/api/Dockerfile -t clinora-api:latest .
```

**Deploy to:**
- 🚀 [Railway](https://railway.app) — Easiest, supports Postgres + Redis
- 🔴 [Render](https://render.com) — Free tier available
- ☁️ AWS ECS — Full control, more complex
- 💜 DigitalOcean — Droplets + App Platform

## Key Features

✅ Fast installs (pnpm is 2-3x faster than npm)
✅ Automatic dependency linking
✅ Build caching with Turborepo
✅ Parallel task execution
✅ Proper dependency isolation
✅ Easy package publishing

Happy coding! 🚀
