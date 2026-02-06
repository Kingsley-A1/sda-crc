import { cn } from "@/lib/utils";

import { Card } from "@/components/ui";

export interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-xs text-[var(--text-secondary)]">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-[var(--text-primary)]">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">{hint}</p>
      ) : null}
    </Card>
  );
}
