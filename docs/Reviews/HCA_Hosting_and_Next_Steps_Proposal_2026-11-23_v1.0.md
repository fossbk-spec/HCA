# HCA — Đề xuất hosting, database và các bước tiếp theo

- Tác giả: Claude (soạn), Codex (review phương án hosting, `reports/codex/hosting.md`)
- Phiên bản: v1.0
- Ngày: 2026-11-23
- Trạng thái: đề xuất, chờ chủ dự án duyệt các mục ở §6
- Tham chiếu: `AGENTS.md` §4, §8–9; `docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md` §2, §13; `docs/Reviews/HCA_Decisions_2026-11-23.md`; `docs/Reviews/HCA_Claude_Review_of_Progress_Report_2026-11-23_v1.0.md`

## 1. Bối cảnh

Chủ dự án đề nghị dùng Cloudflare để cung cấp database. Cloudflare không có PostgreSQL; có hai cách dùng: Workers + Hyperdrive tới Postgres ngoài (Hướng A), hoặc D1 (SQLite, Hướng B' — loại). Codex được giao review Hướng A so với giữ Vercel (Hướng B).

## 2. So sánh

| Tiêu chí | Hướng A: Cloudflare Workers (OpenNext) + Hyperdrive + Postgres ngoài | Hướng B: Vercel + Postgres ngoài, Cloudflare làm DNS/CDN |
|---|---|---|
| Khớp tài liệu gốc | Không (`AGENTS.md` §4: Vercel) | Có |
| Prisma | `src/lib/prisma.ts` dùng `new PrismaClient()` mặc định; cần thêm `@prisma/adapter-pg` và kiểm tra bundle trên Workers | Giữ nguyên |
| Seed fallback (`node:fs`, `process.cwd()`) | Có thể không chạy trên Workers; phải bó JSON vào bundle hoặc bỏ fallback | Chạy được, cần đảm bảo `data/seed` nằm trong bản deploy |
| ISR (`revalidate = 3600` ở 4 trang) | Phải kiểm tra qua OpenNext | Hỗ trợ tự nhiên |
| CI/deploy | Thêm OpenNext build, binding Hyperdrive, secrets, deploy Worker | Thêm project Vercel và biến môi trường |
| Đường nâng cấp pgvector / Neo4j | Giữ được (vẫn Postgres) | Giữ được |
| Công sức | Cao hơn | Thấp hơn |
| Chi phí, giới hạn gói | Chưa xác minh | Chưa xác minh |

Hướng D1 bị loại vì phải đổi sang SQLite, viết lại schema và migration, mất pgvector, trái `AGENTS.md`.

## 3. Khuyến nghị

**Hướng B**: Vercel + PostgreSQL ngoài (Neon hoặc Supabase), Cloudflare làm DNS/CDN. Cả Claude và Codex cùng kết luận.

## 4. Các điểm chưa xác minh

- Giá và hạn mức gói miễn phí của Vercel, Neon, Supabase, Cloudflare; hỗ trợ chính thức của OpenNext cho đúng phiên bản Next.js/Prisma trong repo. Cần xem lại tài liệu hiện hành trước khi cam kết.
- Hành vi ISR qua OpenNext (chỉ liên quan Hướng A).

## 5. Việc kỹ thuật tiếp theo

| # | Việc | Người làm | Ghi chú |
|---|---|---|---|
| 1 | Tạo PostgreSQL (Neon/Supabase), đặt `DATABASE_URL` vào `.env` cục bộ | Chủ dự án | Không dán chuỗi kết nối vào chat hay commit |
| 2 | `npm run db:deploy` và `npm run seed` lên DB thật; ghi kết quả | Claude | Hoàn tất F1 |
| 3 | Tạo project Vercel nối `fossbk-spec/HCA`, đặt `DATABASE_URL` | Chủ dự án | Preview và Production |
| 4 | Thêm bước release chạy `prisma migrate deploy`; quyết định tắt seed fallback ở production | Codex / chủ dự án | |
| 5 | Gỡ `typescript.ignoreBuildErrors` và `eslint.ignoreDuringBuilds` lý do cũ (TS 7) không còn | Codex (task C2) | CI vẫn chạy `typecheck` riêng |
| 6 | Nâng `verify:seed` theo ontology 1.1 (loại ngoài danh sách thành lỗi) | Codex (task C2) | `data/ontology/relationship-types.json` |
| 7 | F5 People, rồi Ideas, Books, Events, Search (5 loại), Graph | Codex | Theo `AGENTS.md` §5–6 |
| 8 | Dữ liệu: khôi phục Big Bang / Origin of Life / Human Evolution, thêm Internet / AI Age, Money, Printing, nối 53 thực thể cô lập | Gemini | Chạy `verify:seed` |
| 9 | Nâng Timeline lên 9 giai đoạn; sửa Featured của trang chủ theo Plan | Codex | Sau khi có dữ liệu ở mục 8 |
| 10 | DNS/CDN Cloudflare cho domain | Chủ dự án | Sau khi có domain |

## 6. Cần chủ dự án duyệt

1. Hướng B (Vercel + Postgres ngoài, Cloudflare DNS/CDN) thay cho Hướng A.
2. Neon hoặc Supabase làm PostgreSQL.
3. Tắt seed fallback ở production (hiển thị lỗi thay vì dữ liệu seed khi DB sự cố), hay giữ.
