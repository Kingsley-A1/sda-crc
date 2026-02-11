"use client";

import * as React from "react";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { NIGERIAN_STATES } from "@/lib/constants";

const membershipTypes = [
  { value: "FULL", label: "Full Member" },
  { value: "TRANSFER", label: "Transfer" },
  { value: "PROFESSION_OF_FAITH", label: "Profession of Faith" },
  { value: "BAPTISM", label: "Baptism" },
];

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const stateOptions = NIGERIAN_STATES.map((s) => ({ value: s, label: s }));

interface JoinFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  occupation: string;
  membershipType: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  notes: string;
}

export function JoinForm() {
  const [form, setForm] = React.useState<JoinFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "Cross River",
    occupation: "",
    membershipType: "FULL",
    emergencyContactName: "",
    emergencyContactPhone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        membershipType: form.membershipType,
      };

      // Only add optional fields if filled
      if (form.dateOfBirth)
        payload.dateOfBirth = new Date(form.dateOfBirth).toISOString();
      if (form.gender) payload.gender = form.gender;
      if (form.address) payload.address = form.address;
      if (form.city) payload.city = form.city;
      if (form.state) payload.state = form.state;
      if (form.occupation) payload.occupation = form.occupation;
      if (form.emergencyContactName)
        payload.emergencyContactName = form.emergencyContactName;
      if (form.emergencyContactPhone)
        payload.emergencyContactPhone = form.emergencyContactPhone;
      if (form.notes) payload.notes = form.notes;

      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-primary-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Registration Successful!
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Welcome to the SDA Cross River Conference family! We are so glad to
          have you. Someone from our team will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Personal Information */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Personal Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name *"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
          />
          <Input
            label="Last Name *"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
          <Input
            label="Phone *"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+234..."
            required
          />
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={genderOptions}
            placeholder="Select gender"
          />
        </div>
      </fieldset>

      {/* Address */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Address
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Street Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House No., Street"
            />
          </div>
          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Calabar"
          />
          <Select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            options={stateOptions}
          />
        </div>
      </fieldset>

      {/* Church Info */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Church Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Membership Type"
            name="membershipType"
            value={form.membershipType}
            onChange={handleChange}
            options={membershipTypes}
          />
          <Input
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Your occupation"
          />
        </div>
      </fieldset>

      {/* Emergency Contact */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Emergency Contact
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Contact Name"
            name="emergencyContactName"
            value={form.emergencyContactName}
            onChange={handleChange}
            placeholder="Emergency contact name"
          />
          <Input
            label="Contact Phone"
            name="emergencyContactPhone"
            type="tel"
            value={form.emergencyContactPhone}
            onChange={handleChange}
            placeholder="+234..."
          />
        </div>
      </fieldset>

      {/* Notes */}
      <Textarea
        label="Additional Notes"
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Any additional information you'd like to share..."
        rows={3}
      />

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        isLoading={isSubmitting}
        loadingText="Registering..."
      >
        Complete Registration
      </Button>
    </form>
  );
}
