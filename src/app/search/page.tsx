import type { Metadata } from "next";
import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { searchTypes, type SearchType } from "@/repositories/search";
import { search, searchLabels } from "@/services/search";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Search | Tìm kiếm - Human Civilization Atlas",
  description: "Find civilizations, people, events, ideas, and books. Tìm kiếm các nền văn minh, nhân vật, sự kiện, tư tưởng và tác phẩm.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const { q = "", type } = await searchParams;
  const activeType = searchTypes.includes(type as SearchType) ? (type as SearchType) : undefined;
  const { query, message, total, groups } = await search({ q, types: activeType ? [activeType] : undefined });
  const filterHref = (selected?: SearchType) =>
    `/search?q=${encodeURIComponent(query)}${selected ? `&type=${selected}` : ""}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Explore history"
        badgeVi="Khám phá lịch sử"
        titleEn="Search the Atlas"
        titleVi="Tìm kiếm trong Atlas"
        descriptionEn="Find civilizations, people, events, ideas, and books across world history."
        descriptionVi="Tra cứu các nền văn minh, danh nhân, sự kiện, tư tưởng và trước tác kinh điển."
      />

      <div className="mt-8 max-w-3xl">
        <SearchBox id="page-search" defaultValue={q} />
      </div>

      <nav aria-label="Filter results by type" className="mt-8 flex flex-wrap gap-2">
        <Link
          href={filterHref()}
          aria-current={!activeType ? "page" : undefined}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            !activeType ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All / Tất cả
        </Link>
        {searchTypes.map((item) => (
          <Link
            key={item}
            href={filterHref(item)}
            aria-current={activeType === item ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeType === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {searchLabels[item]}
          </Link>
        ))}
      </nav>

      {message ? (
        <p className="mt-10 text-slate-600">
          {message === "QUERY_TOO_SHORT"
            ? "Enter at least 2 characters to search. / Hãy nhập ít nhất 2 ký tự để tìm kiếm."
            : "Use a query of 100 characters or fewer. / Vui lòng nhập từ khóa dưới 100 ký tự."}
        </p>
      ) : total === 0 ? (
        <div className="mt-10 text-slate-600">
          <p>No results for “{query}” / Không tìm thấy kết quả nào cho “{query}”.</p>
          <p className="mt-2 text-sm text-slate-500">
            Try a shorter name, another spelling, or a different type. / Thử tìm với từ khóa ngắn hơn hoặc danh mục khác.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          <p className="text-slate-600 font-medium">
            {total} {total === 1 ? "result" : "results"} (kết quả) for “{query}”
          </p>
          {groups
            .filter((group) => group.count > 0)
            .map((group) => (
              <section key={group.type} aria-labelledby={`results-${group.type}`}>
                <h2 id={`results-${group.type}`} className="mb-5 text-2xl font-bold text-slate-900">
                  {group.label} ({group.count})
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {group.results.map((result) => (
                    <SearchResultCard
                      key={`${result.type}-${result.slug}`}
                      result={result}
                      labelEn={searchLabels[result.type]}
                    />
                  ))}
                </ul>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}
