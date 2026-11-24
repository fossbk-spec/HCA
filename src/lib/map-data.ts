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
