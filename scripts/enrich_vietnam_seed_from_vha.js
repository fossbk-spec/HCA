#!/usr/bin/env node
/**
 * scripts/enrich_vietnam_seed_from_vha.js
 * 
 * Enriches HCA seed data with federated VHA entities:
 *   - 15 Events → data/seed/events.json
 *   - 3 Ideas   → data/seed/ideas.json
 *   - 9 Books   → data/seed/books.json (excluding truyen-kieu already present)
 *   - Cross-entity relationships → data/seed/relationships.json
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const FEDERATED = path.join(ROOT, "data", "federated", "vha");
const SEED = path.join(ROOT, "data", "seed");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

console.log("=================================================");
console.log("  VHA → HCA Seed Enrichment (Phase 2)");
console.log("=================================================\n");

// ── Load sources ──────────────────────────────────────────
const vhaEvents = readJson(path.join(FEDERATED, "events.json"));
const vhaIdeas  = readJson(path.join(FEDERATED, "ideas.json"));
const vhaBooks  = readJson(path.join(FEDERATED, "books.json"));
const vhaRels   = readJson(path.join(FEDERATED, "relationships.json"));

// ── Load targets ──────────────────────────────────────────
const seedEvents = readJson(path.join(SEED, "events.json"));
const seedIdeas  = readJson(path.join(SEED, "ideas.json"));
const seedBooks  = readJson(path.join(SEED, "books.json"));
const seedRels   = readJson(path.join(SEED, "relationships.json"));

// ── 1. EVENTS ─────────────────────────────────────────────
const existingEventSlugs = new Set(seedEvents.map(e => e.slug));
const vietnamEvents = vhaEvents.map(e => ({
  slug:         e.slug,
  title:        e.title,
  startYear:    e.year,
  endYear:      e.endYear || e.year,  // point events: startYear == endYear
  summary:      e.summary,
  titleVi:      e.title,         // VHA data is already in Vietnamese
  summaryVi:    e.summary,
  civilizationSlug: "vietnam",
  sourceExternalId: e.externalId,
}));

// Adjust endYear for multi-year events
const eventDurations = {
  "vha-khang-chien-chong-mong-nguyen": { startYear: 1258, endYear: 1288 },
  "vha-khoi-nghia-hai-ba-trung":       { startYear: 40,   endYear: 43   },
  "vha-khoi-nghia-lam-son":            { startYear: 1418, endYear: 1428 },
  "vha-khoi-nghia-ly-bi-lap-nuoc-van-xuan": { startYear: 542, endYear: 603 },
  "vha-dep-loan-12-su-quan":           { startYear: 965,  endYear: 968  },
  "vha-khang-chien-chong-tong-981":    { startYear: 981,  endYear: 982  },
  "vha-tran-nhu-nguyet-1077":          { startYear: 1076, endYear: 1077 },
  "vha-cai-cach-khuc-hao":             { startYear: 907,  endYear: 923  },
};

for (const ev of vietnamEvents) {
  if (eventDurations[ev.slug]) {
    ev.startYear = eventDurations[ev.slug].startYear;
    ev.endYear   = eventDurations[ev.slug].endYear;
  }
}

const newEvents = vietnamEvents.filter(e => !existingEventSlugs.has(e.slug));
console.log(`Events: adding ${newEvents.length} new (skipping ${vietnamEvents.length - newEvents.length} already present)`);
const updatedEvents = [...seedEvents, ...newEvents];
writeJson(path.join(SEED, "events.json"), updatedEvents);

// ── 2. IDEAS ──────────────────────────────────────────────
const existingIdeaSlugs = new Set(seedIdeas.map(i => i.slug));
const vietnamIdeas = vhaIdeas.map(i => ({
  slug:        i.slug,
  title:       i.name,
  category:    "Politics",           // mapped from VHA themes
  summary:     i.summary,
  titleVi:     i.name,
  categoryVi:  "Chính trị",
  summaryVi:   i.summary,
  contentVi:   i.content,
  civilizationSlug: "vietnam",
  sourceExternalId: i.externalId,
}));

// Assign proper categories per theme
const ideaCategories = {
  "vha-culture-and-thought":      { category: "Philosophy",  categoryVi: "Triết học"     },
  "vha-sovereignty-and-defense":  { category: "Politics",    categoryVi: "Chính trị"     },
  "vha-state-governance-and-law": { category: "Law & Ethics",categoryVi: "Pháp lý & Đạo đức" },
};
for (const idea of vietnamIdeas) {
  if (ideaCategories[idea.slug]) {
    Object.assign(idea, ideaCategories[idea.slug]);
  }
}

const newIdeas = vietnamIdeas.filter(i => !existingIdeaSlugs.has(i.slug));
console.log(`Ideas:  adding ${newIdeas.length} new (skipping ${vietnamIdeas.length - newIdeas.length} already present)`);
const updatedIdeas = [...seedIdeas, ...newIdeas];
writeJson(path.join(SEED, "ideas.json"), updatedIdeas);

// ── 3. BOOKS ──────────────────────────────────────────────
const existingBookSlugs = new Set(seedBooks.map(b => b.slug));

// Map VHA "truyen-kieu" slug to already-existing HCA "truyen-kieu" (they differ: vha- prefix vs not)
const HCA_TRUYEN_KIEU_SLUG = "truyen-kieu";
const vietnamBooks = vhaBooks
  .filter(b => b.slug !== "vha-truyen-kieu")  // skip: truyen-kieu already in HCA seed
  .map(b => ({
    slug:            b.slug,
    title:           b.title,
    author:          b.author,
    publicationYear: b.year,
    summary:         b.summary,
    titleVi:         b.title,
    authorVi:        b.author,
    summaryVi:       b.summary,
    contentVi:       b.content,
    civilizationSlug: "vietnam",
    sourceExternalId: b.externalId,
  }));

const newBooks = vietnamBooks.filter(b => !existingBookSlugs.has(b.slug));
console.log(`Books:  adding ${newBooks.length} new (skipping ${vietnamBooks.length - newBooks.length} already present)`);
const updatedBooks = [...seedBooks, ...newBooks];
writeJson(path.join(SEED, "books.json"), updatedBooks);

// ── 4. RELATIONSHIPS ──────────────────────────────────────
// Map VHA entity types → HCA Prisma model names
const typeMap = { PERSON: "Person", EVENT: "Event", IDEA: "Idea", CIVILIZATION: "Civilization" };

// Build set of all slugs now in seed
const knownPeopleSlugs = new Set([
  "ho-chi-minh","an-duong-vuong","hai-ba-trung","ngo-quyen","ly-thuong-kiet",
  "tran-hung-dao","chu-van-an","nguyen-trai","le-thanh-tong","tue-tinh",
  "nguyen-du","phung-hung","dinh-bo-linh","le-huu-trac","le-loi","quang-trung",
]);
const knownEventSlugs  = new Set([...existingEventSlugs, ...newEvents.map(e => e.slug)]);
const knownIdeaSlugs   = new Set([...existingIdeaSlugs, ...newIdeas.map(i => i.slug)]);
const knownBookSlugs   = new Set([...existingBookSlugs, ...newBooks.map(b => b.slug), HCA_TRUYEN_KIEU_SLUG]);
const knownCivSlugs    = new Set(["mesopotamia","ancient-egypt","ancient-greece","roman-empire","ancient-china","ancient-india","vietnam","persian-empire","islamic-civilization","maya-civilization"]);

function isKnown(slug, type) {
  if (type === "PERSON") return knownPeopleSlugs.has(slug) || slug.startsWith("vha-");
  if (type === "EVENT")  return knownEventSlugs.has(slug);
  if (type === "IDEA")   return knownIdeaSlugs.has(slug);
  if (type === "CIVILIZATION") return knownCivSlugs.has(slug) || slug.startsWith("vha-");
  return false;
}

// HCA relationships use {sourceSlug, sourceType, targetSlug, targetType, label}
const existingRelSet = new Set(
  seedRels.map(r => `${r.sourceSlug}|${r.targetSlug}|${r.label || r.relationshipType}`)
);

const relLabelMap = {
  LED:             "LED",
  RULED:           "RULED",
  PART_OF:         "PART_OF",
  SUCCEEDED_BY:    "SUCCEEDED_BY",
  PARTICIPATED_IN: "PARTICIPATED_IN",
  WROTE:           "WROTE",
  AUTHORED:        "AUTHORED",
};

// Add relationships between matched HCA people and new VHA events/ideas/books
// Strategy: for each VHA relationship where BOTH sides are now known in HCA seed,
// and at least one side is a newly added entity, create an HCA relationship.
const newRels = [];
for (const rel of vhaRels) {
  const srcSlug = rel.sourceSlug;
  const tgtSlug = rel.targetSlug;
  const srcType = rel.sourceType;
  const tgtType = rel.targetType;
  const label   = rel.relationshipType;

  // Skip if either side refers to a VHA-only civilization polity not in HCA
  // (we only ingest PERSON, EVENT, IDEA, BOOK into HCA seed — not polities)
  if (srcType === "CIVILIZATION" || tgtType === "CIVILIZATION") continue;

  // Map VHA person slug to HCA person slug (strip "vha-" prefix for matched people)
  const hcaSrc = srcType === "PERSON" && srcSlug.startsWith("vha-")
    ? srcSlug.replace(/^vha-/, "")
    : srcSlug;
  const hcaTgt = tgtType === "PERSON" && tgtSlug.startsWith("vha-")
    ? tgtSlug.replace(/^vha-/, "")
    : tgtSlug;

  // Both must be resolvable in HCA
  const srcResolvable = (srcType === "PERSON"  && knownPeopleSlugs.has(hcaSrc))
                     || (srcType === "EVENT"   && knownEventSlugs.has(hcaSrc))
                     || (srcType === "IDEA"    && knownIdeaSlugs.has(hcaSrc))
                     || (srcType === "BOOK"    && knownBookSlugs.has(hcaSrc));
  const tgtResolvable = (tgtType === "PERSON"  && knownPeopleSlugs.has(hcaTgt))
                     || (tgtType === "EVENT"   && knownEventSlugs.has(hcaTgt))
                     || (tgtType === "IDEA"    && knownIdeaSlugs.has(hcaTgt))
                     || (tgtType === "BOOK"    && knownBookSlugs.has(hcaTgt));

  if (!srcResolvable || !tgtResolvable) continue;

  const relKey = `${hcaSrc}|${hcaTgt}|${label}`;
  if (existingRelSet.has(relKey)) continue;

  existingRelSet.add(relKey);
  newRels.push({
    sourceSlug:       hcaSrc,
    sourceType:       typeMap[srcType] || srcType,
    targetSlug:       hcaTgt,
    targetType:       typeMap[tgtType] || tgtType,
    label:            label,
    civilizationSlug: "vietnam",
  });
}

console.log(`Rels:   adding ${newRels.length} new cross-entity relationships`);
const updatedRels = [...seedRels, ...newRels];
writeJson(path.join(SEED, "relationships.json"), updatedRels);

// ── 5. Summary ────────────────────────────────────────────
console.log(`\n=================================================`);
console.log(`  ENRICHMENT COMPLETE`);
console.log(`=================================================`);
console.log(`  Events:        ${seedEvents.length} → ${updatedEvents.length} (+${newEvents.length})`);
console.log(`  Ideas:         ${seedIdeas.length} → ${updatedIdeas.length} (+${newIdeas.length})`);
console.log(`  Books:         ${seedBooks.length} → ${updatedBooks.length} (+${newBooks.length})`);
console.log(`  Relationships: ${seedRels.length} → ${updatedRels.length} (+${newRels.length})`);
console.log(`  Vietnam civ now has:`);
console.log(`    - 16 people  (unchanged, already in seed)`);
console.log(`    - ${newEvents.length} events`);
console.log(`    - ${newIdeas.length} ideas`);
console.log(`    - ${newBooks.length + 1} books (incl. truyen-kieu)`);
