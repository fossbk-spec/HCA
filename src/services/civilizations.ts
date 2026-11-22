import {
  getCivilizationBySlug,
  listAllCivilizations,
  type CivilizationSummary,
} from "@/repositories/civilizations";

export type CivilizationGroup = { region: string; civilizations: CivilizationSummary[] };

export async function listCivilizations(): Promise<CivilizationGroup[]> {
  const civilizations = await listAllCivilizations();
  const groups = new Map<string, CivilizationSummary[]>();
  for (const civilization of civilizations) {
    const region = civilization.region ?? "Other regions";
    const group = groups.get(region) ?? [];
    group.push(civilization);
    groups.set(region, group);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([region, items]) => ({
      region,
      civilizations: items.sort((a, b) =>
        (a.periodStart ?? Number.POSITIVE_INFINITY) - (b.periodStart ?? Number.POSITIVE_INFINITY)
        || a.name.localeCompare(b.name)),
    }));
}

export async function getCivilization(slug: string) {
  return getCivilizationBySlug(slug);
}
