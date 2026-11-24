export interface LearningEntityRef {
  type: "civilization" | "person" | "event" | "idea" | "book" | "artifact";
  slug: string;
  nameEn: string;
  nameVi: string;
}

export interface QuizQuestion {
  questionEn: string;
  questionVi: string;
  optionsEn: string[];
  optionsVi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationVi: string;
}

export interface LearningStep {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleVi: string;
  epochEn: string;
  epochVi: string;
  summaryEn: string;
  summaryVi: string;
  coreTakeawayEn: string;
  coreTakeawayVi: string;
  relatedEntities: LearningEntityRef[];
  quiz: QuizQuestion;
}

export interface LearningTrack {
  id: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  category: "History" | "Philosophy" | "Science" | "Literature" | "Regional";
  categoryVi: string;
  badgeEn: string;
  badgeVi: string;
  descriptionEn: string;
  descriptionVi: string;
  estimatedHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyVi: "Nhập môn" | "Trung cấp" | "Nâng cao";
  iconName: "Compass" | "Lightbulb" | "Atom" | "BookOpen" | "Landmark";
  accentColor: string;
  steps: LearningStep[];
}

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "the-human-odyssey",
    slug: "the-human-odyssey",
    titleEn: "The Human Odyssey: From Primal Fire to Artificial Minds",
    titleVi: "Hành trình Nhân loại: Từ Ngọn lửa Nguyên thủy đến Kỷ nguyên AI",
    category: "History",
    categoryVi: "Lịch sử Toàn cầu",
    badgeEn: "Foundational Track",
    badgeVi: "Lộ trình Trọng tâm",
    descriptionEn: "A grand narrative spanning 13.8 billion years—from the cosmological genesis of matter to agricultural river valleys, classical empires, the industrial leap, and the modern digital era.",
    descriptionVi: "Đại tự sự xuyên suốt 13,8 tỷ năm—từ khởi nguyên vũ trụ, lưu vực sông nông nghiệp, các đế chế cổ đại đến bước nhảy vọt công nghiệp và kỷ nguyên số hiện đại.",
    estimatedHours: 5,
    difficulty: "Beginner",
    difficultyVi: "Nhập môn",
    iconName: "Compass",
    accentColor: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    steps: [
      {
        id: "humanity-step-1",
        stepNumber: 1,
        titleEn: "Cosmic Genesis & The Cognitive Spark",
        titleVi: "Khởi nguyên Vũ trụ & Đột phá Nhận thức",
        epochEn: "Deep Time & Prehistory",
        epochVi: "Thời gian Sâu & Tiền sử",
        summaryEn: "Before civilizations arose, Homo sapiens underwent the Cognitive Revolution roughly 70,000 years ago, acquiring symbolic language, myth-making abilities, and collective memory.",
        summaryVi: "Trước khi các nền văn minh trỗi dậy, loài người Homo sapiens trải qua Cách mạng Nhận thức khoảng 70.000 năm trước, kiến tạo ngôn ngữ biểu tượng, huyền thoại và trí nhớ tập thể.",
        coreTakeawayEn: "Symbolic imagination allowed large groups of strangers to cooperate toward shared monumental goals.",
        coreTakeawayVi: "Trí tưởng tượng biểu tượng cho phép hàng ngàn người xa lạ hợp tác hướng về các mục tiêu vĩ đại chung.",
        relatedEntities: [
          { type: "event", slug: "invention-of-cuneiform", nameEn: "Invention of Cuneiform", nameVi: "Phát minh Chữ hình nêm" }
        ],
        quiz: {
          questionEn: "What was the most transformative outcome of the Cognitive Revolution?",
          questionVi: "Hệ quả mang tính biến đổi sâu sắc nhất của Cách mạng Nhận thức là gì?",
          optionsEn: [
            "Use of basic bronze weapons",
            "Ability to transmit information about things that do not physically exist (myths and symbols)",
            "Invention of mechanical clocks",
            "Domesticating the horse"
          ],
          optionsVi: [
            "Sử dụng vũ khí bằng đồng cơ bản",
            "Khả năng truyền đạt thông tin về những điều vô hình (huyền thoại, ý niệm và biểu tượng)",
            "Phát minh ra đồng hồ cơ học",
            "Thuần dưỡng loài ngựa"
          ],
          correctIndex: 1,
          explanationEn: "The cognitive capacity to create fictional myths enabled large-scale human cooperation beyond biological kinship limits.",
          explanationVi: "Năng lực nhận thức tạo ra huyền thoại và biểu tượng cho phép con người hợp tác quy mô lớn vượt qua giới hạn bầy đàn huyết thống."
        }
      },
      {
        id: "humanity-step-2",
        stepNumber: 2,
        titleEn: "The Fertile Crescent & Birth of Writing",
        titleVi: "Lưỡi liềm Màu mỡ & Bình minh Chữ viết",
        epochEn: "Ancient Civilizations (c. 3500 – 1000 BCE)",
        epochVi: "Văn minh Cổ đại (khoảng 3500 – 1000 TCN)",
        summaryEn: "In the valleys between the Tigris and Euphrates rivers, Sumerians engineered monumental irrigation, established city-states like Uruk, and developed cuneiform script.",
        summaryVi: "Tại các thung lũng ven sông Tigris và Euphrates, người Sumer đã xây dựng hệ thống thủy lợi quy mô, lập các thị quốc như Uruk và sáng tạo nên chữ viết hình nêm đầu tiên.",
        coreTakeawayEn: "Writing transitioned human culture from transient oral memory to externalized, immutable institutional records.",
        coreTakeawayVi: "Chữ viết chuyển hóa văn hóa nhân loại từ ký ức truyền khẩu mong manh sang văn bản thể chế hóa bất biến.",
        relatedEntities: [
          { type: "civilization", slug: "mesopotamia", nameEn: "Mesopotamia", nameVi: "Lưỡng Hà Cổ đại" },
          { type: "person", slug: "hammurabi", nameEn: "Hammurabi", nameVi: "Vua Hammurabi" },
          { type: "book", slug: "code-of-hammurabi", nameEn: "Code of Hammurabi", nameVi: "Bộ luật Hammurabi" },
          { type: "book", slug: "epic-of-gilgamesh", nameEn: "Epic of Gilgamesh", nameVi: "Sử thi Gilgamesh" }
        ],
        quiz: {
          questionEn: "Which early writing system was stamped onto damp clay tablets in Mesopotamia?",
          questionVi: "Hệ thống chữ viết cổ đại nào được ấn bằng que sậy lên những phiến đất sét ướt ở Lưỡng Hà?",
          optionsEn: [
            "Hieroglyphics",
            "Cuneiform",
            "Oracle Bone Script",
            "Phoenician Alphabet"
          ],
          optionsVi: [
            "Chữ tượng hình Ai Cập",
            "Chữ hình nêm (Cuneiform)",
            "Chữ Giáp cốt",
            "Bảng chữ cái Phoenicia"
          ],
          correctIndex: 1,
          explanationEn: "Cuneiform (from Latin 'cuneus' meaning wedge) was invented by the Sumerians around 3400–3200 BCE.",
          explanationVi: "Chữ hình nêm (Cuneiform) do người Sumer phát minh vào khoảng năm 3400–3200 TCN, khắc bằng đầu que sậy vạt chéo."
        }
      },
      {
        id: "humanity-step-3",
        stepNumber: 3,
        titleEn: "Axial Age & Classical Empires",
        titleVi: "Thời đại Trục & Các Đại Đế chế Cổ điển",
        epochEn: "Classical Era (c. 800 BCE – 500 CE)",
        epochVi: "Thời kỳ Cổ điển (khoảng 800 TCN – 500 SCN)",
        summaryEn: "Across Eurasia, philosopher-thinkers emerged simultaneously: Socrates and Plato in Greece, Confucius and Laozi in China, and the Buddha in India, establishing ethical philosophies.",
        summaryVi: "Khắp lục địa Á-Âu, các nhà tư tưởng xuất hiện đồng thời: Socrates, Plato tại Hy Lạp, Khổng Tử, Lão Tử tại Trung Hoa và Đức Phật tại Ấn Độ, đặt nền móng triết học nhân văn.",
        coreTakeawayEn: "The Axial Age shifted human focus from sacrificial ritual appeasement to inner ethical self-examination.",
        coreTakeawayVi: "Thời đại Trục chuyển trọng tâm nhân loại từ tế lễ bái thần sang tự soi xét đạo đức và ý nghĩa nội tâm.",
        relatedEntities: [
          { type: "civilization", slug: "ancient-greece", nameEn: "Ancient Greece", nameVi: "Hy Lạp Cổ đại" },
          { type: "civilization", slug: "roman-empire", nameEn: "Roman Empire", nameVi: "Đế chế La Mã" },
          { type: "person", slug: "socrates", nameEn: "Socrates", nameVi: "Nhà triết học Socrates" },
          { type: "idea", slug: "democracy", nameEn: "Democracy", nameVi: "Chế độ Dân chủ" }
        ],
        quiz: {
          questionEn: "Who coined the historical term 'Axial Age' (Achsenzeit) to describe the simultaneous spiritual awakening of 800–200 BCE?",
          questionVi: "Nhà triết học nào đã đưa ra thuật ngữ 'Thời đại Trục' (Axial Age) để mô tả sự thức tỉnh tâm linh đồng thời từ 800–200 TCN?",
          optionsEn: [
            "Arnold Toynbee",
            "Karl Jaspers",
            "Fernand Braudel",
            "Edward Gibbon"
          ],
          optionsVi: [
            "Arnold Toynbee",
            "Karl Jaspers",
            "Fernand Braudel",
            "Edward Gibbon"
          ],
          correctIndex: 1,
          explanationEn: "German philosopher Karl Jaspers proposed the Axial Age theory in 'The Origin and Goal of History' (1949).",
          explanationVi: "Nhà triết học Karl Jaspers đưa ra khái niệm 'Thời đại Trục' trong tác phẩm 'Nguồn gốc và Mục đích của Lịch sử' (1949)."
        }
      },
      {
        id: "humanity-step-4",
        stepNumber: 4,
        titleEn: "The Silk Routes & Afro-Eurasian Exchange",
        titleVi: "Con đường Tơ lụa & Giao thoa Á - Âu - Phi",
        epochEn: "Post-Classical & Medieval (c. 500 – 1500 CE)",
        epochVi: "Thời kỳ Trung đại & Hậu Cổ điển (khoảng 500 – 1500 SCN)",
        summaryEn: "Trans-continental networks of caravans and maritime sea routes carried not only silk and spices, but paper, algebra, compass technology, and world religions across continents.",
        summaryVi: "Mạng lưới đường bộ lạc đà và hải trình xuyên đại dương không chỉ vận chuyển tơ lụa và hương liệu, mà còn luân chuyển kỹ thuật làm giấy, đại số, la bàn và các tôn giáo lớn.",
        coreTakeawayEn: "Civilizations never existed in isolation; innovation was born at crossroads of trade and cultural translation.",
        coreTakeawayVi: "Các nền văn minh không bao giờ cô lập; tiến bộ kỹ thuật luôn nảy nở tại các giao lộ thương mại và dịch thuật văn hóa.",
        relatedEntities: [
          { type: "civilization", slug: "ancient-china", nameEn: "Ancient China", nameVi: "Văn minh Trung Hoa" },
          { type: "civilization", slug: "islamic-civilization", nameEn: "Islamic Civilization", nameVi: "Văn minh Hồi giáo" }
        ],
        quiz: {
          questionEn: "Which landmark Chinese invention transformed European intellectual history after passing through the Islamic world?",
          questionVi: "Phát minh mang tính cột mốc nào của Trung Hoa đã làm thay đổi dòng chảy tri thức phương Tây sau khi truyền qua thế giới Hồi giáo?",
          optionsEn: [
            "Silk weaving",
            "Papermaking",
            "Porcelain kilns",
            "Acupuncture"
          ],
          optionsVi: [
            "Dệt tơ tằm",
            "Kỹ thuật làm giấy (Papermaking)",
            "Kỹ thuật nung đồ sứ",
            "Thuật châm cứu"
          ],
          correctIndex: 1,
          explanationEn: "Papermaking reached Samarkand and Baghdad in the 8th century, drastically lowering the cost of storing and copying knowledge.",
          explanationVi: "Kỹ thuật làm giấy lan truyền qua Samarkand và Baghdad vào thế kỷ thứ VIII, hạ giá thành sao chép sách và mở đường cho phổ cập tri thức."
        }
      },
      {
        id: "humanity-step-5",
        stepNumber: 5,
        titleEn: "The Industrial Leap & The Age of Reason",
        titleVi: "Bước nhảy vọt Công nghiệp & Kỷ nguyên Khai sáng",
        epochEn: "Early Modern & Industrial (c. 1500 – 1900 CE)",
        epochVi: "Thời kỳ Cận đại & Công nghiệp (khoảng 1500 – 1900 SCN)",
        summaryEn: "Harnessing fossil power via the steam engine broke humanity's dependence on muscle and animal labor, while the Enlightenment enshrined human rights and constitutional law.",
        summaryVi: "Việc khai thác năng lượng hóa thạch qua động cơ hơi nước đã giải phóng nhân loại khỏi sức cơ bắp, trong khi phong trào Khai sáng xác lập nhân quyền và hiến pháp.",
        coreTakeawayEn: "Mechanical power multiplied productivity, accelerating urbanization, education, and global interconnection.",
        coreTakeawayVi: "Năng lượng cơ khí nhân cấp sức sản xuất, thúc đẩy đô thị hóa, giáo dục và liên kết toàn cầu.",
        relatedEntities: [
          { type: "idea", slug: "rule-of-law", nameEn: "Rule of Law", nameVi: "Nhà nước Pháp quyền" },
          { type: "idea", slug: "citizenship", nameEn: "Citizenship", nameVi: "Quyền Công dân" }
        ],
        quiz: {
          questionEn: "What key energy transition ignited the First Industrial Revolution?",
          questionVi: "Sự chuyển dịch năng lượng cốt lõi nào đã châm ngòi cho Cách mạng Công nghiệp lần thứ nhất?",
          optionsEn: [
            "From muscle/wind/wood to steam power fueled by coal",
            "From nuclear fission to solar photovoltaic",
            "From whale oil to electricity",
            "From geothermal power to hydroelectricity"
          ],
          optionsVi: [
            "Từ sức cơ bắp/gió/gỗ sang năng lượng hơi nước đốt bằng than đá",
            "Từ phân hạch hạt nhân sang điện mặt trời",
            "Từ dầu cá voi sang năng lượng điện",
            "Từ địa nhiệt sang thủy điện"
          ],
          correctIndex: 0,
          explanationEn: "The steam engine fueled by abundant coal unlocked vast thermal energy, fundamentally reshaping production and transport.",
          explanationVi: "Động cơ hơi nước chạy bằng than đá đã mở khóa nguồn nhiệt năng khổng lồ, tái định hình hoàn toàn phương thức sản xuất và giao thông."
        }
      },
      {
        id: "humanity-step-6",
        stepNumber: 6,
        titleEn: "The Silicon Dawn: Information & Artificial Minds",
        titleVi: "Bình minh Silicon: Thời đại Thông tin & Trí tuệ Nhân tạo",
        epochEn: "Modern Era & AI Age (1950 – Present)",
        epochVi: "Thời đại Hiện đại & Kỷ nguyên AI (1950 – Nay)",
        summaryEn: "From Turing's computing foundations and silicon semiconductors to the global Internet and large neural models, humanity has begun creating externalized reasoning systems.",
        summaryVi: "Từ lý thuyết điện toán của Turing, chất bán dẫn silicon đến Internet toàn cầu và các mô hình mạng nơ-ron, nhân loại bắt đầu kiến tạo các hệ thống tư duy nhân tạo.",
        coreTakeawayEn: "The central challenge of the 21st century is aligning exponential technological power with universal human flourishing.",
        coreTakeawayVi: "Thách thức trọng tâm của thế kỷ XXI là đồng bộ hóa sức mạnh công nghệ hàm mũ với các giá trị nhân văn phổ quát.",
        relatedEntities: [
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Việt Nam Đương đại" },
          { type: "idea", slug: "democracy", nameEn: "Democracy", nameVi: "Dân chủ trong Kỷ nguyên Số" }
        ],
        quiz: {
          questionEn: "Who is widely revered as the theoretical father of modern computer science and artificial intelligence?",
          questionVi: "Ai được tôn vinh rộng rãi là người cha lý thuyết của khoa học máy tính và trí tuệ nhân tạo hiện đại?",
          optionsEn: [
            "Alan Turing",
            "John von Neumann",
            "Claude Shannon",
            "Ada Lovelace"
          ],
          optionsVi: [
            "Alan Turing",
            "John von Neumann",
            "Claude Shannon",
            "Ada Lovelace"
          ],
          correctIndex: 0,
          explanationEn: "Alan Turing formalized the concepts of algorithm and computation with the Turing Machine and pioneered the Turing Test for AI in 1950.",
          explanationVi: "Alan Turing đã hình thức hóa khái niệm thuật toán và điện toán với Máy Turing (1936) và đề xuất Phép thử Turing cho AI vào năm 1950."
        }
      }
    ]
  },
  {
    id: "evolution-of-ideas",
    slug: "evolution-of-ideas",
    titleEn: "The Crucible of Ideas: Law, Democracy & Moral Order",
    titleVi: "Lò luyện Tư tưởng: Pháp luật, Dân chủ & Đạo đức Xã hội",
    category: "Philosophy",
    categoryVi: "Triết học & Tư tưởng",
    badgeEn: "Governance & Ethics",
    badgeVi: "Thể chế & Đạo đức",
    descriptionEn: "Trace the intellectual evolution of how humans organized justice, challenged tyranny, invented citizenship, and articulated universal ethical principles.",
    descriptionVi: "Khám phá sự tiến hóa của tư tưởng nhân loại về công lý, khắc chế chuyên chế bạo quyền, khai sinh quyền công dân và các nguyên lý đạo đức phổ quát.",
    estimatedHours: 4,
    difficulty: "Intermediate",
    difficultyVi: "Trung cấp",
    iconName: "Lightbulb",
    accentColor: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400",
    steps: [
      {
        id: "ideas-step-1",
        stepNumber: 1,
        titleEn: "The Lex Talionis & The Stele of Hammurabi",
        titleVi: "Luật Phục thù Tương xứng & Bia đá Hammurabi",
        epochEn: "c. 1750 BCE",
        epochVi: "Khoảng 1750 TCN",
        summaryEn: "Carved upon a diorite stele, the Code of Hammurabi established one of history's first written legal frameworks, standardizing contractual liability, property rights, and proportional retaliation.",
        summaryVi: "Khắc trên bia đá thạch anh đen, Bộ luật Hammurabi xác lập một trong những khung pháp lý thành văn đầu tiên của lịch sử, chuẩn hóa trách nhiệm hợp đồng và mức phạt tương xứng.",
        coreTakeawayEn: "Inscribing law in stone placed governance above arbitrary personal whims of individual magistrates.",
        coreTakeawayVi: "Khắc luật vào bia đá công khai đã đặt chuẩn mực quản trị lên trên sự tùy tiện cảm tính của quan lại xét xử.",
        relatedEntities: [
          { type: "book", slug: "code-of-hammurabi", nameEn: "Code of Hammurabi", nameVi: "Bộ luật Hammurabi" },
          { type: "person", slug: "hammurabi", nameEn: "Hammurabi", nameVi: "Vua Hammurabi" },
          { type: "civilization", slug: "mesopotamia", nameEn: "Mesopotamia", nameVi: "Lưỡng Hà Cổ đại" }
        ],
        quiz: {
          questionEn: "What was a core civil achievement of Hammurabi's Code in Babylonian society?",
          questionVi: "Thành tựu dân sự cốt lõi của Bộ luật Hammurabi đối với xã hội Babylon là gì?",
          optionsEn: [
            "Abolition of all taxes",
            "Publicly display uniform laws so the strong could not arbitrarily oppress the weak",
            "Creation of a secret police",
            "Prohibition of all trade with foreigners"
          ],
          optionsVi: [
            "Bãi bỏ toàn bộ các loại thuế",
            "Công khai luật pháp thống nhất để kẻ mạnh không thể tùy tiện ức hiếp kẻ yếu",
            "Thành lập lực lượng cảnh sát mật",
            "Cấm chỉ mọi hoạt động buôn bán với người ngoại quốc"
          ],
          correctIndex: 1,
          explanationEn: "Hammurabi stated in the prologue that the laws were erected 'so that the strong might not injure the weak and to bring justice to the land'.",
          explanationVi: "Phần mở đầu bia đá nêu rõ mục đích ban hành luật: 'Để kẻ mạnh không ức hiếp kẻ yếu, đem lại công lý cho xứ sở'."
        }
      },
      {
        id: "ideas-step-2",
        stepNumber: 2,
        titleEn: "The Athenian Experiment: Dêmos and Kratos",
        titleVi: "Thử nghiệm Athens: Dêmos và Quyền lực Nhân dân",
        epochEn: "5th Century BCE",
        epochVi: "Thế kỷ V TCN",
        summaryEn: "In the Agora of Athens, citizens gathered in the Ekklesia to directly deliberate and vote on laws, foreign alliances, and military campaigns, giving birth to democracy.",
        summaryVi: "Tại quảng trường Agora thành Athens, các công dân tụ họp tại Đại hội Nhân dân (Ekklesia) để trực tiếp thảo luận và bỏ phiếu về pháp luật và vận mệnh thành bang, khai sinh nền dân chủ.",
        coreTakeawayEn: "Democracy proved that political authority can legitimately derive from civic persuasion and consensus rather than divine descent.",
        coreTakeawayVi: "Chế độ dân chủ chứng minh rằng tính chính danh chính trị có thể xuất phát từ sự thuyết phục và đồng thuận công dân thay vì thần quyền.",
        relatedEntities: [
          { type: "idea", slug: "democracy", nameEn: "Democracy", nameVi: "Chế độ Dân chủ" },
          { type: "civilization", slug: "ancient-greece", nameEn: "Ancient Greece", nameVi: "Hy Lạp Cổ đại" },
          { type: "person", slug: "socrates", nameEn: "Socrates", nameVi: "Socrates" }
        ],
        quiz: {
          questionEn: "What does the etymological Greek root 'Democracy' literally signify?",
          questionVi: "Từ nguyên gốc Hy Lạp 'Democracy' (Dân chủ) có nghĩa gốc là gì?",
          optionsEn: [
            "Rule of the wealthy few",
            "Rule or power of the people (Demos + Kratos)",
            "Rule of the philosopher king",
            "Rule of the battlefield commanders"
          ],
          optionsVi: [
            "Quyền cai trị của thiểu số người giàu có",
            "Quyền lực thuộc về nhân dân (Demos: nhân dân + Kratos: quyền lực)",
            "Sự trị vì của vị vua triết gia",
            "Quyền cai trị của các chỉ huy quân sự"
          ],
          correctIndex: 1,
          explanationEn: "Demos means 'the people' and Kratos means 'power or rule' in classical Greek.",
          explanationVi: "'Demos' nghĩa là nhân dân và 'Kratos' là quyền năng, sức mạnh hoặc sự cai trị trong tiếng Hy Lạp cổ."
        }
      },
      {
        id: "ideas-step-3",
        stepNumber: 3,
        titleEn: "Plato's Republic & The Rule of the Wise",
        titleVi: "Cộng hòa của Plato & Khát vọng Trị quốc Hiền minh",
        epochEn: "c. 375 BCE",
        epochVi: "Khoảng 375 TCN",
        summaryEn: "Witnessing the execution of his mentor Socrates, Plato authored 'The Republic', exploring justice, the allegory of the cave, and proposing philosopher-kings guided by reason.",
        summaryVi: "Chứng kiến cái chết oan nghiệt của thầy mình là Socrates, Plato đã viết tác phẩm 'Cộng hòa', khám phá bản chất công lý, ngụ ngôn hang đá và hình mẫu vua triết gia.",
        coreTakeawayEn: "A stable republic requires leaders driven by pursuit of truth and wisdom rather than greed and vanity.",
        coreTakeawayVi: "Một thể chế cộng hòa bền vững đòi hỏi người lãnh đạo hành động vì chân lý và lương tri thay vì tư lợi và hư vinh.",
        relatedEntities: [
          { type: "book", slug: "the-republic", nameEn: "The Republic", nameVi: "Tác phẩm Cộng hòa" },
          { type: "idea", slug: "republic", nameEn: "Republic", nameVi: "Thể chế Cộng hòa" },
          { type: "person", slug: "plato", nameEn: "Plato", nameVi: "Plato" }
        ],
        quiz: {
          questionEn: "In Plato's famous Allegory of the Cave, what do the shadows on the stone wall represent?",
          questionVi: "Trong Ngụ ngôn Hang đá nổi tiếng của Plato, bóng đen trên vách đá tượng trưng cho điều gì?",
          optionsEn: [
            "Ultimate metaphysical Truth",
            "Superficial illusions and deceptive sensory appearances mistaken for reality",
            "The wrath of the Olympic gods",
            "The written laws of the assembly"
          ],
          optionsVi: [
            "Chân lý siêu hình học tối thượng",
            "Những ảo tưởng bề ngoài và cảm giác đánh lừa bị lầm tưởng là hiện thực",
            "Cơn thịnh nộ của các vị thần đỉnh Olympus",
            "Những văn bản luật pháp thành văn"
          ],
          correctIndex: 1,
          explanationEn: "The prisoners mistakenly believe the shadows cast by puppets are the true reality, until one escapes to see the sun.",
          explanationVi: "Những người tù bị giam cầm lầm tưởng bóng đen phản chiếu là hiện thực chân chính, cho tới khi có người thoát ra ngoài hang nhìn thấy ánh mặt trời chân lý."
        }
      },
      {
        id: "ideas-step-4",
        stepNumber: 4,
        titleEn: "Roman Jurisprudence & The Concept of Civitas",
        titleVi: "Pháp lý La Mã & Khái niệm Quyền Công dân",
        epochEn: "c. 450 BCE – 534 CE",
        epochVi: "Khoảng 450 TCN – 534 SCN",
        summaryEn: "From the Twelve Tables to Justinian's Corpus Juris Civilis, Rome transformed law into a rigorous science based on precedent, equity, and civic contract, influencing civil law worldwide.",
        summaryVi: "Từ Luật Mười hai Bảng đến Bộ Dân luật Justinian, La Mã đã biến luật pháp thành khoa học chuẩn xác dựa trên tiền lệ, sự công bằng và khế ước công dân, chi phối hệ thống luật dân sự toàn cầu.",
        coreTakeawayEn: "The rule of law ensures that even the most powerful imperator remains subject to universal juridical boundaries.",
        coreTakeawayVi: "Pháp quyền bảo đảm rằng ngay cả hoàng đế quyền lực nhất cũng phải nằm dưới khuôn khổ giới hạn của luật pháp.",
        relatedEntities: [
          { type: "civilization", slug: "roman-empire", nameEn: "Roman Empire", nameVi: "Đế chế La Mã" },
          { type: "idea", slug: "rule-of-law", nameEn: "Rule of Law", nameVi: "Nhà nước Pháp quyền" },
          { type: "idea", slug: "citizenship", nameEn: "Citizenship", nameVi: "Quyền Công dân" }
        ],
        quiz: {
          questionEn: "What foundational legal doctrine originates in Roman jurisprudence regarding the burden of proof?",
          questionVi: "Nguyên tắc pháp lý nền tảng nào trong tố tụng hiện đại bắt nguồn từ luật học La Mã về nghĩa vụ chứng minh?",
          optionsEn: [
            "Guilty until proven innocent",
            "Innocent until proven guilty (Ei incumbit probatio qui dicit, non qui negat)",
            "The magistrate's decision is divinely infallibe",
            "Punishment without trial is permissible in peacetime"
          ],
          optionsVi: [
            "Mặc định có tội cho đến khi chứng minh được vô tội",
            "Suy đoán vô tội: Nghĩa vụ chứng minh thuộc về người buộc tội chứ không phải người phủ nhận",
            "Quyết định của quan tòa luôn luôn chuẩn xác tuyệt đối",
            "Cho phép trừng phạt không cần xét xử trong thời bình"
          ],
          correctIndex: 1,
          explanationEn: "Roman jurist Paulus codified: 'Proof lies on him who asserts, not on him who denies', the cornerstone of modern due process.",
          explanationVi: "Nhà luật học La Mã Paulus đã đúc kết: 'Gánh nặng chứng minh thuộc về bên khẳng định, không phải bên phủ định'—hòn đá tảng của nguyên tắc suy đoán vô tội."
        }
      },
      {
        id: "ideas-step-5",
        stepNumber: 5,
        titleEn: "Eastern Humanism: Ren, Li & The Way of Harmony",
        titleVi: "Nhân văn Đông phương: Nhân, Lễ & Đạo Hòa hợp",
        epochEn: "Spring and Autumn Period (c. 551 – 479 BCE)",
        epochVi: "Thời kỳ Xuân Thu (khoảng 551 – 479 TCN)",
        summaryEn: "In an era of chaotic civil wars, Confucius taught that societal harmony depends upon self-cultivation, filial piety, empathy (Ren), and ethical conduct (Li), shaping East Asian civilization.",
        summaryVi: "Trong thời buổi chiến tranh loạn lạc, Khổng Tử chủ trương trật tự xã hội bền vững phải bắt đầu từ tu thân, hiếu đạo, lòng nhân ái (Nhân) và lễ nghĩa chuẩn mực (Lễ), định hình văn hóa Á Đông.",
        coreTakeawayEn: "Social peace begins with personal moral integrity: self-discipline radiates outward to family, state, and world.",
        coreTakeawayVi: "Hòa bình xã hội khởi đầu từ tu thân tích đức: tu thân, tề gia, trị quốc, bình thiên hạ.",
        relatedEntities: [
          { type: "civilization", slug: "ancient-china", nameEn: "Ancient China", nameVi: "Văn minh Trung Hoa" },
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" }
        ],
        quiz: {
          questionEn: "What is the core meaning of Confucius' concept of 'Ren' (仁)?",
          questionVi: "Ý nghĩa cốt lõi của chữ 'Nhân' (仁) trong tư tưởng Nho gia Khổng Tử là gì?",
          optionsEn: [
            "Military conquering strength",
            "Benevolence, human-heartedness, and loving empathy toward fellow beings",
            "Amassing vast material wealth",
            "Total ascetic renunciation of society"
          ],
          optionsVi: [
            "Sức mạnh chinh phạt quân sự",
            "Lòng nhân ái, lòng trắc ẩn và sự thấu cảm yêu thương con người",
            "Tích lũy của cải vật chất lớn",
            "Xa lánh hoàn toàn xã hội để tu khổ hạnh"
          ],
          correctIndex: 1,
          explanationEn: "Ren (Benevolence) is the supreme virtue in Confucianism—'Do not do to others what you would not have them do to you'.",
          explanationVi: "'Nhân' là phẩm đức tối cao trong Nho giáo, thể hiện qua phương châm: 'Kỷ sở bất dục, vật thi ư nhân' (Điều mình không muốn, chớ làm cho người khác)."
        }
      }
    ]
  },
  {
    id: "history-of-science",
    slug: "history-of-science",
    titleEn: "The Arc of Discovery: How Science Unveiled the Cosmos",
    titleVi: "Cung đường Khám phá: Khoa học Khai mở Vũ trụ",
    category: "Science",
    categoryVi: "Khoa học & Tự nhiên",
    badgeEn: "Natural Philosophy",
    badgeVi: "Triết học Tự nhiên",
    descriptionEn: "From ancient lunar calculations and Greek geometry to the Islamic translation movement, Copernican revolutions, and quantum mechanics.",
    descriptionVi: "Từ phép tính chu kỳ mặt trăng cổ đại, hình học Hy Lạp đến phong trào dịch thuật Hồi giáo, cuộc cách mạng Copernicus và cơ học lượng tử.",
    estimatedHours: 4,
    difficulty: "Intermediate",
    difficultyVi: "Trung cấp",
    iconName: "Atom",
    accentColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    steps: [
      {
        id: "science-step-1",
        stepNumber: 1,
        titleEn: "Stargazers & Surveyors: Mesopotamia & Nile Geometry",
        titleVi: "Các Nhà thiên văn Lưỡng Hà & Hình học Sông Nile",
        epochEn: "c. 3000 – 1500 BCE",
        epochVi: "Khoảng 3000 – 1500 TCN",
        summaryEn: "Babylonian astronomers recorded celestial eclipses using a base-60 numerical system, while Egyptian engineers developed practical geometry to survey farmlands flooded annually by the Nile.",
        summaryVi: "Các nhà thiên văn Babylon ghi chép nhật thực bằng hệ đếm cơ số 60, trong khi các kỹ sư Ai Cập phát triển hình học ứng dụng để đo đạc lại ruộng đồng sau mỗi mùa lũ sông Nile.",
        coreTakeawayEn: "Quantitative measurement transformed mysterious cosmic phenomena into predictable mathematical rhythms.",
        coreTakeawayVi: "Đo lường định lượng đã biến các hiện tượng thiên nhiên kỳ bí thành những chu kỳ toán học có thể dự báo.",
        relatedEntities: [
          { type: "civilization", slug: "mesopotamia", nameEn: "Mesopotamia", nameVi: "Lưỡng Hà Cổ đại" },
          { type: "civilization", slug: "ancient-egypt", nameEn: "Ancient Egypt", nameVi: "Ai Cập Cổ đại" }
        ],
        quiz: {
          questionEn: "What legacy of the ancient Babylonian base-60 (sexagesimal) number system survives in our daily modern life?",
          questionVi: "Di sản nào từ hệ đếm cơ số 60 của người Babylon cổ đại vẫn hiện diện trong sinh hoạt hàng ngày của chúng ta?",
          optionsEn: [
            "The metric system of meters and kilograms",
            "Dividing an hour into 60 minutes and a circle into 360 degrees",
            "The 100-cent currency system",
            "The periodic table of elements"
          ],
          optionsVi: [
            "Hệ mét đo lường mét và kilôgam",
            "Chia 1 giờ thành 60 phút và một vòng tròn thành 360 độ",
            "Hệ thống tiền tệ 100 xu",
            "Bảng tuần hoàn các nguyên tố hóa học"
          ],
          correctIndex: 1,
          explanationEn: "Babylonians divided circles into 360 degrees and hours into 60 minutes, which we still use globally today.",
          explanationVi: "Người Babylon chia đường tròn thành 360 độ và giờ thành 60 phút, hệ thống đo lường thời gian và góc độ được duy trì đến tận ngày nay."
        }
      },
      {
        id: "science-step-2",
        stepNumber: 2,
        titleEn: "The Antikythera Marvel & Greek Axiomatic Logic",
        titleVi: "Cỗ máy Antikythera & Lô-gíc Tiên đề Hy Lạp",
        epochEn: "c. 300 – 100 BCE",
        epochVi: "Khoảng 300 – 100 TCN",
        summaryEn: "In Alexandria, Euclid formalized geometry from self-evident axioms, while Hellenistic artisans built the Antikythera Mechanism—a bronze geared mechanical analog computer tracking cosmic cycles.",
        summaryVi: "Tại Alexandria, Euclid hệ thống hóa hình học từ các tiên đề hiển nhiên, trong khi các nghệ nhân Hy Lạp chế tác Cỗ máy Antikythera—máy tính cơ học bánh răng dự đoán chuyển động thiên thể.",
        coreTakeawayEn: "Deductive proof and precision engineering demonstrated that nature obeys intelligible, mechanical regularities.",
        coreTakeawayVi: "Chứng minh suy diễn và kỹ nghệ chính xác khẳng định tự nhiên vận hành theo các quy luật cơ học có thể thấu hiểu.",
        relatedEntities: [
          { type: "civilization", slug: "ancient-greece", nameEn: "Ancient Greece", nameVi: "Hy Lạp Cổ đại" },
          { type: "artifact", slug: "antikythera-mechanism", nameEn: "Antikythera Mechanism", nameVi: "Cỗ máy Antikythera" }
        ],
        quiz: {
          questionEn: "What was the primary function of the ancient Antikythera Mechanism discovered in a Mediterranean shipwreck?",
          questionVi: "Chức năng chính của Cỗ máy Antikythera cổ đại được tìm thấy dưới đáy biển Địa Trung Hải là gì?",
          optionsEn: [
            "A weapon for firing burning Greek fire",
            "An analog mechanical computer calculating astronomical positions, eclipses, and Olympic cycles",
            "A scale for weighing silver bullion",
            "A steam-powered pump for draining ships"
          ],
          optionsVi: [
            "Vũ khí bắn lửa Hy Lạp trên chiến thuyền",
            "Máy tính cơ học tương tự tính toán vị trí thiên thể, nhật nguyệt thực và chu kỳ Thế vận hội",
            "Bàn cân trọng lượng vàng bạc thỏi",
            "Máy bơm hơi nước dùng để thoát nước tàu"
          ],
          correctIndex: 1,
          explanationEn: "Containing over 30 bronze gears, it is acknowledged as the oldest known analog computer in archaeological history.",
          explanationVi: "Với hơn 30 bánh răng bằng đồng tinh xảo, đây được công nhận là máy tính cơ học tương tự cổ xưa nhất trong lịch sử khảo cổ học."
        }
      },
      {
        id: "science-step-3",
        stepNumber: 3,
        titleEn: "The House of Wisdom & The Birth of Algebra",
        titleVi: "Viện Hàn lâm Bayt al-Hikma & Khai sinh Đại số",
        epochEn: "8th – 12th Century CE",
        epochVi: "Thế kỷ VIII – XII SCN",
        summaryEn: "In Abbasid Baghdad, scholars at the House of Wisdom translated Greek, Persian, and Sanskrit treatises, while mathematician Al-Khwarizmi formulated algebra (Al-Jabr) and algorithmic computation.",
        summaryVi: "Tại Baghdad thời Abbasid, các học giả Viện Hàn lâm Bayt al-Hikma đã dịch thuật di sản Hy Lạp, Ba Tư, Phạn ngữ, trong khi nhà toán học Al-Khwarizmi khai sinh môn Đại số (Al-Jabr) và thuật toán.",
        coreTakeawayEn: "Preserving, translating, and synthesizing cross-cultural research preserved science through Europe's early Middle Ages.",
        coreTakeawayVi: "Bảo tồn, dịch thuật và tổng hợp tri thức đa văn hóa đã gìn giữ ngọn đuốc khoa học trong suốt thời kỳ Trung cổ.",
        relatedEntities: [
          { type: "civilization", slug: "islamic-civilization", nameEn: "Islamic Civilization", nameVi: "Văn minh Hồi giáo" }
        ],
        quiz: {
          questionEn: "From whose Latinized name does our modern computer term 'algorithm' directly derive?",
          questionVi: "Thuật ngữ 'thuật toán' (algorithm) trong khoa học máy tính bắt nguồn từ tên Latinh hóa của học giả nào?",
          optionsEn: [
            "Ibn Sina (Avicenna)",
            "Muhammad ibn Musa al-Khwarizmi",
            "Ibn al-Haytham (Alhazen)",
            "Al-Kindi"
          ],
          optionsVi: [
            "Ibn Sina (Avicenna)",
            "Muhammad ibn Musa al-Khwarizmi",
            "Ibn al-Haytham (Alhazen)",
            "Al-Kindi"
          ],
          correctIndex: 1,
          explanationEn: "Al-Khwarizmi's name was Latinized as 'Algoritmi', giving rise to the word 'algorithm'.",
          explanationVi: "Tên của nhà toán học Al-Khwarizmi khi dịch sang tiếng Latinh đọc thành 'Algoritmi', từ đó sinh ra từ 'algorithm' (thuật toán)."
        }
      },
      {
        id: "science-step-4",
        stepNumber: 4,
        titleEn: "The Copernican Shift & Empiricism",
        titleVi: "Bước ngoặt Copernicus & Phương pháp Thực nghiệm",
        epochEn: "16th – 17th Century CE",
        epochVi: "Thế kỷ XVI – XVII SCN",
        summaryEn: "Copernicus displaced the Earth from the center of the universe, Galileo aimed the telescope skyward, and Isaac Newton synthesized terrestrial and celestial mechanics under universal gravity.",
        summaryVi: "Copernicus truất ngôi trung tâm vũ trụ của Trái Đất, Galileo hướng kính thiên văn lên bầu trời, và Isaac Newton thống nhất cơ học mặt đất với thiên thể qua định luật vạn vật hấp dẫn.",
        coreTakeawayEn: "Truth in science demands empirical observation and mathematical rigor, rejecting unquestioned dogma.",
        coreTakeawayVi: "Chân lý khoa học đòi hỏi quan sát thực nghiệm và tính chính xác toán học, dứt khoát từ chối giáo điều mù quáng.",
        relatedEntities: [
          { type: "idea", slug: "science", nameEn: "Science", nameVi: "Phương pháp Khoa học" }
        ],
        quiz: {
          questionEn: "What revolutionary cosmological model did Nicolaus Copernicus present in 1543?",
          questionVi: "Mô hình vũ trụ mang tính cách mạng nào được Nicolaus Copernicus công bố năm 1543?",
          optionsEn: [
            "Geocentric model (Earth at the center)",
            "Heliocentric model (Sun at the center of planetary orbits)",
            "Static infinite universe with no gravity",
            "Expanding universe powered by dark energy"
          ],
          optionsVi: [
            "Thuyết địa tâm (Trái Đất là trung tâm vũ trụ)",
            "Thuyết nhật tâm (Mặt Trời là trung tâm quỹ đạo các hành tinh)",
            "Vũ trụ tĩnh vô hạn không có lực hấp dẫn",
            "Vũ trụ giãn nở bởi năng lượng tối"
          ],
          correctIndex: 1,
          explanationEn: "Copernicus' 'De revolutionibus orbium coelestium' posited that planets revolve around the Sun, sparking the Scientific Revolution.",
          explanationVi: "Cuốn sách của Copernicus khẳng định các hành tinh quay quanh Mặt Trời, mở màn cho cuộc Cách mạng Khoa học hiện đại."
        }
      }
    ]
  },
  {
    id: "world-epics-and-literature",
    slug: "world-epics-and-literature",
    titleEn: "Voices of Immortality: Epics & Masterpieces of World Literature",
    titleVi: "Khúc ca Bất tử: Sử thi & Tuyệt tác Văn chương Nhân loại",
    category: "Literature",
    categoryVi: "Văn học & Sử thi",
    badgeEn: "Narrative Heritage",
    badgeVi: "Di sản Văn chương",
    descriptionEn: "Explore humanity's greatest foundational epics—from Gilgamesh's quest for eternal life to the Homeric Trojan battles, Indian cosmic duties, and Vietnamese epic folklore.",
    descriptionVi: "Khám phá những bản trường ca bất hủ—từ khát vọng bất tử của Gilgamesh, chiến trận thành Troy của Homer đến đại nghĩa luân hồi Ấn Độ và sử thi đại ngàn Việt Nam.",
    estimatedHours: 4,
    difficulty: "Intermediate",
    difficultyVi: "Trung cấp",
    iconName: "BookOpen",
    accentColor: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    steps: [
      {
        id: "epic-step-1",
        stepNumber: 1,
        titleEn: "The Quest Against Death: The Epic of Gilgamesh",
        titleVi: "Khát vọng Chiến thắng Cái chết: Sử thi Gilgamesh",
        epochEn: "c. 2100 – 1200 BCE",
        epochVi: "Khoảng 2100 – 1200 TCN",
        summaryEn: "King Gilgamesh of Uruk grieves the death of his beloved companion Enkidu, embarking on a perilous journey across the Waters of Death seeking immortality, only to learn true human legacy lies in what we build.",
        summaryVi: "Vua Gilgamesh thành Uruk đau đớn trước cái chết của người bạn Enkidu, dấn thân vượt qua Dòng nước Tử thần để tìm kiếm sự bất tử, cuối cùng nhận ra di sản đích thực là những điều ta xây đắp cho đời.",
        coreTakeawayEn: "Mortality is our shared human condition; our deeds, friendships, and creations endure beyond biological death.",
        coreTakeawayVi: "Cái chết là giới hạn tự nhiên của con người; sự bất tử thực sự nằm ở việc làm, tình bạn và di sản văn hóa ta để lại.",
        relatedEntities: [
          { type: "book", slug: "epic-of-gilgamesh", nameEn: "Epic of Gilgamesh", nameVi: "Sử thi Gilgamesh" },
          { type: "civilization", slug: "mesopotamia", nameEn: "Mesopotamia", nameVi: "Lưỡng Hà Cổ đại" }
        ],
        quiz: {
          questionEn: "What profound truth does Gilgamesh realize when he returns home to the great brick walls of Uruk?",
          questionVi: "Sự thật sâu sắc nào mà Gilgamesh nhận ra khi trở về chiêm ngưỡng những bức tường thành Uruk vĩ đại?",
          optionsEn: [
            "He must conquer the entire world by force",
            "Physical immortality is reserved for gods, but a mortal's enduring legacy is the city and culture built for posterity",
            "He should abandon his throne to become a hermit",
            "Gold is the only true source of kingly power"
          ],
          optionsVi: [
            "Nhà vua phải dùng vũ lực chinh phạt toàn bộ thế giới",
            "Sự bất tử thể xác chỉ thuộc về thần linh, nhưng di sản bất tử của con người là thành lũy và văn hóa để lại cho muôn đời",
            "Nhà vua nên từ bỏ ngai vàng để đi tu khổ hạnh",
            "Vàng bạc là nguồn gốc duy nhất của vương quyền"
          ],
          correctIndex: 1,
          explanationEn: "Gilgamesh accepts mortality and takes solace in the enduring majesty of Uruk's ramparts that will outlast him.",
          explanationVi: "Gilgamesh chấp nhận lẽ tử sinh và tìm thấy sự an ủi trong vẻ đẹp hùng vĩ của thành Uruk, di sản trường tồn vượt thời gian."
        }
      },
      {
        id: "epic-step-2",
        stepNumber: 2,
        titleEn: "The Rage of Achilles & The Odyssey of Home",
        titleVi: "Cơn thịnh nộ của Achilles & Trường ca Trở về Odyssey",
        epochEn: "c. 750 BCE",
        epochVi: "Khoảng 750 TCN",
        summaryEn: "Attributed to the blind bard Homer, the Iliad dissects the tragic glory and destructive rage of war, while the Odyssey chronicles a decade-long voyage testing wit, loyalty, and human resilience.",
        summaryVi: "Tương truyền của thi sĩ mù Homer, Iliad mổ xẻ sự bi tráng và cơn thịnh nộ tàn phá của chiến tranh, trong khi Odyssey là bản trường ca vượt biển thử thách trí tuệ, lòng chung thủy và ý chí kiên định.",
        coreTakeawayEn: "Heroism is defined not merely by battlefield fury, but by endurance, wisdom, and devotion to home and kinship.",
        coreTakeawayVi: "Khí phách anh hùng không chỉ đo bằng sự dũng mãnh nơi sa trường, mà còn ở đức kiên định, trí tuệ và sự gắn bó với quê hương gia đình.",
        relatedEntities: [
          { type: "book", slug: "iliad", nameEn: "Iliad", nameVi: "Sử thi Iliad" },
          { type: "book", slug: "odyssey", nameEn: "Odyssey", nameVi: "Sử thi Odyssey" },
          { type: "civilization", slug: "ancient-greece", nameEn: "Ancient Greece", nameVi: "Hy Lạp Cổ đại" }
        ],
        quiz: {
          questionEn: "What opening Greek word sets the theme for the entire 24 books of Homer's Iliad?",
          questionVi: "Từ ngữ tiếng Hy Lạp đầu tiên nào mở màn và làm chủ đề xuyên suốt 24 khúc ca của Sử thi Iliad?",
          optionsEn: [
            "Menin (The Wrath / Rage of Achilles)",
            "Thalassa (The Sea)",
            "Polis (The City)",
            "Nike (Victory)"
          ],
          optionsVi: [
            "Menin (Cơn thịnh nộ / Cuồng nộ của Achilles)",
            "Thalassa (Biển cả)",
            "Polis (Thành bang)",
            "Nike (Chiến thắng)"
          ],
          correctIndex: 0,
          explanationEn: "The Iliad begins: 'Sing, goddess, the anger of Peleus' son Achilles (Menin)', framing the tragic cost of unchecked pride.",
          explanationVi: "Iliad mở đầu bằng lời khẩn nguyện nữ thần hát về cơn thịnh nộ ('Menin') của dũng tướng Achilles và những mất mát bi thương."
        }
      },
      {
        id: "epic-step-3",
        stepNumber: 3,
        titleEn: "Epics of the Great Forest: Dam San & De Dat De Nuoc",
        titleVi: "Sử thi Đại ngàn & Đất Nước: Đăm Săn & Đẻ Đất Đẻ Nước",
        epochEn: "Oral Folklore & Indigenous Epic",
        epochVi: "Văn học Dân gian Truyền khẩu & Sử thi Bản địa",
        summaryEn: "In the central highlands of Vietnam, the Ede singing bard (Kha kei) performed Khan Dam San by the longhouse hearth, chanting the heroic chieftain's conquest of nature and sun goddess, echoing the Muong genesis epic.",
        summaryVi: "Tại buôn làng Tây Nguyên, nghệ nhân hát kể Khan Đăm Săn bên bếp lửa nhà dài, ca ngợi người tù trưởng dũng mãnh chinh phục thiên nhiên và bắt Nữ thần Mặt Trời, song hành cùng sử thi khai thiên lập địa Đẻ đất đẻ nước của người Mường.",
        coreTakeawayEn: "Indigenous oral epics embody humanity's untamed reverence for primeval forests, communal solidarity, and cosmic harmony.",
        coreTakeawayVi: "Sử thi bản địa phản ánh sự tôn kính nguyên sơ của con người trước rừng già, tinh thần cố kết cộng đồng và khát vọng chinh phục vũ trụ.",
        relatedEntities: [
          { type: "book", slug: "dam-san", nameEn: "Epic of Dam San", nameVi: "Sử thi Đăm Săn" },
          { type: "book", slug: "de-dat-de-nuoc", nameEn: "Birth of Soil and Water", nameVi: "Sử thi Đẻ Đất Đẻ Nước" },
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" }
        ],
        quiz: {
          questionEn: "In what traditional setting was the heroic Khan Dam San epic recited to the community?",
          questionVi: "Sử thi Đăm Săn (Khan Đăm Săn) theo truyền thống cổ xưa được diễn xướng trong không gian văn hóa nào?",
          optionsEn: [
            "Inside deep underground caves during winter",
            "Inside the communal longhouse beside the glowing hearth through the night",
            "Exclusively in royal palace banquets",
            "Silently read by scholars in monastic libraries"
          ],
          optionsVi: [
            "Trong hang đá ngầm sâu vào mùa đông",
            "Bên bếp lửa bập bùng thâu đêm trong ngôi nhà dài của buôn làng",
            "Chỉ diễn xướng trong yến tiệc hoàng cung",
            "Đọc thầm bởi các học giả trong thư viện tu viện"
          ],
          correctIndex: 1,
          explanationEn: "Khan epics are communal oral performances chanted by master bards across nights inside traditional Ede longhouses.",
          explanationVi: "Khan là hình thức diễn xướng truyền khẩu cộng đồng của nghệ nhân hát kể thâu đêm bên bếp lửa nhà dài Tây Nguyên."
        }
      },
      {
        id: "epic-step-4",
        stepNumber: 4,
        titleEn: "The Soul of Dai Viet: The Tale of Kieu",
        titleVi: "Hồn cốt Đại Việt: Tuyệt tác Đoạn Trường Tân Thanh (Truyện Kiều)",
        epochEn: "Early 19th Century CE",
        epochVi: "Đầu thế kỷ XIX",
        summaryEn: "Penned in luc-bat verse by Great Poet Nguyen Du, The Tale of Kieu chronicles Thúy Kiều's fifteen years of tribulation, merging profound Buddhist karma, Confucian filial piety, and compassionate humanism.",
        summaryVi: "Viết bằng thể thơ lục bát của Đại thi hào Nguyễn Du, Truyện Kiều ghi lại 15 năm lưu lạc truân chuyên của nàng Thúy Kiều, kết tinh triết lý nhân quả Phật giáo, đạo hiếu và chủ nghĩa nhân đạo sâu sắc.",
        coreTakeawayEn: "Nguyen Du elevated Vietnamese vernacular language into supreme poetic art, weeping for human suffering across all ages.",
        coreTakeawayVi: "Nguyễn Du đã nâng tiếng Việt dân tộc lên đỉnh cao nghệ thuật thi ca, cất tiếng khóc thương cho thân phận con người muôn đời.",
        relatedEntities: [
          { type: "book", slug: "truyen-kieu", nameEn: "The Tale of Kieu", nameVi: "Truyện Kiều" },
          { type: "person", slug: "nguyen-du", nameEn: "Nguyen Du", nameVi: "Đại thi hào Nguyễn Du" },
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" }
        ],
        quiz: {
          questionEn: "What traditional Vietnamese poetic meter is employed throughout the 3,254 verses of The Tale of Kieu?",
          questionVi: "Thể thơ dân tộc truyền thống nào được sử dụng xuyên suốt 3.254 câu thơ của Truyện Kiều?",
          optionsEn: [
            "Seven-character regulated verse (Thất ngôn bát cú)",
            "Luc-bat meter (Alternating 6-8 syllable rhymed couplets)",
            "Song that luc bat (Double seven six eight)",
            "Free blank verse"
          ],
          optionsVi: [
            "Thất ngôn bát cú Đường luật",
            "Thể thơ Lục bát (Cặp câu sáu chữ - tám chữ gieo vần truyền thống)",
            "Song thất lục bát",
            "Thơ tự do không vần"
          ],
          correctIndex: 1,
          explanationEn: "Nguyen Du mastered the indigenous Vietnamese Luc-Bat (6-8) verse, creating an unmatched musicality in world literature.",
          explanationVi: "Nguyễn Du đã đưa thể thơ Lục bát truyền thống của người Việt lên đỉnh cao âm hưởng nhạc điệu và biểu cảm tư tưởng."
        }
      }
    ]
  },
  {
    id: "vietnam-civilization-heritage",
    slug: "vietnam-civilization-heritage",
    titleEn: "Vietnamese Civilization: Bronze Drums, Independence & Resilient Identity",
    titleVi: "Văn minh Việt Nam: Trống đồng Đông Sơn, Độc lập & Sức sống Bất diệt",
    category: "Regional",
    categoryVi: "Di sản Bản địa",
    badgeEn: "National Heritage",
    badgeVi: "Di sản Dân tộc",
    descriptionEn: "Follow the 4,000-year continuity of Vietnamese civilization from the metallurgy of Dong Son bronze drums through thousand-year resistance, Ly-Tran Renaissance, and modern resurgence.",
    descriptionVi: "Dõi theo dòng chảy 4.000 năm lịch sử văn minh Việt Nam từ nghệ thuật đúc đồng Đông Sơn qua ngàn năm dựng nước giữ nước, thời kỳ Lý - Trần rực rỡ đến kỷ nguyên hiện đại.",
    estimatedHours: 4,
    difficulty: "Beginner",
    difficultyVi: "Nhập môn",
    iconName: "Landmark",
    accentColor: "from-red-500/20 to-amber-500/20 border-red-500/30 text-red-400",
    steps: [
      {
        id: "vn-step-1",
        stepNumber: 1,
        titleEn: "The Dawn of Dong Son & The Sacred Bronze Drum",
        titleVi: "Bình minh Đông Sơn & Tiếng vang Trống đồng Ngọc Lũ",
        epochEn: "c. 1000 BCE – 1st Century CE",
        epochVi: "Khoảng 1000 TCN – Thế kỷ I SCN",
        summaryEn: "On the banks of the Red River, the Dong Son metallurgical culture forged magnificent bronze drums depicting sacred sunstars, circling cranes, boat races, and village agricultural rituals.",
        summaryVi: "Bên bờ sông Hồng, cư dân văn hóa Đông Sơn đã đúc nên những chiếc trống đồng tuyệt mỹ chạm khắc ngôi sao mặt trời, chim hạc bay lượn, cảnh đua thuyền và lễ hội mùa màng.",
        coreTakeawayEn: "The bronze drum served not only as a musical instrument, but as a sacred cosmic symbol of communal unity and sovereign authority.",
        coreTakeawayVi: "Trống đồng không chỉ là nhạc khí, mà còn là biểu tượng quyền uy, tâm linh vũ trụ và sự cố kết thiêng liêng của cộng đồng Việt cổ.",
        relatedEntities: [
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" },
          { type: "artifact", slug: "ngoc-lu-bronze-drum", nameEn: "Ngọc Lũ Bronze Drum", nameVi: "Trống đồng Ngọc Lũ" }
        ],
        quiz: {
          questionEn: "What central emblem is cast at the very center of the tympanum of the Ngọc Lũ bronze drum?",
          questionVi: "Hình tượng trung tâm nào được đúc nổi bật ngay chính giữa mặt Trống đồng Ngọc Lũ?",
          optionsEn: [
            "A roaring tiger",
            "A radiant multi-pointed sunstar (14-pointed star) symbolizing life-giving cosmic light",
            "A royal dragon coiling in clouds",
            "A sailing ship carrying warriors"
          ],
          optionsVi: [
            "Hình tượng con hổ gầm vang",
            "Ngôi sao mặt trời nhiều cánh (14 cánh) tỏa ánh sáng nuôi dưỡng sự sống",
            "Rồng cuộn trong mây",
            "Chiếc thuyền buồm chở các chiến binh"
          ],
          correctIndex: 1,
          explanationEn: "The 14-pointed sunburst at the center reflects ancient solar worship and the vital agrarian cycles of wet-rice civilization.",
          explanationVi: "Ngôi sao 14 cánh giữa tâm trống phản ánh tín ngưỡng sùng bái mặt trời và chu kỳ nông nghiệp của cư dân lúa nước."
        }
      },
      {
        id: "vn-step-2",
        stepNumber: 2,
        titleEn: "The Binh Ngo Dai Cao: Charter of Humaneness and Sovereignty",
        titleVi: "Bình Ngô Đại Cáo: Bản Tuyên ngôn Nhân nghĩa & Độc lập",
        epochEn: "1428 CE",
        epochVi: "Năm 1428",
        summaryEn: "Following the ten-year Lam Son uprising against the Ming occupiers, scholar-statesman Nguyen Trai penned the monumental Binh Ngo Dai Cao, declaring national independence grounded in righteous benevolence.",
        summaryVi: "Sau mười năm khởi nghĩa Lam Sơn toàn thắng quét sạch quân Minh xâm lược, Nguyễn Trãi đã soạn thảo áng thiên cổ hùng văn Bình Ngô đại cáo, khẳng định nền độc lập tự chủ trên nền tảng nhân nghĩa.",
        coreTakeawayEn: "'The essence of humaneness lies in bringing peace to the people'—sovereignty in Vietnamese philosophy is validated by safeguarding the welfare of ordinary citizens.",
        coreTakeawayVi: "'Việc nhân nghĩa cốt ở yên dân'—tính chính danh của chủ quyền quốc gia trong tư tưởng Việt Nam bắt nguồn từ việc chăm lo an lạc cho nhân dân.",
        relatedEntities: [
          { type: "person", slug: "nguyen-trai", nameEn: "Nguyen Trai", nameVi: "Anh hùng Dân tộc Nguyễn Trãi" },
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" }
        ],
        quiz: {
          questionEn: "What foundational principle opens Nguyen Trai's historic 'Binh Ngo Dai Cao'?",
          questionVi: "Nguyên lý tư tưởng cốt lõi nào mở đầu áng văn thiên cổ 'Bình Ngô đại cáo' của Nguyễn Trãi?",
          optionsEn: [
            "Military revenge against the enemy",
            "Righteousness and humaneness consist in securing peace for the people (Việc nhân nghĩa cốt ở yên dân)",
            "Acquiring vast empire colonies abroad",
            "Establishing rigid caste separations"
          ],
          optionsVi: [
            "Báo thù quân sự đối với kẻ địch",
            "Việc nhân nghĩa cốt ở yên dân, quân điếu phạt trước lo trừ bạo",
            "Mở rộng đất đai thuộc địa ra hải ngoại",
            "Thiết lập chế độ phân biệt đẳng cấp nghiêm ngặt"
          ],
          correctIndex: 1,
          explanationEn: "Nguyen Trai boldly placed the humanitarian welfare of the people ('Yên dân') as the moral core of the state's military resistance.",
          explanationVi: "Nguyễn Trãi khẳng định mục đích tối thượng của cuộc chiến giữ nước là đem lại cuộc sống yên bình cho nhân dân ('yên dân')."
        }
      },
      {
        id: "vn-step-3",
        stepNumber: 3,
        titleEn: "The Declaration of 1945: Rebirth of an Independent Nation",
        titleVi: "Tuyên ngôn Độc lập 1945: Khúc ca Tái sinh của Dân tộc",
        epochEn: "September 2, 1945",
        epochVi: "Ngày 2 tháng 9 năm 1945",
        summaryEn: "At Ba Dinh Square in Hanoi, President Ho Chi Minh proclaimed the Declaration of Independence, linking the Vietnamese struggle directly to universal human rights from the American and French Revolutions.",
        summaryVi: "Tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, gắn liền cuộc đấu tranh giải phóng dân tộc Việt Nam với các quyền con người phổ quát của các cuộc cách mạng thế giới.",
        coreTakeawayEn: "All peoples on earth are born equal; every nation possesses the inviolable right to life, freedom, and the pursuit of happiness.",
        coreTakeawayVi: "Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng; dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.",
        relatedEntities: [
          { type: "person", slug: "ho-chi-minh", nameEn: "Ho Chi Minh", nameVi: "Chủ tịch Hồ Chí Minh" },
          { type: "civilization", slug: "vietnam", nameEn: "Vietnam", nameVi: "Văn minh Việt Nam" }
        ],
        quiz: {
          questionEn: "Which two historic declarations did President Ho Chi Minh quote in the opening lines of the 1945 Declaration of Independence?",
          questionVi: "Hai bản tuyên ngôn lịch sử thế giới nào được Chủ tịch Hồ Chí Minh trích dẫn mở đầu bản Tuyên ngôn Độc lập năm 1945?",
          optionsEn: [
            "Magna Carta and the Treaty of Westphalia",
            "The 1776 American Declaration of Independence and the 1791 French Declaration of the Rights of Man",
            "The Code of Hammurabi and Justinian Code",
            "The Communist Manifesto and Das Kapital"
          ],
          optionsVi: [
            "Đại Hiến chương Magna Carta và Hòa ước Westphalia",
            "Tuyên ngôn Độc lập Mỹ năm 1776 và Tuyên ngôn Nhân quyền và Dân quyền Pháp năm 1791",
            "Bộ luật Hammurabi và Bộ luật Justinian",
            "Tuyên ngôn Đảng Cộng sản và Tư bản luận"
          ],
          correctIndex: 1,
          explanationEn: "By quoting the American and French declarations, he established the universal moral legitimacy of Vietnam's national liberation.",
          explanationVi: "Bằng việc trích dẫn tuyên ngôn của Mỹ và Pháp, Người đã khẳng định quyền độc lập tự do thiêng liêng của dân tộc Việt Nam dựa trên lẽ phải phổ quát của nhân loại."
        }
      }
    ]
  }
];

export function getLearningTrack(slug: string): LearningTrack | undefined {
  return LEARNING_TRACKS.find((track) => track.slug === slug);
}
