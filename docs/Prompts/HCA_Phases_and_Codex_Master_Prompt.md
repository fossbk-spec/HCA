# Human Civilization Atlas (HCA)
# MVP Phases & Codex Master Prompt

## PHASE 0 - Project Setup

### Objectives
- Create GitHub repository
- Initialize Next.js 15 project
- Configure TypeScript, Tailwind CSS, ESLint
- Configure development workflow

### Deliverables
- Repository created
- Local development environment working
- Initial deployment pipeline ready

---

## PHASE 1 - Infrastructure

### Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- PostgreSQL (Supabase)
- Vercel

### Tasks
- Configure Prisma
- Connect PostgreSQL
- Configure environment variables
- Setup Vercel deployment

---

## PHASE 2 - Data Foundation

### Initial Knowledge Domains
- Civilizations
- People
- Events
- Ideas
- Books

### Initial Dataset
- 10 Civilizations
- 100 People
- 200 Events
- 50 Ideas
- 50 Books

---

## PHASE 3 - MVP Pages

### Pages
- /
- /timeline
- /civilizations
- /civilizations/[slug]
- /people
- /people/[slug]
- /ideas
- /ideas/[slug]
- /books
- /books/[slug]
- /search

---

## PHASE 4 - Timeline Explorer

### Timeline Epochs
- Big Bang
- Origin of Life
- Human Evolution
- Agriculture
- Ancient Civilizations
- Classical World
- Industrial Revolution
- Information Age
- AI Age

### Features
- Interactive timeline
- Detail panel
- Related knowledge links

---

## PHASE 5 - Search

### MVP Search
- Civilization search
- People search
- Idea search
- Book search

### Future
- Semantic search
- AI search

---

## PHASE 6 - Knowledge Graph Lite

### Visualization
- React Flow

### Data Model
- Relationship table
- Source entity
- Target entity
- Relationship type

---

## PHASE 7 - Production Ready

### Requirements
- SEO
- Sitemap
- Metadata
- Analytics
- Mobile responsive
- Error handling

---

# MVP SUCCESS CRITERIA

## Content
- 10 Civilizations
- 100 People
- 200 Events
- 50 Ideas
- 50 Books

## Features
- Homepage
- Timeline Explorer
- Civilization Atlas
- Search
- Knowledge Graph Lite

## Deployment
- GitHub
- Supabase
- Vercel

---

# CODEX MASTER PROMPT

You are a senior full-stack architect and software engineer.

Build a production-quality MVP for Human Civilization Atlas (HCA).

## Goals

Create a knowledge platform covering:
- World History
- Civilizations
- Historical Figures
- Great Ideas
- Great Books
- Timeline of Humanity

Future-ready for:
- Knowledge Graph
- Neo4j
- GraphRAG
- AI Tutor

Do NOT implement advanced AI features yet.
Focus on MVP only.

## Tech Stack

Frontend:
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- Next.js Route Handlers

Database:
- PostgreSQL
- Prisma ORM

Hosting:
- Vercel

## Core Models

- Civilization
- Person
- Event
- Idea
- Book
- Relationship

Generate:
- Prisma schema
- Migrations
- Seed scripts
- API routes
- UI components
- Search functionality
- Deployment instructions

## Initial Data

Seed:
- 10 Civilizations
- 20 Historical Figures
- 20 Events
- 20 Ideas
- 20 Books

## Pages

- Homepage
- Timeline Explorer
- Civilization Atlas
- Detail Pages
- Search
- Knowledge Graph Lite

## UI Requirements

Inspiration:
- Britannica
- Our World in Data
- Vercel
- Linear

Requirements:
- Responsive
- Accessible
- SEO friendly

## Knowledge Graph Lite

Use PostgreSQL relationship table.
Do not use Neo4j.

Use React Flow for graph visualization.

## Deliverables

1. Working Next.js project
2. Prisma schema
3. Seed data
4. Timeline Explorer
5. Search Engine
6. Civilization Pages
7. Deployment Guide
8. README.md

## Done Definition

Project is complete when:
- npm install works
- prisma migrate works
- seed works
- project deploys to Vercel
- homepage works
- timeline works
- search works
- graph visualization works

Generate code incrementally by feature branch:

- feature/database
- feature/homepage
- feature/timeline
- feature/civilizations
- feature/search
- feature/graph

Commit after each feature.
