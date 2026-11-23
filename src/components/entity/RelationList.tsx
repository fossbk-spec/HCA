"use client";

import Link from "next/link";
import { entityHref } from "@/lib/routes";
import type { RelationGroup } from "@/types/relationships";
import { useLanguage } from "@/context/LanguageContext";

export function RelationList({ relations }: { relations: RelationGroup[] }) {
  const { language, t } = useLanguage();
  const isVi = language === "vi";

  if (relations.length === 0) return null;

  return (
    <section aria-labelledby="connections-heading" className="mt-10">
      <h2 id="connections-heading" className="text-2xl font-bold text-slate-900">
        {t("Connections", "Mối liên kết Lịch sử")}
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {relations.map(({ label, labelVi, relations: items }) => (
          <div key={label} className="rounded-xl border border-stone-200 p-5 bg-stone-50/50">
            <h3 className="font-semibold capitalize text-slate-800 flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500" />
              {isVi && labelVi ? labelVi : label}
            </h3>
            <ul className="mt-3 space-y-2">
              {items.map(({ other }) => {
                const title = isVi && other.titleVi ? other.titleVi : other.title;
                const originalTitle = isVi && other.titleVi && other.titleVi !== other.title ? other.title : null;

                return (
                  <li key={`${other.type}:${other.slug}`}>
                    <Link
                      href={entityHref(other.type, other.slug)}
                      className="text-amber-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 font-medium"
                    >
                      {title}
                    </Link>
                    {originalTitle && (
                      <span className="ml-1.5 text-xs text-slate-400">({originalTitle})</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
