/**
 * Small Groups Page
 * =================
 * Find and join small groups (house churches, Bible study groups) near you.
 * Features location-based search with map integration.
 *
 * "They broke bread in their homes and ate together with glad and sincere hearts." — Acts 2:46
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { GroupFinder } from "@/components/sanctuary/groups/group-finder";
import type { SmallGroupWithLeader } from "@/types";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Small Groups",
  description:
    "Find a small group or house church near you. Experience community, fellowship, and spiritual growth in an intimate setting.",
};

export const dynamic = 'force-dynamic';

// ============================================================================
// Data Fetching
// ============================================================================

async function getSmallGroups(): Promise<SmallGroupWithLeader[]> {
  const groups = await db.smallGroup.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
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
        select: { members: true },
      },
    },
  });

  return groups.map((group) => ({
    id: group.id,
    name: group.name,
    description: group.description,
    type: group.type,
    latitude: group.latitude,
    longitude: group.longitude,
    address: group.address,
    city: group.city,
    state: group.state,
    meetingDay: group.meetingDay,
    meetingTime: group.meetingTime,
    maxMembers: group.maxMembers,
    isActive: group.isActive,
    acceptingMembers: group.acceptingMembers,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    leader: group.leader,
    currentMembers: group._count.members,
  }));
}

// ============================================================================
// Page Component
// ============================================================================

export default async function SmallGroupsPage() {
  const groups = await getSmallGroups();

  return (
    <>
      <PageHeader
        title="Small Groups"
        subtitle="Connect in community, grow in faith"
        backgroundImage="/images/groups-header.jpg"
      />

      <Container className="py-8 md:py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Small groups are the heart of our community life. Whether
            you&apos;re looking for a Bible study, prayer group, or house
            church, there&apos;s a place for you to connect and grow.
          </p>
        </div>

        {/* Group Finder (includes Map and List) */}
        <GroupFinder groups={groups} />
      </Container>
    </>
  );
}
