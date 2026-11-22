import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBox({ className }: { className?: string }) {
  return <form action="/search" method="GET" role="search" className={cn("flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-slate-950/10", className)}>
    <Search className="ml-3 shrink-0 text-slate-500" size={20} aria-hidden="true" />
    <label htmlFor="home-search" className="sr-only">Search civilizations, people, books, and ideas</label>
    <input id="home-search" name="q" type="search" placeholder="Search civilizations, people, books, ideas..." className="min-w-0 flex-1 px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 sm:text-base" />
    <Button type="submit" className="shrink-0">Search</Button>
  </form>;
}
