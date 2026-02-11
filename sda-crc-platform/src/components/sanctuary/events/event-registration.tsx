"use client";

import { Card, Button } from "@/components/ui";
import { CalendarBlank, MapPin } from "@phosphor-icons/react";

interface EventRegistrationProps {
  event: {
    id: string;
    title: string;
    startDate: Date | string;
    location: string | null;
  };
}

export function EventRegistration({ event }: EventRegistrationProps) {
  const eventDate = event.startDate;

  return (
    <Card variant="bordered" className="p-6">
      <h3 className="font-bold text-lg text-foreground mb-4">Event Details</h3>

      <div className="space-y-3 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <CalendarBlank className="h-4 w-4 text-primary" />
          <span>
            {eventDate
              ? new Date(eventDate).toLocaleDateString("en-NG", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "TBA"}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      <Button fullWidth>I&apos;ll Be There!</Button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Free admission. All are welcome!
      </p>
    </Card>
  );
}
