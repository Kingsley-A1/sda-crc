/**
 * File Upload API Route
 * =====================
 * Generates presigned URLs for direct client-to-R2 uploads.
 * 
 * "Whatever you do, do it all for the glory of God." — 1 Corinthians 10:31
 */

import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { RequestUploadSchema } from "@/lib/validators";
import { apiResponse, apiError } from "@/lib/utils";
import { getPresignedUploadUrl, type UploadCategory } from "@/lib/r2";
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES, ALLOWED_AUDIO_TYPES, ALLOWED_VIDEO_TYPES } from "@/lib/constants";

// ============================================================================
// POST /api/upload - Request a presigned upload URL
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
    const result = RequestUploadSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const { filename, contentType, size, category } = result.data;

    // Validate file size
    if (size > MAX_FILE_SIZE) {
      return apiError(`File size exceeds maximum of ${MAX_FILE_SIZE / (1024 * 1024)}MB`, 400);
    }

    // Validate content type based on category
    const validTypes = getValidTypesForCategory(category as UploadCategory);
    if (!validTypes.includes(contentType)) {
      return apiError(
        `File type "${contentType}" is not allowed for category "${category}"`,
        400
      );
    }

    // Get presigned URL
    const uploadResult = await getPresignedUploadUrl(
      filename,
      contentType,
      category as UploadCategory,
      size
    );

    if (!uploadResult.success) {
      return apiError(uploadResult.error || "Failed to generate upload URL", 500);
    }

    return apiResponse({
      uploadUrl: uploadResult.uploadUrl,
      key: uploadResult.key,
      publicUrl: uploadResult.publicUrl,
      expiresIn: 3600, // 1 hour
      instructions: {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        note: "Upload the file directly to the uploadUrl using a PUT request",
      },
    });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return apiError("Failed to generate upload URL", 500);
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function getValidTypesForCategory(category: UploadCategory): string[] {
  switch (category) {
    case "sermons":
      return [...ALLOWED_IMAGE_TYPES, ...ALLOWED_AUDIO_TYPES, ...ALLOWED_VIDEO_TYPES];
    case "events":
    case "members":
    case "workers":
    case "departments":
      return ALLOWED_IMAGE_TYPES;
    case "general":
    default:
      return [
        ...ALLOWED_IMAGE_TYPES,
        ...ALLOWED_AUDIO_TYPES,
        ...ALLOWED_VIDEO_TYPES,
        "application/pdf",
      ];
  }
}
