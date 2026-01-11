"use client";

import * as React from "react";

import type { CreateWorkerInput, WorkerRole } from "@/types/worker";
import { cn } from "@/lib/utils";
import { getGroupedRoleOptions } from "@/lib/worker-roles";

import { Button, Card, Combobox, Input, Select, Textarea } from "@/components/ui";

export interface WorkerFormProps {
  initial?: Partial<CreateWorkerInput>;
  onSubmit: (input: CreateWorkerInput) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
}

export function WorkerForm({ initial, onSubmit, submitLabel = "Save worker", className }: WorkerFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const roleOptions = React.useMemo(() => {
    return getGroupedRoleOptions().flatMap((group) =>
      group.options.map((opt) => ({ value: opt.value, label: opt.label, category: group.category }))
    );
  }, []);

  const [firstName, setFirstName] = React.useState(initial?.firstName ?? "");
  const [lastName, setLastName] = React.useState(initial?.lastName ?? "");
  const [email, setEmail] = React.useState(initial?.email ?? "");
  const [phone, setPhone] = React.useState(initial?.phone ?? "");
  const [role, setRole] = React.useState<string>(String(initial?.role ?? ""));

  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [department, setDepartment] = React.useState(initial?.department ?? "");
  const [bio, setBio] = React.useState(initial?.bio ?? "");
  const [photoUrl, setPhotoUrl] = React.useState(initial?.photoUrl ?? "");

  const [isActive, setIsActive] = React.useState<string>(initial?.isActive === false ? "false" : "true");
  const [showOnWebsite, setShowOnWebsite] = React.useState<string>(initial?.showOnWebsite ? "true" : "false");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!role) throw new Error("Role is required.");

      await onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        role: role as WorkerRole,
        title: title.trim() || undefined,
        department: department.trim() || undefined,
        bio: bio.trim() || undefined,
        photoUrl: photoUrl.trim() || undefined,
        isActive: isActive === "true",
        showOnWebsite: showOnWebsite === "true",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save worker.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input label="First name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input label="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <Combobox
            label="Role"
            required
            value={role}
            onChange={setRole}
            options={roleOptions}
            placeholder="Select role"
            groupByCategory
          />

          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <Input label="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

          <Select
            label="Active?"
            value={isActive}
            onChange={setIsActive}
            options={[
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
          <Select
            label="Show on website?"
            value={showOnWebsite}
            onChange={setShowOnWebsite}
            options={[
              { value: "false", label: "Hidden" },
              { value: "true", label: "Public" },
            ]}
          />
        </div>

        <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={6} />

        {error ? <p className="text-sm text-[var(--error)]">{error}</p> : null}

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting} loadingText="Saving...">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
