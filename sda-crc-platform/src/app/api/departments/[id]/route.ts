/**
 * Single Department API Route
 * ===========================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single department.
 * 
 * "From him the whole body, joined and held together by every supporting ligament." — Ephesians 4:16
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateDepartmentSchema } from "@/lib/validators";
import { apiResponse, apiError, generateSlug } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/departments/[id] - Fetch a single department
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Find by ID or slug
    const department = await db.department.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
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
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
          take: 20,
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    if (!department) {
      return apiError("Department not found", 404);
    }

    // Check if department is active or user is authenticated
    const session = await auth();
    if (!department.active && !session?.user) {
      return apiError("Department not found", 404);
    }

    return apiResponse(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    return apiError("Failed to fetch department", 500);
  }
}

// ============================================================================
// PATCH /api/departments/[id] - Update a department (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization
    const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    // Check if department exists
    const existingDepartment = await db.department.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      return apiError("Department not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateDepartmentSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // If name changed, generate new slug
    let slug = existingDepartment.slug;
    if (data.name && data.name !== existingDepartment.name) {
      const baseSlug = generateSlug(data.name);
      slug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await db.department.findUnique({ where: { slug } });
        if (!existing || existing.id === id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update department
    const department = await db.department.update({
      where: { id },
      data: {
        ...data,
        slug,
        updatedAt: new Date(),
      },
    });

    return apiResponse(department);
  } catch (error) {
    console.error("Error updating department:", error);
    return apiError("Failed to update department", 500);
  }
}

// ============================================================================
// DELETE /api/departments/[id] - Delete a department (Admin only)
// ============================================================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization (SUPER_ADMIN only for departments)
    if (session.user.role !== "SUPER_ADMIN") {
      return apiError("Forbidden", 403);
    }

    // Check if department exists
    const existingDepartment = await db.department.findUnique({
      where: { id },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    if (!existingDepartment) {
      return apiError("Department not found", 404);
    }

    // Prevent deletion if department has members
    if (existingDepartment._count.members > 0) {
      return apiError(
        "Cannot delete department with members. Please reassign members first.",
        400
      );
    }

    // Delete department
    await db.department.delete({
      where: { id },
    });

    return apiResponse({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return apiError("Failed to delete department", 500);
  }
}
