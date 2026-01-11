import { cn } from "@/lib/utils";
import type { EvangelismStatus } from "@/types/evangelism";

import { Badge, Card } from "@/components/ui";

export interface PhaseCardProps {
  status: EvangelismStatus;
  count: number;
  className?: string;
}

const LABELS: Record<EvangelismStatus, string> = {
  PLANNING: "Preparation",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  PAUSED: "Paused",
};

const VARIANTS: Record<EvangelismStatus, "info-subtle" | "success-subtle" | "subtle" | "warning-subtle"> = {
  PLANNING: "info-subtle",
  ACTIVE: "success-subtle",
  COMPLETED: "subtle",
  PAUSED: "warning-subtle",
};

export function PhaseCard({ status, count, className }: PhaseCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">{LABELS[status]}</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Evangelism sites</p>
        </div>
        <Badge variant={VARIANTS[status]} rounded="full" size="sm">
          {count}
        </Badge>
      </div>
    </Card>
  );
}
