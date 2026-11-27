const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const booksPath = path.join(root, "data", "seed", "books.json");
const uncertaintyPath = path.join(root, "data", "review", "date-uncertainty.json");

const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

// 1. Fix panchatantra publicationYear (-300 BCE -> 300 CE per modern Sanskrit scholarship) & author attribution
const pancha = books.find((b) => b.slug === "panchatantra");
if (pancha) {
  pancha.publicationYear = 300;
  pancha.author = "Vishnu Sharma (Traditional Attribution)";
  pancha.authorVi = "Vishnu Sharma (Tương truyền)";
  console.log("✓ Updated panchatantra publicationYear: -300 -> 300 CE (modern Indology consensus) & traditional attribution");
}

// 2. Fix dresden-codex anachronistic "Classic Maya" -> "Postclassic Maya" (c. 1200 CE)
const dresden = books.find((b) => b.slug === "dresden-codex");
if (dresden) {
  dresden.author = "Postclassic Maya Scribes and Astronomers";
  console.log("✓ Updated dresden-codex author: Classic Maya -> Postclassic Maya (matching c. 1200 CE dating)");
}

// 3. Expand date-uncertainty.json with ancient & oral non-Vietnam works/people
const newUncertainties = [
  {
    entityType: "BOOK",
    slug: "panchatantra",
    field: "publicationYear",
    value: 300,
    issue: "approximate",
    note: "Modern Sanskrit scholarship (e.g., Patrick Olivelle, Franklin Edgerton) dates the earliest recoverable Sanskrit Pancatantra to c. 200–300 CE, though it draws on older South Asian oral fables; Vishnu Sharma is its traditional frame-story narrator.",
    suggestedDisplay: "c. 200–300 CE",
  },
  {
    entityType: "BOOK",
    slug: "dresden-codex",
    field: "publicationYear",
    value: 1200,
    issue: "approximate",
    note: "The Dresden Codex is a Postclassic Yucatec Maya manuscript generally dated to the 11th–14th centuries CE (commonly c. 1200–1250 CE), copying earlier Classic astronomical tables.",
    suggestedDisplay: "c. 1200–1250 CE",
  },
  {
    entityType: "BOOK",
    slug: "beowulf",
    field: "publicationYear",
    value: 750,
    issue: "disputed",
    note: "Scholars debate Beowulf's date of composition from the 8th century CE (c. 700–750 CE) to the late 10th or early 11th century CE; the sole surviving manuscript (Nowell Codex) dates to c. 1000 CE.",
    suggestedDisplay: "c. 8th–11th century CE (MS c. 1000 CE)",
  },
  {
    entityType: "BOOK",
    slug: "silappatikaram",
    field: "publicationYear",
    value: 500,
    issue: "disputed",
    note: "Most Tamil literary historians date Silappatikaram to the 5th–6th centuries CE, though some traditional chronologies place it earlier in the 2nd century CE.",
    suggestedDisplay: "c. 5th–6th century CE (disputed)",
  },
  {
    entityType: "BOOK",
    slug: "epic-of-sundiata",
    field: "publicationYear",
    value: 1235,
    issue: "approximate",
    note: "1235 CE marks the historical Battle of Krina and founding of the Mali Empire; the Mandinka griot oral epic developed over centuries and was first published in written form in the 20th century.",
    suggestedDisplay: "Events c. 1235 CE (oral tradition)",
  },
  {
    entityType: "BOOK",
    slug: "epic-of-king-gesar",
    field: "publicationYear",
    value: 1000,
    issue: "approximate",
    note: "1000 CE is an approximate anchor for the emergence of the Tibetan and Central Asian oral epic cycle of King Gesar, which expanded over many centuries.",
    suggestedDisplay: "c. 10th–12th century CE onward (oral)",
  },
  {
    entityType: "BOOK",
    slug: "epic-of-manas",
    field: "publicationYear",
    value: 950,
    issue: "approximate",
    note: "950 CE is a conventional anchor for the Kyrgyz oral epic tradition of Manas, first recorded in writing in the 19th century.",
    suggestedDisplay: "Oral tradition (trad. 9th–10th c. CE roots)",
  },
  {
    entityType: "BOOK",
    slug: "analects",
    field: "publicationYear",
    value: -475,
    issue: "approximate",
    note: "Compiled posthumously by Confucius's disciples and later Warring States / Han followers between the 5th and 2nd centuries BCE.",
    suggestedDisplay: "c. 475–221 BCE (compiled)",
  },
  {
    entityType: "BOOK",
    slug: "zhuangzi",
    field: "publicationYear",
    value: -300,
    issue: "approximate",
    note: "The Inner Chapters are generally attributed to Zhuang Zhou (c. 4th–3rd century BCE), while the Outer and Miscellaneous Chapters were added by later Daoist thinkers through the 2nd century BCE.",
    suggestedDisplay: "c. 300 BCE (Inner Chapters)",
  },
  {
    entityType: "BOOK",
    slug: "odyssey",
    field: "publicationYear",
    value: -725,
    issue: "approximate",
    note: "Modern scholarship generally places the crystallization of the Odyssey in the late 8th or early 7th century BCE, slightly later than the Iliad.",
    suggestedDisplay: "c. late 8th–early 7th century BCE",
  },
  {
    entityType: "PERSON",
    slug: "cyrus-the-great",
    field: "birthYear",
    value: -600,
    issue: "approximate",
    note: "Cyrus II's birth year is unattested (variously estimated c. 600–590 BCE or c. 576 BCE); his reign (559–530 BCE) and death in 530 BCE are well established.",
    suggestedDisplay: "c. 600–530 BCE",
  },
  {
    entityType: "PERSON",
    slug: "solon",
    field: "birthYear",
    value: -630,
    issue: "approximate",
    note: "Solon's exact birth and death years (c. 630 – c. 560 BCE) are approximate ancient reconstructions; his archonship and reforms in Athens are dated to 594/593 BCE.",
    suggestedDisplay: "c. 630 – c. 560 BCE",
  },
  {
    entityType: "PERSON",
    slug: "spearthrower-owl",
    field: "birthYear",
    value: 340,
    issue: "approximate",
    note: "Birth and death dates for the Teotihuacan-linked Maya figure Spearthrower Owl are approximate epigraphic reconstructions around his 374–439 CE attested activity.",
    suggestedDisplay: "fl. 374–439 CE",
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
fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");

console.log(`✓ Added ${addedU} date uncertainty entries (Total: ${uncertainties.length})`);
