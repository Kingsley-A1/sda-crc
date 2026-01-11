/**
 * Single Worker API Route
 * =======================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single worker.
 * 
 * "Whoever wants to become great among you must be your servant." — Matthew 20:26
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateWorkerSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";
import { WORKER_ROLE_LABELS, getRoleCategory } from "@/lib/worker-roles";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/workers/[id] - Fetch a single worker
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const worker = await db.worker.findUnique({
      where: { id },
      include: {
        member: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            photoUrl: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!worker) {
      return apiError("Worker not found", 404);
    }

    // Check if worker is visible or user is authenticated
    const session = await auth();
    if ((!worker.isActive || !worker.showOnWebsite) && !session?.user) {
      return apiError("Worker not found", 404);
    }

    // Enhance response with role information
    const response = {
      ...worker,
      roleLabel: WORKER_ROLE_LABELS[worker.role as keyof typeof WORKER_ROLE_LABELS],
      roleCategory: getRoleCategory(worker.role as keyof typeof WORKER_ROLE_LABELS),
    };

    return apiResponse(response);
  } catch (error) {
    console.error("Error fetching worker:", error);
    return apiError("Failed to fetch worker", 500);
  }
}

// ============================================================================
// PATCH /api/workers/[id] - Update a worker (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    // Check if worker exists
    const existingWorker = await db.worker.findUnique({
      where: { id },
    });

    if (!existingWorker) {
      return apiError("Worker not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateWorkerSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Validate member exists if changing
    if (data.memberId && data.memberId !== existingWorker.memberId) {
      const member = await db.member.findUnique({
        where: { id: data.memberId },
      });

      if (!member) {
        return apiError("Member not found", 400);
      }

      // Check if member is already a worker
      const otherWorker = await db.worker.findFirst({
        where: { 
          memberId: data.memberId,
          id: { not: id },
        },
      });

      if (otherWorker) {
        return apiError("This member is already registered as a worker", 400);
      }
    }

    // Update worker
    const worker = await db.worker.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date(),
      },
    });

    return apiResponse({
      ...worker,
      roleLabel: WORKER_ROLE_LABELS[worker.role as keyof typeof WORKER_ROLE_LABELS],
    });
  } catch (error) {
    console.error("Error updating worker:", error);
    return apiError("Failed to update worker", 500);
  }
}

// ============================================================================
// DELETE /api/workers/[id] - Delete a worker (Admin only)
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

    // Check if worker exists
    const existingWorker = await db.worker.findUnique({
      where: { id },
    });

    if (!existingWorker) {
      return apiError("Worker not found", 404);
    }

    // Soft delete - mark as inactive rather than removing
    // This preserves the historical record
    await db.worker.update({
      where: { id },
      data: {
        isActive: false,
        showOnWebsite: false,
        endDate: new Date(),
        updatedAt: new Date(),
      },
    });

    return apiResponse({ 
      message: "Worker record has been archived",
      note: "The member record is preserved. This worker can be reactivated if needed."
    });
  } catch (error) {
    console.error("Error deleting worker:", error);
    return apiError("Failed to delete worker", 500);
  }
}
