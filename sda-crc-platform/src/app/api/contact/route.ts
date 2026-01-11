/**
 * Contact Form API Route
 * ======================
 * Handles contact form submissions.
 * 
 * "Ask and it will be given to you; seek and you will find." — Matthew 7:7
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ContactFormSchema } from "@/lib/validators";
import { apiResponse, apiError, buildPaginationMeta } from "@/lib/utils";

// ============================================================================
// Rate Limiting (simple in-memory implementation)
// ============================================================================

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 submissions per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// ============================================================================
// GET /api/contact - Fetch all submissions (Admin only)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    // Check authorization
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"];
    if (!allowedRoles.includes(session.user.role)) {
      return apiError("Forbidden", 403);
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const unreadOnly = searchParams.get("unread") === "true";

    // Build where clause
    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (unreadOnly) {
      where.readAt = null;
    }

    // Execute queries in parallel
    const [submissions, total, unreadCount] = await Promise.all([
      db.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subject: true,
          message: true,
          category: true,
          status: true,
          readAt: true,
          repliedAt: true,
          createdAt: true,
        },
      }),
      db.contactSubmission.count({ where }),
      db.contactSubmission.count({ where: { readAt: null } }),
    ]);

    return apiResponse(submissions, 200, {
      ...buildPaginationMeta(total, page, limit),
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return apiError("Failed to fetch submissions", 500);
  }
}

// ============================================================================
// POST /api/contact - Submit contact form (Public)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return apiError("Too many requests. Please wait a moment before trying again.", 429);
    }

    // Parse and validate body
    const body = await request.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return apiError("Validation failed", 400, result.error.flatten().fieldErrors);
    }

    const data = result.data;

    // Create contact submission
    const submission = await db.contactSubmission.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        ipAddress: ip,
        userAgent: request.headers.get("user-agent") || undefined,
        status: "NEW",
      },
    });

    // TODO: Send notification email to admin
    // This would be implemented with a service like SendGrid, Resend, or Nodemailer

    return apiResponse(
      {
        id: submission.id,
        message: "Thank you for reaching out! We will get back to you soon.",
      },
      201
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return apiError("Failed to submit form", 500);
  }
}
