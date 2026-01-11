/**
 * Evangelism Hero Component
 * =========================
 * Featured current evangelism campaign.
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  targetSouls: number;
  currentSouls: number;
}

export function EvangelismHero() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch("/api/evangelism?status=active&limit=1");
        const data = await res.json();
        if (data.data?.[0]) {
          setCampaign(data.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  if (!campaign) {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white p-8 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">
          Be Part of the Harvest
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          No active campaigns at the moment, but our mission continues. 
          Contact us to learn about upcoming evangelism opportunities.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/contact">Get Involved</Link>
        </Button>
      </div>
    );
  }

  const progress = Math.round((campaign.currentSouls / campaign.targetSouls) * 100);

  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[300px] lg:h-auto">
          {campaign.imageUrl ? (
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-6xl">
              🌾
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Active Campaign
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            {campaign.title}
          </h2>
          {campaign.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {campaign.description}
            </p>
          )}

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Souls Won</span>
              <span className="font-semibold">
                {campaign.currentSouls} / {campaign.targetSouls}
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <Button size="lg" asChild>
            <Link href={`/evangelism/${campaign.id}`}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
