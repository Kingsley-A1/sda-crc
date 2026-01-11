"use client";

import * as React from "react";

import type { Member } from "@/types/member";

import { Badge } from "@/components/ui";
import { ActionMenu, DataTable, type DataTableColumn } from "@/components/command/shared";

export interface MembersTableProps {
  rows: Member[];
  onEdit?: (member: Member) => void;
  onDeactivate?: (member: Member) => void;
}

export function MembersTable({ rows, onEdit, onDeactivate }: MembersTableProps) {
  const columns = React.useMemo<Array<DataTableColumn<Member>>>(
    () => [
      {
        key: "name",
        header: "Member",
        cell: (m) => (
          <div className="min-w-0">
            <p className="truncate font-semibold">{m.firstName} {m.lastName}</p>
            <p className="mt-0.5 truncate text-xs text-[var(--text-tertiary)]">{m.email}</p>
          </div>
        ),
      },
      {
        key: "phone",
        header: "Phone",
        cell: (m) => <span className="text-sm text-[var(--text-secondary)]">{m.phone}</span>,
        className: "w-[160px]",
      },
      {
        key: "membershipType",
        header: "Membership",
        cell: (m) => (
          <Badge variant="subtle" size="sm" rounded="full">
            {m.membershipType.replaceAll("_", " ")}
          </Badge>
        ),
        className: "w-[160px]",
      },
      {
        key: "isActive",
        header: "Status",
        cell: (m) => (
          <Badge variant={m.isActive ? "success-subtle" : "subtle"} size="sm" rounded="full">
            {m.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
        className: "w-[120px]",
      },
      {
        key: "actions",
        header: "",
        cell: (m) => (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                ...(onEdit ? [{ label: "Edit", onSelect: () => onEdit(m) }] : []),
                ...(onDeactivate
                  ? [{ label: m.isActive ? "Deactivate" : "Activate", onSelect: () => onDeactivate(m) }]
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

  return <DataTable columns={columns} rows={rows} emptyMessage="No members yet." />;
}
