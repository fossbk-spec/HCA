import { epochs } from "@/lib/epochs";
import { listTimeline, type TimelineDetailItem } from "@/repositories/timeline";

export async function getTimelineGroups(): Promise<Array<{ epoch: (typeof epochs)[number]; items: TimelineDetailItem[] }>> {
  const items = await listTimeline();
  return epochs.map((epoch) => ({
    epoch,
    items: items.filter((item) => item.year >= epoch.startYear && item.year < epoch.endYear),
  }));
}
