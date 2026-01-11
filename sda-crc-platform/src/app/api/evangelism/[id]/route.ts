/**
 * Single Evangelism Site API Route
 * =================================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single site.
 * 
 * "The harvest is plentiful but the workers are few." — Matthew 9:37
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateEvangelismSiteSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/evangelism/[id] - Fetch a single evangelism site
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const site = await db.evangelismSite.findUnique({
      where: { id },
      include: {
        coordinator: {
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

    if (!site) {
      return apiError("Evangelism site not found", 404);
    }

    // Calculate progress metrics
    const progressPercentage = site.targetAttendance && site.actualAttendance
      ? Math.round((site.actualAttendance / site.targetAttendance) * 100)
      : null;

    return apiResponse({
      ...site,
      progressPercentage,
    });
  } catch (error) {
    console.error("Error fetching evangelism site:", error);
    return apiError("Failed to fetch evangelism site", 500);
  }
}

// ============================================================================
// PATCH /api/evangelism/[id] - Update an evangelism site (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const { id } = await params;

    // Check if site exists
    const existingSite = await db.evangelismSite.findUnique({
      where: { id },
    });

    if (!existingSite) {
      return apiError("Evangelism site not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateEvangelismSiteSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Validate coordinator exists if provided
    if (data.coordinatorId) {
      const coordinator = await db.member.findUnique({
        where: { id: data.coordinatorId },
      });

      if (!coordinator) {
        return apiError("Coordinator not found", 400);
      }
    }

    // Update site
    const site = await db.evangelismSite.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date(),
      },
    });

    return apiResponse(site);
  } catch (error) {
    console.error("Error updating evangelism site:", error);
    return apiError("Failed to update evangelism site", 500);
  }
}

// ============================================================================
// DELETE /api/evangelism/[id] - Delete an evangelism site (Admin only)
// ============================================================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const { id } = await params;

    // Check if site exists
    const existingSite = await db.evangelismSite.findUnique({
      where: { id },
    });

    if (!existingSite) {
      return apiError("Evangelism site not found", 404);
    }

    // Check if site has significant data (baptisms/decisions)
    if (existingSite.baptisms > 0 || existingSite.decisions > 0) {
      // Archive instead of delete for sites with results
      await db.evangelismSite.update({
        where: { id },
        data: {
          status: "COMPLETED",
          endDate: new Date(),
        },
      });

      return apiResponse({
        message: "Site archived instead of deleted to preserve baptism and decision records",
        archived: true,
      });
    }

    // Delete site
    await db.evangelismSite.delete({
      where: { id },
    });

    return apiResponse({ message: "Evangelism site deleted successfully" });
  } catch (error) {
    console.error("Error deleting evangelism site:", error);
    return apiError("Failed to delete evangelism site", 500);
  }
}
