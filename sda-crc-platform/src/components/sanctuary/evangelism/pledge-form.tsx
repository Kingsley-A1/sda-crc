"use client";

import * as React from "react";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface PledgeFormValues {
  name: string;
  phone: string;
  email?: string;
  pledgeType: string;
  soulTarget?: number;
  message?: string;
}

export interface PledgeFormProps {
  className?: string;
  onSubmitted?: () => void;
}

const PLEDGE_TYPE_OPTIONS = [
  { value: "I_WILL_GO", label: "I Will Go" },
  { value: "BIBLE_STUDY", label: "Bible Study" },
  { value: "PRAYER", label: "Prayer" },
  { value: "VOLUNTEER", label: "Volunteer" },
];

export function PledgeForm({ className, onSubmitted }: PledgeFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );

  const [values, setValues] = React.useState<PledgeFormValues>({
    name: "",
    phone: "",
    email: "",
    pledgeType: "I_WILL_GO",
    soulTarget: 1,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      <p className="text-sm font-bold text-[var(--text-primary)]">
        Make a pledge
      </p>
      <p className="mt-1 text-xs text-[var(--text-secondary)]">
        Commit to the mission — we will follow up to support you.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Full name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            required
          />
          <Input
            label="Phone"
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
            required
          />
        </div>

        <Input
          label="Email (optional)"
          type="email"
          value={values.email ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />

        <Select
          label="Pledge type"
          options={PLEDGE_TYPE_OPTIONS}
          value={values.pledgeType}
          onChange={(next) => setValues((v) => ({ ...v, pledgeType: next }))}
        />

        <Input
          label="Soul target"
          type="number"
          inputMode="numeric"
          value={String(values.soulTarget ?? 1)}
          onChange={(e) =>
            setValues((v) => ({ ...v, soulTarget: Number(e.target.value) }))
          }
        />

        <Textarea
          label="Message (optional)"
          value={values.message ?? ""}
          onChange={(e) =>
            setValues((v) => ({ ...v, message: e.target.value }))
          }
          rows={4}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="min-h-11 w-full"
        >
          Submit pledge
        </Button>

        {status === "success" ? (
          <p className="text-xs text-[var(--success)]">
            Thank you! Your pledge was received.
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
