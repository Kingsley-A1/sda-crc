/**
 * Events API Route
 * ================
 * Handles fetching all events (GET) and creating new events (POST).
 * 
 * "There is a time for everything, and a season for every activity under the heavens." — Ecclesiastes 3:1
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateEventSchema, EventQuerySchema } from "@/lib/validators";
import { 
  apiResponse, 
  apiError, 
  buildPaginationMeta,
  generateSlug,
} from "@/lib/utils";

// ============================================================================
// GET /api/events - Fetch all events with pagination & filters
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    
    // Parse and validate query parameters
    const queryResult = EventQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!queryResult.success) {
      return apiError("Invalid query parameters", 400, queryResult.error.flatten().fieldErrors);
    }

    const { page, limit, category, upcoming, featured, search } = queryResult.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    // For public API, only show published events
    const session = await auth();
    if (!session?.user) {
      where.published = true;
    }

    if (category) {
      where.category = category;
    }

    if (upcoming === "true") {
      where.startDate = { gte: new Date() };
    } else if (upcoming === "false") {
      where.startDate = { lt: new Date() };
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    // Execute queries in parallel
    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: { startDate: upcoming === "false" ? "desc" : "asc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          startDate: true,
          endDate: true,
          location: true,
          imageUrl: true,
          isOnline: true,
          onlineUrl: true,
          category: true,
          featured: true,
          published: true,
          createdAt: true,
        },
      }),
      db.event.count({ where }),
    ]);

    return apiResponse(events, 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    console.error("Error fetching events:", error);
    return apiError("Failed to fetch events", 500);
  }
}

// ============================================================================
// POST /api/events - Create a new event (Admin only)
// ============================================================================

export async function POST(request: NextRequest) {
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

    // Parse and validate body
    const body = await request.json();
    const result = CreateEventSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Generate slug from title
    const baseSlug = generateSlug(data.title);
    
    // Check for slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await db.event.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create event
    const event = await db.event.create({
      data: {
        ...data,
        slug,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        createdById: session.user.id,
      },
    });

    return apiResponse(event, 201);
  } catch (error) {
    console.error("Error creating event:", error);
    return apiError("Failed to create event", 500);
  }
}
