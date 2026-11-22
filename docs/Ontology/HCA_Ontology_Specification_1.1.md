# HCA Ontology Specification 1.1

- Tác giả: Claude (soạn theo quyết định của chủ dự án)
- Phiên bản: 1.1
- Ngày: 2026-11-23
- Thay thế: chỉ phần **Relationship Vocabulary** của `HCA_Ontology_Specification_1.0.md`. Phần Entity Types, Properties và Graph Examples của 1.0 giữ nguyên.

## Quyết định

Ngày 2026-11-23, chủ dự án quyết định **công nhận toàn bộ các loại quan hệ đang dùng trong seed dataset** làm từ vựng chính thức v1.1 (55 loại: 16 loại của v1.0 và 39 loại mới; một số loại v1.0 chưa xuất hiện trong dữ liệu).

## Quy ước

- Quan hệ có hướng: `source -[TYPE]-> target`.
- Mỗi loại có thể dùng cho một hoặc nhiều cặp loại thực thể (cột Signatures, theo dữ liệu hiện có). Cặp mới ngoài bảng vẫn hợp lệ nếu hợp ngữ nghĩa, nhưng cần ghi vào bản kế tiếp.
- Tên loại: chữ hoa, dấu gạch dưới, một động từ hoặc cụm động từ.
- Loại gần nghĩa: `ORIGINATED` (nền văn minh sinh ra ý niệm) và `ORIGINATED_IN` (ý niệm phát sinh ở nền văn minh, chiều ngược lại về ngữ nghĩa); khi thêm dữ liệu mới nên dùng `ORIGINATED` theo hướng civilization -> idea.
- Nguồn dữ liệu máy đọc được: `data/ontology/relationship-types.json`; `npm run verify:seed` kiểm tra `relationshipType` có thuộc danh sách này.

## Relationship Vocabulary v1.1

| Type | Từ | Signatures | Số quan hệ trong seed | Ví dụ |
|---|---|---|---|---|
| ADOPTED | 1.1 | PERSON>PERSON | 1 | julius-caesar -> augustus |
| ADVISED | 1.1 | PERSON>PERSON | 1 | kautilya -> chandragupta-maurya |
| ADVOCATED | 1.1 | PERSON>IDEA | 1 | mencius -> mandate-of-heaven |
| AFFIRMED | 1.1 | BOOK>IDEA | 2 | nam-quoc-son-ha -> national-sovereignty-identity |
| ANNOTATED | 1.1 | PERSON>BOOK | 1 | confucius -> i-ching |
| ARTICULATED | 1.1 | BOOK>IDEA | 1 | popol-vuh -> maya-divine-kingship-kuhul-ajaw |
| BELONGS_TO | 1.0 | - | 0 | - |
| CHAMPIONED | 1.1 | PERSON>IDEA | 2 | pericles -> democracy |
| CODIFIED | 1.1 | PERSON>IDEA | 2 | hammurabi -> rule-of-law |
| COLLABORATED_WITH | 1.0 | - | 0 | - |
| COMMANDED | 1.1 | PERSON>EVENT | 11 | ramesses-ii -> battle-of-kadesh |
| CORONATED | 1.1 | PERSON>EVENT | 1 | pakal-the-great -> coronation-of-pakal-the-great |
| CREATED | 1.0 | PERSON>IDEA | 2 | socrates -> socratic-method |
| DEFENDED | 1.1 | CIVILIZATION>IDEA, PERSON>IDEA | 2 | cicero -> republic |
| DEVELOPED | 1.0 | CIVILIZATION>EVENT, CIVILIZATION>IDEA, PERSON>IDEA | 5 | roman-empire -> roman-law |
| DISCOVERED | 1.0 | - | 0 | - |
| EMPLOYED | 1.1 | BOOK>IDEA | 1 | dresden-codex -> maya-vigesimal-mathematics-and-zero |
| ENACTED | 1.1 | PERSON>EVENT, PERSON>IDEA | 5 | solon -> solon-reforms-athens |
| ESTABLISHED | 1.1 | PERSON>EVENT | 1 | harun-al-rashid -> founding-of-house-of-wisdom |
| ESTABLISHED_AS_ORTHODOXY | 1.1 | PERSON>IDEA | 1 | han-wudi -> confucianism |
| EXEMPLIFIED | 1.1 | PERSON>IDEA | 2 | tue-tinh -> tam-giao-dong-nguyen |
| EXPERIENCED | 1.1 | CIVILIZATION>EVENT | 4 | persian-empire -> battle-of-gaugamela |
| FLOURISHED_DURING | 1.1 | PERSON>EVENT | 2 | kalidasa -> gupta-empire-golden-age |
| FORMULATED | 1.1 | CIVILIZATION>IDEA | 1 | ancient-egypt -> ma-at |
| FOUNDED | 1.1 | PERSON>CIVILIZATION, PERSON>EVENT, PERSON>IDEA | 8 | plato -> platonism |
| HOSTED | 1.1 | CIVILIZATION>EVENT | 5 | ancient-china -> opening-of-silk-road |
| INFLUENCED | 1.0 | - | 0 | - |
| INITIATED | 1.1 | PERSON>EVENT | 3 | plato -> founding-of-platos-academy |
| INSPIRED | 1.1 | PERSON>BOOK | 2 | confucius -> analects |
| INVENTED | 1.0 | CIVILIZATION>IDEA | 1 | mesopotamia -> cuneiform-writing |
| ISSUED | 1.1 | PERSON>BOOK, PERSON>EVENT | 2 | hammurabi -> code-of-hammurabi |
| LED | 1.1 | PERSON>EVENT | 4 | pericles -> golden-age-of-athens |
| LOCATED_IN | 1.0 | - | 0 | - |
| ORIGINATED | 1.1 | CIVILIZATION>IDEA | 13 | ancient-china -> confucianism |
| ORIGINATED_IN | 1.1 | CIVILIZATION>IDEA | 1 | ancient-greece -> democracy |
| PARTICIPATED_IN | 1.0 | - | 0 | - |
| PART_OF | 1.0 | - | 0 | - |
| PIONEERED | 1.1 | PERSON>EVENT, PERSON>IDEA | 5 | akhenaten -> monotheism |
| PRACTICED | 1.1 | CIVILIZATION>IDEA, PERSON>IDEA | 6 | marcus-aurelius -> stoicism |
| PRECEDED_BY | 1.0 | - | 0 | - |
| PROCLAIMED | 1.1 | PERSON>BOOK | 1 | prophet-muhammad -> the-quran |
| PROMOTED | 1.1 | PERSON>IDEA | 1 | ashoka -> dharma |
| PROMULGATED | 1.1 | PERSON>BOOK | 1 | le-thanh-tong -> quoc-trieu-hinh-luat |
| RECORDED | 1.1 | BOOK>IDEA | 1 | dresden-codex -> cyclical-cosmic-time-and-long-count |
| REFORMULATED | 1.1 | PERSON>IDEA | 1 | zhu-xi -> confucianism |
| RULED | 1.0 | PERSON>CIVILIZATION | 1 | khosrow-i -> persian-empire |
| SPONSORED | 1.1 | CIVILIZATION>EVENT | 1 | islamic-civilization -> translation-movement |
| STRATEGIC_ADVISOR | 1.1 | PERSON>EVENT | 1 | nguyen-trai -> lam-son-uprising |
| SUBJECT_OF | 1.1 | PERSON>BOOK | 1 | gilgamesh -> epic-of-gilgamesh |
| SUCCEEDED_BY | 1.0 | - | 0 | - |
| SYNTHESIZED | 1.1 | PERSON>IDEA | 1 | han-feizi -> legalism |
| TAUGHT | 1.0 | PERSON>IDEA, PERSON>PERSON | 9 | socrates -> plato |
| WITNESSED | 1.0 | - | 0 | - |
| WORKED_AT | 1.1 | PERSON>EVENT | 1 | al-khwarizmi -> founding-of-house-of-wisdom |
| WROTE | 1.0 | PERSON>BOOK | 25 | plato -> the-republic |

## Việc kế tiếp

- Gom nhóm ngữ nghĩa (Human, Historical, Knowledge, Structural, Temporal) khi số loại vượt ngưỡng dùng được cho giao diện lọc của Knowledge Graph Lite.
- Các loại chỉ dùng 1 lần có thể gộp ở phiên bản sau nếu không có thêm dữ liệu.
