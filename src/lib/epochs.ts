export const epochs = [
  {
    id: "big-bang",
    label: "Big Bang",
    labelVi: "Vụ Nổ Lớn (Big Bang)",
    rangeLabel: "About 13.8 billion years ago",
    rangeLabelVi: "Khoảng 13,8 tỷ năm trước",
    description: "The origin and early development of the universe, the backdrop to everything that follows.",
    descriptionVi: "Nguồn gốc và sự phát triển ban đầu của vũ trụ, bối cảnh nền tảng cho mọi tiến trình sau này.",
    startYear: null,
    endYear: null,
  },
  {
    id: "origin-of-life",
    label: "Origin of Life",
    labelVi: "Nguồn gốc Sự sống",
    rangeLabel: "About 3.8 billion years ago",
    rangeLabelVi: "Khoảng 3,8 tỷ năm trước",
    description: "The emergence of life on Earth, shown here as context rather than as dated entries.",
    descriptionVi: "Sự xuất hiện của sự sống trên Trái Đất, được trình bày ở đây như bối cảnh tiền đề.",
    startYear: null,
    endYear: null,
  },
  {
    id: "human-evolution",
    label: "Human Evolution",
    labelVi: "Tiến hóa Loài người",
    rangeLabel: "Before 10,000 BCE",
    rangeLabelVi: "Trước năm 10.000 TCN",
    description: "This phase covers the long development of humans and human societies before agriculture became widespread.",
    descriptionVi: "Giai đoạn phát triển dài lâu của người tinh khôn và các xã hội loài người trước khi nông nghiệp ra đời.",
    startYear: Number.NEGATIVE_INFINITY,
    endYear: -10000,
  },
  {
    id: "agriculture",
    label: "Agriculture",
    labelVi: "Cách mạng Nông nghiệp",
    rangeLabel: "10,000–3,500 BCE",
    rangeLabelVi: "10.000–3.500 TCN",
    description: "This phase follows the spread of farming and the social changes associated with settled communities.",
    descriptionVi: "Giai đoạn lan rộng của nghề trồng trọt, chăn nuôi và sự hình thành các cộng đồng định cư sơ khai.",
    startYear: -10000,
    endYear: -3500,
  },
  {
    id: "ancient-civilizations",
    label: "Ancient Civilizations",
    labelVi: "Văn minh Cổ đại",
    rangeLabel: "3,500–500 BCE",
    rangeLabelVi: "3.500–500 TCN",
    description: "This phase introduces early urban societies, states, writing traditions, and regional civilizations.",
    descriptionVi: "Thời kỳ trỗi dậy của các đô thị đầu tiên, nhà nước sơ khai, chữ viết và các nền văn minh khu vực lớn.",
    startYear: -3500,
    endYear: -500,
  },
  {
    id: "classical-era",
    label: "Classical Era",
    labelVi: "Thời đại Cổ điển & Trung đại",
    rangeLabel: "500 BCE–1760 CE",
    rangeLabelVi: "500 TCN–1760 SCN",
    description: "This phase spans classical antiquity through the medieval and early modern world, c. 500 BCE to 1760.",
    descriptionVi: "Trải dài từ thời Cổ điển qua thế giới Trung cổ đến tiền hiện đại, với sự nở rộ của triết học và tôn giáo.",
    startYear: -500,
    endYear: 1760,
  },
  {
    id: "industrial-revolution",
    label: "Industrial Revolution",
    labelVi: "Cách mạng Công nghiệp",
    rangeLabel: "1760–1970 CE",
    rangeLabelVi: "1760–1970 SCN",
    description: "This phase covers industrialization and the transformation of production, transport, and urban life.",
    descriptionVi: "Giai đoạn công nghiệp hóa, cơ giới hóa sản xuất, giao thông vận tải và biến đổi đô thị sâu sắc.",
    startYear: 1760,
    endYear: 1970,
  },
  {
    id: "information-age",
    label: "Information Age",
    labelVi: "Kỷ nguyên Thông tin",
    rangeLabel: "1970–2010 CE",
    rangeLabelVi: "1970–2010 SCN",
    description: "This phase highlights the growing importance of computing, communications, and digital information.",
    descriptionVi: "Thời kỳ bùng nổ của vi tính, mạng viễn thông toàn cầu và thông tin kỹ thuật số số hóa xã hội.",
    startYear: 1970,
    endYear: 2010,
  },
  {
    id: "ai-age",
    label: "AI Age",
    labelVi: "Kỷ nguyên Trí tuệ Nhân tạo",
    rangeLabel: "2010 CE onward",
    rangeLabelVi: "Từ năm 2010 SCN đến nay",
    description: "This phase describes the growing role of artificial intelligence and related computational systems.",
    descriptionVi: "Giai đoạn phát triển vượt bậc của trí tuệ nhân tạo, mô hình nền tảng và các hệ thống tính toán tự động.",
    startYear: 2010,
    endYear: Number.POSITIVE_INFINITY,
  },
] as const;

export type Epoch = (typeof epochs)[number];

export function isStaticEpoch(epoch: Epoch): boolean {
  return epoch.startYear === null && epoch.endYear === null;
}

// These boundaries are editorial and approximate, intended to organize exploration rather than state exact historical divisions.
type NumericEpoch = Extract<Epoch, { startYear: number; endYear: number }>;
const numericEpochs = epochs.filter((epoch): epoch is NumericEpoch => epoch.startYear !== null && epoch.endYear !== null);

export function epochOf(year: number): Epoch {
  if (!Number.isFinite(year)) return numericEpochs[0];
  return numericEpochs.find((epoch) => year >= epoch.startYear && year < epoch.endYear) ?? numericEpochs[0];
}
