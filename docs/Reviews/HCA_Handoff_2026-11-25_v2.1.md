# HCA: bàn giao v2.1 để tiếp tục trên máy khác

- Tác giả: Claude
- Phiên bản: v2.1 (thay thế `HCA_Handoff_2026-11-23_v2.0.md`; các mục không nhắc lại ở đây vẫn đúng theo v2.0)
- Ngày: 2026-11-25, `main` ở `0d11e23`
- Tệp này không chứa bí mật. `.env.local` và chuỗi kết nối không được commit hay in ra.

## 1. Thay đổi so với v2.0

| Việc | Trạng thái |
|---|---|
| Seed batch 5 vào Neon | Đã làm 2026-11-24. `db:smoke` đạt: 10/100/66/52/52 thực thể, 259 quan hệ hai chiều. `/timeline` có đủ Human Evolution, Information Age, AI Age; trang chủ có 5 ý tưởng nổi bật. |
| PR #14 (review kỹ thuật cũ) | Đóng, không merge (đã lỗi thời). Nhánh còn để tra cứu. |
| PR #26 | Merged. `category` của ý tưởng giảm từ 38 giá trị về 11 giá trị cố định; `scripts/verify_integrity.js` kiểm tra danh sách này. |
| PR #27–#45 | Merged bởi phiên khác. **Claude chưa review.** Xem mục 2. |

## 2. Việc cần chủ dự án quyết định: PR #27–#45 chưa được review

Dựa vào tiêu đề PR (chưa đọc mã):

- #27 i18n song ngữ Anh–Việt cho dữ liệu và giao diện.
- #28, #29, #31, #42, #44: đồ thị tương tác, timeline tương tác, bản đồ thế giới, lớp bản đồ Great Books, bộ lọc thời kỳ.
- #33 trang hiện vật khảo cổ.
- **#34 "AI Historical Companion" (chatbot dựa trên kho dữ liệu).** Quy tắc đã ghi: không thêm AI Tutor, Neo4j hay GraphRAG nếu chưa được chủ dự án phê duyệt. Cần xác nhận chức năng này đã được duyệt chưa, nó gọi dịch vụ nào, có phát sinh chi phí hay lộ khóa API không.
- **#43 "VHA to HCA knowledge federation bridge" (72 thực thể, 53 quan hệ), #45 sửa CI cho bridge.** Quy tắc đã ghi: không dùng chung database giữa HCA và Vietnam History Atlas, không fork toàn bộ. Cần kiểm xem bridge chỉ nhập dữ liệu xuất ra từ VHA (đọc một chiều, thư mục `data/federated`) hay có phụ thuộc runtime hoặc database chung.
- #30, #32, #35–#41: thêm sử thi và sách kinh điển; dữ liệu seed lên 100 sách, 350 quan hệ. Đây là nội dung do AI soạn, chưa có nguồn trích dẫn (xem mục 4).

Khuyến nghị: Codex review #34, #43, #45 trước (rủi ro cao nhất), sau đó duyệt nhanh phần còn lại.

## 3. Database production đã lệch so với `main`

Neon hiện giữ dữ liệu của batch 5 (10/100/66/52/52, 259 quan hệ). `main` nay có **102 nhân vật, 100 sách, 350 quan hệ** (và thêm dữ liệu liên kết trong `data/federated`). Cần seed lại (quy trình ở v2.0 mục 3) để production khớp. Ngoài ra, `category` mới (PR #26) chỉ lên production sau lần seed lại này. Seed ghi vào database production nên cần chủ dự án đồng ý. Sau khi seed, `db:smoke` phải cập nhật số kỳ vọng nếu đã đổi (kiểm `scripts/db-smoke.ts`).

## 4. Việc còn lại

1. Review PR #27–#45 (mục 2), nhất là #34, #43, #45.
2. Seed lại Neon và kiểm production (mục 3).
3. Gemini, nhánh dữ liệu: hai việc đã soạn brief tại `docs/Prompts/GEMINI_Task_Seed_Batch6_v1.0.md`, chưa chạy vì Gemini bị lỗi 503 ngày 2026-11-23:
   - Task 2: danh sách mốc thời gian không chắc chắn (ví dụ `kautilya`, `sargon-of-akkad`, `gilgamesh`), ghi ra `data/review/date-uncertainty.json`.
   - Task 3: nguồn thử nghiệm cho 20 thực thể, ghi ra `data/review/source-pilot.json`, đều `unverified`. Không để mô hình tự viết nguồn từ trí nhớ mà không kiểm.
4. Nguồn trích dẫn: toàn bộ seed chưa có nguồn; cần bảng `Source`/`EntitySource` trước khi coi nội dung là đã kiểm chứng.
5. Kiểm trình duyệt mốc M1/M2 (AGENTS.md mục 21), nhánh Neon riêng cho Preview, ESLint, `npm audit`, 2FA Vercel (như v2.0 mục 6).
6. Dọn dẹp: gỡ worktree cũ `HCA-wt-docs`, `HCA-wt-s0a`, `HCA-wt-s0b`.

## 5. Ghi chú vận hành mới

- Codex: profile `lean` là sandbox chỉ đọc, dùng `-p build` khi cần sửa file. Codex không tạo được `index.lock` trong worktree, nên Claude commit thay. `codex exec ... < /dev/null`, chờ dòng `done` trong log.
- Gemini: `gemini -y -p "..." < /dev/null`; nếu lỗi 503 kéo dài thì dừng, không thử lặp.
- Vercel CLI tự sửa `.gitignore`; hoàn tác bằng `git checkout .gitignore`.

## 6. Dự án khác

- Vietnam History Atlas: máy gốc có nhánh `feature/phase-3` (commit Phase 1–3 do phiên khác làm), chưa push, chưa review. Origin chỉ có `main` và `feature/phase-0`.
- Kho tàng Lời Việt: chưa bắt đầu. PR #14 ghi tên repo là `kho-tang-tieng-viet`; chưa kiểm tên thật trên GitHub.
