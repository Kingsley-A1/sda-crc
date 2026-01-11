/**
 * Workers API Route
 * =================
 * Handles fetching all workers (GET) and creating new workers (POST).
 * Workers are displayed in hierarchical order based on role.
 * 
 * "Let the elders who rule well be counted worthy of double honor." — 1 Timothy 5:17
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CreateWorkerSchema, WorkerQuerySchema } from "@/lib/validators";
import { 
  apiResponse, 
  apiError, 
  buildPaginationMeta,
} from "@/lib/utils";
import { 
  getRoleHierarchyOrder, 
  WORKER_ROLE_LABELS,
  ROLE_CATEGORIES,
  groupWorkersByCategory,
} from "@/lib/worker-roles";

// ============================================================================
// GET /api/workers - Fetch all workers (ordered by hierarchy)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    
    // Parse and validate query parameters
    const queryResult = WorkerQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!queryResult.success) {
      return apiError("Invalid query parameters", 400, queryResult.error.flatten().fieldErrors);
    }

    const { role, department, active, page, limit } = queryResult.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    // For public API, only show active workers who should be on website
    const session = await auth();
    if (!session?.user) {
      where.isActive = true;
      where.showOnWebsite = true;
    } else if (active !== undefined) {
      where.isActive = active === "true";
    }

    if (role) {
      where.role = role;
    }

    if (department) {
      where.department = { contains: department, mode: "insensitive" };
    }

    // Fetch workers
    type WorkerRole = keyof typeof WORKER_ROLE_LABELS;

    interface PrismaWorker {
      id: string;
      firstName: string;
      lastName: string;
      email: string | null;
      phone: string | null;
      role: string;
      title: string | null;
      department: string | null;
      bio: string | null;
      photoUrl: string | null;
      startDate: Date | null;
      isActive: boolean;
      showOnWebsite: boolean;
      displayOrder: number | null;
      socialLinks: unknown;
      member: { id: string } | null;
    }

    const [workers, total] = await Promise.all([
      db.worker.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          title: true,
          department: true,
          bio: true,
          photoUrl: true,
          startDate: true,
          isActive: true,
          showOnWebsite: true,
          displayOrder: true,
          socialLinks: true,
          member: {
            select: {
              id: true,
            },
          },
        },
      }) as Promise<PrismaWorker[]>,
      db.worker.count({ where }),
    ]);

    // Sort by hierarchy order, then by displayOrder, then by name
    interface WorkerWithOrder extends PrismaWorker {
      role: WorkerRole;
      roleLabel: string | undefined;
      hierarchyOrder: number;
    }

    const sortedWorkers: WorkerWithOrder[] = workers
      .map((worker: PrismaWorker): WorkerWithOrder => ({
        ...worker,
        role: worker.role as WorkerRole,
        roleLabel: WORKER_ROLE_LABELS[worker.role as WorkerRole],
        hierarchyOrder: getRoleHierarchyOrder(worker.role as WorkerRole),
      }))
      .sort((a: WorkerWithOrder, b: WorkerWithOrder) => {
        // First by hierarchy
        if (a.hierarchyOrder !== b.hierarchyOrder) {
          return a.hierarchyOrder - b.hierarchyOrder;
        }
        // Then by display order
        if ((a.displayOrder || 0) !== (b.displayOrder || 0)) {
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        }
        // Then by name
        return a.lastName.localeCompare(b.lastName);
      });

    // Check if client wants grouped response
    const grouped = searchParams.get("grouped") === "true";

    if (grouped) {
      // Return workers grouped by category
      const groupedWorkers = groupWorkersByCategory(sortedWorkers);
      const groupedResponse: Record<string, { label: string; description: string; workers: unknown[] }> = {};

      for (const [category, categoryWorkers] of groupedWorkers.entries()) {
        const categoryInfo = ROLE_CATEGORIES[category];
        groupedResponse[category] = {
          label: categoryInfo.label,
          description: categoryInfo.description,
          workers: categoryWorkers,
        };
      }

      return apiResponse(groupedResponse, 200, buildPaginationMeta(total, page, limit));
    }

    return apiResponse(sortedWorkers, 200, buildPaginationMeta(total, page, limit));
  } catch (error) {
    console.error("Error fetching workers:", error);
    return apiError("Failed to fetch workers", 500);
  }
}

// ============================================================================
// POST /api/workers - Create a new worker (Admin only)
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
    const result = CreateWorkerSchema.safeParse(body);

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

      // Check if member is already a worker
      const existingWorker = await db.worker.findFirst({
        where: { memberId: data.memberId },
      });

      if (existingWorker) {
        return apiError("This member is already registered as a worker", 400);
      }
    }

    // Create worker
    const worker = await db.worker.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return apiResponse(
      {
        ...worker,
        roleLabel: WORKER_ROLE_LABELS[worker.role as keyof typeof WORKER_ROLE_LABELS],
      },
      201
    );
  } catch (error) {
    console.error("Error creating worker:", error);
    return apiError("Failed to create worker", 500);
  }
}
