/**
 * Sermons Page
 * ============
 * "Faith comes from hearing the message." — Romans 10:17
 */

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { SermonGrid } from "@/components/sanctuary/sermons/sermon-grid";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch and download powerful sermons from SDA Cross River Conference preachers.",
};

export const dynamic = "force-dynamic";

async function getSermons() {
  try {
    const sermons = await db.sermon.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
      take: 24,
    });
    return sermons;
  } catch {
    return [];
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons();

  return (
    <>
      <PageHeader
        title="Sermons"
        subtitle="The Word of God"
        description="Watch, listen, and download powerful messages to strengthen your faith."
        size="sm"
      />

      <section className="section-padding">
        <Container>
          {sermons.length > 0 ? (
            <SermonGrid sermons={sermons} />
          ) : (
            <div className="text-center py-16">
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary-50 mb-4">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Sermons Yet
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Sermons will be uploaded here soon. Check back for powerful
                messages from our conference preachers.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
