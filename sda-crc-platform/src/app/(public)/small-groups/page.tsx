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

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Small Groups",
  description:
    "Find a small group or house church near you. Experience community, fellowship, and spiritual growth in an intimate setting.",
};

// ============================================================================
// Data Fetching
// ============================================================================

async function getSmallGroups() {
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
    },
  });

  return groups.map((group: {
    id: string;
    name: string;
    description: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    latitude: number | null;
    longitude: number | null;
    meetingDay: string;
    meetingTime: string | null;
    type: string;
    isActive: boolean;
    leader: { id: string; firstName: string; lastName: string; phone: string | null; photoUrl: string | null } | null;
  }) => ({
    id: group.id,
    name: group.name,
    description: group.description || undefined,
    address: group.address || undefined,
    city: group.city || undefined,
    state: group.state || undefined,
    latitude: group.latitude || undefined,
    longitude: group.longitude || undefined,
    meetingDay: group.meetingDay,
    meetingTime: group.meetingTime || undefined,
    type: group.type as "house-church" | "bible-study" | "prayer-group" | "youth-group" | "other",
    isActive: group.isActive,
    leader: group.leader ? {
      id: group.leader.id,
      firstName: group.leader.firstName,
      lastName: group.leader.lastName,
      phone: group.leader.phone || undefined,
      photoUrl: group.leader.photoUrl || undefined,
    } : undefined,
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
            Small groups are the heart of our community life. Whether you&apos;re looking 
            for a Bible study, prayer group, or house church, there&apos;s a place for you 
            to connect and grow.
          </p>
        </div>

        {/* Group Finder (includes Map and List) */}
        <GroupFinder groups={groups} />
      </Container>
    </>
  );
}
