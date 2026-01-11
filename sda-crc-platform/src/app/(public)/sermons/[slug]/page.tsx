/**
 * Sermon Detail Page
 * ==================
 * Individual sermon page with video/audio player and details.
 * 
 * "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { SermonDetails } from "@/components/sanctuary/sermons/sermon-details";
import { SermonPlayer } from "@/components/sanctuary/sermons/sermon-player";
import { db } from "@/lib/db";

// ============================================================================
// Types
// ============================================================================

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ============================================================================
// Data Fetching
// ============================================================================

async function getSermon(slug: string) {
  const sermon = await db.sermon.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      series: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return sermon;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermon(slug);

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    };
  }

  return {
    title: sermon.title,
    description: sermon.description || `Listen to "${sermon.title}" by ${sermon.preacher}`,
    openGraph: {
      title: sermon.title,
      description: sermon.description || undefined,
      type: "article",
      images: sermon.thumbnailUrl ? [sermon.thumbnailUrl] : undefined,
    },
  };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SermonPage({ params }: PageProps) {
  const { slug } = await params;
  const sermon = await getSermon(slug);

  if (!sermon) {
    notFound();
  }

  // Map database sermon to component expected type
  const sermonData = {
    id: sermon.id,
    title: sermon.title,
    speaker: sermon.preacher,
    date: sermon.date.toISOString(),
    description: sermon.description || null,
    scriptureReference: sermon.scriptureReference || null,
    series: sermon.series?.name || null,
    videoUrl: sermon.videoUrl || null,
    audioUrl: sermon.audioUrl || null,
    thumbnailUrl: sermon.thumbnailUrl || null,
    duration: sermon.duration || null,
    tags: [],
    slug: sermon.slug,
    published: sermon.isPublished,
    viewCount: sermon.viewCount || 0,
    createdAt: sermon.createdAt.toISOString(),
    updatedAt: sermon.updatedAt.toISOString(),
  };

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Video/Audio Player */}
        <div className="mb-8">
          <SermonPlayer
            videoUrl={sermon.videoUrl}
            audioUrl={sermon.audioUrl}
            title={sermon.title}
          />
        </div>

        {/* Sermon Details */}
        <SermonDetails sermon={sermonData} />
      </div>
    </Container>
  );
}
