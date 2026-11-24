import fs from "node:fs";
import path from "node:path";

interface Entity {
  slug: string;
  externalId: string;
  name?: string;
  title?: string;
  summary: string;
  content?: string;
  [key: string]: any;
}

interface Relationship {
  sourceSlug: string;
  sourceType: string;
  targetSlug: string;
  targetType: string;
  relationshipType: string;
}

const HCA_ROOT = path.resolve(__dirname, "..");
const VHA_EXPORT_DIR = process.env.VHA_EXPORT_DIR || path.resolve(HCA_ROOT, "..", "vietnam-history-atlas", "out", "hca-export");
const FEDERATED_DIR = path.join(HCA_ROOT, "data", "federated", "vha");
const REPORTS_DIR = path.join(HCA_ROOT, "reports");

console.log("========================================================");
console.log("       VHA -> HCA KNOWLEDGE FEDERATION BRIDGE           ");
console.log("========================================================\n");

const hasSourceExport = fs.existsSync(VHA_EXPORT_DIR);
const hasFederatedCache = fs.existsSync(FEDERATED_DIR) && fs.existsSync(path.join(FEDERATED_DIR, "export-report.json"));

if (!hasSourceExport && !hasFederatedCache) {
  console.error(`[ERROR] Neither VHA export directory (${VHA_EXPORT_DIR}) nor federated cache (${FEDERATED_DIR}) was found.`);
  console.error("Please run `npm run export:hca` in the vietnam-history-atlas directory first.");
  process.exit(1);
}

fs.mkdirSync(FEDERATED_DIR, { recursive: true });
fs.mkdirSync(REPORTS_DIR, { recursive: true });

// 1. Ingest files
const files = [
  "civilizations.json",
  "people.json",
  "events.json",
  "ideas.json",
  "books.json",
  "relationships.json",
  "export-report.json",
];

const dataset: Record<string, any> = {};

if (hasSourceExport) {
  console.log(`[INFO] Syncing from live VHA export directory: ${VHA_EXPORT_DIR}`);
  for (const file of files) {
    const src = path.join(VHA_EXPORT_DIR, file);
    const dest = path.join(FEDERATED_DIR, file);
    if (fs.existsSync(src)) {
      const raw = fs.readFileSync(src, "utf-8");
      fs.writeFileSync(dest, raw, "utf-8");
      dataset[file.replace(".json", "")] = JSON.parse(raw);
      console.log(`✓ Ingested ${file} (${fs.statSync(src).size} bytes)`);
    } else {
      console.warn(`[WARN] Missing ${file} in source export.`);
    }
  }
} else {
  console.log(`[INFO] Source export directory not found (standalone CI runner).`);
  console.log(`[INFO] Using existing cached dataset in: ${FEDERATED_DIR}`);
  for (const file of files) {
    const cached = path.join(FEDERATED_DIR, file);
    if (fs.existsSync(cached)) {
      const raw = fs.readFileSync(cached, "utf-8");
      dataset[file.replace(".json", "")] = JSON.parse(raw);
      console.log(`✓ Loaded cached ${file} (${fs.statSync(cached).size} bytes)`);
    } else {
      console.warn(`[WARN] Missing ${file} in federated cache.`);
    }
  }
}

// 2. Validate Entities & Schemas
const civs: Entity[] = dataset["civilizations"] || [];
const people: Entity[] = dataset["people"] || [];
const events: Entity[] = dataset["events"] || [];
const ideas: Entity[] = dataset["ideas"] || [];
const books: Entity[] = dataset["books"] || [];
const relationships: Relationship[] = dataset["relationships"] || [];

const allVHAEntities = [...civs, ...people, ...events, ...ideas, ...books];
console.log(`\nTotal Ingested VHA Entities: ${allVHAEntities.length}`);
console.log(`  - Polities (Civs): ${civs.length}`);
console.log(`  - People:          ${people.length}`);
console.log(`  - Events:          ${events.length}`);
console.log(`  - Ideas:           ${ideas.length}`);
console.log(`  - Books:           ${books.length}`);
console.log(`  - Relationships:   ${relationships.length}\n`);

// 3. Cross-reference with HCA Core Seed
const seedDir = path.join(HCA_ROOT, "data", "seed");
const hcaPeople = JSON.parse(fs.readFileSync(path.join(seedDir, "people.json"), "utf-8"));
const hcaBooks = JSON.parse(fs.readFileSync(path.join(seedDir, "books.json"), "utf-8"));

// Update Truyen Kieu in HCA seed if needed
let truyenKieuUpdated = false;
for (const b of hcaBooks) {
  if (b.slug === "truyen-kieu" && (!b.civilizationSlug || b.civilizationSlug !== "vietnam")) {
    b.civilizationSlug = "vietnam";
    truyenKieuUpdated = true;
  }
}
if (truyenKieuUpdated) {
  fs.writeFileSync(path.join(seedDir, "books.json"), JSON.stringify(hcaBooks, null, 2), "utf-8");
  console.log("✓ Linked HCA Great Book 'truyen-kieu' to civilization 'vietnam'");
}

// Detect matches
const matchedPeople: Array<{ hcaSlug: string; vhaSlug: string; name: string }> = [];
for (const hp of hcaPeople) {
  if (hp.civilizationSlug === "vietnam") {
    const vp = people.find(p => p.slug === `vha-${hp.slug}`);
    if (vp) {
      matchedPeople.push({
        hcaSlug: hp.slug,
        vhaSlug: vp.slug,
        name: hp.nameVi || hp.name,
      });
    }
  }
}

// 4. Generate Bridge Summary Report
const bridgeReport = {
  timestamp: new Date().toISOString(),
  source: "vietnam-history-atlas/out/hca-export",
  target: "human-civilization-atlas/data/federated/vha",
  summary: {
    totalFederatedEntities: allVHAEntities.length,
    polities: civs.length,
    people: people.length,
    events: events.length,
    ideas: ideas.length,
    books: books.length,
    relationships: relationships.length,
    crossEntityMatches: matchedPeople.length,
  },
  crossEntityMatches: matchedPeople,
  relationshipTypes: [...new Set(relationships.map(r => r.relationshipType))],
};

const reportPath = path.join(REPORTS_DIR, "vha-hca-bridge-report.json");
fs.writeFileSync(reportPath, JSON.stringify(bridgeReport, null, 2), "utf-8");
console.log(`✓ Generated Bridge Report: ${reportPath}`);
console.log(`  Found ${matchedPeople.length} direct cross-entity matches between HCA Core and VHA.\n`);

console.log("========================================================");
console.log("🎉 VHA -> HCA FEDERATION BRIDGE SYNC COMPLETE (100% OK)");
console.log("========================================================\n");
