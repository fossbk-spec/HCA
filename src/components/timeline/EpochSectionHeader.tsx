"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Epoch } from "@/lib/epochs";

export function EpochSectionHeader({ epoch }: { epoch: Epoch }) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <div className="mb-8">
      <h2 id={`${epoch.id}-heading`} className="text-3xl font-bold text-slate-900">
        {isVi ? epoch.labelVi : epoch.label}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {isVi ? epoch.rangeLabelVi : epoch.rangeLabel}
      </p>
      <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
        {isVi ? epoch.descriptionVi : epoch.description}
      </p>
    </div>
  );
}

export function EpochNav({ epochsList }: { epochsList: readonly Epoch[] }) {
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <nav aria-label="Epoch navigation" className="mt-10 flex gap-3 overflow-x-auto pb-3">
      {epochsList.map((epoch) => (
        <a
          key={epoch.id}
          href={`#${epoch.id}`}
          className="shrink-0 rounded-full border border-stone-300 px-4 py-2 font-medium text-slate-800 hover:border-amber-600 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          {isVi ? epoch.labelVi : epoch.label}
        </a>
      ))}
    </nav>
  );
}
