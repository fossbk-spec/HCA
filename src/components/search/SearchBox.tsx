"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function SearchBox({ className, defaultValue, id = "home-search" }: { className?: string; defaultValue?: string; id?: string }) {
  const { t } = useLanguage();

  return (
    <form action="/search" method="GET" role="search" className={cn("flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-slate-950/10", className)}>
      <Search className="ml-3 shrink-0 text-slate-500" size={20} aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {t("Search civilizations, people, events, ideas, and books", "Tìm kiếm nền văn minh, danh nhân, sự kiện, tư tưởng và tác phẩm")}
      </label>
      <input
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={t(
          "Search civilizations, people, events, ideas, books...",
          "Tìm kiếm văn minh, danh nhân, sự kiện, tư tưởng, tác phẩm..."
        )}
        className="min-w-0 flex-1 px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 sm:text-base"
      />
      <Button type="submit" className="shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
        {t("Search", "Tìm kiếm")}
      </Button>
    </form>
  );
}
