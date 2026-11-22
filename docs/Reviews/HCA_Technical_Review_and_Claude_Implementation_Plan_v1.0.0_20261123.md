# HCA Technical Review and Claude Implementation Plan

- **Project:** Human Civilization Atlas (HCA)
- **Repository:** https://github.com/fossbk-spec/HCA
- **Claude Artifact reviewed:** https://claude.ai/artifact/PjcRNc1B2wopEpae9HqZFB
- **Version:** v1.0.0
- **Date:** 2026-11-23
- **Prepared for:** Project owner, Claude reviewer/implementer, Codex reviewer
- **Review baseline:** `main` at `1e859b6e0de9347e68e3ea4cfda6d2efab3e2470`; PR #9 at `065622624defab3e22016268d380b1215d3dba31`

## 1. Executive conclusion

HCA has a sound docs-first foundation, a coherent Next.js/Prisma structure, useful seed data, and a functioning CI pipeline. The Claude Artifact accurately describes most of the repository status. However, HCA is not ready for a public MVP release because live PostgreSQL behavior has not been tested, several navigation targets return 404, references are not connected to knowledge entities, content accuracy has not been reviewed, and PR #9 contains an entity-identity defect that should be fixed before merge.

Current assessment:

| Dimension | Assessment |
|---|---:|
| Repository and documentation | 8/10 |
| Application architecture | 7/10 |
| Feature completeness | 6/10 |
| Database/release readiness | 4/10 |
| Content provenance and review | 3/10 |
| Public-release readiness | 4/10 |

The recommended strategy is to stabilize identity, database, routing, and citations before expanding from 225 toward 500 knowledge objects or implementing Neo4j, GraphRAG, and AI Tutor.

## 2. Findings, ordered by severity

### P0-1 — PR #9 relationship lookup is ambiguous

PR #9 introduces:

```ts
listRelationsFor(slug: string)
```

Both the database and JSON fallback search by slug without requiring an entity type. Prisma makes `slug` unique only within each entity table, not across the entire knowledge graph. If a Person and Event share a slug, their relationships can be mixed.

**Required correction**

```ts
listRelationsFor(entityType: EntityType, slug: string)
```

- Resolve the identity only from the table implied by `entityType`.
- In seed mode, match both slug and source/target type.
- Add tests for duplicate slugs across different entity types.
- Update People now and reuse the typed API for Events, Ideas, Books, and Graph.

**Acceptance criterion:** two entities of different types with the same slug never share or leak relationships.

### P0-2 — Database workflow is not tested end to end

CI validates Prisma, typechecks, verifies JSON seed integrity, and builds with `DATABASE_URL` removed. It does not start PostgreSQL, apply the migration, execute `prisma/seed.ts`, or query the resulting data.

**Required correction**

Add a PostgreSQL service CI job that runs:

```bash
npm ci
npx prisma validate
npm run db:deploy
npm run seed
npm run typecheck
npm run verify:seed
npm run build
```

Add a smoke assertion for entity counts and at least one relationship query.

**Acceptance criterion:** migration, seed and representative database reads pass against a clean PostgreSQL instance.

### P0-3 — Production fallback can hide database failure

Repositories catch database errors and silently serve JSON seed data. This is convenient for local development but can hide production outages and return stale content.

**Required correction**

- Introduce `ALLOW_SEED_FALLBACK`.
- Permit fallback by default only outside production.
- In production, fail visibly and emit structured logs when PostgreSQL is unavailable.
- Do not include credentials or full database errors in user responses.

**Acceptance criterion:** production never silently switches to seed data unless explicitly configured.

### P1-1 — Existing UI contains dead links

The current UI links to routes that are not present, including Ideas, Books, Search, About, and Event detail pages. Timeline event links therefore return 404.

**Required correction:** finish People, Ideas, Books, Events and Search before public deployment, or hide unfinished links in a temporary private preview.

### P1-2 — References cannot be attached to content entities

The Prisma `Reference` model exists but has no relation to Civilization, Person, Event, Idea, Book, or individual claims. This prevents the product from meeting the content and references requirements in the Execution Plan.

**Required correction**

Add at minimum:

```text
Source
EntitySource
  entityType
  entityId
  sourceId
  locator
  note
  verificationStatus
```

Prefer neutral names such as `Source` and `EntitySource`. Preserve a future path to claim-level provenance without implementing a full claim graph in the MVP.

**Acceptance criterion:** every published seed article can show its sources and review status.

### P1-3 — Timeline preview fallback is inconsistent

`listTimeline()` reads seed events when no database exists, while `listTimelinePreview()` includes events only when `DATABASE_URL` is present. The homepage preview therefore loses events in seed mode.

**Required correction:** use the same event source selection logic for the full timeline and preview.

### P1-4 — Historical content has not been fact-checked

The integrity script checks structure and links, not historical accuracy, balance, interpretation, quotation rights, or source quality.

**Required correction:** add editorial states such as `draft`, `reviewed`, and `published`; establish source and review requirements before public release.

### P2-1 — MVP progress needs two denominators

The PRD uses a 500-object success criterion. The explicit initial allocation is 10 civilizations + 100 people + 200 events + 50 books + 50 ideas = 410 objects.

Report both:

- `225 / 410 = 54.9%` against the explicit allocation.
- `225 / 500 = 45%` against the PRD success threshold.

Do not treat entity count as the only content KPI. Also report source coverage, fact-check status, graph connectivity, temporal/geographical balance, and broken links.

### P2-2 — Person-to-civilization is too restrictive

`Person.civilizationId` supports only one civilization. Many people belong to multiple regions, polities, intellectual traditions, or periods. “Other” is not a durable classification for Newton, Darwin, Einstein, Turing, or Leonardo da Vinci.

For the MVP, keep the nullable field if required for speed, but document it as a temporary primary association. Plan a many-to-many association with typed roles such as `BORN_IN`, `WORKED_IN`, `CITIZEN_OF`, and `ASSOCIATED_WITH`.

### P2-3 — Reusable relation UI is coupled to People

`RelationList` imports `RelationGroup` from `services/people`. Move the shared type to a neutral relationship module so Ideas, Books, Events and Graph do not depend on the People service.

### P2-4 — Licensing is incomplete

“Educational and research use” is not a standard open-source or open-content license.

Recommended split:

- Software: MIT or Apache-2.0.
- Original knowledge content: CC BY 4.0 or CC BY-SA 4.0.
- Third-party images and datasets: record their licenses individually.

## 3. Review of the Claude Artifact

### Accurate and useful

The Artifact correctly identifies:

- `main` and PR #9 status at the reviewed snapshot.
- 225 seed entities and 144 relationships.
- 53 entities with no relationship.
- The difference between schema/migration availability and a working PostgreSQL database.
- The incomplete 5-epoch timeline versus the required 9 phases.
- Dead Event links and missing Ideas, Books, Search, Graph and About routes.
- Homepage featured content that differs from the Execution Plan.
- Vercel plus external PostgreSQL as the lower-risk MVP hosting path.
- The need to delay Neo4j, GraphRAG, AI Tutor and recommendation features.

### Required Artifact corrections

Claude should update its status report to include:

1. The typed identity defect in PR #9.
2. The missing entity-to-reference model.
3. The 410 allocation and 500 PRD threshold as separate progress measures.
4. The inconsistent Timeline Preview fallback.
5. Production seed fallback as a release blocker.
6. The distinction between static fallback CI and database integration CI.
7. Content-quality KPIs in addition to entity count.
8. PR #9 should not be merged unchanged even though it is clean and CI is green.

Overall Artifact assessment: **8/10** for project-status verification, with an additional architecture and data-provenance pass required.

## 4. Recommended implementation sequence

### Sprint 0 — Stabilization, 1–2 working days

Branch or PR scope:

1. Update PR #9 to use typed entity identity.
2. Decouple shared relationship types from the People service.
3. Add duplicate-cross-type-slug tests.
4. Add PostgreSQL integration CI.
5. Introduce explicit seed fallback configuration.
6. Run migration and seed against staging PostgreSQL.

Gate: do not merge PR #9 until all six items pass.

### Sprint 1 — Close user-facing gaps, 3–5 working days

Implement sequentially:

1. People
2. Ideas
3. Books
4. Events
5. Search across all five entity types
6. Automated internal-link checking

Gate: no navigation or timeline links return 404.

### Sprint 2 — Sources and canonical timeline, 3–5 working days

1. Add Source/EntitySource schema and migration.
2. Add sources to all ten civilization articles.
3. Restore Big Bang, Origin of Life and Human Evolution.
4. Add Internet and AI milestones.
5. Add Money and Printing.
6. Implement the nine timeline phases and Related Entities.
7. Correct homepage featured selections.
8. Add editorial review states.

Gate: core articles display sources and the canonical timeline spans Big Bang to AI.

### Sprint 3 — MVP completion, 3–4 working days

1. Knowledge Graph Lite.
2. About page.
3. SEO metadata, sitemap and robots policy.
4. Accessibility and mobile QA.
5. Performance and broken-link QA.
6. Private Vercel preview, staging validation, then production release.

Gate: all PRD MVP routes work, PostgreSQL is operational, sources display, and release checks pass.

## 5. Decisions recommended to the project owner

1. Do not merge PR #9 unchanged; require typed entity identity.
2. Use Vercel + Supabase PostgreSQL for the MVP; Cloudflare may provide DNS/CDN later.
3. Disable silent seed fallback in production.
4. Prioritize references and fact-checking before bulk expansion toward 500 entities.
5. Implement Search before Knowledge Graph Lite.
6. Defer Neo4j, GraphRAG, AI Tutor and recommendation features.
7. Adopt explicit code and content licenses.

## 6. Claude execution contract

### Role

Act as the senior reviewer and implementation owner for the HCA stabilization and MVP-completion work. Verify the repository state again before making changes because the branch state may have changed after this document was created.

### Required first actions

1. Read `AGENTS.md` and the current PRD, Execution Plan, schema, ontology and decision records.
2. Fetch current `main`, open PRs and CI status.
3. Compare current PR #9 with the P0 findings above.
4. Produce a short implementation checklist tied to exact branches and acceptance tests.
5. Begin with Sprint 0; do not start bulk content generation or Graph work.

### Implementation rules

- Work in narrowly scoped branches and PRs.
- Preserve ontology 1.1 unless an explicit versioned decision updates it.
- Do not expose or commit secrets.
- Do not weaken TypeScript, Prisma validation, CI, or seed-integrity checks.
- Do not silently catch production database failure.
- Do not change hosting architecture away from Vercel/PostgreSQL without project-owner approval.
- Do not add Neo4j, GraphRAG, AI Tutor or agents during this task.
- Do not claim historical accuracy without source review.
- Use reviewable migrations and document rollback considerations.

### Required tests

- `npm ci`
- `npx prisma validate`
- clean PostgreSQL `prisma migrate deploy`
- seed execution and count assertions
- `npm run typecheck`
- `npm run verify:seed`
- production build
- route/link smoke tests
- relationship collision test using the same slug across two entity types
- production behavior test with database unavailable and fallback disabled

### Reporting format after each PR

Report:

1. Branch and PR URL.
2. Findings resolved.
3. Files changed.
4. Commands/tests run and their results.
5. Known limitations or follow-up work.
6. Whether the PR is safe to merge.

### Stop conditions

Stop and request project-owner input before:

- Changing ontology semantics.
- Choosing or creating a paid service.
- Changing production access or public deployment.
- Replacing PostgreSQL/Prisma or Vercel.
- Selecting the final code/content license when the owner has not approved it.

## 7. Definition of MVP ready for public release

The HCA MVP is release-ready only when:

- PostgreSQL migration and seed succeed from a clean environment.
- Production does not silently fall back to seed data.
- All sitemap routes and navigation links work.
- Search covers civilizations, people, events, ideas and books.
- Timeline covers the agreed nine phases and has no Event 404 links.
- Every core published article has sources and a review state.
- Relationship lookup is entity-type safe.
- CI covers both seed/static and live-database paths.
- Accessibility, mobile, SEO and broken-link checks pass.
- Licensing is explicit.
- A private/staging deployment has been reviewed before public release.

## 8. Source documents reviewed

- `README.md`
- `AGENTS.md`
- `docs/Architecture/HCA_PRD_v1.0.md`
- `docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md`
- `docs/Reviews/HCA_Claude_Review_of_Progress_Report_2026-11-23_v1.0.md`
- `docs/Reviews/HCA_Hosting_and_Next_Steps_Proposal_2026-11-23_v1.0.md`
- `prisma/schema.prisma`
- `.github/workflows/ci.yml`
- repositories and timeline/search components on `main`
- PR #9 diff and successful workflow run at its reviewed head
- Claude Artifact `PjcRNc1B2wopEpae9HqZFB`

---

**Immediate instruction to Claude:** Re-verify the current repository, amend PR #9 for typed relationship identity and neutral shared types, add the missing tests, and report whether it is safe to merge. Then implement Sprint 0 in separate reviewable changes. Do not merge or deploy without the project owner's explicit instruction.
