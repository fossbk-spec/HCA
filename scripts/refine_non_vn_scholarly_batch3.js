const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const booksPath = path.join(root, "data", "seed", "books.json");
const eventsPath = path.join(root, "data", "seed", "events.json");
const uncertaintyPath = path.join(root, "data", "review", "date-uncertainty.json");

const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

// 1. Cyrus Cylinder (book + event): replace anachronistic "first charter of human rights" myth
const cyrusBook = books.find((b) => b.slug === "cyrus-cylinder");
if (cyrusBook) {
  cyrusBook.summary =
    "Ancient baked-clay cylinder inscribed in Babylonian cuneiform recording Cyrus the Great's conquest of Babylon, temple restorations, and repatriation of deported peoples; often popularly—though anachronistically—cited as a precursor to human rights.";
  cyrusBook.summaryVi =
    "Bản khắc đất sét hình trụ bằng chữ nêm Babylon năm 539 TCN ghi lại việc Cyrus Đại đế tiếp quản Babylon, phục hồi đền thờ và cho phép các cộng đồng bị lưu đày hồi hương; thường được truyền thông hiện đại ví von (dù mang tính quy chiếu hiện đại) như tiền thân của ý niệm khoan dung văn hóa.";
  console.log("✓ Refined cyrus-cylinder (book) historical framing");
}

const cyrusEvent = events.find((e) => e.slug === "cyrus-cylinder-and-babylon-conquest");
if (cyrusEvent) {
  cyrusEvent.titleVi = "Cyrus Đại đế chiếm Babylon và Bản khắc Trụ đá Cyrus";
  cyrusEvent.summary =
    "Following victory at Opis, Cyrus the Great entered Babylon in 539 BCE, restored Mesopotamian temples, permitted exiled groups to return home, and memorialized his rule on the Cyrus Cylinder.";
  cyrusEvent.content =
    "In 539 BCE, after defeating Babylonian forces at Opis, Persian armies under Cyrus the Great entered Babylon without a siege. Declaring himself King of Babylon, Cyrus restored despoiled sanctuaries, returned cult statues, and allowed deported communities—including Judean exiles—to return home, recorded on the Akkadian cuneiform Cyrus Cylinder (a traditional Mesopotamian royal foundation inscription, later popularized in modern times as an emblem of religious toleration).";
  cyrusEvent.summaryVi =
    "Sau chiến thắng tại Opis, Cyrus Đại đế tiến vào Babylon năm 539 TCN, phục hồi các đền thờ Lưỡng Hà và cho phép các cộng đồng bị lưu đày (như người Do Thái) trở về quê hương, được ghi lại trên Trụ đá Cyrus.";
  console.log("✓ Refined cyrus-cylinder-and-babylon-conquest (event)");
}

// 2. Invention/Refinement of Paper: Western Han archaeology predates Cai Lun (105 CE)
const paperEvent = events.find((e) => e.slug === "invention-of-paper");
if (paperEvent) {
  paperEvent.titleVi = "Hoàn thiện và phổ biến kỹ thuật làm giấy của Thái Luân";
  paperEvent.summaryVi =
    "Thái Luân thời Đông Hán (105 SCN) cải tiến và chuẩn hóa quy trình làm giấy từ vỏ cây dâu, gai, giẻ rách và lưới cũ, giúp giấy trở nên bền rẻ và phổ biến toàn cầu (kế thừa các mẫu giấy sơ khai thời Tây Hán).";
  paperEvent.content =
    "While archaeological finds (such as Fangmatan) show coarse hemp paper existed in Western Han China by the 2nd century BCE, court official Cai Lun presented a major technical refinement to Emperor He in 105 CE. By pulping mulberry bark, hemp waste, old rags, and fishing nets into uniform thin sheets, his method made paper an inexpensive, durable writing medium that gradually replaced bamboo slips and silk across Eurasia.";
  console.log("✓ Refined invention-of-paper (Western Han archaeological context)");
}

// 3. Edict of Milan (313 CE): agreement/rescript of religious toleration (following 311 CE Edict of Serdica)
const milanEvent = events.find((e) => e.slug === "edict-of-milan");
if (milanEvent) {
  milanEvent.summary =
    "Emperors Constantine I and Licinius agreed in 313 CE to grant religious toleration throughout the Roman Empire, restoring confiscated Christian property and affirming freedom of worship.";
  milanEvent.summaryVi =
    "Thỏa thuận năm 313 SCN giữa Hoàng đế Constantine I và Licinius (ban hành qua chiếu thư của Licinius) công nhận quyền tự do thờ phụng cho Kitô giáo và mọi tôn giáo, hoàn trả tài sản bị tịch thu trong Đế chế La Mã.";
  console.log("✓ Refined edict-of-milan historical accuracy");
}

// 4. Bhagavad Gita: Traditional Attribution to Vyasa
const gitaBook = books.find((b) => b.slug === "bhagavad-gita");
if (gitaBook) {
  gitaBook.author = "Vyasa (Traditional Attribution)";
  gitaBook.authorVi = "Vyasa (Tương truyền)";
  console.log("✓ Refined bhagavad-gita author attribution");
}

// 5. Chichen Itza: Terminal Classic - Early Postclassic revision & mesoamerican exchange
const chichenEvent = events.find((e) => e.slug === "rise-of-chichen-itza");
if (chichenEvent) {
  chichenEvent.summary =
    "Chichen Itza emerged as a major Terminal Classic and Early Postclassic regional power in northern Yucatan, synthesizing Maya traditions with pan-Mesoamerican architectural and religious motifs.";
  chichenEvent.content =
    "During the Terminal Classic and Early Postclassic periods, political and commercial power in the Maya world shifted north to Yucatan, centered at Chichen Itza. Rather than a simple foreign conquest, modern archaeologists view its art and architecture—including El Castillo (Temple of Kukulcan), colonnaded halls, and Chacmool sculptures—as a Maya synthesis participating in broader Mesoamerican exchange networks.";
  console.log("✓ Refined rise-of-chichen-itza archaeological framing");
}

// 6. Add date-uncertainty entries for Chichen Itza & Edict of Milan / Paper context
const newUncertainties = [
  {
    entityType: "EVENT",
    slug: "rise-of-chichen-itza",
    field: "startYear",
    value: 987,
    issue: "disputed",
    note: "987 CE reflects later colonial-era ethnohistoric chronicles (Books of Chilam Balam) regarding Kukulcan's arrival; radiocarbon and epigraphic evidence shows Chichen Itza's major florescence began earlier in the Terminal Classic (c. 800–1050 CE).",
    suggestedDisplay: "c. 800–1100 CE (trad. 987–1200)",
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
fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");

console.log(`✓ Added ${addedU} date uncertainty entry (Total: ${uncertainties.length})`);
