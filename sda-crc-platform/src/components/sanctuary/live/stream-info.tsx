import Link from "next/link";

import { Card, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

import { LiveBadge } from "./live-badge";

export interface StreamInfoProps {
  title?: string | null;
  isLive: boolean;
  watchUrl?: string | null;
  className?: string;
}

export function StreamInfo({ title, isLive, watchUrl, className }: StreamInfoProps) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">
            {title || "Worship Service"}
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {isLive ? "We are live now. Join and worship with us." : "Stream is currently offline."}
          </p>
        </div>
        {isLive ? <LiveBadge /> : null}
      </div>

      {watchUrl ? (
        <div className="mt-4">
          <Button asChild variant="outline" className="min-h-11 w-full">
            <Link href={watchUrl} target="_blank" rel="noreferrer">
              Open on platform
            </Link>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
