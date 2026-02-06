/**
 * General Settings Component
 * ==========================
 * General platform settings.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function GeneralSettings() {
  const [siteName, setSiteName] = useState("SDA Cross River Conference");
  const [siteDescription, setSiteDescription] = useState(
    "Welcome to the Seventh-day Adventist Cross River Conference Digital Sanctuary."
  );
  const [contactEmail, setContactEmail] = useState("info@sdacrc.org");
  const [contactPhone, setContactPhone] = useState("+234 801 234 5678");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          siteDescription,
          contactEmail,
          contactPhone,
        }),
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-6">General Settings</h3>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Site Name</label>
          <Input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Site Description
          </label>
          <Textarea
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Email
          </label>
          <Input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Phone
          </label>
          <Input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
