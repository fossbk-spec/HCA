const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const eventsPath = path.join(root, "data", "seed", "events.json");
const peoplePath = path.join(root, "data", "seed", "people.json");
const uncertaintyPath = path.join(root, "data", "review", "date-uncertainty.json");

const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
const people = JSON.parse(fs.readFileSync(peoplePath, "utf-8"));
const uncertainties = JSON.parse(fs.readFileSync(uncertaintyPath, "utf-8"));

// 1. Fix battle-of-kadesh summaryVi: Muwatalli II fought at Kadesh (1274 BCE), Hattusili III signed the treaty (1259 BCE)
const kadesh = events.find((e) => e.slug === "battle-of-kadesh");
if (kadesh) {
  kadesh.summaryVi =
    "Ramesses II của Ai Cập và Muwatalli II của người Hittite đụng độ trong trận chiến xe ngựa lớn tại Kadesh (1274 TCN), mở đường cho hiệp ước hòa bình song phương cổ nhất còn lưu giữ với Hattusili III năm 1259 TCN.";
  console.log("✓ Fixed battle-of-kadesh summaryVi (Muwatalli II vs Hattusili III)");
}

// 2. Fix aryabhata: geocentric with axial rotation (NOT heliocentric!), and Kusumapura (not Nalanda)
const aryabhata = people.find((p) => p.slug === "aryabhata");
if (aryabhata) {
  aryabhata.summary =
    "Pioneering classical Indian mathematician and astronomer who advanced trigonometry, approximated pi, and proposed a geocentric model with a rotating Earth.";
  aryabhata.contentVi =
    "Aryabhata (476–550 SCN) làm việc tại Kusumapura (Pataliputra). Trong tác phẩm toán học và thiên văn học Aryabhatiya viết bằng thơ năm 499 SCN, ông sử dụng hệ thập phân vị trí, tính được giá trị gần đúng $\\pi \\approx 3.1416$, giải phương trình vô định bậc nhất, khẳng định Trái đất tự quay quanh trục (trong mô hình địa tâm) và giải thích nhật thực, nguyệt thực bằng cơ chế bóng tối hình học thay vì thần thoại.";
  console.log("✓ Fixed aryabhata (axial-rotation geocentric model, Kusumapura)");
}

// 3. Refine alan-turing: Bombe co-designed with Gordon Welchman, building on Polish Bombas
const turing = people.find((p) => p.slug === "alan-turing");
if (turing) {
  turing.contentVi =
    "Alan Turing (1912–1954) đã đặt nền móng cho khoa học máy tính hiện đại với mô hình Máy Turing (1936). Trong Thế chiến II tại Bletchley Park, kế thừa thành quả của các nhà mật mã Ba Lan và phối hợp cùng Gordon Welchman, ông thiết kế cỗ máy điện cơ Bombe góp phần then chốt giải mã hệ thống Enigma của Đức Quốc xã. Ông cũng đề xuất Phép thử Turing (Turing Test) để đánh giá trí tuệ nhân tạo.";
  console.log("✓ Refined alan-turing Bletchley Park / Bombe attribution");
}

// 4. Align isaac-newton contentVi (1642 Old Style vs 1643 New Style) + add date-uncertainty note
const newton = people.find((p) => p.slug === "isaac-newton");
if (newton) {
  newton.contentVi =
    "Sir Isaac Newton (1643–1727 theo lịch Gregory; sinh ngày 25/12/1642 theo lịch Julius cũ tại Anh) đã hoàn thiện cuộc Cách mạng Khoa học với kiệt tác Các nguyên lý toán học của triết học tự nhiên (Principia Mathematica) xuất bản năm 1687. Tác phẩm thống nhất chuyển động trên Trái đất và chuyển động của các thiên thể dưới một hệ quy luật toán học duy nhất, đặt nền móng cho cơ học cổ điển và vật lý học hiện đại.";
  console.log("✓ Aligned isaac-newton birthYear calendar notation in contentVi");
}

const uKey = (u) => `${u.entityType}|${u.slug}|${u.field}`;
const seenU = new Set(uncertainties.map(uKey));
const newtonU = {
  entityType: "PERSON",
  slug: "isaac-newton",
  field: "birthYear",
  value: 1643,
  issue: "approximate",
  note: "England still used the Julian calendar when Newton was born (25 December 1642 Old Style), corresponding to 4 January 1643 New Style (Gregorian calendar).",
  suggestedDisplay: "1643–1727 (O.S. 25 Dec 1642)",
};
let addedU = 0;
if (!seenU.has(uKey(newtonU))) {
  uncertainties.push(newtonU);
  addedU++;
}

fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2) + "\n", "utf-8");
fs.writeFileSync(uncertaintyPath, JSON.stringify(uncertainties, null, 2) + "\n", "utf-8");

console.log(`✓ Added ${addedU} date uncertainty entry (Total: ${uncertainties.length})`);
