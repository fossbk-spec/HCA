"use client";

import { useLanguage } from "@/context/LanguageContext";

export function PageHeader({
  badgeEn,
  badgeVi,
  titleEn,
  titleVi,
  descriptionEn,
  descriptionVi,
}: {
  badgeEn?: string;
  badgeVi?: string;
  titleEn: string;
  titleVi: string;
  descriptionEn?: string;
  descriptionVi?: string;
}) {
  const { t } = useLanguage();

  return (
    <header className="max-w-3xl border-b border-stone-200 pb-8">
      {badgeEn && (
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
          {t(badgeEn, badgeVi ?? badgeEn)}
        </p>
      )}
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {t(titleEn, titleVi)}
      </h1>
      {descriptionEn && (
        <p className="mt-4 text-lg text-slate-600">
          {t(descriptionEn, descriptionVi ?? descriptionEn)}
        </p>
      )}
    </header>
  );
}
