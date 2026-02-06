import { cn } from "@/lib/utils";

import { LeaderCard, type Leader } from "./leader-card";

export interface LeadershipGridProps {
  leaders: Leader[];
  className?: string;
}

export function LeadershipGrid({ leaders, className }: LeadershipGridProps) {
  return (
    <section className={cn("space-y-3", className)} aria-label="Leadership">
      <h2 className="text-base font-extrabold text-[var(--text-primary)]">
        Leadership
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {leaders.map((leader) => (
          <LeaderCard key={leader.id} leader={leader} />
        ))}
      </div>
    </section>
  );
}
