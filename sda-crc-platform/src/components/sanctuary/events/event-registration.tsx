/**
 * Event Registration Component
 * ============================
 * Registration form for events.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Event {
  id: string;
  title: string;
  registrationRequired?: boolean;
  registrationUrl?: string | null;
  maxAttendees?: number | null;
}

interface EventRegistrationProps {
  event: Event;
}

export function EventRegistration({ event }: EventRegistrationProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit registration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-6 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="font-semibold text-lg mb-2">Registered!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          You&apos;re registered for {event.title}. Check your email for
          details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
      <h3 className="font-semibold text-lg mb-4">Register for this Event</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234..."
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register Now"}
        </Button>
      </form>
    </div>
  );
}
