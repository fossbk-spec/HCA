# HCA AGENTS.md Enhancement Pack v1.0

## Purpose

Tài liệu này bổ sung các section còn thiếu cho AGENTS.md nhằm nâng cao khả năng điều phối GitHub Copilot Agent, Claude Code, Codex và Cursor Agent.

Khuyến nghị: chèn trực tiếp các section dưới đây vào cuối AGENTS.md hiện tại, bắt đầu từ Section 11.

---

# 11. ARCHITECTURE GUARDRAILS

The architecture defined by HCA documentation is the source of truth.

Do NOT:

- Replace Next.js with another framework.
- Replace Prisma with another ORM.
- Replace PostgreSQL during MVP.
- Introduce Neo4j during MVP.
- Introduce LangChain during MVP.
- Introduce GraphRAG during MVP.
- Introduce vector databases during MVP.
- Add microservices.
- Add message queues.
- Add Kubernetes infrastructure.

Unless explicitly requested.

Architecture priority:

```text
Simplicity
→ Working MVP
→ Data Growth
→ Search
→ Knowledge Graph
→ GraphRAG
→ AI Tutor
```

Avoid premature optimization.

---

# 12. CURRENT PROJECT STATE

Current Status:

```text
READY FOR DEVELOPMENT
```

Completed:

- Vision
- Blueprint v1-v6
- Ontology Specification
- PRD
- ERD
- API Specification
- Repository Structure
- MVP Dataset
- README
- AGENTS Guide
- Prisma MVP Schema

Not Implemented Yet:

- Database Migration
- Seed Script
- Homepage
- Timeline Explorer
- Civilization Atlas
- Search
- Knowledge Graph Lite
- Deployment

Current Sprint:

```text
Feature 1 - Database Foundation
```

Current Priority:

```text
Working MVP
```

Not:

```text
Production Optimization
```

---

# 13. REPOSITORY STRUCTURE

The project must follow the repository structure defined in:

```text
docs/Architecture/HCA_Project_Structure.md
```

Simplified structure:

```text
src/
├── app/
├── components/
├── features/
├── repositories/
├── services/
├── lib/
├── hooks/
└── types/

prisma/
data/
docs/
tests/
```

Do not create alternative project structures unless requested.

---

# 14. TESTING REQUIREMENTS

Every completed feature must pass:

## TypeScript

```bash
npm run type-check
```

or

```bash
npx tsc --noEmit
```

## Lint

```bash
npm run lint
```

## Production Build

```bash
npm run build
```

## Database Validation

For database changes:

```bash
npx prisma validate
npx prisma generate
```

## Seed Validation

```bash
npm run verify:seed
```

When available.

---

# 15. COMMIT CONVENTIONS

Use conventional commits.

Examples:

```text
feat(database): create prisma schema and initial migration

feat(homepage): implement hero and featured civilizations

feat(timeline): build interactive timeline explorer

feat(search): implement keyword search

feat(graph): add relationship visualization

fix(database): resolve seed import errors

docs(readme): update setup instructions
```

Every feature branch should result in at least one meaningful commit.

---

# 16. PULL REQUEST REQUIREMENTS

Every Pull Request must include:

## Summary

What was implemented.

## Scope

Files changed.

## Validation

Commands executed:

```bash
npm run lint
npm run build
```

## Screenshots

Required for UI changes.

## Notes

Known limitations.

---

# 17. AGENT EXECUTION CONTRACT

Before implementing any feature:

1. Read README.md
2. Read AGENTS.md
3. Read architecture documents
4. Read schema and dataset files
5. Create implementation plan
6. Implement exactly one feature
7. Run validation
8. Create commit
9. Stop

Do NOT:

- Implement multiple roadmap features simultaneously.
- Refactor unrelated features.
- Rewrite project architecture.
- Add technologies outside the approved stack.

---

# 18. FEATURE COMPLETION TEMPLATE

Each completed feature must provide:

## Deliverables

- Files created
- Files modified

## Validation

```bash
npm run lint
npm run build
```

Results.

## Commit Message

Suggested commit message.

## Next Feature

Recommend next roadmap task.

---

# 19. MVP SUCCESS CRITERIA

The MVP is complete when:

### Content

- 10 Civilizations
- 100 People
- 200 Events
- 50 Ideas
- 50 Books

### Features

- Homepage
- Timeline Explorer
- Civilization Atlas
- People Pages
- Idea Pages
- Book Pages
- Search
- Knowledge Graph Lite

### Infrastructure

- PostgreSQL
- Prisma
- Seed Script
- Vercel Deployment

### Quality

- Build succeeds
- Lint succeeds
- Seed validation succeeds

---

# 20. AGENT FINAL INSTRUCTION

The objective is not to create the perfect architecture.

The objective is:

```text
Deploy the first working public MVP
as quickly as possible.
```

Priorities:

```text
Working software
> Perfect architecture

Useful content
> Complex infrastructure

Incremental delivery
> Large rewrites
```

When uncertain, choose the simplest solution that matches the approved architecture and enables progress toward the MVP.

---

END OF AGENTS.md ENHANCEMENT PACK
