/**
 * Events Page
 * ===========
 * "For everything there is a season." — Ecclesiastes 3:1
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { EventsList } from "@/components/sanctuary/events/events-list";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events, programs, and activities at SDA Cross River Conference.",
};

export const dynamic = "force-dynamic";

async function getEvents() {
  try {
    const [upcoming, past] = await Promise.all([
      db.event.findMany({
        where: { startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        take: 20,
      }),
      db.event.findMany({
        where: { startDate: { lt: new Date() } },
        orderBy: { startDate: "desc" },
        take: 12,
      }),
    ]);
    return { upcoming, past };
  } catch {
    return { upcoming: [], past: [] };
  }
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Calendar"
        description="Stay connected with upcoming programs, concerts, revivals, and community events."
        size="sm"
      />

      <section className="section-padding">
        <Container>
          <EventsList upcoming={upcoming} past={past} />
        </Container>
      </section>
    </>
  );
}
