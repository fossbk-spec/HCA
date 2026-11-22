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
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const ontologyTypes = new Set([
    'INFLUENCED', 'TAUGHT', 'COLLABORATED_WITH',
    'PARTICIPATED_IN', 'WITNESSED', 'RULED',
    'WROTE', 'CREATED', 'DISCOVERED', 'INVENTED', 'DEVELOPED',
    'PART_OF', 'BELONGS_TO', 'LOCATED_IN',
    'PRECEDED_BY', 'SUCCEEDED_BY',
  ]);
  const nonOntologyTypes = new Map();

  // 1. Slug uniqueness across all entities
  const slugRegistry = new Map();
  const register = (arr, type) => {
    arr.forEach(item => {
      if (!item.slug) {
        console.error(`[ERROR] Missing slug in ${type}:`, item);
        errors++;
        return;
      }
      if (!slugPattern.test(item.slug)) {
        console.error(`[ERROR] Invalid slug in ${type}: "${item.slug}"`);
        errors++;
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

  const checkYearRange = (arr, startKey, endKey, type) => {
    arr.forEach(item => {
      if (item[startKey] != null && item[endKey] != null && item[startKey] > item[endKey]) {
        console.error(`[ERROR] ${type} "${item.slug}" has ${startKey} after ${endKey}`);
        errors++;
      }
    });
  };
  checkYearRange(people, 'birthYear', 'deathYear', 'Person');
  checkYearRange(events, 'startYear', 'endYear', 'Event');

  console.log(`✓ Total Unique Entity Slugs: ${slugRegistry.size}`);

  // 2. People -> Civilization check
  const civSlugs = new Set(civs.map(c => c.slug));
  people.forEach(p => {
    if (p.civilizationSlug != null && !civSlugs.has(p.civilizationSlug)) {
      console.error(`[ERROR] Person "${p.slug}" has invalid civilizationSlug: "${p.civilizationSlug}"`);
      errors++;
    }
  });
  console.log('✓ People civilizationSlug validity checked.');

  // 3. Relationships source and target check
  const relationshipKeys = new Set();
  rels.forEach((r, idx) => {
    const { sourceSlug, sourceType, targetSlug, targetType, relationshipType } = r;

    if (!sourceSlug || !targetSlug || !relationshipType) {
      console.error(`[ERROR] Relationship #${idx} missing required fields:`, r);
      errors++;
      return;
    }

    const key = JSON.stringify([sourceSlug, targetSlug, relationshipType]);
    if (relationshipKeys.has(key)) {
      console.error(`[ERROR] Duplicate relationship #${idx}: ${sourceSlug} -> ${targetSlug} (${relationshipType})`);
      errors++;
    } else {
      relationshipKeys.add(key);
    }
    if (!ontologyTypes.has(relationshipType)) {
      nonOntologyTypes.set(relationshipType, (nonOntologyTypes.get(relationshipType) || 0) + 1);
    }

    const actualSourceType = slugRegistry.get(sourceSlug);
    const actualTargetType = slugRegistry.get(targetSlug);

    if (!actualSourceType) {
      console.error(`[ORPHAN] Source slug not found: "${sourceSlug}" in relationship: ${JSON.stringify(r)}`);
      errors++;
    } else if (actualSourceType !== sourceType) {
      console.error(`[TYPE MISMATCH] Relationship #${idx}: source "${sourceSlug}" declared as ${sourceType} but exists as ${actualSourceType}`);
      errors++;
    }

    if (!actualTargetType) {
      console.error(`[ORPHAN] Target slug not found: "${targetSlug}" in relationship: ${JSON.stringify(r)}`);
      errors++;
    } else if (actualTargetType !== targetType) {
      console.error(`[TYPE MISMATCH] Relationship #${idx}: target "${targetSlug}" declared as ${targetType} but exists as ${actualTargetType}`);
      errors++;
    }
  });

  console.log('✓ Relationships graph integrity checked.');

  if (nonOntologyTypes.size > 0) {
    console.warn('[WARNING] Non-ontology relationship types:');
    for (const [type, count] of [...nonOntologyTypes].sort(([a], [b]) => a.localeCompare(b))) {
      console.warn(`  - ${type}: ${count}`);
      warnings++;
    }
  }

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
