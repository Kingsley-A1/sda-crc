/**
 * Evangelism Management Page
 * ==========================
 * Manage evangelism campaigns and soul pledges.
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { CampaignsTable } from "@/components/command/evangelism/campaigns-table";
import { PledgesOverview } from "@/components/command/evangelism/pledges-overview";
import { EvangelismStats } from "@/components/command/evangelism/evangelism-stats";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Evangelism | Command Center",
};

export default function EvangelismManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Evangelism</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage campaigns and track pledges
          </p>
        </div>
        <Button asChild>
          <Link href="/command/evangelism/campaigns/new">+ New Campaign</Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        }
      >
        <EvangelismStats />
      </Suspense>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="pledges">Soul Pledges</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <CampaignsTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="pledges" className="mt-6">
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <PledgesOverview />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
