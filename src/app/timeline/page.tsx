import type { Metadata } from "next";
import { TimelineInteractiveContainer } from "@/components/timeline/TimelineInteractiveContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { getTimelinePageData } from "@/services/timeline";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Timeline Explorer | Dòng thời gian Văn minh Tương tác",
  description:
    "Interactive journey across human history - explore epochs, civilizations, and turning-point events with zoomable views and dynamic filters.",
};

export default async function TimelinePage() {
  const { groups, civilizations } = await getTimelinePageData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Explore history"
        badgeVi="Khám phá lịch sử"
        titleEn="Interactive Civilization Timeline"
        titleVi="Dòng thời gian Văn minh Tương tác"
        descriptionEn="Move through the ages from the dawn of humanity to the AI era. Filter by epoch, civilization, or zoom into specific milestones."
        descriptionVi="Du hành qua các thời đại từ buổi bình minh của nhân loại đến kỷ nguyên AI. Lọc theo kỷ nguyên, nền văn minh, hoặc phóng to/thu nhỏ dải thời gian theo nhu cầu."
      />

      <div className="mt-8">
        <TimelineInteractiveContainer
          groups={groups}
          civilizations={civilizations}
        />
      </div>
    </div>
  );
}
