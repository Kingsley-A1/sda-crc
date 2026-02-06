/**
 * Workers Page
 * ============
 * Directory of church workers, leaders, and servants.
 * Displays workers in proper hierarchy order with honour badges.
 *
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { WorkersGrid } from "@/components/sanctuary/workers/workers-grid";
import { WorkerCategories } from "@/components/sanctuary/workers/worker-categories";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Our Workers",
  description:
    "Meet the dedicated servants who lead and serve in the SDA Cross River Conference.",
};

export const dynamic = 'force-dynamic';

// ============================================================================
// Data Fetching
// ============================================================================

async function getWorkers() {
  const workers = await db.member.findMany({
    where: { isWorker: true },
    orderBy: [{ workerOrder: "asc" }, { lastName: "asc" }],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      photoUrl: true,
      workerRole: true,
      workerOrder: true,
    },
  });

  return workers.map((w) => ({
    id: w.id,
    firstName: w.firstName,
    lastName: w.lastName,
    email: w.email,
    phone: w.phone,
    role: (w.workerRole || "VOLUNTEER") as import("@/types/worker").WorkerRole,
    roleLabel: w.workerRole || "Worker",
    title: null as string | null,
    department: null as string | null,
    bio: null as string | null,
    photoUrl: w.photoUrl,
    startDate: null as Date | string | null,
    endDate: null as Date | string | null,
    isActive: true,
    displayOrder: w.workerOrder,
    showOnWebsite: true,
    socialLinks: null as import("@/types/worker").WorkerSocialLinks | null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

// ============================================================================
// Loading Skeleton
// ============================================================================

function WorkersGridSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured Section Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-64 w-full md:w-72 rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4 space-y-3">
            <Skeleton className="h-32 w-32 mx-auto rounded-full" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Page Component
// ============================================================================

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <>
      <PageHeader
        title="Our Workers"
        subtitle="Faithful servants in God's vineyard"
        backgroundImage="/images/workers-header.jpg"
      />

      <Container className="py-8 md:py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The SDA Cross River Conference is blessed with dedicated workers who
            serve faithfully in various capacities. We honour those who labour
            in the Lord&apos;s vineyard.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <WorkerCategories />
        </div>

        {/* Workers Grid - Grouped by Category */}
        <Suspense fallback={<WorkersGridSkeleton />}>
          <WorkersGrid workers={workers} />
        </Suspense>
      </Container>
    </>
  );
}
