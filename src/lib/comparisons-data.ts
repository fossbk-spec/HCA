export interface ComparisonPair {
  slug: string;
  category: "epics" | "thinkers" | "commanders" | "civilizations";
  titleEn: string;
  titleVi: string;
  leftSlug: string;
  rightSlug: string;
  aspects: Array<{
    dimensionEn: string;
    dimensionVi: string;
    leftNoteEn: string;
    leftNoteVi: string;
    rightNoteEn: string;
    rightNoteVi: string;
  }>;
}

export const PRESET_COMPARISONS: ComparisonPair[] = [
  {
    slug: "dam-san-vs-gilgamesh",
    category: "epics",
    titleEn: "The Epic of Dam San vs The Epic of Gilgamesh",
    titleVi: "Sử thi Đăm Săn vs Sử thi Gilgamesh",
    leftSlug: "dam-san",
    rightSlug: "epic-of-gilgamesh",
    aspects: [
      {
        dimensionEn: "Cosmic Quest & Heroic Motive",
        dimensionVi: "Khát vọng Anh hùng & Mục tiêu Cuộc đời",
        leftNoteEn: "Dam San seeks to capture the Sun Goddess to bring eternal light and prosperity to his matriarchal community.",
        leftNoteVi: "Chàng Đăm Săn đi bắt Nữ thần Mặt Trời để đem ánh sáng rực rỡ và sự ấm no vĩnh cửu về cho buôn làng mẫu hệ.",
        rightNoteEn: "Gilgamesh journeys to the ends of the Earth seeking the secret of immortality after the tragic death of Enkidu.",
        rightNoteVi: "Gilgamesh vượt đại dương sự chết tìm kiếm phương thuốc trường sinh bất tử sau cái chết bi thương của tri kỷ Enkidu.",
      },
      {
        dimensionEn: "Cultural & Civilizational Origin",
        dimensionVi: "Bối cảnh Văn hóa & Không gian Khởi nguyên",
        leftNoteEn: "Central Highlands of Vietnam (Ede indigenous oral tradition, Klei Khan).",
        leftNoteVi: "Vùng đất đỏ bazan Tây Nguyên đại ngàn (Truyền thống truyền khẩu Klei Khan của đồng bào Ê-đê).",
        rightNoteEn: "Ancient Mesopotamia (Sumerian city-states between the Tigris and Euphrates, cuneiform clay tablets).",
        rightNoteVi: "Lưỡng Hà cổ đại (Thành bang Uruk giữa sông Tigris và Euphrates, khắc trên đất sét chữ hình nêm).",
      },
      {
        dimensionEn: "Core Philosophical Lesson",
        dimensionVi: "Triết lý Nhân sinh & Bài học Cốt lõi",
        leftNoteEn: "The heroic defiance of natural limits, community solidarity, and cyclical rebirth of heroic chieftains (Dam San Sun).",
        leftNoteVi: "Tinh thần bất khuất trước thiên nhiên, tình gắn kết buôn làng và sự tiếp nối bất diệt của người anh hùng (Đăm Săn cháu).",
        rightNoteEn: "Acceptance of human mortality; true immortality lies in civic monuments, cultural memory, and righteous deeds.",
        rightNoteVi: "Sự chấp nhận giới hạn hữu hạn của kiếp người; sự bất tử đích thực nằm ở các công trình văn hóa và di sản để lại.",
      },
    ],
  },
  {
    slug: "mahabharata-vs-iliad",
    category: "epics",
    titleEn: "The Mahabharata vs The Iliad",
    titleVi: "Sử thi Mahabharata vs Sử thi Iliad",
    leftSlug: "mahabharata",
    rightSlug: "iliad",
    aspects: [
      {
        dimensionEn: "The Great War Narrative",
        dimensionVi: "Quy mô Cuộc chiến Chiến lược",
        leftNoteEn: "18-day catastrophic Kurukshetra War between cousins Pandavas and Kauravas; contains the philosophical Bhagavad Gita.",
        leftNoteVi: "Đại chiến 18 ngày tại bình nguyên Kurukshetra giữa hai dòng họ anh em; chứa đựng kiệt tác triết học Bhagavad Gita.",
        rightNoteEn: "The final weeks of the 10-year Trojan War outside the walls of Troy, ignited by Paris's abduction of Helen.",
        rightNoteVi: "Những tuần lễ cuối cùng của cuộc bao vây thành Troy kéo dài 10 năm, bùng nổ từ cơn thịnh nộ của Achilles.",
      },
      {
        dimensionEn: "Ethical & Divine Dimensions",
        dimensionVi: "Chiều kích Đạo đức & Thần linh",
        leftNoteEn: "Centered on Dharma (righteous duty), Karma, and Lord Krishna's guidance on detachment from fruits of action.",
        leftNoteVi: "Xoay quanh đạo lý Dharma, luật Nhân quả Karma và lời thuyết giảng của Krishna về hành động không vụ lợi.",
        rightNoteEn: "Centered on warrior glory (Kleos), fate (Moira), and the capricious intervention of the Olympian gods.",
        rightNoteVi: "Đề cao danh dự chiến binh (Kleos), số mệnh bi tráng (Moira) và sự can thiệp đầy cảm tính của các vị thần đỉnh Olympus.",
      },
      {
        dimensionEn: "Literary Scale & Form",
        dimensionVi: "Quy mô & Cấu trúc Văn chương",
        leftNoteEn: "Over 100,000 Sanskrit couplets (slokas)—the longest epic poem in world literature.",
        leftNoteVi: "Hơn 100.000 câu thơ đôi tiếng Phạn (sloka)—bản trường ca đồ sộ nhất trong kho tàng văn học thế giới.",
        rightNoteEn: "15,693 lines in dactylic hexameter across 24 books attributed to Homer.",
        rightNoteVi: "15.693 câu thơ 6 phách chia làm 24 khúc ca bằng tiếng Hy Lạp cổ đại của Homer.",
      },
    ],
  },
  {
    slug: "confucius-vs-socrates",
    category: "thinkers",
    titleEn: "Confucius vs Socrates: Ethics and Wisdom",
    titleVi: "Khổng Tử vs Socrates: Đạo đức & Trí tuệ",
    leftSlug: "confucius",
    rightSlug: "socrates",
    aspects: [
      {
        dimensionEn: "Pedagogical Method",
        dimensionVi: "Phương pháp Giáo dục",
        leftNoteEn: "Role modeling, historical exemplars, aphoristic moral instruction recorded in the Analects.",
        leftNoteVi: "Nêu gương người hiền, dẫn giải kinh điển lịch sử và các câu cách ngôn ghi lại trong Luận ngữ.",
        rightNoteEn: "The Socratic dialectic method of rigorous questioning (elenchus) to expose unexamined contradictions.",
        rightNoteVi: "Phương pháp đối thoại vấn đáp phản biện (Elenchus) nhằm bóc tách các mâu thuẫn trong niềm tin thông thường.",
      },
      {
        dimensionEn: "Core Moral Principle",
        dimensionVi: "Nguyên lý Đạo đức Trung tâm",
        leftNoteEn: "Ren (Benevolence / Humaneness) expressed through Li (Ritual propriety) and filial piety (Xiao).",
        leftNoteVi: "Tư tưởng Nhân (Lòng nhân từ, yêu thương đồng loại) biểu hiện qua Lễ (Chuẩn mực hành vi) và đạo Hiếu.",
        rightNoteEn: "Virtue is Knowledge; 'The unexamined life is not worth living'; seeking objective definitions of justice and piety.",
        rightNoteVi: "Đức hạnh là Tri thức; 'Cuộc đời không được chất vấn là cuộc đời không đáng sống'; kiếm tìm chân lý khách quan.",
      },
      {
        dimensionEn: "Social & Political Vision",
        dimensionVi: "Tầm nhìn Xã hội & Trị quốc",
        leftNoteEn: "Harmonious social hierarchy ruled by virtuous gentlemen (Junzi) leading by moral authority.",
        leftNoteVi: "Trật tự xã hội hài hòa quy củ, được dẫn dắt bởi người quân tử cai trị bằng đức trị (Đức chính) thay vì hình phạt.",
        rightNoteEn: "Gadfly challenging the Athenian democracy's unexamined assumptions, prioritizing philosophical truth over public opinion.",
        rightNoteVi: "Kẻ 'châm chích' chất vấn các ảo tưởng của nền dân chủ Athens, đặt chân lý triết học lên trên dư luận số đông.",
      },
    ],
  },
  {
    slug: "tran-hung-dao-vs-sun-tzu",
    category: "commanders",
    titleEn: "Tran Hung Dao vs Sun Tzu: The Art of Strategic Warfare",
    titleVi: "Trần Hưng Đạo vs Tôn Vũ: Nghệ thuật Thao lược Quân sự",
    leftSlug: "tran-hung-dao",
    rightSlug: "sun-tzu",
    aspects: [
      {
        dimensionEn: "Strategic Doctrine",
        dimensionVi: "Học thuyết Chiến lược",
        leftNoteEn: "People's war, using the short to fight the long, avoiding enemy strength, uniting the whole army as one family (Hịch tướng sĩ, Binh thư yếu lược).",
        leftNoteVi: "Chiến tranh nhân dân, 'dĩ đoản binh chế trường trận', tránh chỗ mạnh đánh chỗ yếu, 'tướng sĩ một lòng phụ tử' (Hịch tướng sĩ, Binh thư yếu lược).",
        rightNoteEn: "Subduing the enemy without fighting; speed, deception, terrain calculation, and supreme intelligence (The Art of War).",
        rightNoteVi: "Bất chiến tự nhiên thành; tốc độ, nghệ thuật nghi binh, tính toán địa hình và tình báo tuyệt đỉnh (Binh pháp Tôn Tử).",
      },
      {
        dimensionEn: "Historical Test",
        dimensionVi: "Kiểm chứng Lịch sử Thực tế",
        leftNoteEn: "Directly commanded Đại Việt troops to defeat the invincible Mongol Empire in 1285 and 1288 (Battle of Bạch Đằng).",
        leftNoteVi: "Trực tiếp thống lĩnh quân dân Đại Việt đánh tan 2 cuộc xâm lược của Đế chế Mông Cổ hung hãn nhất lịch sử (Bạch Đằng 1288).",
        rightNoteEn: "General of the state of Wu during the Spring and Autumn period, authoring the foundational treatise on warfare.",
        rightNoteVi: "Đại tướng quốc xứ Ngô thời Xuân Thu, trước tác bộ binh thư kinh điển định hình tư duy quân sự toàn cầu.",
      },
      {
        dimensionEn: "Ethical & Spiritual Core",
        dimensionVi: "Cốt lõi Đạo đức & Tinh thần",
        leftNoteEn: "Profound patriotism, sacrifice for national independence, and relying on people's strength as the deep-rooted bedrock.",
        leftNoteVi: "'Khoan thư sức dân để làm kế sâu rễ bền gốc', đặt độc lập chủ quyền dân tộc và tình nghĩa đồng bào lên trên hết.",
        rightNoteEn: "Utilitarian military efficiency and preservation of the state through calculation and strategic prudence.",
        rightNoteVi: "Tính toán quân sự duy lý và bảo tồn quốc gia dựa trên sự thận trọng chiến lược và quản lý tài nguyên khôn ngoan.",
      },
    ],
  },
];
