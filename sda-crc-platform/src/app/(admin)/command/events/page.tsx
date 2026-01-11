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

async function getEvents() {
  const events = await db.event.findMany({
    orderBy: { date: "desc" },
    take: 50,
  });

  return events.map((e: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    date: Date;
    endDate: Date | null;
    location: string | null;
    isOnline: boolean;
    onlineLink: string | null;
    imageUrl: string | null;
    category: string;
    isFeatured: boolean;
    requiresRegistration: boolean;
    maxAttendees: number | null;
    isPublished: boolean;
  }) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description || undefined,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString(),
    location: e.location || undefined,
    isOnline: e.isOnline || false,
    onlineLink: e.onlineLink || undefined,
    imageUrl: e.imageUrl || undefined,
    category: (e.category as "conference" | "youth" | "prayer" | "music" | "workshop" | "social" | "other") || "other",
    featured: e.isFeatured || false,
    requiresRegistration: e.requiresRegistration || false,
    maxAttendees: e.maxAttendees || undefined,
    published: e.isPublished,
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
