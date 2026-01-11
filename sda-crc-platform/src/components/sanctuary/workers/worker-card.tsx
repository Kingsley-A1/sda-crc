import Image from "next/image";

import { GoldBadge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { WorkerWithLabel } from "@/types/worker";

export interface WorkerCardProps {
  worker: WorkerWithLabel;
  className?: string;
}

export function WorkerCard({ worker, className }: WorkerCardProps) {
  const fullName = `${worker.firstName} ${worker.lastName}`;

  return (
    <Card className={cn("p-4", className)} interactive hover="lift">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-[var(--secondary)]/40 bg-[var(--background-alt)]">
          {worker.photoUrl ? (
            <Image src={worker.photoUrl} alt={fullName} fill className="object-cover" sizes="80px" />
          ) : null}
        </div>

        <p className="mt-3 text-sm font-extrabold text-[var(--text-primary)]">{fullName}</p>
        {worker.title ? (
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{worker.title}</p>
        ) : null}

        <div className="mt-3">
          <GoldBadge size="sm">{worker.roleLabel}</GoldBadge>
        </div>

        {worker.department ? (
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">{worker.department}</p>
        ) : null}
      </div>
    </Card>
  );
}
