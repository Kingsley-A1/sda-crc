/**
 * Departments Page
 * ================
 * Browse all departments and ministries of the SDA Cross River Conference.
 * 
 * "Now you are the body of Christ, and each one of you is a part of it." — 1 Corinthians 12:27
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { DepartmentGrid } from "@/components/sanctuary/departments/department-grid";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Explore the various departments and ministries of the SDA Cross River Conference. Find your place to serve and grow.",
};

// ============================================================================
// Data Fetching
// ============================================================================

async function getDepartments() {
  const departments = await db.department.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: {
      leader: {
        select: {
          firstName: true,
          lastName: true,
          photoUrl: true,
        },
      },
    },
  });

  return departments.map((dept: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    iconName: string | null;
    colorScheme: string | null;
    imageUrl: string | null;
    leader?: { firstName: string; lastName: string; photoUrl: string | null } | null;
  }) => ({
    id: dept.id,
    name: dept.name,
    slug: dept.slug,
    description: dept.description || "",
    iconName: dept.iconName || "Users",
    colorScheme: (dept.colorScheme as "blue" | "green" | "purple" | "orange" | "pink") || "blue",
    memberCount: 0,
    imageUrl: dept.imageUrl || undefined,
  }));
}

// ============================================================================
// Page Component
// ============================================================================

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
      <PageHeader
        title="Departments"
        subtitle="Every member a minister"
        backgroundImage="/images/departments-header.jpg"
      />

      <Container className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The SDA Cross River Conference operates through various departments, 
            each dedicated to fulfilling specific aspects of our mission. 
            Find your passion and connect with a ministry where you can serve.
          </p>
        </div>

        <DepartmentGrid departments={departments} />
      </Container>
    </>
  );
}
