import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { CivilizationCard } from "@/components/civilization/CivilizationCard";
import { TimelinePreview } from "@/components/timeline/TimelinePreview";
import { HomeHero } from "@/components/home/HomeHero";
import { SectionHeader } from "@/components/home/SectionHeader";
import { FeaturedIdeaCard } from "@/components/home/FeaturedIdeaCard";
import { getHomeData } from "@/services/home";

export const revalidate = 3600;

export default async function HomePage() {
  const { civilizations, ideas, timeline } = await getHomeData();

  return (
    <>
      <HomeHero />

      {/* Timeline Section */}
      <section className="bg-slate-900 py-16 text-white" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            badgeEn="Across the centuries"
            badgeVi="Xuyên suốt các thế kỷ"
            titleEn="A journey through time"
            titleVi="Hành trình xuyên thời gian"
            subtitleEn="Follow the rise of civilizations and defining moments."
            subtitleVi="Theo dõi sự trỗi dậy của các nền văn minh và những thời khắc bước ngoặt."
            linkHref="/timeline"
            linkTextEn="Full timeline"
            linkTextVi="Toàn bộ dòng thời gian"
            dark
          />
          <ol aria-label="Journey through time" className="mb-12 flex flex-wrap gap-3">
            {[
              { label: "Big Bang", id: "big-bang" },
              { label: "Life", id: "origin-of-life" },
              { label: "Humans", id: "human-evolution" },
              { label: "Agriculture", id: "agriculture" },
              { label: "Civilizations", id: "ancient-civilizations" },
              { label: "Industrial Revolution", id: "industrial-revolution" },
              { label: "Internet", id: "information-age" },
              { label: "AI", id: "ai-age" },
            ].map((step, index) => (
              <li key={step.id} className="flex items-center gap-3">
                <Link
                  href={`/timeline#${step.id}`}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-amber-400 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-400"
                >
                  <span className="mr-2 text-amber-400">{index + 1}.</span>
                  {step.label}
                </Link>
                {index < 7 && <span className="text-slate-600" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
          <TimelinePreview items={timeline} />
        </div>
      </section>

      {/* Featured Civilizations */}
      <section className="py-20" aria-labelledby="civilizations-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            badgeEn="Explore the world"
            badgeVi="Khám phá thế giới"
            titleEn="Featured civilizations"
            titleVi="Các nền văn minh tiêu biểu"
            subtitleEn="Discover societies whose legacies reach across centuries."
            subtitleVi="Khám phá các xã hội với di sản vang vọng qua muôn thế kỷ."
            linkHref="/civilizations"
            linkTextEn="View all civilizations"
            linkTextVi="Xem tất cả nền văn minh"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {civilizations.map((item, index) => (
              <CivilizationCard key={item.slug} civilization={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ideas */}
      <section className="border-t border-slate-200 bg-white py-20" aria-labelledby="ideas-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            badgeEn="The ideas behind change"
            badgeVi="Những tư tưởng đằng sau sự đổi thay"
            titleEn="Featured ideas"
            titleVi="Các tư tưởng tiêu biểu"
            subtitleEn="Explore concepts that continue to shape how we live."
            subtitleVi="Khám phá các khái niệm tiếp tục định hình thế giới và cuộc sống con người."
            linkHref="/ideas"
            linkTextEn="Explore ideas"
            linkTextVi="Khám phá các tư tưởng"
            icon={<Lightbulb size={16} aria-hidden="true" />}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ideas.map((idea, index) => (
              <FeaturedIdeaCard key={idea.slug} idea={idea} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
