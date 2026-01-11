/**
 * Command Center Dashboard
 * ========================
 * Main admin dashboard with overview statistics and quick actions.
 * 
 * "The one who is faithful in a very little is also faithful in much." — Luke 16:10
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { DashboardStats } from "@/components/command/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/command/dashboard/recent-activity";
import { QuickActions } from "@/components/command/dashboard/quick-actions";
import { UpcomingTasks } from "@/components/command/dashboard/upcoming-tasks";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Dashboard | Command Center",
  description: "SDA CRC Command Center Dashboard",
};

// ============================================================================
// Data Fetching
// ============================================================================

async function getRecentActivity() {
  const [recentMembers, recentSermons, recentEvents] = await Promise.all([
    db.member.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { id: true, firstName: true, lastName: true, createdAt: true },
    }),
    db.sermon.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    }),
    db.event.findMany({
      take: 2,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true },
    }),
  ]);

  const activities = [
    ...recentMembers.map((m: { id: string; firstName: string; lastName: string; createdAt: Date }) => ({
      id: `member-${m.id}`,
      title: `New member: ${m.firstName} ${m.lastName}`,
      timestamp: m.createdAt.toISOString(),
      type: "success" as const,
    })),
    ...recentSermons.map((s: { id: string; title: string; createdAt: Date }) => ({
      id: `sermon-${s.id}`,
      title: `Sermon added: ${s.title}`,
      timestamp: s.createdAt.toISOString(),
      type: "info" as const,
    })),
    ...recentEvents.map((e: { id: string; title: string; createdAt: Date }) => ({
      id: `event-${e.id}`,
      title: `Event created: ${e.title}`,
      timestamp: e.createdAt.toISOString(),
      type: "info" as const,
    })),
  ];

  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);
}

// ============================================================================
// Page Component
// ============================================================================

export default async function DashboardPage() {
  const recentActivity = await getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the SDA CRC Command Center
        </p>
      </div>

      {/* Stats Grid */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity items={recentActivity} />
        </div>
      </div>

      {/* Upcoming Tasks */}
      <Suspense fallback={<Skeleton className="h-[200px] rounded-xl" />}>
        <UpcomingTasks />
      </Suspense>
    </div>
  );
}
