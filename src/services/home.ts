import { listFeaturedCivilizations } from "@/repositories/civilizations";
import { listFeaturedIdeas } from "@/repositories/ideas";
import { listTimelinePreview } from "@/repositories/timeline";

export async function getHomeData() {
  const [civilizations, ideas] = await Promise.all([
    listFeaturedCivilizations(10),
    listFeaturedIdeas(5),
  ]);
  const timeline = await listTimelinePreview(civilizations);
  return { civilizations, ideas, timeline };
}
