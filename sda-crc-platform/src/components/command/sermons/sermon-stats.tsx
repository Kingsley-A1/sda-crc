/**
 * Sermon Stats Component
 * ======================
 * Server component that displays sermon statistics.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

async function getStats() {
  const [totalSermons, thisMonth, withVideo, seriesCount] = await Promise.all([
    db.sermon.count(),
    db.sermon.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    db.sermon.count({
      where: { videoUrl: { not: null } },
    }),
    db.sermonSeries.count(),
  ]);

  return { totalSermons, thisMonth, withVideo, seriesCount };
}

export async function SermonStats() {
  const stats = await getStats();

  const statItems = [
    {
      label: "Total Sermons",
      value: stats.totalSermons,
      icon: "📚",
    },
    {
      label: "This Month",
      value: stats.thisMonth,
      icon: "📅",
    },
    {
      label: "With Video",
      value: stats.withVideo,
      icon: "🎬",
    },
    {
      label: "Sermon Series",
      value: stats.seriesCount,
      icon: "📖",
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
