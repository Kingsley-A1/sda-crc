import { cn, formatDate } from "@/lib/utils";
import type { EventCard as EventCardData } from "@/types/event";

import { EventCard } from "./event-card";

export interface EventCalendarProps {
  events: EventCardData[];
  className?: string;
}

function groupByDay(
  events: EventCardData[]
): Array<{ day: string; items: EventCardData[] }> {
  const map = new Map<string, EventCardData[]>();
  for (const e of events) {
    const day = formatDate(e.startDate, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    map.set(day, [...(map.get(day) ?? []), e]);
  }
  return Array.from(map.entries()).map(([day, items]) => ({ day, items }));
}

export function EventCalendar({ events, className }: EventCalendarProps) {
  const groups = groupByDay(events);

  return (
    <div className={cn("space-y-5", className)}>
      {groups.map((group) => (
        <section key={group.day} aria-label={`Events on ${group.day}`}>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            {group.day}
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
