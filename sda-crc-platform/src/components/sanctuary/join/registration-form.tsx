"use client";

import * as React from "react";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

import { WorkerCheckSection } from "./worker-check-section";
import type { WorkerRoleSelection } from "./worker-role-modal";

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  memberType?: string;
  isWorker: boolean;
  workerRole: WorkerRoleSelection | null;
}

export interface RegistrationFormProps {
  className?: string;
  onSubmitted?: () => void;
}

const MEMBER_TYPE_OPTIONS = [
  { value: "BAPTISM", label: "Baptism" },
  { value: "PROFESSION", label: "Profession of Faith" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "MISSING_MEMBER", label: "Returning Member" },
];

export function RegistrationForm({
  className,
  onSubmitted,
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );

  const [values, setValues] = React.useState<RegistrationFormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    memberType: "BAPTISM",
    isWorker: false,
    workerRole: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email || undefined,
        address: values.address || undefined,
        memberType: values.memberType,
        isWorker: values.isWorker,
        workerRole: values.workerRole?.role,
        workerRoleLabel: values.workerRole?.roleLabel,
      };

      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      onSubmitted?.();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <p className="text-lg font-extrabold text-[var(--text-primary)]">
        Join the Church Family
      </p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Fill this form and we will reach out to you.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="First name"
            value={values.firstName}
            onChange={(e) =>
              setValues((v) => ({ ...v, firstName: e.target.value }))
            }
            required
          />
          <Input
            label="Last name"
            value={values.lastName}
            onChange={(e) =>
              setValues((v) => ({ ...v, lastName: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Phone"
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
            required
          />
          <Input
            label="Email (optional)"
            type="email"
            value={values.email ?? ""}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
          />
        </div>

        <Select
          label="Membership type"
          options={MEMBER_TYPE_OPTIONS}
          value={values.memberType ?? "BAPTISM"}
          onChange={(next) => setValues((v) => ({ ...v, memberType: next }))}
        />

        <Textarea
          label="Address (optional)"
          value={values.address ?? ""}
          onChange={(e) =>
            setValues((v) => ({ ...v, address: e.target.value }))
          }
          rows={3}
        />

        <WorkerCheckSection
          value={{ isWorker: values.isWorker, role: values.workerRole }}
          onChange={(next) =>
            setValues((v) => ({
              ...v,
              isWorker: next.isWorker,
              workerRole: next.role,
            }))
          }
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="min-h-11 w-full"
        >
          Submit registration
        </Button>

        {status === "success" ? (
          <p className="text-xs text-[var(--success)]">
            Registration received. Thank you!
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-xs text-[var(--error)]">
            Sorry — something went wrong. Please try again.
          </p>
        ) : null}
      </form>
    </Card>
  );
}
