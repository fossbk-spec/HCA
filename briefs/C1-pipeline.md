# C1 Pipeline hardening (branch chore/pipeline)
Read only: AGENTS.md §7-8; package.json; prisma/seed.ts; prisma/schema.prisma (Person model only); scripts/verify_integrity.js; docs/Ontology/HCA_Ontology_Specification_1.0.md (Relationship Vocabulary section); .gitignore; next.config.mjs.
Do NOT modify data/seed/*.json. Do not install anything (eslint etc. out of scope). Untracked scripts/seed_batch2.js and seed_batch3.js are local one-offs: add `scripts/seed_batch*.js` to .gitignore, do not touch the files.

Tasks
1. prisma/seed.ts: map Person.civilizationSlug -> civilizationId (seed civilizations first; warn and set null if slug unknown or absent). Keep idempotent. Also upsert `content` etc. as now.
2. scripts/verify_integrity.js: keep its output; add checks (exit code 1 on error): slug format; no duplicate relationships (source,target,type); sourceType/targetType match the entity's real type; birthYear<=deathYear and startYear<=endYear; person.civilizationSlug valid or null. Ontology vocabulary check = WARNING only (list non-ontology relationship types with counts; do not fail), because the vocabulary decision is pending. Add npm script `verify:seed`.
3. package.json: `"postinstall": "prisma generate"`, `"verify:seed"`. Keep existing scripts.
4. .gitattributes: `* text=auto eol=lf`.
5. .github/workflows/ci.yml: on pull_request and push to main; ubuntu-latest, Node 22, `npm ci`, `npx prisma validate` (env DATABASE_URL dummy postgres URL), `npx prisma generate`, `npm run typecheck`, `npm run verify:seed`, `npm run build` with NEXT_TELEMETRY_DISABLED=1 and DATABASE_URL unset. No deploy workflow (Vercel Git integration will deploy; note it in README).
6. README: short "Scripts / CI" section (verify:seed, seed, db:*, CI, Vercel needs DATABASE_URL, run `npm run db:deploy` then `npm run seed` for a new DB).
Gates (report pass/fail): `npm run typecheck`, `npm run verify:seed` (must exit 0 on current data), `DATABASE_URL= NEXT_TELEMETRY_DISABLED=1 npx next build`. Do not commit. Final answer <8 lines.
