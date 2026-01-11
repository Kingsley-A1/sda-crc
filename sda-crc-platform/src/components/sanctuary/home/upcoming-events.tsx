import Link from "next/link";

import { Button } from "@/components/ui";
import { SectionHeader } from "@/components/layout";
import type { EventCard as EventCardData } from "@/types/event";

import { EventGrid } from "../events/event-grid";

export interface UpcomingEventsProps {
  events: EventCardData[];
  className?: string;
}

export function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  return (
    <section className={className} aria-label="Upcoming events">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          title="Upcoming Events"
          description="Stay informed and join us in worship, training, and mission."
        />
        <Button asChild variant="ghost" size="sm" className="min-h-11">
          <Link href="/events">View all</Link>
        </Button>
      </div>

      <div className="mt-4">
        <EventGrid events={events} />
      </div>
    </section>
  );
}
