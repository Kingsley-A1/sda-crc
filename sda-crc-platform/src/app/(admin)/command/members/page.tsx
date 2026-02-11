/**
 * Members Management Page
 * =======================
 * CRUD interface for managing church members.
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { MembersTable } from "@/components/command/members/members-table";
import { MemberStats } from "@/components/command/members/member-stats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Members | Command Center",
};

export const dynamic = 'force-dynamic';

async function getMembers() {
  const members = await db.member.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  type MemberQueryResult = typeof members[number];

  return members.map((m: MemberQueryResult) => ({
    id: m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    phone: m.phone || "",
    dateOfBirth: m.dateOfBirth?.toISOString() || null,
    gender: m.gender,
    address: m.address,
    city: m.city,
    state: m.state,
    occupation: m.occupation,
    baptismDate: m.baptismDate?.toISOString() || null,
    membershipType: m.membershipType,
    photoUrl: m.photoUrl,
    emergencyContactName: m.emergencyContactName,
    emergencyContactPhone: m.emergencyContactPhone,
    interests: m.interests,
    isActive: m.isActive,
    notes: m.notes,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
  }));
}

export default async function MembersManagementPage() {
  const members = await getMembers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage church membership records
          </p>
        </div>
        <Button asChild>
          <Link href="/command/members/new">+ Add Member</Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        }
      >
        <MemberStats />
      </Suspense>

      <MembersTable rows={members} />
    </div>
  );
}
