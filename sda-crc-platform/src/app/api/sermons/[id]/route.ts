/**
 * Single Sermon API Route
 * =======================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single sermon.
 * 
 * "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateSermonSchema } from "@/lib/validators";
import { apiResponse, apiError, generateSlug } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/sermons/[id] - Fetch a single sermon
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Find by ID or slug
    const sermon = await db.sermon.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!sermon) {
      return apiError("Sermon not found", 404);
    }

    // Check if sermon is published or user is authenticated
    const session = await auth();
    if (!sermon.published && !session?.user) {
      return apiError("Sermon not found", 404);
    }

    // Increment view count (fire and forget)
    db.sermon.update({
      where: { id: sermon.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});

    return apiResponse(sermon);
  } catch (error) {
    console.error("Error fetching sermon:", error);
    return apiError("Failed to fetch sermon", 500);
  }
}

// ============================================================================
// PATCH /api/sermons/[id] - Update a sermon (Admin only)
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
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    // Check if sermon exists
    const existingSermon = await db.sermon.findUnique({
      where: { id },
    });

    if (!existingSermon) {
      return apiError("Sermon not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateSermonSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // If title changed, generate new slug
    let slug = existingSermon.slug;
    if (data.title && data.title !== existingSermon.title) {
      const baseSlug = generateSlug(data.title);
      slug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await db.sermon.findUnique({ where: { slug } });
        if (!existing || existing.id === id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update sermon
    const sermon = await db.sermon.update({
      where: { id },
      data: {
        ...data,
        slug,
        date: data.date ? new Date(data.date) : undefined,
        updatedAt: new Date(),
      },
    });

    return apiResponse(sermon);
  } catch (error) {
    console.error("Error updating sermon:", error);
    return apiError("Failed to update sermon", 500);
  }
}

// ============================================================================
// DELETE /api/sermons/[id] - Delete a sermon (Admin only)
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

    // Check if sermon exists
    const existingSermon = await db.sermon.findUnique({
      where: { id },
    });

    if (!existingSermon) {
      return apiError("Sermon not found", 404);
    }

    // Delete sermon
    await db.sermon.delete({
      where: { id },
    });

    return apiResponse({ message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    return apiError("Failed to delete sermon", 500);
  }
}
