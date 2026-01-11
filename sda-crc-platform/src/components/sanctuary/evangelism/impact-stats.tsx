import { cn } from "@/lib/utils";
import type { EvangelismStats } from "@/types/evangelism";

import { Card } from "@/components/ui";

export interface ImpactStatsProps {
  stats: EvangelismStats;
  className?: string;
}

export function ImpactStats({ stats, className }: ImpactStatsProps) {
  const items = [
    { label: "Sites", value: stats.totalSites },
    { label: "Active", value: stats.activeSites },
    { label: "Completed", value: stats.completedSites },
    { label: "Decisions", value: stats.totalDecisions },
    { label: "Baptisms", value: stats.totalBaptisms },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-5", className)}>
      {items.map((it) => (
        <Card key={it.label} className="p-4">
          <p className="text-xs text-[var(--text-secondary)]">{it.label}</p>
          <p className="mt-1 text-lg font-extrabold text-[var(--text-primary)]">{it.value}</p>
        </Card>
      ))}
    </div>
  );
}
