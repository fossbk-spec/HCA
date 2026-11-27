const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const seedDir = path.join(root, "data", "seed");
const reviewDir = path.join(root, "data", "review");

const eventsPath = path.join(seedDir, "events.json");
const booksPath = path.join(seedDir, "books.json");
const relsPath = path.join(seedDir, "relationships.json");
const uncertaintyPath = path.join(reviewDir, "date-uncertainty.json");

let events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
let books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
let rels = JSON.parse(fs.readFileSync(relsPath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

// 1. Deduplicate vha-tran-nhu-nguyet-1077 -> song-dynasty-resistance-1077
const vha1077 = events.find((e) => e.slug === "vha-tran-nhu-nguyet-1077");
const core1077 = events.find((e) => e.slug === "song-dynasty-resistance-1077");
if (vha1077 && core1077) {
  core1077.civilizationSlug = "vietnam";
  core1077.sourceExternalId = vha1077.sourceExternalId || "vha:event:tran-nhu-nguyet-1077";
  core1077.content =
    "Confronted with Song invasion preparations, Ly Thuong Kiet launched a preemptive strike in 1075 against Song logistical hubs at Yongzhou, Qinzhou, and Lianzhou. When Song armies under Guo Kui and Zhao Xie advanced in 1076–1077, Dai Viet forces halted them along fortified ramparts on the Nhu Nguyet (Cau) River, leading to a negotiated withdrawal that preserved the northern frontier. Historians note that exact troop figures cited in traditional chronicles remain difficult to verify independently.";
  core1077.contentVi =
    "Trước nguy cơ xâm lược từ nhà Tống, năm 1075 Thái úy Lý Thường Kiệt chủ động thực hiện chiến lược 'tiên phát chế nhân', tập kích các căn cứ hậu cần ở Ung Châu, Khâm Châu và Liêm Châu. Khi đại quân Tống do Quách Quỳ và Triệu Tiết tiến sang năm 1076–1077, quân dân Đại Việt đã chặn đứng đối phương trên phòng tuyến sông Như Nguyệt (sông Cầu), buộc nhà Tống phải chấp nhận giảng hòa và rút quân, giữ vững biên cương phía Bắc. Các nhà sử học lưu ý rằng những con số quân đội cụ thể trong sử liệu cổ còn khó kiểm chứng độc lập.";
  events = events.filter((e) => e.slug !== "vha-tran-nhu-nguyet-1077");
  console.log("✓ Merged vha-tran-nhu-nguyet-1077 into song-dynasty-resistance-1077");
}

// 2. Deduplicate vha-quoc-trieu-hinh-luat -> quoc-trieu-hinh-luat (and refine legal-historical nuance)
const vhaHongDuc = books.find((b) => b.slug === "vha-quoc-trieu-hinh-luat");
const coreHongDuc = books.find((b) => b.slug === "quoc-trieu-hinh-luat");
if (vhaHongDuc && coreHongDuc) {
  coreHongDuc.civilizationSlug = "vietnam";
  coreHongDuc.sourceExternalId = vhaHongDuc.sourceExternalId || "vha:document:quoc-trieu-hinh-luat";
  coreHongDuc.content =
    "The Hong Duc Code (Quoc Trieu Hinh Luat) represents the institutional apex of pre-modern Vietnamese law, compiled and revised across the reign of Emperor Le Thanh Tong (1470–1497, traditionally dated 1483). Spanning 6 volumes, 13 chapters, and 722 articles, it regulated criminal justice, administration, land tenure, family law, and official accountability. Historians note its distinctive protections for women's property and conditional inheritance (such as huong hoa ancestral-worship land in the absence of male heirs), as well as safeguards for the elderly and vulnerable, while cautioning against equating these provisions with modern gender equality.";
  coreHongDuc.contentVi = vhaHongDuc.contentVi;
  books = books.filter((b) => b.slug !== "vha-quoc-trieu-hinh-luat");
  console.log("✓ Merged vha-quoc-trieu-hinh-luat into quoc-trieu-hinh-luat");
}

// 3. Add civilizationSlug: "vietnam" to remaining Vietnam-specific events & books
for (const slug of ["construction-of-co-loa", "promulgation-of-hong-duc-code"]) {
  const ev = events.find((e) => e.slug === slug);
  if (ev && !ev.civilizationSlug) {
    ev.civilizationSlug = "vietnam";
  }
}
for (const slug of ["hai-thuong-y-tong-tam-linh", "dam-san", "de-dat-de-nuoc"]) {
  const bk = books.find((b) => b.slug === slug);
  if (bk && !bk.civilizationSlug) {
    bk.civilizationSlug = "vietnam";
  }
}

// 4. Remap relationships from removed duplicate slugs -> canonical slugs and deduplicate
const slugMap = {
  "vha-tran-nhu-nguyet-1077": "song-dynasty-resistance-1077",
  "vha-quoc-trieu-hinh-luat": "quoc-trieu-hinh-luat",
};

const relKey = (r) => `${r.sourceSlug}|${r.sourceType}|${r.targetSlug}|${r.targetType}|${r.relationshipType}`;
const seenRels = new Set();
const dedupedRels = [];

for (const r of rels) {
  const mapped = {
    ...r,
    sourceSlug: slugMap[r.sourceSlug] || r.sourceSlug,
    targetSlug: slugMap[r.targetSlug] || r.targetSlug,
  };
  // Drop redundant LED if COMMANDED already exists for ly-thuong-kiet -> song-dynasty-resistance-1077
  if (
    mapped.sourceSlug === "ly-thuong-kiet" &&
    mapped.targetSlug === "song-dynasty-resistance-1077" &&
    mapped.relationshipType === "LED"
  ) {
    continue;
  }
  const k = relKey(mapped);
  if (!seenRels.has(k)) {
    seenRels.add(k);
    dedupedRels.push(mapped);
  }
}

// 5. Add scholarly date-uncertainty entries
const newUncertainties = [
  {
    entityType: "CIVILIZATION",
    slug: "vietnam",
    field: "periodStart",
    value: -2879,
    issue: "legendary",
    note: "2879 BCE reflects the traditional Hong Bang chronology recorded in later medieval chronicles (such as Dai Viet Su Ky Toan Thu); archaeological evidence for complex bronze-age Dong Son polities in northern Vietnam dates primarily to the 1st millennium BCE.",
    suggestedDisplay: "c. 2879 BCE (traditional) / 1st millennium BCE (archaeological)",
  },
  {
    entityType: "CIVILIZATION",
    slug: "ancient-china",
    field: "periodStart",
    value: -2070,
    issue: "approximate",
    note: "2070 BCE follows the Xia-Shang-Zhou Chronology Project convention for the start of the Xia dynasty; archaeological correlation with the Erlitou culture remains debated.",
    suggestedDisplay: "c. 2070 BCE (traditional Xia)",
  },
  {
    entityType: "EVENT",
    slug: "construction-of-co-loa",
    field: "startYear",
    value: -257,
    issue: "approximate",
    note: "257 BCE is the conventional traditional date for An Duong Vuong's founding of Au Lac and Co Loa; radiocarbon and archaeological studies of the ramparts place major construction phases around the 3rd–2nd centuries BCE.",
    suggestedDisplay: "c. 3rd–2nd century BCE (trad. 257 BCE)",
  },
  {
    entityType: "BOOK",
    slug: "quoc-trieu-hinh-luat",
    field: "publicationYear",
    value: 1483,
    issue: "approximate",
    note: "1483 CE (Hong Duc 14) is the traditional benchmark date for the code's formal revision and promulgation, though compilation and amendments spanned Le Thanh Tong's reign (1470–1497 CE) and earlier Le reigns.",
    suggestedDisplay: "c. 1483 CE (compiled 1470–1497)",
  },
];

const uKey = (u) => `${u.entityType}|${u.slug}|${u.field}`;
const seenU = new Set(uncertainties.map(uKey));
let addedU = 0;
for (const u of newUncertainties) {
  if (!seenU.has(uKey(u))) {
    uncertainties.push(u);
    seenU.add(uKey(u));
    addedU++;
  }
}

fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
fs.writeFileSync(booksPath, JSON.stringify(books, null, 2) + "\n", "utf-8");
fs.writeFileSync(relsPath, JSON.stringify(dedupedRels, null, 2) + "\n", "utf-8");
fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");

console.log(`✓ Events: ${events.length}, Books: ${books.length}, Relationships: ${dedupedRels.length}, Uncertainties: ${uncertainties.length} (+${addedU})`);
