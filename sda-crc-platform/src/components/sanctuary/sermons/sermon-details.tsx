import { Badge, Card } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { Sermon } from "@/types/sermon";

import { SermonPlayer } from "./sermon-player";

export interface SermonDetailsProps {
  sermon: Sermon;
}

export function SermonDetails({ sermon }: SermonDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-balance text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
          {sermon.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" rounded="full" size="sm">
            {sermon.speaker}
          </Badge>
          <Badge variant="subtle" rounded="full" size="sm">
            {formatDate(sermon.date)}
          </Badge>
          {sermon.scriptureReference ? (
            <Badge variant="info-subtle" rounded="full" size="sm">
              {sermon.scriptureReference}
            </Badge>
          ) : null}
          {sermon.series ? (
            <Badge variant="success-subtle" rounded="full" size="sm">
              {sermon.series}
            </Badge>
          ) : null}
        </div>

        {sermon.description ? (
          <Card className="mt-4 p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">
              {sermon.description}
            </p>
          </Card>
        ) : null}

        {sermon.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Sermon tags">
            {sermon.tags.map((tag) => (
              <Badge key={tag} variant="outline" rounded="full" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-1">
        <SermonPlayer
          title={sermon.title}
          videoUrl={sermon.videoUrl}
          audioUrl={sermon.audioUrl}
          storageKey={`sermon:${sermon.id}`}
        />
      </div>
    </div>
  );
}
