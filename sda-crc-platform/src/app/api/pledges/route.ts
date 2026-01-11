/**
 * Pledges API Route
 * =================
 * Handles creating pledges for financial commitments.
 * 
 * "Each of you should give what you have decided in your heart to give." — 2 Corinthians 9:7
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreatePledgeSchema } from "@/lib/validators";
import { apiResponse, apiError, buildPaginationMeta } from "@/lib/utils";

// ============================================================================
// GET /api/pledges - Fetch all pledges (Admin only)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization (VIEWER or higher)
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;
    const purpose = searchParams.get("purpose");
    const status = searchParams.get("status");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (purpose) {
      where.purpose = purpose;
    }

    if (status) {
      where.status = status;
    }

    // Execute queries in parallel
    const [pledges, total, stats] = await Promise.all([
      db.pledge.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          amount: true,
          currency: true,
          purpose: true,
          projectName: true,
          frequency: true,
          startDate: true,
          status: true,
          anonymous: true,
          createdAt: true,
          member: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      db.pledge.count({ where }),
      // Get aggregate stats
      db.pledge.aggregate({
        where,
        _sum: {
          amount: true,
        },
        _count: true,
      }),
    ]);

    return apiResponse(pledges, 200, {
      ...buildPaginationMeta(total, page, limit),
      totalAmount: stats._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching pledges:", error);
    return apiError("Failed to fetch pledges", 500);
  }
}

// ============================================================================
// POST /api/pledges - Create a new pledge (Public)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Parse and validate body
    const body = await request.json();
    const result = CreatePledgeSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Validate member exists if linking
    if (data.memberId) {
      const member = await db.member.findUnique({
        where: { id: data.memberId },
      });

      if (!member) {
        return apiError("Member not found", 400);
      }
    }

    // Create pledge
    const pledge = await db.pledge.create({
      data: {
        ...data,
        email: data.email?.toLowerCase(),
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        status: "PENDING",
      },
    });

    // Return success message (keep response minimal for public)
    return apiResponse(
      {
        id: pledge.id,
        message: "Thank you for your pledge! May God bless your generous heart.",
        amount: pledge.amount,
        currency: pledge.currency,
        purpose: pledge.purpose,
      },
      201
    );
  } catch (error) {
    console.error("Error creating pledge:", error);
    return apiError("Failed to create pledge", 500);
  }
}
