export interface IdeaTranslation {
  slug: string;
  titleVi: string;
  categoryVi: string;
  summaryVi: string;
  contentVi?: string;
}

export const ideaTranslations: Record<string, IdeaTranslation> = {
  "democracy": {
    slug: "democracy",
    titleVi: "Dân chủ",
    categoryVi: "Chính trị",
    summaryVi: "Hệ thống quản trị trong đó quyền lực chính trị tối cao thuộc về nhân dân, khởi nguồn dưới hình thức dân chủ trực tiếp tại Athens cổ đại thời Cleisthenes và Pericles.",
    contentVi: "Dân chủ (từ tiếng Hy Lạp 'demokratia' - nhân dân cai trị) là một trong những di sản chính trị vĩ đại nhất của Hy Lạp cổ đại. Khác với chế độ quân chủ hay thiểu số quý tộc, mô hình Athens trao quyền biểu quyết trực tiếp cho công dân nam tự do tại Đại hội nhân dân (Ecclesia) và Hội đồng 500 (Boule), tạo tiền đề cho các nền dân chủ đại nghị hiện đại."
  },
  "rule-of-law": {
    slug: "rule-of-law",
    titleVi: "Nhà nước pháp quyền",
    categoryVi: "Pháp luật",
    summaryVi: "Nguyên tắc quản trị tối cao xác định mọi công dân, định chế và nhà nước đều phải phục tùng pháp luật được công bố công khai, bình đẳng và tài phán độc lập.",
    contentVi: "Nguyên tắc pháp quyền khẳng định quyền lực chính trị không được thực thi một cách độc đoán, mà phải dựa trên khung pháp lý minh bạch và phổ quát. Từ các tư tưởng cổ đại của Aristotle, qua Đại Hiến chương Magna Carta (1215) đến các bản hiến pháp hiện đại, pháp quyền là nền tảng bảo vệ tự do cá nhân và trật tự xã hội văn minh."
  },
  "republic": {
    slug: "republic",
    titleVi: "Chính thể cộng hòa",
    categoryVi: "Chính trị",
    summaryVi: "Hình thức nhà nước trong đó nguyên thủ quốc gia không phải là vua cha truyền con nối mà được bầu cử theo nhiệm kỳ, quyền lực thuộc về công dân và đại diện của họ.",
    contentVi: "Bắt nguồn từ khái niệm 'res publica' (việc chung của công chúng) thời La Mã Cổ đại, chính thể cộng hòa phân chia quyền lực nhằm ngăn chặn sự chuyên chế. Mô hình này thiết lập các cơ quan đối trọng như Viện Nguyên lão, các pháp quan và đại hội nhân dân, truyền cảm hứng trực tiếp cho hệ thống tam quyền phân lập thời Khai sáng."
  },
  "socratic-method": {
    slug: "socratic-method",
    titleVi: "Phương pháp đối thoại Socrates",
    categoryVi: "Triết học",
    summaryVi: "Phương pháp đối thoại biện chứng bằng cách đặt câu hỏi liên tục để khơi mở tư duy phê phán, bộc lộ mâu thuẫn và tiếp cận chân lý bản chất.",
    contentVi: "Phương pháp Socrates (elenchus) là phương pháp giáo dục và triết học mang tính cách mạng: người thầy không truyền đạt thụ động giáo điều mà đóng vai trò 'bà đỡ tinh thần' (maieutics), dẫn dắt người đối thoại tự nhận thức giới hạn tri thức và làm sáng tỏ các khái niệm đạo đức như công lý, lòng can đảm và trí tuệ."
  },
  "platonism": {
    slug: "platonism",
    titleVi: "Thuyết ý niệm Plato",
    categoryVi: "Triết học",
    summaryVi: "Hệ thống triết học khẳng định thế giới vật chất cảm tính chỉ là cái bóng bất toàn của Thế giới Ý niệm (Forms/Ideas) hoàn hảo, phi vật chất và bất biến.",
    contentVi: "Thông qua ẩn dụ hang động trứ danh, Plato phân biệt giữa thế giới hữu hình đầy ảo ảnh và thế giới thực tại tối hậu của các Ý niệm vĩnh cửu. Học thuyết này định hình sâu sắc nền siêu hình học phương Tây, triết học Kitô giáo thời Trung cổ và chủ nghĩa duy tâm triết học."
  },
  "aristotelian-logic": {
    slug: "aristotelian-logic",
    titleVi: "Logic học hình thức Aristotle",
    categoryVi: "Triết học",
    summaryVi: "Hệ thống logic học hình thức đầu tiên trong lịch sử, đặt nền móng với phép tam đoạn luận (syllogism) và các quy luật tư duy suy diễn chặt chẽ.",
    contentVi: "Được đúc kết trong bộ tác phẩm Organon, Aristotle đã hệ thống hóa các phạm trù, tiền đề và phương thức suy luận hợp lệ. Suốt hơn hai thiên niên kỷ, logic học Aristotle là tiêu chuẩn vàng của tư duy học thuật và lập luận khoa học phương Tây cũng như thế giới Hồi giáo."
  },
  "stoicism": {
    slug: "stoicism",
    titleVi: "Chủ nghĩa Khắc kỷ",
    categoryVi: "Triết học",
    summaryVi: "Trường phái triết học Hy Lạp - La Mã chủ trương làm chủ cảm xúc cá nhân, sống thuận theo Tự nhiên và hành động theo lý trí kiên định cùng đức hạnh tối cao.",
    contentVi: "Khởi xướng bởi Zeno xứ Citium và phát triển rực rỡ bởi Seneca, Epictetus và Hoàng đế Marcus Aurelius, Chủ nghĩa Khắc kỷ dạy con người phân biệt rạch ròi giữa những điều nằm trong tầm kiểm soát của mình (ý chí, phẩm hạnh) và những điều ngoài tầm kiểm soát (vận mệnh, ngoại cảnh), tìm thấy sự an định nội tâm (ataraxia)."
  },
  "roman-law": {
    slug: "roman-law",
    titleVi: "Hệ thống luật La Mã",
    categoryVi: "Pháp luật",
    summaryVi: "Hệ thống pháp lý đồ sộ và tinh vi của La Mã Cổ đại, trở thành nền tảng cốt lõi của truyền thống Dân luật (Civil Law) trên khắp thế giới hiện đại.",
    contentVi: "Bắt đầu từ Luật Mười Hai Bảng (450 TCN) đến bộ Dân luật Pháp điển Corpus Juris Civilis của Justinian I, Luật La Mã đã sáng tạo ra các khái niệm pháp lý nền tảng: quyền sở hữu tài sản, hợp đồng thương mại, pháp nhân, nghĩa vụ dân sự và nguyên tắc suy đoán vô tội."
  },
  "citizenship": {
    slug: "citizenship",
    titleVi: "Khái niệm quyền công dân",
    categoryVi: "Chính trị",
    summaryVi: "Địa vị pháp lý và chính trị gắn kết cá nhân với nhà nước, bao gồm nghĩa vụ cống hiến và các quyền lợi dân sự, chính trị được pháp luật bảo hộ.",
    contentVi: "Phát triển từ quy chế công dân polis Hy Lạp và civitas La Mã, quyền công dân chuyển hóa thần dân phục tùng mệnh lệnh vương quyền thành những chủ thể chính trị chủ động có quyền bình đẳng trước pháp luật, quyền bỏ phiếu và quyền được xét xử công minh."
  },
  "ma-at": {
    slug: "ma-at",
    titleVi: "Nguyên lý Ma'at",
    categoryVi: "Văn hóa & Xã hội",
    summaryVi: "Khái niệm cổ Ai Cập về chân lý, trật tự vũ trụ, sự hài hòa, công lý và đạo đức chuẩn mực, chi phối cả quy luật tự nhiên và trách nhiệm của Pharaoh.",
    contentVi: "Ma'at vừa là một nữ thần nhân cách hóa chân lý vừa là nền tảng vũ trụ luận và luân lý của Ai Cập Cổ đại. Mọi Pharaoh có bổn phận thiêng liêng là duy trì Ma'at, đẩy lùi Isfet (hỗn loạn, bất công); trong phán xét sau khi chết, trái tim người quá cố được đặt lên bàn cân cùng chiếc lông vũ của Ma'at."
  },
  "cuneiform-writing": {
    slug: "cuneiform-writing",
    titleVi: "Chữ viết hình nêm",
    categoryVi: "Văn hóa & Xã hội",
    summaryVi: "Một trong những hệ thống chữ viết sớm nhất của nhân loại, do người Sumer phát minh tại Lưỡng Hà, khắc trên đất sét bằng bút sậy nhọn.",
    contentVi: "Khởi đầu từ các ký hiệu tượng hình ghi chép kho lúa và giao dịch thuế má tại Uruk khoảng 3400 TCN, chữ hình nêm đã phát triển thành hệ thống ngữ âm - biểu ý hoàn chỉnh, ghi lại các luật lệ, sử thi, thư từ ngoại giao và nghiên cứu thiên văn của nhiều nền văn minh Cận Đông suốt 3000 năm."
  },
  "scientific-method": {
    slug: "scientific-method",
    titleVi: "Phương pháp luận khoa học",
    categoryVi: "Khoa học",
    summaryVi: "Quy trình khảo cứu tri thức thực nghiệm dựa trên quan sát hệ thống, đo lường, đặt giả thuyết, kiểm chứng thực nghiệm và suy luận lặp lại.",
    contentVi: "Được định hình qua nhiều thế kỷ nhờ công lao của Ibn al-Haytham (Alhazen), Francis Bacon, Galileo Galilei và Isaac Newton, phương pháp khoa học đã giải phóng nhân loại khỏi chủ nghĩa kinh viện giáo điều, mở đường cho cuộc Cách mạng Khoa học và sự bùng nổ công nghệ hiện đại."
  },
  "monotheism": {
    slug: "monotheism",
    titleVi: "Nhất thần giáo",
    categoryVi: "Tôn giáo",
    summaryVi: "Niềm tin vào sự tồn tại của duy nhất một Thiên Chúa/Đấng Sáng thế tối cao, nguồn gốc đạo đức và trật tự toàn vũ trụ.",
    contentVi: "Khác biệt sâu sắc với đa thần giáo cổ đại, Nhất thần giáo (tiêu biểu qua Do Thái giáo, Kitô giáo và Hồi giáo, cùng các dấu ấn sớm như Zoroastrianism và cải cách Atenism của Akhenaten) đã tái định hình khái niệm đạo đức phổ quát, thời gian lịch sử tuyến tính và bản sắc văn hóa nhân loại."
  },
  "confucianism": {
    slug: "confucianism",
    titleVi: "Nho giáo (Khổng giáo)",
    categoryVi: "Triết học",
    summaryVi: "Hệ thống triết lý đạo đức, chính trị và xã hội do Khổng Tử sáng lập, nhấn mạnh tu thân, luân thường đạo lý (Nhân, Nghĩa, Lễ, Trí, Tín) và trật tự gia đình - xã hội.",
    contentVi: "Nho giáo xem đạo làm người bắt đầu từ lòng hiếu đễ trong gia đình, mở rộng ra bổn phận trung quân ái quốc và lý tưởng thái bình thịnh trị. Hệ thống kinh điển Tứ Thư Ngũ Kinh và chế độ khoa cử Nho học đã trở thành rường cột tư tưởng văn hóa Đông Á suốt hơn hai ngàn năm."
  },
  "buddhism": {
    slug: "buddhism",
    titleVi: "Phật giáo",
    categoryVi: "Tôn giáo",
    summaryVi: "Hệ thống triết học tâm linh do Thích Ca Mâu Ni khởi xướng tại Ấn Độ Cổ đại, hướng đến diệt khổ, thức tỉnh trí tuệ và đạt đến Niết-bàn giải thoát.",
    contentVi: "Dựa trên Tứ Diệu Đế và Bát Chính Đạo, Phật giáo khước từ hệ thống đẳng cấp khắt khe, chỉ ra bản chất duyên sinh vô ngã vô thường của vạn pháp và đề cao lòng từ bi hỷ xả. Phật giáo lan tỏa khắp châu Á qua hai truyền thống lớn Nguyên thủy (Theravada) và Đại thừa (Mahayana)."
  },
  "human-rights": {
    slug: "human-rights",
    titleVi: "Quyền con người phổ quát",
    categoryVi: "Chính trị",
    summaryVi: "Các quyền tự nhiên và cơ bản vốn có của mọi cá nhân bất kể chủng tộc, giới tính, quốc tịch hay tôn giáo, được hiến chương quốc tế công nhận.",
    contentVi: "Từ Tuyên ngôn Nhân quyền Cyrus Cổ đại, qua Tuyên ngôn Độc lập Hoa Kỳ (1776), Tuyên ngôn Nhân quyền và Dân quyền Pháp (1789) đến Tuyên ngôn Quốc tế Nhân quyền LHQ (1948), tư tưởng quyền con người khẳng định phẩm giá thiêng liêng và quyền tự do bất khả xâm phạm của mỗi người."
  },
  "constitutionalism": {
    slug: "constitutionalism",
    titleVi: "Chủ nghĩa hợp hiến",
    categoryVi: "Pháp luật",
    summaryVi: "Học thuyết chính trị khẳng định quyền lực của chính quyền phải bị giới hạn bởi một đạo luật tối cao (Hiến pháp) nhằm bảo vệ quyền tự do của công dân.",
    contentVi: "Chủ nghĩa hợp hiến thiết lập cơ chế kiểm soát và đối trọng (checks and balances), bảo đảm chính quyền không thể lạm quyền độc đoán, đồng thời bảo đảm tính tối thượng của các điều khoản hiến định trước mọi luật thứ cấp và quyết định hành pháp."
  },
  "capitalism": {
    slug: "capitalism",
    titleVi: "Chủ nghĩa tư bản",
    categoryVi: "Kinh tế học",
    summaryVi: "Hệ thống kinh tế dựa trên quyền sở hữu tư nhân đối với tư liệu sản xuất, tự do cạnh tranh, phân bổ nguồn lực qua cơ chế thị trường và mục tiêu lợi nhuận.",
    contentVi: "Được Adam Smith phân tích hệ thống trong tác phẩm 'Của cải của các dân tộc' (1776) với nguyên lý 'bàn tay vô hình', chủ nghĩa tư bản đã kích thích động lực đổi mới kỹ thuật, tích lũy vốn và thương mại toàn cầu hóa với quy mô chưa từng có trong lịch sử."
  },
  "evolution": {
    slug: "evolution",
    titleVi: "Thuyết tiến hóa sinh học",
    categoryVi: "Khoa học",
    summaryVi: "Học thuyết khoa học do Charles Darwin phát triển, chứng minh sinh giới biến đổi qua các thế hệ thông qua cơ chế chọn lọc tự nhiên và biến dị di truyền.",
    contentVi: "Học thuyết tiến hóa đã cách mạng hóa toàn bộ ngành sinh học và nhận thức luận về vị thế của con người trong thế giới tự nhiên. Mọi sinh vật trên Trái Đất cùng chung một cội nguồn phả hệ tiến hóa, thích nghi với sinh cảnh thông qua áp lực chọn lọc sinh tồn."
  },
  "artificial-intelligence": {
    slug: "artificial-intelligence",
    titleVi: "Trí tuệ nhân tạo (AI)",
    categoryVi: "Công nghệ",
    summaryVi: "Lĩnh vực khoa học máy tính chuyên nghiên cứu và chế tạo các hệ thống có khả năng thực hiện những nhiệm vụ đòi hỏi trí thông minh của con người.",
    contentVi: "Khởi xướng bởi Alan Turing, John McCarthy và các nhà tiên phong giữa thế kỷ 20, AI đã tiến hóa từ các hệ chuyên gia dựa trên luật sang học máy (machine learning), học sâu (deep learning) và các mô hình ngôn ngữ lớn nền tảng, định hình lại văn minh thế kỷ 21."
  },
  "ren-and-li": {
    slug: "ren-and-li",
    titleVi: "Tư tưởng Nhân và Lễ",
    categoryVi: "Triết học",
    summaryVi: "Cặp phạm trù cốt lõi trong đạo đức Nho gia: 'Nhân' là tình thương yêu và lòng trắc ẩn nội tâm; 'Lễ' là quy phạm hành vi và trật tự nghi thức xã hội.",
    contentVi: "Khổng Tử dạy 'Khắc kỷ phục lễ vi nhân'. Nhân biểu hiện cái gốc lương thiện và lòng trắc ẩn từ bên trong tâm hồn, còn Lễ là chuẩn mực văn hóa giúp biểu hiện lòng Nhân một cách đúng mực và trật tự, tạo nên một xã hội an bình và có giáo dưỡng."
  },
  "tao-and-wu-wei": {
    slug: "tao-and-wu-wei",
    titleVi: "Đạo và Vô vi",
    categoryVi: "Triết học",
    summaryVi: "Tư tưởng triết lý Lão giáo: 'Đạo' là nguyên lý vũ trụ sinh dưỡng vạn vật; 'Vô vi' là hành động thuận theo tự nhiên, không gượng ép nhân tạo.",
    contentVi: "Lão Tử trong Đạo Đức Kinh chỉ ra rằng Đạo vô hình vô tướng nhưng vận hành mọi sự. Người trị quốc và tu thân theo nguyên lý Vô vi là không dùng quyền mưu bức bách, không làm đảo lộn trật tự tự nhiên, nhờ đó 'vô vi nhi vô bất vi' (không làm gì mà không gì không thành)."
  },
  "legalism": {
    slug: "legalism",
    titleVi: "Pháp gia",
    categoryVi: "Triết học",
    summaryVi: "Trường phái chính trị cổ Trung Hoa đề cao quản trị quốc gia bằng pháp luật nghiêm minh, thưởng phạt phân minh và tập trung quyền lực tuyệt đối vào quân vương.",
    contentVi: "Phát triển qua Thương Ưởng, Thân Bất Hại và đạt đỉnh cao lý luận với Hàn Phi Tử, Pháp gia chủ trương 'Dĩ pháp vi giáo, dĩ lại vi sư'. Trường phái này bác bỏ đức trị duy cảm tính, tập trung xây dựng nền hành chính kỷ cương và sức mạnh quân sự - kinh tế vượt bậc."
  },
  "mandate-of-heaven": {
    slug: "mandate-of-heaven",
    titleVi: "Thiên mệnh (Ý trời)",
    categoryVi: "Chính trị",
    summaryVi: "Học thuyết chính trị cổ Trung Hoa xác nhận tính chính danh của người cai trị được ban bởi Thiên mệnh, nhưng có thể bị tước đoạt nếu mất đức trị.",
    contentVi: "Khởi lập từ thời nhà Chu để biện minh cho việc lật đổ nhà Thương bạo ngược, Thiên mệnh gắn quyền lực chính trị với trách nhiệm đạo đức phụng sự nhân dân. Khi quân vương tha hóa áp bức, trời sẽ giáng điềm báo và nhân dân có quyền khởi nghĩa thay đổi triều đại."
  },
  "four-noble-truths": {
    slug: "four-noble-truths",
    titleVi: "Tứ Diệu Đế",
    categoryVi: "Tôn giáo",
    summaryVi: "Bốn chân lý tối thượng của Phật giáo: Khổ đế (thực tại đau khổ), Tập đế (nguyên nhân của khổ là tham ái), Diệt đế (sự chấm dứt khổ đau) và Đạo đế (con đường Bát Chính Đạo dẫn đến giải thoát).",
    contentVi: "Bài giảng đầu tiên của Đức Phật tại Vườn Lộc Uyển thiết lập khung nhận thức chẩn trị tâm linh hoàn hảo: nhận diện bệnh khổ, phân tích căn nguyên nội tâm, xác nhận khả năng chữa lành hoàn toàn (Niết-bàn) và phác thảo lộ trình tu dưỡng thực tiễn."
  },
  "karma-and-samsara": {
    slug: "karma-and-samsara",
    titleVi: "Nghiệp và Luân hồi",
    categoryVi: "Tôn giáo",
    summaryVi: "Các khái niệm triết học - tâm linh nền tảng của Ấn Độ giáo và Phật giáo về luật nhân quả đạo đức xuyên suốt các kiếp tái sinh không ngừng nghỉ.",
    contentVi: "Nghiệp (Karma) khẳng định mọi ý nghĩ, lời nói và hành động có chủ ý đều tạo ra năng lượng nhân quả chi phối cảnh giới tái sinh trong vòng Luân hồi (Samsara). Sự giác ngộ và đoạn trừ vô minh là chìa khóa duy nhất để giải thoát khỏi vòng luân chuyển này."
  },
  "ahimsa": {
    slug: "ahimsa",
    titleVi: "Bất hại (Ahimsa)",
    categoryVi: "Triết học",
    summaryVi: "Nguyên tắc đạo đức cốt lõi trong triết học Ấn Độ cổ đại về lòng bất bạo động, tôn trọng và bảo vệ sự sống của mọi chúng sinh.",
    contentVi: "Được đề cao tuyệt đối trong Kỳ Na giáo (Jainism), Phật giáo và Ấn Độ giáo, Ahimsa không chỉ là không sát sinh mà còn là tâm từ bi chủ động. Trong thời hiện đại, Mahatma Gandhi đã vận dụng Ahimsa thành vũ khí đấu tranh chính trị bất bạo động lừng lẫy thế giới."
  },
  "dharma": {
    slug: "dharma",
    titleVi: "Pháp (Dharma)",
    categoryVi: "Triết học",
    summaryVi: "Khái niệm đa tầng trong tư tưởng triết học Ấn Độ biểu thị trật tự vũ trụ thiêng liêng, chân lý phổ quát, luật tự nhiên và bổn phận đạo đức của mỗi cá nhân.",
    contentVi: "Trong truyền thống Vệ Đà và Ấn Độ giáo, Dharma là nghĩa vụ xã hội và tôn giáo gắn với từng giai đoạn đời người (ashrama); trong Phật giáo, Dharma là Giáo pháp chân lý do Đức Phật chỉ dạy để thấu suốt bản chất vạn vật."
  },
  "tam-giao-dong-nguyen": {
    slug: "tam-giao-dong-nguyen",
    titleVi: "Tam giáo đồng nguyên",
    categoryVi: "Triết học",
    summaryVi: "Tư tưởng hòa hợp triết lý đặc trưng của văn minh Việt Nam và Đông Á, kết hợp hài hòa giữa Nho giáo, Phật giáo và Đạo giáo trong đời sống văn hóa và trị quốc.",
    contentVi: "Dưới các triều đại Lý - Trần tại Đại Việt, Tam giáo đồng nguyên đạt đến độ chín muồi rực rỡ: Nho giáo giúp tổ chức nhà nước kỷ cương, Phật giáo bồi đắp tâm thức từ bi và đời sống tâm linh giải thoát, Đạo giáo mang lại thái độ an nhiên hòa đồng cùng thiên nhiên."
  },
  "national-sovereignty-identity": {
    slug: "national-sovereignty-identity",
    titleVi: "Ý thức chủ quyền và bản sắc dân tộc Đại Việt",
    categoryVi: "Chính trị",
    summaryVi: "Hệ thống tư tưởng chính trị và văn hóa khẳng định tư cách độc lập bình đẳng, biên cương cương vực riêng biệt và chiều sâu văn hiến của dân tộc Việt Nam.",
    contentVi: "Được kết tinh qua các áng thiên cổ hùng văn như 'Nam quốc sơn hà' thời Lý và 'Bình Ngô đại cáo' của Nguyễn Trãi thời Hậu Lê, tư tưởng này khẳng định nước Nam độc lập 'núi sông bờ cõi đã chia, phong tục Bắc Nam cũng khác', là rường cột dựng nước và giữ nước ngàn năm."
  },
  "zoroastrian-cosmic-dualism": {
    slug: "zoroastrian-cosmic-dualism",
    titleVi: "Thuyết nhị nguyên vũ trụ Zoroaster",
    categoryVi: "Tôn giáo",
    summaryVi: "Thế giới quan tôn giáo Ba Tư cổ đại về cuộc chiến vũ trụ không khoan nhượng giữa Thần Ánh sáng Thiện hảo (Ahura Mazda) và Thần Bóng tối Hủy diệt (Angra Mainyu).",
    contentVi: "Học thuyết của nhà tiên tri Zarathustra trao cho con người tự do ý chí và nghĩa vụ đạo đức: tham gia vào cuộc chiến chính tà thông qua tam nguyên chuẩn tắc 'Humata, Hukhta, Huvarshta' (Ý nghĩ thiện, Lời nói thiện, Hành vi thiện), ảnh hưởng sâu sắc đến quan niệm cánh chung của các tôn giáo Áp-ra-ham."
  },
  "satrapy-governance-model": {
    slug: "satrapy-governance-model",
    titleVi: "Mô hình quản trị Satrap Achaemenid",
    categoryVi: "Chính trị",
    summaryVi: "Hệ thống quản trị đế quốc phi tập trung sáng tạo của Ba Tư, phân chia các tỉnh (satrapy) dưới quyền Tổng trấn kết hợp giám sát hoàng gia và bao dung văn hóa bản địa.",
    contentVi: "Được hoàn thiện bởi Darius Đại đế, hệ thống Satrapy dung hòa giữa sự trung thành với Hoàng đế tối cao và quyền tự trị văn hóa, tôn giáo, ngôn ngữ của các dân tộc thần phục; được hỗ trợ bởi hệ thống đường sá Hoàng gia (Royal Road) và đơn vị tiền tệ chung."
  },
  "algebra-and-algorithmic-thought": {
    slug: "algebra-and-algorithmic-thought",
    titleVi: "Đại số học và tư duy thuật toán",
    categoryVi: "Toán học",
    summaryVi: "Phương pháp toán học mang tính cách mạng của Al-Khwarizmi tại Nhà Trí tuệ Baghdad, hệ thống hóa các phép tính giải phương trình và quy trình thuật toán tuần tự.",
    contentVi: "Từ tác phẩm 'Al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala', từ 'Algebra' (Đại số) và 'Algorithm' (Thuật toán - phiên âm tên Al-Khwarizmi) đã ra đời, đặt nền tảng tính toán hình thức cho toán học, thiên văn học và nền khoa học máy tính thế giới."
  },
  "empirical-experimental-optics": {
    slug: "empirical-experimental-optics",
    titleVi: "Quang học thực nghiệm Ibn al-Haytham",
    categoryVi: "Khoa học",
    summaryVi: "Cuộc cách mạng thực nghiệm trong vật lý của Alhazen, bác bỏ thuyết phát xạ cổ đại và chứng minh thị giác hình thành do ánh sáng phản xạ từ vật thể vào mắt.",
    contentVi: "Bộ sách 'Kitab al-Manazir' (Sách Quang học) không chỉ khai sinh ngành quang học hiện đại với phòng tối (camera obscura), thấu kính và khúc xạ, mà còn thiết lập chuẩn mực phương pháp khoa học: mọi lý thuyết đều phải chịu sự kiểm chứng thực nghiệm nghiêm ngặt."
  },
  "philosophical-reconciliation-ijtihad": {
    slug: "philosophical-reconciliation-ijtihad",
    titleVi: "Hòa giải triết học và Ijtihad",
    categoryVi: "Triết học",
    summaryVi: "Truyền thống tư tưởng Hồi giáo của Ibn Rushd (Averroes) và các học giả, chủ trương hòa giải giữa Đức tin thần khải và Lý trí triết học Aristotle.",
    contentVi: "Ibn Rushd khẳng định Chân lý không thể mâu thuẫn với Chân lý: cả lý trí triết học và kinh sách thần khải đều dẫn đến Thượng đế. Học thuyết Averroes đã châm ngòi cho phong trào phục hưng triết học duy lý tại các trường đại học Tây Âu thời Trung cổ."
  },
  "maya-vigesimal-mathematics-and-zero": {
    slug: "maya-vigesimal-mathematics-and-zero",
    titleVi: "Toán học nhị thập phân và số Không Maya",
    categoryVi: "Toán học",
    summaryVi: "Hệ thống số học cơ số 20 với ký hiệu số Không độc lập sớm bậc nhất thế giới, cho phép các nhà thiên văn Maya tính toán các chu kỳ hàng triệu năm.",
    contentVi: "Chỉ bằng ba ký hiệu đơn giản: vỏ ốc (số 0), dấu chấm (số 1) và thanh ngang (số 5), nền toán học Maya đạt trình độ vượt bậc hoàn toàn độc lập với Cựu Thế giới, phục vụ việc lập các niên lịch thiên văn chính xác đến từng ngày qua hàng thiên niên kỷ."
  },
  "cyclical-cosmic-time-and-long-count": {
    slug: "cyclical-cosmic-time-and-long-count",
    titleVi: "Thời gian chu kỳ và Lịch đếm dài Maya",
    categoryVi: "Khoa học",
    summaryVi: "Vũ trụ quan phức hợp xem thời gian là các chu kỳ tuần hoàn lặp lại bất tận, được đo lường chính xác bằng hệ thống Lịch Đếm Dài (Long Count) và lịch nghi lễ.",
    contentVi: "Người Maya kết hợp lịch Tzolkin (260 ngày), Haab' (365 ngày) thành Vòng Lịch 52 năm, và Lịch Đếm Dài (bắt đầu từ năm 3114 TCN) để liên kết các sự kiện lịch sử của vương triều với trật tự thần thoại và các kỳ hội ngộ thiên văn của sao Kim và Mặt Trời."
  },
  "maya-divine-kingship-kuhul-ajaw": {
    slug: "maya-divine-kingship-kuhul-ajaw",
    titleVi: "Vương quyền thần thánh K'uhul Ajaw",
    categoryVi: "Chính trị",
    summaryVi: "Mô hình quyền lực thần thánh của Maya trong đó người cai trị (Ajaw) là trung gian tế tự kết nối giữa thế giới con người và cõi thần linh tối cao.",
    contentVi: "Nhà vua Maya không chỉ là thủ lĩnh quân sự mà còn là hiện thân của các vị thần trên mặt đất. Các nghi thức trích máu hiến tế, vũ điệu thiêng và việc xây dựng kim tự tháp kỳ vĩ là phương tiện để Ajaw bảo đảm mưa thuận gió hòa và sự phồn vinh cho cộng đồng."
  },
  "paninian-formal-grammar": {
    slug: "paninian-formal-grammar",
    titleVi: "Ngữ pháp hình thức Panini",
    categoryVi: "Ngôn ngữ học",
    summaryVi: "Hệ thống mô tả ngôn ngữ hình thức sinh sản (generative grammar) đầu tiên của nhân loại do Panini phát minh để chuẩn hóa tiếng Phạn.",
    contentVi: "Tác phẩm Ashtadhyayi với gần 4000 quy tắc (sutra) tinh gọn cấu thành một hệ thống siêu ngôn ngữ hình thức đại số hoàn chỉnh, dự báo trước lý thuyết ngữ pháp hình thức và ngôn ngữ lập trình hiện đại hàng nghìn năm."
  },
  "hippocratic-medicine-and-ethics": {
    slug: "hippocratic-medicine-and-ethics",
    titleVi: "Y học và Đạo đức Hippocrates",
    categoryVi: "Y học",
    summaryVi: "Nền tảng y học duy lý tách biệt bệnh tật khỏi sự trừng phạt siêu nhiên, cùng Lời thề Hippocrates chuẩn mực đạo đức lương y qua ngàn đời.",
    contentVi: "Hippocrates và trường phái y học đảo Kos xem bệnh tật là hệ quả của mất cân bằng tự nhiên và lối sống thay vì ma thuật. Lời thề y đức nổi tiếng với tôn chỉ 'Trước hết là không làm hại' (Primum non nocere) tiếp tục là kim chỉ nam cho giới y khoa toàn cầu."
  },
  "justinian-civil-law-codification": {
    slug: "justinian-civil-law-codification",
    titleVi: "Pháp điển hóa Dân luật Justinian",
    categoryVi: "Pháp luật",
    summaryVi: "Đại công trình tập hợp và hệ thống hóa toàn bộ di sản luật học La Mã thành bộ Corpus Juris Civilis dưới triều Hoàng đế Byzantine Justinian I.",
    contentVi: "Bộ pháp điển gồm Codex, Digest, Institutes và Novellae đã lưu giữ tinh hoa tư pháp La Mã qua đêm trường Trung cổ, được tái phát hiện tại Đại học Bologna thế kỷ 11 và trở thành cội nguồn của toàn bộ truyền thống Dân luật (Civil Law) phương Tây."
  },
  "yin-yang-and-five-elements": {
    slug: "yin-yang-and-five-elements",
    titleVi: "Thuyết Âm Dương Ngũ Hành",
    categoryVi: "Triết học",
    summaryVi: "Hệ thống triết học tự nhiên cổ phương Đông giải thích nguồn gốc, sự vận động và tương tác tương sinh tương khắc của vạn vật trong vũ trụ.",
    contentVi: "Âm và Dương là hai mặt đối lập nhưng thống nhất bổ trợ cho nhau; Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) mô tả năm trạng thái chuyển hóa năng lượng. Học thuyết này chi phối sâu sắc thiên văn học, y học cổ truyền, phong thủy và đạo trị quốc Đông Á."
  },
  "shang-yang-legalist-meritocracy": {
    slug: "shang-yang-legalist-meritocracy",
    titleVi: "Chế độ trọng hiền tài Pháp gia Thương Ưởng",
    categoryVi: "Chính trị",
    summaryVi: "Cải cách thể chế chấn động tại nước Tần bãi bỏ đặc quyền quý tộc huyết thống, thiết lập hệ thống thăng tiến dựa trên công trạng chiến trường và năng lực.",
    contentVi: "Thương Ưởng ban hành 20 cấp bậc tước vị dựa trên chiến công thực tế và năng suất nông nghiệp, thiết lập luật pháp bình đẳng không phân biệt tôn ti quý tộc, biến nước Tần từ chư hầu lạc hậu thành cỗ máy quân sự - kinh tế hùng cường thống nhất Trung Hoa."
  },
  "buddhist-middle-way": {
    slug: "buddhist-middle-way",
    titleVi: "Con đường Trung đạo Phật giáo",
    categoryVi: "Triết học",
    summaryVi: "Lý tưởng thực hành và nhận thức luận của Phật giáo tránh xa hai thái cực cực đoan: buông thả dục lạc và khổ hạnh ép xác tiêu cực.",
    contentVi: "Trung đạo (Majjhima Patipada) biểu hiện qua Bát Chính Đạo trong thực hành, và học thuyết Duyên khởi - Tánh Không của Bồ tát Long Thọ (Nagarjuna) trong triết học nhận thức, hướng người tu vượt qua mọi thiên kiến nhị nguyên để đạt trí tuệ giải thoát thanh tịnh."
  },
  "zhuangzi-spiritual-relativism": {
    slug: "zhuangzi-spiritual-relativism",
    titleVi: "Thuyết tương đối tâm linh Trang Tử",
    categoryVi: "Triết học",
    summaryVi: "Triết lý Đạo gia phóng khoáng của Trang Tử chất vấn sự phân biệt cứng nhắc về đúng-sai, đẹp-xấu, sinh-tử để đạt tự do tinh thần tuyệt đối.",
    contentVi: "Qua những ngụ ngôn trác tuyệt như giấc mộng hóa bướm hay sự hữu dụng của cái vô dụng, Trang Tử kêu gọi con người vượt thoát các khuôn mẫu định kiến xã hội, đồng hóa bản ngã với Trời Đất để thong dong dạo chơi trong cõi tiêu dao."
  },
  "indigenous-holistic-medicine-nam-duoc": {
    slug: "indigenous-holistic-medicine-nam-duoc",
    titleVi: "Y học Nam dược toàn diện",
    categoryVi: "Y học",
    summaryVi: "Truyền thống y học cổ truyền bản địa Việt Nam với tôn chỉ 'Nam dược trị Nam nhân' được khởi xướng bởi Thiền sư Tuệ Tĩnh và Hải Thượng Lãn Ông.",
    contentVi: "Nam dược khai thác triệt để nguồn thảo mộc nhiệt đới bản địa và phong thổ Việt Nam, phối hợp biện chứng y lý cổ truyền với phòng bệnh dưỡng sinh, ăn uống thuận hòa tự nhiên, phục vụ sức khỏe của đại chúng bình dân."
  },
  "manichaean-universal-light-dualism": {
    slug: "manichaean-universal-light-dualism",
    titleVi: "Thuyết nhị nguyên Ánh sáng Mani giáo",
    categoryVi: "Tôn giáo",
    summaryVi: "Tôn giáo toàn cầu do nhà tiên tri Mani sáng lập tại Lưỡng Hà, tổng hợp các tôn giáo lớn xung quanh cuộc chiến giữa Vương quốc Ánh sáng và Vương quốc Bóng tối.",
    contentVi: "Mani giáo nhìn nhận vũ trụ là sự trộn lẫn bi kịch giữa ánh sáng linh hồn và bóng tối vật chất. Tôn giáo này từng lan tỏa từ bờ cõi La Mã đến tận kinh đô Trường An nhà Đường, tạo nên mạng lưới tâm linh và mỹ thuật đa văn hóa kỳ vĩ."
  },
  "mathematical-geodesy-and-indology": {
    slug: "mathematical-geodesy-and-indology",
    titleVi: "Trắc địa toán học và Ấn Độ học Al-Biruni",
    categoryVi: "Khoa học",
    summaryVi: "Những đóng góp khoa học vượt bậc của Al-Biruni trong việc đo bán kính Trái Đất bằng lượng giác và khảo cứu nhân học tôn giáo Ấn Độ học khách quan.",
    contentVi: "Tại pháo đài Nandana, Al-Biruni đã tính toán bán kính Trái Đất sai số chưa đầy 1% so với số đo vệ tinh hiện đại. Tác phẩm Kitab al-Hind của ông là công trình nhân học văn hóa mẫu mực đầu tiên nghiên cứu sâu sắc triết học, khoa học và tập tục Ấn Độ."
  },
  "euclidean-axiomatic-geometry": {
    slug: "euclidean-axiomatic-geometry",
    titleVi: "Hình học tiên đề Euclid",
    categoryVi: "Toán học",
    summaryVi: "Phương pháp toán học suy diễn chặt chẽ xây dựng toàn bộ hệ thống hình học từ một số hữu hạn các tiên đề và định đề hiển nhiên.",
    contentVi: "Được trình bày trong bộ 'Cơ sở' (Elements), phương pháp tiên đề của Euclid đã định hình tư duy toán học và khoa học lý thuyết trong hơn hai ngàn năm, là hình mẫu cho mọi hệ thống lập luận suy diễn logic chính xác."
  },
  "archimedean-hydrostatics-and-mechanics": {
    slug: "archimedean-hydrostatics-and-mechanics",
    titleVi: "Thủy tĩnh học và Cơ học Archimedes",
    categoryVi: "Khoa học",
    summaryVi: "Những phát minh nền tảng của Archimedes về lực đẩy chất lỏng (Định luật Archimedes), nguyên lý đòn bẩy và toán học tích phân sơ khai.",
    contentVi: "Với tuyên bố bất hủ 'Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng Trái Đất', Archimedes kết hợp hoàn hảo giữa toán học trừu tượng và ứng dụng kỹ thuật thực tiễn, đặt nền móng cho cơ học cổ điển và thủy lực học hiện đại."
  },
  "money": {
    slug: "money",
    titleVi: "Tiền tệ",
    categoryVi: "Kinh tế học",
    summaryVi: "Phương tiện trao đổi, thước đo giá trị và lưu trữ của cải, từ tiền vỏ sò cổ đại, tiền kim loại Lydia đến tiền giấy và tài chính kỹ thuật số.",
    contentVi: "Sự phát minh tiền tệ đã giải phóng con người khỏi phương thức hàng đổi hàng (barter) kém hiệu quả, cho phép chuyên môn hóa lao động, thúc đẩy thương mại đường dài và cung cấp nền tảng tính toán cho toàn bộ nền kinh tế thế giới."
  },
  "printing-press": {
    slug: "printing-press",
    titleVi: "Kỹ thuật in ấn",
    categoryVi: "Công nghệ",
    summaryVi: "Công nghệ sao chép văn bản hàng loạt, từ in khắc gỗ bản và chữ in rời Đông Á đến máy in chữ kim loại di động của Gutenberg tại Mainz.",
    contentVi: "Máy in đã dân chủ hóa tri thức, hạ giá thành sách và loại bỏ thế độc quyền sao chép của giới tu viện. Phát minh này trực tiếp thúc đẩy Phong trào Cải cách Tôn giáo, Cách mạng Khoa học và sự trỗi dậy của thời đại Khai sáng toàn cầu."
  }
};
