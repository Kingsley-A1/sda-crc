/**
 * Single Member API Route
 * =======================
 * Handles fetching (GET), updating (PATCH), and deleting (DELETE) a single member.
 * 
 * "I am the good shepherd; I know my sheep and my sheep know me." — John 10:14
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateMemberSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================================================
// GET /api/members/[id] - Fetch a single member (Admin only)
// ============================================================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const { id } = await params;

    const member = await db.member.findUnique({
      where: { id },
      include: {
        department: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        smallGroup: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
        worker: {
          select: {
            id: true,
            role: true,
            isActive: true,
          },
        },
        pledges: {
          select: {
            id: true,
            amount: true,
            purpose: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!member) {
      return apiError("Member not found", 404);
    }

    return apiResponse(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    return apiError("Failed to fetch member", 500);
  }
}

// ============================================================================
// PATCH /api/members/[id] - Update a member (Admin only)
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

    // Check if member exists
    const existingMember = await db.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return apiError("Member not found", 404);
    }

    // Parse and validate body
    const body = await request.json();
    const result = UpdateMemberSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Check for duplicate email if changing
    if (data.email && data.email.toLowerCase() !== existingMember.email) {
      const existingEmail = await db.member.findUnique({
        where: { email: data.email.toLowerCase() },
      });

      if (existingEmail) {
        return apiError("A member with this email already exists", 400);
      }
    }

    // Check for duplicate phone if changing
    if (data.phone && data.phone !== existingMember.phone) {
      const existingPhone = await db.member.findFirst({
        where: { phone: data.phone },
      });

      if (existingPhone) {
        return apiError("A member with this phone number already exists", 400);
      }
    }

    // Update member
    const member = await db.member.update({
      where: { id },
      data: {
        ...data,
        email: data.email?.toLowerCase(),
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        baptismDate: data.baptismDate ? new Date(data.baptismDate) : undefined,
        updatedAt: new Date(),
      },
    });

    return apiResponse(member);
  } catch (error) {
    console.error("Error updating member:", error);
    return apiError("Failed to update member", 500);
  }
}

// ============================================================================
// DELETE /api/members/[id] - Delete a member (Admin only)
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

    // Check if member exists
    const existingMember = await db.member.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return apiError("Member not found", 404);
    }

    // Soft delete - just mark as inactive
    // This preserves historical data and relationships
    await db.member.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
    });

    return apiResponse({ message: "Member deactivated successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return apiError("Failed to delete member", 500);
  }
}
