const fs = require('fs');
const path = require('path');

const mapDataPath = path.join(__dirname, '..', 'src', 'lib', 'map-data.ts');
let content = fs.readFileSync(mapDataPath, 'utf8');

// 1. Add HistoryEra types and HISTORY_ERAS constant
const typeDefs = `export type HistoryEra = "ALL" | "ANCIENT" | "CLASSICAL" | "MEDIEVAL" | "MODERN";

export interface EraFilterItem {
  id: HistoryEra;
  labelEn: string;
  labelVi: string;
  timeRangeEn: string;
  timeRangeVi: string;
  descriptionVi: string;
}

export const HISTORY_ERAS: EraFilterItem[] = [
  {
    id: "ALL",
    labelEn: "All Epochs",
    labelVi: "Tất cả thời kỳ",
    timeRangeEn: "3500 BCE – Present",
    timeRangeVi: "3500 TCN – Nay",
    descriptionVi: "Toàn cảnh địa lý các nền văn minh và kiệt tác văn học xuyên suốt lịch sử nhân loại.",
  },
  {
    id: "ANCIENT",
    labelEn: "Ancient World",
    labelVi: "Thời Cổ đại",
    timeRangeEn: "Before 500 BCE",
    timeRangeVi: "Trước 500 TCN",
    descriptionVi: "Thời kỳ bình minh văn minh sơ khai: Lưỡng Hà, Ai Cập cổ đại, Hy Lạp sơ khởi và Văn minh sông Ấn.",
  },
  {
    id: "CLASSICAL",
    labelEn: "Classical Era",
    labelVi: "Thời Cổ điển",
    timeRangeEn: "500 BCE – 500 CE",
    timeRangeVi: "500 TCN – 500 SCN",
    descriptionVi: "Thời đại triết học trục thời gian: Hy Lạp cổ điển, La Mã, Ba Tư, Trung Hoa và Ấn Độ cổ đại.",
  },
  {
    id: "MEDIEVAL",
    labelEn: "Medieval Era",
    labelVi: "Thời Trung đại",
    timeRangeEn: "500 – 1500 CE",
    timeRangeVi: "500 – 1500 SCN",
    descriptionVi: "Thời đại hoàng kim Hồi giáo, Đại Việt Lý - Trần, châu Âu thời Trung Cổ và Nhật Bản Heian.",
  },
  {
    id: "MODERN",
    labelEn: "Early Modern & Beyond",
    labelVi: "Thời Cận - Hiện đại",
    timeRangeEn: "1500 CE – Present",
    timeRangeVi: "Từ 1500 SCN đến nay",
    descriptionVi: "Thời kỳ Phục hưng, Khai sáng toàn cầu, văn học hiện đại và Truyện Kiều Đại Việt.",
  },
];
`;

content = content.replace('export interface CivilizationMapItem {', `${typeDefs}\nexport interface CivilizationMapItem {\n  eras: HistoryEra[];`);
content = content.replace('export interface GreatBookMapItem {', 'export interface GreatBookMapItem {\n  era: HistoryEra;');

// Add eras to civilizations
const civEras = {
  'mesopotamia': 'eras: ["ANCIENT", "CLASSICAL"],',
  'ancient-egypt': 'eras: ["ANCIENT", "CLASSICAL"],',
  'ancient-greece': 'eras: ["ANCIENT", "CLASSICAL"],',
  'roman-empire': 'eras: ["CLASSICAL"],',
  'ancient-china': 'eras: ["ANCIENT", "CLASSICAL", "MEDIEVAL"],',
  'ancient-india': 'eras: ["ANCIENT", "CLASSICAL", "MEDIEVAL"],',
  'vietnam': 'eras: ["ANCIENT", "CLASSICAL", "MEDIEVAL", "MODERN"],',
  'persian-empire': 'eras: ["CLASSICAL"],',
  'islamic-civilization': 'eras: ["MEDIEVAL"],',
  'maya-civilization': 'eras: ["ANCIENT", "CLASSICAL", "MEDIEVAL"],',
};

for (const [slug, eraLine] of Object.entries(civEras)) {
  const target = `slug: "${slug}",`;
  content = content.replace(target, `${target}\n    ${eraLine}`);
}

// Add era to Great Books
const bookEras = {
  'uruk-gilgamesh': 'era: "ANCIENT",',
  'thebes-sinuhe': 'era: "ANCIENT",',
  'aegean-iliad': 'era: "ANCIENT",',
  'rome-aeneid': 'era: "CLASSICAL",',
  'kurukshetra-mahabharata': 'era: "CLASSICAL",',
  'qufu-analects': 'era: "CLASSICAL",',
  'thanglong-truyenkieu': 'era: "MODERN",',
  'baghdad-kalila': 'era: "MEDIEVAL",',
  'kyoto-genji': 'era: "MEDIEVAL",',
  'florence-divine-comedy': 'era: "MEDIEVAL",',
  'lamancha-don-quixote': 'era: "MODERN",',
  'london-canterbury': 'era: "MEDIEVAL",',
  'highlands-popol-vuh': 'era: "MODERN",',
  'tus-shahnameh': 'era: "MEDIEVAL",',
};

for (const [slug, eraLine] of Object.entries(bookEras)) {
  const target = `slug: "${slug}",`;
  content = content.replace(target, `${target}\n    ${eraLine}`);
}

fs.writeFileSync(mapDataPath, content, 'utf8');
console.log('Successfully updated src/lib/map-data.ts with Era filters!');
