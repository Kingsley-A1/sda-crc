/**
 * Members API Route
 * =================
 * Handles member registration and listing.
 * 
 * "For we are all members of one body." — Ephesians 4:25
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateMemberSchema } from "@/lib/validators";
import { apiResponse, apiError, buildPaginationMeta } from "@/lib/utils";

// ============================================================================
// GET /api/members - Fetch all members (Admin only)
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
    const search = searchParams.get("search");
    const departmentId = searchParams.get("departmentId");
    const smallGroupId = searchParams.get("smallGroupId");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    if (departmentId) {
      where.departmentId = departmentId;
    }

    if (smallGroupId) {
      where.smallGroupId = smallGroupId;
    }

    // Execute queries in parallel
    const [members, total] = await Promise.all([
      db.member.findMany({
        where,
        orderBy: [
          { lastName: "asc" },
          { firstName: "asc" },
        ],
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          gender: true,
          city: true,
          state: true,
          membershipType: true,
          photoUrl: true,
          isActive: true,
          createdAt: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          smallGroup: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      db.member.count({ where }),
    ]);

    return apiResponse(members, 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    console.error("Error fetching members:", error);
    return apiError("Failed to fetch members", 500);
  }
}

// ============================================================================
// POST /api/members - Register a new member (Public)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Parse and validate body
    const body = await request.json();
    const result = CreateMemberSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Check for duplicate email
    if (data.email) {
      const existingMember = await db.member.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (existingMember) {
        return apiError("A member with this email already exists", 400);
      }
    }

    // Check for duplicate phone
    const existingPhone = await db.member.findFirst({
      where: { phone: data.phone },
    });

    if (existingPhone) {
      return apiError("A member with this phone number already exists", 400);
    }

    // Validate small group has space if joining one
    if (data.smallGroupId) {
      const smallGroup = await db.smallGroup.findUnique({
        where: { id: data.smallGroupId },
        include: {
          _count: {
            select: { members: true },
          },
        },
      });

      if (!smallGroup) {
        return apiError("Small group not found", 400);
      }

      if (!smallGroup.acceptingMembers) {
        return apiError("This small group is not accepting new members", 400);
      }

      if (smallGroup._count.members >= smallGroup.maxMembers) {
        return apiError("This small group is full", 400);
      }
    }

    // Create member
    const member = await db.member.create({
      data: {
        ...data,
        email: data.email?.toLowerCase(),
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        baptismDate: data.baptismDate ? new Date(data.baptismDate) : null,
        isActive: true,
      },
    });

    // Return success (don't expose full member data to public)
    return apiResponse(
      {
        id: member.id,
        message: "Registration successful! Welcome to our church family.",
      },
      201
    );
  } catch (error) {
    console.error("Error registering member:", error);
    return apiError("Failed to register member", 500);
  }
}
