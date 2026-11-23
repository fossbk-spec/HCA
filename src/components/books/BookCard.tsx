"use client";

import Link from "next/link";
import { formatYear } from "@/lib/utils";
import type { Book } from "@/repositories/books";
import { useLanguage } from "@/context/LanguageContext";

export function BookCard({ book }: { book: Book }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const formatBookYear = (year: number | null): string => {
    if (year === null) return t("Ancient Era", "Thời Cổ đại");
    if (!isVi) return `c. ${formatYear(year)}`;
    return year < 0 ? `Khoảng ${Math.abs(year)} TCN` : `Khoảng năm ${year} SCN`;
  };

  const title = isVi && book.titleVi ? book.titleVi : book.title;
  const originalTitle = isVi && book.titleVi && book.titleVi !== book.title ? book.title : null;
  const author = isVi && book.authorVi ? book.authorVi : book.author;
  const summary = isVi && book.summaryVi ? book.summaryVi : book.summary;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md hover:border-amber-300">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          {formatBookYear(book.publicationYear)}
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">
          <Link
            href={`/books/${book.slug}`}
            className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
          >
            {title}
          </Link>
          {originalTitle && <span className="block text-xs font-normal text-slate-400 mt-0.5">{originalTitle}</span>}
        </h2>
        {author && (
          <p className="mt-1 text-sm font-medium text-slate-600">
            {t("By", "Tác giả:")} <span className="text-amber-900">{author}</span>
          </p>
        )}
        {summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-stone-100">
        <Link
          href={`/books/${book.slug}`}
          className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
        >
          {t("Read more →", "Đọc chi tiết tác phẩm →")}
        </Link>
      </div>
    </article>
  );
}
