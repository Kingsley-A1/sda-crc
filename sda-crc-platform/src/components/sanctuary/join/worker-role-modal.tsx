"use client";

import * as React from "react";

import { Combobox, Input, Modal, ModalBody, ModalFooter, ModalHeader, Button, GoldBadge } from "@/components/ui";
import { getGroupedRoleOptions, getRoleLabel } from "@/lib/worker-roles";
import type { WorkerRole } from "@/lib/validators";

export interface WorkerRoleSelection {
  role: WorkerRole | "CUSTOM";
  roleLabel: string;
}

export interface WorkerRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  value?: WorkerRoleSelection | null;
  onSelect: (selection: WorkerRoleSelection) => void;
}

export function WorkerRoleModal({ isOpen, onClose, value, onSelect }: WorkerRoleModalProps) {
  const grouped = React.useMemo(() => getGroupedRoleOptions(), []);
  const options = React.useMemo(
    () =>
      grouped.flatMap((g) =>
        g.options.map((o) => ({ value: o.value, label: o.label, category: g.category }))
      ),
    [grouped]
  );

  const [role, setRole] = React.useState<string>(value?.role === "CUSTOM" ? "" : (value?.role ?? ""));
  const [customRole, setCustomRole] = React.useState<string>(value?.role === "CUSTOM" ? value.roleLabel : "");

  React.useEffect(() => {
    if (!isOpen) return;
    setRole(value?.role === "CUSTOM" ? "" : (value?.role ?? ""));
    setCustomRole(value?.role === "CUSTOM" ? value.roleLabel : "");
  }, [isOpen, value]);

  const previewLabel = React.useMemo(() => {
    if (customRole.trim()) return customRole.trim();
    if (role) return getRoleLabel(role as WorkerRole);
    return "";
  }, [customRole, role]);

  const canConfirm = !!previewLabel;

  const handleConfirm = () => {
    if (!canConfirm) return;

    if (customRole.trim()) {
      onSelect({ role: "CUSTOM", roleLabel: customRole.trim() });
      onClose();
      return;
    }

    onSelect({ role: role as WorkerRole, roleLabel: getRoleLabel(role as WorkerRole) });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select your worker role"
      description="We want to honour you on our Workers page."
      size="lg"
    >
      <ModalHeader>
        <p className="text-base font-bold text-[var(--text-primary)]">Choose your role</p>
      </ModalHeader>

      <ModalBody>
        <Combobox
          label="Role"
          options={options}
          value={role}
          onChange={(next) => setRole(next)}
          placeholder="Search roles…"
          groupByCategory
        />

        <div className="mt-4">
          <Input
            label="Can't find your role? (optional)"
            placeholder="Type your role title…"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
          />
        </div>

        {previewLabel ? (
          <div className="mt-4">
            <p className="text-xs text-[var(--text-secondary)]">Preview</p>
            <div className="mt-2">
              <GoldBadge>{previewLabel}</GoldBadge>
            </div>
          </div>
        ) : null}
      </ModalBody>

      <ModalFooter>
        <div className="flex w-full gap-2">
          <Button type="button" variant="outline" className="min-h-11 flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" className="min-h-11 flex-1" disabled={!canConfirm} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
