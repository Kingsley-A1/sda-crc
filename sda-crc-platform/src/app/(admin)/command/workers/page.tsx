/**
 * Workers Management Page
 * =======================
 * CRUD interface for managing church workers.
 *
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { WorkersTable } from "@/components/command/workers/workers-table";
import { WorkerStats } from "@/components/command/workers/worker-stats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Workers | Command Center",
};

export const dynamic = 'force-dynamic';

async function getWorkers() {
  const workers = await db.worker.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { lastName: "asc" }],
  });

  type WorkerQueryResult = typeof workers[number];

  return workers.map((w: WorkerQueryResult) => ({
    id: w.id,
    firstName: w.firstName,
    lastName: w.lastName,
    email: w.email,
    phone: w.phone,
    role: w.role,
    title: w.title,
    department: w.department,
    bio: w.bio,
    photoUrl: w.photoUrl,
    startDate: w.startDate?.toISOString() || null,
    endDate: w.endDate?.toISOString() || null,
    isActive: w.isActive,
    displayOrder: w.displayOrder,
    showOnWebsite: w.showOnWebsite,
    socialLinks: w.socialLinks as Record<string, string> | null,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));
}

export default async function WorkersManagementPage() {
  const workers = await getWorkers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Workers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage church workers and their roles
          </p>
        </div>
        <Button asChild>
          <Link href="/command/workers/new">+ Add Worker</Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        }
      >
        <WorkerStats />
      </Suspense>

      <WorkersTable rows={workers} />
    </div>
  );
}
