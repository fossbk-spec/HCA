export interface BookTranslation {
  slug: string;
  titleVi: string;
  authorVi: string;
  summaryVi: string;
  contentVi?: string;
}

export const bookTranslations: Record<string, BookTranslation> = {
  "epic-of-gilgamesh": {
    slug: "epic-of-gilgamesh",
    titleVi: "Sử thi Gilgamesh",
    authorVi: "Khuyết danh (Sin-leqi-unninni san định)",
    summaryVi: "Bản trường ca Lưỡng Hà bất hủ kể về Gilgamesh - vua xứ Uruk, tình bạn tri kỷ với Enkidu và hành trình vượt đại dương tìm kiếm phương thuốc trường sinh bất tử.",
    contentVi: "Được khắc trên các phiến đất sét chữ hình nêm, Sử thi Gilgamesh là tác phẩm văn học lớn cổ xưa nhất của nhân loại còn bảo tồn được. Sử thi khám phá sâu sắc thân phận hữu hạn của con người trước cái chết, nỗi đau mất mát tri kỷ, ý nghĩa của di sản văn hóa và sự chấp nhận giới hạn kiếp người."
  },
  "code-of-hammurabi": {
    slug: "code-of-hammurabi",
    titleVi: "Bộ luật Hammurabi",
    authorVi: "Hammurabi",
    summaryVi: "Bộ luật thành văn hoàn chỉnh bậc nhất của Lưỡng Hà cổ đại, khắc trên cột đá bazan đen với 282 điều luật thiết lập công lý 'mắt đền mắt, răng đền răng'.",
    contentVi: "Bộ luật do vua Hammurabi ban hành khoảng năm 1750 TCN tại Babylon. Không chỉ chứa đựng nguyên tắc bồi thường tương xứng (lex talionis), bộ luật còn quy định chi tiết về hợp đồng thương mại, quyền sở hữu, hôn nhân gia đình, mức thù lao lao động và trách nhiệm nghề nghiệp của thợ thủ công, thầy thuốc."
  },
  "book-of-the-dead": {
    slug: "book-of-the-dead",
    titleVi: "Tử thư Ai Cập",
    authorVi: "Các tư tế Ai Cập cổ đại",
    summaryVi: "Tuyển tập các văn bản thần chú ma thuật tang lễ cổ Ai Cập viết trên giấy papyrus, hướng dẫn linh hồn người chết vượt qua các hiểm nguy cõi âm Duat để đến cõi vĩnh hằng.",
    contentVi: "Được gọi bằng tên bản địa là 'Lời cầu đi vào ban ngày' (Pert em heru), tập bùa chú này bao gồm lời tuyên thệ thanh bạch trước 42 vị phán quan và nghi thức cân tim với chiếc lông vũ Ma'at trước thần Osiris, phản ánh niềm tin son sắt vào sự sống bất tử và đạo đức học Ai Cập."
  },
  "iliad": {
    slug: "iliad",
    titleVi: "Sử thi Iliad",
    authorVi: "Homer",
    summaryVi: "Bản hùng ca tráng lệ của Hy Lạp cổ đại thuật lại những tuần cuối cùng của cuộc chiến thành Troy, xoay quanh cơn thịnh nộ khôn nguôi của dũng tướng Achilles.",
    contentVi: "Iliad miêu tả chân thực sự bi hùng của chiến tranh, danh dự người chiến binh (kleos) và sự can thiệp của các vị thần đỉnh Olympus. Tác phẩm đặt nền tảng ngôn ngữ văn chương, thần thoại học và nhân sinh quan đạo đức cho toàn bộ nền văn minh Hy Lạp cổ điển."
  },
  "odyssey": {
    slug: "odyssey",
    titleVi: "Sử thi Odyssey",
    authorVi: "Homer",
    summaryVi: "Bản trường ca tiếp nối của Homer kể về hành trình lưu lạc đầy hiểm nguy suốt mười năm của người anh hùng mưu trí Odysseus trên đường trở về quê hương Ithaca.",
    contentVi: "Odyssey tôn vinh trí thông minh, sự kiên định (metis) và lòng chung thủy gia đình. Những cuộc chạm trán với quái vật Cyclops, phù thủy Circe, tiếng hát mỹ nhân ngư Siren và cõi âm biến tác phẩm thành nguyên mẫu vĩ đại cho hành trình phiêu lưu khám phá của nhân loại."
  },
  "the-histories": {
    slug: "the-histories",
    titleVi: "Lịch sử (Historiai)",
    authorVi: "Herodotus",
    summaryVi: "Công trình khảo cứu lịch sử đầu tiên của phương Tây, ghi chép nguồn gốc và diễn biến cuộc chiến tranh Hy Lạp - Ba Tư cùng phong tục tập quán các dân tộc cổ đại.",
    contentVi: "Herodotus được tôn vinh là 'Cha đẻ của Lịch sử' vì ông là người đầu tiên tiến hành điều tra hệ thống, thu thập nhân chứng và kiểm chứng tư liệu thay vì giải thích lịch sử thuần túy qua thần thoại và ý muốn của các thần linh."
  },
  "history-of-peloponnesian-war": {
    slug: "history-of-peloponnesian-war",
    titleVi: "Lịch sử chiến tranh Peloponnesus",
    authorVi: "Thucydides",
    summaryVi: "Tác phẩm sử học kinh điển phân tích cuộc chiến tàn khốc giữa liên minh Athens và Sparta, đặt nền móng cho chủ nghĩa hiện thực chính trị và khoa học lịch sử phê phán.",
    contentVi: "Thucydides phân tích nguyên nhân sâu xa của chiến tranh xuất phát từ sự trỗi dậy quyền lực của Athens khiến Sparta lo sợ (Bẫy Thucydides). Ông khước từ mọi yếu tố thần quyền, tập trung vào bản chất quyền lực, tâm lý quần chúng và bài diễn văn tang lễ bất hủ của Pericles."
  },
  "the-republic": {
    slug: "the-republic",
    titleVi: "Cộng hòa (Politeia)",
    authorVi: "Plato",
    summaryVi: "Tác phẩm đối thoại triết học vĩ đại của Plato bàn về bản chất của công lý, trật tự của nhà nước lý tưởng do các Vua - Triết gia cai trị và ngụ ngôn hang động.",
    contentVi: "Plato phác họa một xã hội hài hòa dựa trên sự phân công đức hạnh tương ứng với ba phần của linh hồn: lý trí (người cai trị), ý chí dũng cảm (vệ binh) và ham muốn vật chất (thợ thủ công/thương nhân), thiết lập nền tảng cho triết học chính trị phương Tây."
  },
  "politics": {
    slug: "politics",
    titleVi: "Chính trị luận",
    authorVi: "Aristotle",
    summaryVi: "Khảo luận chính trị thực nghiệm của Aristotle khẳng định con người về bản chất là một sinh vật chính trị (zoon politikon) và phân tích các mô hình hiến pháp nhà nước.",
    contentVi: "Dựa trên khảo sát 158 hiến pháp của các thành bang Hy Lạp, Aristotle phân loại các chính thể (quân chủ, quý tộc, cộng hòa và các biến thể thoái hóa của chúng), đồng thời đề cao tầng lớp trung lưu như trụ cột ổn định vững chắc nhất cho nhà nước."
  },
  "nicomachean-ethics": {
    slug: "nicomachean-ethics",
    titleVi: "Đạo đức học Nicomachean",
    authorVi: "Aristotle",
    summaryVi: "Khảo luận đạo đức học kinh điển của Aristotle về hạnh phúc tối thượng (eudaimonia), việc rèn luyện đức hạnh và học thuyết về điểm trung dung vàng.",
    contentVi: "Aristotle chỉ ra rằng đạo đức không phải là sự tuân thủ quy tắc giáo điều mà là thói quen thực hành hành vi thiện. Mỗi đức hạnh là điểm cân bằng ở giữa hai thái cực cực đoan (ví dụ: lòng dũng cảm là điểm trung dung giữa sự hèn nhát và liều lĩnh mù quáng)."
  },
  "elements": {
    slug: "elements",
    titleVi: "Cơ sở (Stoicheia)",
    authorVi: "Euclid",
    summaryVi: "Bộ sách 13 tập đặt nền móng cho hình học phẳng, lý thuyết số và hình học không gian bằng hệ thống tiên đề và phép chứng minh suy luận chặt chẽ.",
    contentVi: "Tác phẩm toán học có tầm ảnh hưởng lớn nhất mọi thời đại, là cuốn sách được in và nghiên cứu nhiều thứ hai trong lịch sử phương Tây chỉ sau Kinh Thánh, định hình phương pháp luận chứng minh toán học trong hơn hai ngàn năm."
  },
  "on-the-republic": {
    slug: "on-the-republic",
    titleVi: "Bàn về nền Cộng hòa (De Re Publica)",
    authorVi: "Cicero",
    summaryVi: "Khảo luận triết học chính trị của Cicero bảo vệ hiến pháp cộng hòa La Mã, sự cân bằng quyền lực hỗn hợp và khái niệm Luật Tự nhiên phổ quát.",
    contentVi: "Cicero khẳng định luật pháp chân chính là Lý trí đúng đắn thuận theo Tự nhiên, áp dụng bình đẳng cho mọi người và mọi thời đại. Cuối tác phẩm là đoạn trích 'Giấc mơ Scipio' nổi tiếng phản ánh trật tự vũ trụ và phần thưởng dành cho những công dân phụng sự đất nước."
  },
  "aeneid": {
    slug: "aeneid",
    titleVi: "Sử thi Aeneid",
    authorVi: "Virgil",
    summaryVi: "Bản trường ca Latin tráng lệ của Virgil kể về chàng Aeneas chạy trốn khỏi thành Troy bị tàn phá để đến bán đảo Ý, đặt nền móng cho sự khai sinh của Đế chế La Mã.",
    contentVi: "Được sáng tác theo yêu cầu của Hoàng đế Augustus, Aeneid tôn vinh phẩm chất pietas (lòng tận tụy, hiếu nghĩa và phục tùng thiên mệnh) của La Mã, dung hòa truyền thống sử thi Homeric với sứ mệnh lịch sử vĩ đại của Đế quốc La Mã."
  },
  "meditations": {
    slug: "meditations",
    titleVi: "Suy tưởng (Ta Eis Heauton)",
    authorVi: "Marcus Aurelius",
    summaryVi: "Tập nhật ký triết học khắc kỷ riêng tư của Hoàng đế La Mã Marcus Aurelius ghi lại những chiêm nghiệm sâu sắc về bổn phận, làm chủ tâm trí và sự vô thường của cuộc đời.",
    contentVi: "Được viết bên ánh lửa doanh trại trong các chiến dịch biên thùy sông Danube, 'Suy tưởng' là cuốn sách gối đầu giường về sức mạnh tinh thần, nhắc nhở con người tập trung vào phẩm giá nội tâm, đối xử nhân từ với đồng loại và bình thản chấp nhận quy luật tự nhiên."
  },
  "analects": {
    slug: "analects",
    titleVi: "Luận ngữ",
    authorVi: "Khổng Tử và môn đệ",
    summaryVi: "Tập ngữ lục ghi lại lời nói, hành vi và các cuộc đàm đạo giữa Khổng Tử cùng các học trò, bộ kinh điển cốt lõi nhất của Nho gia suốt hơn hai thiên niên kỷ.",
    contentVi: "Luận ngữ đề cập toàn diện đến đạo đức tu thân, lòng hiếu thảo, đức Nhân, sự học hỏi không ngừng và nghệ thuật trị quốc an dân bằng đức trị. Tác phẩm đã hun đúc nhân cách và khuôn mẫu tư duy của toàn bộ văn hóa giáo dục Đông Á."
  },
  "tao-te-ching": {
    slug: "tao-te-ching",
    titleVi: "Đạo Đức Kinh",
    authorVi: "Lão Tử",
    summaryVi: "Tác phẩm triết học kinh điển gồm 81 chương hàm súc sâu sắc của Lão Tử, khai sinh tư tưởng Đạo giáo với hai nguyên lý vũ trụ luận Đạo và Vô vi.",
    contentVi: "Với câu mở đầu bất hủ 'Đạo khả đạo phi thường Đạo', tác phẩm dùng hình tượng nước mềm mại nhưng thắng được cương mãnh, đề cao sự giản dị, khiêm nhường, không tranh giành và quản trị quốc gia theo lối vô vi tự nhiên."
  },
  "art-of-war": {
    slug: "art-of-war",
    titleVi: "Tôn Tử binh pháp",
    authorVi: "Tôn Vũ",
    summaryVi: "Binh thư quân sự cổ điển trác việt gồm 13 thiên của Tôn Vũ, đúc kết chiến lược quân sự, tâm lý chiến và nghệ thuật giành chiến thắng mà không cần giao tranh.",
    contentVi: "Với phương châm 'Biết người biết ta, trăm trận không nguy' và đỉnh cao quân sự là 'Bất chiến tự nhiên thành', Tôn Tử binh pháp không chỉ là cẩm nang quân sự hàng đầu mà còn được ứng dụng rộng rãi trong quản trị kinh doanh, ngoại giao và đàm phán quốc tế."
  },
  "bhagavad-gita": {
    slug: "bhagavad-gita",
    titleVi: "Chí Tôn Ca (Bhagavad Gita)",
    authorVi: "Vyasa",
    summaryVi: "Khúc ca thánh thi 700 câu trong sử thi Mahabharata, ghi lại cuộc đối thoại tâm linh sâu sắc giữa chiến binh Arjuna và Thần Krishna trên chiến trường Kurukshetra.",
    contentVi: "Chí Tôn Ca giải tỏa cuộc khủng hoảng đạo đức của Arjuna bằng cách giảng giải về bản chất bất tử của linh hồn (Atman), ba con đường giải thoát: Karma Yoga (hành động xả kỷ), Jnana Yoga (trí tuệ) và Bhakti Yoga (sự dâng hiến sùng kính cho Thượng đế)."
  },
  "principia": {
    slug: "principia",
    titleVi: "Các nguyên lý toán học của triết học tự nhiên (Principia)",
    authorVi: "Isaac Newton",
    summaryVi: "Kiệt tác cách mạng khoa học của Isaac Newton công bố ba định luật chuyển động cơ học cổ điển và Định luật vạn vật hấp dẫn thống nhất vũ trụ.",
    contentVi: "Xuất bản năm 1687, cuốn sách đã hợp nhất cơ học mặt đất với chuyển động thiên thể thành một hệ thống toán học duy nhất, chấm dứt thời kỳ vật lý kinh viện cổ đại và mở ra kỷ nguyên cơ học cổ điển rực rỡ của văn minh nhân loại."
  },
  "origin-of-species": {
    slug: "origin-of-species",
    titleVi: "Nguồn gốc các loài",
    authorVi: "Charles Darwin",
    summaryVi: "Công trình sinh học nền tảng của Charles Darwin giới thiệu học thuyết tiến hóa thông qua cơ chế chọn lọc tự nhiên, làm thay đổi vĩnh viễn nhận thức của con người về sinh giới.",
    contentVi: "Dựa trên các quan sát tỉ mỉ từ chuyến hải trình trên tàu HMS Beagle, Darwin chứng minh các loài sinh vật không phải là bất biến do tạo hóa ấn định sẵn, mà tiến hóa qua hàng triệu năm từ các tổ tiên chung nhờ sự sống sót của các biến dị thích nghi."
  },
  "wealth-of-nations": {
    slug: "wealth-of-nations",
    titleVi: "Của cải của các dân tộc",
    authorVi: "Adam Smith",
    summaryVi: "Tác phẩm kinh điển khai sinh kinh tế học hiện đại của Adam Smith, phân tích sự phân công lao động, thị trường tự do và cơ chế 'bàn tay vô hình'.",
    contentVi: "Smith giải thích cơ chế mà theo đó sự theo đuổi lợi ích cá nhân chính đáng trong một thị trường cạnh tranh tự do sẽ vô hình trung thúc đẩy sự thịnh vượng chung của toàn xã hội, đồng thời phê phán chủ nghĩa trọng thương bảo hộ mậu dịch."
  },
  "communist-manifesto": {
    slug: "communist-manifesto",
    titleVi: "Tuyên ngôn của Đảng Cộng sản",
    authorVi: "Karl Marx & Friedrich Engels",
    summaryVi: "Văn kiện chính trị - xã hội có tầm ảnh hưởng lịch sử to lớn của Marx và Engels, trình bày lý thuyết duy vật lịch sử và quy luật đấu tranh giai cấp.",
    contentVi: "Với khẩu hiệu bất hủ 'Vô sản toàn thế giới, liên hiệp lại!', bản tuyên ngôn phân tích sự trỗi dậy của giai cấp tư sản công nghiệp và khẳng định sứ mệnh lịch sử của giai cấp công nhân trong việc xây dựng một xã hội không còn người bóc lột người."
  },
  "records-of-the-grand-historian": {
    slug: "records-of-the-grand-historian",
    titleVi: "Sử ký Tư Mã Thiên",
    authorVi: "Tư Mã Thiên",
    summaryVi: "Bộ thông sử đầu tiên của Trung Hoa gồm 130 quyển ghi chép hơn 2.500 năm lịch sử từ thời Hoàng Đế đến triều Hán Vũ Đế theo thể kỷ truyện mẫu mực.",
    contentVi: "Được Đại văn hào Lỗ Tấn ca ngợi là 'Tuyệt xướng của sử gia, khúc Ly tao không vần', Sử ký không chỉ có giá trị lịch sử vô song nhờ tính trung thực 'thực lục' mà còn là kiệt tác văn xuôi tự sự trác tuyệt của văn học phương Đông."
  },
  "zhuangzi": {
    slug: "zhuangzi",
    titleVi: "Trang Tử (Nam Hoa kinh)",
    authorVi: "Trang Chu",
    summaryVi: "Tác phẩm triết học Đạo gia trác tuyệt của Trang Tử, dùng lối văn ngụ ngôn phóng khoáng để luận giải về tự do tuyệt đối, sự vô biên của Đạo và sự siêu việt sinh tử.",
    contentVi: "Trang Tử phê phán thói phán xét hẹp hòi của thói đời, dẫn dắt tâm trí người đọc qua hình tượng chim Côn chim Bằng vạn dặm, giấc mộng Trang Chu hóa bướm và khúc hát gõ bồn khi vợ qua đời, thể hiện một tâm hồn tự do phóng khoáng tuyệt đỉnh."
  },
  "hanfeizi": {
    slug: "hanfeizi",
    titleVi: "Hàn Phi Tử",
    authorVi: "Hàn Phi",
    summaryVi: "Tác phẩm tổng đại thành tư tưởng Pháp gia cổ Trung Hoa, tổng hợp ba yếu tố quản trị quốc gia thiết yếu: Pháp (luật lệ), Thuật (thuật dùng người) và Thế (quyền uy).",
    contentVi: "Hàn Phi xuất phát từ học thuyết tính ác của Tuân Tử, chủ trương vua chúa không thể dựa vào lòng nhân nghĩa phù phiếm mà phải dùng luật pháp nghiêm minh, kiểm soát thưởng phạt và giữ kín tâm tư để thống nhất và duy trì trật tự thiên hạ."
  },
  "i-ching": {
    slug: "i-ching",
    titleVi: "Kinh Dịch (Chu Dịch)",
    authorVi: "Phục Hy, Văn Vương, Chu Công, Khổng Tử",
    summaryVi: "Bộ kinh điển triết học cổ xưa nhất của Trung Hoa về quy luật biến dịch của vũ trụ, dựa trên hệ thống 64 quẻ hình thành từ hai hào Âm và Dương.",
    contentVi: "Kinh Dịch nhìn nhận vũ trụ là một dòng biến dịch không ngừng (dịch giả, biến dịch dã). Tác phẩm cung cấp chìa khóa nhận thức về sự tương tác giữa thời cơ, vị thế và hành vi đạo đức, ảnh hưởng bao trùm từ triết học, thiên văn, phong thủy đến nghệ thuật lãnh đạo."
  },
  "arthashastra": {
    slug: "arthashastra",
    titleVi: "Luận về Bổn phận và Lợi ích chính trị (Arthashastra)",
    authorVi: "Kautilya (Chanakya)",
    summaryVi: "Khảo luận chính trị, kinh tế và tình báo thực tế cổ Ấn Độ của Kautilya, tể tướng mưu lược đã phò tá Chandragupta Maurya kiến lập đế chế.",
    contentVi: "Tác phẩm trình bày chi tiết về nghệ thuật trị quốc thực dụng: tổ chức mạng lưới gián điệp, chính sách thuế khóa, phát triển nông nghiệp, luật hình sự và thuyết Mandala về quan hệ đồng minh - kẻ thù trong quan hệ quốc tế."
  },
  "upanishads": {
    slug: "upanishads",
    titleVi: "Áo nghĩa thư (Upanishads)",
    authorVi: "Các hiền triết Vệ Đà cổ đại",
    summaryVi: "Đỉnh cao triết học tâm linh của truyền thống Vệ Đà Ấn Độ, luận giải về bản chất thực tại tối hậu Brahman và sự đồng nhất với bản ngã thiêng liêng Atman.",
    contentVi: "Chuyển dịch tôn giáo từ nghi lễ cúng tế hình thức sang chiêm nghiệm triết lý nội tâm sâu sắc, các bộ Upanishad đưa ra đại ngôn bất hủ 'Tat Tvam Asi' (Ngươi chính là Điều Đó), đặt nền móng cho triết học Vedanta và nhận thức luận Ấn Độ."
  },
  "dhammapada": {
    slug: "dhammapada",
    titleVi: "Kinh Pháp Cú (Dhammapada)",
    authorVi: "Đức Phật Thích Ca Mâu Ni",
    summaryVi: "Tuyển tập 423 bài kệ ngắn gọn, súc tích chứa đựng cốt tủy giáo lý đạo đức và trí tuệ Phật giáo về tâm trí, nghiệp báo và con đường giải thoát.",
    contentVi: "Thuộc Tiểu Bộ Kinh trong Tam Tạng Pali, Kinh Pháp Cú dạy rằng 'Ý dẫn đầu các pháp, ý làm chủ, ý tạo'. Tác phẩm là cẩm nang tu học thường nhật quý giá cho hàng triệu người tìm kiếm sự an lạc nội tâm và chuyển hóa khổ đau."
  },
  "rigveda": {
    slug: "rigveda",
    titleVi: "Lê-câu-vệ-đà (Rigveda)",
    authorVi: "Các thánh thi sĩ Vệ Đà (Rishi)",
    summaryVi: "Kinh điển cổ xưa nhất trong bốn bộ Vệ Đà bằng tiếng Phạn cổ, gồm 1.028 bài thánh ca ca ngợi các vị thần tự nhiên và suy tư vũ trụ sơ khai.",
    contentVi: "Bản văn cổ nhất của ngữ hệ Ấn-Âu còn lưu truyền, Rigveda chứa đựng thánh ca Nasadiya Sukta trứ danh chiêm nghiệm về nguồn gốc hư vô của vũ trụ, thiết lập nghi lễ tế tự và văn hóa tâm linh của nền văn minh Vệ Đà."
  },
  "chieu-doi-do": {
    slug: "chieu-doi-do",
    titleVi: "Chiếu dời đô (Thiên đô chiếu)",
    authorVi: "Lý Thái Tổ (Lý Công Uẩn)",
    summaryVi: "Bản chiếu chỉ lịch sử năm 1010 của vua Lý Thái Tổ quyết định thiên đô từ Hoa Lư về thành Đại La (Thăng Long - Hà Nội), mở ra thời kỳ cực thịnh của Đại Việt.",
    contentVi: "Văn bản thể hiện tầm nhìn địa chính trị và chiến lược thiên tài của Lý Thái Tổ, nhận diện Đại La là 'chốn hội tụ trọng yếu của bốn phương đất nước, nơi tụ khí thịnh vượng bậc nhất', kết hợp khát vọng độc lập lâu bền và ý nguyện thuận lòng muôn dân."
  },
  "nam-quoc-son-ha": {
    slug: "nam-quoc-son-ha",
    titleVi: "Nam quốc sơn hà",
    authorVi: "Khuyết danh (gắn liền Lý Thường Kiệt)",
    summaryVi: "Bản tuyên ngôn độc lập đầu tiên của dân tộc Việt Nam vang lên bên dòng sông Như Nguyệt năm 1077, khẳng định chủ quyền lãnh thổ thiêng liêng bất khả xâm phạm.",
    contentVi: "Bốn câu thơ thất ngôn tứ tuyệt đanh thép 'Nam quốc sơn hà Nam đế cư / Tiệt nhiên định phận tại thiên thư / Như hà nghịch lỗ lai xâm phạm / Nhữ đẳng hành khan thủ bại hư' đã cổ vũ sĩ khí quân dân Đại Việt đập tan quân xâm lược Tống."
  },
  "hich-tuong-si": {
    slug: "hich-tuong-si",
    titleVi: "Hịch tướng sĩ (Dụ chư tì tướng hịch văn)",
    authorVi: "Hưng Đạo Đại Vương Trần Quốc Tuấn",
    summaryVi: "Áng văn chính luận ái quốc bất hủ của Tiết chế Trần Hưng Đạo khích lệ lòng căm thù giặc, tình nghĩa chủ tướng và tinh thần quyết chiến trước cuộc kháng chiến chống Nguyên Mông.",
    contentVi: "Với những lời văn nghẹn ngào tâm can 'Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa...', bài hịch đã hun đúc hào khí Đông A bất diệt, giúp quân dân nhà Trần ba lần toàn thắng đế quốc Mông Cổ bách chiến bách thắng."
  },
  "binh-ngo-dai-cao": {
    slug: "binh-ngo-dai-cao",
    titleVi: "Bình Ngô đại cáo",
    authorVi: "Nguyễn Trãi",
    summaryVi: "Bản tuyên ngôn độc lập thứ hai của Việt Nam do Nguyễn Trãi thừa lệnh Lê Lợi soạn thảo năm 1428, tuyên bố đại thắng cuộc khởi nghĩa Lam Sơn quét sạch giặc Minh.",
    contentVi: "Được ngợi ca là 'Thiên cổ hùng văn', tác phẩm kết tinh tư tưởng nhân nghĩa cao cả 'Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo', khẳng định bề dày văn hiến, bờ cõi chủ quyền và truyền thống quật cường dựng nước giữ nước của dân tộc Đại Việt."
  },
  "dai-viet-su-ky-toan-thu": {
    slug: "dai-viet-su-ky-toan-thu",
    titleVi: "Đại Việt sử ký toàn thư",
    authorVi: "Ngô Sĩ Liên và Quốc sử quán nhà Hậu Lê",
    summaryVi: "Bộ quốc sử biên niên chính thống đồ sộ nhất của Đại Việt, ghi chép từ thời Hồng Bàng huyền sử đến khi vua Lê Gia Tông lên ngôi năm 1675.",
    contentVi: "Kế thừa công trình của Lê Văn Hưu và Phan Phu Tiên, Ngô Sĩ Liên đã hoàn thành bộ sử với những lời bình sắc sảo dưới quan điểm Nho học chính thống, trở thành di sản tư liệu lịch sử vô giá về chính trị, quân sự, văn hóa và xã hội Việt Nam thời cổ trung đại."
  },
  "quoc-trieu-hinh-luat": {
    slug: "quoc-trieu-hinh-luat",
    titleVi: "Quốc triều hình luật (Luật Hồng Đức)",
    authorVi: "Triều Hậu Lê (hoàn thiện thời Lê Thánh Tông)",
    summaryVi: "Bộ pháp điển vĩ đại và tiến bộ bậc nhất của chế độ phong kiến Việt Nam thời Hậu Lê, gồm 722 điều luật mang tính nhân văn sâu sắc và nét đặc thù dân tộc độc đáo.",
    contentVi: "Luật Hồng Đức không chỉ bảo vệ trật tự nhà nước phong kiến mà còn có những quy định cực kỳ tiến bộ vượt thời đại: bảo vệ quyền thừa kế tài sản của phụ nữ, bảo vệ người già yếu, trẻ mồ côi và người tàn tật, kết hợp nhuần nhuyễn giữa tinh thần Nho giáo và tập quán cổ truyền Việt Nam."
  },
  "truyen-kieu": {
    slug: "truyen-kieu",
    titleVi: "Truyện Kiều (Đoạn trường tân thanh)",
    authorVi: "Đại thi hào Nguyễn Du",
    summaryVi: "Kiệt tác văn học số một của dân tộc Việt Nam gồm 3.254 câu thơ lục bát tuyệt mỹ kể về số phận bi kịch chìm nổi suốt mười lăm năm của người con gái tài sắc Thúy Kiều.",
    contentVi: "Nguyễn Du đã nâng thể thơ lục bát dân tộc lên đỉnh cao nghệ thuật ngôn từ bác học trác tuyệt. Tác phẩm là tiếng kêu thương nhân đạo thống thiết cho quyền sống, tình yêu tự do và phẩm giá con người trước những thế lực đồng tiền tàn bạo của xã hội phong kiến."
  },
  "avesta": {
    slug: "avesta",
    titleVi: "Kinh thánh Avesta",
    authorVi: "Zarathustra và các đạo sĩ Zoroaster",
    summaryVi: "Bộ kinh thánh thiêng liêng cổ xưa của Hỏa giáo Ba Tư, gồm các bài thánh ca Gathas của Zarathustra cùng các nghi thức thờ phụng Thần Ánh sáng Ahura Mazda.",
    contentVi: "Avesta bảo tồn ngôn ngữ Avestan cổ (thuộc nhóm Iran cổ), là cội nguồn tư tưởng nhị nguyên đạo đức, tôn vinh bốn yếu tố tự nhiên (lửa, nước, đất, khí) trong sạch và ảnh hưởng sâu sắc đến thần học các tôn giáo Tây Á kế tục."
  },
  "cyrus-cylinder": {
    slug: "cyrus-cylinder",
    titleVi: "Trụ Cyrus (Tuyên ngôn Nhân quyền Cyrus)",
    authorVi: "Cyrus Đại đế",
    summaryVi: "Bản khắc đất sét hình trụ bằng chữ nêm Babylon năm 539 TCN của Cyrus Đại đế, công bố chính sách khoan dung tôn giáo, thả tù nhân và phục hồi đền thờ.",
    contentVi: "Được Liên Hợp Quốc dịch sang sáu thứ tiếng chính thức và xem như bản Tuyên ngôn Nhân quyền đầu tiên của nhân loại, Trụ Cyrus ghi nhận sự tôn trọng quyền tự do tín ngưỡng, văn hóa bản địa của người Babylon và cho phép người Do Thái hồi hương tái thiết Đền thờ Jerusalem."
  },
  "shahnameh": {
    slug: "shahnameh",
    titleVi: "Sử thi các vị Vua (Shahnameh)",
    authorVi: "Ferdowsi",
    summaryVi: "Bản trường ca vĩ đại gồm hơn 50.000 câu thơ đôi của Ferdowsi, phục hưng và bảo tồn ngôn ngữ văn hóa Ba Tư qua lịch sử thần thoại và vương triều từ tiền sử đến thời Hồi giáo.",
    contentVi: "Ferdowsi đã dành ba mươi năm cuộc đời để sáng tác Shahnameh chỉ bằng từ vựng tiếng Ba Tư thuần khiết (tránh từ mượn Ả Rập). Tác phẩm lưu giữ những câu chuyện anh hùng bi tráng như Rostam và Sohrab, trở thành linh hồn bất diệt của bản sắc dân tộc Iran."
  },
  "the-quran": {
    slug: "the-quran",
    titleVi: "Kinh Quran",
    authorVi: "Thiên sứ Muhammad (thần khải từ Allah)",
    summaryVi: "Bộ thánh kinh tối cao của Hồi giáo gồm 114 chương (surah) bằng tiếng Ả Rập chuẩn mực, được tín đồ tin là lời thần khải trực tiếp nguyên vẹn của Thượng đế Allah.",
    contentVi: "Quran không chỉ là nền tảng thần học và tâm linh Hồi giáo mà còn là cẩm nang pháp luật xã hội (Sharia), luân lý đạo đức và là đỉnh cao chuẩn mực của văn phong ngôn ngữ Ả Rập cổ điển, thống nhất thế giới Hồi giáo rộng lớn."
  },
  "the-compendious-book-on-calculation-by-completion-and-balancing": {
    slug: "the-compendious-book-on-calculation-by-completion-and-balancing",
    titleVi: "Sách rút gọn về Tính toán bằng Khôi phục và Cân bằng (Al-Jabr)",
    authorVi: "Muhammad ibn Musa al-Khwarizmi",
    summaryVi: "Tác phẩm toán học mang tính bước ngoặt của Al-Khwarizmi tại Baghdad năm 820, khai sinh ngành Đại số học và phương pháp giải phương trình bậc nhất, bậc hai.",
    contentVi: "Từ 'al-jabr' trong tựa đề tác phẩm đã trở thành từ 'Algebra' (Đại số) trong các ngôn ngữ phương Tây. Cuốn sách cung cấp các ví dụ thực tiễn giải quyết bài toán phân chia tài sản thừa kế, đo đạc đất đai, thương mại và hình học."
  },
  "the-canon-of-medicine": {
    slug: "the-canon-of-medicine",
    titleVi: "Định luật Y học (Al-Qanun fi al-Tibb)",
    authorVi: "Ibn Sina (Avicenna)",
    summaryVi: "Bách khoa toàn thư y học gồm 5 tập của Avicenna, tổng hợp tri thức y học Hy Lạp - La Mã - Ả Rập thành bộ giáo trình y khoa tiêu chuẩn của châu Âu và thế giới Hồi giáo suốt 600 năm.",
    contentVi: "Tác phẩm mô tả chi tiết giải phẫu học, dược lý học với hơn 800 vị thuốc, tính lây truyền của bệnh dịch, thử nghiệm lâm sàng có kiểm soát và phương pháp cách ly kiểm dịch, đưa Avicenna lên vị thế 'Vua của các thầy thuốc'."
  },
  "book-of-optics": {
    slug: "book-of-optics",
    titleVi: "Sách Quang học (Kitab al-Manazir)",
    authorVi: "Ibn al-Haytham (Alhazen)",
    summaryVi: "Công trình 7 tập mang tính cách mạng khoa học của Alhazen, chứng minh thực nghiệm rằng ánh sáng phản xạ từ vật thể đi vào mắt chứ không phải mắt phát ra tia nhìn.",
    contentVi: "Bằng việc chế tạo buồng tối (camera obscura), thấu kính lồi lõm và nghiên cứu khúc xạ khí quyển, Ibn al-Haytham đã đặt nền móng vững chắc cho ngành quang học vật lý và quy trình nghiên cứu khoa học thực nghiệm hiện đại."
  },
  "the-incoherence-of-the-incoherence": {
    slug: "the-incoherence-of-the-incoherence",
    titleVi: "Sự phi lý của điều phi lý (Tahafut al-Tahafut)",
    authorVi: "Ibn Rushd (Averroes)",
    summaryVi: "Khảo luận triết học kiệt xuất của Averroes bảo vệ triết học duy lý Aristotle và phản bác tác phẩm bài bác triết học của nhà thần học Al-Ghazali.",
    contentVi: "Ibn Rushd chứng minh rằng việc khảo cứu triết học bằng lý trí không những không đi ngược lại kinh sách Hồi giáo mà còn là nghĩa vụ của người trí thức. Tác phẩm dịch sang tiếng Latinh đã tạo nên làn sóng chủ nghĩa Averroes làm thay đổi diện mạo tư tưởng châu Âu thời Phục hưng."
  },
  "popol-vuh": {
    slug: "popol-vuh",
    titleVi: "Sách Hội đồng Popol Vuh",
    authorVi: "Người K'iche' Maya",
    summaryVi: "Bản văn thiêng thần thoại lịch sử của người K'iche' Maya vùng cao nguyên Guatemala, thuật lại sự sáng thế thế giới, cuộc phiêu lưu của cặp Anh hùng Sinh đôi và nguồn gốc loài người từ hạt ngô.",
    contentVi: "Popol Vuh là tác phẩm văn học bản địa châu Mỹ cổ đại quan trọng nhất còn tồn tại, gìn giữ vũ trụ luận phong phú, các vị thần cõi âm Xibalba và lịch sử các dòng dõi quý tộc Maya trước cuộc xâm lăng của Tây Ban Nha."
  },
  "dresden-codex": {
    slug: "dresden-codex",
    titleVi: "Bộ bản thảo giải mã Dresden",
    authorVi: "Các tư tế thiên văn Maya",
    summaryVi: "Bản thảo vỏ cây sung gấp nếp cổ Maya gồm 74 trang chứa các bảng tính toán thiên văn chính xác kỳ diệu về chu kỳ sao Kim, nhật thực, nguyệt thực và lịch nghi lễ.",
    contentVi: "Hiện được lưu giữ tại Dresden (Đức), bản thảo là kiệt tác minh chứng cho trình độ toán học và thiên văn vô song của người Maya cổ, cho phép tiên đoán thời điểm xuất hiện của sao Kim với sai số chỉ vài phút trong hàng trăm năm."
  },
  "chilam-balam": {
    slug: "chilam-balam",
    titleVi: "Sách Chilam Balam",
    authorVi: "Các tư tế Chilam Balam xứ Yucatan",
    summaryVi: "Tập hợp các thủ bản cổ của người Maya xứ Yucatan viết bằng chữ cái Latin ghi chép lịch sử, thần thoại, y học cổ truyền và những lời sấm truyền tương lai.",
    contentVi: "Được đặt theo tên của vị pháp sư danh tiếng Chilam Balam, các tập sách (nổi tiếng nhất là bản Chumayel) phản ánh thế giới quan chu kỳ của người Maya và nỗ lực bảo tồn bản sắc văn hóa linh thiêng trước ách cai trị thuộc địa."
  },
  "astadhyayi": {
    slug: "astadhyayi",
    titleVi: "Tám chương (Ashtadhyayi)",
    authorVi: "Panini",
    summaryVi: "Chuyên khảo ngữ pháp tiếng Phạn gồm 8 chương với gần 4.000 quy tắc (sutra) do Panini biên soạn khoảng thế kỷ thứ 4 TCN tại Tây Bắc Ấn Độ.",
    contentVi: "Công trình ngôn ngữ học hình thức sinh sản hoàn chỉnh đầu tiên của nhân loại, sử dụng các siêu ngôn ngữ và ký hiệu đại số để mô tả ngữ âm, từ thái và cú pháp, ảnh hưởng sâu sắc đến ngôn ngữ học hiện đại của Ferdinand de Saussure và Noam Chomsky."
  },
  "hai-thuong-y-tong-tam-linh": {
    slug: "hai-thuong-y-tong-tam-linh",
    titleVi: "Hải Thượng y tông tâm lĩnh",
    authorVi: "Hải Thượng Lãn Ông Lê Hữu Trác",
    summaryVi: "Bộ bách khoa toàn thư y học cổ truyền đồ sộ nhất Việt Nam gồm 28 tập 66 quyển do Đại danh y Lê Hữu Trác biên soạn trong gần 30 năm miệt mài.",
    contentVi: "Tác phẩm kết tinh toàn bộ y lý, y pháp, y thuật, dược tễ và đặc biệt là y đức cao thượng của Hải Thượng Lãn Ông, vận dụng sáng tạo y học phương Đông vào thể chất và thổ nhưỡng khí hậu Việt Nam với phương châm 'Trị bệnh cứu người là nhiệm vụ thiêng liêng'."
  },
  "corpus-juris-civilis": {
    slug: "corpus-juris-civilis",
    titleVi: "Bộ Dân luật Pháp điển (Corpus Juris Civilis)",
    authorVi: "Hoàng đế Justinian I và Tribonian",
    summaryVi: "Đại công trình pháp điển hóa toàn bộ hệ thống luật La Mã gồm Codex, Digest, Institutes và Novellae dưới thời Hoàng đế Đông La Mã Justinian I.",
    contentVi: "Được biên soạn từ năm 529 đến 534 SCN, bộ pháp điển đã giải cứu các nguyên tắc pháp lý La Mã khỏi sự thất truyền, trở thành nguồn cảm hứng và cơ sở nền tảng trực tiếp cho Bộ luật Dân sự Napoleon (1804) và hệ thống Dân luật khắp thế giới ngày nay."
  },
  "al-qanun-al-masudi": {
    slug: "al-qanun-al-masudi",
    titleVi: "Định luật Mas'ud (Al-Qanun al-Mas'udi)",
    authorVi: "Abu Rayhan al-Biruni",
    summaryVi: "Bách khoa toàn thư thiên văn học và toán học đồ sộ của Al-Biruni dành tặng Quốc vương Mas'ud triều Ghaznavid, tổng kết và phát triển các bảng sao thiên văn.",
    contentVi: "Tác phẩm chứa đựng các phát kiến lượng giác vượt bậc, tính toán quỹ đạo hành tinh, độ nghiêng của hoàng đạo và nghiên cứu sự tự quay của Trái Đất quanh trục, là một trong những cột mốc thiên văn vĩ đại nhất thời Hoàng kim Hồi giáo."
  }
};
