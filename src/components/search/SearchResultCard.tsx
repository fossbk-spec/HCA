"use client";

import Link from "next/link";
import { entityHref } from "@/lib/routes";
import type { SearchResult } from "@/repositories/search";
import { useLanguage } from "@/context/LanguageContext";

const typeLabelsVi: Record<string, string> = {
  CIVILIZATION: "Nền văn minh",
  PERSON: "Nhân vật",
  EVENT: "Sự kiện",
  IDEA: "Tư tưởng",
  BOOK: "Tác phẩm",
};

export function SearchResultCard({ result, labelEn }: { result: SearchResult; labelEn: string }) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const title = isVi && result.titleVi ? result.titleVi : result.title;
  const originalTitle = isVi && result.titleVi && result.titleVi !== result.title ? result.title : null;
  const subtitle = isVi && result.subtitleVi ? result.subtitleVi : result.subtitle;
  const snippet = isVi && result.snippetVi ? result.snippetVi : result.snippet;
  const typeLabel = isVi ? typeLabelsVi[result.type] ?? labelEn : labelEn;

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-300">
      <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">{typeLabel}</span>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        <Link href={entityHref(result.type, result.slug)} className="hover:text-amber-800 hover:underline focus-visible:underline">
          {title}
        </Link>
        {originalTitle && <span className="block text-xs font-normal text-slate-400 mt-0.5">{originalTitle}</span>}
      </h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      {snippet && <p className="mt-3 text-sm leading-6 text-slate-600">{snippet}</p>}
    </li>
  );
}
