.PHONY: setup dev db-up db-down db-reset db-studio migrate seed push-api push-landing push

REPO  ?= inculva/inculva
TAG   ?= latest

## First-time setup
setup:
	cp -n .env.example .env || true
	pnpm install
	docker compose up -d postgres
	@echo "Waiting for PostgreSQL..."
	@sleep 3
	cd packages/db && pnpm db:generate && pnpm db:migrate
	@echo "\n✅ Inculva is ready. Run 'make dev' to start."

## Start dev servers
dev:
	docker compose up -d postgres
	pnpm dev

## Database
db-up:
	docker compose up -d

db-down:
	docker compose down

db-reset:
	docker compose down -v
	docker compose up -d postgres
	@sleep 3
	cd packages/db && pnpm db:migrate

db-studio:
	cd packages/db && pnpm db:studio

migrate:
	cd packages/db && pnpm db:migrate

seed:
	cd packages/db && pnpm db:seed

## Docker
push-api:
	docker build -f apps/api/Dockerfile -t $(REPO):api-$(TAG) .
	docker push $(REPO):api-$(TAG)

push-landing:
	docker build -f apps/landing/Dockerfile -t $(REPO):landing-$(TAG) apps/landing
	docker push $(REPO):landing-$(TAG)

push: push-api push-landing
