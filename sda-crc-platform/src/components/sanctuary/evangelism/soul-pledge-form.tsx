"use client";

import * as React from "react";
import { Button, Input } from "@/components/ui";

interface SoulPledgeFormProps {
  campaignId?: string;
}

export function SoulPledgeForm({ campaignId }: SoulPledgeFormProps) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    pledgedSouls: 1,
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pledgedSouls" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/soul-pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          campaignId: campaignId || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit pledge");
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
      <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">Pledge Received!</h3>
        <p className="text-sm text-white/80">
          Thank you for committing to win {form.pledgedSouls} soul{form.pledgedSouls > 1 ? "s" : ""} for Christ.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white/10 backdrop-blur-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Your Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Email (optional)</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Phone (optional)</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            placeholder="+234..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Souls to Pledge *</label>
          <input
            name="pledgedSouls"
            type="number"
            min={1}
            value={form.pledgedSouls}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-200 bg-red-500/20 rounded-lg p-2 mb-4">{error}</p>
      )}

      <Button type="submit" variant="white" isLoading={isSubmitting} loadingText="Submitting...">
        Submit My Pledge
      </Button>
    </form>
  );
}
