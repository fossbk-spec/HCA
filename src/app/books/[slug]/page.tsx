import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelationList } from "@/components/entity/RelationList";
import { formatYear } from "@/lib/utils";
import { listBookSlugs } from "@/repositories/books";
import { getBook } from "@/services/books";
import { BilingualEntityDetail } from "@/components/entity/BilingualEntityDetail";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listBookSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook((await params).slug);
  if (!book) return { title: "Book not found" };
  const title = book.titleVi ? `${book.titleVi} (${book.title})` : book.title;
  return {
    title: `${title} | Human Civilization Atlas`,
    description: book.summaryVi ?? book.summary ?? `Explore the classic work ${book.title}.`,
  };
}

function formatBookTag(year: number | null, isVi = false) {
  if (year === null) return isVi ? "Tác phẩm Cổ điển" : "Classic Work";
  const yearText = (y: number) => {
    if (!isVi) return formatYear(y);
    return y < 0 ? `${Math.abs(y)} TCN` : `${y} SCN`;
  };
  return isVi ? `Xuất bản khoảng năm ${yearText(year)}` : `Published c. ${formatYear(year)}`;
}

export default async function BookPage({ params }: Props) {
  const book = await getBook((await params).slug);
  if (!book) notFound();

  const authorSubtitleEn = book.author ? (
    <span>
      Author: <span className="font-semibold text-amber-900">{book.author}</span>
    </span>
  ) : null;

  const authorSubtitleVi = (book.authorVi ?? book.author) ? (
    <span>
      Tác giả: <span className="font-semibold text-amber-900">{book.authorVi ?? book.author}</span>
    </span>
  ) : null;

  return (
    <BilingualEntityDetail
      backHref="/books"
      backTextEn="Classic Books"
      backTextVi="Tác phẩm Kinh điển"
      tagEn={formatBookTag(book.publicationYear, false)}
      tagVi={formatBookTag(book.publicationYear, true)}
      titleEn={book.title}
      titleVi={book.titleVi}
      subtitleEn={authorSubtitleEn}
      subtitleVi={authorSubtitleVi}
      summaryEn={book.summary}
      summaryVi={book.summaryVi}
      contentEn={book.content}
      contentVi={book.contentVi}
      overviewHeadingEn="Overview"
      overviewHeadingVi="Tổng quan"
      contentHeadingEn="Content and Historical Significance"
      contentHeadingVi="Nội dung và Giá trị Lịch sử Thời đại"
    >
      <RelationList relations={book.relations} />
    </BilingualEntityDetail>
  );
}
