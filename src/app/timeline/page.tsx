import type { Metadata } from "next";
import { TimelineExplorer } from "@/components/timeline/TimelineExplorer";
import { EpochSectionHeader, EpochNav } from "@/components/timeline/EpochSectionHeader";
import { PageHeader } from "@/components/layout/PageHeader";
import { getTimelineGroups } from "@/services/timeline";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Timeline Explorer | Dòng thời gian Lịch sử",
  description: "Explore the events and civilizations that shaped human history. Khám phá các sự kiện và nền văn minh định hình lịch sử nhân loại.",
};

export default async function TimelinePage() {
  const groups = await getTimelineGroups();
  const epochsList = groups.map((g) => g.epoch);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Explore history"
        badgeVi="Khám phá lịch sử"
        titleEn="Timeline Explorer"
        titleVi="Khám phá Dòng thời gian"
        descriptionEn="Move through the ages and select a milestone to learn more."
        descriptionVi="Du hành qua các thời đại lịch sử và chọn từng cột mốc để tìm hiểu chi tiết."
      />

      <EpochNav epochsList={epochsList} />

      <div className="mt-12 space-y-16">
        {groups.map(({ epoch, items }) => (
          <section key={epoch.id} id={epoch.id} aria-labelledby={`${epoch.id}-heading`} className="scroll-mt-8">
            <EpochSectionHeader epoch={epoch} />
            {items.length > 0 ? (
              <TimelineExplorer items={items} />
            ) : (
              <p className="text-slate-500">No entries for this phase yet. / Chưa có mục nào cho giai đoạn này.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
