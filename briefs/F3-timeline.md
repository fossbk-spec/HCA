# F3 Timeline Explorer (branch feature/timeline)
Read only: AGENTS.md §7; docs/Architecture/HCA_MVP_Execution_Plan_For_Codex.md (timeline part); src/repositories/timeline.ts; src/repositories/civilizations.ts; src/services/home.ts; src/components/timeline/TimelinePreview.tsx; src/app/layout.tsx; data/seed/events.json (first 30 lines only).
Do not install anything. No DB locally (seed-JSON fallback pattern already used in repositories).

Tasks
1. Epochs: src/lib/epochs.ts with a const list (id, label, startYear, endYear): Prehistory (<-3500), Ancient (-3500..500), Medieval (500..1500), Early Modern (1500..1800), Modern (1800..present). Helper epochOf(year).
2. src/repositories/timeline.ts: add listTimeline() returning ALL events (startYear not null) + civilization periods, sorted by year, DB with seed fallback (same pattern). Keep existing listTimelinePreview working.
3. src/services/timeline.ts: groups items by epoch.
4. Route /timeline (Server Component, `revalidate = 3600`): epoch navigation bar (anchor links or ?epoch= param, your choice, keep server-rendered), horizontal scrollable timeline per selected epoch, items as buttons.
5. Detail panel: client component src/components/timeline/TimelineExplorer.tsx ('use client') holding selected item state; clicking an item shows title, years (format BCE/CE), kind, summary, link to its page. Default selection = first item. Keyboard accessible (buttons, aria-pressed).
6. Year formatting helper in src/lib/utils.ts (formatYear(-500) -> "500 BCE").
Gates (report pass/fail): `npm run typecheck`, `NEXT_TELEMETRY_DISABLED=1 npx next build` (DATABASE_URL unset; /timeline must prerender). No browser/dev server. Do not commit. Final answer <8 lines.
