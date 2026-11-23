import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { listAllEvents } from "@/services/events";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Historical Events | Sự kiện Lịch sử",
  description: "Chronological catalog of transformative events, turning points, and battles in world history.",
};

export default async function EventsPage() {
  const events = await listAllEvents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Historical Chronology"
        badgeVi="Biên niên Sử học"
        titleEn="Transformative Historical Events"
        titleVi="Những Sự kiện Lịch sử Bước ngoặt"
        descriptionEn={`Chronological record of ${events.length} decisive moments—revolutions, military triumphs, edicts, reforms, and cultural turning points.`}
        descriptionVi={`Hồ sơ biên niên gồm ${events.length} thời khắc quyết định—những cuộc cách mạng, chiến thắng quân sự, đạo luật, cải cách và bước ngoặt văn hóa.`}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
