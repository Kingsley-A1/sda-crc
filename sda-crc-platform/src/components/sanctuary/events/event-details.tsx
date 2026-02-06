"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, MapPin } from "@phosphor-icons/react";

import { Badge, Button, Card } from "@/components/ui";
import { formatDateTime } from "@/lib/utils";
import type { Event } from "@/types/event";

export interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-balance text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          {event.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge
            variant={event.featured ? "secondary" : "subtle"}
            rounded="full"
            size="sm"
          >
            {event.category}
          </Badge>
          <Badge variant="outline" rounded="full" size="sm">
            {formatDateTime(event.startDate)}
          </Badge>
          {event.isOnline ? (
            <Badge
              variant="info-subtle"
              rounded="full"
              size="sm"
              leftIcon={<Globe className="h-3.5 w-3.5" weight="bold" />}
            >
              Online
            </Badge>
          ) : null}
          {!event.isOnline && event.location ? (
            <Badge
              variant="info-subtle"
              rounded="full"
              size="sm"
              leftIcon={<MapPin className="h-3.5 w-3.5" weight="bold" />}
            >
              {event.location}
            </Badge>
          ) : null}
        </div>

        {event.imageUrl ? (
          <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)]">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : null}

        {event.description ? (
          <Card className="mt-4 p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">
              {event.description}
            </p>
          </Card>
        ) : null}
      </div>

      <div className="lg:col-span-1">
        <Card className="p-4">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Event Info
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Starts: {formatDateTime(event.startDate)}
          </p>
          {event.endDate ? (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Ends: {formatDateTime(event.endDate)}
            </p>
          ) : null}

          {event.isOnline && event.onlineUrl ? (
            <div className="mt-4">
              <Button asChild className="min-h-11 w-full">
                <Link href={event.onlineUrl} target="_blank" rel="noreferrer">
                  Join online
                </Link>
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
