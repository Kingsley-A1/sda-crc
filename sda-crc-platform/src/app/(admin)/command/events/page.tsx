/**
 * Events Management Page
 * ======================
 * CRUD interface for managing events in the Command Center.
 *
 * "Let all things be done decently and in order." — 1 Corinthians 14:40
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { EventsTable } from "@/components/command/events/events-table";
import { EventStats } from "@/components/command/events/event-stats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Events | Command Center",
};

export const dynamic = 'force-dynamic';

async function getEvents() {
  const events = await db.event.findMany({
    orderBy: { startDate: "desc" },
    take: 50,
  });

  return events.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate?.toISOString() || null,
    location: e.location,
    imageUrl: e.imageUrl,
    isOnline: e.isOnline,
    onlineUrl: e.onlineUrl,
    category: e.category as "WORSHIP" | "FELLOWSHIP" | "EVANGELISM" | "TRAINING" | "YOUTH" | "CHILDREN" | "SPECIAL",
    featured: e.featured,
    published: e.published,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));
}

export default async function EventsManagementPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage upcoming and past events
          </p>
        </div>
        <Button asChild>
          <Link href="/command/events/new">+ Add Event</Link>
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
        <EventStats />
      </Suspense>

      <EventsTable rows={events} />
    </div>
  );
}
