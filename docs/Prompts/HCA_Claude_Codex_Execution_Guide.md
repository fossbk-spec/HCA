# Human Civilization Atlas (HCA)
# Claude & Codex Execution Guide

## Purpose

Tài liệu này hướng dẫn Claude, Codex, GitHub Copilot Agent hoặc Cursor Agent thực hiện dự án Human Civilization Atlas (HCA) dựa trên toàn bộ tài liệu đã được chuẩn bị.

Mục tiêu:

- Không thiết kế lại kiến trúc.
- Không thay đổi ontology cốt lõi.
- Thực hiện MVP nhanh nhất có thể.
- Giữ khả năng nâng cấp lên Neo4j, GraphRAG và AI Tutor.

---

# 1. PROJECT STATUS

Current Status:

READY FOR DEVELOPMENT

Đã hoàn thành:

- Master Blueprint v1-v6
- Ontology Specification
- PRD
- ERD
- API Specification
- MVP Execution Plan
- Repository Structure
- Prisma Schema MVP
- Prisma Schema Production
- Seed Dataset v1.0
- README

Không tạo thêm tài liệu chiến lược.

Bắt đầu coding.

---

# 2. SOURCE DOCUMENTS

Đọc và sử dụng các tài liệu theo thứ tự:

1. README_HCA_Repository.md
2. HCA_MVP_Execution_Plan_For_Codex.md
3. HCA_Project_Structure.md
4. HCA_PRD_v1.0.md
5. HCA_ERD_v1.0.md
6. HCA_API_Spec_v1.0.md
7. HCA_Prisma_Schema_MVP.prisma
8. HCA_MVP_Dataset_Seed_v1.0.md
9. HCA_Ontology_Specification_1.0.md

Chỉ tham khảo Blueprint v1-v6 khi cần bối cảnh.

---

# 3. MVP SCOPE

Triển khai:

- Homepage
- Timeline Explorer
- Civilization Atlas
- People Pages
- Idea Pages
- Book Pages
- Search
- Knowledge Graph Lite

Không triển khai:

- Neo4j
- GraphRAG
- AI Tutor
- Agents
- Recommendation Engine
- Learning Analytics

---

# 4. REQUIRED STACK

Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend
- Next.js Route Handlers

Database
- PostgreSQL
- Prisma

Hosting
- Vercel

Optional
- React Flow

---

# 5. IMPLEMENTATION ORDER

## Feature 1
Database Layer

Tasks:
- Configure Prisma
- Create schema
- Create migration
- Create seed script

Deliverable:
- Working PostgreSQL database

---

## Feature 2
Homepage

Route:
/

Include:
- Hero
- Search
- Timeline Preview
- Featured Civilizations
- Featured Ideas

---

## Feature 3
Timeline Explorer

Route:
/timeline

Include:
- Horizontal timeline
- Detail panel
- Epoch navigation

---

## Feature 4
Civilization Atlas

Routes:
/civilizations
/civilizations/[slug]

---

## Feature 5
People

Routes:
/people
/people/[slug]

---

## Feature 6
Ideas

Routes:
/ideas
/ideas/[slug]

---

## Feature 7
Books

Routes:
/books
/books/[slug]

---

## Feature 8
Search

Route:
/search

Search Across:
- civilizations
- people
- books
- ideas

---

## Feature 9
Knowledge Graph Lite

Use:
- React Flow

Data:
- relationships table

---

# 6. BRANCH STRATEGY

feature/database
feature/homepage
feature/timeline
feature/civilizations
feature/people
feature/ideas
feature/books
feature/search
feature/graph

Merge sequentially.

---

# 7. CODING RULES

- Use Server Components by default.
- Use TypeScript strict mode.
- Avoid premature optimization.
- Keep components reusable.
- Create service layer.
- Create repository layer.
- Use Prisma for data access.

---

# 8. DONE DEFINITION

Project is considered complete when:

- npm install works
- Prisma migration works
- Seed script works
- Vercel deployment works
- Homepage renders
- Timeline Explorer works
- Civilization pages work
- Search works
- Knowledge Graph Lite works

---

# 9. FUTURE UPGRADE PATH

Phase 2
- PostgreSQL optimization
- 500+ entities

Phase 3
- Semantic Search
- pgvector

Phase 4
- Neo4j synchronization

Phase 5
- GraphRAG

Phase 6
- AI Tutor

---

# 10. EXECUTION INSTRUCTION

Before coding:

1. Read README.
2. Read MVP Execution Plan.
3. Read Project Structure.
4. Implement database first.
5. Start Feature 1.

Never attempt to generate the entire project in a single step.

Generate and validate one feature at a time.

Commit after every feature.

END OF GUIDE
