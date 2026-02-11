/**
 * Cloudflare R2 Storage Client
 * ============================
 * Handles file uploads to Cloudflare R2 (S3-compatible storage).
 * Zero egress fees = perfect for serving media content.
 *
 * "And God said, 'Let there be light,' and there was light." — Genesis 1:3
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { generateUniqueSlug } from "./utils";

// ============================================================================
// Configuration
// ============================================================================

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;

// Validate environment variables
if (
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME
) {
  console.warn("⚠️ R2 environment variables not fully configured");
}

// ============================================================================
// S3 Client Instance
// ============================================================================

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// ============================================================================
// Types
// ============================================================================

export type UploadCategory =
  | "sermons"
  | "events"
  | "members"
  | "workers"
  | "departments"
  | "general";

export interface UploadResult {
  success: boolean;
  key?: string;
  url?: string;
  error?: string;
}

export interface PresignedUrlResult {
  success: boolean;
  uploadUrl?: string;
  key?: string;
  publicUrl?: string;
  error?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate a unique storage key for a file
 */
function generateStorageKey(
  category: UploadCategory,
  filename: string
): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  const slug = generateUniqueSlug(filename.replace(/\.[^/.]+$/, ""));
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return `${category}/${date}/${slug}.${extension}`;
}

/**
 * Get the public URL for a stored file
 */
export function getPublicUrl(key: string): string {
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${key}`;
  }
  // Fallback to R2.dev URL pattern
  return `https://${R2_BUCKET_NAME}.r2.dev/${key}`;
}

/**
 * Validate content type for uploads
 */
function validateContentType(
  contentType: string,
  category: UploadCategory
): boolean {
  const allowedTypes: Record<UploadCategory, string[]> = {
    sermons: [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
      "video/mp4",
      "video/webm",
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
    events: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    members: ["image/jpeg", "image/png", "image/webp"],
    workers: ["image/jpeg", "image/png", "image/webp"],
    departments: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    general: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
      "audio/mpeg",
      "audio/mp3",
      "video/mp4",
    ],
  };

  return allowedTypes[category]?.includes(contentType) || false;
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Generate a presigned URL for client-side uploads
 * This is the preferred method - uploads go directly from browser to R2
 */
export async function getPresignedUploadUrl(
  filename: string,
  contentType: string,
  category: UploadCategory = "general"
  // maxSize parameter removed as validation should happen client-side
): Promise<PresignedUrlResult> {
  try {
    // Validate content type
    if (!validateContentType(contentType, category)) {
      return {
        success: false,
        error: `File type ${contentType} is not allowed for ${category}`,
      };
    }

    const key = generateStorageKey(category, filename);

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      // Set metadata
      Metadata: {
        "original-filename": encodeURIComponent(filename),
        "upload-category": category,
        "uploaded-at": new Date().toISOString(),
      },
    });

    // Generate presigned URL (valid for 1 hour)
    const uploadUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600,
    });

    return {
      success: true,
      uploadUrl,
      key,
      publicUrl: getPublicUrl(key),
    };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate upload URL",
    };
  }
}

/**
 * Upload a file directly from the server
 * Use this for processing files that need server-side handling
 */
export async function uploadFile(
  buffer: Buffer,
  filename: string,
  contentType: string,
  category: UploadCategory = "general"
): Promise<UploadResult> {
  try {
    // Validate content type
    if (!validateContentType(contentType, category)) {
      return {
        success: false,
        error: `File type ${contentType} is not allowed for ${category}`,
      };
    }

    const key = generateStorageKey(category, filename);

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      Metadata: {
        "original-filename": encodeURIComponent(filename),
        "upload-category": category,
        "uploaded-at": new Date().toISOString(),
      },
    });

    await r2Client.send(command);

    return {
      success: true,
      key,
      url: getPublicUrl(key),
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}

/**
 * Delete a file from R2
 */
export async function deleteFile(
  key: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);

    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete file",
    };
  }
}

/**
 * Check if a file exists in R2
 */
export async function fileExists(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get a signed URL for private file access
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    return await getSignedUrl(r2Client, command, { expiresIn });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return null;
  }
}

/**
 * List files in a category/prefix
 */
export async function listFiles(
  prefix: string,
  maxKeys: number = 100
): Promise<{ key: string; size: number; lastModified: Date }[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: maxKeys,
    });

    const response = await r2Client.send(command);

    interface S3Object {
      Key?: string;
      Size?: number;
      LastModified?: Date;
    }

    const contents = (response as unknown as { Contents?: S3Object[] }).Contents || [];

    return contents.map((object: S3Object) => ({
      key: object.Key || "",
      size: object.Size || 0,
      lastModified: object.LastModified || new Date(),
    }));
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

/**
 * Extract the key from a public URL
 */
export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Remove leading slash
    return urlObj.pathname.slice(1);
  } catch {
    return null;
  }
}

/**
 * Delete multiple files at once
 */
export async function deleteFiles(keys: string[]): Promise<{
  success: boolean;
  deleted: string[];
  failed: string[];
}> {
  const deleted: string[] = [];
  const failed: string[] = [];

  await Promise.all(
    keys.map(async (key) => {
      const result = await deleteFile(key);
      if (result.success) {
        deleted.push(key);
      } else {
        failed.push(key);
      }
    })
  );

  return {
    success: failed.length === 0,
    deleted,
    failed,
  };
}

// ============================================================================
// Export Client for Advanced Usage
// ============================================================================

export { r2Client };
