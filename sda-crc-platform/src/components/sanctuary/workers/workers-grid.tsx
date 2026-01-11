import type { WorkerRole } from "@/lib/validators";
import { ROLE_CATEGORIES, groupWorkersByCategory, isLeadershipRole, getRoleLabel } from "@/lib/worker-roles";
import { cn } from "@/lib/utils";
import type { WorkerWithLabel } from "@/types/worker";

import { PastorCard } from "./pastor-card";
import { WorkerCategory } from "./worker-category";

export interface WorkersGridProps {
  workers: WorkerWithLabel[];
  className?: string;
}

function ensureRoleLabel(worker: WorkerWithLabel): WorkerWithLabel {
  if (worker.roleLabel) return worker;
  return { ...worker, roleLabel: getRoleLabel(worker.role as unknown as WorkerRole) };
}

export function WorkersGrid({ workers, className }: WorkersGridProps) {
  const normalized = workers.map(ensureRoleLabel);

  const featured = normalized.filter((w) => isLeadershipRole(w.role as unknown as WorkerRole));
  const rest = normalized.filter((w) => !isLeadershipRole(w.role as unknown as WorkerRole));

  const grouped = groupWorkersByCategory(rest as Array<{ role: WorkerRole }>);

  return (
    <div className={cn("space-y-6", className)}>
      {featured.length ? (
        <section aria-label="Featured leadership" className="space-y-3">
          <h2 className="text-base font-extrabold text-[var(--text-primary)]">Leadership</h2>
          <div className="space-y-3">
            {featured.map((w) => (
              <PastorCard key={w.id} worker={w} />
            ))}
          </div>
        </section>
      ) : null}

      {Array.from(grouped.entries()).map(([category, categoryWorkers]) => {
        const categoryMeta = ROLE_CATEGORIES[category];

        return (
          <WorkerCategory
            key={category}
            title={categoryMeta?.label ?? category.replace(/_/g, " ")}
            description={categoryMeta?.description}
            workers={categoryWorkers as unknown as WorkerWithLabel[]}
          />
        );
      })}
    </div>
  );
}
