import { Card, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type?: "info" | "success" | "warning";
}

export interface RecentActivityProps {
  items: ActivityItem[];
  className?: string;
}

export function RecentActivity({ items, className }: RecentActivityProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-sm font-bold text-foreground">Recent activity</p>
      <div className="mt-3 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground/60">No activity yet.</p>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              className="rounded-xl border border-border bg-muted p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {it.title}
                  </p>
                  {it.description ? (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {it.description}
                    </p>
                  ) : null}
                </div>
                <Badge
                  size="sm"
                  rounded="full"
                  variant={
                    it.type === "success"
                      ? "success-subtle"
                      : it.type === "warning"
                        ? "warning-subtle"
                        : "muted"
                  }
                >
                  {it.timestamp}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
