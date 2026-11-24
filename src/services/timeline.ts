import { epochs, isStaticEpoch } from "@/lib/epochs";
import { listTimeline, type TimelineDetailItem } from "@/repositories/timeline";
import { listAllCivilizations, type CivilizationSummary } from "@/repositories/civilizations";

export interface TimelineGroup {
  epoch: (typeof epochs)[number];
  items: TimelineDetailItem[];
}

export async function getTimelineGroups(): Promise<TimelineGroup[]> {
  const items = await listTimeline();
  return epochs.map((epoch) => ({
    epoch,
    items:
      isStaticEpoch(epoch) || epoch.startYear === null || epoch.endYear === null
        ? []
        : items.filter(
            (item) => item.year >= epoch.startYear && item.year < epoch.endYear
          ),
  }));
}

export async function getTimelinePageData(): Promise<{
  groups: TimelineGroup[];
  civilizations: CivilizationSummary[];
}> {
  const [groups, civilizations] = await Promise.all([
    getTimelineGroups(),
    listAllCivilizations(),
  ]);

  return { groups, civilizations };
}
