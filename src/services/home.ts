import { listAllCivilizations, listFeaturedCivilizations } from "@/repositories/civilizations";
import { listFeaturedIdeas } from "@/repositories/ideas";
import { listTimelinePreview } from "@/repositories/timeline";

export async function getHomeData() {
  const [civilizations, ideas, allCivilizations] = await Promise.all([
    listFeaturedCivilizations(),
    listFeaturedIdeas(),
    listAllCivilizations(),
  ]);
  const timeline = await listTimelinePreview(allCivilizations);
  return { civilizations, ideas, timeline };
}
