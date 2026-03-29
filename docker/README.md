# Docker Quick Start

## Local Development

Start all services (PostgreSQL, Redis, API):
```bash
docker-compose up
```

This will:
- Create PostgreSQL database at `postgres://localhost:5432/clinora`
- Create Redis cache at `redis://localhost:6379`
- Start API server at `http://localhost:3000`

### API Environment Variables (in docker-compose)
- `DATABASE_URL`: postgres://postgres:dev_password@postgres:5432/clinora
- `REDIS_URL`: redis://redis:6379
- `NODE_ENV`: development

## Running Other Apps

While Docker services run, in separate terminals:

```bash
# Web app
cd apps/web && pnpm dev

# Mobile app  
cd apps/mobile && pnpm dev
```

## Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f api

# Rebuild API image
docker-compose build api

# Fresh database
docker-compose down -v && docker-compose up
```

## Production Build

Build the API Docker image:
```bash
docker build -f apps/api/Dockerfile -t clinora-api:latest .
```

Run in production:
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgres://user:pass@db-host:5432/clinora \
  -e REDIS_URL=redis://redis-host:6379 \
  clinora-api:latest
```

## Deployment Options

### Railway
```bash
railway init
railway link
railway up
```

### AWS ECS
```bash
aws ecr create-repository --repository-name clinora-api
docker tag clinora-api:latest <account>.dkr.ecr.us-east-1.amazonaws.com/clinora-api:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/clinora-api:latest
```

### Render
- Connect GitHub repo
- Create new Web Service
- Set Build Command: `pnpm install && pnpm build -F @clinora/api`
- Set Start Command: `pnpm start -F @clinora/api`
- Add environment variables (DATABASE_URL, REDIS_URL)

## Database Migrations

When using a real database:
```bash
docker-compose exec api pnpm run -F @clinora/api migrate:dev
```
