# C2 verify:seed vs ontology 1.1, remove ignoreBuildErrors (branch chore/c2-verify-ontology)
Read only: package.json; scripts/verify_integrity.js; data/ontology/relationship-types.json (first 15 lines only); next.config.mjs; docs/Ontology/HCA_Ontology_Specification_1.1.md (first 20 lines).
Do NOT modify data/seed/*.json or data/ontology/*. Do not install anything.

Tasks
1. scripts/verify_integrity.js: load data/ontology/relationship-types.json; a relationshipType not in its `types[].type` list becomes an ERROR (exit 1), replacing the old warning. Also WARN (not error) when a relationship's `sourceType>targetType` pair is not among that type's `signatures` (only for types with a non-empty signatures list). Print counts of both. Must still exit 0 on current data (check; if the pair warnings are noisy, print only the count and the first 10).
2. next.config.mjs: remove `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` and the stale comment about TypeScript 7 (TS is pinned to 5). If `next build` then fails only because eslint is not installed/configured, keep `eslint: { ignoreDuringBuilds: true }` with the accurate comment "ESLint not configured yet"; otherwise remove it.
3. README: one sentence in the Scripts section that verify:seed validates against ontology 1.1.
Gates (report pass/fail): `npm run verify:seed` (exit 0), `npm run typecheck`, `DATABASE_URL= NEXT_TELEMETRY_DISABLED=1 npx next build`. Do not commit. Final answer <6 lines.
