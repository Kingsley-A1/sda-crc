"use client";

import * as React from "react";

import type { Sermon } from "@/types/sermon";
import { formatDateTime } from "@/lib/utils";

import { Badge } from "@/components/ui";
import {
  ActionMenu,
  DataTable,
  type DataTableColumn,
} from "@/components/command/shared";

export interface SermonsTableProps {
  rows: Sermon[];
  onEdit?: (sermon: Sermon) => void;
  onDelete?: (sermon: Sermon) => void;
}

export function SermonsTable({ rows, onEdit, onDelete }: SermonsTableProps) {
  const columns = React.useMemo<Array<DataTableColumn<Sermon>>>(
    () => [
      {
        key: "title",
        header: "Title",
        cell: (s) => (
          <div className="min-w-0">
            <p className="truncate font-semibold">{s.title}</p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground/60">
              {s.speaker}
            </p>
          </div>
        ),
      },
      {
        key: "date",
        header: "Date",
        cell: (s) => (
          <span className="text-sm text-muted-foreground">
            {formatDateTime(s.date)}
          </span>
        ),
        className: "w-[170px]",
      },
      {
        key: "published",
        header: "Status",
        cell: (s) => (
          <Badge
            variant={s.published ? "success-subtle" : "subtle"}
            size="sm"
            rounded="full"
          >
            {s.published ? "Published" : "Draft"}
          </Badge>
        ),
        className: "w-[120px]",
      },
      {
        key: "viewCount",
        header: "Views",
        cell: (s) => (
          <span className="text-sm text-muted-foreground">{s.viewCount}</span>
        ),
        className: "w-[90px]",
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
    <DataTable columns={columns} rows={rows} emptyMessage="No sermons yet." />
  );
}
