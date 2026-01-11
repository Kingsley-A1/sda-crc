import Image from "next/image";

import { cn } from "@/lib/utils";
import type { DepartmentWithLeader } from "@/types/department";

export interface DepartmentHeroProps {
  department: DepartmentWithLeader;
  className?: string;
}

export function DepartmentHero({ department, className }: DepartmentHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
      aria-label="Department overview"
    >
      <div className="relative min-h-[180px] sm:min-h-[220px]">
        {department.imageUrl ? (
          <Image
            src={department.imageUrl}
            alt={department.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h1 className="text-balance text-xl font-extrabold text-white sm:text-2xl">
            {department.name}
          </h1>
          {department.mission ? (
            <p className="mt-2 line-clamp-3 text-sm text-white/90">
              {department.mission}
            </p>
          ) : null}
          {department.leader ? (
            <p className="mt-3 text-xs text-white/80">
              Director: {department.leader.firstName} {department.leader.lastName}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
