/**
 * Notification Settings Component
 * ================================
 * Configure email and push notifications.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "new-members",
      label: "New Member Registrations",
      description: "Get notified when someone registers on the platform.",
      enabled: true,
    },
    {
      id: "evangelism-pledges",
      label: "Evangelism Pledges",
      description: "Get notified when someone makes an evangelism pledge.",
      enabled: true,
    },
    {
      id: "event-registrations",
      label: "Event Registrations",
      description: "Get notified when someone registers for an event.",
      enabled: false,
    },
    {
      id: "contact-messages",
      label: "Contact Form Messages",
      description: "Get notified when someone submits a contact form.",
      enabled: true,
    },
    {
      id: "weekly-digest",
      label: "Weekly Digest",
      description: "Receive a weekly summary of platform activity.",
      enabled: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
    } catch (error) {
      console.error("Failed to save notification settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-6">Notification Settings</h3>
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between py-3 border-b last:border-0"
          >
            <div>
              <p className="font-medium">{setting.label}</p>
              <p className="text-sm text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={setting.enabled}
              onClick={() => toggleSetting(setting.id)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                setting.enabled ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition ${
                  setting.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
