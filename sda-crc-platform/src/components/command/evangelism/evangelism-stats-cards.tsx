import type { EvangelismStats } from "@/types/evangelism";
import { cn } from "@/lib/utils";

import { StatsGrid } from "@/components/command/dashboard";

export interface EvangelismStatsCardsProps {
  stats: EvangelismStats;
  className?: string;
}

export function EvangelismStatsCards({
  stats,
  className,
}: EvangelismStatsCardsProps) {
  return (
    <StatsGrid
      className={cn(className)}
      stats={[
        { label: "Total sites", value: stats.totalSites },
        { label: "Active sites", value: stats.activeSites },
        { label: "Baptisms", value: stats.totalBaptisms },
        { label: "Decisions", value: stats.totalDecisions },
      ]}
    />
  );
}
