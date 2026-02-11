"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarBlank,
  MapPin,
  Clock,
  Users,
  Tag,
} from "@phosphor-icons/react";
import { Badge, Button } from "@/components/ui";
import Link from "next/link";

interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  location: string | null;
  category: string;
  imageUrl: string | null;
  published: boolean;
}

interface EventDetailsProps {
  event: EventData;
}

function formatDate(dateStr: Date | string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(dateStr: Date | string): string {
  return new Date(dateStr).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventDetails({ event }: EventDetailsProps) {
  const eventDate = event.startDate;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Image */}
      {event.imageUrl && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
        {event.title}
      </h1>

      {/* Meta */}
      <div className="space-y-3 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <CalendarBlank className="h-5 w-5 text-primary" />
          <span>{formatDate(eventDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>
            {formatTime(eventDate)}
            {event.endDate ? ` — ${formatTime(event.endDate)}` : ""}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <Badge variant="success" size="sm">
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <div className="prose prose-green max-w-none mb-8">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>
      )}

      {/* Back */}
      <Link href="/events">
        <Button variant="outline" size="sm">
          ← Back to Events
        </Button>
      </Link>
    </motion.div>
  );
}
