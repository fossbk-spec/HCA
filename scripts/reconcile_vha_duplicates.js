#!/usr/bin/env node
/**
 * scripts/reconcile_vha_duplicates.js
 *
 * Reconciles semantic duplicates between pre-existing HCA Vietnam records
 * and federated VHA imports, preserving canonical HCA slugs while linking
 * VHA externalIds and deduplicating relationships.
 */

const fs = require("node:fs");
const path = require("node:path");

const SEED_DIR = path.resolve(__dirname, "..", "data", "seed");

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(SEED_DIR, name), "utf-8"));
}
function writeJson(name, data) {
  fs.writeFileSync(path.join(SEED_DIR, name), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

const EVENT_ALIAS_TO_CANONICAL = {
  "vha-khoi-nghia-hai-ba-trung": "hai-ba-trung-uprising",
  "vha-bach-dang-938": "battle-of-bach-dang-938",
  "vha-doi-do-ve-thang-long": "relocation-of-capital-to-thang-long",
  "vha-khang-chien-chong-mong-nguyen": "mongol-invasions-of-vietnam",
  "vha-khoi-nghia-lam-son": "lam-son-uprising",
};

const BOOK_ALIAS_TO_CANONICAL = {
  "vha-chieu-doi-do": "chieu-doi-do",
  "vha-nam-quoc-son-ha": "nam-quoc-son-ha",
  "vha-hich-tuong-si": "hich-tuong-si",
  "vha-binh-ngo-dai-cao": "binh-ngo-dai-cao",
  "vha-dai-viet-su-ky-toan-thu": "dai-viet-su-ky-toan-thu",
};

// 1. Reconcile Events
const events = readJson("events.json");
const eventExtIds = {};
for (const e of events) {
  if (EVENT_ALIAS_TO_CANONICAL[e.slug] && e.sourceExternalId) {
    eventExtIds[EVENT_ALIAS_TO_CANONICAL[e.slug]] = e.sourceExternalId;
  }
}
const dedupedEvents = events
  .filter(e => !EVENT_ALIAS_TO_CANONICAL[e.slug])
  .map(e => {
    if (eventExtIds[e.slug]) {
      return { ...e, civilizationSlug: "vietnam", sourceExternalId: eventExtIds[e.slug] };
    }
    return e;
  });
writeJson("events.json", dedupedEvents);

// 2. Reconcile Books
const books = readJson("books.json");
const bookExtIds = {};
for (const b of books) {
  if (BOOK_ALIAS_TO_CANONICAL[b.slug] && b.sourceExternalId) {
    bookExtIds[BOOK_ALIAS_TO_CANONICAL[b.slug]] = b.sourceExternalId;
  }
}
const dedupedBooks = books
  .filter(b => !BOOK_ALIAS_TO_CANONICAL[b.slug])
  .map(b => {
    if (bookExtIds[b.slug]) {
      return { ...b, civilizationSlug: "vietnam", sourceExternalId: bookExtIds[b.slug] };
    }
    return b;
  });
writeJson("books.json", dedupedBooks);

// 3. Remap and deduplicate Relationships
const rels = readJson("relationships.json");
const seen = new Set();
const dedupedRels = [];

for (const r of rels) {
  let sourceSlug = r.sourceSlug;
  let targetSlug = r.targetSlug;

  if (r.sourceType === "EVENT" && EVENT_ALIAS_TO_CANONICAL[sourceSlug]) {
    sourceSlug = EVENT_ALIAS_TO_CANONICAL[sourceSlug];
  } else if (r.sourceType === "BOOK" && BOOK_ALIAS_TO_CANONICAL[sourceSlug]) {
    sourceSlug = BOOK_ALIAS_TO_CANONICAL[sourceSlug];
  }

  if (r.targetType === "EVENT" && EVENT_ALIAS_TO_CANONICAL[targetSlug]) {
    targetSlug = EVENT_ALIAS_TO_CANONICAL[targetSlug];
  } else if (r.targetType === "BOOK" && BOOK_ALIAS_TO_CANONICAL[targetSlug]) {
    targetSlug = BOOK_ALIAS_TO_CANONICAL[targetSlug];
  }

  const key = `${sourceSlug}|${r.sourceType}|${targetSlug}|${r.targetType}|${r.relationshipType}`;
  if (!seen.has(key)) {
    seen.add(key);
    dedupedRels.push({ ...r, sourceSlug, targetSlug });
  }
}
writeJson("relationships.json", dedupedRels);

console.log(`Reconciled Events: ${events.length} -> ${dedupedEvents.length}`);
console.log(`Reconciled Books:  ${books.length} -> ${dedupedBooks.length}`);
console.log(`Reconciled Rels:   ${rels.length} -> ${dedupedRels.length}`);
