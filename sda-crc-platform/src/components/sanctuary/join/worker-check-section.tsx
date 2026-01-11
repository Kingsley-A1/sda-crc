"use client";

import * as React from "react";
import { UsersThree } from "@phosphor-icons/react";

import { Button, Card, GoldBadge } from "@/components/ui";
import { cn } from "@/lib/utils";

import { WorkerRoleModal, type WorkerRoleSelection } from "./worker-role-modal";

export interface WorkerCheckSectionProps {
  value: {
    isWorker: boolean;
    role: WorkerRoleSelection | null;
  };
  onChange: (next: { isWorker: boolean; role: WorkerRoleSelection | null }) => void;
  className?: string;
}

export function WorkerCheckSection({ value, onChange, className }: WorkerCheckSectionProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSetWorker = (next: boolean) => {
    if (!next) {
      onChange({ isWorker: false, role: null });
      return;
    }

    onChange({ isWorker: true, role: value.role });
    setIsModalOpen(true);
  };

  return (
    <Card
      className={cn(
        "border-2 border-[var(--secondary)] bg-amber-50/60 p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl bg-[var(--secondary)]/15 p-2">
          <UsersThree className="h-5 w-5 text-[var(--secondary)]" weight="bold" />
        </div>
        <div className="flex-1">
          <p className="text-base font-extrabold text-[var(--text-primary)]">Are you a Church Worker?</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            If you hold any office or role in the church, we would like to honour you on our Workers page.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          className="min-h-11 flex-1"
          variant={value.isWorker ? "primary" : "outline"}
          onClick={() => handleSetWorker(true)}
        >
          Yes, I am a worker
        </Button>
        <Button
          type="button"
          className="min-h-11 flex-1"
          variant={!value.isWorker ? "primary" : "outline"}
          onClick={() => handleSetWorker(false)}
        >
          No, not currently
        </Button>
      </div>

      {value.isWorker ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--secondary)]/30 bg-white p-3">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">Selected role</p>
            {value.role ? (
              <div className="mt-1">
                <GoldBadge>{value.role.roleLabel}</GoldBadge>
              </div>
            ) : (
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Not selected</p>
            )}
          </div>
          <Button type="button" variant="ghost" size="sm" className="min-h-11" onClick={() => setIsModalOpen(true)}>
            {value.role ? "Change" : "Select"}
          </Button>
        </div>
      ) : null}

      <WorkerRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        value={value.role}
        onSelect={(role) => onChange({ isWorker: true, role })}
      />
    </Card>
  );
}
