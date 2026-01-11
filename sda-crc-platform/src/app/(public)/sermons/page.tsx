/**
 * Sermons Page
 * ============
 * Browse and watch/listen to sermons from the SDA Cross River Conference.
 * Features filtering, search, and featured sermon highlighting.
 * 
 * "Faith comes from hearing the message." — Romans 10:17
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { SermonGrid } from "@/components/sanctuary/sermons/sermon-grid";
import { FeaturedSermon } from "@/components/sanctuary/sermons/featured-sermon";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch and listen to inspiring sermons from the SDA Cross River Conference. Search by preacher, topic, or series.",
};

// ============================================================================
// Data Fetching
// ============================================================================

async function getSermonsPageData() {
  const [featuredSermon, sermons] = await Promise.all([
    db.sermon.findFirst({
      where: { isFeatured: true },
      include: { series: true },
    }),
    db.sermon.findMany({
      orderBy: { date: "desc" },
      take: 12,
      include: { series: true },
    }),
  ]);

  return {
    featuredSermon: featuredSermon || sermons[0] || null,
    sermons,
  };
}

// ============================================================================
// Loading Skeletons
// ============================================================================

function FeaturedSermonSkeleton() {
  return (
    <div className="aspect-video w-full rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
  );
}

function SermonGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SermonsPage() {
  const { featuredSermon, sermons } = await getSermonsPageData();

  return (
    <>
      <PageHeader
        title="Sermons"
        subtitle="Feed your soul with the Word of God"
        backgroundImage="/images/sermons-header.jpg"
      />

      <Container className="py-8 md:py-12">
        {/* Featured Sermon */}
        {featuredSermon && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">
              Featured Message
            </h2>
            <Suspense fallback={<FeaturedSermonSkeleton />}>
              <FeaturedSermon sermon={featuredSermon} />
            </Suspense>
          </section>
        )}

        {/* Sermon Grid */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">
            All Sermons
          </h2>
          <Suspense fallback={<SermonGridSkeleton />}>
            <SermonGrid sermons={sermons} />
          </Suspense>
        </section>
      </Container>
    </>
  );
}
