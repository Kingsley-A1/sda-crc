/**
 * Single Contact Submission API Route
 * ====================================
 * Handles viewing and updating contact submissions.
 * 
 * "Be quick to listen, slow to speak." — James 1:19
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { apiResponse, apiError } from "@/lib/utils";
import { z } from "zod";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const UpdateSubmissionSchema = z.object({
  status: z.enum(["NEW", "READ", "IN_PROGRESS", "REPLIED", "RESOLVED", "ARCHIVED"]).optional(),
  notes: z.string().max(2000).optional(),
});

// ============================================================================
// GET /api/contact/[id] - Fetch a single submission (Admin only)
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const { id } = await params;

    const submission = await db.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return apiError("Submission not found", 404);
    }

    // Mark as read if first time viewing
    if (!submission.readAt) {
      await db.contactSubmission.update({
        where: { id },
        data: { 
          readAt: new Date(),
          status: "READ",
        },
      });
    }

    return apiResponse(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return apiError("Failed to fetch submission", 500);
  }
}

// ============================================================================
// PATCH /api/contact/[id] - Update submission status (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization (EDITOR or higher)
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const { id } = await params;

    // Check if submission exists
    const existing = await db.contactSubmission.findUnique({
      where: { id },
    });

    if (!existing) {
      return apiError("Submission not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateSubmissionSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Set repliedAt if status is REPLIED
    const repliedAt = data.status === "REPLIED" && !existing.repliedAt 
      ? new Date() 
      : undefined;

    // Update submission
    const submission = await db.contactSubmission.update({
      where: { id },
      data: {
        ...data,
        repliedAt,
        updatedAt: new Date(),
      },
    });

    return apiResponse(submission);
  } catch (error) {
    console.error("Error updating submission:", error);
    return apiError("Failed to update submission", 500);
  }
}

// ============================================================================
// DELETE /api/contact/[id] - Delete a submission (Admin only)
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

    // Check if submission exists
    const existing = await db.contactSubmission.findUnique({
      where: { id },
    });

    if (!existing) {
      return apiError("Submission not found", 404);
    }

    // Delete submission
    await db.contactSubmission.delete({
      where: { id },
    });

    return apiResponse({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return apiError("Failed to delete submission", 500);
  }
}
