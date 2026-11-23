# Human Civilization Atlas (HCA)
# Claude & Codex Execution Guide

- Phiên bản: 2.0 (2026-11-23). Thay thế bản 1.x; đã gộp "AGENTS.md Enhancement Pack v1.0" sau khi chỉnh theo thực tế repo (xem `docs/Reviews/HCA_AGENTS_Enhancement_Pack_Review_2026-11-23_v1.0.md`).

## Purpose

Hướng dẫn Claude, Codex, Gemini, GitHub Copilot Agent hoặc Cursor Agent thực hiện dự án Human Civilization Atlas (HCA).

Mục tiêu:

- Không thiết kế lại kiến trúc.
- Không thay đổi ontology cốt lõi (chỉ chủ dự án được nâng phiên bản ontology).
- Thực hiện MVP nhanh nhất có thể.
- Giữ khả năng nâng cấp lên Neo4j, GraphRAG và AI Tutor.

---

# 1. PROJECT STATUS

Trạng thái chi tiết được cập nhật ở **mục 12**. Mục này giữ lại để tương thích.

Không tạo thêm tài liệu chiến lược. Tài liệu review, quyết định và đề xuất nằm trong `docs/Reviews/`.

---

# 2. SOURCE DOCUMENTS

Danh mục tài liệu nguồn theo thứ tự ưu tiên (đường dẫn trong repo). Với task có brief, áp dụng giới hạn đọc ở mục 10; không cần đọc toàn bộ danh mục:

1. `README.md`
2. `docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md`
3. `docs/Architecture/HCA_Project_Structure.md`
4. `docs/Architecture/HCA_PRD_v1.0.md`
5. `docs/Architecture/HCA_ERD_v1.0.md`
6. `docs/Architecture/HCA_API_Spec_v1.0.md`
7. `prisma/schema.prisma` (bản gốc: `docs/Prisma/HCA_Prisma_Schema_MVP.prisma`)
8. `docs/Architecture/HCA_MVP_Dataset_Seed_v1.0.md` và `data/seed/*.json`
9. `docs/Ontology/HCA_Ontology_Specification_1.1.md` (thay phần Relationship Vocabulary của 1.0) và `data/ontology/relationship-types.json`
10. `docs/Reviews/HCA_Decisions_2026-11-23.md` (các quyết định đã chốt)

Chỉ tham khảo `docs/MasterBlueprint/` khi cần bối cảnh.

---

# 3. MVP SCOPE

Triển khai:

- Homepage
- Timeline Explorer
- Civilization Atlas
- People Pages
- Idea Pages
- Book Pages
- Event Pages (`/events/[slug]`, có trong sitemap của Execution Plan)
- Search (5 loại: civilizations, people, events, ideas, books)
- Knowledge Graph Lite
- `/about`

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
- TypeScript 5 (Next 15 chưa dùng được TypeScript 7; đã ghim bản 5)
- Tailwind CSS 4
- shadcn/ui kiểu viết tay (không có `components.json`)

Backend
- Next.js Route Handlers

Database
- PostgreSQL
- Prisma 6

Hosting
- Vercel (đã chốt hướng B: Vercel + PostgreSQL ngoài như Neon hoặc Supabase; Cloudflare chỉ làm DNS/CDN. Xem `docs/Reviews/HCA_Hosting_and_Next_Steps_Proposal_2026-11-23_v1.0.md`)

Optional
- React Flow

---

# 5. IMPLEMENTATION ORDER

| # | Feature | Routes | Trạng thái (2026-11-23) |
|---|---|---|---|
| F1 | Database Layer | – | Xong trên CI: migration, seed hai lần và `db:smoke` chạy trên PostgreSQL 16 (job `integration`); **chưa có DB production** |
| F2 | Homepage | `/` | Xong; Featured chưa theo Plan §5 |
| F3 | Timeline Explorer | `/timeline` | Một phần: 5 epoch, cần 9 giai đoạn |
| F4 | Civilization Atlas | `/civilizations`, `/civilizations/[slug]` | Một phần: thiếu Related Books, References |
| F5 | People | `/people`, `/people/[slug]` | Xong (PR #9) |
| F6 | Ideas | `/ideas`, `/ideas/[slug]` | Xong (PR #10) |
| F7 | Books | `/books`, `/books/[slug]` | Xong (PR #10) |
| – | Events | `/events`, `/events/[slug]` | Xong (PR #10) |
| F8 | Search | `/search`, `/api/search` | Xong (PR #13); đường DB đọc hết dòng rồi xếp hạng ở phía ứng dụng, cần tối ưu khi dữ liệu lớn |
| F9 | Knowledge Graph Lite | `/graph` | Chưa làm (có thể dùng React Flow, bảng quan hệ) |
| – | About | `/about` | Chưa làm |

Các trang ưu tiên Server Components; mỗi feature dùng repository (Prisma, có fallback đọc `data/seed` khi không có DB) và service layer.

---

# 6. BRANCH STRATEGY

Một feature một nhánh, merge tuần tự vào `main` bằng squash qua Pull Request.

Tiền tố nhánh:

- `feature/<tên>`: tính năng (`feature/database`, `feature/homepage`, `feature/timeline`, `feature/civilizations`, `feature/people`, `feature/entity-pages`, `feature/search`, `feature/graph`)
- `chore/<tên>`: hạ tầng, CI, dọn dẹp
- `data/<tên>`: dữ liệu seed
- `docs/<tên>`: tài liệu

Không ghi trực tiếp vào thư mục làm việc của `main`; luôn tạo nhánh.

---

# 7. CODING RULES

- Use Server Components by default.
- Use TypeScript strict mode.
- Avoid premature optimization.
- Keep components reusable.
- Create service layer and repository layer.
- Use Prisma for data access, luôn qua `withDatabase` (`src/lib/seed-fallback.ts`). Fallback đọc `data/seed/*.json` mặc định bật khi chạy local và tắt ở production; đặt `ALLOW_SEED_FALLBACK=true` hoặc `false` để chỉ định rõ. Production không có DB thì `next build` lỗi (cố ý). Chủ dự án vẫn cần xác nhận cách đặt biến này khi deploy.
- Quan hệ định danh theo `entityType + slug` (slug chỉ duy nhất trong từng bảng): `listRelationsFor(entityType, slug)`.
- Mỗi trang chỉ có một `<h1>`; `layout.tsx` đã cung cấp `<main>`, các trang không được render `<main>` nữa.
- Không sửa `data/` và `docs/` trừ khi task nói rõ.

---

# 8. DONE DEFINITION

Project is considered complete when the criteria in mục 19 are met, including:

- npm install works
- Prisma migration works trên PostgreSQL thật
- Seed script works trên PostgreSQL thật
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

1. Read `README.md` and this file.
2. Read the task brief in `briefs/` (nếu có).
3. Ngoài `README.md`, `AGENTS.md` và brief, chỉ đọc các file brief nêu.
4. Implement exactly one feature.

Never attempt to generate the entire project in a single step. Generate and validate one feature at a time.

---

# 11. ARCHITECTURE GUARDRAILS

The architecture defined by HCA documentation is the source of truth.

Do NOT, unless the project owner explicitly requests it:

- Replace Next.js with another framework.
- Replace Prisma with another ORM.
- Replace PostgreSQL during MVP (D1/SQLite bị loại).
- Introduce Neo4j, LangChain, GraphRAG or a vector database during MVP.
- Add microservices, message queues or Kubernetes.
- Change the hosting target (Vercel) or move to Cloudflare Workers.
- Change the ontology (vocabulary is in `HCA_Ontology_Specification_1.1.md`; new relationship types require a new ontology version approved by the owner).

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

Cập nhật: 2026-11-23, `main` sau PR #17.

```text
MVP DEVELOPMENT IN PROGRESS
```

Đã có:

- Tài liệu: Blueprint v1–v6, Ontology 1.0 + 1.1, PRD, ERD, API Spec, Execution Plan, review và quyết định (`docs/Reviews/`)
- F1 (đã kiểm trên PostgreSQL 16 ở CI), F2, F3, F4, F5, F6, F7, F8, Events
- Seed: 269 thực thể (10 civilizations, 100 people, 57 events, 50 ideas, 52 books), 235 quan hệ (45 loại đang dùng trong 55 loại của ontology 1.1)
- CI GitHub Actions (`.github/workflows/ci.yml`): job `verify` (typecheck, test, verify:seed, build không DB) và job `integration` (PostgreSQL 16: migrate, seed hai lần, `db:smoke`, test, build)
- Unit test (`npm test`, `node:test` + `tsx`) trong `tests/unit/`
- Chính sách seed fallback (`ALLOW_SEED_FALLBACK`, mục 7)

Chưa có:

- F9 Knowledge Graph Lite, `/about`
- Timeline 9 giai đoạn; Featured đúng Plan; Related Books và References trên trang nền văn minh
- PostgreSQL production, project Vercel, quy trình `migrate deploy` trên production
- Lint (ESLint chưa cấu hình)
- Kiểm tra trình duyệt mốc M1 (mục 21)

Vấn đề dữ liệu mở: 4/269 thực thể chưa có quan hệ (3 events, 1 book); seed thiếu Big Bang, Origin of Life, Human Evolution và sự kiện sau 1760; nội dung `content` chưa kiểm độ chính xác lịch sử (batch 4, PR #17, chưa có người kiểm).

Current priority: **Working MVP**, not production optimization.

---

# 13. REPOSITORY STRUCTURE

Cấu trúc theo `docs/Architecture/HCA_Project_Structure.md`. Thực tế hiện có:

```text
src/
├── app/            (routes, route handlers)
├── components/
├── repositories/
├── services/
├── types/
└── lib/
tests/unit/         (npm test)
prisma/
data/               (seed/, ontology/)
docs/
briefs/             (brief giao việc cho agent)
scripts/            (verify_integrity.js, db-smoke.ts)
.github/workflows/
```

Thư mục `features/`, `hooks/` có trong cấu trúc mục tiêu; chỉ tạo khi cần. Không tạo cấu trúc thay thế.

---

# 14. TESTING REQUIREMENTS

Mỗi task mã nguồn phải qua các kiểm tra phù hợp (đúng tên script trong `package.json`):

```bash
npm run typecheck          # tsc --noEmit
npm test                   # unit test (node:test)
npm run verify:seed        # khi đụng dữ liệu, ontology hoặc seed.ts
npm run build              # chạy với DATABASE_URL trống để chắc fallback hoạt động
npx prisma validate        # khi đụng schema
npx prisma generate
npm run db:smoke           # khi đụng DB, seed hoặc repository; cần DATABASE_URL đã migrate và seed (CI job `integration` chạy sẵn)
```

`npm run lint` chỉ bắt buộc sau khi ESLint được cấu hình (chưa có). Task chỉ sửa tài liệu kiểm tra nội dung và đường dẫn, không cần chạy các lệnh build. CI chạy các lệnh trên cho mọi Pull Request, kể cả khi local chỉ cần các lệnh có điều kiện.

---

# 15. COMMIT CONVENTIONS

Dùng conventional commits:

```text
feat(search): implement keyword search across five entity types
fix(database): resolve seed import errors
chore(ci): ...
docs(reviews): ...
data(seed): ...
```

Không ghi công công cụ AI trong commit, PR hay tài liệu (không `Co-Authored-By` cho Claude/Codex/Gemini).

Trong quy trình hiện tại, **Codex không commit, không push, không merge**; Claude commit, tạo PR và merge sau khi review và CI xanh.

---

# 16. PULL REQUEST REQUIREMENTS

Mỗi PR có:

- **Summary:** đã làm gì.
- **Scope:** các route/file chính.
- **Validation:** lệnh đã chạy và kết quả (typecheck, verify:seed, build, CI).
- **Screenshots:** chỉ khi có kiểm tra trình duyệt (xem mục 21); các agent không chạy trình duyệt trong từng task.
- **Notes:** hạn chế đã biết.

---

# 17. AGENT EXECUTION CONTRACT

1. Đọc `README.md`, `AGENTS.md` và đúng các file brief nêu.
2. Thực hiện đúng một feature hoặc một task.
3. Chạy các lệnh kiểm tra ở mục 14.
4. Báo kết quả ngắn gọn (files đổi, kết quả kiểm, vấn đề phát sinh).
5. Dừng. Không commit, không push, không merge (trừ khi được giao).

Do NOT:

- Implement multiple roadmap features simultaneously.
- Refactor unrelated features.
- Rewrite project architecture.
- Add technologies outside the approved stack (không tự cài gói; cần gói mới thì báo lại).
- Sửa `data/seed/*.json` khi task không phải task dữ liệu.
- Chạy trình duyệt hoặc dev server trong task (kiểm tra trình duyệt do Claude hoặc người thực hiện tại mốc).

Phân vai: Claude viết brief, review, kiểm lại gate, commit/PR/merge; Codex viết mã ứng dụng; Gemini làm dữ liệu seed và tài liệu nghiên cứu (trên nhánh `data/*` hoặc `docs/*`, không ghi vào `main`).

---

# 18. FEATURE COMPLETION TEMPLATE

Mỗi task hoàn thành báo:

- **Deliverables:** file tạo mới, file sửa.
- **Validation:** kết quả các lệnh ở mục 14.
- **Notes:** hạn chế, việc chưa làm.
- **Next:** đề xuất task tiếp theo.

---

# 19. MVP SUCCESS CRITERIA

Hai nguồn đang lệch nhau: Execution Plan §14 và PRD đặt mục tiêu **≥ 500 đối tượng tri thức** và 100 nhân vật; bản Enhancement Pack liệt kê 10 / 100 / 200 / 50 / 50 (= 410). Dùng mốc sau:

### Content

- 10 Civilizations (đạt)
- 100 People (đạt, 100)
- 200 Events (hiện 57)
- 50 Ideas (đạt, 50)
- 50 Books (đạt, 52)
- Tổng ≥ 500 đối tượng (hiện 269); mọi thực thể có ít nhất một quan hệ (hiện còn 4 chưa có)

### Features

- Homepage, Timeline Explorer, Civilization Atlas, People, Ideas, Books, Events, Search, Knowledge Graph Lite, About

### Infrastructure

- PostgreSQL, Prisma, Seed Script chạy trên DB thật
- Vercel Deployment
- CI xanh

### Quality

- Build succeeds
- `verify:seed` succeeds
- Kiểm tra trình duyệt đạt ở mốc cuối (mục 21)

---

# 20. AGENT FINAL INSTRUCTION

The objective is not to create the perfect architecture. The objective is:

```text
Deploy the first working public MVP
as quickly as possible.
```

```text
Working software > Perfect architecture
Useful content   > Complex infrastructure
Incremental delivery > Large rewrites
```

When uncertain, choose the simplest solution that matches the approved architecture and enables progress toward the MVP.

---

# 21. BROWSER QA MILESTONES

Kiểm tra trình duyệt chỉ tại mốc, không cho từng PR:

- **M1: sau F8 Search.** Mở `/`, `/timeline`, `/civilizations`, một `/civilizations/[slug]`, `/people`, một `/people/[slug]`, `/ideas`, `/books`, `/events`, `/search` ở độ rộng điện thoại (~400px) và máy tính. Kiểm: link chết, bố cục vỡ, chữ tràn, tìm kiếm trả kết quả đúng loại, điều hướng bàn phím.
- **M2: sau F9 Graph và khi đã có DB thật.** Lặp lại kiểm tra trên bản deploy.

Người kiểm (Claude với Playwright hoặc con người) ghi kết quả vào `docs/Reviews/` và chuyển lỗi FAIL thành task cho Codex.

---

END OF GUIDE
