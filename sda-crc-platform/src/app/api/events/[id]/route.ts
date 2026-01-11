/**
 * Single Event API Route
 * ======================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single event.
 * 
 * "Remember the Sabbath day by keeping it holy." — Exodus 20:8
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateEventSchema } from "@/lib/validators";
import { apiResponse, apiError, generateSlug } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/events/[id] - Fetch a single event
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Find by ID or slug
    const event = await db.event.findFirst({
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

    if (!event) {
      return apiError("Event not found", 404);
    }

    // Check if event is published or user is authenticated
    const session = await auth();
    if (!event.published && !session?.user) {
      return apiError("Event not found", 404);
    }

    return apiResponse(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return apiError("Failed to fetch event", 500);
  }
}

// ============================================================================
// PATCH /api/events/[id] - Update an event (Admin only)
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

    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return apiError("Event not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateEventSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // If title changed, generate new slug
    let slug = existingEvent.slug;
    if (data.title && data.title !== existingEvent.title) {
      const baseSlug = generateSlug(data.title);
      slug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await db.event.findUnique({ where: { slug } });
        if (!existing || existing.id === id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Update event
    const event = await db.event.update({
      where: { id },
      data: {
        ...data,
        slug,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date(),
      },
    });

    return apiResponse(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return apiError("Failed to update event", 500);
  }
}

// ============================================================================
// DELETE /api/events/[id] - Delete an event (Admin only)
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

    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return apiError("Event not found", 404);
    }

    // Delete event
    await db.event.delete({
      where: { id },
    });

    return apiResponse({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return apiError("Failed to delete event", 500);
  }
}
