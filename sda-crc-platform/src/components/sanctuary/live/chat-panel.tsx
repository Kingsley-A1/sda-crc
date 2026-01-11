import Link from "next/link";

import { Card, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ChatPanelProps {
  chatUrl?: string | null;
  className?: string;
}

export function ChatPanel({ chatUrl, className }: ChatPanelProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-sm font-bold text-[var(--text-primary)]">Live chat</p>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        Chat embedding can be enabled once the stream provider is finalized.
      </p>

      {chatUrl ? (
        <div className="mt-4">
          <Button asChild className="min-h-11 w-full">
            <Link href={chatUrl} target="_blank" rel="noreferrer">
              Open chat
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] p-3">
          <p className="text-xs text-[var(--text-tertiary)]">Chat coming soon.</p>
        </div>
      )}
    </Card>
  );
}
