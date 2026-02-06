/**
 * Home Page
 * =========
 * The main landing page for SDA Cross River Conference Digital Sanctuary.
 * Features hero slider, latest sermons, upcoming events, and more.
 *
 * "The Lord is in his holy temple; let all the earth be silent before him." — Habakkuk 2:20
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { HeroSlider } from "@/components/sanctuary/home/hero-slider";
import { LatestSermons } from "@/components/sanctuary/home/latest-sermons";
import { UpcomingEvents } from "@/components/sanctuary/home/upcoming-events";
import { DepartmentsPreview } from "@/components/sanctuary/home/departments-preview";
import { QuickLinks } from "@/components/sanctuary/home/quick-links";
import { StatsCounter } from "@/components/sanctuary/home/stats-counter";
import { CtaBanner } from "@/components/sanctuary/home/cta-banner";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Welcome Home | SDA Cross River Conference",
  description:
    "Welcome to the SDA Cross River Conference Digital Sanctuary. Experience worship, community, and spiritual growth through our sermons, events, and ministries.",
};

export const dynamic = 'force-dynamic';

// ============================================================================
// Data Fetching
// ============================================================================

async function getHomePageData() {
  const [sermons, events, departments, stats] = await Promise.all([
    // Latest Sermons
    db.sermon.findMany({
      take: 4,
      orderBy: { date: "desc" },
      where: { published: true },
    }),
    // Upcoming Events
    db.event.findMany({
      where: { startDate: { gte: new Date() } },
      take: 4,
      orderBy: { startDate: "asc" },
    }),
    // Active Departments
    db.department.findMany({
      where: { active: true },
      take: 6,
    }),
    // Stats
    Promise.all([
      db.member.count(),
      db.sermon.count(),
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
}

// ============================================================================
// Hero Slides Configuration
// ============================================================================

const heroSlides = [
  {
    id: "1",
    imageUrl: "/images/hero/worship.jpg",
    title: "Welcome to SDA Cross River Conference",
    subtitle: "Experience worship, community, and spiritual growth",
    ctaText: "Join Us",
    ctaUrl: "/join",
  },
  {
    id: "2",
    imageUrl: "/images/hero/sermons.jpg",
    title: "Powerful Sermons",
    subtitle: "Feed your soul with the Word of God",
    ctaText: "Watch Now",
    ctaUrl: "/sermons",
  },
  {
    id: "3",
    imageUrl: "/images/hero/community.jpg",
    title: "Find Your Community",
    subtitle: "Join a small group near you",
    ctaText: "Find a Group",
    ctaUrl: "/small-groups",
  },
];

// ============================================================================
// Stats Configuration
// ============================================================================

function getStatsItems(stats: {
  members: number;
  sermons: number;
  events: number;
  groups: number;
}) {
  return [
    { label: "Active Members", value: stats.members, suffix: "+" },
    { label: "Sermons Available", value: stats.sermons, suffix: "" },
    { label: "Upcoming Events", value: stats.events, suffix: "" },
    { label: "Small Groups", value: stats.groups, suffix: "" },
  ];
}

// ============================================================================
// Page Component
// ============================================================================

export default async function HomePage() {
  const { sermons, events, departments, stats } = await getHomePageData();

  return (
    <>
      {/* Hero Slider - Full width, above the fold */}
      <HeroSlider slides={heroSlides} />

      {/* Quick Links - Mobile-friendly navigation cards */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900/50">
        <QuickLinks />
      </section>

      {/* Latest Sermons */}
      <section className="py-12 md:py-16">
        <LatestSermons sermons={sermons} />
      </section>

      {/* Stats Counter - Animated numbers */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <StatsCounter items={getStatsItems(stats)} />
      </section>

      {/* Upcoming Events */}
      <section className="py-12 md:py-16">
        <UpcomingEvents events={events} />
      </section>

      {/* Departments Preview */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50">
        <DepartmentsPreview departments={departments} />
      </section>

      {/* CTA Banner - Join Us */}
      <section className="py-12 md:py-16">
        <CtaBanner />
      </section>
    </>
  );
}
