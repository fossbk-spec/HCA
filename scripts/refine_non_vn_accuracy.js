const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const seedDir = path.join(root, "data", "seed");
const reviewDir = path.join(root, "data", "review");

const booksPath = path.join(seedDir, "books.json");
const peoplePath = path.join(seedDir, "people.json");
const eventsPath = path.join(seedDir, "events.json");
const uncertaintyPath = path.join(reviewDir, "date-uncertainty.json");

const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
const people = JSON.parse(fs.readFileSync(peoplePath, "utf-8"));
const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

// 1. Fix enuma-elish publicationYear (-1750 outdated -> -1100 modern Assyriology consensus)
const enuma = books.find((b) => b.slug === "enuma-elish");
if (enuma) {
  enuma.publicationYear = -1100;
  console.log("✓ Updated enuma-elish publicationYear: -1750 -> -1100 (late 2nd millennium BCE consensus)");
}

// 2. Fix kalevala publicationYear (1835 Old Kalevala 32 runes -> 1849 canonical 50-rune 22,795-line edition)
const kalevala = books.find((b) => b.slug === "kalevala");
if (kalevala) {
  kalevala.publicationYear = 1849;
  console.log("✓ Updated kalevala publicationYear: 1835 -> 1849 (matching 50-rune, 22,795-line canonical edition)");
}

// 3. Refine Hippocrates historical accuracy (Hippocratic Corpus & "First, do no harm" attribution)
const hippocrates = people.find((p) => p.slug === "hippocrates");
if (hippocrates) {
  hippocrates.summary =
    'Ancient Greek physician celebrated as the "Father of Medicine," who helped separate medicine from supernatural explanations and inspired the ethical tradition of the Hippocratic Corpus.';
  hippocrates.content =
    'Associated with the medical school on the island of Kos, Hippocrates helped transform Greek healing by treating disease as a natural phenomenon rather than divine punishment. The surviving Hippocratic Corpus—compiled by multiple physicians across the 5th and 4th centuries BCE—emphasizes clinical observation, prognosis, dietetics, and the ethical duty expressed in Epidemics ("to help, or at least to do no harm") alongside the Hippocratic Oath.';
  hippocrates.summaryVi =
    "Thầy thuốc Hy Lạp cổ đại được tôn vinh là 'Người cha của Y học phương Tây', góp phần tách y học khỏi giải thích siêu nhiên và khơi nguồn truyền thống y đức trong bộ sách Hippocrates.";
  hippocrates.contentVi =
    "Hippocrates (khoảng 460–370 TCN) gắn liền với trường phái y học trên đảo Kos, nơi coi bệnh tật phát sinh từ các nguyên nhân tự nhiên, lối sống và môi trường thay vì sự trừng phạt của thần linh. Tuyển tập Hippocratic Corpus—do nhiều thầy thuốc biên soạn qua các thế kỷ V–IV TCN—đề cao quan sát lâm sàng, tiên lượng bệnh và chuẩn mực y đức (như Lời thề Hippocrates và nguyên tắc trong sách Dịch tễ: 'giúp ích, hoặc ít nhất không gây hại').";
  console.log("✓ Refined hippocrates historical attribution");
}

// 4. Refine Pythagoras contentVi (right-triangle relation pre-existed in Babylon/India)
const pythagoras = people.find((p) => p.slug === "pythagoras");
if (pythagoras) {
  pythagoras.contentVi =
    "Pythagoras xứ Samos (khoảng 570–495 TCN) sáng lập một hội huynh đệ triết học và tôn giáo tại Crotone (nam Ý). Truyền thống cổ đại gắn tên tuổi ông với việc phát hiện tỷ lệ toán học trong hòa âm âm nhạc, học thuyết 'Vạn vật đều là con số' và định lý tam giác vuông mang tên ông—dù quan hệ cạnh tam giác vuông đã được biết từ trước tại Lưỡng Hà và Ấn Độ, còn chứng minh suy diễn gắn với truyền thống Pythagoras về sau.";
  console.log("✓ Refined pythagoras historical nuance");
}

// 5. Refine House of Wisdom ("university" -> "imperial library and scholarly center")
const houseOfWisdom = events.find((e) => e.slug === "founding-of-house-of-wisdom");
if (houseOfWisdom) {
  houseOfWisdom.summary =
    "Abbasid Caliphs Harun al-Rashid and Al-Ma'mun developed Baghdad's premier imperial library and scholarly center, translating and expanding scientific heritage.";
  houseOfWisdom.content =
    "Developed in Baghdad during the Abbasid Caliphate—especially under Caliphs Harun al-Rashid and al-Ma'mun—the Bayt al-Hikma (House of Wisdom) functioned as a palatine library, translation center, and hub for astronomical and mathematical inquiry. Scholars of diverse backgrounds (Muslims, Christians, Jews, Zoroastrians) translated Greek, Syriac, Persian, and Sanskrit manuscripts into Arabic, catalyzing centuries of scientific and philosophical advances.";
  houseOfWisdom.summaryVi =
    "Triều Abbasid phát triển thư viện hoàng gia và trung tâm học thuật lớn tại Baghdad, hạt nhân của Phong trào Dịch thuật và các đột phá khoa học Thời kỳ Hoàng kim Hồi giáo.";
  console.log("✓ Refined founding-of-house-of-wisdom institutional description");
}

// 6. Expand date-uncertainty.json for non-Vietnam entities
const newUncertainties = [
  {
    entityType: "PERSON",
    slug: "khufu",
    field: "birthYear",
    value: -2589,
    issue: "reign-not-life",
    note: "2589–2566 BCE reflects the conventional Egyptological dating of Khufu's Fourth Dynasty reign rather than his birth and death years, which are unrecorded.",
    suggestedDisplay: "r. c. 2589–2566 BCE",
  },
  {
    entityType: "PERSON",
    slug: "narmer",
    field: "birthYear",
    value: -3150,
    issue: "approximate",
    note: "Narmer's exact birth and death years are unknown; Egyptologists generally place his reign and the unification of Upper and Lower Egypt around c. 3150–3100 BCE.",
    suggestedDisplay: "fl. c. 3150–3100 BCE",
  },
  {
    entityType: "PERSON",
    slug: "pythagoras",
    field: "birthYear",
    value: -570,
    issue: "approximate",
    note: "Pythagoras left no writings; both c. 570 BCE and c. 495 BCE are approximate reconstructions from later ancient biographies.",
    suggestedDisplay: "c. 570 – c. 495 BCE",
  },
  {
    entityType: "PERSON",
    slug: "euclid",
    field: "birthYear",
    value: -325,
    issue: "approximate",
    note: "Euclid's exact birth and death years are unattested in surviving sources; he flourished in Alexandria c. 300 BCE during the reign of Ptolemy I Soter.",
    suggestedDisplay: "fl. c. 300 BCE (c. 325–265 BCE)",
  },
  {
    entityType: "PERSON",
    slug: "hippocrates",
    field: "birthYear",
    value: -460,
    issue: "approximate",
    note: "c. 460 – c. 370 BCE are traditional approximate dates for Hippocrates of Kos; ancient sources vary on his exact death year (often placed between 377 and 370 BCE).",
    suggestedDisplay: "c. 460 – c. 370 BCE",
  },
  {
    entityType: "PERSON",
    slug: "panini",
    field: "birthYear",
    value: -520,
    issue: "disputed",
    note: "Scholars debate Panini's lifetime between the 6th, 5th, and 4th centuries BCE (commonly placed c. 5th–4th century BCE based on linguistic and historical references).",
    suggestedDisplay: "c. 5th–4th century BCE (disputed)",
  },
  {
    entityType: "PERSON",
    slug: "yax-ehb-xook",
    field: "birthYear",
    value: 60,
    issue: "approximate",
    note: "Yax Ehb Xook, dynastic founder of Tikal, is known from retrospective Classic Maya inscriptions; dates around the late 1st century CE are approximate archaeological reconstructions.",
    suggestedDisplay: "fl. c. 60–110 CE",
  },
  {
    entityType: "EVENT",
    slug: "founding-of-rome",
    field: "startYear",
    value: -753,
    issue: "legendary",
    note: "753 BCE is the canonical Varronian date from Roman tradition; archaeological evidence shows Iron Age settlements on Rome's hills from the 10th–8th centuries BCE coalescing into an urban polity later.",
    suggestedDisplay: "753 BCE (traditional)",
  },
  {
    entityType: "EVENT",
    slug: "first-ancient-olympic-games",
    field: "startYear",
    value: -776,
    issue: "approximate",
    note: "776 BCE is the traditional date compiled by Hippias of Elis; modern historians debate whether the Games began precisely in 776 BCE or slightly later around 700 BCE.",
    suggestedDisplay: "776 BCE (traditional)",
  },
  {
    entityType: "EVENT",
    slug: "control-of-fire-by-early-humans",
    field: "startYear",
    value: -400000,
    issue: "disputed",
    note: "Archaeologists distinguish opportunistic use of fire (possibly >1 million years ago at Wonderwerk Cave) from habitual, controlled fire-making, which becomes widespread between c. 400,000 and 300,000 BP.",
    suggestedDisplay: "c. 400,000–300,000 BCE (habitual control)",
  },
  {
    entityType: "BOOK",
    slug: "enuma-elish",
    field: "publicationYear",
    value: -1100,
    issue: "disputed",
    note: "Modern Assyriologists generally date Enuma Elish to the late 2nd millennium BCE (c. 12th–11th century BCE, often linked to Nebuchadnezzar I), revising older hypotheses of an Old Babylonian (c. 1750 BCE) origin.",
    suggestedDisplay: "c. 12th–11th century BCE",
  },
  {
    entityType: "BOOK",
    slug: "kalevala",
    field: "publicationYear",
    value: 1849,
    issue: "approximate",
    note: "Elias Lonnrot published the first 32-poem edition (Old Kalevala) in 1835 and the expanded canonical 50-poem, 22,795-line edition (New Kalevala) in 1849.",
    suggestedDisplay: "1849 (1st ed. 1835)",
  },
  {
    entityType: "BOOK",
    slug: "the-quran",
    field: "publicationYear",
    value: 632,
    issue: "approximate",
    note: "632 CE marks the completion of the Quran's oral revelation upon the death of Prophet Muhammad; the standardized Uthmanic written codex was compiled c. 650 CE.",
    suggestedDisplay: "610–632 CE (codified c. 650 CE)",
  },
  {
    entityType: "BOOK",
    slug: "mahabharata",
    field: "publicationYear",
    value: -400,
    issue: "disputed",
    note: "The Mahabharata evolved over centuries; scholars generally date its main textual composition between c. 400 BCE and 400 CE.",
    suggestedDisplay: "c. 400 BCE – 400 CE",
  },
  {
    entityType: "BOOK",
    slug: "ramayana",
    field: "publicationYear",
    value: -500,
    issue: "disputed",
    note: "The Sanskrit Ramayana was composed and expanded over several centuries, with core strata often dated c. 5th–4th century BCE through the 3rd century CE.",
    suggestedDisplay: "c. 500 BCE – 300 CE",
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

fs.writeFileSync(booksPath, JSON.stringify(books, null, 2) + "\n", "utf-8");
fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2) + "\n", "utf-8");
fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");

console.log(`✓ Added ${addedU} non-VN date uncertainty entries (Total: ${uncertainties.length})`);
