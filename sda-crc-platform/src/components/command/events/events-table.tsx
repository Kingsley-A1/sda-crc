"use client";

import * as React from "react";

import type { Event } from "@/types/event";
import { formatDateTime } from "@/lib/utils";

import { Badge } from "@/components/ui";
import { ActionMenu, DataTable, type DataTableColumn } from "@/components/command/shared";

export interface EventsTableProps {
  rows: Event[];
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

export function EventsTable({ rows, onEdit, onDelete }: EventsTableProps) {
  const columns = React.useMemo<Array<DataTableColumn<Event>>>(
    () => [
      {
        key: "title",
        header: "Event",
        cell: (e) => (
          <div className="min-w-0">
            <p className="truncate font-semibold">{e.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="subtle" size="sm" rounded="full">
                {e.category}
              </Badge>
              {e.featured ? (
                <Badge variant="warning-subtle" size="sm" rounded="full">
                  Featured
                </Badge>
              ) : null}
              {e.isOnline ? (
                <Badge variant="info-subtle" size="sm" rounded="full">
                  Online
                </Badge>
              ) : null}
            </div>
          </div>
        ),
      },
      {
        key: "startDate",
        header: "Starts",
        cell: (e) => <span className="text-sm text-[var(--text-secondary)]">{formatDateTime(e.startDate)}</span>,
        className: "w-[180px]",
      },
      {
        key: "published",
        header: "Status",
        cell: (e) => (
          <Badge variant={e.published ? "success-subtle" : "subtle"} size="sm" rounded="full">
            {e.published ? "Published" : "Draft"}
          </Badge>
        ),
        className: "w-[120px]",
      },
      {
        key: "actions",
        header: "",
        cell: (e) => (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                ...(onEdit ? [{ label: "Edit", onSelect: () => onEdit(e) }] : []),
                ...(onDelete ? [{ label: "Delete", destructive: true, onSelect: () => onDelete(e) }] : []),
              ]}
            />
          </div>
        ),
        className: "w-[150px]",
      },
    ],
    [onDelete, onEdit]
  );

  return <DataTable columns={columns} rows={rows} emptyMessage="No events yet." />;
}
