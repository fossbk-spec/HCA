const fs = require('fs');
const path = require('path');

const SEED_DIR = path.join(__dirname, '..', 'data', 'seed');

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(SEED_DIR, `${name}.json`), 'utf8'));
}

function verify() {
  console.log('========================================================');
  console.log('       HCA DATASET REFERENTIAL INTEGRITY REPORT         ');
  console.log('========================================================\n');

  const civs = load('civilizations');
  const people = load('people');
  const events = load('events');
  const ideas = load('ideas');
  const books = load('books');
  const rels = load('relationships');

  console.log('Entity Counts:');
  console.log(`  - Civilizations : ${civs.length}`);
  console.log(`  - People        : ${people.length}`);
  console.log(`  - Events        : ${events.length}`);
  console.log(`  - Ideas         : ${ideas.length}`);
  console.log(`  - Books         : ${books.length}`);
  console.log(`  - Relationships : ${rels.length}`);
  console.log(`  - TOTAL ENTITIES: ${civs.length + people.length + events.length + ideas.length + books.length}\n`);

  let errors = 0;
  let warnings = 0;

  // 1. Slug uniqueness across all entities
  const slugRegistry = new Map();
  const register = (arr, type) => {
    arr.forEach(item => {
      if (!item.slug) {
        console.error(`[ERROR] Missing slug in ${type}:`, item);
        errors++;
        return;
      }
      if (slugRegistry.has(item.slug)) {
        console.error(`[COLLISION] Slug "${item.slug}" duplicated in ${type} and ${slugRegistry.get(item.slug)}`);
        errors++;
      } else {
        slugRegistry.set(item.slug, type);
      }
    });
  };

  register(civs, 'CIVILIZATION');
  register(people, 'PERSON');
  register(events, 'EVENT');
  register(ideas, 'IDEA');
  register(books, 'BOOK');

  console.log(`✓ Total Unique Entity Slugs: ${slugRegistry.size}`);

  // 2. People -> Civilization check
  const civSlugs = new Set(civs.map(c => c.slug));
  people.forEach(p => {
    if (p.civilizationSlug && !civSlugs.has(p.civilizationSlug)) {
      console.error(`[ERROR] Person "${p.slug}" has invalid civilizationSlug: "${p.civilizationSlug}"`);
      errors++;
    }
  });
  console.log('✓ People civilizationSlug validity checked.');

  // 3. Relationships source and target check
  rels.forEach((r, idx) => {
    const { sourceSlug, sourceType, targetSlug, targetType, relationshipType } = r;

    if (!sourceSlug || !targetSlug || !relationshipType) {
      console.error(`[ERROR] Relationship #${idx} missing required fields:`, r);
      errors++;
      return;
    }

    const actualSourceType = slugRegistry.get(sourceSlug);
    const actualTargetType = slugRegistry.get(targetSlug);

    if (!actualSourceType) {
      console.error(`[ORPHAN] Source slug not found: "${sourceSlug}" in relationship: ${JSON.stringify(r)}`);
      errors++;
    } else if (sourceType && actualSourceType !== sourceType) {
      console.warn(`[TYPE MISMATCH] Relationship #${idx}: source "${sourceSlug}" declared as ${sourceType} but exists as ${actualSourceType}`);
      warnings++;
    }

    if (!actualTargetType) {
      console.error(`[ORPHAN] Target slug not found: "${targetSlug}" in relationship: ${JSON.stringify(r)}`);
      errors++;
    } else if (targetType && actualTargetType !== targetType) {
      console.warn(`[TYPE MISMATCH] Relationship #${idx}: target "${targetSlug}" declared as ${targetType} but exists as ${actualTargetType}`);
      warnings++;
    }
  });

  console.log('✓ Relationships graph integrity checked.');

  console.log('\n--------------------------------------------------------');
  if (errors === 0 && warnings === 0) {
    console.log('🎉 VERIFICATION RESULT: 100% PERFECT! ZERO ERRORS, ZERO ORPHANS.');
  } else {
    console.log(`⚠️ VERIFICATION FINISHED: ${errors} errors, ${warnings} warnings.`);
  }
  console.log('========================================================\n');

  if (errors > 0) {
    process.exit(1);
  }
}

verify();
