/**
 * Member Stats Component
 * ======================
 * Server component that displays member statistics.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

async function getStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalMembers, workers, recentSignups, activeThisMonth] =
    await Promise.all([
      db.member.count(),
      db.member.count({
        where: { isWorker: true },
      }),
      db.member.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
      db.member.count({
        where: {
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) },
        },
      }),
    ]);

  return { totalMembers, workers, recentSignups, activeThisMonth };
}

export async function MemberStats() {
  const stats = await getStats();

  const statItems = [
    {
      label: "Total Members",
      value: stats.totalMembers,
      icon: "👥",
    },
    {
      label: "Church Workers",
      value: stats.workers,
      icon: "⭐",
    },
    {
      label: "Last 30 Days",
      value: stats.recentSignups,
      icon: "📈",
    },
    {
      label: "This Month",
      value: stats.activeThisMonth,
      icon: "📅",
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
