# HCA và hai dự án chuyên đề: bàn giao để tiếp tục trên máy khác

- Tác giả: Claude
- Phiên bản: v1.0
- Ngày: 2026-11-23
- Mục đích: ghi lại trạng thái, quy tắc và việc tiếp theo để tiếp tục làm trên máy khác. Mọi mã và dữ liệu đã được đẩy lên GitHub; tệp này không chứa bí mật.

## 1. Cách khôi phục trên máy mới

```bash
git clone git@github.com:fossbk-spec/HCA.git
git clone git@github.com:fossbk-spec/vietnam-history-atlas.git
cd HCA && npm ci          # postinstall chạy prisma generate
npm test && npm run typecheck && npm run verify:seed
```

- Cần: Node 22 hoặc mới hơn, Git, `gh` đã đăng nhập, khóa SSH có quyền vào tổ chức `fossbk-spec`. Remote dùng SSH (`git@github.com:`) vì https hay treo ở trình quản lý thông tin đăng nhập.
- Không cần PostgreSQL cục bộ: job `integration` của CI chạy PostgreSQL 16 và đã kiểm migration, seed hai lần và `db:smoke`. Nếu muốn chạy tay, đặt `DATABASE_URL` trong `.env` (không commit) rồi `npm run db:deploy && npm run seed && npm run db:smoke`.
- Quy ước đọc đầu tiên: `AGENTS.md` (v2.0), `docs/Reviews/HCA_Decisions_2026-11-23.md`, các brief trong `briefs/`.

## 2. Trạng thái repo HCA (`fossbk-spec/HCA`, riêng tư)

`main` ở `1a6b243`, CI xanh. PR #1–#12 đã merge. **Bốn PR đang mở, chưa merge** (chờ chủ dự án duyệt):

| PR | Nhánh | Nội dung | CI | Thứ tự merge |
|---|---|---|---|---|
| #15 | `fix/typed-relations` | Quan hệ định danh theo `entityType + slug`, kiểu dùng chung, test slug trùng | Xanh | 1 |
| #16 | `chore/db-integration-ci` (base `fix/typed-relations`) | Job PostgreSQL, `db:smoke`, `ALLOW_SEED_FALLBACK`, `error.tsx`; đã sửa theo review của Codex (seed phân giải theo kiểu, smoke kiểm mọi quan hệ hai chiều) | Xanh | 2 (đổi base sang `main` sau khi #15 merge) |
| #13 | `feature/search` | F8 Search 5 loại, `/api/search`, `/search` | Xanh | 3 (sau đó cho `search.ts` dùng `withDatabase`) |
| #14 | `docs/hca-technical-review-20261123` | Review kỹ thuật, hai kế hoạch dự án chuyên đề kèm phần review v0.1.1 của Claude, tệp bàn giao này | Xanh | Tùy chọn |

Nhánh `data/seed-batch4` (Gemini, commit `75dc130`) đã đẩy lên nhưng **chưa có PR**: 100 nhân vật, 50 ý tưởng, 52 sách, 235 quan hệ. `verify:seed` báo 0 lỗi. Chưa ai kiểm độ chính xác lịch sử của nội dung. Nên mở PR riêng, và nên chạy lại CI (có job PostgreSQL) trước khi merge.

## 3. Đã quyết định

- Ontology 1.1 công nhận mọi loại quan hệ trong seed (`data/ontology/relationship-types.json`).
- Search tìm trên 5 loại.
- Hosting: Vercel + PostgreSQL ngoài (Neon hoặc Supabase); Cloudflare chỉ DNS/CDN. Chưa tạo DB hay project Vercel.
- Production không được tự rơi về seed (`ALLOW_SEED_FALLBACK`). Chủ dự án vẫn cần xác nhận cách đặt biến này khi deploy.

## 4. Việc còn lại của HCA (theo thứ tự đề xuất)

1. Duyệt và merge #15 → #16 → #13; mở PR cho `data/seed-batch4`.
2. Kiểm tra trình duyệt mốc M1 (xem `AGENTS.md` mục 21) trên một bản chạy cục bộ hoặc preview.
3. F9 Knowledge Graph Lite (React Flow), `/about`.
4. Sprint 2 trong `docs/Reviews/HCA_Technical_Review_and_Claude_Implementation_Plan_v1.0.0_20261123.md`: bảng `Source`/`EntitySource`, khôi phục Big Bang / Origin of Life / Human Evolution, thêm Internet và AI, Timeline 9 giai đoạn, sửa Featured trang chủ.
5. Tạo PostgreSQL thật, project Vercel, chạy `migrate deploy` và seed.

Chưa xác minh: độ chính xác lịch sử của `content`, giá và hạn mức các dịch vụ, bản dựng trên trình duyệt.

## 5. Dự án Vietnam History Atlas (`fossbk-spec/vietnam-history-atlas`, riêng tư)

- Nhánh `feature/phase-0` (commit `fb974d6`), **tạm dừng, chưa sẵn sàng review hay merge**. `main` chỉ có commit khởi tạo.
- Đã có: 5 mục nội dung mẫu, 3 nguồn, 4 quan hệ có kiểu (đều `draft`, nguồn chỉ `cited`); `package.json` và phụ thuộc; brief `briefs/P0-phase-0.md`; ba tệp `src/lib/{schema,validate,content}.ts` chưa được review hay chạy.
- Chưa có: `tsconfig.json`, cấu hình Next, giao diện, script `validate-content` và `check-links`, test, tài liệu, CI. Chi tiết: `docs/reviews/PHASE0_PROGRESS.md`.
- Tiếp tục: đọc `PHASE0_PROGRESS.md`, review ba tệp đã có, rồi chạy một phiên Codex cho phần còn lại của brief và chạy các cổng `typecheck`, `test`, `validate`, `build`, `check-links`.

## 6. Dự án Kho tàng Lời Việt

Chưa bắt đầu; chưa tạo repo `fossbk-spec/kho-tang-loi-viet`. Chỉ có kế hoạch và phần review v0.1.1 (trong PR #14). Điều chỉnh chính: `entryType` chỉ gồm CA_DAO và TUC_NGU kèm `classificationStatus`; biến thể nhúng trong mục; bỏ các quan hệ trùng với trường; mã định danh ổn định `ktlv-NNNNNN`; chuẩn hóa tiếng Việt có/không dấu theo đặc tả mục 15.3. Quy tắc cứng: không tự tạo câu dân gian, không chép chú giải hiện đại, không `published` khi chưa có nguồn `verified`. Bắt đầu sau khi Vietnam History Atlas đạt yêu cầu.

## 7. Quy tắc làm việc cần giữ

- Không ghi công công cụ AI trong commit, PR hay tài liệu; không `Co-Authored-By`.
- Không merge, deploy, mua dịch vụ hay đổi phạm vi lớn nếu chưa được chủ dự án duyệt. Không thêm Neo4j, GraphRAG, AI Tutor, tài khoản người dùng.
- Phân vai: Claude viết brief, review và kiểm lại các cổng; Codex viết mã ứng dụng (`briefs/`); Gemini làm dữ liệu và tài liệu nghiên cứu trên nhánh riêng, không ghi vào thư mục làm việc của `main`.
- Mỗi nhánh nhỏ, một PR riêng; kiểm tra: `typecheck`, `npm test`, `verify:seed`, `build`, `prisma validate`.
- Dữ liệu lịch sử và văn hóa chỉ coi là đáng tin sau khi có nguồn `verified` do người kiểm; AI không tự xác minh số trang hay ấn bản.

## 8. Lưu ý về công cụ trên Windows

- Chạy Codex: `codex exec -p build -C "<thư mục>" -o <tệp-kết-quả> "<nhiệm vụ>" < /dev/null > <log> 2>&1`. Luôn thêm `< /dev/null`, nếu không Codex treo chờ stdin. Cấu hình hồ sơ `lean` và `build` nằm ở `~/.codex/*.config.toml` của từng máy; máy mới cần tạo lại. Thông báo "completed" của lệnh nền có thể chỉ là vỏ lệnh thoát sớm; chờ dòng `done` trong log.
- Trong sandbox của Codex, `tsx` đôi khi lỗi `os.userInfo()` (ENOMEM); test vẫn chạy được ngoài sandbox và trên CI.
- Không có Docker hay PostgreSQL trên máy cũ; dùng CI cho kiểm tích hợp.
- Nhiều tác nhân dùng chung một thư mục làm việc gây va chạm nhánh. Dùng `git worktree add` cho việc song song (đã dùng `HCA-wt-*` trên máy cũ; không cần sao chép các thư mục này).
- Bộ nhớ của Claude (`~/.claude/projects/.../memory/`) chỉ nằm trên máy cũ; thông tin cần thiết đã được tóm tắt trong tệp này và trong `AGENTS.md`.
