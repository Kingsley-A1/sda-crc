import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout";
import { EvangelismContent } from "@/components/sanctuary/evangelism/evangelism-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Evangelism | SDA Cross River Conference",
  description: "Go into all the world and preach the gospel. See how SDA Cross River Conference is reaching souls for Christ.",
};

async function getEvangelismData() {
  const [sites, stats, campaigns] = await Promise.all([
    db.evangelismSite.findMany({
      where: { status: { in: ["ACTIVE", "COMPLETED"] } },
      select: {
        id: true,
        name: true,
        description: true,
        city: true,
        state: true,
        status: true,
        startDate: true,
        endDate: true,
        baptisms: true,
        decisions: true,
        actualAttendance: true,
        imageUrl: true,
        coordinator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            photoUrl: true,
          },
        },
      },
      orderBy: { startDate: "desc" },
    }),
    db.evangelismSite.aggregate({
      _sum: { baptisms: true, decisions: true, actualAttendance: true },
      _count: true,
    }),
    db.evangelismCampaign.findMany({
      where: { isActive: true },
      orderBy: { startDate: "desc" },
      take: 1,
    }),
  ]);

  return {
    sites,
    stats: {
      totalSites: stats._count,
      totalBaptisms: stats._sum.baptisms || 0,
      totalDecisions: stats._sum.decisions || 0,
      totalAttendance: stats._sum.actualAttendance || 0,
    },
    activeCampaign: campaigns[0] || null,
  };
}

export default async function EvangelismPage() {
  const { sites, stats, activeCampaign } = await getEvangelismData();

  return (
    <>
      <PageHeader
        subtitle="Go Into All the World"
        title="Evangelism & Outreach"
        description="Mark 16:15 — See how our conference is reaching souls across Cross River State."
      />
      <EvangelismContent
        sites={JSON.parse(JSON.stringify(sites))}
        stats={stats}
        activeCampaign={activeCampaign ? JSON.parse(JSON.stringify(activeCampaign)) : null}
      />
    </>
  );
}
