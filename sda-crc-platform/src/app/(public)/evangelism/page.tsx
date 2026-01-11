/**
 * Evangelism Page
 * ===============
 * Public evangelism initiatives, campaigns, and outreach programs.
 * 
 * "Go into all the world and preach the gospel to all creation." — Mark 16:15
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { EvangelismHero } from "@/components/sanctuary/evangelism/evangelism-hero";
import { CampaignsGrid } from "@/components/sanctuary/evangelism/campaigns-grid";
import { PledgeSection } from "@/components/sanctuary/evangelism/pledge-section";
import { ImpactStats } from "@/components/sanctuary/evangelism/impact-stats";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Evangelism",
  description:
    "Join our evangelism initiatives. Support campaigns, pledge for souls, and be part of the great commission.",
};

// ============================================================================
// Data Fetching
// ============================================================================

async function getEvangelismData() {
  const [sites, pledges] = await Promise.all([
    db.evangelismSite.findMany({
      orderBy: { createdAt: "desc" },
    }),
    db.soulPledge.aggregate({
      _sum: {
        pledgedSouls: true,
        wonSouls: true,
      },
      _count: true,
    }),
  ]);

  const stats = {
    totalSites: sites.length,
    activeSites: sites.filter((s: { status: string }) => s.status === "ACTIVE").length,
    completedSites: sites.filter((s: { status: string }) => s.status === "COMPLETED").length,
    totalDecisions: pledges._sum.pledgedSouls || 0,
    totalBaptisms: pledges._sum.wonSouls || 0,
    totalAttendance: 0, // Will be calculated from actual event attendance
  };

  return { stats };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function EvangelismPage() {
  const { stats } = await getEvangelismData();

  return (
    <>
      <PageHeader
        title="Evangelism"
        subtitle="Reaching souls for Christ"
        backgroundImage="/images/evangelism-header.jpg"
      />

      {/* Evangelism Hero - Current Campaign */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <Container>
          <Suspense fallback={<Skeleton className="h-[400px] rounded-2xl" />}>
            <EvangelismHero />
          </Suspense>
        </Container>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <Container>
          <ImpactStats stats={stats} />
        </Container>
      </section>

      {/* Pledge for Souls */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Pledge for Souls
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Make a commitment to pray for, support, or bring souls to Christ.
              Every pledge matters in the great harvest.
            </p>
          </div>
          <Suspense fallback={<Skeleton className="h-[300px] rounded-xl" />}>
            <PledgeSection />
          </Suspense>
        </Container>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <h2 className="text-3xl font-serif font-bold text-center mb-8">
            Evangelism Campaigns
          </h2>
          <Suspense fallback={<Skeleton className="h-[400px] rounded-xl" />}>
            <CampaignsGrid />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
