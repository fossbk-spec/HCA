import fs from "node:fs";
import path from "node:path";
import { civilizationsVi } from "./translations/civilizations.ts";
import { peopleVi } from "./translations/people.ts";
import { eventsVi } from "./translations/events.ts";
import { ideaTranslations } from "./translations/ideas.ts";
import { bookTranslations } from "./translations/books.ts";

const SEED_DIR = path.resolve(__dirname, "../data/seed");

function mergeTranslations() {
  console.log("Starting dataset translation merge...");

  // 1. Civilizations
  const civPath = path.join(SEED_DIR, "civilizations.json");
  const civs = JSON.parse(fs.readFileSync(civPath, "utf-8"));
  let civCount = 0;
  for (const civ of civs) {
    const t = civilizationsVi[civ.slug];
    if (!t) throw new Error(`Missing translation for civilization: ${civ.slug}`);
    civ.nameVi = t.nameVi;
    civ.regionVi = t.regionVi;
    civ.summaryVi = t.summaryVi;
    civ.contentVi = t.contentVi;
    civCount++;
  }
  fs.writeFileSync(civPath, JSON.stringify(civs, null, 2) + "\n", "utf-8");
  console.log(`✓ Merged ${civCount}/${civs.length} Civilizations`);

  // 2. People
  const peoplePath = path.join(SEED_DIR, "people.json");
  const people = JSON.parse(fs.readFileSync(peoplePath, "utf-8"));
  let peopleCount = 0;
  for (const p of people) {
    const t = peopleVi[p.slug];
    if (!t) throw new Error(`Missing translation for person: ${p.slug}`);
    p.nameVi = t.nameVi;
    p.occupationsVi = t.occupationsVi;
    p.summaryVi = t.summaryVi;
    p.contentVi = t.contentVi;
    peopleCount++;
  }
  fs.writeFileSync(peoplePath, JSON.stringify(people, null, 2) + "\n", "utf-8");
  console.log(`✓ Merged ${peopleCount}/${people.length} People`);

  // 3. Events
  const eventsPath = path.join(SEED_DIR, "events.json");
  const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
  let eventCount = 0;
  for (const e of events) {
    const t = eventsVi[e.slug];
    if (!t) throw new Error(`Missing translation for event: ${e.slug}`);
    e.titleVi = t.titleVi;
    e.summaryVi = t.summaryVi;
    e.contentVi = t.contentVi;
    eventCount++;
  }
  fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2) + "\n", "utf-8");
  console.log(`✓ Merged ${eventCount}/${events.length} Events`);

  // 4. Ideas
  const ideasPath = path.join(SEED_DIR, "ideas.json");
  const ideas = JSON.parse(fs.readFileSync(ideasPath, "utf-8"));
  let ideaCount = 0;
  for (const i of ideas) {
    const t = ideaTranslations[i.slug];
    if (!t) throw new Error(`Missing translation for idea: ${i.slug}`);
    i.titleVi = t.titleVi;
    i.categoryVi = t.categoryVi;
    i.summaryVi = t.summaryVi;
    i.contentVi = t.contentVi;
    ideaCount++;
  }
  fs.writeFileSync(ideasPath, JSON.stringify(ideas, null, 2) + "\n", "utf-8");
  console.log(`✓ Merged ${ideaCount}/${ideas.length} Ideas`);

  // 5. Books
  const booksPath = path.join(SEED_DIR, "books.json");
  const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
  let bookCount = 0;
  for (const b of books) {
    const t = bookTranslations[b.slug];
    if (!t) throw new Error(`Missing translation for book: ${b.slug}`);
    b.titleVi = t.titleVi;
    b.authorVi = t.authorVi;
    b.summaryVi = t.summaryVi;
    b.contentVi = t.contentVi;
    bookCount++;
  }
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2) + "\n", "utf-8");
  console.log(`✓ Merged ${bookCount}/${books.length} Books`);

  const total = civCount + peopleCount + eventCount + ideaCount + bookCount;
  console.log(`\n🎉 Successfully translated and merged all ${total} entities into data/seed/*.json!`);
}

mergeTranslations();
