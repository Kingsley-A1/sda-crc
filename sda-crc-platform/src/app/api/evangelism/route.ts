/**
 * Evangelism Sites API Route
 * ==========================
 * Handles fetching and managing evangelism/outreach sites.
 * 
 * "Go into all the world and preach the gospel to all creation." — Mark 16:15
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateEvangelismSiteSchema } from "@/lib/validators";
import { apiResponse, apiError, buildPaginationMeta } from "@/lib/utils";

// ============================================================================
// GET /api/evangelism - Fetch all evangelism sites
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "12", 10)));
    const skip = (page - 1) * limit;
    const status = searchParams.get("status");
    const city = searchParams.get("city");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    // Execute queries in parallel
    const [sites, total, stats] = await Promise.all([
      db.evangelismSite.findMany({
        where,
        orderBy: { startDate: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          address: true,
          city: true,
          state: true,
          latitude: true,
          longitude: true,
          status: true,
          startDate: true,
          endDate: true,
          targetAttendance: true,
          actualAttendance: true,
          baptisms: true,
          decisions: true,
          imageUrl: true,
          coordinator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              photoUrl: true,
            },
          },
        },
      }),
      db.evangelismSite.count({ where }),
      // Get aggregate stats
      db.evangelismSite.aggregate({
        _sum: {
          baptisms: true,
          decisions: true,
          actualAttendance: true,
        },
        _count: true,
      }),
    ]);

    return apiResponse(sites, 200, {
      ...buildPaginationMeta(total, page, limit),
      stats: {
        totalSites: stats._count,
        totalBaptisms: stats._sum.baptisms || 0,
        totalDecisions: stats._sum.decisions || 0,
        totalAttendance: stats._sum.actualAttendance || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching evangelism sites:", error);
    return apiError("Failed to fetch evangelism sites", 500);
  }
}

// ============================================================================
// POST /api/evangelism - Create a new evangelism site (Admin only)
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
    const result = CreateEvangelismSiteSchema.safeParse(body);

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

    // Create evangelism site
    const site = await db.evangelismSite.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return apiResponse(site, 201);
  } catch (error) {
    console.error("Error creating evangelism site:", error);
    return apiError("Failed to create evangelism site", 500);
  }
}
