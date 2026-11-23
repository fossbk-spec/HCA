import type { Metadata } from "next";
import { searchTypes, type SearchType } from "@/repositories/search";
import { getEgoGraph } from "@/services/graph";
import { GraphClientView } from "@/components/graph/GraphClientView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Knowledge Graph | Sơ đồ Tri thức Liên kết",
  description: "Interactive visual network of human civilization - explore connections between people, ideas, books, events, and civilizations.",
};

const starterGroups = [
  {
    groupEn: "Đại Việt & Southeast Asian Heritage",
    groupVi: "Di sản Văn hiến Đại Việt & Đông Nam Á",
    items: [
      {
        type: "PERSON" as SearchType,
        slug: "tran-hung-dao",
        titleEn: "Trần Hưng Đạo",
        titleVi: "Trần Hưng Đạo",
        descEn: "Supreme commander during the Mongol invasions of Đại Việt; authored Hịch tướng sĩ.",
        descVi: "Tiết chế Quốc công chỉ huy đánh tan 3 cuộc xâm lược Nguyên Mông; tác giả Hịch tướng sĩ.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "nguyen-trai",
        titleEn: "Nguyễn Trãi",
        titleVi: "Nguyễn Trãi",
        descEn: "Scholar, strategist, and statesman of the Lam Sơn uprising; author of Bình Ngô đại cáo.",
        descVi: "Khai quốc công thần nhà Hậu Lê, danh nhân văn hóa thế giới, tác giả Bình Ngô đại cáo.",
      },
      {
        type: "BOOK" as SearchType,
        slug: "binh-ngo-dai-cao",
        titleEn: "Bình Ngô đại cáo",
        titleVi: "Bình Ngô đại cáo",
        descEn: "Declaration of victory over the Ming Dynasty; regarded as Đại Việt's second declaration of independence.",
        descVi: "Áng thiên cổ hùng văn tuyên ngôn độc lập, khẳng định chủ quyền và nền văn hiến của Đại Việt.",
      },
      {
        type: "CIVILIZATION" as SearchType,
        slug: "dai-viet",
        titleEn: "Đại Việt",
        titleVi: "Đại Việt",
        descEn: "Sovereign civilization of the Red River Delta with an enduring legacy of independence and statecraft.",
        descVi: "Nền văn hiến rực rỡ vùng châu thổ sông Hồng với bản sắc tự chủ kiên cường và nền quản trị quy củ.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "ly-thai-to",
        titleEn: "Lý Thái Tổ",
        titleVi: "Lý Thái Tổ",
        descEn: "Founder of the Lý dynasty who relocated the capital to Thăng Long in 1010.",
        descVi: "Vị vua sáng lập triều Lý, người ban Chiếu dời đô về Thăng Long năm 1010.",
      },
      {
        type: "BOOK" as SearchType,
        slug: "nam-quoc-son-ha",
        titleEn: "Nam quốc sơn hà",
        titleVi: "Nam quốc sơn hà",
        descEn: "Poetic declaration of sovereignty attributed to Lý Thường Kiệt along the Như Nguyệt River.",
        descVi: "Bản tuyên ngôn độc lập đầu tiên khẳng định chủ quyền lãnh thổ trên sông Như Nguyệt.",
      },
    ],
  },
  {
    groupEn: "Classical Antiquity & Western Thought",
    groupVi: "Cổ đại Hy Lạp - La Mã & Tư tưởng Phương Tây",
    items: [
      {
        type: "PERSON" as SearchType,
        slug: "plato",
        titleEn: "Plato",
        titleVi: "Plato",
        descEn: "Classical Athenian philosopher, student of Socrates, teacher of Aristotle, and founder of the Academy.",
        descVi: "Nhà triết học Athens cổ đại, học trò Socrates, thầy của Aristotle, người sáng lập Học viện Academy.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "aristotle",
        titleEn: "Aristotle",
        titleVi: "Aristotle",
        descEn: "Polymath and philosopher whose writings spanned logic, natural science, ethics, and politics.",
        descVi: "Nhà bách khoa toàn thư Hy Lạp cổ đại đặt nền móng cho luận lý học, khoa học tự nhiên và chính trị.",
      },
      {
        type: "IDEA" as SearchType,
        slug: "democracy",
        titleEn: "Democracy",
        titleVi: "Dân chủ",
        descEn: "System of government where citizens hold political power, pioneered in classical Athens.",
        descVi: "Hệ thống thể chế chính trị trao quyền lực cho công dân, khởi nguồn từ Athens cổ đại.",
      },
      {
        type: "BOOK" as SearchType,
        slug: "the-republic",
        titleEn: "The Republic",
        titleVi: "Cộng hòa",
        descEn: "Plato's foundational dialogue on justice, the philosopher-king, and the ideal state.",
        descVi: "Tác phẩm đối thoại nền tảng của Plato về công lý, vua hiền triết và trật tự nhà nước lý tưởng.",
      },
      {
        type: "CIVILIZATION" as SearchType,
        slug: "ancient-greece",
        titleEn: "Ancient Greece",
        titleVi: "Hy Lạp Cổ đại",
        descEn: "Mediterranean civilization that laid the bedrock of Western philosophy, arts, and science.",
        descVi: "Cái nôi văn minh Địa Trung Hải đặt nền móng cho triết học, nghệ thuật và khoa học phương Tây.",
      },
      {
        type: "EVENT" as SearchType,
        slug: "founding-of-platos-academy",
        titleEn: "Founding of Plato's Academy",
        titleVi: "Thành lập Học viện Plato",
        descEn: "The establishment of an institution for philosophical inquiry and mathematical research.",
        descVi: "Sự ra đời của học viện nghiên cứu triết học và toán học danh tiếng bậc nhất thế giới cổ đại.",
      },
    ],
  },
  {
    groupEn: "Eastern Philosophy & Ancient China",
    groupVi: "Triết học Phương Đông & Văn minh Trung Hoa Cổ đại",
    items: [
      {
        type: "PERSON" as SearchType,
        slug: "confucius",
        titleEn: "Confucius",
        titleVi: "Khổng Tử",
        descEn: "Teacher, philosopher, and political theorist whose ethics shaped East Asian civilization.",
        descVi: "Nhà tư tưởng và giáo dục vĩ đại, người đặt nền móng cho Nho giáo ảnh hưởng toàn Đông Á.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "laozi",
        titleEn: "Laozi",
        titleVi: "Lão Tử",
        descEn: "Ancient philosopher and traditionally regarded author of the Daodejing, founder of philosophical Daoism.",
        descVi: "Triết gia huyền thoại sáng lập Đạo gia, tương truyền là tác giả Đạo Đức Kinh.",
      },
      {
        type: "IDEA" as SearchType,
        slug: "confucianism",
        titleEn: "Confucianism",
        titleVi: "Nho giáo",
        descEn: "Ethical and philosophical tradition emphasizing moral character, filial piety, and harmonious governance.",
        descVi: "Hệ thống đạo đức chính trị đề cao nhân nghĩa, lễ trị, đạo hiếu và sự hài hòa xã hội.",
      },
      {
        type: "BOOK" as SearchType,
        slug: "analects",
        titleEn: "Analects",
        titleVi: "Luận ngữ",
        descEn: "Compilation of sayings, ideas, and dialogues attributed to Confucius and his disciples.",
        descVi: "Tập hợp các lời dạy, đối thoại giữa Khổng Tử và môn đệ ghi chép lại tư tưởng Nho học.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "qin-shi-huang",
        titleEn: "Qin Shi Huang",
        titleVi: "Tần Thủy Hoàng",
        descEn: "First emperor of a unified China who standardized writing, currency, and measurements.",
        descVi: "Hoàng đế thống nhất Trung Hoa, chuẩn hóa chữ viết, tiền tệ, đo lường và dựng Vạn Lý Trường Thành.",
      },
      {
        type: "CIVILIZATION" as SearchType,
        slug: "ancient-china",
        titleEn: "Ancient China",
        titleVi: "Trung Hoa Cổ đại",
        descEn: "One of the world's oldest continuous civilizations, developing along the Yellow and Yangtze rivers.",
        descVi: "Một trong những nền văn minh liên tục cổ xưa nhất, hình thành ven lưu vực Hoàng Hà và Trường Giang.",
      },
    ],
  },
  {
    groupEn: "Cradle of Civilizations & Islamic Golden Age",
    groupVi: "Cái nôi Lưỡng Hà - Ai Cập & Kỷ nguyên Vàng Hồi giáo",
    items: [
      {
        type: "PERSON" as SearchType,
        slug: "hammurabi",
        titleEn: "Hammurabi",
        titleVi: "Hammurabi",
        descEn: "Sixth king of the First Babylonian Dynasty renowned for issuing one of history's earliest law codes.",
        descVi: "Vị vua thứ sáu của Vương triều Babylon thứ nhất, nổi tiếng với bộ luật cổ sớm nhất lịch sử.",
      },
      {
        type: "PERSON" as SearchType,
        slug: "al-khwarizmi",
        titleEn: "Al-Khwarizmi",
        titleVi: "Al-Khwarizmi",
        descEn: "Polymath of the House of Wisdom whose works introduced algebra and Hindu-Arabic numerals to the West.",
        descVi: "Nhà toán học kiệt xuất thời Kỷ nguyên Vàng Hồi giáo, cha đẻ của môn đại số và thuật toán.",
      },
      {
        type: "BOOK" as SearchType,
        slug: "epic-of-gilgamesh",
        titleEn: "Epic of Gilgamesh",
        titleVi: "Sử thi Gilgamesh",
        descEn: "Literary masterpiece of ancient Mesopotamia exploring mortality, companionship, and the human condition.",
        descVi: "Kiệt tác văn học cổ xưa nhất của nhân loại ghi trên đất sét vùng Lưỡng Hà.",
      },
      {
        type: "CIVILIZATION" as SearchType,
        slug: "islamic-golden-age",
        titleEn: "Islamic Golden Age",
        titleVi: "Thời kỳ Hoàng kim Hồi giáo",
        descEn: "Era of scientific, economic, and cultural flourishing spanning from the 8th to 14th centuries.",
        descVi: "Thời kỳ phát triển rực rỡ của khoa học, triết học và y học từ thế kỷ VIII đến XIV.",
      },
      {
        type: "IDEA" as SearchType,
        slug: "buddhism",
        titleEn: "Buddhism",
        titleVi: "Phật giáo",
        descEn: "Spiritual and philosophical tradition founded in ancient India by Siddhartha Gautama.",
        descVi: "Hệ thống triết học và tâm linh khởi nguồn tại Ấn Độ cổ đại bởi Đức Phật Thích Ca Mâu Ni.",
      },
      {
        type: "CIVILIZATION" as SearchType,
        slug: "ancient-egypt",
        titleEn: "Ancient Egypt",
        titleVi: "Ai Cập Cổ đại",
        descEn: "Nile Valley civilization noted for monumental pyramids, hieroglyphic writing, and intricate burial customs.",
        descVi: "Nền văn minh rực rỡ dọc sông Nile với các kim tự tháp vĩ đại và hệ thống chữ tượng hình bí ẩn.",
      },
    ],
  },
];

export default async function GraphPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; slug?: string }>;
}) {
  const { type, slug } = await searchParams;
  const validType = searchTypes.includes(type as SearchType)
    ? (type as SearchType)
    : null;

  const isQueryRequested = Boolean(type && slug);
  const graph = validType && slug ? await getEgoGraph(validType, slug) : null;
  const notFound = isQueryRequested && !graph;

  return (
    <GraphClientView
      graph={graph}
      notFound={notFound}
      starterGroups={starterGroups}
    />
  );
}
