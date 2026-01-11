"use client";

import * as React from "react";
import { MapTrifold } from "@phosphor-icons/react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SmallGroupWithLeader } from "@/types";

export interface GroupMapProps {
  groups: SmallGroupWithLeader[];
  selectedId?: string;
  onSelect?: (group: SmallGroupWithLeader) => void;
  className?: string;
}

/**
 * NOTE: Leaflet integration is intentionally deferred until `leaflet` + `react-leaflet`
 * are installed and the map UX is finalized. This placeholder keeps the build healthy.
 */
export function GroupMap({ groups, selectedId, onSelect, className }: GroupMapProps) {
  const selected = React.useMemo(
    () => groups.find((g) => g.id === selectedId) ?? null,
    [groups, selectedId]
  );

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center gap-2">
        <MapTrifold className="h-5 w-5 text-[var(--text-secondary)]" weight="bold" />
        <p className="text-sm font-bold text-[var(--text-primary)]">Map view</p>
      </div>

      <p className="mt-2 text-xs text-[var(--text-secondary)]">
        Map UI will appear here once Leaflet is enabled. For now, tap a group in the list to
        preview its location.
      </p>

      {selected ? (
        <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--background-alt)] p-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{selected.name}</p>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Lat/Lng: {selected.latitude}, {selected.longitude}
          </p>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-[var(--border)] p-3">
          <p className="text-xs text-[var(--text-tertiary)]">Select a group to preview.</p>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {groups.slice(0, 4).map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect?.(g)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              g.id === selectedId
                ? "border-[var(--secondary)] bg-[var(--secondary)]/15 text-[var(--text-primary)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
            )}
          >
            {g.name}
          </button>
        ))}
      </div>
    </Card>
  );
}
