/**
 * Campaigns Grid Component
 * ========================
 * Grid display of evangelism campaigns.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  status: string;
  targetSouls: number;
  currentSouls: number;
}

export function CampaignsGrid() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/evangelism");
        const data = await res.json();
        setCampaigns(data.data || []);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[300px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No campaigns to display at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Link
          key={campaign.id}
          href={`/evangelism/${campaign.id}`}
          className="group rounded-xl overflow-hidden border bg-white dark:bg-gray-800 hover:shadow-lg transition-all"
        >
          {/* Image */}
          <div className="relative h-48">
            {campaign.imageUrl ? (
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-4xl">
                🌾
              </div>
            )}
            <Badge
              variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
              className="absolute top-3 right-3"
            >
              {campaign.status}
            </Badge>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {campaign.title}
            </h3>
            {campaign.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {campaign.description}
              </p>
            )}
            <div className="text-sm text-gray-500">
              Target: {campaign.targetSouls} souls
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
