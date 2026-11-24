const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'lib', 'map-data.ts');
const content = fs.readFileSync(targetPath, 'utf8');

const greatBooksMap = `
export interface GreatBookMapItem {
  slug: string;
  bookSlug: string;
  title: string;
  titleVi: string;
  author: string;
  authorVi: string;
  yearLabel: string;
  locationName: string;
  locationNameVi: string;
  coord: GeoCoord;
  civilizationSlug: string;
  significanceEn: string;
  significanceVi: string;
}

export const GREAT_BOOKS_MAP_DATA: GreatBookMapItem[] = [
  {
    slug: "uruk-gilgamesh",
    bookSlug: "epic-of-gilgamesh",
    title: "Epic of Gilgamesh",
    titleVi: "Sử thi Gilgamesh",
    author: "Sin-leqi-unninni (compiler)",
    authorVi: "Sin-leqi-unninni (biên soạn)",
    yearLabel: "c. 2100 - 1200 BCE",
    locationName: "Uruk (Mesopotamia)",
    locationNameVi: "Cổ thành Uruk (Lưỡng Hà)",
    coord: { lat: 31.3, lng: 45.3, xPercent: 62.6, yPercent: 32.6 },
    civilizationSlug: "mesopotamia",
    significanceEn: "Humanity's oldest surviving epic poem exploring friendship, mortality, and the search for immortality.",
    significanceVi: "Đại sử thi cổ xưa nhất của nhân loại khám phá tình tri kỷ, sự hữu hạn của đời người và khát vọng bất tử."
  },
  {
    slug: "thebes-sinuhe",
    bookSlug: "tale-of-sinuhe",
    title: "Tale of Sinuhe",
    titleVi: "Câu chuyện của Sinuhe",
    author: "Anonymous",
    authorVi: "Khuyết danh",
    yearLabel: "c. 1875 BCE",
    locationName: "Thebes (Ancient Egypt)",
    locationNameVi: "Thebes (Ai Cập cổ đại)",
    coord: { lat: 25.7, lng: 32.6, xPercent: 59.1, yPercent: 35.7 },
    civilizationSlug: "ancient-egypt",
    significanceEn: "Crown jewel of Middle Kingdom Egyptian literature exploring exile, identity, and the spiritual pull of the homeland.",
    significanceVi: "Tuyệt tác văn học thời kỳ Trung Vương quốc Ai Cập về nỗi niềm lưu vong và sự gắn bó thiêng liêng với tổ quốc."
  },
  {
    slug: "aegean-iliad",
    bookSlug: "iliad",
    title: "The Iliad and The Odyssey",
    titleVi: "Sử thi Iliad và Odyssey",
    author: "Homer",
    authorVi: "Homer",
    yearLabel: "c. 750 BCE",
    locationName: "Ionia and Aegean Sea (Greece)",
    locationNameVi: "Ionia và Vùng biển Aegean (Hy Lạp)",
    coord: { lat: 38.4, lng: 26.1, xPercent: 57.3, yPercent: 28.7 },
    civilizationSlug: "ancient-greece",
    significanceEn: "Foundational twin pillars of Western classical literature capturing heroism, fate, and human frailty.",
    significanceVi: "Hai cột trụ nền tảng của văn học kinh điển phương Tây về lòng quả cảm, định mệnh và thân phận con người."
  },
  {
    slug: "rome-aeneid",
    bookSlug: "aeneid",
    title: "The Aeneid",
    titleVi: "Sử thi Aeneid",
    author: "Virgil",
    authorVi: "Virgil",
    yearLabel: "19 BCE",
    locationName: "Rome (Roman Empire)",
    locationNameVi: "Roma (Đế quốc La Mã)",
    coord: { lat: 41.9, lng: 12.5, xPercent: 53.5, yPercent: 26.7 },
    civilizationSlug: "roman-empire",
    significanceEn: "Rome's defining national epic linking the fall of Troy with the destiny of the Roman civilization.",
    significanceVi: "Đại sử thi quốc gia của La Mã kết nối sự sụp đổ của thành Troy với sứ mệnh lịch sử của đế chế La Mã."
  },
  {
    slug: "kurukshetra-mahabharata",
    bookSlug: "mahabharata",
    title: "The Mahabharata and Bhagavad Gita",
    titleVi: "Sử thi Mahabharata và Chí Tôn Ca",
    author: "Vyasa",
    authorVi: "Vyasa",
    yearLabel: "c. 400 BCE - 400 CE",
    locationName: "Kurukshetra (Ancient India)",
    locationNameVi: "Kurukshetra (Ấn Độ cổ đại)",
    coord: { lat: 29.9, lng: 76.8, xPercent: 71.3, yPercent: 33.4 },
    civilizationSlug: "ancient-india",
    significanceEn: "The world's longest epic poem encapsulating dharma, existential duty, moral dilemmas, and cosmic order.",
    significanceVi: "Bộ sử thi đồ sộ nhất thế giới bao hàm toàn bộ đạo lý Dharma, nghĩa vụ sinh tồn và trật tự vũ trụ."
  },
  {
    slug: "qufu-analects",
    bookSlug: "analects",
    title: "The Analects (Lunyu)",
    titleVi: "Luận ngữ",
    author: "Confucius and Disciples",
    authorVi: "Khổng Tử và các môn đệ",
    yearLabel: "c. 475 - 221 BCE",
    locationName: "Qufu, Shandong (Ancient China)",
    locationNameVi: "Khúc Phụ, Sơn Đông (Trung Hoa cổ đại)",
    coord: { lat: 35.6, lng: 116.9, xPercent: 82.5, yPercent: 30.2 },
    civilizationSlug: "ancient-china",
    significanceEn: "Ethical and political bedrock of East Asian thought emphasizing benevolence (Ren) and ritual harmony (Li).",
    significanceVi: "Cội nguồn tư tưởng đạo đức và chính trị Đông Á đề cao đức Nhân và lễ nghĩa hài hòa."
  },
  {
    slug: "thanglong-truyenkieu",
    bookSlug: "truyen-kieu",
    title: "The Tale of Kieu",
    titleVi: "Truyện Kiều (Đoạn trường tân thanh)",
    author: "Nguyen Du",
    authorVi: "Nguyễn Du",
    yearLabel: "c. 1820 CE",
    locationName: "Thang Long and Tien Dien (Vietnam)",
    locationNameVi: "Thăng Long và Tiên Điền (Đại Việt)",
    coord: { lat: 21.0, lng: 105.8, xPercent: 79.4, yPercent: 38.3 },
    civilizationSlug: "vietnam",
    significanceEn: "The supreme masterpiece of Vietnamese literature capturing the tragic beauty of human compassion and destiny.",
    significanceVi: "Kiệt tác tối cao của văn học Việt Nam, kết tinh vẻ đẹp bi cảm, lòng trắc ẩn và tiếng lòng cứu vớt con người."
  },
  {
    slug: "baghdad-kalila",
    bookSlug: "kalila-wa-dimna",
    title: "Kalila and Dimna",
    titleVi: "Kalila và Dimna",
    author: "Ibn al-Muqaffa",
    authorVi: "Ibn al-Muqaffa",
    yearLabel: "c. 750 CE",
    locationName: "Baghdad (Islamic Golden Age)",
    locationNameVi: "Baghdad (Thời Hoàng kim Hồi giáo)",
    coord: { lat: 33.3, lng: 44.4, xPercent: 62.3, yPercent: 31.5 },
    civilizationSlug: "islamic-civilization",
    significanceEn: "Celebrated fable collection offering profound moral guidance and pragmatic statecraft for kings and citizens.",
    significanceVi: "Tuyển tập truyện ngụ ngôn động vật kinh điển truyền thụ minh triết xử thế và thuật trị quốc thâm thúy."
  },
  {
    slug: "kyoto-genji",
    bookSlug: "the-tale-of-genji",
    title: "The Tale of Genji",
    titleVi: "Truyện kể Genji (Genji Monogatari)",
    author: "Murasaki Shikibu",
    authorVi: "Murasaki Shikibu",
    yearLabel: "c. 1008 CE",
    locationName: "Heian-kyo / Kyoto (Japan)",
    locationNameVi: "Heian-kyo / Kyoto (Nhật Bản)",
    coord: { lat: 35.0, lng: 135.7, xPercent: 87.7, yPercent: 30.6 },
    civilizationSlug: "ancient-china",
    significanceEn: "The world's first psychological novel embodying the quintessential aesthetic of mono no aware.",
    significanceVi: "Tiểu thuyết tâm lý đầu tiên của thế giới hiện thân trọn vẹn cho mỹ học u hoài mono no aware."
  },
  {
    slug: "florence-divine-comedy",
    bookSlug: "divine-comedy",
    title: "The Divine Comedy and The Prince",
    titleVi: "Thần khúc và Quân vương",
    author: "Dante Alighieri / Niccolo Machiavelli",
    authorVi: "Dante Alighieri / Niccolò Machiavelli",
    yearLabel: "1320 / 1532 CE",
    locationName: "Florence, Tuscany (Italy)",
    locationNameVi: "Florence, Tuscany (Ý)",
    coord: { lat: 43.8, lng: 11.2, xPercent: 53.1, yPercent: 25.7 },
    civilizationSlug: "roman-empire",
    significanceEn: "The bridge between medieval theological worldview and modern Renaissance political realism.",
    significanceVi: "Chiếc cầu nối vĩ đại giữa thế giới quan thần học Trung cổ và chủ nghĩa hiện thực thời Phục Hưng."
  },
  {
    slug: "lamancha-don-quixote",
    bookSlug: "don-quixote",
    title: "Don Quixote",
    titleVi: "Đôn Kihôtê",
    author: "Miguel de Cervantes",
    authorVi: "Miguel de Cervantes",
    yearLabel: "1605 CE",
    locationName: "La Mancha (Spain)",
    locationNameVi: "Xứ Mancha (Tây Ban Nha)",
    coord: { lat: 39.5, lng: -3.0, xPercent: 49.2, yPercent: 28.1 },
    civilizationSlug: "roman-empire",
    significanceEn: "Founding novel of modern Western literature exploring idealism versus reality through unforgettable satire.",
    significanceVi: "Tiểu thuyết khai sinh văn học hiện đại phương Tây với tiếng cười trào phúng sâu sắc và tính nhân bản cao cả."
  },
  {
    slug: "london-canterbury",
    bookSlug: "the-canterbury-tales",
    title: "The Canterbury Tales",
    titleVi: "Những câu chuyện Canterbury",
    author: "Geoffrey Chaucer",
    authorVi: "Geoffrey Chaucer",
    yearLabel: "1400 CE",
    locationName: "London and Canterbury (England)",
    locationNameVi: "London và Canterbury (Anh quốc)",
    coord: { lat: 51.3, lng: 1.1, xPercent: 50.3, yPercent: 21.5 },
    civilizationSlug: "roman-empire",
    significanceEn: "Masterpiece of Middle English literature offering a panoramic social mirror of medieval pilgrimage.",
    significanceVi: "Kiệt tác văn học tiếng Anh trung đại phác họa bức tranh toàn cảnh sống động về xã hội Trung cổ."
  },
  {
    slug: "highlands-popol-vuh",
    bookSlug: "popol-vuh",
    title: "Popol Vuh",
    titleVi: "Popol Vuh (Kinh thi K'iche')",
    author: "K'iche' Maya council",
    authorVi: "Hội đồng K'iche' Maya",
    yearLabel: "c. 1550 CE (Ancient oral)",
    locationName: "Guatemalan Highlands (Maya)",
    locationNameVi: "Cao nguyên Guatemala (Maya)",
    coord: { lat: 15.0, lng: -91.1, xPercent: 24.7, yPercent: 41.7 },
    civilizationSlug: "maya-civilization",
    significanceEn: "Sacred cosmological narrative of the K'iche' Maya describing human creation from maize and the hero twins.",
    significanceVi: "Thần thoại sáng thế thiêng liêng của người Maya K'iche' kể về sự tạo tác con người từ hạt bắp."
  },
  {
    slug: "tus-shahnameh",
    bookSlug: "shahnameh",
    title: "Shahnameh and The Masnavi",
    titleVi: "Sử thi Shahnameh và Khúc ngâm Masnavi",
    author: "Ferdowsi / Rumi",
    authorVi: "Ferdowsi / Jalal al-Din Rumi",
    yearLabel: "1010 / 1260 CE",
    locationName: "Tus and Khorasan (Persia)",
    locationNameVi: "Tus và Khorasan (Ba Tư)",
    coord: { lat: 36.5, lng: 59.5, xPercent: 66.5, yPercent: 29.7 },
    civilizationSlug: "persian-empire",
    significanceEn: "The monumental poetic soul of Persian civilization preserving national myth and mystical Sufi wisdom.",
    significanceVi: "Linh hồn thi ca bất hủ của nền văn minh Ba Tư lưu giữ huyền sử dân tộc và minh triết thần bí Sufi."
  }
];
`;

if (!content.includes('GREAT_BOOKS_MAP_DATA')) {
  fs.writeFileSync(targetPath, content.trim() + '\n' + greatBooksMap, 'utf8');
  console.log('Successfully appended GREAT_BOOKS_MAP_DATA to src/lib/map-data.ts');
} else {
  console.log('GREAT_BOOKS_MAP_DATA already exists');
}
