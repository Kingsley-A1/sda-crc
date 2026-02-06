/**
 * Departments API Route
 * =====================
 * Handles fetching all departments.
 *
 * "Now you are the body of Christ, and each one of you is a part of it." — 1 Corinthians 12:27
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateDepartmentSchema } from "@/lib/validators";
import { apiResponse, apiError, generateSlug } from "@/lib/utils";

// ============================================================================
// GET /api/departments - Fetch all departments
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const activeOnly = searchParams.get("active") !== "false";

    // Build where clause
    const where: Record<string, unknown> = {};

    // For public API, only show active departments
    const session = await auth();
    if (!session?.user && activeOnly) {
      where.active = true;
    }

    const departments = await db.department.findMany({
      where,
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        mission: true,
        imageUrl: true,
        iconName: true,
        meetingDay: true,
        meetingTime: true,
        meetingLocation: true,
        active: true,
        order: true,
        leader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    return apiResponse(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return apiError("Failed to fetch departments", 500);
  }
}

// ============================================================================
// POST /api/departments - Create a new department (Admin only)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization (ADMIN or higher)
    const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    // Parse and validate body
    const body = await request.json();
    const result = CreateDepartmentSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        "Validation failed",
        400,
        result.error.flatten().fieldErrors
      );
    }

    const data = result.data;

    // Generate slug from name if not provided
    let slug = data.slug || generateSlug(data.name);

    // Check for slug uniqueness
    let counter = 1;
    const baseSlug = slug;
    while (await db.department.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create department
    const department = await db.department.create({
      data: {
        ...data,
        slug,
      },
    });

    return apiResponse(department, 201);
  } catch (error) {
    console.error("Error creating department:", error);
    return apiError("Failed to create department", 500);
  }
}
