/**
 * Single Resource API Route
 * =========================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single resource.
 *
 * Public: GET only if published.
 * Download counter: GET with `?download=true` increments downloads.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateResourceSchema } from "@/lib/validators";
import { apiError, apiResponse } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/resources/[id] - Fetch a single resource
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();

    const resource = await db.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      return apiError("Resource not found", 404);
    }

    // Public users cannot access unpublished resources
    if (!resource.published && !session?.user) {
      return apiError("Resource not found", 404);
    }

    const shouldIncrement = request.nextUrl.searchParams.get("download") === "true";

    if (shouldIncrement) {
      const updated = await db.resource.update({
        where: { id },
        data: { downloads: { increment: 1 } },
      });
      return apiResponse(updated);
    }

    return apiResponse(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    return apiError("Failed to fetch resource", 500);
  }
}

// ============================================================================
// PATCH /api/resources/[id] - Update a resource (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const existing = await db.resource.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Resource not found", 404);
    }

    const body = await request.json();
    const result = UpdateResourceSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const updated = await db.resource.update({
      where: { id },
      data: {
        ...result.data,
        updatedAt: new Date(),
      },
    });

    return apiResponse(updated);
  } catch (error) {
    console.error("Error updating resource:", error);
    return apiError("Failed to update resource", 500);
  }
}

// ============================================================================
// DELETE /api/resources/[id] - Delete a resource (Admin only)
// ============================================================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const allowedRoles = ["SUPER_ADMIN", "ADMIN"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const existing = await db.resource.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Resource not found", 404);
    }

    await db.resource.delete({ where: { id } });

    return apiResponse({ message: "Resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return apiError("Failed to delete resource", 500);
  }
}
