/**
 * Single Small Group API Route
 * ============================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single small group.
 * 
 * "They broke bread in their homes and ate together with glad and sincere hearts." — Acts 2:46
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateSmallGroupSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/small-groups/[id] - Fetch a single small group
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const smallGroup = await db.smallGroup.findUnique({
      where: { id },
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

    if (!smallGroup) {
      return apiError("Small group not found", 404);
    }

    // Check if group is active or user is authenticated
    const session = await auth();
    if (!smallGroup.isActive && !session?.user) {
      return apiError("Small group not found", 404);
    }

    return apiResponse({
      ...smallGroup,
      currentMembers: smallGroup._count.members,
      spotsRemaining: smallGroup.maxMembers - smallGroup._count.members,
    });
  } catch (error) {
    console.error("Error fetching small group:", error);
    return apiError("Failed to fetch small group", 500);
  }
}

// ============================================================================
// PATCH /api/small-groups/[id] - Update a small group (Admin only)
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

    // Check if small group exists
    const existingGroup = await db.smallGroup.findUnique({
      where: { id },
    });

    if (!existingGroup) {
      return apiError("Small group not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateSmallGroupSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    // Update small group
    const smallGroup = await db.smallGroup.update({
      where: { id },
      data: {
        ...result.data,
        updatedAt: new Date(),
      },
    });

    return apiResponse(smallGroup);
  } catch (error) {
    console.error("Error updating small group:", error);
    return apiError("Failed to update small group", 500);
  }
}

// ============================================================================
// DELETE /api/small-groups/[id] - Delete a small group (Admin only)
// ============================================================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    // Check if small group exists
    const existingGroup = await db.smallGroup.findUnique({
      where: { id },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    if (!existingGroup) {
      return apiError("Small group not found", 404);
    }

    // Warn if group has members (but still allow deletion)
    const hadMembers = existingGroup._count.members > 0;

    // Delete small group
    await db.smallGroup.delete({
      where: { id },
    });

    return apiResponse({
      message: "Small group deleted successfully",
      ...(hadMembers && { warning: "Members were unassigned from this group" }),
    });
  } catch (error) {
    console.error("Error deleting small group:", error);
    return apiError("Failed to delete small group", 500);
  }
}
