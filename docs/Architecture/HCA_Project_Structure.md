# Human Civilization Atlas (HCA)
# Project Structure

```text
human-civilization-atlas/
│
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── public/
│   ├── images/
│   ├── icons/
│   ├── maps/
│   └── favicon.ico
│
├── docs/
│   ├── MasterBlueprint/
│   ├── Ontology/
│   ├── Architecture/
│   └── Prompts/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── timeline/
│   │   ├── civilizations/
│   │   ├── people/
│   │   ├── ideas/
│   │   ├── books/
│   │   ├── graph/
│   │   ├── search/
│   │   ├── api/
│   │   └── about/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── search/
│   │   ├── timeline/
│   │   ├── civilization/
│   │   ├── graph/
│   │   └── ui/
│   │
│   ├── features/
│   ├── lib/
│   ├── services/
│   ├── repositories/
│   ├── types/
│   └── hooks/
│
├── data/
│   ├── seed/
│   └── imports/
│
├── scripts/
│   ├── seed.ts
│   ├── import-openalex.ts
│   ├── import-crossref.ts
│   └── generate-sitemap.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

## Sprint 1
- Homepage
- Timeline Explorer
- 10 Civilizations
- Prisma MVP
- Deploy Vercel

## Sprint 2
- Search
- People
- Books
- Ideas

## Sprint 3
- React Flow Knowledge Graph Lite
- Relationship Explorer

## Sprint 4
- OpenAlex/Crossref ingestion
- Citation system

## Sprint 5
- pgvector
- Semantic Search

## Sprint 6
- Neo4j sync service
- Graph Explorer

## Sprint 7
- GraphRAG
- AI Tutor
