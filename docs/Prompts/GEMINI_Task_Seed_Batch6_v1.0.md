# Gemini task: seed batch 6 (normalize categories, date uncertainty, source pilot)

Branch: `data/seed-batch6-normalize` (already checked out in this worktree). Do not touch `main`. Do not edit anything under `src/`, `prisma/`, `scripts/` or `.github/`. Do not commit secrets. No AI attribution in commits.

Rule: do not invent facts or sources. Every reference you add must be a real, checkable work. If you are not sure a work exists or what its details are, leave the field null and mark it `"verification": "unverified"`.

## Task 1. Normalize `category` in `data/seed/ideas.json`

The `/ideas` page groups ideas by `category`, and 34 free-text values currently produce 34 sections. Replace every value with exactly one of this closed list:

`Politics`, `Law`, `Philosophy`, `Religion`, `Science`, `Mathematics`, `Astronomy`, `Medicine`, `Technology`, `Economics`, `Linguistics`

Rules:
- Pick the primary field (the first word of a compound value such as "Political Philosophy / Jurisprudence" is only a hint; use judgment, e.g. "Political Philosophy / Statecraft" -> `Politics`, "Mathematics / Astronomy" -> `Mathematics`).
- Change only the `category` values. Keep slugs, titles, summaries, content and key order unchanged.
- Write `data/seed/CATEGORY_MAPPING.md`: a table old value -> new value -> count, and the final count per category.

## Task 2. Date uncertainty review (data only, not read by the app)

Create `data/review/date-uncertainty.json`, an array of objects:
`{ "entityType": "PERSON|EVENT|BOOK", "slug": "...", "field": "birthYear|deathYear|startYear|endYear|publicationYear", "value": <current number>, "issue": "approximate|traditional|reign-not-life|legendary|disputed", "note": "one sentence in English", "suggestedDisplay": "c. 375 BCE" }`

Scan all people, events and books with dates before the year 1000 and every person with `civilizationSlug` in mesopotamia, ancient-egypt, ancient-india, ancient-china, indus-valley. Known examples to include: `kautilya`, `sargon-of-akkad`, `gilgamesh`. Do not change any year in `data/seed/*.json`. Only list entries where you are confident the date is not a firm historical date.

## Task 3. Source pilot (data only, not read by the app)

Create `data/review/source-pilot.json` for exactly these 20 entities: people `confucius`, `plato`, `aristotle`, `qin-shi-huang`, `kautilya`, `ho-chi-minh`; ideas `rule-of-law`, `republic`, `ahimsa`; books `the-republic`, `art-of-war`, `elements`, `wealth-of-nations`, `binh-ngo-dai-cao`, `arthashastra`, `dhammapada`, `cyrus-cylinder`; events `fall-of-rome`, `keju-examination-system`, `warring-states-period`. If a slug does not exist, say so in `notes` and skip it.

Schema: `{ "entityType": "...", "slug": "...", "sources": [ { "title": "...", "authors": ["..."], "year": <int|null>, "publisher": "...|null", "type": "primary|secondary|reference", "locator": "chapter/section or null", "supports": "date|summary|interpretation", "verification": "unverified" } ] }`

Rules:
- 1 to 3 sources per entity. Prefer a scholarly reference work or a standard edition; avoid Wikipedia as the only source.
- Do not quote long passages. No fabricated page numbers: use `locator: null` unless certain.
- Write `data/review/source-pilot-notes.md` listing which references you are less than fully certain exist or are correctly dated.

## Gate before pushing

```
npm ci
npm run verify:seed      # must still pass with zero errors
npx prisma validate
```

Add only the files above and the modified `data/seed/ideas.json`. Commit message style: `data(seed): normalize idea categories, add date-uncertainty and source pilot review files`. Push the branch; do not open or merge a PR. Report counts per category, the number of date-uncertainty entries, and the pilot notes.
