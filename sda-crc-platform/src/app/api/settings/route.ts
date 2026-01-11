/**
 * Site Settings API Route
 * =======================
 * Handles global site configuration.
 * 
 * "For I know the plans I have for you," declares the LORD." — Jeremiah 29:11
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { UpdateSettingsSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";

// ============================================================================
// GET /api/settings - Fetch site settings
// ============================================================================

export async function GET() {
  try {
    // Get settings (there should only be one row)
    let settings = await db.siteSettings.findFirst();

    // Create default settings if none exist
    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          siteName: "SDA Cross River Conference",
          siteDescription: "The official website of the Seventh-day Adventist Church, Cross River Conference",
          contactEmail: "info@sdacrossriver.org",
          maintenanceMode: false,
        },
      });
    }

    // For public access, filter sensitive fields
    const session = await auth();
    if (!session?.user) {
      // Return only public settings
      return apiResponse({
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        address: settings.address,
        facebookUrl: settings.facebookUrl,
        twitterUrl: settings.twitterUrl,
        instagramUrl: settings.instagramUrl,
        youtubeUrl: settings.youtubeUrl,
        liveStreamUrl: settings.liveStreamUrl,
        maintenanceMode: settings.maintenanceMode,
        offlineMessage: settings.offlineMessage,
      });
    }

    // Return all settings for authenticated users
    return apiResponse(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return apiError("Failed to fetch settings", 500);
  }
}

// ============================================================================
// PATCH /api/settings - Update site settings (Admin only)
// ============================================================================

export async function PATCH(request: NextRequest) {
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
    const result = UpdateSettingsSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Get existing settings
    const existing = await db.siteSettings.findFirst();

    if (!existing) {
      // Create settings if they don't exist
      const settings = await db.siteSettings.create({
        data: {
          ...data,
          siteName: data.siteName || "SDA Cross River Conference",
        },
      });
      return apiResponse(settings);
    }

    // Update settings
    const settings = await db.siteSettings.update({
      where: { id: existing.id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return apiResponse(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return apiError("Failed to update settings", 500);
  }
}
