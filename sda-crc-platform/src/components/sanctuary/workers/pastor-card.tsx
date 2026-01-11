import Image from "next/image";

import { GoldBadge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { WorkerWithLabel } from "@/types/worker";

export interface PastorCardProps {
  worker: WorkerWithLabel;
  className?: string;
}

export function PastorCard({ worker, className }: PastorCardProps) {
  const fullName = `${worker.firstName} ${worker.lastName}`;

  return (
    <Card
      className={cn(
        "border-2 border-[var(--secondary)] bg-gradient-to-br from-amber-50/70 to-white p-5",
        className
      )}
      interactive
      hover="glow"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-[var(--secondary)] bg-[var(--background-alt)]">
          {worker.photoUrl ? (
            <Image src={worker.photoUrl} alt={fullName} fill className="object-cover" sizes="80px" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-extrabold text-[var(--text-primary)]">{fullName}</p>
          {worker.title ? (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{worker.title}</p>
          ) : null}
          <div className="mt-3">
            <GoldBadge>{worker.roleLabel}</GoldBadge>
          </div>
        </div>
      </div>
    </Card>
  );
}
