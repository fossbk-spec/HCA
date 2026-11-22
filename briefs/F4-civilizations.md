# F4 Civilization Atlas (branch feature/civilizations)
Read only: AGENTS.md §7; docs/Architecture/HCA_PRD_v1.0.md; src/repositories/civilizations.ts; src/repositories/timeline.ts; src/components/civilization/CivilizationCard.tsx; src/components/ui/card.tsx; src/lib/utils.ts; src/app/timeline/page.tsx (layout/style reference); prisma/schema.prisma; data/seed/people.json (first 10 lines), data/seed/relationships.json (first 10 lines); data/seed/civilizations.json (first 40 lines).
Do NOT modify data/seed/*.json (they are being edited by the user). Do not install anything. No DB locally: keep the DB-with-seed-fallback pattern.

Tasks
1. Repository (src/repositories/civilizations.ts, extend): getCivilizationBySlug(slug) -> summary + content (nullable) + people[] (name, slug, birthYear, deathYear). DB: prisma.civilization with people relation. Seed fallback: civilization from civilizations.json; people from people.json where a civilization link exists (if the seed has no link, return an empty list; do not invent links). Also listCivilizationSlugs().
2. Service src/services/civilizations.ts: listCivilizations() (grouped by region, sorted by periodStart), getCivilization(slug) (returns null if missing).
3. /civilizations (Server Component, revalidate 3600): grid of CivilizationCard grouped by region, with title/intro.
4. /civilizations/[slug]: generateStaticParams from slugs, `dynamicParams = true`, notFound() when missing; generateMetadata; sections: header (name, region, period formatted via formatYear), summary, content (paragraphs, only if present), Historical figures list (only if any; links to /people/[slug]), and a "Timeline" link to /timeline. Add src/app/civilizations/not-found.tsx if simple.
5. Reuse existing components; add small ones under src/components/civilization/ only if needed. Strict TS, accessible headings.
Gates (report pass/fail): `npm run typecheck`, `NEXT_TELEMETRY_DISABLED=1 npx next build` with DATABASE_URL unset; /civilizations and all 10 /civilizations/[slug] must prerender. No browser/dev server. Do not commit. Final answer <8 lines.
