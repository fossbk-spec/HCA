import type { Metadata } from "next";
import { ChatClient } from "@/components/chat/ChatClient";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "AI Historical Companion | Trợ lý AI Khám phá Lịch sử",
  description:
    "Interactive AI Historical Companion grounded in 292 verified entities and 276 relationships across the Human Civilization Atlas.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Interactive AI"
        badgeVi="Trí tuệ Nhân tạo Tương tác"
        titleEn="AI Historical Companion"
        titleVi="Trợ lý AI Khám phá Lịch sử"
        descriptionEn="Converse with an AI guide grounded in the 292 entities and 276 relationships of the Human Civilization Atlas. Compare thinkers, explore world epics, and trace global legacies."
        descriptionVi="Trò chuyện với hướng dẫn viên AI thông minh dựa trên 292 thực thể và 276 mối liên kết của Bản đồ Văn minh. So sánh các nhà tư tưởng, đối chiếu sử thi thế giới và khám phá di sản nhân loại."
      />

      <div className="mt-8">
        <ChatClient />
      </div>
    </div>
  );
}
