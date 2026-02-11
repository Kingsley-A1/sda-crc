import { db } from "@/lib/db";
import { PageHeader } from "@/components/layout";
import { WorkersGrid } from "@/components/sanctuary/workers/workers-grid";
import { WORKER_ROLE_HIERARCHY } from "@/lib/worker-roles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Workers | SDA Cross River Conference",
  description: "Meet the dedicated workers and leaders serving at SDA Cross River Conference.",
};

async function getWorkers() {
  const workers = await db.worker.findMany({
    where: {
      isActive: true,
      showOnWebsite: true,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
      title: true,
      department: true,
      bio: true,
      photoUrl: true,
      displayOrder: true,
      socialLinks: true,
    },
  });

  // Sort by hierarchy order, then displayOrder, then lastName
  const sorted = workers.sort((a, b) => {
    const aHierarchy = WORKER_ROLE_HIERARCHY.indexOf(a.role);
    const bHierarchy = WORKER_ROLE_HIERARCHY.indexOf(b.role);
    const aOrder = aHierarchy === -1 ? 999 : aHierarchy;
    const bOrder = bHierarchy === -1 ? 999 : bHierarchy;

    if (aOrder !== bOrder) return aOrder - bOrder;
    if ((a.displayOrder || 999) !== (b.displayOrder || 999)) {
      return (a.displayOrder || 999) - (b.displayOrder || 999);
    }
    return a.lastName.localeCompare(b.lastName);
  });

  return sorted;
}

export default async function WorkersPage() {
  const workers = await getWorkers();

  return (
    <>
      <PageHeader
        subtitle="Servants of the Most High"
        title="Our Workers"
        description="Let the elders who rule well be counted worthy of double honor. — 1 Timothy 5:17"
      />
      <WorkersGrid workers={JSON.parse(JSON.stringify(workers))} />
    </>
  );
}
