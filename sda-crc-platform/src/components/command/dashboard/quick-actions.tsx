import Link from "next/link";

import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-sm font-bold text-[var(--text-primary)]">Quick actions</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/command/sermons/new">New sermon</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/command/events/new">New event</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/command/members">View members</Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11">
          <Link href="/command/workers">Manage workers</Link>
        </Button>
      </div>
    </Card>
  );
}
