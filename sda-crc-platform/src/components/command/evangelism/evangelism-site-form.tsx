"use client";

import * as React from "react";

import type {
  CreateEvangelismSiteInput,
  EvangelismStatus,
} from "@/types/evangelism";
import { cn } from "@/lib/utils";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";

const STATUS_OPTIONS: Array<{ value: EvangelismStatus; label: string }> = [
  { value: "PLANNING", label: "Planning" },
  { value: "ACTIVE", label: "Active" },
  { value: "PAUSED", label: "Paused" },
  { value: "COMPLETED", label: "Completed" },
];

export interface EvangelismSiteFormProps {
  initial?: Partial<CreateEvangelismSiteInput>;
  onSubmit: (input: CreateEvangelismSiteInput) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
}

export function EvangelismSiteForm({
  initial,
  onSubmit,
  submitLabel = "Save site",
  className,
}: EvangelismSiteFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [name, setName] = React.useState(initial?.name ?? "");
  const [status, setStatus] = React.useState<string>(
    String(initial?.status ?? "PLANNING"),
  );
  const [city, setCity] = React.useState(initial?.city ?? "");
  const [state, setState] = React.useState(initial?.state ?? "");
  const [address, setAddress] = React.useState(initial?.address ?? "");

  const [startDate, setStartDate] = React.useState<string>(
    String(initial?.startDate ?? ""),
  );
  const [endDate, setEndDate] = React.useState<string>(
    String(initial?.endDate ?? ""),
  );

  const [targetAttendance, setTargetAttendance] = React.useState<string>(
    typeof initial?.targetAttendance === "number"
      ? String(initial.targetAttendance)
      : "",
  );
  const [actualAttendance, setActualAttendance] = React.useState<string>(
    typeof initial?.actualAttendance === "number"
      ? String(initial.actualAttendance)
      : "",
  );
  const [baptisms, setBaptisms] = React.useState<string>(
    typeof initial?.baptisms === "number" ? String(initial.baptisms) : "",
  );
  const [decisions, setDecisions] = React.useState<string>(
    typeof initial?.decisions === "number" ? String(initial.decisions) : "",
  );

  const [imageUrl, setImageUrl] = React.useState(initial?.imageUrl ?? "");
  const [description, setDescription] = React.useState(
    initial?.description ?? "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        status: status as EvangelismStatus,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        address: address.trim() || undefined,
        startDate: startDate.trim() || undefined,
        endDate: endDate.trim() || undefined,
        targetAttendance: targetAttendance.trim()
          ? Number(targetAttendance)
          : undefined,
        actualAttendance: actualAttendance.trim()
          ? Number(actualAttendance)
          : undefined,
        baptisms: baptisms.trim() ? Number(baptisms) : undefined,
        decisions: decisions.trim() ? Number(decisions) : undefined,
        imageUrl: imageUrl.trim() || undefined,
        description: description.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save site.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Site name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS.map((s) => ({
              value: s.value,
              label: s.label,
            }))}
          />
          <Input
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Input
            label="Address"
            className="sm:col-span-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            label="Start date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Input
            label="Target"
            type="number"
            min={0}
            value={targetAttendance}
            onChange={(e) => setTargetAttendance(e.target.value)}
          />
          <Input
            label="Actual"
            type="number"
            min={0}
            value={actualAttendance}
            onChange={(e) => setActualAttendance(e.target.value)}
          />
          <Input
            label="Baptisms"
            type="number"
            min={0}
            value={baptisms}
            onChange={(e) => setBaptisms(e.target.value)}
          />
          <Input
            label="Decisions"
            type="number"
            min={0}
            value={decisions}
            onChange={(e) => setDecisions(e.target.value)}
          />
        </div>

        <Input
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
