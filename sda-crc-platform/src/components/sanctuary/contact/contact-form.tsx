"use client";

import * as React from "react";

import { Button, Card, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  className?: string;
  onSubmitted?: () => void;
}

export function ContactForm({ className, onSubmitted }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const [values, setValues] = React.useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
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
      <p className="text-lg font-extrabold text-[var(--text-primary)]">Contact Us</p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Send a message — we’ll respond as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            label="Name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            required
          />
          <Input
            label="Email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            required
          />
        </div>

        <Input
          label="Phone (optional)"
          value={values.phone ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        />

        <Input
          label="Subject"
          value={values.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
          required
        />

        <Textarea
          label="Message"
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          rows={5}
          required
        />

        <Button type="submit" isLoading={isSubmitting} className="min-h-11 w-full">
          Send message
        </Button>

        {status === "success" ? (
          <p className="text-xs text-[var(--success)]">Message sent. Thank you!</p>
        ) : null}
        {status === "error" ? (
          <p className="text-xs text-[var(--error)]">Sorry — something went wrong. Please try again.</p>
        ) : null}
      </form>
    </Card>
  );
}
