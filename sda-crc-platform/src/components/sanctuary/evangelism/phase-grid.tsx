import type { EvangelismSiteCard, EvangelismStatus } from "@/types/evangelism";

import { cn } from "@/lib/utils";
import { PhaseCard } from "./phase-card";

export interface PhaseGridProps {
  sites: EvangelismSiteCard[];
  className?: string;
}

const STATUSES: EvangelismStatus[] = ["PLANNING", "ACTIVE", "COMPLETED", "PAUSED"];

export function PhaseGrid({ sites, className }: PhaseGridProps) {
  const counts = STATUSES.reduce((acc, status) => {
    acc[status] = sites.filter((s) => s.status === status).length;
    return acc;
  }, {} as Record<EvangelismStatus, number>);

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {STATUSES.map((status) => (
        <PhaseCard key={status} status={status} count={counts[status] ?? 0} />
      ))}
    </div>
  );
}
