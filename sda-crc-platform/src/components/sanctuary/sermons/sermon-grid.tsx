import type { SermonCard as SermonCardData } from "@/types/sermon";

import { cn } from "@/lib/utils";
import { SermonCard } from "./sermon-card";

export interface SermonGridProps {
  sermons: SermonCardData[];
  className?: string;
}

export function SermonGrid({ sermons, className }: SermonGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {sermons.map((sermon) => (
        <SermonCard key={sermon.id} sermon={sermon} />
      ))}
    </div>
  );
}
