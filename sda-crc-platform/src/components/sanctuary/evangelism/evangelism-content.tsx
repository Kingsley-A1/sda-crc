"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Cross,
  HandHeart,
  CalendarBlank,
} from "@phosphor-icons/react";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Container } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/animations";
import { SoulPledgeForm } from "./soul-pledge-form";

interface EvangelismSite {
  id: string;
  name: string;
  description: string | null;
  city: string | null;
  state: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  baptisms: number;
  decisions: number;
  actualAttendance: number | null;
  imageUrl: string | null;
  coordinator: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string | null;
  } | null;
}

interface EvangelismStats {
  totalSites: number;
  totalBaptisms: number;
  totalDecisions: number;
  totalAttendance: number;
}

interface Campaign {
  id: string;
  name: string;
  theme: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

interface EvangelismContentProps {
  sites: EvangelismSite[];
  stats: EvangelismStats;
  activeCampaign: Campaign | null;
}

const statusColors: Record<string, "success" | "warning" | "info" | "default"> =
  {
    ACTIVE: "success",
    COMPLETED: "info",
    PLANNING: "warning",
    PAUSED: "default",
  };

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "short",
    year: "numeric",
  });
}

function StatsGrid({ stats }: { stats: EvangelismStats }) {
  const items = [
    {
      label: "Outreach Sites",
      value: stats.totalSites,
      icon: MapPin,
      color: "text-primary",
    },
    {
      label: "Baptisms",
      value: stats.totalBaptisms,
      icon: Cross,
      color: "text-accent-foreground",
    },
    {
      label: "Decisions",
      value: stats.totalDecisions,
      icon: HandHeart,
      color: "text-amber-500",
    },
    {
      label: "Total Attendance",
      value: stats.totalAttendance,
      icon: Users,
      color: "text-blue-500",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
    >
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeInUp}>
          <Card variant="bordered" className="text-center p-6">
            <item.icon
              className={`h-8 w-8 mx-auto mb-2 ${item.color}`}
              weight="duotone"
            />
            <p className="text-3xl font-bold text-foreground">
              {item.value.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SiteCard({ site }: { site: EvangelismSite }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card hover="lift" className="h-full">
        {site.imageUrl && (
          <div className="aspect-video overflow-hidden rounded-t-xl">
            <img
              src={site.imageUrl}
              alt={site.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-foreground">{site.name}</h3>
            <Badge variant={statusColors[site.status] || "default"} size="sm">
              {site.status}
            </Badge>
          </div>

          {site.city && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {site.city}
                {site.state ? `, ${site.state}` : ""}
              </span>
            </div>
          )}

          {site.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {site.description}
            </p>
          )}

          <div className="grid grid-cols-3 gap-3 text-center border-t border-border pt-4">
            <div>
              <p className="text-lg font-bold text-primary">{site.baptisms}</p>
              <p className="text-xs text-muted-foreground">Baptisms</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent-foreground">
                {site.decisions}
              </p>
              <p className="text-xs text-muted-foreground">Decisions</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600">
                {site.actualAttendance || 0}
              </p>
              <p className="text-xs text-muted-foreground">Attended</p>
            </div>
          </div>

          {site.startDate && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
              <CalendarBlank className="h-3.5 w-3.5" />
              <span>
                {formatDate(site.startDate)}
                {site.endDate ? ` — ${formatDate(site.endDate)}` : " — Ongoing"}
              </span>
            </div>
          )}

          {site.coordinator && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <div className="h-6 w-6 rounded-full bg-primary-50 flex items-center justify-center text-xs font-medium text-primary">
                {site.coordinator.firstName[0]}
              </div>
              <span className="text-xs text-muted-foreground">
                {site.coordinator.firstName} {site.coordinator.lastName}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function EvangelismContent({
  sites,
  stats,
  activeCampaign,
}: EvangelismContentProps) {
  const [showPledgeForm, setShowPledgeForm] = React.useState(false);

  return (
    <section className="section-padding">
      <Container>
        {/* Stats */}
        <StatsGrid stats={stats} />

        {/* Active Campaign Banner */}
        {activeCampaign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl bg-gradient-to-r from-primary to-primary-700 p-8 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge variant="gold" className="mb-2">
                  Active Campaign
                </Badge>
                <h2 className="text-2xl font-bold">{activeCampaign.name}</h2>
                {activeCampaign.theme && (
                  <p className="text-white/80 mt-1">{activeCampaign.theme}</p>
                )}
                {activeCampaign.description && (
                  <p className="text-sm text-white/70 mt-2 max-w-lg">
                    {activeCampaign.description}
                  </p>
                )}
              </div>
              <Button
                variant="white"
                size="lg"
                onClick={() => setShowPledgeForm(!showPledgeForm)}
              >
                {showPledgeForm ? "Close Form" : "Make a Soul Pledge"}
              </Button>
            </div>

            {showPledgeForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 overflow-hidden"
              >
                <SoulPledgeForm campaignId={activeCampaign.id} />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Soul Pledge CTA (if no campaign) */}
        {!activeCampaign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-2xl border-2 border-primary bg-primary-50 p-8 text-center"
          >
            <HandHeart
              className="h-12 w-12 mx-auto mb-3 text-primary"
              weight="duotone"
            />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Pledge to Win Souls
            </h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Commit to bringing someone to Jesus. Make a personal soul pledge
              today.
            </p>
            <Button onClick={() => setShowPledgeForm(!showPledgeForm)}>
              {showPledgeForm ? "Close Form" : "Make a Pledge"}
            </Button>

            {showPledgeForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="mt-6"
              >
                <SoulPledgeForm />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Sites Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Outreach Sites
        </h2>

        {sites.length === 0 ? (
          <div className="text-center py-16">
            <MapPin
              className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-40"
              weight="duotone"
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Evangelism Sites Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Check back soon for details on upcoming outreach programs.
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
