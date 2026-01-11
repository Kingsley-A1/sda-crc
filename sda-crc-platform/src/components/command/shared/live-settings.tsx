/**
 * Live Stream Settings Component
 * ==============================
 * Configure live streaming settings.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function LiveSettings() {
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [facebookPage, setFacebookPage] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/api/settings/live", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeChannel,
          facebookPage,
          streamKey,
        }),
      });
    } catch (error) {
      console.error("Failed to save live settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-6">Live Stream Settings</h3>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">YouTube Channel ID</label>
          <Input
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
            placeholder="UCxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Your YouTube channel ID for live streaming.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Facebook Page ID</label>
          <Input
            value={facebookPage}
            onChange={(e) => setFacebookPage(e.target.value)}
            placeholder="sdacrc"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Your Facebook page username or ID.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stream Key (Optional)</label>
          <Input
            type="password"
            value={streamKey}
            onChange={(e) => setStreamKey(e.target.value)}
            placeholder="••••••••••••••••"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Custom stream key for RTMP integration.
          </p>
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
