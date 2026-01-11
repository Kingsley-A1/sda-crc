import Image from "next/image";

import { GoldBadge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface Leader {
  id: string;
  name: string;
  role: string;
  photoUrl?: string | null;
}

export interface LeaderCardProps {
  leader: Leader;
  className?: string;
}

export function LeaderCard({ leader, className }: LeaderCardProps) {
  return (
    <Card className={cn("p-4", className)} interactive hover="lift">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-[var(--secondary)]/40 bg-[var(--background-alt)]">
          {leader.photoUrl ? (
            <Image src={leader.photoUrl} alt={leader.name} fill className="object-cover" sizes="80px" />
          ) : null}
        </div>

        <p className="mt-3 text-sm font-extrabold text-[var(--text-primary)]">{leader.name}</p>
        <div className="mt-2">
          <GoldBadge size="sm" icon="star">
            {leader.role}
          </GoldBadge>
        </div>
      </div>
    </Card>
  );
}
