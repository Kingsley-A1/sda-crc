import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout";
import { LiveContent } from "@/components/sanctuary/live/live-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Live | SDA Cross River Conference",
  description: "Watch live worship services and programs from SDA Cross River Conference.",
};

async function getLiveData() {
  const [settings, upcomingEvents] = await Promise.all([
    db.siteSettings.findFirst({
      select: {
        liveStreamUrl: true,
        siteName: true,
      },
    }),
    db.event.findMany({
      where: {
        startDate: { gte: new Date() },
        published: true,
      },
      orderBy: { startDate: "asc" },
      take: 5,
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        location: true,
        category: true,
      },
    }),
  ]);

  return {
    liveStreamUrl: settings?.liveStreamUrl || null,
    upcomingEvents: upcomingEvents,
  };
}

export default async function LivePage() {
  const { liveStreamUrl, upcomingEvents } = await getLiveData();

  return (
    <>
      <PageHeader
        subtitle="Worship With Us"
        title="Live Stream"
        description="Join us live for worship services and special programs."
      />
      <LiveContent
        liveStreamUrl={liveStreamUrl}
        upcomingEvents={JSON.parse(JSON.stringify(upcomingEvents))}
      />
    </>
  );
}
