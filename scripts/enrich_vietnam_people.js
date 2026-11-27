const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const seedDir = path.join(root, "data", "seed");
const fedPeoplePath = path.join(root, "data", "federated", "vha", "people.json");
const reviewDir = path.join(root, "data", "review");

const peoplePath = path.join(seedDir, "people.json");
const relsPath = path.join(seedDir, "relationships.json");
const uncertaintyPath = path.join(reviewDir, "date-uncertainty.json");

const people = JSON.parse(fs.readFileSync(peoplePath, "utf-8"));
const vhaPeople = JSON.parse(fs.readFileSync(fedPeoplePath, "utf-8"));
const rels = JSON.parse(fs.readFileSync(relsPath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

const vhaBySlug = new Map(vhaPeople.map((p) => [p.slug, p]));

// 1. Fix internal contradiction on le-huu-trac (birthYear 1720 vs contentVi 1724-1791 & VHA 1724)
const leHuuTrac = people.find((p) => p.slug === "le-huu-trac");
if (leHuuTrac && leHuuTrac.birthYear === 1720) {
  leHuuTrac.birthYear = 1724;
  console.log("✓ Fixed le-huu-trac birthYear: 1720 -> 1724 (aligning with contentVi and UNESCO/VHA)");
}

// 2. Define 15 net-new Vietnamese historical figures from VHA
const newPeopleSpecs = [
  {
    vhaSlug: "vha-trieu-thi-trinh",
    slug: "trieu-thi-trinh",
    name: "Lady Trieu (Trieu Thi Trinh)",
    occupations: "National Heroine, Rebel Leader",
    occupationsVi: "Nữ anh hùng dân tộc, Thủ lĩnh khởi nghĩa",
    summary:
      "Third-century Vietnamese heroine who led a major uprising in 248 CE against Eastern Wu rule, remembered as a symbol of Vietnamese resilience and independence.",
    content:
      "Born in Quan Yen (Thanh Hoa), Trieu Thi Trinh launched an armed revolt in 248 CE alongside her brother Trieu Quoc Dat against the harsh administration of Eastern Wu in Jiaozhi. After her brother's death, she assumed supreme command, famously riding a white elephant into battle in golden armor and winning victories across Jiuzhen before Wu general Lu Yin brought 8,000 reinforcements to suppress the rebellion.",
  },
  {
    vhaSlug: "vha-ly-bi",
    slug: "ly-bi",
    name: "Ly Bi (Emperor Ly Nam De)",
    occupations: "Emperor of Van Xuan, Independence Leader",
    occupationsVi: "Hoàng đế nước Vạn Xuân, Lãnh tụ khởi nghĩa",
    summary:
      "Leader of the 542 CE uprising against the Liang dynasty who proclaimed the independent state of Van Xuan in 544 CE and assumed the imperial title Ly Nam De.",
    content:
      "A local notable from Long Hung (or Thai Binh), Ly Bi rallied regional elites including Tinh Thieu, Pham Tu, and Trieu Tuc in 542 CE to expel Liang governor Xiao Zi. After repelling Liang counterattacks, he ascended the throne in 544 CE as Nam Viet De (Ly Nam De), named his realm Van Xuan ('Ten Thousand Springs'), established his court near the To Lich River, and laid the earliest imperial precedent of an independent Vietnamese state.",
  },
  {
    vhaSlug: "vha-trieu-quang-phuc",
    slug: "trieu-quang-phuc",
    name: "Trieu Quang Phuc (Trieu Viet Vuong)",
    occupations: "King of Van Xuan, Military Strategist",
    occupationsVi: "Vua nước Vạn Xuân, Nhà quân sự",
    summary:
      "Successor to Ly Nam De who pioneered guerrilla warfare from the Da Trach marshes to defeat Liang forces in 550 CE and preserve Van Xuan's independence.",
    content:
      "Entrusted with command by Ly Nam De during the Liang offensive of 545 CE, Trieu Quang Phuc withdrew into the impenetrable Da Trach wetlands (Hung Yen). Employing night raids by dugout canoe while concealing smoke by day, he wore down the besieging army. When Chen Baxian departed north in 550 CE, Trieu Quang Phuc launched a decisive counteroffensive, slaying Liang general Yang Chan and ruling Van Xuan as Trieu Viet Vuong until 571 CE.",
  },
  {
    vhaSlug: "vha-mai-thuc-loan",
    slug: "mai-thuc-loan",
    name: "Mai Thuc Loan (Mai Hac De)",
    occupations: "Rebel Emperor, Independence Leader",
    occupationsVi: "Lãnh tụ khởi nghĩa, Hoàng đế tự chủ",
    summary:
      "Leader of the 722 CE Hoan Chau rebellion against Tang taxation and corvee labor, who forged a regional coalition, captured Tong Binh, and reigned as Mai Hac De.",
    content:
      "Rising from a peasant background in Hoan Chau (Nghe An - Ha Tinh), Mai Thuc Loan sparked a widespread revolt in 722 CE against oppressive Tang tribute demands. Building a fortified base at Van An and allying with Champa, Zhenla, and upland chieftains, his forces captured the Tang administrative seat at Tong Binh (modern Hanoi) before a large Tang expedition under Yang Sixu crushed the uprising.",
  },
  {
    vhaSlug: "vha-khuc-thua-du",
    slug: "khuc-thua-du",
    name: "Khuc Thua Du",
    occupations: "Military Governor (Jiedushi), Autonomy Pioneer",
    occupationsVi: "Tiết độ sứ Tĩnh Hải quân, Người khởi dựng tự chủ",
    summary:
      "Local magnate of Hong Chau who took control of Dai La in 905 CE and secured Tang recognition as Jiedushi, inaugurating Vietnam's era of autonomous self-rule.",
    content:
      "Taking advantage of the collapse of Tang central authority in 905 CE, Khuc Thua Du—a respected local notable from Cuc Bo (Hai Duong)—entered the citadel of Dai La and assumed the title of Jiedushi (Military Governor) of Jinghai Circuit. By compelling the Tang court to ratify his appointment in 906 CE, he peacefully ended direct Chinese bureaucratic rule and laid the groundwork for full Vietnamese independence.",
  },
  {
    vhaSlug: "vha-khuc-hao",
    slug: "khuc-hao",
    name: "Khuc Hao",
    occupations: "Military Governor, Administrative Reformer",
    occupationsVi: "Tiết độ sứ, Nhà cải cách hành chính",
    summary:
      "Son and successor of Khuc Thua Du who governed Jinghai Circuit (907–917 CE) with pragmatic diplomacy and sweeping administrative and tax reforms.",
    content:
      "Succeeding his father in 907 CE, Khuc Hao pursued a policy of external deference to Later Liang alongside rigorous domestic state-building. Guided by the principle of 'tolerance and simplicity' (khoan dung, gian di), he reorganized local governance into five administrative tiers down to the commune level, compiled household registers, standardized land taxes, and abolished harsh Tang-era corvee burdens.",
  },
  {
    vhaSlug: "vha-le-dai-hanh",
    slug: "le-dai-hanh",
    name: "Emperor Le Dai Hanh (Le Hoan)",
    occupations: "Founding Emperor of Early Le Dynasty, Military Commander",
    occupationsVi: "Hoàng đế sáng lập triều Tiền Lê, Nhà quân sự",
    summary:
      "Founding emperor of the Early Le dynasty who repelled the 981 CE Song invasion at Bach Dang River and promoted agriculture and canal infrastructure.",
    content:
      "Formerly Commander-in-Chief (Thap dao Tuong quan) under the Dinh dynasty, Le Hoan was elevated to the throne in 980 CE amid an imminent Song invasion. In 981 CE, he defeated Song land and naval forces along the Bach Dang River, securing Dai Co Viet's sovereignty. As ruler (980–1005), he balanced firm diplomacy with China, personally inaugurated the royal Tich Dien plowing ceremony (987), and excavated strategic waterways across Thanh Hoa and Nghe An.",
  },
  {
    vhaSlug: "vha-ly-thai-to",
    slug: "ly-thai-to",
    name: "Emperor Ly Thai To (Ly Cong Uan)",
    occupations: "Founding Emperor of the Ly Dynasty, Statesman",
    occupationsVi: "Hoàng đế sáng lập triều Lý, Nhà chính trị",
    summary:
      "Founder of the Ly dynasty (r. 1009–1028) who issued the Edict on the Transfer of the Capital (Chieu Doi Do) in 1010 CE, relocating the seat of government to Thang Long.",
    content:
      "Educated by Zen master Van Hanh and rising to command the palace guard under the Early Le, Ly Cong Uan ascended the throne in 1009 CE to found the Ly dynasty. In 1010 CE, he issued the landmark Chieu Doi Do, moving the imperial capital from mountainous Hoa Lu to the central Red River Delta site of Dai La, which he renamed Thang Long ('Ascending Dragon'). His tolerant, centralized administration inaugurated over two centuries of cultural and political flourishing.",
  },
  {
    vhaSlug: "vha-tran-nhan-tong",
    slug: "tran-nhan-tong",
    name: "Emperor Tran Nhan Tong",
    occupations: "Emperor, Buddhist Patriarch, Military Leader",
    occupationsVi: "Hoàng đế, Thiền sư, Người sáng lập Thiền phái Trúc Lâm",
    summary:
      "Third Tran emperor who led Dai Viet to victory against the Mongol invasions of 1285 and 1288 before abdicating to found the indigenous Truc Lam Zen Buddhist school.",
    content:
      "Ascending the throne in 1278, Tran Nhan Tong rallied the court and populace—most famously at the Dien Hong Conference—and fought alongside Grand Commander Tran Hung Dao to repel the second and third Yuan-Mongol invasions (1285, 1288). After overseeing postwar reconstruction, he abdicated in 1293 and took monastic vows on Yen Tu Mountain in 1299, uniting three existing Zen lineages into the Truc Lam Yen Tu school of engaged Buddhism.",
  },
  {
    vhaSlug: "vha-nguyen-binh-khiem",
    slug: "nguyen-binh-khiem",
    name: "Nguyen Binh Khiem",
    occupations: "Philosopher, Poet, Educator, Statesman",
    occupationsVi: "Nhà tư tưởng, Nhà thơ, Nhà giáo, Trạng nguyên",
    summary:
      "Sixteenth-century Vietnamese philosopher, First-Rank Scholar (Trang nguyen), and teacher whose strategic counsel shaped the Mac, Trinh, and Nguyen houses.",
    content:
      "Passing the imperial examination as Trang nguyen in 1535 under the Mac dynasty, Nguyen Binh Khiem resigned in 1542 after his impeachment of corrupt officials was rejected. Retiring to his Bach Van Hermitage in Hai Phong, he taught generations of scholars and synthesized Confucian, Buddhist, and Daoist thought. Rival political leaders—including Trinh Kiem, Nguyen Hoang, and the Mac—sought his prescient strategic advice during Vietnam's North-South division.",
  },
  {
    vhaSlug: "vha-nguyen-hoang",
    slug: "nguyen-hoang",
    name: "Lord Nguyen Hoang (Chua Tien)",
    occupations: "Founder of the Nguyen Lords, Statesman",
    occupationsVi: "Chúa Nguyễn đầu tiên ở Đàng Trong, Nhà chính trị",
    summary:
      "First Nguyen Lord (1558–1613) who governed Thuan Hoa and Quang Nam, opened Hoi An to international trade, and laid the foundations of Dang Trong.",
    content:
      "Appointed governor of the southern frontier province of Thuan Hoa in 1558 and later Quang Nam in 1570, Nguyen Hoang cultivated a benevolent administration, encouraged agricultural settlement, and built a distinct political base in Dang Trong (Cochinchina). After returning south permanently in 1600, he fostered international maritime commerce at Hoi An, founded Thien Mu Pagoda (1601), and expanded Nguyen authority into Phu Yen (1611).",
  },
  {
    vhaSlug: "vha-hoang-hoa-tham",
    slug: "hoang-hoa-tham",
    name: "Hoang Hoa Tham (De Tham)",
    occupations: "Anti-Colonial Leader, Guerrilla Commander",
    occupationsVi: "Thủ lĩnh khởi nghĩa Yên Thế",
    summary:
      "Supreme commander of the Yen The Insurrection (1884–1913), who waged nearly three decades of guerrilla resistance against French colonial forces in northern Vietnam.",
    content:
      "Assuming leadership of the Yen The movement after De Nam's death in 1892, Hoang Hoa Tham utilized the forested hills of Bac Giang and Thai Nguyen to conduct mobile guerrilla warfare. His persistence forced French authorities to sign two truces (1894, 1897) granting him local autonomy, during which he sheltered modern nationalists such as Phan Boi Chau before falling in 1913 following a massive French encirclement campaign.",
  },
  {
    vhaSlug: "vha-phan-boi-chau",
    slug: "phan-boi-chau",
    name: "Phan Boi Chau",
    occupations: "Revolutionary, Nationalist Thinker, Writer",
    occupationsVi: "Nhà chí sĩ cách mạng, Nhà tư tưởng yêu nước",
    summary:
      "Pioneering early-twentieth-century Vietnamese nationalist who founded the Duy Tan Hoi (1904), launched the Dong Du ('Go East') movement, and advocated armed liberation.",
    content:
      "Topping the regional examination in 1900 yet refusing official service under colonial rule, Phan Boi Chau founded the Duy Tan Hoi (Reformation Society) in 1904 and traveled to Japan in 1905 to organize the Dong Du movement, sending over 200 Vietnamese students abroad. After expulsion from Japan, he formed the Vietnam Restoration League (Viet Nam Quang Phuc Hoi) in 1912 to establish a democratic republic before his arrest in Shanghai in 1925.",
  },
  {
    vhaSlug: "vha-phan-chau-trinh",
    slug: "phan-chau-trinh",
    name: "Phan Chau Trinh",
    occupations: "Democratic Reformer, Enlightenment Thinker, Journalist",
    occupationsVi: "Nhà cải cách dân chủ, Nhà tư tưởng khai sáng",
    summary:
      "Early-twentieth-century democratic reformer and leader of the Duy Tan modernization movement, who championed popular education, civic rights, and the abolition of monarchy.",
    content:
      "Resigning his court post in 1905, Phan Chau Trinh spearheaded the Duy Tan reform movement with the motto 'Enlighten the people, elevate their spirit, improve their livelihood.' Opposing both French colonial abuses and feudal autocracy, he promoted vernacular Quoc Ngu literacy and modern schooling. Imprisoned on Con Dao after the 1908 tax protests and later exiled in Paris alongside Nguyen Ai Quoc, he returned in 1925 to deliver landmark lectures on democracy and ethics.",
  },
  {
    vhaSlug: "vha-vo-nguyen-giap",
    slug: "vo-nguyen-giap",
    name: "General Vo Nguyen Giap",
    occupations: "Four-Star General, Military Strategist, Statesman",
    occupationsVi: "Đại tướng, Tổng tư lệnh Quân đội Nhân dân Việt Nam",
    summary:
      "Founding Commander-in-Chief of the Vietnam People's Army and foremost military strategist of modern Vietnam, architect of the 1954 Dien Bien Phu victory and 1975 reunification campaign.",
    content:
      "Appointed by Ho Chi Minh to establish the Vietnam Propaganda Liberation Army in December 1944, Vo Nguyen Giap became Vietnam's first four-star general in 1948. As commander at Dien Bien Phu (1954), he made the pivotal decision to shift from rapid assault to 'steady fight, steady advance,' securing a decisive victory that ended French colonial rule. He later oversaw the Ho Chi Minh Trail logistics network and issued the famous April 1975 directive driving the final campaign for national reunification.",
  },
];

const existingSlugs = new Set(people.map((p) => p.slug));
let addedPeople = 0;

for (const spec of newPeopleSpecs) {
  if (existingSlugs.has(spec.slug)) {
    console.log(`- Skipping existing person: ${spec.slug}`);
    continue;
  }
  const vha = vhaBySlug.get(spec.vhaSlug);
  if (!vha) {
    throw new Error(`Missing VHA person: ${spec.vhaSlug}`);
  }
  people.push({
    slug: spec.slug,
    name: spec.name,
    birthYear: vha.birthYear,
    deathYear: vha.deathYear,
    occupations: spec.occupations,
    civilizationSlug: "vietnam",
    summary: spec.summary,
    content: spec.content,
    nameVi: vha.name,
    occupationsVi: spec.occupationsVi,
    summaryVi: vha.summary,
    contentVi: vha.content,
  });
  existingSlugs.add(spec.slug);
  addedPeople++;
}

fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2) + "\n", "utf-8");
console.log(`✓ Added ${addedPeople} new people to data/seed/people.json (Total: ${people.length})`);

// 3. Add Ontology 1.1 relationships for new people
const newRels = [
  // Civilization RULED / FOUNDED
  { sourceSlug: "ly-bi", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "trieu-quang-phuc", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "khuc-thua-du", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "khuc-hao", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "le-dai-hanh", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "ly-thai-to", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "tran-nhan-tong", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },
  { sourceSlug: "nguyen-hoang", sourceType: "PERSON", targetSlug: "vietnam", targetType: "CIVILIZATION", relationshipType: "RULED" },

  // Events LED / COMMANDED / INITIATED
  { sourceSlug: "trieu-thi-trinh", sourceType: "PERSON", targetSlug: "vha-khoi-nghia-ba-trieu", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "ly-bi", sourceType: "PERSON", targetSlug: "vha-khoi-nghia-ly-bi-lap-nuoc-van-xuan", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "trieu-quang-phuc", sourceType: "PERSON", targetSlug: "vha-khoi-nghia-ly-bi-lap-nuoc-van-xuan", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "mai-thuc-loan", sourceType: "PERSON", targetSlug: "vha-khoi-nghia-mai-thuc-loan", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "khuc-hao", sourceType: "PERSON", targetSlug: "vha-cai-cach-khuc-hao", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "le-dai-hanh", sourceType: "PERSON", targetSlug: "vha-khang-chien-chong-tong-981", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "ly-thai-to", sourceType: "PERSON", targetSlug: "relocation-of-capital-to-thang-long", targetType: "EVENT", relationshipType: "INITIATED" },
  { sourceSlug: "tran-nhan-tong", sourceType: "PERSON", targetSlug: "mongol-invasions-of-vietnam", targetType: "EVENT", relationshipType: "LED" },
  { sourceSlug: "hoang-hoa-tham", sourceType: "PERSON", targetSlug: "vha-phong-trao-can-vuong", targetType: "EVENT", relationshipType: "COMMANDED" },
  { sourceSlug: "vo-nguyen-giap", sourceType: "PERSON", targetSlug: "vha-chien-dich-dien-bien-phu", targetType: "EVENT", relationshipType: "COMMANDED" },
  { sourceSlug: "vo-nguyen-giap", sourceType: "PERSON", targetSlug: "vha-chien-dich-ho-chi-minh", targetType: "EVENT", relationshipType: "COMMANDED" },

  // Books PROCLAIMED
  { sourceSlug: "ly-thai-to", sourceType: "PERSON", targetSlug: "chieu-doi-do", targetType: "BOOK", relationshipType: "PROCLAIMED" },

  // Ideas DEFENDED / CHAMPIONED / ADVOCATED / DEVELOPED
  { sourceSlug: "trieu-thi-trinh", sourceType: "PERSON", targetSlug: "vha-sovereignty-and-defense", targetType: "IDEA", relationshipType: "DEFENDED" },
  { sourceSlug: "mai-thuc-loan", sourceType: "PERSON", targetSlug: "vha-sovereignty-and-defense", targetType: "IDEA", relationshipType: "DEFENDED" },
  { sourceSlug: "khuc-thua-du", sourceType: "PERSON", targetSlug: "national-sovereignty-identity", targetType: "IDEA", relationshipType: "PIONEERED" },
  { sourceSlug: "khuc-hao", sourceType: "PERSON", targetSlug: "vha-state-governance-and-law", targetType: "IDEA", relationshipType: "DEVELOPED" },
  { sourceSlug: "nguyen-binh-khiem", sourceType: "PERSON", targetSlug: "vha-culture-and-thought", targetType: "IDEA", relationshipType: "DEVELOPED" },
  { sourceSlug: "phan-boi-chau", sourceType: "PERSON", targetSlug: "national-sovereignty-identity", targetType: "IDEA", relationshipType: "CHAMPIONED" },
  { sourceSlug: "phan-chau-trinh", sourceType: "PERSON", targetSlug: "vha-culture-and-thought", targetType: "IDEA", relationshipType: "ADVOCATED" },

  // Person -> Person (valid Ontology 1.1: ADVISED / TAUGHT)
  { sourceSlug: "nguyen-binh-khiem", sourceType: "PERSON", targetSlug: "nguyen-hoang", targetType: "PERSON", relationshipType: "ADVISED" },
];

const relKey = (r) => `${r.sourceSlug}|${r.sourceType}|${r.targetSlug}|${r.targetType}|${r.relationshipType}`;
const existingRelKeys = new Set(rels.map(relKey));
let addedRels = 0;

for (const r of newRels) {
  if (!existingRelKeys.has(relKey(r))) {
    rels.push(r);
    existingRelKeys.add(relKey(r));
    addedRels++;
  }
}

fs.writeFileSync(relsPath, JSON.stringify(rels, null, 2) + "\n", "utf-8");
console.log(`✓ Added ${addedRels} Ontology 1.1 relationships (Total: ${rels.length})`);

// 4. Add date-uncertainty entries for approximate / disputed / missing dates
const newUncertainties = [
  {
    entityType: "PERSON",
    slug: "trieu-thi-trinh",
    field: "birthYear",
    value: 226,
    issue: "approximate",
    note: "Traditional Vietnamese sources place Trieu Thi Trinh's birth in 226 CE based on her reported age of 22 at the 248 CE uprising; contemporary Chinese records (Sanguozhi/Jinshu) do not record her birth year.",
    suggestedDisplay: "c. 226–248 CE",
  },
  {
    entityType: "PERSON",
    slug: "ly-bi",
    field: "birthYear",
    value: 503,
    issue: "approximate",
    note: "503 CE is the conventional traditional birth year of Ly Bi in Vietnamese historiography; contemporary Liang chronicles focus on his 542–548 CE uprising without recording his exact birth date.",
    suggestedDisplay: "c. 503–548 CE",
  },
  {
    entityType: "PERSON",
    slug: "trieu-quang-phuc",
    field: "birthYear",
    value: 525,
    issue: "approximate",
    note: "525 CE is an approximate traditional estimate; only his military leadership (545–550 CE) and death (571 CE) are firmly attested in historical chronicles.",
    suggestedDisplay: "c. 525–571 CE",
  },
  {
    entityType: "PERSON",
    slug: "mai-thuc-loan",
    field: "birthYear",
    value: 670,
    issue: "approximate",
    note: "670 CE is a conventional estimate for Mai Thuc Loan's birth; Tang and Vietnamese sources primarily attest his 722 CE Hoan Chau rebellion.",
    suggestedDisplay: "c. 670–722 CE",
  },
  {
    entityType: "PERSON",
    slug: "khuc-thua-du",
    field: "birthYear",
    value: 850,
    issue: "approximate",
    note: "850 CE is an approximate estimate; his 905 CE assumption of power at Dai La and 907 CE death are firmly recorded, while his exact birth year is unattested.",
    suggestedDisplay: "c. 850–907 CE",
  },
  {
    entityType: "PERSON",
    slug: "khuc-hao",
    field: "birthYear",
    value: null,
    issue: "approximate",
    note: "Khuc Hao's birth year is unrecorded in surviving chronicles; his tenure as Jiedushi of Jinghai Circuit (907–917 CE) and death in 917 CE are attested.",
    suggestedDisplay: "?–917 CE",
  },
  {
    entityType: "PERSON",
    slug: "le-huu-trac",
    field: "birthYear",
    value: 1724,
    issue: "disputed",
    note: "Some older compilations cite 1720 as Le Huu Trac's birth year, while modern Vietnamese scholarship and UNESCO (300th anniversary commemoration in 2024) adopt 1724.",
    suggestedDisplay: "1724 (or 1720)–1791",
  },
  {
    entityType: "PERSON",
    slug: "hoang-hoa-tham",
    field: "birthYear",
    value: 1858,
    issue: "disputed",
    note: "Hoang Hoa Tham's birth year is variously cited as 1858 or c. 1846 across modern Vietnamese archival and biographical sources.",
    suggestedDisplay: "c. 1858 (or 1846)–1913",
  },
];

const uKey = (u) => `${u.entityType}|${u.slug}|${u.field}`;
const existingUKeys = new Set(uncertainties.map(uKey));
let addedU = 0;

for (const u of newUncertainties) {
  if (!existingUKeys.has(uKey(u))) {
    uncertainties.push(u);
    existingUKeys.add(uKey(u));
    addedU++;
  }
}

fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");
console.log(`✓ Added ${addedU} date uncertainty entries (Total: ${uncertainties.length})`);
