/**
 * Worker Stats Component
 * ======================
 * Server component that displays worker statistics.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

async function getStats() {
  const [totalWorkers, pastors, elders, deacons] = await Promise.all([
    db.member.count({
      where: { isWorker: true },
    }),
    db.member.count({
      where: {
        isWorker: true,
        workerRole: { contains: "Pastor" },
      },
    }),
    db.member.count({
      where: {
        isWorker: true,
        workerRole: { contains: "Elder" },
      },
    }),
    db.member.count({
      where: {
        isWorker: true,
        OR: [
          { workerRole: { contains: "Deacon" } },
          { workerRole: { contains: "Deaconess" } },
        ],
      },
    }),
  ]);

  return { totalWorkers, pastors, elders, deacons };
}

export async function WorkerStats() {
  const stats = await getStats();

  const statItems = [
    {
      label: "Total Workers",
      value: stats.totalWorkers,
      icon: "⭐",
    },
    {
      label: "Pastors",
      value: stats.pastors,
      icon: "👨‍💼",
    },
    {
      label: "Elders",
      value: stats.elders,
      icon: "🙏",
    },
    {
      label: "Deacons/Deaconesses",
      value: stats.deacons,
      icon: "🤝",
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
