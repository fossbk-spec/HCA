# S0-A Typed entity identity for relationships (branch fix/typed-relations)
Source: docs/Reviews/HCA_Technical_Review_and_Claude_Implementation_Plan_v1.0.0_20261123.md (P0-1, P2-3) on branch docs/hca-technical-review-20261123 — the findings are restated here; do not read other docs.
Read only: src/repositories/relationships.ts; src/services/{people,ideas,books,events}.ts; src/components/entity/RelationList.tsx; prisma/schema.prisma (Relationship, EntityType); package.json; .github/workflows/ci.yml; tsconfig.json.
Do NOT modify data/ or docs/. Do not install anything (use node:test via tsx, already installed).

Problem: `listRelationsFor(slug)` resolves identity by slug alone across all five tables and, in seed mode, matches source/target by slug only. Slugs are unique per table, not globally, so a Person and an Event with the same slug would mix relationships. Also RelationGroup is defined in services/people and imported by other services/components.

Tasks
1. Change the API to `listRelationsFor(entityType: EntityType, slug: string)`.
   - DB path: look up the id only in the table implied by entityType; relation rows are those with (sourceId = id AND sourceType = entityType) OR (targetId = id AND targetType = entityType). Keep batch resolution of the other side (no N+1).
   - Seed path: a relation matches only when (sourceSlug = slug AND sourceType = entityType) OR (targetSlug = slug AND targetType = entityType); titles resolved by `${type}:${slug}`.
   - Put the seed matching in a PURE function in a new module with no prisma import, e.g. src/repositories/relationship-matching.ts: `matchSeedRelations(entityType, slug, relationships, titlesByKey)`; relationships.ts calls it. Export it for tests.
2. Neutral shared types: create src/types/relationships.ts with `Relation`, `RelationGroup`, and re-export what is needed; remove RelationGroup from services/people and update all imports (services, RelationList).
3. Remove the four copy-pasted grouping loops: add src/services/relations.ts `groupRelations(relations: Relation[]): RelationGroup[]` (group by relationLabel, sort items by title) and use it in people/ideas/books/events services. Each service calls `listRelationsFor("PERSON"|"IDEA"|"BOOK"|"EVENT", slug)`.
4. Tests (node:test, no new dependency): add `"test": "node --import tsx --test tests/unit/*.test.ts"` to package.json and tests/unit/relationship-matching.test.ts covering: (a) a Person and an Event with the SAME slug each get only their own relations; (b) a Person slug equal to an Idea slug in the target position does not leak; (c) direction out/in correct; (d) unknown slug returns []; (e) groupRelations groups and sorts. Use small inline fixtures, not data/seed.
5. CI: add `npm test` step to .github/workflows/ci.yml after typecheck (keep every other step).
Gates (report pass/fail): `npm test`, `npm run typecheck`, `npm run verify:seed`, `DATABASE_URL= NEXT_TELEMETRY_DISABLED=1 npm run build`. Do not commit, do not push. Final answer <8 lines.
