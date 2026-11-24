import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEARNING_TRACKS, getLearningTrack } from "@/lib/learning-paths-data";
import { TrackDetailView } from "@/components/learn/TrackDetailView";

interface LearnTrackPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LEARNING_TRACKS.map((track) => ({
    slug: track.slug,
  }));
}

export async function generateMetadata({ params }: LearnTrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = getLearningTrack(slug);

  if (!track) {
    return {
      title: "Track Not Found | Human Civilization Atlas",
    };
  }

  return {
    title: `${track.titleEn} | ${track.titleVi} - Human Civilization Atlas`,
    description: track.descriptionEn,
  };
}

export default async function LearnTrackPage({ params }: LearnTrackPageProps) {
  const { slug } = await params;
  const track = getLearningTrack(slug);

  if (!track) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <TrackDetailView track={track} />
    </div>
  );
}
