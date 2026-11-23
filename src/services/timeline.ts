import { epochs, isStaticEpoch } from "@/lib/epochs";
import { listTimeline, type TimelineDetailItem } from "@/repositories/timeline";

export async function getTimelineGroups(): Promise<Array<{ epoch: (typeof epochs)[number]; items: TimelineDetailItem[] }>> {
  const items = await listTimeline();
  return epochs.map((epoch) => ({
    epoch,
    items: isStaticEpoch(epoch) || epoch.startYear === null || epoch.endYear === null
      ? []
      : items.filter((item) => item.year >= epoch.startYear && item.year < epoch.endYear),
  }));
}
