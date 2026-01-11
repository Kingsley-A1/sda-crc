import { cn } from "@/lib/utils";
import type { SmallGroupWithLeader } from "@/types";

import { GroupCard } from "./group-card";

export interface GroupListProps {
  groups: SmallGroupWithLeader[];
  className?: string;
  onSelect?: (group: SmallGroupWithLeader) => void;
}

export function GroupList({ groups, className, onSelect }: GroupListProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
      {groups.map((group) => (
        <div key={group.id} onClick={() => onSelect?.(group)}>
          <GroupCard group={group} />
        </div>
      ))}
    </div>
  );
}
