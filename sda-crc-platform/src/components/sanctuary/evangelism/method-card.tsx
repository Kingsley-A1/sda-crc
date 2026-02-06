import { cn } from "@/lib/utils";

import { Card } from "@/components/ui";

export interface MethodCardProps {
  title: string;
  description: string;
  className?: string;
}

export function MethodCard({ title, description, className }: MethodCardProps) {
  return (
    <Card className={cn("p-4", className)} interactive hover="lift">
      <p className="text-sm font-bold text-[var(--text-primary)]">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
        {description}
      </p>
    </Card>
  );
}
