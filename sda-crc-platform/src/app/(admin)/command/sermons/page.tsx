/**
 * Sermons Management Page
 * =======================
 * CRUD interface for managing sermons in the Command Center.
 *
 * "Preach the word; be prepared in season and out of season." — 2 Timothy 4:2
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { SermonsTable } from "@/components/command/sermons/sermons-table";
import { SermonStats } from "@/components/command/sermons/sermon-stats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Manage Sermons | Command Center",
  description: "Create, edit, and manage sermons",
};

export const dynamic = 'force-dynamic';

// ============================================================================
// Data Fetching
// ============================================================================

async function getSermons() {
  const sermons = await db.sermon.findMany({
    orderBy: { date: "desc" },
    take: 50,
  });

  return sermons.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    speaker: s.speaker,
    date: s.date.toISOString(),
    description: s.description,
    audioUrl: s.audioUrl,
    videoUrl: s.videoUrl,
    thumbnailUrl: s.thumbnailUrl,
    duration: s.duration,
    scriptureReference: s.scriptureReference,
    series: s.series,
    tags: s.tags,
    published: s.published,
    viewCount: s.viewCount,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SermonsManagementPage() {
  const sermons = await getSermons();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sermons</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage sermon recordings and series
          </p>
        </div>
        <Button asChild>
          <Link href="/command/sermons/new">+ Add Sermon</Link>
        </Button>
      </div>

      {/* Stats */}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        }
      >
        <SermonStats />
      </Suspense>

      {/* Sermons Table */}
      <SermonsTable rows={sermons} />
    </div>
  );
}
