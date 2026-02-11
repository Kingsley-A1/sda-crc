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
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-foreground">{value}</p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground/60">{hint}</p>
      ) : null}
    </Card>
  );
}
