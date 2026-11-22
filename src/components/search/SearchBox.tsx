import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBox({ className, defaultValue, id = "home-search" }: { className?: string; defaultValue?: string; id?: string }) {
  return <form action="/search" method="GET" role="search" className={cn("flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-slate-950/10", className)}>
    <Search className="ml-3 shrink-0 text-slate-500" size={20} aria-hidden="true" />
    <label htmlFor={id} className="sr-only">Search civilizations, people, events, ideas, and books</label>
    <input id={id} name="q" type="search" defaultValue={defaultValue} placeholder="Search civilizations, people, events, ideas, books..." className="min-w-0 flex-1 px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 sm:text-base" />
    <Button type="submit" className="shrink-0">Search</Button>
  </form>;
}
