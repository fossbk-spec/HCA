# HCA — Báo cáo Tiến độ Toàn diện Dự án theo Blueprint (v1.0)

- **Dự án:** Human Civilization Atlas (HCA)
- **Tác giả:** Antigravity (Gemini)
- **Người thẩm định (Reviewer):** Claude
- **Phiên bản:** v1.0
- **Ngày lập:** 2026-11-23
- **Tài liệu tham chiếu:**
  - `docs/MasterBlueprint/Human_Civilization_Atlas_Master_Blueprint_v6.0.md`
  - `docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md`
  - `docs/Architecture/HCA_PRD_v1.0.md`
  - `docs/Ontology/HCA_Ontology_Specification_1.0.md`
  - `docs/Reviews/HCA_Seed_and_Pipeline_Review_2026-11-23.md`

---

## 1. Tóm tắt Điều hành (Executive Summary)

- **Trạng thái nhánh Git:** Nhánh `main` sạch sẽ (`working tree clean`), đã merge đầy đủ các Pull Request từ `#1` đến `#6` (`PR #1–#3` nền tảng, `PR #4` Civilization Atlas, `PR #5` Seed Dataset Batch 2-3 & Integrity script, `PR #6` Pipeline Hardening & CI).
- **Hạ tầng & CI/CD:** Hoạt động ổn định 100%. Đã có GitHub Actions `.github/workflows/ci.yml`, `npm run verify:seed`, `postinstall: prisma generate`, và `.gitattributes`.
- **Dữ liệu hạt nhân (Data Foundation):** Đã hoàn tất 3 đợt seed dữ liệu bao phủ đủ **10 nền văn minh lớn**. Đạt **225 thực thể duy nhất** (10 nền văn minh, 72 nhân vật, 57 sự kiện, 38 ý niệm, 48 sách) và **144 liên kết quan hệ đồ thị**. Script kiểm định xác nhận **0 lỗi tham chiếu, 0 slug mồ côi (Zero-Orphan)**.
- **Sản phẩm Web:** Đã hoàn thành 4 trang cốt lõi (`/`, `/timeline`, `/civilizations`, `/civilizations/[slug]`). Build Next.js 15 SSG thành công 16/16 trang HTML. Đang chuẩn bị triển khai các trang thực thể chi tiết (`/people/[slug]`, `/books/[slug]`, `/ideas/[slug]`, `/events/[slug]`) và công cụ tìm kiếm `/search`.

---

## 2. Ma trận Đối soát Tiến độ theo Blueprint (Phased Roadmap Audit)

Dưới đây là bảng đối soát chi tiết giữa yêu cầu trong `HCA_MVP_Execution_Plan_For_Codex.md` và kết quả thực tế đạt được:

| Pha (Phase) | Hạng mục theo Blueprint | Tiến độ thực tế | Tỉ lệ hoàn thành | Đánh giá & Ghi chú |
| :--- | :--- | :---: | :---: | :--- |
| **Phase 0** | Khởi tạo repo, Next.js 15, TypeScript, Tailwind CSS, shadcn/ui | Hoàn thành | **100%** | Môi trường chuẩn, cấu trúc thư mục đúng `HCA_Project_Structure.md`. |
| **Phase 1** | Schema Prisma, mô hình hóa quan hệ, pipeline CI/CD, seed script | Hoàn thành | **100%** | Đã sửa `seed.ts` ánh xạ `civilizationId`, bổ sung `ci.yml`, `verify:seed`. |
| **Phase 2** | Dữ liệu nền tảng: 10 văn minh, 100 người, 200 sự kiện, 50 sách, 50 ý niệm | 225/410 thực thể | **55%** | Hoàn thành 3 đợt seed. 10/10 văn minh làm giàu sâu; sách đạt 96%; người đạt 72%. |
| **Phase 3** | Sitemap MVP: 10 tuyến trang giao diện | 4/10 trang | **40%** | Đã xong Home, Timeline, Civs list, Civ detail. Chưa làm People, Book, Idea, Event detail. |
| **Phase 4** | Timeline Explorer: Dòng thời gian tương tác ngang, 9 kỷ nguyên | Hoàn thành | **100%** | Chạy mượt mà, hỗ trợ lọc kỷ nguyên từ Big Bang đến Thời đại AI. |
| **Phase 5** | Tìm kiếm từ khóa đa thực thể (MVP Search) | 30% | **30%** | Đã có SearchBox giao diện trên Home/Header; chưa có API `/api/search` và trang `/search`. |
| **Phase 6** | Knowledge Graph Lite: Trực quan hóa quan hệ đồ thị (React Flow) | Chưa làm | **0%** | Đã chuẩn bị sẵn 144 cạnh quan hệ; chờ tích hợp UI đồ thị tương tác. |
| **Phase 7** | Sẵn sàng Production: CI pass, build pass, deploy Vercel + Live Postgres | Sẵn sàng mã nguồn | **75%** | Build pass 100%; chờ cấp chuỗi kết nối `DATABASE_URL` thực tế (Supabase/Neon). |

---

## 3. Chi tiết Tình trạng Dữ liệu Seed (`data/seed/*.json`)

Dữ liệu seed đã được chuẩn hóa qua 3 đợt làm giàu và kiểm định nghiêm ngặt:

```
========================================================
       HCA DATASET REFERENTIAL INTEGRITY REPORT         
========================================================
Entity Counts:
  - Civilizations : 10
  - People        : 72
  - Events        : 57
  - Ideas         : 38
  - Books         : 48
  - Relationships : 144
  - TOTAL ENTITIES: 225

✓ Total Unique Entity Slugs: 225 (Không trùng lặp, đúng kebab-case)
✓ People civilizationSlug validity checked (100% người có nền văn minh hợp lệ)
✓ Relationships graph integrity checked (100% nguồn và đích tồn tại, đúng EntityType)
```

### So sánh với chỉ tiêu MVP ban đầu:
- **Civilizations (10/10 - 100%):** Mesopotamia, Ancient Egypt, Ancient Greece, Roman Empire, Ancient China, Ancient India, Vietnam, Persian Empire, Islamic Civilization, Maya Civilization. Cả 10 nền văn minh đều có `content` chuyên sâu đa mục (tổng quan, địa lý, chính trị, tôn giáo, thành tựu).
- **Books (48/50 - 96%):** Bao phủ toàn diện các trước tác kinh điển thế giới và Việt Nam. Đã giải quyết triệt để xung đột slug cuốn *The Republic* (`the-republic`) của Plato để không đè lên ý niệm `republic`.
- **People (72/100 - 72%):** Bổ sung đầy đủ trục Đông phương (Lão Tử, Tôn Tử, Tư Mã Thiên, Chu Hi), Ấn Độ (Mahavira, Kautilya, Kalidasa, Aryabhata), Đại Việt (từ An Dương Vương đến Nguyễn Du), Ba Tư (Cyrus, Darius, Zoroaster), Hồi giáo (Al-Khwarizmi, Avicenna, Averroes, Alhazen) và Maya (Pakal Đại Đế, Jasaw Chan K'awiil I).
- **Ideas (38/50 - 76%):** Từ Dân chủ, Pháp quyền Hy-La đến Nhân-Lễ, Đạo-Vô vi, Tứ diệu đế, Tam giáo đồng nguyên, Nhị nguyên luận Zoroaster, Đại số học, và Toán học số Không Maya.
- **Events (57/200 - 28.5%):** Tập trung vào các mốc bản lề mang tính bước ngoặt của từng nền văn minh.

---

## 4. Tình trạng Giải quyết Các Vấn đề Kỹ thuật (Issue Resolution Tracking)

Đối chiếu với bản review kỹ thuật `docs/Reviews/HCA_Seed_and_Pipeline_Review_2026-11-23.md`:

| Mã Issue | Mức độ | Nội dung vấn đề | Trạng thái | Biện pháp & Kết quả xử lý |
| :--- | :---: | :--- | :---: | :--- |
| **D1** | Cao | Lệch độ phủ (Ba Tư, Maya, Hồi giáo thiếu dữ liệu) |  **Đã giải quyết** | Batch 3 đã nạp đầy đủ danh nhân, sự kiện, sách và ý niệm cho cả 3 nền văn minh. |
| **D2** | Cao | Từ vựng quan hệ lệch ontology (dùng 45 loại thay vì 14) | ⏳ **Chờ quyết định** | Xem mục 5 bên dưới. Đề xuất mở rộng ontology chuẩn. |
| **D3** | Trung bình | Đồ thị còn thưa (53 thực thể cô lập) | 🟡 **Cải thiện lớn** | Đã tăng từ 41 lên 144 quan hệ. Sẽ tiếp tục dệt lưới ở đợt F6 (Graph Lite). |
| **D4** | Trung bình | 5 nhân vật thời Phục hưng/Hiện đại có `civilizationSlug = null` |  **Ghi nhận** | Đúng với schema (cho phép null). Đề xuất bổ sung nền văn minh "Modern Era" ở Phase 2+. |
| **P1** | Cao | `seed.ts` bỏ qua `civilizationSlug` |  **Đã giải quyết** | Đã sửa trong PR #6: map tự động `civilizationSlug` $\rightarrow$ `civilizationId`. |
| **P2** | Cao | Thiếu CI/CD workflow |  **Đã giải quyết** | Đã bổ sung `.github/workflows/ci.yml` tự động chạy khi push/PR vào `main`. |
| **P3** | Cao | Thiếu script kiểm tra seed trong `package.json` |  **Đã giải quyết** | Đã thêm lệnh `npm run verify:seed`. |
| **P4** | Trung bình | Script seed dùng một lần nằm lẫn trong repo |  **Đã giải quyết** | Đã dọn dẹp khỏi nhánh `main`, chỉ giữ lại `scripts/verify_integrity.js`. |
| **P5** | Trung bình | Thiếu `postinstall: prisma generate` |  **Đã giải quyết** | Đã bổ sung vào `package.json` trong PR #6. |
| **P7** | Thấp | Cảnh báo LF/CRLF khi commit |  **Đã giải quyết** | Đã bổ sung `.gitattributes` (`* text=auto eol=lf`). |

---

## 5. Điểm Cần Chốt Quyết Định (Decisions Needed from Tech Lead / Reviewer)

1. **Vấn đề D2 (Chuẩn hóa Từ vựng Quan hệ / Ontology Vocabulary):**
   - *Thực tế:* Bảng `relationships.json` đang sử dụng 45 động từ biểu đạt lịch sử chính xác cao (`COMMANDED`, `ENACTED`, `AFFIRMED`, `PRACTICED`, `HOSTED`, `PIONEERED`, `SYNTHESIZED`...). Ontology gốc trong `docs/Ontology/HCA_Ontology_Specification_1.0.md` hiện chỉ định nghĩa 14 động từ (`TAUGHT`, `WROTE`, `CREATED`, `RULED`...).
   - *Phương án A (Khuyến nghị):* **Mở rộng tài liệu Ontology** để công nhận chính thức bộ 45 động từ này thành chuẩn mở rộng v1.1. Điều này giúp đồ thị tri thức giàu ngữ nghĩa và trực quan hơn.
   - *Phương án B:* Ép dữ liệu rút gọn về đúng 14 động từ đóng (sẽ làm mất đi sắc thái lịch sử phong phú của các sự kiện và văn kiện).

2. **Cung cấp `DATABASE_URL` để hoàn tất Phase 7 (Deploy Production):**
   - Cần cấu hình một cơ sở dữ liệu PostgreSQL thực tế (trên Supabase, Neon hoặc Railway) để chạy `prisma migrate deploy` và `prisma db seed`, sẵn sàng đưa trang web lên Vercel.

---

## 6. Kế hoạch Hành động cho Sprint Tiếp theo (Next Sprint Roadmap)

1. **Task 1 (F5 - Entity Detail Pages):** Xây dựng các trang hiển thị chi tiết:
   - `/people/[slug]`: Tiểu sử danh nhân, các mốc niên đại, tác phẩm đã viết, tư tưởng liên quan.
   - `/books/[slug]`: Chi tiết tác phẩm, tác giả, năm công bố, tóm lược nội dung.
   - `/ideas/[slug]` & `/events/[slug]`: Phân tích nguồn gốc và diễn biến lịch sử.
2. **Task 2 (F6 - Search Engine):** Xây dựng API route `/api/search` truy vấn tìm kiếm toàn diện trên các bảng dữ liệu và hoàn thiện trang giao diện `/search`.
3. **Task 3 (F7 - Knowledge Graph Lite):** Tích hợp thư viện đồ thị `@xyflow/react` để trực quan hóa mạng lưới liên kết 144 quan hệ ngay trên giao diện người dùng.

---
*Báo cáo được khởi tạo tự động và sẵn sàng cho vòng review tiếp theo của Claude.*
