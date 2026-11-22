import Link from "next/link";
import { Compass } from "lucide-react";

const navigation = [
  ["Timeline", "/timeline"],
  ["Civilizations", "/civilizations"],
  ["People", "/people"],
  ["Ideas", "/ideas"],
  ["Books", "/books"],
  ["Search", "/search"],
] as const;

export function Header() {
  return <header className="border-b border-white/10 bg-slate-950 text-white">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight" aria-label="Human Civilization Atlas home">
        <span className="flex size-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950"><Compass size={23} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className="text-lg">Human Civilization <span className="text-amber-400">Atlas</span></span>
      </Link>
      <nav aria-label="Main navigation" className="flex max-w-full gap-1 overflow-x-auto text-sm text-slate-300 sm:gap-4">
        {navigation.map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap rounded-md px-2 py-2 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400">{label}</Link>)}
      </nav>
    </div>
  </header>;
}
