import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CivilizationSummary } from "@/repositories/civilizations";

export function CivilizationCard({ civilization, index }: { civilization: CivilizationSummary; index: number }) {
  return <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
    <Link href={`/civilizations/${civilization.slug}`} className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
      <div className="relative flex h-36 items-end overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-amber-800 p-5 text-white">
        <span className="absolute -right-3 -top-10 select-none text-[9rem] font-black leading-none text-white/10" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Civilization {String(index + 1).padStart(2, "0")}</span>
      </div>
      <CardContent>
        <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-semibold tracking-tight text-slate-900">{civilization.name}</h3><ArrowUpRight size={18} className="shrink-0 text-slate-400 transition-colors group-hover:text-amber-600" aria-hidden="true" /></div>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} aria-hidden="true" />{civilization.region ?? "World history"}</p>
        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">{civilization.summary ?? "Explore its history, ideas, and lasting influence."}</p>
      </CardContent>
    </Link>
  </Card>;
}
