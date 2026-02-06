/**
 * Department Detail Page
 * ======================
 * Individual department page with leader info, programs, and resources.
 *
 * "So in Christ we, though many, form one body, and each member belongs to all the others." — Romans 12:5
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { DepartmentDetails } from "@/components/sanctuary/departments/department-details";
import { DepartmentPrograms } from "@/components/sanctuary/departments/department-programs";
import { DepartmentLeader } from "@/components/sanctuary/departments/department-leader";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ============================================================================
// Data Fetching
// ============================================================================

async function getDepartment(slug: string) {
  const department = await db.department.findFirst({
    where: {
      slug,
      active: true,
    },
    include: {
      leader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          photoUrl: true,
        },
      },
    },
  });

  return department;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const department = await getDepartment(slug);

  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  return {
    title: department.name,
    description: department.description || `Learn about ${department.name}`,
  };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const department = await getDepartment(slug);

  if (!department) {
    return notFound();
  }

  return (
    <>
      <PageHeader
        title={department.name}
        subtitle={department.mission || undefined}
        backgroundImage={
          department.imageUrl || "/images/departments-header.jpg"
        }
      />

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Department Description */}
            <DepartmentDetails department={department} />

            {/* Programs & Activities */}
            <DepartmentPrograms departmentId={department.id} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Department Leader */}
            {department.leader && (
              <DepartmentLeader leader={department.leader} />
            )}

            {/* Contact Information */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6">
              <h3 className="font-semibold text-lg mb-4">Meeting Details</h3>
              {department.meetingDay && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Day:</strong> {department.meetingDay}
                </p>
              )}
              {department.meetingTime && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Time:</strong> {department.meetingTime}
                </p>
              )}
              {department.meetingLocation && (
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Location:</strong> {department.meetingLocation}
                </p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
