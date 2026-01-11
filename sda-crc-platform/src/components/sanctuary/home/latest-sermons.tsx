import Link from "next/link";

import { SectionHeader } from "@/components/layout";
import { Button } from "@/components/ui";
import type { SermonCard as SermonCardData } from "@/types/sermon";

import { SermonGrid } from "../sermons/sermon-grid";

export interface LatestSermonsProps {
  sermons: SermonCardData[];
  className?: string;
}

export function LatestSermons({ sermons, className }: LatestSermonsProps) {
  return (
    <section className={className} aria-label="Latest sermons">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          title="Latest Sermons"
          description="Be strengthened by the Word — recent messages from our pulpits."
        />
        <Button asChild variant="ghost" size="sm" className="min-h-11">
          <Link href="/sermons">View all</Link>
        </Button>
      </div>

      <div className="mt-4">
        <SermonGrid sermons={sermons} />
      </div>
    </section>
  );
}
