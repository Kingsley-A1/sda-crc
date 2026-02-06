/**
 * Pledge Section Component
 * ========================
 * Form for soul pledges.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PledgeSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pledgeType, setPledgeType] = useState("prayer");
  const [souls, setSouls] = useState("1");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/soul-pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          pledgedSouls: parseInt(souls),
          notes,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Pledge failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center">
        <div className="text-6xl mb-4">🙏</div>
        <h3 className="text-2xl font-serif font-bold mb-2">
          Thank You for Your Pledge!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your commitment to the harvest is a blessing. We&apos;ll be in touch
          soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white dark:bg-gray-800 p-6 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full name"
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Type of Pledge
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "prayer", label: "🙏 Prayer", desc: "Pray for souls" },
              {
                value: "witness",
                label: "📢 Witness",
                desc: "Share the gospel",
              },
              { value: "bring", label: "🚶 Bring", desc: "Bring someone" },
              {
                value: "support",
                label: "💰 Support",
                desc: "Financial support",
              },
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setPledgeType(type.value)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  pledgeType === type.value
                    ? "border-primary bg-primary/10 ring-2 ring-primary"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="text-2xl mb-1">{type.label.split(" ")[0]}</div>
                <div className="text-sm font-medium">
                  {type.label.split(" ")[1]}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Souls
          </label>
          <Input
            type="number"
            min="1"
            value={souls}
            onChange={(e) => setSouls(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Additional Notes (Optional)
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific prayer requests or plans..."
            rows={3}
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Make My Pledge"}
        </Button>
      </form>
    </div>
  );
}
