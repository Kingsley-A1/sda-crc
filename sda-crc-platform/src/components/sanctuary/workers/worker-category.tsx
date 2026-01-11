import { cn } from "@/lib/utils";
import type { WorkerWithLabel } from "@/types/worker";

import { WorkerCard } from "./worker-card";

export interface WorkerCategoryProps {
  title: string;
  description?: string;
  workers: WorkerWithLabel[];
  className?: string;
}

export function WorkerCategory({ title, description, workers, className }: WorkerCategoryProps) {
  return (
    <section className={cn("space-y-3", className)} aria-label={title}>
      <div>
        <h2 className="text-base font-extrabold text-[var(--text-primary)]">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {workers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>
    </section>
  );
}
