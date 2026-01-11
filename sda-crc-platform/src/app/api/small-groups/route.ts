/**
 * Small Groups API Route
 * ======================
 * Handles fetching small groups with location-based filtering.
 * 
 * "And let us consider how we may spur one another on toward love and good deeds." — Hebrews 10:24
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateSmallGroupSchema, SmallGroupQuerySchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";

// ============================================================================
// Haversine Distance Calculation
// ============================================================================

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// ============================================================================
// GET /api/small-groups - Fetch small groups with optional location filter
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    
    // Parse and validate query parameters
    const queryResult = SmallGroupQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!queryResult.success) {
      return apiError("Invalid query parameters", 400, queryResult.error.flatten().fieldErrors);
    }

    const { lat, lng, radius, city, active } = queryResult.data;

    // Build where clause
    const where: Record<string, unknown> = {};
    
    // For public API, only show active groups
    const session = await auth();
    if (!session?.user) {
      where.isActive = true;
      where.acceptingMembers = true;
    } else if (active !== undefined) {
      where.isActive = active === "true";
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    // Fetch small groups
    let smallGroups = await db.smallGroup.findMany({
      where,
      include: {
        leader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            photoUrl: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    // If location provided, filter by distance and add distance property
    type SmallGroupType = typeof smallGroups[number];
    type GroupWithDistance = SmallGroupType & { distance: number };

    let groupsWithDistance: GroupWithDistance[] | SmallGroupType[] = smallGroups;

    if (lat !== undefined && lng !== undefined) {
      groupsWithDistance = smallGroups
        .map((group: SmallGroupType): GroupWithDistance => ({
          ...group,
          distance: calculateDistance(lat, lng, group.latitude, group.longitude),
        }))
        .filter((group: GroupWithDistance) => group.distance <= radius)
        .sort((a: GroupWithDistance, b: GroupWithDistance) => a.distance - b.distance);
    }

    // Transform response
    const response = groupsWithDistance.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      latitude: group.latitude,
      longitude: group.longitude,
      address: group.address,
      city: group.city,
      state: group.state,
      meetingDay: group.meetingDay,
      meetingTime: group.meetingTime,
      maxMembers: group.maxMembers,
      currentMembers: group._count.members,
      isActive: group.isActive,
      acceptingMembers: group.acceptingMembers,
      leader: group.leader,
      distance: "distance" in group ? (group.distance as number).toFixed(1) + " km" : undefined,
    }));

    return apiResponse(response);
  } catch (error) {
    console.error("Error fetching small groups:", error);
    return apiError("Failed to fetch small groups", 500);
  }
}

// ============================================================================
// POST /api/small-groups - Create a new small group (Admin only)
// ============================================================================

export async function POST(request: NextRequest) {
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

    // Parse and validate body
    const body = await request.json();
    const result = CreateSmallGroupSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Create small group
    const smallGroup = await db.smallGroup.create({
      data: {
        ...data,
      },
    });

    return apiResponse(smallGroup, 201);
  } catch (error) {
    console.error("Error creating small group:", error);
    return apiError("Failed to create small group", 500);
  }
}
