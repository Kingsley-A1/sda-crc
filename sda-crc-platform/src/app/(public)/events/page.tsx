/**
 * Events Page
 * ===========
 * Browse upcoming and past events from the SDA Cross River Conference.
 * 
 * "And let us consider how we may spur one another on toward love and good deeds." — Hebrews 10:24
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { EventsGrid } from "@/components/sanctuary/events/events-grid";
import { EventsCalendar } from "@/components/sanctuary/events/events-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming events, programs, and gatherings at the SDA Cross River Conference.",
};

// ============================================================================
// Loading Skeleton
// ============================================================================

function EventsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-4 space-y-4">
          <Skeleton className="h-40 rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Page Component
// ============================================================================

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Join us in fellowship and worship"
        backgroundImage="/images/events-header.jpg"
      />

      <Container className="py-8 md:py-12">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Suspense fallback={<EventsGridSkeleton />}>
              <EventsGrid filter="upcoming" />
            </Suspense>
          </TabsContent>

          <TabsContent value="calendar">
            <Suspense fallback={<Skeleton className="h-[500px] rounded-xl" />}>
              <EventsCalendar />
            </Suspense>
          </TabsContent>

          <TabsContent value="past">
            <Suspense fallback={<EventsGridSkeleton />}>
              <EventsGrid filter="past" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}
