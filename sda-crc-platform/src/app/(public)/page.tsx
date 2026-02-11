/**
 * Home Page
 * =========
 * The main landing page for SDA Cross River Conference Digital Sanctuary.
 * "The Lord is in his holy temple; let all the earth be silent before him." — Habakkuk 2:20
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Hero } from "@/components/sanctuary/home/hero";
import { SermonPreview } from "@/components/sanctuary/home/sermon-preview";
import { EventsPreview } from "@/components/sanctuary/home/events-preview";
import { StatsSection } from "@/components/sanctuary/home/stats-section";
import { DepartmentsPreview } from "@/components/sanctuary/home/departments-preview";
import { CtaSection } from "@/components/sanctuary/home/cta-section";

export const metadata: Metadata = {
  title: "Welcome Home | SDA Cross River Conference",
  description:
    "Integrated for Mission — Experience worship, community, and spiritual growth at the SDA Cross River Conference.",
};

export const dynamic = "force-dynamic";

async function getHomePageData() {
  try {
    const [sermons, events, departments, stats] = await Promise.all([
      db.sermon.findMany({
        take: 3,
        orderBy: { date: "desc" },
        where: { published: true },
      }),
      db.event.findMany({
        where: { startDate: { gte: new Date() } },
        take: 3,
        orderBy: { startDate: "asc" },
      }),
      db.department.findMany({
        where: { active: true },
        take: 8,
        orderBy: { order: "asc" },
      }),
      Promise.all([
        db.member.count(),
        db.sermon.count({ where: { published: true } }),
        db.event.count({ where: { startDate: { gte: new Date() } } }),
        db.smallGroup.count({ where: { isActive: true } }),
      ]),
    ]);

    return {
      sermons,
      events,
      departments,
      stats: {
        members: stats[0],
        sermons: stats[1],
        events: stats[2],
        groups: stats[3],
      },
    };
  } catch (error) {
    console.error("Failed to load home data:", error);
    return {
      sermons: [],
      events: [],
      departments: [],
      stats: { members: 0, sermons: 0, events: 0, groups: 0 },
    };
  }
}

export default async function HomePage() {
  const { sermons, events, departments, stats } = await getHomePageData();

  const statsItems = [
    { label: "Active Members", value: stats.members, suffix: "+" },
    { label: "Sermons", value: stats.sermons },
    { label: "Upcoming Events", value: stats.events },
    { label: "Small Groups", value: stats.groups },
  ];

  return (
    <>
      <Hero />
      <SermonPreview sermons={sermons} />
      <StatsSection items={statsItems} />
      <EventsPreview events={events} />
      <DepartmentsPreview departments={departments} />
      <CtaSection />
    </>
  );
}
