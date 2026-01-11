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

// ============================================================================
// Data Fetching
// ============================================================================

async function getSermons() {
  const sermons = await db.sermon.findMany({
    orderBy: { date: "desc" },
    take: 50,
    include: { series: true },
  });

  return sermons.map((s: {
    id: string;
    title: string;
    slug: string;
    preacher: string;
    date: Date;
    scriptureReference: string | null;
    description: string | null;
    series: { name: string } | null;
    videoUrl: string | null;
    audioUrl: string | null;
    thumbnailUrl: string | null;
    duration: number | null;
    isPublished: boolean;
  }) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    speaker: s.preacher,
    date: s.date.toISOString(),
    scriptureReference: s.scriptureReference || undefined,
    description: s.description || undefined,
    series: s.series?.name || undefined,
    videoUrl: s.videoUrl || undefined,
    audioUrl: s.audioUrl || undefined,
    thumbnailUrl: s.thumbnailUrl || undefined,
    duration: s.duration || undefined,
    published: s.isPublished,
    tags: [],
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
