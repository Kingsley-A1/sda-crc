/**
 * Department Details Component
 * ============================
 * Full department information display.
 */

interface Department {
  id: string;
  name: string;
  description: string | null;
  mission: string | null;
  vision: string | null;
}

interface DepartmentDetailsProps {
  department: Department;
}

export function DepartmentDetails({ department }: DepartmentDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      {department.description && (
        <div>
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>{department.description}</p>
          </div>
        </div>
      )}

      {/* Mission */}
      {department.mission && (
        <div className="rounded-xl bg-primary/5 p-6">
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {department.mission}
          </p>
        </div>
      )}

      {/* Vision */}
      {department.vision && (
        <div className="rounded-xl bg-secondary/5 p-6">
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {department.vision}
          </p>
        </div>
      )}
    </div>
  );
}
