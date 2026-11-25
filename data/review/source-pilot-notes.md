# Source Pilot Notes (20 Entities)

All 20 requested entities exist in `data/seed/` and have been populated in `data/review/source-pilot.json`.
Every entry carries `"verification": "unverified"` and `"locator": null` (except where a standard chapter/section title is established without page-number fabrication), pending formal verification against library catalogs / DOIs.

## Items Requiring Publication-Year / Edition Verification
1. **`ahimsa` (Christopher Key Chapple, 1993)**: Confirm exact title (*Nonviolence to Animals, Earth, and Self in Asian Traditions*, SUNY Press, 1993) and whether a shorter encyclopedia entry is preferable.
2. **`ahimsa` (Richard Gombrich)**: Confirm exact publication year and title of the Oxford Bibliographies / Routledge volume before moving to `verified`.
3. **`ho-chi-minh` (Selected Writings, 1973)**: Multiple Hanoi Foreign Languages Publishing House editions exist (1973, 1977); confirm ISBN/edition year before linking.
4. **`binh-ngo-dai-cao` (Nguyen Trai Toan Tap, 1976)**: Confirm 1976 edition details (Nha xuat ban Khoa hoc Xa hoi, 2nd printing) vs. 1969 first edition.
5. **Stanford Encyclopedia of Philosophy entries (`confucius`, `plato`, `aristotle`, `rule-of-law`, `republic`, `the-republic`)**: Dynamic online editions; `year` is intentionally left `null` until pinned to an archival SEP edition date.
