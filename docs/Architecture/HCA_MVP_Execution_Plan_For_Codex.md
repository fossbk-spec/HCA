# HCA MVP Execution Plan For Codex

## Project
Human Civilization Atlas (HCA)

## Objective
Triển khai một phiên bản MVP hoạt động thực tế dựa trên các Master Blueprint đã xây dựng.

Nguyên tắc:
- Ưu tiên sản phẩm chạy được hơn tài liệu.
- Ưu tiên dữ liệu hơn tính năng phức tạp.
- Ưu tiên đơn giản, dễ mở rộng.
- Thiết kế để nâng cấp dần lên Knowledge Graph, GraphRAG và AI Tutor.

---

# 1. MVP SCOPE

## Không triển khai ở giai đoạn đầu

- Neo4j
- GraphRAG
- AI Tutor
- Multi-agent
- Recommendation Engine
- Learning Analytics

## Chỉ triển khai

Core entities:

- Civilization
- Person
- Event
- Idea
- Book

---

# 2. TECH STACK

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js API Routes

## Database

- PostgreSQL
- Prisma ORM

Khuyến nghị:

- Supabase

## Deployment

- GitHub
- Vercel

---

# 3. INITIAL DATASET

## Civilizations (10)

- Mesopotamia
- Ancient Egypt
- Ancient Greece
- Roman Empire
- Ancient India
- Ancient China
- Persian Empire
- Islamic Civilization
- Maya Civilization
- Vietnam

## Knowledge Targets

- 100 Historical Figures
- 200 Events
- 50 Books
- 50 Ideas

Tổng khoảng:

- 400 đến 500 knowledge objects.

---

# 4. MVP SITEMAP

/
/timeline
/civilizations
/civilizations/[slug]
/people
/people/[slug]
/events/[slug]
/ideas/[slug]
/books/[slug]
/search
/about

---

# 5. HOMEPAGE REQUIREMENTS

## Hero

- Search box
- Mission statement
- Quick links

## Timeline Preview

Big Bang
→ Life
→ Humans
→ Agriculture
→ Civilizations
→ Industrial Revolution
→ Internet
→ AI

## Featured Civilizations

Cards for:

- Egypt
- Greece
- Rome
- India
- China

## Featured Ideas

- Democracy
- Science
- Money
- Law
- Printing

---

# 6. TIMELINE EXPLORER

Requirements:

- Horizontal interactive timeline
- Clickable epochs
- Detail panel
- Related entities area

Timeline Phases:

1. Big Bang
2. Origin of Life
3. Human Evolution
4. Agriculture
5. Ancient Civilizations
6. Classical Era
7. Industrial Revolution
8. Information Age
9. AI Age

---

# 7. CIVILIZATION PAGE

Every civilization page must contain:

- Overview
- Timeline
- Geography
- Society
- Economy
- Religion
- Major Achievements
- Important Figures
- Related Books
- References

---

# 8. DATABASE DESIGN

## Tables

civilizations
people
events
ideas
books
references
relationships

### relationships

Fields:

- source_id
- source_type
- target_id
- target_type
- relationship_type

Example:

Einstein
INFLUENCED
Modern Physics

---

# 9. SEARCH

## MVP Search

Keyword search only.

Search across:

- civilizations
- people
- events
- ideas
- books

Later:

- semantic search
- AI search

---

# 10. KNOWLEDGE GRAPH LITE

Do NOT use Neo4j yet.

Use PostgreSQL relationships table.

Visualization:

- React Flow

Example:

Einstein
 ↓
Relativity
 ↓
GPS

---

# 11. CONTENT STANDARD

Every article must include:

1. Summary
2. Historical Context
3. Main Content
4. Historical Significance
5. Legacy
6. References

---

# 12. DATA FORMAT

Example Civilization JSON

{
  "id": "egypt",
  "name": "Ancient Egypt",
  "period": "-3100,-30",
  "region": "Africa",
  "summary": "One of the world's oldest civilizations",
  "tags": ["civilization", "ancient"],
  "sources": []
}

---

# 13. PHASED ROADMAP

## Month 1

- Setup repository
- Setup Next.js
- Setup PostgreSQL
- Setup Prisma
- Import initial dataset

## Month 2

- Timeline Explorer
- Civilization Pages
- Search

## Month 3

- Knowledge Graph Lite
- Maps
- Data Expansion

## Month 4-6

- 500+ entities
- AI Search
- Citation System

## Month 7-12

- Learning Paths
- Contributor Portal
- Public Beta

---

# 14. SUCCESS CRITERIA

MVP considered successful when:

- Website deployed on Vercel
- PostgreSQL operational
- 10 civilizations available
- 100 people available
- Search functional
- Timeline Explorer functional
- At least 500 knowledge objects stored

---

# 15. FUTURE UPGRADE PATH

Phase 2
- Neo4j
- Graph Visualization

Phase 3
- AI Search
- RAG

Phase 4
- GraphRAG
- AI Tutor

Phase 5
- Personal Knowledge Graph
- Adaptive Learning System

END
