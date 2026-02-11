import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout";
import { SmallGroupsList } from "@/components/sanctuary/small-groups/small-groups-list";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Small Groups | SDA Cross River Conference",
  description: "Find a small group near you. Connect, study, and grow together.",
};

async function getSmallGroups() {
  const groups = await db.smallGroup.findMany({
    where: {
      isActive: true,
      acceptingMembers: true,
    },
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
    orderBy: { name: "asc" },
  });

  return groups.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
    address: g.address,
    city: g.city,
    state: g.state,
    meetingDay: g.meetingDay,
    meetingTime: g.meetingTime,
    type: g.type,
    maxMembers: g.maxMembers,
    currentMembers: g._count.members,
    leader: g.leader,
  }));
}

export default async function SmallGroupsPage() {
  const groups = await getSmallGroups();

  return (
    <>
      <PageHeader
        subtitle="Connect & Grow Together"
        title="Small Groups"
        description="Find a small group near you for Bible study, prayer, and fellowship."
      />
      <SmallGroupsList groups={JSON.parse(JSON.stringify(groups))} />
    </>
  );
}
