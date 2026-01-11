/**
 * Evangelism Stats Component
 * ==========================
 * Server component that displays evangelism campaign statistics.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

async function getStats() {
  const [campaigns, activeCampaigns, pledges, totalSouls] = await Promise.all([
    db.evangelismCampaign.count(),
    db.evangelismCampaign.count({
      where: {
        startDate: { lte: new Date() },
        endDate: { gte: new Date() },
      },
    }),
    db.soulPledge.count(),
    db.soulPledge.aggregate({
      _sum: { pledgedSouls: true },
    }),
  ]);

  return {
    campaigns,
    activeCampaigns,
    pledges,
    totalSouls: totalSouls._sum.pledgedSouls || 0,
  };
}

export async function EvangelismStats() {
  const stats = await getStats();

  const statItems = [
    {
      label: "Total Campaigns",
      value: stats.campaigns,
      icon: "📢",
    },
    {
      label: "Active Now",
      value: stats.activeCampaigns,
      icon: "🔥",
    },
    {
      label: "Soul Pledges",
      value: stats.pledges,
      icon: "🙏",
    },
    {
      label: "Souls Pledged",
      value: stats.totalSouls,
      icon: "❤️",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
