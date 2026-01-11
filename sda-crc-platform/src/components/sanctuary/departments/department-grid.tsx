import type { DepartmentCard as DepartmentCardData } from "@/types/department";

import { cn } from "@/lib/utils";
import { DepartmentCard } from "./department-card";

export interface DepartmentGridProps {
  departments: DepartmentCardData[];
  className?: string;
}

export function DepartmentGrid({ departments, className }: DepartmentGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
}
