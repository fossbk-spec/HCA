# F2 Homepage (branch feature/homepage)
Read only: AGENTS.md §3-§7; docs/Architecture/HCA_PRD_v1.0.md; docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md; prisma/schema.prisma; src/lib/prisma.ts; package.json; data/seed/civilizations.json, ideas.json.
Deps installed (next 15, react 19, tailwind 4 + @tailwindcss/postcss, clsx, tailwind-merge, cva, lucide-react). Do not install anything. No DB available locally.

Tasks
1. Next.js app scaffold by hand: next.config.ts, postcss.config.mjs (@tailwindcss/postcss), src/app/layout.tsx, src/app/globals.css (`@import "tailwindcss";`), src/lib/utils.ts (cn). Update tsconfig.json for Next (jsx preserve, plugins next, paths "@/*" -> src/*, include next-env.d.ts, .next/types). Scripts: dev, build, start (keep existing). Add `.next/`-safe settings.
2. Layers: src/repositories/{civilizations,ideas,timeline}.ts using Prisma; if process.env.DATABASE_URL is unset or the query throws, fall back to reading data/seed/*.json (so the site renders without a DB). src/services/home.ts composes homepage data.
3. Components: src/components/layout/{Header,Footer}.tsx (nav: Timeline, Civilizations, People, Ideas, Books, Search), src/components/search/SearchBox.tsx (GET form to /search?q=), src/components/timeline/TimelinePreview.tsx (horizontal strip of events/civilization periods, sorted by year), src/components/civilization/CivilizationCard.tsx, src/components/ui/{button,card}.tsx (shadcn-style, hand-written).
4. src/app/page.tsx (Server Component): Hero, Search, Timeline Preview, Featured Civilizations (10 max from seed order), Featured Ideas. Links point to /civilizations/[slug], /ideas/[slug] (pages don't exist yet; fine).
5. README: no change needed.

Gates (report pass/fail): `npm run typecheck`, `npx next build` (with DATABASE_URL unset; must succeed using seed fallback; if build needs network e.g. fonts/telemetry, avoid next/font google; set NEXT_TELEMETRY_DISABLED=1). Do not start a dev server or browser. Do not commit. Final answer <10 lines.
