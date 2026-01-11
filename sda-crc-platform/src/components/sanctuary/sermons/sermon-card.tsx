import Image from "next/image";
import Link from "next/link";

import { Badge, Card } from "@/components/ui";
import { cn, formatDate } from "@/lib/utils";
import type { SermonCard as SermonCardData } from "@/types/sermon";

export interface SermonCardProps {
  sermon: SermonCardData;
  className?: string;
}

function formatDuration(seconds: number | null): string | null {
  if (!seconds || seconds <= 0) return null;
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;

  if (hrs > 0) return `${hrs}h ${remMins}m`;
  return `${mins}m`;
}

export function SermonCard({ sermon, className }: SermonCardProps) {
  const durationLabel = formatDuration(sermon.duration ?? null);

  return (
    <Card
      asChild
      interactive
      hover="lift"
      padding="none"
      className={cn("overflow-hidden", className)}
    >
      <Link href={`/sermons/${sermon.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] w-full bg-[var(--background-alt)]">
          {sermon.thumbnailUrl ? (
            <Image
              src={sermon.thumbnailUrl}
              alt={sermon.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            />
          ) : null}

          <div className="absolute left-3 top-3 flex gap-2">
            {sermon.series ? (
              <Badge variant="subtle" size="sm" rounded="full">
                {sermon.series}
              </Badge>
            ) : null}
            {durationLabel ? (
              <Badge variant="muted" size="sm" rounded="full">
                {durationLabel}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="p-4">
          <p className="line-clamp-2 text-sm font-bold text-[var(--text-primary)]">
            {sermon.title}
          </p>
          <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
            {sermon.speaker}
          </p>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
            {formatDate(sermon.date)}
          </p>
        </div>
      </Link>
    </Card>
  );
}
