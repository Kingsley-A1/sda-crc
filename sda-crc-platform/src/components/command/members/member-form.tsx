"use client";

import * as React from "react";

import type { CreateMemberInput, Gender, MembershipType } from "@/types/member";
import { cn } from "@/lib/utils";

import { Button, Card, Input, Select, Textarea } from "@/components/ui";

const GENDER_OPTIONS: Array<{ value: Gender; label: string }> = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const MEMBERSHIP_OPTIONS: Array<{ value: MembershipType; label: string }> = [
  { value: "FULL", label: "Full" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "PROFESSION_OF_FAITH", label: "Profession of Faith" },
  { value: "BAPTISM", label: "Baptism" },
];

export interface MemberFormProps {
  initial?: Partial<CreateMemberInput>;
  onSubmit: (input: CreateMemberInput) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
}

export function MemberForm({
  initial,
  onSubmit,
  submitLabel = "Save member",
  className,
}: MemberFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [firstName, setFirstName] = React.useState(initial?.firstName ?? "");
  const [lastName, setLastName] = React.useState(initial?.lastName ?? "");
  const [email, setEmail] = React.useState(initial?.email ?? "");
  const [phone, setPhone] = React.useState(initial?.phone ?? "");

  const [gender, setGender] = React.useState<string>(
    String(initial?.gender ?? ""),
  );
  const [membershipType, setMembershipType] = React.useState<string>(
    String(initial?.membershipType ?? "FULL"),
  );

  const [dateOfBirth, setDateOfBirth] = React.useState<string>(
    String(initial?.dateOfBirth ?? ""),
  );
  const [address, setAddress] = React.useState(initial?.address ?? "");
  const [city, setCity] = React.useState(initial?.city ?? "");
  const [state, setState] = React.useState(initial?.state ?? "");
  const [occupation, setOccupation] = React.useState(initial?.occupation ?? "");

  const [notes, setNotes] = React.useState(initial?.notes ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gender: gender ? (gender as Gender) : undefined,
        membershipType: membershipType as MembershipType,
        dateOfBirth: dateOfBirth.trim() || undefined,
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        occupation: occupation.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="First name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Select
            label="Gender"
            value={gender}
            onChange={setGender}
            placeholder="Select gender"
            options={GENDER_OPTIONS.map((g) => ({
              value: g.value,
              label: g.label,
            }))}
          />
          <Select
            label="Membership type"
            value={membershipType}
            onChange={setMembershipType}
            options={MEMBERSHIP_OPTIONS.map((m) => ({
              value: m.value,
              label: m.label,
            }))}
          />
          <Input
            label="Date of birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <Input
            label="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        </div>

        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
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
