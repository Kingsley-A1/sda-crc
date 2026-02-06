/**
 * Live Stream Page
 * ================
 * Live worship services and real-time streaming page.
 *
 * "They will see the Son of Man coming in clouds with great power and glory." — Mark 13:26
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { LivePlayer } from "@/components/sanctuary/live/live-player";
import { LiveSchedule } from "@/components/sanctuary/live/live-schedule";
import { LiveChat } from "@/components/sanctuary/live/live-chat";
import { LiveIndicator } from "@/components/sanctuary/live/live-indicator";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: "Live Worship",
  description:
    "Join us for live worship services from the SDA Cross River Conference. Experience the presence of God wherever you are.",
};

// ============================================================================
// Page Component
// ============================================================================

export default function LivePage() {
  return (
    <>
      {/* Minimal header for live page */}
      <div className="bg-black text-white py-4">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Live Worship</h1>
            <LiveIndicator />
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Player */}
            <Suspense
              fallback={<Skeleton className="aspect-video rounded-2xl" />}
            >
              <LivePlayer />
            </Suspense>

            {/* Service Info */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6">
              <h2 className="text-xl font-semibold mb-2">
                Sabbath Divine Worship
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Join us for our weekly Sabbath worship service. Experience
                praise, prayer, and the preaching of God&apos;s Word.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📅</span>
                  <span>Every Saturday</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">🕐</span>
                  <span>9:00 AM - 12:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Chat */}
            <div className="rounded-xl border h-[400px] lg:h-[500px]">
              <Suspense fallback={<Skeleton className="h-full rounded-xl" />}>
                <LiveChat />
              </Suspense>
            </div>

            {/* Upcoming Schedule */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6">
              <h3 className="font-semibold mb-4">Upcoming Services</h3>
              <Suspense fallback={<Skeleton className="h-[200px]" />}>
                <LiveSchedule />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
