# HCA — Review "AGENTS.md Enhancement Pack v1.0"

- Tác giả: Claude (reviewer)
- Phiên bản: v1.0
- Ngày: 2026-11-23
- Đối tượng: `AGENTS_MD_Additional_Sections_v1.0.md` (mục 11–20)
- Kết quả: đã gộp vào `AGENTS.md` v2.0 sau khi chỉnh; gói gốc giữ nguyên để tra cứu.

## 1. Đánh giá chung

Gói bổ sung hữu ích (guardrails, hợp đồng thực thi, mẫu báo cáo, tiêu chí MVP). Không thể chèn nguyên văn vì nhiều chỗ lệch với trạng thái repo và quy trình đang chạy.

## 2. Điểm đã chỉnh

| Mục | Vấn đề trong gói | Xử lý trong AGENTS.md v2.0 |
|---|---|---|
| 12 Current state | Ghi "Feature 1, chưa có Homepage, Timeline, Atlas, Seed script" — lỗi thời; thực tế đã có F1–F7, Events, CI, 225 thực thể | Viết lại theo thực tế (2026-11-23) và liệt kê phần chưa có |
| 14 Testing | `npm run type-check` và `npm run lint` không tồn tại (script là `typecheck`; ESLint chưa cấu hình) | Dùng đúng tên script; lint chỉ bắt buộc sau khi cấu hình; thêm `verify:seed` và build với DATABASE_URL trống |
| 15 Commit | Không đề cập quy tắc không ghi công AI; Codex không commit trong quy trình hiện tại | Thêm cả hai |
| 16 PR | Bắt buộc ảnh chụp màn hình cho UI, nhưng agent không chạy trình duyệt | Ảnh chụp chỉ khi có kiểm tra trình duyệt tại mốc (mục 21 mới) |
| 17 Contract | "Create commit" cho agent, "Create implementation plan" | Agent không commit/push/merge; việc được giao bằng brief; thêm cấm sửa `data/seed` ngoài task dữ liệu, cấm chạy trình duyệt, phân vai Claude/Codex/Gemini |
| 18 Template | Kết quả "lint"; đề xuất commit message | Đổi theo mục 14 |
| 19 Success | Dataset 10/100/200/50/50 = 410, mâu thuẫn Execution Plan §14 và PRD (≥ 500) | Dùng mốc ≥ 500 đối tượng, kèm số hiện có; thêm điều kiện mọi thực thể có quan hệ, DB thật, kiểm tra trình duyệt |
| 13 Structure | Liệt kê `features/`, `hooks/`, `types/`, `tests/` chưa tồn tại | Ghi cấu trúc thực tế; các thư mục chưa dùng chỉ tạo khi cần |
| 11 Guardrails | Thiếu các quyết định gần đây | Thêm: giữ Vercel, loại D1/SQLite, ontology chỉ đổi khi chủ dự án nâng phiên bản |

## 3. Cập nhật thêm các mục 1–10 của AGENTS.md

- Đường dẫn tài liệu nguồn đổi sang vị trí trong repo (`docs/...`); thêm Ontology 1.1 và `HCA_Decisions`.
- Phạm vi MVP thêm Events và `/about`; Search ghi rõ 5 loại.
- Stack: TypeScript 5, Tailwind 4, Prisma 6; hosting đã chốt hướng B.
- Bảng thứ tự triển khai có cột trạng thái; quy ước tiền tố nhánh (`feature/`, `chore/`, `data/`, `docs/`); cấm ghi trực tiếp vào thư mục làm việc của `main`.
- Quy tắc code: một `<main>` duy nhất (ở layout), một `<h1>` mỗi trang, fallback seed.
- Mục 21 mới: mốc kiểm tra trình duyệt M1 (sau F8 Search) và M2 (sau F9 và DB thật).

## 4. Điểm còn mở

- Seed fallback ở production: chờ chủ dự án.
- Bản sao cũ `docs/Prompts/HCA_Claude_Codex_Execution_Guide.md` giữ nguyên làm lịch sử; `AGENTS.md` là bản hiệu lực.

## Codex second review

- Đối chiếu từng chỉ dẫn của pack mục 11–20: không còn mục nào bị thiếu hoặc mâu thuẫn mà chưa được giải thích trong bảng mục 2. Việc bỏ yêu cầu agent tự lập kế hoạch/commit và ảnh chụp cho từng UI task là có chủ ý theo quy trình brief, phân vai và mốc QA; lint chưa có script.
- Sửa mục 2 và 10 của `AGENTS.md`: danh mục nguồn là tài liệu tham chiếu, còn task có brief chỉ đọc `README.md`, `AGENTS.md`, brief và các file brief nêu.
- Sửa mục 8 để điều kiện hoàn thành bao gồm toàn bộ tiêu chí mục 19; sửa F9 để React Flow đúng là tùy chọn như mục 4; làm rõ ưu tiên Server Components áp dụng cho trang, không ép Route Handlers hoặc phần tương tác.
- Sửa mục 14: phân biệt kiểm tra local theo loại task với CI luôn chạy đủ năm lệnh; task chỉ sửa tài liệu kiểm tra nội dung và đường dẫn. Giữ `verify:seed`/`prisma validate` có điều kiện ở local vì chỉ liên quan khi đụng seed/ontology/schema; giữ lint chưa bắt buộc vì `package.json` không có script.
