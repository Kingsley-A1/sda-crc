/**
 * Sermons API Route
 * =================
 * Handles fetching all sermons (GET) and creating new sermons (POST).
 * 
 * "Preach the word; be prepared in season and out of season." — 2 Timothy 4:2
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateSermonSchema, SermonQuerySchema } from "@/lib/validators";
import { 
  apiResponse, 
  apiError, 
  parsePaginationParams, 
  buildPaginationMeta,
  generateSlug,
} from "@/lib/utils";

// ============================================================================
// GET /api/sermons - Fetch all sermons with pagination & filters
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    
    // Parse and validate query parameters
    const queryResult = SermonQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!queryResult.success) {
      return apiError("Invalid query parameters", 400, queryResult.error.flatten().fieldErrors);
    }

    const { page, limit, speaker, series, search, published } = queryResult.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    // For public API, only show published sermons
    const session = await auth();
    if (!session?.user) {
      where.published = true;
    } else if (published !== undefined) {
      where.published = published === "true";
    }

    if (speaker) {
      where.speaker = { contains: speaker, mode: "insensitive" };
    }

    if (series) {
      where.series = { contains: series, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { speaker: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { scriptureReference: { contains: search, mode: "insensitive" } },
      ];
    }

    // Execute queries in parallel
    const [sermons, total] = await Promise.all([
      db.sermon.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          speaker: true,
          date: true,
          description: true,
          audioUrl: true,
          videoUrl: true,
          thumbnailUrl: true,
          duration: true,
          scriptureReference: true,
          series: true,
          tags: true,
          published: true,
          createdAt: true,
        },
      }),
      db.sermon.count({ where }),
    ]);

    return apiResponse(sermons, 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return apiError("Failed to fetch sermons", 500);
  }
}

// ============================================================================
// POST /api/sermons - Create a new sermon (Admin only)
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
    const result = CreateSermonSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Generate slug from title
    const baseSlug = generateSlug(data.title);
    
    // Check for slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await db.sermon.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create sermon
    const sermon = await db.sermon.create({
      data: {
        ...data,
        slug,
        date: new Date(data.date),
        createdById: session.user.id,
      },
    });

    return apiResponse(sermon, 201);
  } catch (error) {
    console.error("Error creating sermon:", error);
    return apiError("Failed to create sermon", 500);
  }
}
