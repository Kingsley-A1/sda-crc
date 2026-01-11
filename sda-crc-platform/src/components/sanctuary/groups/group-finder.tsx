"use client";

import * as React from "react";

import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SmallGroupWithLeader } from "@/types";

import { GroupList } from "./group-list";
import { GroupMap } from "./group-map";

export interface GroupFinderProps {
  groups: SmallGroupWithLeader[];
  className?: string;
}

export function GroupFinder({ groups, className }: GroupFinderProps) {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | undefined>();

  const filtered = React.useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups.filter((g) => {
      return (
        g.name.toLowerCase().includes(q) ||
        (g.city ?? "").toLowerCase().includes(q) ||
        (g.state ?? "").toLowerCase().includes(q) ||
        (g.address ?? "").toLowerCase().includes(q)
      );
    });
  }, [groups, query]);

  const handleSelect = (group: SmallGroupWithLeader) => {
    setSelectedId(group.id);
  };

  return (
    <section className={cn("space-y-4", className)} aria-label="Small group finder">
      <Input
        type="search"
        placeholder="Search by area, city, or group name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-h-11"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GroupMap
            groups={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
        <div className="lg:col-span-2">
          <GroupList groups={filtered} onSelect={handleSelect} />
        </div>
      </div>
    </section>
  );
}
