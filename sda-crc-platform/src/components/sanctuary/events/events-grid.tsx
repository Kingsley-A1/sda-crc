/**
 * Events Grid Component
 * =====================
 * Grid display of events with filtering support.
 */

"use client";

import { useState, useEffect } from "react";
import { EventCard } from "./event-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { EventCard as EventCardData } from "@/types/event";

interface EventsGridProps {
  filter?: "upcoming" | "past" | "all";
}

export function EventsGrid({ filter = "upcoming" }: EventsGridProps) {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const params = new URLSearchParams();
        if (filter === "upcoming") {
          params.set("upcoming", "true");
        } else if (filter === "past") {
          params.set("past", "true");
        }

        const res = await fetch(`/api/events?${params}`);
        const data = await res.json();
        setEvents(data.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [filter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          {filter === "upcoming"
            ? "No upcoming events at this time."
            : filter === "past"
            ? "No past events to show."
            : "No events found."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
