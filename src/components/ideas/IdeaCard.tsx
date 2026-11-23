"use client";

import Link from "next/link";
import type { Idea } from "@/repositories/ideas";
import { useLanguage } from "@/context/LanguageContext";

export function IdeaCard({ idea }: { idea: Idea }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  const title = isVi && idea.titleVi ? idea.titleVi : idea.title;
  const originalTitle = isVi && idea.titleVi && idea.titleVi !== idea.title ? idea.title : null;
  const summary = isVi && idea.summaryVi ? idea.summaryVi : idea.summary;
  const category = isVi && idea.categoryVi ? idea.categoryVi : idea.category;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md hover:border-amber-300">
      <div>
        {category && (
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            {category}
          </p>
        )}
        <h3 className="mt-2 text-xl font-bold text-slate-900">
          <Link
            href={`/ideas/${idea.slug}`}
            className="hover:text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-amber-600"
          >
            {title}
          </Link>
          {originalTitle && <span className="block text-xs font-normal text-slate-400 mt-0.5">{originalTitle}</span>}
        </h3>
        {summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{summary}</p>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-stone-100">
        <Link
          href={`/ideas/${idea.slug}`}
          className="text-sm font-semibold text-amber-800 hover:text-amber-900 hover:underline"
        >
          {t("Explore idea →", "Khám phá tư tưởng →")}
        </Link>
      </div>
    </article>
  );
}
