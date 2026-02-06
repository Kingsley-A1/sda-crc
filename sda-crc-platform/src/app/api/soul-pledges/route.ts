/**
 * Soul Pledges API Route
 * =======================
 * Handles evangelism soul winning pledges.
 *
 * "He who wins souls is wise." — Proverbs 11:30
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, apiError } from "@/lib/utils";
import { z } from "zod";

const CreateSoulPledgeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  pledgedSouls: z.coerce.number().min(1),
  notes: z.string().optional(),
  campaignId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = CreateSoulPledgeSchema.safeParse(body);

    if (!result.success) {
      return apiError(
        "Validation failed",
        400,
        result.error.flatten().fieldErrors
      );
    }

    const { name, email, pledgedSouls, notes, campaignId } = result.data;

    // Find member by email if provided
    let memberId = null;
    if (email) {
      const member = await db.member.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true },
      });
      if (member) {
        memberId = member.id;
      }
    }

    const pledge = await db.soulPledge.create({
      data: {
        memberId,
        campaignId,
        pledgedSouls: pledgedSouls || 1,
        notes: notes || `Pledge by ${name}`,
        status: "ACTIVE",
      },
    });

    return apiResponse(pledge, 201);
  } catch (error) {
    console.error("Error creating soul pledge:", error);
    return apiError("Failed to create pledge", 500);
  }
}
