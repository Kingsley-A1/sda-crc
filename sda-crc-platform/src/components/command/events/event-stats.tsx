/**
 * Event Stats Component
 * =====================
 * Server component that displays event statistics.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

async function getStats() {
  const now = new Date();

  const [totalEvents, upcoming, thisMonth, featured] = await Promise.all([
    db.event.count(),
    db.event.count({
      where: { startDate: { gte: now } },
    }),
    db.event.count({
      where: {
        startDate: {
          gte: new Date(now.getFullYear(), now.getMonth(), 1),
          lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
        },
      },
    }),
    db.event.count({ where: { featured: true } }),
  ]);

  return { totalEvents, upcoming, thisMonth, featured };
}

export async function EventStats() {
  const stats = await getStats();

  const statItems = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: "📅",
    },
    {
      label: "Upcoming",
      value: stats.upcoming,
      icon: "⏰",
    },
    {
      label: "This Month",
      value: stats.thisMonth,
      icon: "📆",
    },
    {
      label: "Featured",
      value: stats.featured,
      icon: "⭐",
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
