"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "@phosphor-icons/react";

import { Badge, Button, Card } from "@/components/ui";
import { cn, formatDate } from "@/lib/utils";
import type { SermonCard as SermonCardData } from "@/types/sermon";

export interface FeaturedSermonProps {
  sermon: SermonCardData;
  className?: string;
}

export function FeaturedSermon({ sermon, className }: FeaturedSermonProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
      padding="none"
    >
      <div className="relative min-h-[220px] sm:min-h-[260px]">
        {sermon.thumbnailUrl ? (
          <Image
            src={sermon.thumbnailUrl}
            alt={sermon.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" rounded="full" size="sm">
              Featured
            </Badge>
            {sermon.series ? (
              <Badge variant="info-subtle" rounded="full" size="sm">
                {sermon.series}
              </Badge>
            ) : null}
          </div>

          <h2 className="mt-3 text-balance text-xl font-extrabold text-white sm:text-2xl">
            {sermon.title}
          </h2>

          <p className="mt-1 text-sm text-white/90">
            {sermon.speaker} • {formatDate(sermon.date, { month: "short" })}
          </p>

          <div className="mt-4">
            <Button
              asChild
              className="min-h-11"
              leftIcon={<Play className="h-4 w-4" weight="fill" />}
            >
              <Link href={`/sermons/${sermon.slug}`}>Watch / Listen</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
