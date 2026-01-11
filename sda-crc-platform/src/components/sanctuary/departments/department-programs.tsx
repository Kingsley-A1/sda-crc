/**
 * Department Programs Component
 * =============================
 * List of programs and activities for a department.
 */

"use client";

import { useState, useEffect } from "react";

interface DepartmentProgramsProps {
  departmentId: string;
}

export function DepartmentPrograms({ departmentId }: DepartmentProgramsProps) {
  const [programs, setPrograms] = useState<string[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, we'll use placeholder data
    setPrograms([
      "Weekly meetings and Bible study",
      "Monthly outreach programs",
      "Annual retreats and conventions",
      "Training and certification programs",
    ]);
  }, [departmentId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Programs & Activities</h2>
      <ul className="space-y-3">
        {programs.map((program, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0">
              {index + 1}
            </span>
            <span>{program}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
