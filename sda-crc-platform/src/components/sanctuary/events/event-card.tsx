"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe } from "@phosphor-icons/react";

import { Badge, Card } from "@/components/ui";
import { cn, formatDateTime } from "@/lib/utils";
import type { EventCard as EventCardData } from "@/types/event";

export interface EventCardProps {
  event: EventCardData;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card
      asChild
      interactive
      hover="lift"
      padding="none"
      className={cn("overflow-hidden", className)}
    >
      <Link href={`/events/${event.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] w-full bg-[var(--background-alt)]">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            />
          ) : null}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge
              variant={event.featured ? "secondary" : "subtle"}
              size="sm"
              rounded="full"
            >
              {event.category}
            </Badge>
            {event.isOnline ? (
              <Badge
                variant="info-subtle"
                size="sm"
                rounded="full"
                leftIcon={<Globe className="h-3.5 w-3.5" weight="bold" />}
              >
                Online
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="p-4">
          <p className="line-clamp-2 text-sm font-bold text-[var(--text-primary)]">
            {event.title}
          </p>

          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            {formatDateTime(event.startDate)}
          </p>

          {event.location ? (
            <p className="mt-1 line-clamp-1 text-xs text-[var(--text-tertiary)]">
              {event.location}
            </p>
          ) : null}
        </div>
      </Link>
    </Card>
  );
}
