/**
 * Resources API Route
 * ===================
 * Handles fetching and creating downloadable resources.
 *
 * Public: GET shows only published resources.
 * Admin: POST creates resources; GET can include unpublished via `published=true|false`.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateResourceSchema, ResourceQuerySchema } from "@/lib/validators";
import {
  apiError,
  apiResponse,
  buildPaginationMeta,
  parsePaginationParams,
} from "@/lib/utils";

// ============================================================================
// GET /api/resources - Fetch resources (Public: published only)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = request.nextUrl;

    const queryResult = ResourceQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      published: searchParams.get("published") ?? undefined,
    });

    if (!queryResult.success) {
      return apiError(
        "Invalid query parameters",
        400,
        queryResult.error.flatten().fieldErrors
      );
    }

    const { category, search, published } = queryResult.data;
    const { page, limit, skip } = parsePaginationParams(searchParams);

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Public users only see published resources.
    if (!session?.user) {
      where.published = true;
    } else if (published) {
      where.published = published === "true";
    }

    const [resources, total] = await Promise.all([
      db.resource.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          fileUrl: true,
          fileType: true,
          fileSize: true,
          category: true,
          published: true,
          downloads: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      db.resource.count({ where }),
    ]);

    return apiResponse(resources, 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return apiError("Failed to fetch resources", 500);
  }
}

// ============================================================================
// POST /api/resources - Create a new resource (Admin only)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const body = await request.json();
    const result = CreateResourceSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        "Validation failed",
        400,
        result.error.flatten().fieldErrors
      );
    }

    const resource = await db.resource.create({
      data: result.data,
    });

    return apiResponse(resource, 201);
  } catch (error) {
    console.error("Error creating resource:", error);
    return apiError("Failed to create resource", 500);
  }
}
