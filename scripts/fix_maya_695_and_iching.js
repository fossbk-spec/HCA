const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const eventsPath = path.join(root, "data", "seed", "events.json");
const booksPath = path.join(root, "data", "seed", "books.json");
const relsPath = path.join(root, "data", "seed", "relationships.json");

const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
let rels = JSON.parse(fs.readFileSync(relsPath, "utf-8"));

// 1. Fix tikal-defeat-of-calakmul summaryVi ("bắt sống quốc vương Calakmul" -> accurately reflects capturing sacred effigies; Yuknoom Yich'aak K'ahk' survived)
const tikal695 = events.find((e) => e.slug === "tikal-defeat-of-calakmul");
if (tikal695) {
  tikal695.summaryVi =
    "Vua Jasaw Chan K'awiil I của Tikal đánh bại quân Calakmul và đoạt tượng thần bảo hộ của đối phương trong trận chiến lịch sử, tái lập vị thế bá chủ của Tikal khắp vùng đất thấp Maya.";
  console.log("✓ Fixed tikal-defeat-of-calakmul summaryVi (removed inaccurate capture of king)");
}

// 2. Refine i-ching author attribution
const iching = books.find((b) => b.slug === "i-ching");
if (iching) {
  iching.author = "Traditional: King Wen, Duke of Zhou; Ten Wings attributed to Confucius";
  iching.authorVi = "Tương truyền: Phục Hy, Văn Vương, Chu Công; Thập dực quy cho Khổng Tử";
  iching.contentVi =
    "Kinh Dịch nhìn nhận vũ trụ là một dòng biến dịch không ngừng (dịch giả, biến dịch dã). Phần Kinh có nguồn gốc bói toán thời Tây Chu, còn hệ thống chú giải Thập dực (thường được truyền thống quy cho Khổng Tử nhưng các học giả hiện đại xác định biên soạn vào thời Chiến Quốc – đầu Hán) đã nâng tầm tác phẩm thành triết học vũ trụ luận và nghệ thuật lãnh đạo.";
  console.log("✓ Refined i-ching scholarly attribution");
}

// 3. Remove anachronistic yuknoom-the-great (died 686) -> COMMANDED -> tikal-defeat-of-calakmul (695)
const beforeLen = rels.length;
rels = rels.filter(
  (r) =>
    !(
      r.sourceSlug === "yuknoom-the-great" &&
      r.targetSlug === "tikal-defeat-of-calakmul" &&
      r.relationshipType === "COMMANDED"
    )
);
console.log(`✓ Removed anachronistic relationship (${beforeLen} -> ${rels.length})`);

// Add accurate Ontology 1.1 relationships for yuknoom-the-great
const replacements = [
  {
    sourceSlug: "yuknoom-the-great",
    sourceType: "PERSON",
    targetSlug: "maya-civilization",
    targetType: "CIVILIZATION",
    relationshipType: "RULED",
  },
  {
    sourceSlug: "yuknoom-the-great",
    sourceType: "PERSON",
    targetSlug: "maya-divine-kingship-kuhul-ajaw",
    targetType: "IDEA",
    relationshipType: "EXEMPLIFIED",
  },
];

const relKey = (r) => `${r.sourceSlug}|${r.sourceType}|${r.targetSlug}|${r.targetType}|${r.relationshipType}`;
const seen = new Set(rels.map(relKey));
for (const r of replacements) {
  if (!seen.has(relKey(r))) {
    rels.push(r);
    seen.add(relKey(r));
  }
}

fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
fs.writeFileSync(booksPath, JSON.stringify(books, null, 2) + "\n", "utf-8");
fs.writeFileSync(relsPath, JSON.stringify(rels, null, 2) + "\n", "utf-8");

console.log(`✓ Final relationships count: ${rels.length}`);
