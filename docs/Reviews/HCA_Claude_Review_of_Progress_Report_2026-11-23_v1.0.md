# HCA — Thẩm định báo cáo tiến độ và đối soát theo tài liệu gốc

- Tác giả: Claude (reviewer)
- Phiên bản: v1.0
- Ngày: 2026-11-23
- Đối tượng thẩm định: `HCA_Blueprint_Progress_Review_2026-11-23_v1.0.md` (Gemini) và trạng thái thực của repo tại `main` = `54b1b91`
- Tài liệu gốc dùng để đối soát: `AGENTS.md`, `docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md`, `HCA_PRD_v1.0.md`, `HCA_API_Spec_v1.0.md`, `docs/Ontology/HCA_Ontology_Specification_1.0.md`
- Cách kiểm: chạy lại `npm run verify:seed`, `typecheck`, `next build` (không có DB), đếm trực tiếp dữ liệu, đọc mã nguồn các trang.

## 1. Kết luận

Báo cáo của Gemini đúng về hạ tầng (PR #1–#6 đã merge, CI xanh, build 16/16 trang) nhưng **đánh giá quá cao** ở năm điểm và **bỏ sót** các khoảng trống so với kế hoạch gốc. Tiến độ thực tế so với Execution Plan: nền tảng và 4 trang đã xong; dữ liệu mới đạt khoảng 45% mục tiêu 500 đối tượng; chưa có trang People, Ideas, Books, Events, Search, Graph, About; database thật chưa được dùng.

## 2. Đính chính báo cáo của Gemini

| # | Báo cáo nói | Thực tế (đã kiểm) |
|---|---|---|
| C1 | "0 lỗi, 0 slug mồ côi (Zero-Orphan)" | Script chỉ kiểm tham chiếu treo. **53/225 thực thể (23,6%) không có quan hệ nào.** Cũng bỏ sót dòng kết quả thật: `0 errors, 39 warnings` (39 loại quan hệ ngoài ontology). |
| C2 | Phase 4: "100%, 9 kỷ nguyên từ Big Bang đến Thời đại AI" | `src/lib/epochs.ts` có **5 epoch** (Prehistory → Modern). Kế hoạch yêu cầu 9 giai đoạn (Big Bang, Origin of Life, Human Evolution, Agriculture, Ancient, Classical, Industrial, Information, AI) và khu vực "Related entities". Dữ liệu sự kiện chỉ từ -10000 đến 1760: **không có** Big Bang, Origin of Life, Human Evolution, Internet, AI Age. Phase 4 ≈ 60%. |
| C3 | Phase 0: shadcn/ui "100%" | Không có `components.json`; `button.tsx` và `card.tsx` viết tay theo kiểu shadcn. Chấp nhận được cho MVP nhưng nên ghi rõ là "shadcn-style". |
| C4 | Phase 1 "100%" | Điều kiện "Done" của F1 là "working PostgreSQL database". Migration và `seed.ts` **chưa từng chạy trên PostgreSQL thật**. Phase 1 ≈ 85%. |
| C5 | Phase 3: "4/10 trang" | Sitemap trong Execution Plan có **11 tuyến** (thêm `/people`, `/events/[slug]`, `/about`). Đã xong 4/11. |
| C6 | D3 "Cải thiện lớn, từ 41 lên 144 quan hệ" | Số quan hệ tăng nhưng số thực thể cô lập chỉ giảm từ 54 xuống 53 vì số thực thể cũng tăng. |
| C7 | Lộ trình: F5 chi tiết thực thể, F6 Search, F7 Graph | Lệch `AGENTS.md` (F5 People, F6 Ideas, F7 Books, F8 Search, F9 Graph) và quy tắc nhánh. Giữ theo `AGENTS.md`; cộng thêm trang Events (có trong sitemap nhưng không có feature riêng). |
| C8 | "Phase 2: 225/410 = 55%" | Tiêu chí thành công của kế hoạch là **≥ 500 đối tượng** (PRD cũng ghi 500) và 100 người: 225/500 = 45%, người 72/100. |

## 3. Đối soát với Execution Plan và AGENTS.md

| Hạng mục (tài liệu gốc) | Trạng thái thực | Ghi chú |
|---|---|---|
| F1 Database (AGENTS §5) | Gần xong | Thiếu xác nhận trên DB thật |
| F2 Homepage | Xong, lệch yêu cầu | Plan: Featured Civilizations là Egypt, Greece, Rome, India, China; Featured Ideas là Democracy, Science, Money, Law, Printing; Timeline Preview Big Bang → AI. Thực tế lấy 10 nền văn minh đầu danh sách và 5 ý tưởng đầu file; không có Money, Printing. |
| F3 Timeline | Một phần | Xem C2. Thiếu khu vực "Related entities". |
| F4 Civilization Atlas | Một phần | Plan §7 yêu cầu Overview, Timeline, Geography, Society, Economy, Religion, Achievements, Figures, Related Books, References. Hiện có summary, content, danh sách nhân vật, link timeline. Thiếu Related Books và References. |
| F5 People, F6 Ideas, F7 Books | Chưa làm | Header và trang chủ đã trỏ tới các route này nên **hiện là link chết** |
| Events `/events/[slug]` | Chưa làm | **Mọi mục trên Timeline link tới `/events/<slug>` → 404.** |
| F8 Search | Chưa làm | Mới có ô nhập. Plan §9 tìm trên 5 loại (có events); AGENTS §5 liệt kê 4. Cần chốt: dùng 5. |
| F9 Knowledge Graph Lite | Chưa làm | 144 cạnh đã sẵn |
| `/about` | Chưa làm | |
| API Spec (`/api/...`) | Chưa làm | Hiện server component đọc thẳng repository. F8 cần `/api/search`; các GET còn lại có thể hoãn. POST/PUT civilizations nằm ngoài MVP. |
| Content standard (Plan §11) và bảng `references` | Chưa dùng | Model `Reference` có trong schema nhưng không có dữ liệu hay giao diện |
| Dữ liệu: 100 người, 200 sự kiện, 50 sách, 50 ý tưởng | 72 / 57 / 48 / 38 | Sự kiện thiếu nhiều nhất (28%) |
| CI/CD | Xong phần CI | Chưa nối Vercel, chưa có DB production |

## 4. Rủi ro và việc phát sinh

1. **Link chết trên giao diện đã merge** (Events, People, Ideas, Books, Search, About). Nên không công bố bản deploy trước khi F5–F8 xong, hoặc ẩn link tạm thời.
2. **Seed events thay thế bộ gốc.** Bộ seed v1.0 (commit `0a46651`) có `big-bang`, `origin-of-life`, `human-evolution`; batch 2–3 không còn các slug này. Cần khôi phục (và thêm Internet, AI Age) trước khi mở rộng Timeline lên 9 giai đoạn.
3. **Từ vựng quan hệ (D2)** vẫn mở. Đề xuất của Gemini (công nhận cả 45 loại) làm ontology phình ra; đề xuất của Claude là chuẩn hóa về khoảng 20 loại và giữ các loại thông dụng. Cần người quyết định; ontology là tài liệu cốt lõi ("không thay đổi ontology cốt lõi" theo `AGENTS.md`), nên mở rộng chỉ nên làm bằng một bản v1.1 có chữ ký của chủ dự án.
4. **Độ chính xác lịch sử của `content`** chưa được ai kiểm. Nên chạy một lượt kiểm chứng cho từng nền văn minh trước khi công bố.
5. **Seed fallback ở production** chưa có quyết định.
6. Hai script `seed_batch2.js`, `seed_batch3.js` chỉ còn ở máy cục bộ (đã vào `.gitignore`); Gemini ghi "đã dọn" là đúng với `main`, nhưng file vẫn tồn tại trong thư mục làm việc.

## 5. Kế hoạch đã cập nhật

Thứ tự đề xuất (giữ nhánh theo `AGENTS.md`):

| Bước | Nhánh | Nội dung |
|---|---|---|
| 1 | `feature/people` | `/people`, `/people/[slug]` (kèm nền văn minh, tác phẩm, quan hệ); sửa link chết |
| 2 | `feature/ideas` | `/ideas`, `/ideas/[slug]` |
| 3 | `feature/books` | `/books`, `/books/[slug]` |
| 4 | `feature/events` | `/events`, `/events/[slug]`; sửa link Timeline |
| 5 | `feature/search` | `/api/search` và `/search`, tìm trên 5 loại |
| 6 | `feature/graph` | React Flow từ bảng quan hệ |
| 7 | `feature/timeline-9` | Nâng Timeline lên 9 giai đoạn, thêm Related entities; cần seed Big Bang ... AI |
| 8 | `feature/home-fix` | Featured theo đúng Plan (Egypt, Greece, Rome, India, China; Democracy, Science, Money, Law, Printing) |
| 9 | `feature/about` + Civilization sections | `/about`; thêm Related Books và References vào trang nền văn minh |
| Song song | `data/*` (Gemini) | Khôi phục Big Bang/Origin of Life/Human Evolution, thêm Internet/AI Age, bổ sung 128 sự kiện, 28 người, 12 ý tưởng (Money, Printing), liên kết 53 thực thể cô lập; chạy `verify:seed` |
| Hạ tầng | | Cần `DATABASE_URL` → chạy migrate + seed thật → nối Vercel |

## 6. Việc cần người quyết định

1. D2: chuẩn hóa về danh sách đóng (đề xuất) hay mở rộng ontology v1.1.
2. Tìm kiếm trên 4 hay 5 loại (đề xuất 5, theo Execution Plan).
3. Tắt seed fallback ở production hay không.
4. Cung cấp PostgreSQL để chạy seed thật.
