# HCA: bàn giao v2.0 để tiếp tục trên máy khác

- Tác giả: Claude
- Phiên bản: v2.0 (thay thế `HCA_Handoff_2026-11-23_v1.0.md` nếu có)
- Ngày: 2026-11-23, `main` ở `98a10b8`
- Tệp này không chứa bí mật. Chuỗi kết nối database, token và `.env.local` không được commit và không được in ra.

## 1. Trạng thái

MVP đã chạy trên production: https://hca-ruddy.vercel.app (Vercel project `hca`, PostgreSQL trên Neon qua Vercel Marketplace, Git đã nối: `main` tự deploy production, mỗi PR có bản preview). Mọi PR đã merge trừ #14 (docs review cũ, tùy chọn). Các route đều có: `/`, `/timeline` (9 giai đoạn), `/civilizations`, `/people`, `/ideas`, `/books`, `/events`, `/search`, `/graph`, `/about`.

**Việc đang dở, cần làm đầu tiên: database Neon chưa có seed batch 5.** Neon đang giữ 269 thực thể (lần seed trước). `main` đã có 280 thực thể và 259 quan hệ (PR #23). Merge không tự seed. Trên production hiện: các giai đoạn Human Evolution, Information Age, AI Age còn trống và Featured ideas chỉ 3/5, cho tới khi seed lại. Cách làm ở mục 3. Người dùng chưa xác nhận bước seed này.

## 2. Khôi phục trên máy mới

```bash
git clone git@github.com:fossbk-spec/HCA.git && cd HCA
npm ci                      # postinstall chạy prisma generate; cần Node 22+
npm test && npm run typecheck && npm run verify:seed
```

Cần: Node 22 hoặc mới hơn, Git, `gh` đã đăng nhập tài khoản `fossbk-spec`, khóa SSH có quyền vào repo. Không cần PostgreSQL cục bộ: CI có job `integration` chạy PostgreSQL 16.

Vercel CLI (không cài toàn cục): dùng `npx vercel@66.6.0`.
1. Đăng nhập: `npx vercel@66.6.0 login` (mở trình duyệt, tài khoản Vercel của chủ dự án).
2. Liên kết: `npx vercel@66.6.0 link --yes --project hca`. Lệnh này và `vercel integration add` tự thêm `.env*` vào `.gitignore`; hoàn tác bằng `git checkout .gitignore` (`.env.local` và `.vercel/` đã được bỏ qua sẵn).
3. Lấy biến môi trường về máy: `npx vercel@66.6.0 env pull` (ghi `.env.local`, đã gitignore). Không in giá trị ra.

## 3. Seed Neon sau khi đổi dữ liệu (quy trình bắt buộc)

Merge chỉ deploy mã, không đụng database. Dùng URL không pooling của Neon (`DATABASE_URL_UNPOOLED`) để seed; ứng dụng dùng `DATABASE_URL` có pooling.

```bash
set -a; . ./.env.local; set +a
export DATABASE_URL="$DATABASE_URL_UNPOOLED"
npx prisma migrate deploy      # chỉ khi có migration mới
npm run seed                   # upsert, chạy lặp lại an toàn
npm run db:smoke               # chạy rất chậm trên Neon (hàng trăm truy vấn qua mạng): chạy nền
```

`db:smoke` phải báo khớp 10/100/66/52/52 thực thể (civilizations/people/events/ideas/books), 259 quan hệ kiểm hai chiều. Sau đó kiểm `/timeline` và trang chủ trên production có dữ liệu mới.

Lưu ý: seed là upsert nên không xóa dòng cũ; nếu sau này xóa một quan hệ hay thực thể khỏi seed thì phải xóa tay trong database.

## 4. Quy ước đã dùng (giữ nguyên)

- Một việc một nhánh, một PR, squash merge. `AGENTS.md` v2.0 và `docs/Reviews/HCA_Decisions_2026-11-23.md` là nguồn quy tắc.
- Không ghi công công cụ AI trong commit, PR hay tài liệu; không `Co-Authored-By`.
- Phân vai: Claude viết brief trong `briefs/`, review, kiểm lại, commit/PR/merge; Codex viết mã (`codex exec -s workspace-write -o <out> "..." < /dev/null`, thêm `< /dev/null` kẻo treo); Codex review bằng `-s read-only`; Gemini làm dữ liệu seed trên nhánh `data/*`.
- Với việc song song dùng `git worktree add` ở thư mục riêng và `npm ci` trong đó.
- Một lượt review Codex nên hỏi cụ thể (correctness, quy tắc AGENTS.md, trường hợp biên). Nó từng bắt được lỗi thật: tìm không dấu sai trên PostgreSQL, thứ tự láng giềng không xác định trong đồ thị, quan hệ sai ngữ nghĩa trong seed.
- Chạy `gh` trong thư mục repo hoặc thêm `-R fossbk-spec/HCA`. Ngoài repo, vòng lặp chờ CI không thực sự chờ.
- Trên zsh, đặt dấu nháy quanh đường dẫn có `?` khi dùng `curl`.
- Kiểm production có bảo vệ bằng `npx vercel@66.6.0 curl <url> -- -s`; production công khai nên `curl` thường dùng được.
- Thông báo "completed" của lệnh nền chỉ là vỏ lệnh thoát; chờ file kết quả hoặc dòng `done`.

## 5. Quyết định kỹ thuật cần nhớ

- Năm của Event và Civilization là `Int` 32-bit, nên Big Bang (~13,8 tỷ năm) và Origin of Life (~3,8 tỷ năm) không lưu được; chúng là giai đoạn mô tả cố định trong `src/lib/epochs.ts`. Đổi sang `BigInt` là thay đổi schema lớn, chưa làm.
- Plan có 9 giai đoạn nhưng không có Trung cổ: "Classical Era" gộp 500 TCN–1760. Ranh giới giai đoạn là gần đúng.
- Production không bật `ALLOW_SEED_FALLBACK`; không có DB thì lỗi thay vì dùng seed (cố ý). Preview của PR dùng cùng database production.
- Quan hệ định danh theo `entityType + slug`.
- Repo `fossbk-spec/HCA` là **public** (handoff v1 ghi sai là riêng tư).

## 6. Việc còn lại, theo thứ tự đề xuất

1. Seed Neon với batch 5 (mục 3) và kiểm production.
2. Kiểm tra trình duyệt mốc M1 và M2 (`AGENTS.md` mục 21) trên production, ghi kết quả vào `docs/Reviews/`. Cần Playwright hoặc Chrome; kiểm ở ~400px và máy tính; canvas `/graph` chưa ai xem trên trình duyệt thật và không điều hướng bàn phím được.
3. Nhánh Neon riêng cho môi trường Preview, trước khi có PR nào sửa seed hay schema.
4. Nội dung: 66/200 events, 280/500 thực thể (mục tiêu của Plan); độ chính xác lịch sử của `content` chưa ai kiểm (batch 4 và 5 đều do AI soạn).
5. Related Books và References trên trang nền văn minh; ESLint; bảng `Source`/`EntitySource`.
6. Tùy chọn: trang `/graph` ghi "well-connected" nhưng một số ví dụ chỉ có 1 quan hệ; `npm audit` báo 6 lỗ hổng (1 moderate, 5 high) chưa xử lý; bật 2FA cho tài khoản Vercel.

## 7. Dự án khác (không thuộc repo này)

Vietnam History Atlas (`fossbk-spec/vietnam-history-atlas`) và Kho tàng Lời Việt: xem handoff v1 mục 5 và 6; tình trạng có thể đã đổi, kiểm tra repo trước khi tiếp tục.
