"use client";

import * as React from "react";

import type { Worker } from "@/types/worker";
import { getRoleLabel } from "@/lib/worker-roles";

import { Badge } from "@/components/ui";
import {
  ActionMenu,
  DataTable,
  type DataTableColumn,
} from "@/components/command/shared";

export interface WorkersTableProps {
  rows: Worker[];
  onEdit?: (worker: Worker) => void;
  onDeactivate?: (worker: Worker) => void;
}

export function WorkersTable({
  rows,
  onEdit,
  onDeactivate,
}: WorkersTableProps) {
  const columns = React.useMemo<Array<DataTableColumn<Worker>>>(
    () => [
      {
        key: "name",
        header: "Worker",
        cell: (w) => (
          <div className="min-w-0">
            <p className="truncate font-semibold">
              {w.firstName} {w.lastName}
            </p>
            <p className="mt-0.5 truncate text-xs text-[var(--text-tertiary)]">
              {getRoleLabel(w.role)}
            </p>
          </div>
        ),
      },
      {
        key: "department",
        header: "Department",
        cell: (w) => (
          <span className="text-sm text-[var(--text-secondary)]">
            {w.department ?? "—"}
          </span>
        ),
        className: "w-[170px]",
      },
      {
        key: "status",
        header: "Status",
        cell: (w) => (
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={w.isActive ? "success-subtle" : "subtle"}
              size="sm"
              rounded="full"
            >
              {w.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge
              variant={w.showOnWebsite ? "warning-subtle" : "subtle"}
              size="sm"
              rounded="full"
            >
              {w.showOnWebsite ? "Public" : "Hidden"}
            </Badge>
          </div>
        ),
        className: "w-[220px]",
      },
      {
        key: "actions",
        header: "",
        cell: (w) => (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                ...(onEdit
                  ? [{ label: "Edit", onSelect: () => onEdit(w) }]
                  : []),
                ...(onDeactivate
                  ? [
                      {
                        label: w.isActive ? "Deactivate" : "Activate",
                        onSelect: () => onDeactivate(w),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        ),
        className: "w-[160px]",
      },
    ],
    [onDeactivate, onEdit]
  );

  return (
    <DataTable columns={columns} rows={rows} emptyMessage="No workers yet." />
  );
}
