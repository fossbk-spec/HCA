import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatLifespanBilingual } from "@/lib/utils";
import { listPersonSlugs } from "@/repositories/people";
import { getPerson } from "@/services/people";
import { BilingualEntityDetail } from "@/components/entity/BilingualEntityDetail";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listPersonSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const person = await getPerson((await params).slug);
  if (!person) return { title: "Person not found" };
  const title = person.nameVi ? `${person.nameVi} (${person.name})` : person.name;
  return {
    title,
    description: person.summaryVi ?? person.summary ?? `Explore the life of ${person.name}.`,
  };
}

export default async function PersonPage({ params }: Props) {
  const person = await getPerson((await params).slug);
  if (!person) notFound();

  const lifespanEn = formatLifespanBilingual(person.birthYear, person.deathYear, false);
  const lifespanVi = formatLifespanBilingual(person.birthYear, person.deathYear, true);

  const civSubtitleEn = person.civilization ? (
    <span>
      {lifespanEn && <span className="block mb-1">{lifespanEn}</span>}
      {person.occupations && <span className="block font-medium text-amber-800 mb-1">{person.occupations}</span>}
      Civilization:{" "}
      <Link href={`/civilizations/${person.civilization.slug}`} className="font-semibold text-amber-800 hover:underline">
        {person.civilization.name}
      </Link>
    </span>
  ) : (
    <span>
      {lifespanEn && <span className="block mb-1">{lifespanEn}</span>}
      {person.occupations && <span className="block font-medium text-amber-800">{person.occupations}</span>}
    </span>
  );

  const civSubtitleVi = person.civilization ? (
    <span>
      {lifespanVi && <span className="block mb-1">{lifespanVi}</span>}
      {person.occupationsVi && <span className="block font-medium text-amber-800 mb-1">{person.occupationsVi}</span>}
      Nền văn minh:{" "}
      <Link href={`/civilizations/${person.civilization.slug}`} className="font-semibold text-amber-800 hover:underline">
        {person.civilization.nameVi ?? person.civilization.name}
      </Link>
    </span>
  ) : (
    <span>
      {lifespanVi && <span className="block mb-1">{lifespanVi}</span>}
      {person.occupationsVi && <span className="block font-medium text-amber-800">{person.occupationsVi}</span>}
    </span>
  );

  return (
    <BilingualEntityDetail
      backHref="/people"
      backTextEn="Historical Figures"
      backTextVi="Danh nhân Lịch sử"
      tagEn={person.occupations ?? "Historical Figure"}
      tagVi={person.occupationsVi ?? "Danh nhân Lịch sử"}
      titleEn={person.name}
      titleVi={person.nameVi}
      subtitleEn={civSubtitleEn}
      subtitleVi={civSubtitleVi}
      summaryEn={person.summary}
      summaryVi={person.summaryVi}
      contentEn={person.content}
      contentVi={person.contentVi}
      overviewHeadingEn="Overview"
      overviewHeadingVi="Tổng quan"
      contentHeadingEn="Life, Deeds & Historical Impact"
      contentHeadingVi="Cuộc đời, Sự nghiệp & Tầm ảnh hưởng Lịch sử"
    >
      <RelationList relations={person.relations} />
    </BilingualEntityDetail>
  );
}
