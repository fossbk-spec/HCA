import { readFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withDatabase } from "@/lib/seed-fallback";
import { listAllCivilizations, type CivilizationSummary } from "@/repositories/civilizations";

export type TimelineItem = {
  slug: string;
  title: string;
  titleVi: string | null;
  year: number;
  endYear: number | null;
  href: string;
  kind: "event" | "civilization";
  civilizationSlug?: string | null;
};

export type TimelineDetailItem = TimelineItem & {
  summary: string | null;
  summaryVi: string | null;
};

type SeedEvent = {
  slug: string;
  title: string;
  titleVi?: string | null;
  startYear: number | null;
  endYear?: number | null;
  summary?: string | null;
  summaryVi?: string | null;
};

async function seedEvents(): Promise<SeedEvent[]> {
  const file = path.join(process.cwd(), "data", "seed", "events.json");
  return JSON.parse(await readFile(file, "utf8")) as SeedEvent[];
}

/**
 * Maps known events to their originating/associated civilization.
 * Derived from ontology relationships (HOSTED, OCCURRED_IN, INITIATED, PARTICIPATED).
 */
export const EVENT_CIVILIZATION_MAP: Record<string, string> = {
  "founding-of-platos-academy": "ancient-greece",
  "golden-age-of-athens": "ancient-greece",
  "solon-reforms-athens": "ancient-greece",
  "alexander-conquests": "ancient-greece",
  "first-ancient-olympic-games": "ancient-greece",
  "greco-persian-wars": "ancient-greece",
  "trial-and-death-of-socrates": "ancient-greece",
  "akkadian-empire-founded": "mesopotamia",
  "invention-of-cuneiform": "mesopotamia",
  "promulgation-of-hammurabi-code": "mesopotamia",
  "agricultural-revolution": "mesopotamia",
  "unification-of-egypt": "ancient-egypt",
  "construction-of-great-pyramids": "ancient-egypt",
  "battle-of-kadesh": "ancient-egypt",
  "caesar-crosses-rubicon": "roman-empire",
  "establishment-of-roman-empire": "roman-empire",
  "edict-of-milan": "roman-empire",
  "founding-of-rome": "roman-empire",
  "roman-republic-established": "roman-empire",
  "punic-wars": "roman-empire",
  "construction-of-colosseum": "roman-empire",
  "fall-of-rome": "roman-empire",
  "law-of-twelve-tables": "roman-empire",
  "opening-of-silk-road": "ancient-china",
  "qin-unification-china": "ancient-china",
  "warring-states-period": "ancient-china",
  "invention-of-paper": "ancient-china",
  "keju-examination-system": "ancient-china",
  "rise-of-buddhism-jainism": "ancient-india",
  "founding-of-maurya-empire": "ancient-india",
  "kalinga-war-and-ashoka-edicts": "ancient-india",
  "gupta-empire-golden-age": "ancient-india",
  "founding-of-nalanda": "ancient-india",
  "construction-of-co-loa": "vietnam",
  "hai-ba-trung-uprising": "vietnam",
  "battle-of-bach-dang-938": "vietnam",
  "song-dynasty-resistance-1077": "vietnam",
  "mongol-invasions-of-vietnam": "vietnam",
  "lam-son-uprising": "vietnam",
  "promulgation-of-hong-duc-code": "vietnam",
  "relocation-of-capital-to-thang-long": "vietnam",
  "cyrus-cylinder-and-babylon-conquest": "persian-empire",
  "construction-of-persepolis": "persian-empire",
  "construction-of-the-royal-road": "persian-empire",
  "battle-of-gaugamela": "persian-empire",
  "hijra-to-medina": "islamic-civilization",
  "founding-of-house-of-wisdom": "islamic-civilization",
  "translation-movement": "islamic-civilization",
  "golden-age-of-cordoba": "islamic-civilization",
  "siege-of-baghdad-1258": "islamic-civilization",
  "coronation-of-pakal-the-great": "maya-civilization",
  "tikal-defeat-of-calakmul": "maya-civilization",
  "emergence-of-maya-hieroglyphic-writing": "maya-civilization",
  "classic-maya-collapse": "maya-civilization",
  "rise-of-chichen-itza": "maya-civilization",
};

export async function listTimeline(): Promise<TimelineDetailItem[]> {
  const civilizations = await listAllCivilizations();
  const periods: TimelineDetailItem[] = civilizations
    .filter((item) => item.periodStart !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      titleVi: item.nameVi ?? null,
      year: item.periodStart!,
      endYear: item.periodEnd,
      summary: item.summary,
      summaryVi: item.summaryVi ?? null,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
      civilizationSlug: item.slug,
    }));

  const eventRows: SeedEvent[] = await withDatabase(
    "timeline.list",
    () =>
      prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        select: {
          slug: true,
          title: true,
          titleVi: true,
          startYear: true,
          endYear: true,
          summary: true,
          summaryVi: true,
        },
      }),
    seedEvents
  );

  const events: TimelineDetailItem[] = eventRows
    .filter((row) => row.startYear !== null)
    .map((row) => ({
      slug: row.slug,
      title: row.title,
      titleVi: row.titleVi ?? null,
      year: row.startYear!,
      endYear: row.endYear ?? null,
      summary: row.summary ?? null,
      summaryVi: row.summaryVi ?? null,
      href: `/events/${row.slug}`,
      kind: "event",
      civilizationSlug: EVENT_CIVILIZATION_MAP[row.slug] ?? null,
    }));

  return [...periods, ...events].sort(
    (a, b) => a.year - b.year || a.title.localeCompare(b.title)
  );
}

export async function listTimelinePreview(
  civilizations: CivilizationSummary[]
): Promise<TimelineItem[]> {
  const periods: TimelineItem[] = civilizations
    .filter((item) => item.periodStart !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      titleVi: item.nameVi ?? null,
      year: item.periodStart!,
      endYear: item.periodEnd,
      href: `/civilizations/${item.slug}`,
      kind: "civilization",
      civilizationSlug: item.slug,
    }));

  const events: TimelineItem[] = await withDatabase(
    "timeline.preview",
    async () => {
      const rows = await prisma.event.findMany({
        where: { startYear: { not: null } },
        orderBy: { startYear: "asc" },
        take: 8,
        select: {
          slug: true,
          title: true,
          titleVi: true,
          startYear: true,
          endYear: true,
        },
      });
      return rows
        .filter((row) => row.startYear !== null)
        .map((row) => ({
          slug: row.slug,
          title: row.title,
          titleVi: row.titleVi ?? null,
          year: row.startYear!,
          endYear: row.endYear,
          href: `/events/${row.slug}`,
          kind: "event",
          civilizationSlug: EVENT_CIVILIZATION_MAP[row.slug] ?? null,
        }));
    },
    async () => []
  );
  return [...periods, ...events].sort((a, b) => a.year - b.year).slice(0, 10);
}
