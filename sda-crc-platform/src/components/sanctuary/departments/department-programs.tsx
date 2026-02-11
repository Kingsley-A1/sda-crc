"use client";

interface DepartmentProgramsProps {
  departmentId: string;
}

export function DepartmentPrograms({ departmentId }: DepartmentProgramsProps) {
  // Programs are part of the department description for now
  // This component is a placeholder for future program listing features
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Programs & Activities
      </h2>
      <div className="bg-muted rounded-xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Programs and activities for this department will be listed here soon.
        </p>
      </div>
    </div>
  );
}
