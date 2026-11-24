export interface GeoCoord {
  lat: number;
  lng: number;
  xPercent: number; // 0% to 100% on Equirectangular map projection
  yPercent: number; // 0% to 100% on Equirectangular map projection
}

export interface CivilizationMapItem {
  slug: string;
  name: string;
  nameVi: string;
  region: string;
  regionVi: string;
  periodLabel: string;
  coord: GeoCoord;
  focalRiverOrCenter: string;
  focalRiverOrCenterVi: string;
  capitalOrCenter: string;
  capitalOrCenterVi: string;
  keyContributions: string[];
  keyContributionsVi: string[];
}

/**
 * Geographic centers of origin for the 10 core civilizations in HCA.
 * Projected for 1000x500 Equirectangular world map projection:
 * x = (lng + 180) / 360 * 100
 * y = (90 - lat) / 180 * 100
 */
export const CIVILIZATION_MAP_DATA: CivilizationMapItem[] = [
  {
    slug: "mesopotamia",
    name: "Mesopotamia",
    nameVi: "Lưỡng Hà",
    region: "Middle East",
    regionVi: "Trung Đông",
    periodLabel: "3500 – 539 BCE",
    coord: { lat: 33.2, lng: 44.4, xPercent: 62.3, yPercent: 31.5 },
    focalRiverOrCenter: "Tigris & Euphrates River Valley",
    focalRiverOrCenterVi: "Lưu vực sông Tigris & Euphrates",
    capitalOrCenter: "Ur, Babylon, Uruk",
    capitalOrCenterVi: "Thành bang Ur, Babylon, Uruk",
    keyContributions: ["Cuneiform Writing", "Wheel", "Base-60 Math", "Code of Hammurabi"],
    keyContributionsVi: ["Chữ viết hình nêm", "Bánh xe", "Hệ đếm lục thập phân", "Bộ luật Hammurabi"],
  },
  {
    slug: "ancient-egypt",
    name: "Ancient Egypt",
    nameVi: "Ai Cập cổ đại",
    region: "North Africa",
    regionVi: "Bắc Phi",
    periodLabel: "3100 – 30 BCE",
    coord: { lat: 26.8, lng: 30.8, xPercent: 58.5, yPercent: 35.1 },
    focalRiverOrCenter: "Nile River Basin & Delta",
    focalRiverOrCenterVi: "Lưu vực & Đồng bằng châu thổ sông Nile",
    capitalOrCenter: "Memphis, Thebes, Alexandria",
    capitalOrCenterVi: "Memphis, Thebes, Alexandria",
    keyContributions: ["Monumental Pyramids", "Hieroglyphs", "Papyrus", "Ma'at Ethics"],
    keyContributionsVi: ["Đại Kim tự tháp Giza", "Chữ tượng hình", "Giấy papyrus", "Đạo lý Ma'at"],
  },
  {
    slug: "ancient-greece",
    name: "Ancient Greece",
    nameVi: "Hy Lạp cổ đại",
    region: "Mediterranean Europe",
    regionVi: "Địa Trung Hải - Nam Âu",
    periodLabel: "800 – 146 BCE",
    coord: { lat: 37.9, lng: 23.7, xPercent: 56.6, yPercent: 28.9 },
    focalRiverOrCenter: "Aegean Sea & Balkan Peninsula",
    focalRiverOrCenterVi: "Biển Aegean & Bán đảo Balkan",
    capitalOrCenter: "Athens, Sparta, Corinth",
    capitalOrCenterVi: "Athens, Sparta, Corinth",
    keyContributions: ["Democracy", "Classical Philosophy", "Euclidean Geometry", "Homeric Epics"],
    keyContributionsVi: ["Nền dân chủ", "Triết học kinh điển", "Hình học Euclid", "Sử thi Homer"],
  },
  {
    slug: "roman-empire",
    name: "Roman Empire",
    nameVi: "Đế quốc La Mã",
    region: "Mediterranean & Europe",
    regionVi: "Địa Trung Hải & Châu Âu",
    periodLabel: "509 BCE – 476 CE",
    coord: { lat: 41.9, lng: 12.5, xPercent: 53.5, yPercent: 26.7 },
    focalRiverOrCenter: "Tiber River & Italian Peninsula",
    focalRiverOrCenterVi: "Sông Tiber & Bán đảo Ý",
    capitalOrCenter: "Rome, Ravenna, Constantinople",
    capitalOrCenterVi: "Roma, Ravenna, Constantinople",
    keyContributions: ["Roman Jurisprudence", "Republic Governance", "Concrete & Aqueducts", "Pax Romana"],
    keyContributionsVi: ["Luật học La Mã", "Thể chế Cộng hòa", "Bê tông & Cầu dẫn nước", "Thái bình La Mã"],
  },
  {
    slug: "ancient-china",
    name: "Ancient China",
    nameVi: "Trung Hoa cổ đại",
    region: "East Asia",
    regionVi: "Đông Á",
    periodLabel: "2070 BCE – 220 CE",
    coord: { lat: 34.6, lng: 112.4, xPercent: 81.2, yPercent: 30.7 },
    focalRiverOrCenter: "Yellow River & Yangtze Basins",
    focalRiverOrCenterVi: "Lưu vực sông Hoàng Hà & Trường Giang",
    capitalOrCenter: "Chang'an, Luoyang, Xianyang",
    capitalOrCenterVi: "Trường An, Lạc Dương, Hàm Dương",
    keyContributions: ["Confucianism & Taoism", "Paper & Printing", "Silk Road", "Civil Service Exams"],
    keyContributionsVi: ["Nho giáo & Đạo gia", "Phát minh Giấy & Kỹ thuật in", "Con đường Tơ lụa", "Khoa cử"],
  },
  {
    slug: "ancient-india",
    name: "Ancient India",
    nameVi: "Ấn Độ cổ đại",
    region: "South Asia",
    regionVi: "Nam Á",
    periodLabel: "2500 BCE – 550 CE",
    coord: { lat: 25.3, lng: 83.0, xPercent: 73.1, yPercent: 35.9 },
    focalRiverOrCenter: "Indus & Ganges River Valleys",
    focalRiverOrCenterVi: "Lưu vực sông Ấn (Indus) & sông Hằng (Ganges)",
    capitalOrCenter: "Pataliputra, Harappa, Ujjain",
    capitalOrCenterVi: "Pataliputra, Harappa, Ujjain",
    keyContributions: ["Buddhism & Jainism", "Zero & Decimal System", "Mahabharata & Ramayana", "Panini Grammar"],
    keyContributionsVi: ["Phật giáo & Kỳ Na giáo", "Số Không & Hệ thập phân", "Sử thi Mahabharata & Ramayana", "Ngữ pháp Panini"],
  },
  {
    slug: "vietnam",
    name: "Đại Việt (Vietnam)",
    nameVi: "Đại Việt (Việt Nam)",
    region: "Southeast Asia",
    regionVi: "Đông Nam Á",
    periodLabel: "2879 BCE – Present",
    coord: { lat: 21.0, lng: 105.8, xPercent: 79.4, yPercent: 38.3 },
    focalRiverOrCenter: "Red River Delta & Coastal Plain",
    focalRiverOrCenterVi: "Châu thổ sông Hồng & Dải duyên hải",
    capitalOrCenter: "Cổ Loa, Hoa Lư, Thăng Long (Hà Nội)",
    capitalOrCenterVi: "Cổ Loa, Hoa Lư, Thăng Long (Hà Nội)",
    keyContributions: ["Enduring Independence Statecraft", "Dong Son Bronze Drums", "Bình Ngô đại cáo", "Hồng Đức Code"],
    keyContributionsVi: ["Bản sắc độc lập kiên cường", "Trống đồng Đông Sơn", "Bình Ngô đại cáo", "Bộ luật Hồng Đức"],
  },
  {
    slug: "persian-empire",
    name: "Persian Empire",
    nameVi: "Đế quốc Ba Tư",
    region: "Near East & Central Asia",
    regionVi: "Cận Đông & Trung Á",
    periodLabel: "550 – 330 BCE",
    coord: { lat: 29.9, lng: 52.8, xPercent: 64.7, yPercent: 33.4 },
    focalRiverOrCenter: "Iranian Plateau",
    focalRiverOrCenterVi: "Cao nguyên Iran",
    capitalOrCenter: "Persepolis, Pasargadae, Susa",
    capitalOrCenterVi: "Persepolis, Pasargadae, Susa",
    keyContributions: ["Cyrus Cylinder (Human Rights)", "Royal Road Postal System", "Satrapy Administration", "Zoroastrianism"],
    keyContributionsVi: ["Trụ đá Cyrus (Quyền con người)", "Hệ thống Bưu chính Hoàng đạo", "Mô hình Tổng trấn Satrap", "Hỏa giáo Zoroaster"],
  },
  {
    slug: "islamic-civilization",
    name: "Islamic Golden Age",
    nameVi: "Thời kỳ Hoàng kim Hồi giáo",
    region: "Middle East, North Africa & Al-Andalus",
    regionVi: "Trung Đông, Bắc Phi & Al-Andalus",
    periodLabel: "622 – 1258 CE",
    coord: { lat: 33.3, lng: 44.3, xPercent: 62.3, yPercent: 31.5 },
    focalRiverOrCenter: "Tigris River & Trans-Eurasian Trade Routes",
    focalRiverOrCenterVi: "Sông Tigris & Tuyến thương mại Á-Âu",
    capitalOrCenter: "Baghdad, Córdoba, Cairo",
    capitalOrCenterVi: "Baghdad, Córdoba, Cairo",
    keyContributions: ["Algebra (Al-Khwarizmi)", "House of Wisdom (Bayt al-Hikma)", "Canon of Medicine (Avicenna)", "Experimental Optics"],
    keyContributionsVi: ["Đại số học (Al-Khwarizmi)", "Viện trí tuệ Baghdad", "Quy luật Y học (Avicenna)", "Quang học thực nghiệm"],
  },
  {
    slug: "maya-civilization",
    name: "Maya Civilization",
    nameVi: "Văn minh Maya",
    region: "Mesoamerica",
    regionVi: "Trung Mỹ (Mesoamerica)",
    periodLabel: "2000 BCE – 1500 CE",
    coord: { lat: 17.2, lng: -89.6, xPercent: 25.1, yPercent: 40.4 },
    focalRiverOrCenter: "Yucatán Peninsula & Petén Lowlands",
    focalRiverOrCenterVi: "Bán đảo Yucatán & Vùng trũng Petén",
    capitalOrCenter: "Tikal, Calakmul, Chichén Itzá",
    capitalOrCenterVi: "Tikal, Calakmul, Chichén Itzá",
    keyContributions: ["Vigesimal Zero Concept", "Precise Astronomical Calendars", "Stele Inscriptions", "Monumental Step Pyramids"],
    keyContributionsVi: ["Khái niệm số Không & Hệ đếm 20", "Hệ thống Lịch thiên văn chính xác", "Bia ký chữ Maya", "Kim tự tháp bậc thang"],
  },
];

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
