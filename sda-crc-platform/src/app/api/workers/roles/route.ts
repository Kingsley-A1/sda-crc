/**
 * Worker Roles API Route
 * ======================
 * Returns all available worker roles for dropdowns and forms.
 * 
 * "There are different kinds of service, but the same Lord." — 1 Corinthians 12:5
 */

import { NextRequest } from "next/server";
import { apiResponse } from "@/lib/utils";
import { 
  WORKER_ROLE_HIERARCHY,
  WORKER_ROLE_LABELS,
  ROLE_CATEGORIES,
  getRoleOptions,
  getGroupedRoleOptions,
} from "@/lib/worker-roles";

// ============================================================================
// GET /api/workers/roles - Get all available worker roles
// ============================================================================

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const grouped = searchParams.get("grouped") === "true";
  const detailed = searchParams.get("detailed") === "true";

  if (detailed) {
    // Return full details about roles and categories
    return apiResponse({
      roles: WORKER_ROLE_HIERARCHY.map((role) => ({
        value: role,
        label: WORKER_ROLE_LABELS[role],
        hierarchyOrder: WORKER_ROLE_HIERARCHY.indexOf(role),
      })),
      categories: Object.entries(ROLE_CATEGORIES).map(([key, data]) => ({
        key,
        label: data.label,
        description: data.description,
        roleCount: data.roles.length,
        roles: data.roles.map((role) => ({
          value: role,
          label: WORKER_ROLE_LABELS[role],
        })),
      })),
      totalRoles: WORKER_ROLE_HIERARCHY.length,
      totalCategories: Object.keys(ROLE_CATEGORIES).length,
    });
  }

  if (grouped) {
    // Return roles grouped by category (for grouped selects)
    return apiResponse(getGroupedRoleOptions());
  }

  // Return flat list of roles (for simple selects)
  return apiResponse(getRoleOptions());
}
