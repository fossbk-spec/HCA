# F1 Database layer (branch feature/database)
Read only: AGENTS.md §4,§7; prisma/schema.prisma; data/seed/*.json; package.json.
Deps (prisma 6, @prisma/client, tsx, typescript) are already installed. Do not install anything.

Tasks
1. prisma/schema.prisma: keep models; add `tags String[] @default([])` to Civilization, Person, Event, Idea, Book only if seed data uses it (it does not now: skip). Keep as is unless validation fails. Add `@@unique([sourceId,targetId,relationshipType])` to Relationship.
2. Migration: no DB is available. Generate SQL with
   `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script`
   and save as prisma/migrations/0001_init/migration.sql plus prisma/migrations/migration_lock.toml (provider = "postgresql").
3. tsconfig.json (strict, ES2022, moduleResolution bundler, noEmit, include prisma/ src/).
4. src/lib/prisma.ts: PrismaClient singleton (globalThis pattern).
5. prisma/seed.ts (npm run seed): idempotent upserts by slug. Read data/seed/*.json (note fields actually present: people/events/ideas/books may have only slug+name/title; map missing to null). Seed relationships.json (sourceSlug/targetSlug/relationshipType): resolve slugs across all 5 entity tables to id+EntityType, skip+warn on unresolved, upsert on the unique key. Print counts per table.
6. Add `"prisma": {"seed": "tsx prisma/seed.ts"}` to package.json; scripts: db:generate, db:migrate (prisma migrate dev), db:deploy (prisma migrate deploy), db:studio.
7. .env.example already has DATABASE_URL. Update README "Local Development" only if wrong.

Gates (run, report pass/fail): `npx prisma validate` (set DATABASE_URL to a dummy postgres URL), `npx prisma generate`, `npm run typecheck`. Do not claim seed ran against a DB; it cannot here.
Do not commit. Final answer: files changed + gate results, <10 lines.
