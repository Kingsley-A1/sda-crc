import Link from "next/link";

import { SectionHeader } from "@/components/layout";
import { Button } from "@/components/ui";
import type { DepartmentCard as DepartmentCardData } from "@/types/department";

import { DepartmentGrid } from "../departments/department-grid";

export interface DepartmentsPreviewProps {
  departments: DepartmentCardData[];
  className?: string;
}

export function DepartmentsPreview({
  departments,
  className,
}: DepartmentsPreviewProps) {
  return (
    <section className={className} aria-label="Departments preview">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          title="Departments"
          description="Discover ministries serving across the Conference."
        />
        <Button asChild variant="ghost" size="sm" className="min-h-11">
          <Link href="/departments">View all</Link>
        </Button>
      </div>

      <div className="mt-4">
        <DepartmentGrid departments={departments} />
      </div>
    </section>
  );
}
