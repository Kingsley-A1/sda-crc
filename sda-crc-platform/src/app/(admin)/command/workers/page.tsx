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
import type { WorkerRole } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Manage Workers | Command Center",
};

async function getWorkers() {
  const workers = await db.member.findMany({
    where: { isWorker: true },
    orderBy: [{ workerOrder: "asc" }, { lastName: "asc" }],
  });

  return workers.map((w: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    photoUrl: string | null;
    workerRole: string | null;
    workerOrder: number | null;
  }) => ({
    id: w.id,
    firstName: w.firstName,
    lastName: w.lastName,
    email: w.email,
    phone: w.phone || undefined,
    photoUrl: w.photoUrl || undefined,
    role: (w.workerRole || "OTHER") as WorkerRole,
    isActive: true,
    order: w.workerOrder || 999,
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
