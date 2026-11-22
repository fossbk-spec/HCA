# Human Civilization Atlas (HCA)

## Overview

Human Civilization Atlas (HCA) is an open knowledge platform designed to help learners understand the history of humanity through civilizations, historical figures, major events, great ideas, and influential books.

The MVP focuses on:

- Civilization Atlas
- Timeline Explorer
- Historical Figures
- Great Ideas
- Great Books
- Search
- Knowledge Graph Lite

Future versions will support:

- Neo4j Knowledge Graph
- AI Search
- GraphRAG
- AI Tutor
- Learning Paths
- Recommendation Engine

---

## Tech Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Server Components

### Backend

- Next.js Route Handlers

### Database

- PostgreSQL
- Prisma ORM

### Hosting

- Vercel

---

## Project Structure

```text
src/
├── app/
├── components/
├── features/
├── services/
├── lib/
├── hooks/
├── types/
├── data/
└── styles/
```

---

## MVP Features

### Homepage

- Hero section
- Search box
- Featured civilizations
- Featured ideas
- Timeline preview

### Timeline Explorer

- Interactive timeline
- Epoch navigation
- Historical context panel

### Civilization Atlas

- Civilization list
- Civilization detail pages
- Achievements
- Historical figures

### Search

- Keyword search across entities

### Knowledge Graph Lite

- Relationship visualization using React Flow

---

## Initial Dataset

### Civilizations

1. Mesopotamia
2. Ancient Egypt
3. Ancient Greece
4. Roman Empire
5. Ancient India
6. Ancient China
7. Persian Empire
8. Islamic Civilization
9. Maya Civilization
10. Vietnam

### Knowledge Targets

- 100 People
- 200 Events
- 50 Ideas
- 50 Books

---

## Local Development

### Install

```bash
npm install
```

### Environment

Create .env:

```env
DATABASE_URL=
```

### Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### Seed

```bash
npm run seed
```

### Run

```bash
npm run dev
```

---

## Deployment

### Vercel

```bash
vercel
```

Required:

- GitHub repository
- Vercel project
- Supabase PostgreSQL database

---

## Roadmap

### Phase 1

- MVP Website
- Timeline Explorer
- Search

### Phase 2

- 500+ Knowledge Objects
- Maps
- Knowledge Graph Lite

### Phase 3

- Semantic Search
- AI Search

### Phase 4

- Neo4j
- GraphRAG
- AI Tutor

---

## Documentation

Refer to:

- Master Blueprint v1-v6
- HCA Ontology Specification
- HCA PRD
- HCA ERD
- HCA API Specification
- HCA Prisma Schema
- HCA MVP Execution Plan

---

## License

Educational and research use.

Project status: MVP Development.

---

## Repository layout (docs-first scaffold)

| Path | Content |
|---|---|
| `AGENTS.md` | Execution guide for coding agents (copy of `docs/Prompts/HCA_Claude_Codex_Execution_Guide.md`) |
| `docs/Architecture/` | PRD, ERD, API spec, MVP execution plan, project structure, seed spec |
| `docs/Ontology/` | Ontology specification |
| `docs/MasterBlueprint/` | Blueprints v1–v6 (context only) |
| `docs/Prisma/` | Prisma schema history (MVP, v1–v3 production) |
| `docs/Prompts/` | Codex master prompt and guides |
| `prisma/schema.prisma` | MVP schema (from `docs/Prisma/HCA_Prisma_Schema_MVP.prisma`) |
| `data/seed/` | Seed dataset v1.0 (JSON) |

Next step: Feature 1 (database layer) per `AGENTS.md`, one feature per branch.
