"use client";

import * as React from "react";
import { Button, Input, Textarea, Select } from "@/components/ui";

const categories = [
  { value: "GENERAL", label: "General Inquiry" },
  { value: "PRAYER", label: "Prayer Request" },
  { value: "BIBLE_STUDY", label: "Bible Study Request" },
  { value: "MEMBERSHIP", label: "Membership" },
  { value: "FEEDBACK", label: "Feedback" },
  { value: "OTHER", label: "Other" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "GENERAL",
    message: "",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "GENERAL",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent border border-primary-200 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/25">
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
          Message Sent!
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+234..."
        />
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={categories}
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="What is this about?"
        required
      />

      <Textarea
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us how we can help..."
        required
        rows={5}
      />

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Sending..."
        className="w-full sm:w-auto"
      >
        Send Message
      </Button>
    </form>
  );
}
