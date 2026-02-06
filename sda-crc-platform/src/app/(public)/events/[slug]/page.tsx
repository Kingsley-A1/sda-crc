/**
 * Event Detail Page
 * =================
 * Individual event page with full details, registration, and location.
 *
 * "For where two or three gather in my name, there am I with them." — Matthew 18:20
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { EventDetails } from "@/components/sanctuary/events/event-details";
import { EventRegistration } from "@/components/sanctuary/events/event-registration";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ============================================================================
// Data Fetching
// ============================================================================

async function getEvent(slug: string) {
  const event = await db.event.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  return event;
}

// ============================================================================
// Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description || `Join us for ${event.title}`,
    openGraph: {
      title: event.title,
      description: event.description || undefined,
      type: "article",
      images: event.imageUrl ? [event.imageUrl] : undefined,
    },
  };
}

// ============================================================================
// Page Component
// ============================================================================

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return notFound();
  }

  const isPastEvent = new Date(event.endDate || event.startDate) < new Date();
  // event.startDate is correct here since schema is reverted

  return (
    <Container className="py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <EventDetails event={event} />
        </div>

        {/* Sidebar - Registration or Past Event Notice */}
        <aside>
          <div className="sticky top-24">
            {isPastEvent ? (
              <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Event Concluded</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This event has already taken place. Check out our upcoming
                  events!
                </p>
              </div>
            ) : (
              <EventRegistration event={event} />
            )}
          </div>
        </aside>
      </div>
    </Container>
  );
}
