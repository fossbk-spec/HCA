# HCA — Review seed JSON và pipeline

- Tác giả: Claude (reviewer)
- Phiên bản: v1.0
- Ngày: 2026-11-23
- Phạm vi: `data/seed/*.json` (do Gemini tạo, chưa commit), `scripts/`, workflow/CI/deploy
- Tham chiếu: `docs/Ontology/HCA_Ontology_Specification_1.0.md`, `docs/Architecture/HCA_MVP_Dataset_Seed_v1.0.md`, `AGENTS.md`, `prisma/seed.ts`

## 1. Kết luận

- Dữ liệu: **đạt về cấu trúc** (179 thực thể, 99 quan hệ, 0 lỗi tham chiếu), **chưa đạt về độ phủ và nhất quán ontology**.
- Pipeline: **thiếu CI/CD**, `prisma/seed.ts` **chưa nạp liên kết người–nền văn minh**, và có một script ghi đè JSON không nên nằm trong repo.

## 2. Dữ liệu JSON

Kiểm bằng script riêng (slug, kiểu, ngày, tham chiếu) và `scripts/verify_integrity.js`.

| File | Số bản ghi | Trường |
|---|---|---|
| civilizations | 10 | đủ 7 trường, 10/10 có `content` |
| people | 59 | thêm `civilizationSlug` (59/59), `content` 22/59 |
| events | 43 | `content` 18/43 |
| ideas | 30 | `content` 10/30 |
| books | 37 | `content` 15/37 |
| relationships | 99 | có thêm `sourceType`, `targetType` |

### Đã đạt
- 179 slug duy nhất, đúng định dạng kebab-case, không trùng trong hoặc giữa các bảng.
- 99/99 quan hệ resolve được; `sourceType`/`targetType` khớp loại thực thể thật; không trùng, không tự trỏ.
- Năm sinh ≤ năm mất, năm bắt đầu ≤ năm kết thúc ở mọi bản ghi.
- Không có chuỗi `summary`/`content` rỗng.
- Đủ 10 nền văn minh theo README.

### Vấn đề
| # | Mức | Vấn đề |
|---|---|---|
| D1 | Cao | **Lệch độ phủ.** Persian Empire và Maya Civilization có 0 nhân vật, 0 sự kiện, 0 sách; Islamic Civilization chỉ 2 người (Muhammad, Saladin). Vietnam có 11 người, 8 sự kiện, 7 sách. Trang `/civilizations/persian-empire` sẽ trống. |
| D2 | Cao | **Từ vựng quan hệ lệch ontology.** Ontology có 14 loại; dữ liệu dùng 35 loại, chỉ 5 trùng (TAUGHT, WROTE, CREATED, INVENTED, DEVELOPED). Có loại gần trùng: `ORIGINATED` (8) và `ORIGINATED_IN` (1). Nhiều loại chỉ xuất hiện 1 lần (ADOPTED, ADVISED, REFORMULATED...). Cần chốt: mở rộng ontology hoặc chuẩn hóa về danh sách đóng. |
| D3 | Trung bình | **Đồ thị thưa.** 54/179 thực thể (30%) không có quan hệ nào. Ảnh hưởng Knowledge Graph Lite (F9). |
| D4 | Trung bình | 5 nhân vật có `civilizationSlug = null` (Newton, Darwin, Einstein, Turing, Leonardo da Vinci). Hợp lệ với schema nhưng Da Vinci và Newton không thuộc nền văn minh nào trong 10 mục, nên không xuất hiện ở trang nền văn minh nào. |
| D5 | Trung bình | `content` chỉ có ở một phần bản ghi (23%–40% với events/ideas/books). Trang chi tiết các loại này sẽ chỉ có summary. |
| D6 | Thấp | Một số năm là ước lượng hoặc truyền thuyết nhưng không có cờ độ chắc chắn: Gilgamesh -2800/-2500, An Dương Vương, Vietnam bắt đầu -2879, Sun Tzu, Laozi, `i-ching` -1000, `book-of-the-dead` -1550. Nên thêm trường `dateNote` hoặc ghi rõ trong `summary`. |
| D7 | Thấp | `author` là văn bản tự do và lẫn nhiều dạng: "Unknown (Standardized by Sin-leqi-unninni)", "Vedic Rishis", "King Wen, Duke of Zhou, Confucius". `hanfeizi` ghi `publicationYear` -233 là năm mất của tác giả. Không chặn việc triển khai. |
| D8 | Thấp | Tên sách `Records of the Grand Historian` -94, `Meditations` 180 và `Truyen Kieu` 1820 là xấp xỉ. |

Chưa kiểm sâu độ chính xác lịch sử từng câu `content` (cần một lượt `verify-chapter-accuracy` hoặc review chuyên gia). Các mốc năm đã đối chiếu thấy hợp lý ở mức tổng quát.

## 3. Pipeline và workflow

| # | Mức | Vấn đề |
|---|---|---|
| P1 | Cao | **`prisma/seed.ts` bỏ qua `civilizationSlug`.** Khi seed vào DB thật, `Person.civilizationId` luôn null, nên trang `/civilizations/[slug]` (F4) không có danh sách nhân vật ở chế độ DB (chế độ seed JSON thì có). Cần map `civilizationSlug` → `civilizationId` trong seed. |
| P2 | Cao | **Không có CI/CD.** Không có `.github/workflows`, dù `HCA_Project_Structure.md` nêu `ci.yml` và `deploy.yml`. Cần CI tối thiểu: `npm ci`, `prisma validate`, `prisma generate`, typecheck, kiểm tra seed, `next build` với `DATABASE_URL` trống. |
| P3 | Cao | **Chưa có bước kiểm tra seed trong npm scripts.** `scripts/verify_integrity.js` chưa được nối vào `package.json` và chưa kiểm loại quan hệ so với ontology, kiểm trùng quan hệ, kiểm thứ tự ngày. Nên thành `npm run verify:seed` và chạy trong CI. |
| P4 | Trung bình | **`scripts/seed_batch2.js` ghi đè 4 file JSON** (`saveJson` ở các dòng ~678–723) với dữ liệu nhúng cứng. Là script dùng một lần; để trong repo có nguy cơ chạy lại làm mất chỉnh sửa tay. Nên xóa khỏi repo hoặc chuyển vào `scripts/archive/` có ghi chú. |
| P5 | Trung bình | **Vercel/deploy chưa đủ.** Chưa có `postinstall: prisma generate`; chưa có quy trình `migrate deploy` + `seed` cho production; trang dùng `revalidate = 3600` nhưng prerender lúc build cần DB hoặc fallback seed. Cần quyết định: seed fallback có được phép ở production không (nên tắt, để tránh hiển thị dữ liệu cũ khi DB lỗi mà không cảnh báo). |
| P6 | Trung bình | **Chưa kiểm seed trên PostgreSQL thật** (F1 "Done" theo guide vẫn mở). Cần `DATABASE_URL` (Supabase hoặc local). |
| P7 | Thấp | Không có `.gitattributes`; mỗi lần `git add` đều cảnh báo LF→CRLF. Nên thêm `* text=auto eol=lf`. |
| P8 | Thấp | Chưa có lint (`eslint`) và chưa có test (`tests/` trong cấu trúc dự án). |
| P9 | Thấp | Nhánh `main` chưa có branch protection; quy trình hiện dựa vào việc Claude review rồi mới merge. |
| P10 | Thông tin | PR #1–#3 đã merge; `feature/civilizations` (F4) đã push nhưng chưa có PR; 6 file JSON và `scripts/` vẫn chưa commit. |

## 4. Đề xuất thứ tự xử lý

1. Quyết định D2 (từ vựng quan hệ): người quyết định là chủ dự án, vì ảnh hưởng ontology.
2. Commit dữ liệu Gemini thành PR riêng `data/seed-batch2` (sau khi có quyết định D2 hoặc ghi nhận D2 là việc mở), không gộp vào F4.
3. Giao Codex một task nhỏ: sửa `seed.ts` (P1), thêm `verify:seed` (P3), `postinstall` (P5), `.gitattributes` (P7), CI workflow (P2), dọn `seed_batch2.js` (P4).
4. Giao Gemini bổ sung dữ liệu cho Persian Empire, Maya, Islamic (D1) và liên kết các thực thể mồ côi (D3), có chạy `verify:seed`.
5. Cung cấp PostgreSQL để chạy thử seed thật (P6).

## 5. Việc cần người quyết định

- D2: mở rộng ontology (thêm các loại quan hệ đang dùng) hay chuẩn hóa dữ liệu về danh sách đóng?
- P5: có tắt seed fallback ở production không?
- Nhân vật không thuộc nền văn minh nào (D4): thêm civilization "Renaissance/Modern" hay để null?

## 6. Cập nhật v1.1 (2026-11-23, sau batch 3 của Gemini)

Dữ liệu tăng lên 225 thực thể (72 người, 57 sự kiện, 38 ý tưởng, 48 sách) và 144 quan hệ; vẫn 0 lỗi tham chiếu, không trùng, loại nguồn/đích đều khớp.

- D1 đã xử lý phần lớn: Persian Empire 4 người, Maya 3, Islamic 8. Còn mỏng so với Vietnam (11) nhưng mỗi trang đã có nội dung.
- D2 nặng hơn: 45 loại quan hệ, chỉ 6 loại có trong ontology (TAUGHT, CREATED, WROTE, INVENTED, DEVELOPED, RULED). Vẫn chờ quyết định.
- D3 gần như giữ nguyên: 53/225 thực thể chưa có quan hệ nào.
- `scripts/seed_batch2.js` và `seed_batch3.js` (dữ liệu nhúng cứng, ghi đè JSON) không đưa vào repo.
