import type { Metadata } from "next";
import { PersonCard } from "@/components/people/PersonCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { listPeopleGroups } from "@/services/people";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "People & Figures | Danh nhân Lịch sử",
  description: "Explore the thinkers, leaders, and creators who shaped human civilizations. Khám phá các triết gia, lãnh tụ và vĩ nhân lịch sử.",
};

export default async function PeoplePage() {
  const groups = await listPeopleGroups();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Historical Figures"
        badgeVi="Danh nhân Lịch sử"
        titleEn="People Who Shaped the World"
        titleVi="Những Nhân vật Định hình Thế giới"
        descriptionEn="Meet the thinkers, leaders, scientists, and creators who laid the foundations of human knowledge."
        descriptionVi="Gặp gỡ các nhà tư tưởng, lãnh đạo, nhà khoa học và tác gia đã đặt nền móng cho tri thức nhân loại."
      />
      <div className="mt-12 space-y-14">
        {groups.map(({ civilization, people }, index) => (
          <section key={civilization} aria-labelledby={`people-group-${index}`}>
            <h2 id={`people-group-${index}`} className="mb-6 text-2xl font-bold text-slate-900 border-l-4 border-amber-600 pl-3">
              {civilization}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((person) => (
                <PersonCard key={person.slug} person={person} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
