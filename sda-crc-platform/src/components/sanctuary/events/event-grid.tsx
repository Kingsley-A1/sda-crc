import type { EventCard as EventCardData } from "@/types/event";

import { cn } from "@/lib/utils";
import { EventCard } from "./event-card";

export interface EventGridProps {
  events: EventCardData[];
  className?: string;
}

export function EventGrid({ events, className }: EventGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
