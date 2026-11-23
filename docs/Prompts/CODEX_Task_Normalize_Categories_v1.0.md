# Codex task: normalize idea categories

Branch `data/seed-batch6-normalize` (current worktree). Do not touch `main`. No AI attribution in commits.

The `/ideas` page groups ideas by `category`; 38 free-text values produce 34 sections. In `data/seed/ideas.json` replace every `category` with exactly one of:

`Politics`, `Law`, `Philosophy`, `Religion`, `Science`, `Mathematics`, `Astronomy`, `Medicine`, `Technology`, `Economics`, `Linguistics`

Rules:
- Pick the primary field using the idea's title and summary (e.g. "Political Philosophy / Statecraft" -> `Politics`, "Mathematics / Astronomy" -> `Mathematics`). When unsure, prefer the field of the first word.
- Change only `category` values. Keep slugs, titles, summaries, content and key order. Keep file formatting (indent, trailing newline).
- Write `data/seed/CATEGORY_MAPPING.md`: table old value -> new value -> count, plus final count per category.
- Add a check to `scripts/verify_integrity.js` that fails if an idea category is not in the closed list above. Keep it small.
- Do not edit anything else (no src/, prisma/, other data files).

Gate: `npm run verify:seed` (must pass with zero errors), `npx tsc --noEmit`, (no lint script exists). Do not run the seed against any database. Commit as `data(seed): normalize idea categories to a closed list` and stop; do not push or open a PR. Report the per-category counts.
