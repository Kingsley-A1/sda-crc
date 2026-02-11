"use client";

import * as React from "react";

import type { EvangelismSite, EvangelismStatus } from "@/types/evangelism";
import { formatDate } from "@/lib/utils";

import { Badge } from "@/components/ui";
import {
  ActionMenu,
  DataTable,
  type DataTableColumn,
} from "@/components/command/shared";

export interface EvangelismSitesTableProps {
  rows: EvangelismSite[];
  onEdit?: (site: EvangelismSite) => void;
  onDelete?: (site: EvangelismSite) => void;
}

function statusVariant(status: EvangelismStatus) {
  switch (status) {
    case "ACTIVE":
      return "success-subtle" as const;
    case "PAUSED":
      return "warning-subtle" as const;
    case "COMPLETED":
      return "subtle" as const;
    case "PLANNING":
    default:
      return "info-subtle" as const;
  }
}

export function EvangelismSitesTable({
  rows,
  onEdit,
  onDelete,
}: EvangelismSitesTableProps) {
  const columns = React.useMemo<Array<DataTableColumn<EvangelismSite>>>(
    () => [
      {
        key: "name",
        header: "Site",
        cell: (s) => (
          <div className="min-w-0">
            <p className="truncate font-semibold">{s.name}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground/60">
              {s.city ?? "—"}
            </p>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        cell: (s) => (
          <Badge variant={statusVariant(s.status)} size="sm" rounded="full">
            {s.status}
          </Badge>
        ),
        className: "w-[140px]",
      },
      {
        key: "startDate",
        header: "Start",
        cell: (s) => (
          <span className="text-sm text-muted-foreground">
            {s.startDate ? formatDate(s.startDate) : "—"}
          </span>
        ),
        className: "w-[160px]",
      },
      {
        key: "baptisms",
        header: "Baptisms",
        cell: (s) => (
          <span className="text-sm text-muted-foreground">{s.baptisms}</span>
        ),
        className: "w-[110px]",
      },
      {
        key: "decisions",
        header: "Decisions",
        cell: (s) => (
          <span className="text-sm text-muted-foreground">{s.decisions}</span>
        ),
        className: "w-[110px]",
      },
      {
        key: "actions",
        header: "",
        cell: (s) => (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                ...(onEdit
                  ? [{ label: "Edit", onSelect: () => onEdit(s) }]
                  : []),
                ...(onDelete
                  ? [
                      {
                        label: "Delete",
                        destructive: true,
                        onSelect: () => onDelete(s),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        ),
        className: "w-[150px]",
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      emptyMessage="No evangelism sites yet."
    />
  );
}
