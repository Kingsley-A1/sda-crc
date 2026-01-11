import { cn } from "@/lib/utils";

import { StatCard } from "./stat-card";

export interface DashboardStat {
  label: string;
  value: string | number;
  hint?: string;
}

export interface StatsGridProps {
  stats: DashboardStat[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
      {stats.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} />
      ))}
    </div>
  );
}
