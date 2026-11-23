import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { listIdeaSlugs } from "@/repositories/ideas";
import { getIdea } from "@/services/ideas";
import { BilingualEntityDetail } from "@/components/entity/BilingualEntityDetail";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listIdeaSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idea = await getIdea((await params).slug);
  if (!idea) return { title: "Idea not found" };
  const title = idea.titleVi ? `${idea.titleVi} (${idea.title})` : idea.title;
  return {
    title: `${title} | Human Civilization Atlas`,
    description: idea.summaryVi ?? idea.summary ?? `Explore the concept of ${idea.title}.`,
  };
}

export default async function IdeaPage({ params }: Props) {
  const idea = await getIdea((await params).slug);
  if (!idea) notFound();

  return (
    <BilingualEntityDetail
      backHref="/ideas"
      backTextEn="Philosophical & Scientific Ideas"
      backTextVi="Tư tưởng Triết học & Khoa học"
      tagEn={idea.category}
      tagVi={idea.categoryVi ?? idea.category}
      titleEn={idea.title}
      titleVi={idea.titleVi}
      summaryEn={idea.summary}
      summaryVi={idea.summaryVi}
      contentEn={idea.content}
      contentVi={idea.contentVi}
      overviewHeadingEn="Overview"
      overviewHeadingVi="Tổng quan"
      contentHeadingEn="Philosophical & Historical Discourse"
      contentHeadingVi="Luận giải Triết học & Ý nghĩa Lịch sử"
    >
      <RelationList relations={idea.relations} />
    </BilingualEntityDetail>
  );
}
