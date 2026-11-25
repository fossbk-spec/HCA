#!/usr/bin/env node
/**
 * scripts/apply_bilingual_and_graph_enrichment.js
 *
 * 1. Populates accurate scholarly English fields (title, summary, author)
 *    for the 27 federated Vietnamese entities in data/seed/{events,ideas,books}.json.
 * 2. Connects the 9 newly ingested Vietnamese books to their HCA authors/sovereigns
 *    and core ideas using valid Ontology 1.1 relationship types & signatures.
 */

const fs = require("node:fs");
const path = require("node:path");

const SEED_DIR = path.resolve(__dirname, "..", "data", "seed");

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(SEED_DIR, name), "utf-8"));
}
function writeJson(name, data) {
  fs.writeFileSync(path.join(SEED_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

const eventTranslations = {
  "vha-bach-dang-938": {
    title: "Battle of Bach Dang River (938)",
    summary: "In 938 CE, Ngo Quyen defeated the Southern Han naval fleet on the Bach Dang River using iron-tipped wooden stakes timed with the receding tide, ending a millennium of Chinese imperial rule."
  },
  "vha-cai-cach-khuc-hao": {
    title: "Administrative Reforms of Khuc Hao",
    summary: "Following 907 CE, Khuc Hao instituted administrative reforms under the principle of 'leniency, simplicity, and peace for the people,' reorganizing local governance into lo, phu, chau, giap, and xa."
  },
  "vha-chien-dich-dien-bien-phu": {
    title: "Battle of Dien Bien Phu (1954)",
    summary: "The decisive 1954 military campaign in northwestern Vietnam in which Viet Minh forces defeated the French Union garrison, leading to the Geneva Accords and the end of French colonial rule in Indochina."
  },
  "vha-chien-thang-ngoc-hoi-dong-da": {
    title: "Victory of Ngoc Hoi - Dong Da (1789)",
    summary: "During the Lunar New Year of 1789, Emperor Quang Trung (Nguyen Hue) led the Tay Son army in a rapid surprise offensive that routed Qing expeditionary forces near Thang Long."
  },
  "vha-dep-loan-12-su-quan": {
    title: "Unification of the Twelve Warlords",
    summary: "Between 965 and 968 CE, Dinh Bo Linh subdued twelve competing regional warlords, reunifying the country and establishing the Dai Co Viet state at Hoa Lu."
  },
  "vha-doi-do-ve-thang-long": {
    title: "Relocation of the Capital to Thang Long (1010)",
    summary: "In 1010 CE, King Ly Thai To (Ly Cong Uan) moved the royal capital from Hoa Lu to Dai La citadel, renaming it Thang Long (Ascending Dragon) and ushering in an era of cultural and institutional flourishing."
  },
  "vha-khang-chien-chong-mong-nguyen": {
    title: "Three Wars of Resistance Against the Mongol-Yuan Invasions",
    summary: "Between 1258 and 1288, the Tran dynasty repelled three major Mongol and Yuan invasions through scorched-earth logistics, civic mobilization, and decisive victories such as Bach Dang (1288)."
  },
  "vha-khang-chien-chong-tan": {
    title: "Resistance Against the Qin Invasions",
    summary: "In the late 3rd century BCE (traditionally c. 214–208 BCE), Lac Viet and Au Viet communities resisted Qin southern expansion before An Duong Vuong consolidated the Au Lac polity at Co Loa."
  },
  "vha-khang-chien-chong-tong-981": {
    title: "First Resistance Against the Song Dynasty (981)",
    summary: "In 981 CE, Le Hoan (Emperor Le Dai Hanh) led Dai Co Viet forces to defeat a Song expeditionary invasion on land and river, safeguarding newly won independence."
  },
  "vha-khoi-nghia-ba-trieu": {
    title: "Uprising of Lady Trieu (248 CE)",
    summary: "In 248 CE, Trieu Thi Trinh (Ba Trieu) led an armed uprising in Cuu Chan against Eastern Wu rule, becoming an enduring symbol of resistance and female leadership in Vietnamese history."
  },
  "vha-khoi-nghia-hai-ba-trung": {
    title: "Uprising of the Trung Sisters (40–43 CE)",
    summary: "In 40 CE, Trung Trac and Trung Nhi rallied local lords across Giao Chi and neighboring commanderies against Eastern Han administration, establishing an independent court at Me Linh before being suppressed in 43 CE."
  },
  "vha-khoi-nghia-lam-son": {
    title: "Lam Son Uprising (1418–1428)",
    summary: "A ten-year war of independence led by Le Loi and strategist Nguyen Trai against Ming occupation, culminating in the restoration of Dai Viet sovereignty and the founding of the Later Le dynasty."
  },
  "vha-khoi-nghia-ly-bi-lap-nuoc-van-xuan": {
    title: "Ly Bi Uprising and Founding of Van Xuan (542–602)",
    summary: "In 542 CE, Ly Bi rose against Liang dynasty rule, proclaimed himself Emperor Ly Nam De in 544, and named the state Van Xuan (Ten Thousand Springs)."
  },
  "vha-khoi-nghia-mai-thuc-loan": {
    title: "Uprising of Mai Thuc Loan (722 CE)",
    summary: "In 722 CE, Mai Thuc Loan (Mai Hac De) led a major rebellion in Hoan Chau against Tang taxation and forced labor, forming regional alliances before the Tang military counteroffensive."
  },
  "vha-tran-nhu-nguyet-1077": {
    title: "Battle of the Nhu Nguyet River Line (1077)",
    summary: "In 1076–1077, Grand Preceptor Ly Thuong Kiet defended the Nhu Nguyet (Cau) River line against a major Song invasion, forcing a negotiated withdrawal that preserved Dai Viet's northern frontier."
  }
};

const ideaTranslations = {
  "vha-culture-and-thought": {
    title: "Vietnamese Culture, Thought, and Religion",
    summary: "The historical evolution of Vietnamese cultural traditions, syncretic 'Three Teachings' (Buddhism, Confucianism, Daoism), Truc Lam Zen, Chu Nom vernacular script, and folk ancestor veneration."
  },
  "vha-sovereignty-and-defense": {
    title: "Formation and Defense of Sovereignty",
    summary: "The institutional, strategic, and intellectual traditions through which polities and communities in Vietnam asserted, defended, and articulated political autonomy across centuries."
  },
  "vha-state-governance-and-law": {
    title: "State Governance and Legal Institutions",
    summary: "The development of Vietnamese statecraft, administrative hierarchies, civil service examinations, and codified legal systems from the Hinh Thu (1042) to the Hong Duc Code (15th century)."
  }
};

const bookTranslations = {
  "vha-binh-ngo-dai-cao": {
    title: "Great Proclamation upon the Pacification of the Wu (Binh Ngo Dai Cao)",
    author: "Nguyen Trai (on behalf of Emperor Le Thai To)",
    summary: "Composed in 1428 by Nguyen Trai for Emperor Le Loi after the Lam Son victory, this foundational prose-poem declares Dai Viet's distinct civilization, moral basis of rule, and restored independence."
  },
  "vha-chieu-cau-hien": {
    title: "Edict Seeking Worthy Scholars (Chieu Cau Hien)",
    author: "Ngo Thi Nham (on behalf of Emperor Quang Trung)",
    summary: "Issued c. 1788–1789 for Emperor Quang Trung, this state edict appeals to northern literati to serve the new Tay Son administration regardless of past political allegiance."
  },
  "vha-chieu-doi-do": {
    title: "Edict on the Transfer of the Capital (Chieu Doi Do)",
    author: "Emperor Ly Thai To (Ly Cong Uan)",
    summary: "Promulgated in 1010 CE by King Ly Thai To, this classic political prose text justifies relocating the capital from Hoa Lu to Dai La (Thang Long) based on geomancy, geography, and long-term statecraft."
  },
  "vha-dai-viet-su-ky-toan-thu": {
    title: "Complete Annals of Dai Viet (Dai Viet Su Ky Toan Thu)",
    author: "Ngo Si Lien and Royal Historians of the Later Le Dynasty",
    summary: "The preeminent official chronological chronicle of Dai Viet, compiled by Ngo Si Lien (1479) and expanded by subsequent court historians, recording history from the Hong Bang era to 1675."
  },
  "vha-hich-tuong-si": {
    title: "Proclamation to the Officers (Hich Tuong Si)",
    author: "Tran Hung Dao (Tran Quoc Tuan)",
    summary: "Written in 1284 by Supreme Commander Tran Hung Dao prior to the second Mongol-Yuan invasion, this military exhortation appeals to loyalty, honor, and rigorous tactical training."
  },
  "vha-linh-nam-chich-quai": {
    title: "Selection of Strange Tales in Linh Nam (Linh Nam Chich Quai)",
    author: "Tran The Phap (edited by Vu Quynh and Kieu Phu, 1492)",
    summary: "A 14th-century compilation of Vietnamese foundation myths, legends, and folk tales—including Lac Long Quan and Au Co, Co Loa, and Son Tinh - Thuy Tinh."
  },
  "vha-nam-quoc-son-ha": {
    title: "Mountains and Rivers of the Southern Country (Nam Quoc Son Ha)",
    author: "Traditionally attributed to Ly Thuong Kiet",
    summary: "A celebrated four-line Classical Chinese poem associated with the 1076–1077 resistance along the Nhu Nguyet River, affirming the Heaven-mandated sovereignty of the Southern realm."
  },
  "vha-quoc-trieu-hinh-luat": {
    title: "Penal Code of the National Dynasty (Hong Duc Code)",
    author: "Later Le Court (under Emperor Le Thanh Tong)",
    summary: "Compiled under Emperor Le Thanh Tong (1470–1497), this 722-article legal code is noted by historians for its comprehensive civil, criminal, administrative, and family property provisions."
  },
  "vha-viet-dien-u-linh-tap": {
    title: "Departed Spirits of the Viet Realm (Viet Dien U Linh Tap)",
    author: "Ly Te Xuyen",
    summary: "Compiled in 1329 by Ly Te Xuyen, this hagiographical collection records the tutelary deities, deified monarchs, and national heroes venerated in Dai Viet temples."
  }
};

// 1. Update Events
const events = readJson("events.json");
let evUpdated = 0;
for (const ev of events) {
  if (eventTranslations[ev.slug]) {
    ev.title = eventTranslations[ev.slug].title;
    ev.summary = eventTranslations[ev.slug].summary;
    evUpdated++;
  }
}
writeJson("events.json", events);

// 2. Update Ideas
const ideas = readJson("ideas.json");
let idUpdated = 0;
for (const idea of ideas) {
  if (ideaTranslations[idea.slug]) {
    idea.title = ideaTranslations[idea.slug].title;
    idea.summary = ideaTranslations[idea.slug].summary;
    idUpdated++;
  }
}
writeJson("ideas.json", ideas);

// 3. Update Books
const books = readJson("books.json");
let bkUpdated = 0;
for (const bk of books) {
  if (bookTranslations[bk.slug]) {
    bk.title = bookTranslations[bk.slug].title;
    bk.author = bookTranslations[bk.slug].author;
    bk.summary = bookTranslations[bk.slug].summary;
    bkUpdated++;
  }
}
writeJson("books.json", books);

// 4. Add Ontology 1.1 Relationships for the 9 VHA books
const rels = readJson("relationships.json");
const existingKeys = new Set(
  rels.map(r => `${r.sourceSlug}|${r.sourceType}|${r.targetSlug}|${r.targetType}|${r.relationshipType}`)
);

const newBookRels = [
  // Authors / Sovereigns -> Books (Ontology 1.1: WROTE, PROCLAIMED, PROMULGATED)
  { sourceSlug: "nguyen-trai", sourceType: "PERSON", targetSlug: "vha-binh-ngo-dai-cao", targetType: "BOOK", relationshipType: "WROTE" },
  { sourceSlug: "le-loi", sourceType: "PERSON", targetSlug: "vha-binh-ngo-dai-cao", targetType: "BOOK", relationshipType: "PROCLAIMED" },
  { sourceSlug: "tran-hung-dao", sourceType: "PERSON", targetSlug: "vha-hich-tuong-si", targetType: "BOOK", relationshipType: "WROTE" },
  { sourceSlug: "ly-thuong-kiet", sourceType: "PERSON", targetSlug: "vha-nam-quoc-son-ha", targetType: "BOOK", relationshipType: "WROTE" },
  { sourceSlug: "le-thanh-tong", sourceType: "PERSON", targetSlug: "vha-quoc-trieu-hinh-luat", targetType: "BOOK", relationshipType: "PROMULGATED" },
  { sourceSlug: "quang-trung", sourceType: "PERSON", targetSlug: "vha-chieu-cau-hien", targetType: "BOOK", relationshipType: "PROCLAIMED" },
  // Books -> Ideas (Ontology 1.1: AFFIRMED, ARTICULATED)
  { sourceSlug: "vha-binh-ngo-dai-cao", sourceType: "BOOK", targetSlug: "vha-sovereignty-and-defense", targetType: "IDEA", relationshipType: "AFFIRMED" },
  { sourceSlug: "vha-nam-quoc-son-ha", sourceType: "BOOK", targetSlug: "vha-sovereignty-and-defense", targetType: "IDEA", relationshipType: "AFFIRMED" },
  { sourceSlug: "vha-hich-tuong-si", sourceType: "BOOK", targetSlug: "vha-sovereignty-and-defense", targetType: "IDEA", relationshipType: "AFFIRMED" },
  { sourceSlug: "vha-chieu-doi-do", sourceType: "BOOK", targetSlug: "vha-state-governance-and-law", targetType: "IDEA", relationshipType: "ARTICULATED" },
  { sourceSlug: "vha-quoc-trieu-hinh-luat", sourceType: "BOOK", targetSlug: "vha-state-governance-and-law", targetType: "IDEA", relationshipType: "ARTICULATED" },
  { sourceSlug: "vha-chieu-cau-hien", sourceType: "BOOK", targetSlug: "vha-state-governance-and-law", targetType: "IDEA", relationshipType: "ARTICULATED" },
  { sourceSlug: "vha-dai-viet-su-ky-toan-thu", sourceType: "BOOK", targetSlug: "vha-culture-and-thought", targetType: "IDEA", relationshipType: "ARTICULATED" },
  { sourceSlug: "vha-linh-nam-chich-quai", sourceType: "BOOK", targetSlug: "vha-culture-and-thought", targetType: "IDEA", relationshipType: "ARTICULATED" },
  { sourceSlug: "vha-viet-dien-u-linh-tap", sourceType: "BOOK", targetSlug: "vha-culture-and-thought", targetType: "IDEA", relationshipType: "ARTICULATED" },
  // Additional cross-entity links for Vietnam figures & ideas
  { sourceSlug: "quang-trung", sourceType: "PERSON", targetSlug: "vha-chien-thang-ngoc-hoi-dong-da", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "dinh-bo-linh", sourceType: "PERSON", targetSlug: "vha-dep-loan-12-su-quan", targetType: "EVENT", relationshipType: "LED" }
];

let addedRels = 0;
for (const r of newBookRels) {
  const key = `${r.sourceSlug}|${r.sourceType}|${r.targetSlug}|${r.targetType}|${r.relationshipType}`;
  if (!existingKeys.has(key)) {
    existingKeys.add(key);
    rels.push(r);
    addedRels++;
  }
}
writeJson("relationships.json", rels);

console.log(`Updated English scholarly fields: ${evUpdated} events, ${idUpdated} ideas, ${bkUpdated} books.`);
console.log(`Added ${addedRels} Ontology 1.1 relationships (total: ${rels.length}).`);
