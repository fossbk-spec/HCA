import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatYear } from "@/lib/utils";
import { listCivilizationSlugs } from "@/repositories/civilizations";
import { getCivilization } from "@/services/civilizations";
import { BilingualEntityDetail } from "@/components/entity/BilingualEntityDetail";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listCivilizationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const civilization = await getCivilization((await params).slug);
  if (!civilization) return { title: "Civilization not found" };
  const title = civilization.nameVi ? `${civilization.nameVi} (${civilization.name})` : civilization.name;
  return {
    title,
    description: civilization.summaryVi ?? civilization.summary ?? `Explore the history of ${civilization.name}.`,
  };
}

function period(start: number | null, end: number | null, isVi = false) {
  const yearText = (y: number) => {
    if (!isVi) return formatYear(y);
    return y < 0 ? `${Math.abs(y)} TCN` : `${y} SCN`;
  };
  if (start === null && end === null) return isVi ? "Chưa rõ niên đại" : "Period unknown";
  if (start === null) return isVi ? `Đến năm ${yearText(end!)}` : `Until ${formatYear(end!)}`;
  if (end === null) return isVi ? `Từ năm ${yearText(start)}` : `From ${formatYear(start)}`;
  return isVi ? `Từ năm ${yearText(start)} đến năm ${yearText(end)}` : `${formatYear(start)} to ${formatYear(end)}`;
}

export default async function CivilizationPage({ params }: Props) {
  const civilization = await getCivilization((await params).slug);
  if (!civilization) notFound();

  return (
    <BilingualEntityDetail
      backHref="/civilizations"
      backTextEn="Civilization Atlas"
      backTextVi="Bản đồ Văn minh"
      tagEn={civilization.region ?? "World history"}
      tagVi={civilization.regionVi ?? civilization.region ?? "Lịch sử thế giới"}
      titleEn={civilization.name}
      titleVi={civilization.nameVi}
      subtitleEn={period(civilization.periodStart, civilization.periodEnd, false)}
      subtitleVi={period(civilization.periodStart, civilization.periodEnd, true)}
      summaryEn={civilization.summary}
      summaryVi={civilization.summaryVi}
      contentEn={civilization.content}
      contentVi={civilization.contentVi}
      overviewHeadingEn="Overview"
      overviewHeadingVi="Tổng quan"
      contentHeadingEn="History, Society & Legacy"
      contentHeadingVi="Lịch sử, Xã hội & Di sản"
    >
      {civilization.people.length > 0 && (
        <section aria-labelledby="people-heading" className="mt-10">
          <h2 id="people-heading" className="text-2xl font-bold text-slate-900">
            Notable People / Nhân vật Tiêu biểu
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {civilization.people.map((person) => (
              <Link
                key={person.slug}
                href={`/people/${person.slug}`}
                className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs hover:border-amber-400 hover:shadow-sm"
              >
                <span className="font-semibold text-slate-900">{person.nameVi ?? person.name}</span>
                {person.nameVi && person.nameVi !== person.name && (
                  <span className="block text-xs text-slate-400">{person.name}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </BilingualEntityDetail>
  );
}
