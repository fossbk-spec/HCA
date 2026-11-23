import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatYear } from "@/lib/utils";
import { listEventSlugs } from "@/repositories/events";
import { getEvent } from "@/services/events";
import { BilingualEntityDetail } from "@/components/entity/BilingualEntityDetail";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  if (!event) return { title: "Event not found" };
  const title = event.titleVi ? `${event.titleVi} (${event.title})` : event.title;
  return {
    title: `${title} | Human Civilization Atlas`,
    description: event.summaryVi ?? event.summary ?? `Historical record of ${event.title}.`,
  };
}

function formatEventYears(start: number | null, end: number | null, isVi = false): string {
  const yearText = (y: number) => {
    if (!isVi) return formatYear(y);
    return y < 0 ? `${Math.abs(y)} TCN` : `${y} SCN`;
  };
  if (start === null && end === null) return isVi ? "Chưa rõ thời gian" : "Date unknown";
  if (start !== null && end !== null && start === end) return yearText(start);
  if (start !== null && end !== null) return `${yearText(start)} – ${yearText(end)}`;
  if (start !== null) return isVi ? `Từ năm ${yearText(start)}` : `From ${formatYear(start)}`;
  return isVi ? `Đến năm ${yearText(end!)}` : `Until ${formatYear(end!)}`;
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  return (
    <BilingualEntityDetail
      backHref="/events"
      backTextEn="Historical Events"
      backTextVi="Sự kiện Lịch sử"
      tagEn={formatEventYears(event.startYear, event.endYear, false)}
      tagVi={formatEventYears(event.startYear, event.endYear, true)}
      titleEn={event.title}
      titleVi={event.titleVi}
      summaryEn={event.summary}
      summaryVi={event.summaryVi}
      contentEn={event.content}
      contentVi={event.contentVi}
      overviewHeadingEn="Historical Summary"
      overviewHeadingVi="Tóm tắt Lịch sử"
      contentHeadingEn="Historical Narrative & Consequences"
      contentHeadingVi="Diễn biến Lịch sử & Hệ quả Thời đại"
    >
      <RelationList relations={event.relations} />
    </BilingualEntityDetail>
  );
}
