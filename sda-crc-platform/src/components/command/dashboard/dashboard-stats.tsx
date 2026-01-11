/**
 * Dashboard Stats Component
 * =========================
 * Overview statistics for the dashboard.
 */

import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

export async function DashboardStats() {
  const [members, sermons, events, workers] = await Promise.all([
    db.member.count(),
    db.sermon.count({ where: { isPublished: true } }),
    db.event.count({ where: { isPublished: true, startDate: { gte: new Date() } } }),
    db.worker.count({ where: { isActive: true } }),
  ]);

  const stats = [
    { label: "Total Members", value: members, icon: "👥", color: "bg-blue-500" },
    { label: "Published Sermons", value: sermons, icon: "🎙️", color: "bg-green-500" },
    { label: "Upcoming Events", value: events, icon: "📅", color: "bg-purple-500" },
    { label: "Active Workers", value: workers, icon: "⭐", color: "bg-amber-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
