"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDots, MapPin } from "@phosphor-icons/react";
import { Card, Badge, Tabs } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { formatDate } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  location?: string | null;
  imageUrl?: string | null;
  category: string;
  isOnline?: boolean;
}

function EventCard({ event }: { event: Event }) {
  const date = new Date(event.startDate);

  return (
    <Card hover="lift" className="overflow-hidden group">
      <div className="flex flex-col sm:flex-row">
        {/* Date badge */}
        <div className="flex sm:flex-col items-center justify-center p-4 sm:p-6 bg-primary-50 sm:min-w-[100px]">
          <span className="text-xs font-semibold uppercase text-primary">
            {date.toLocaleDateString("en-NG", { month: "short" })}
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-primary mx-2 sm:mx-0">
            {date.getDate()}
          </span>
          <span className="text-xs text-muted-foreground sm:mt-0.5">
            {date.toLocaleDateString("en-NG", { weekday: "short" })}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" size="xs">
              {event.category}
            </Badge>
            {event.isOnline && (
              <Badge variant="info" size="xs">
                Online
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
          {event.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {event.description}
            </p>
          )}
          {event.location && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground/70">
              <MapPin size={12} />
              {event.location}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function EventsList({
  upcoming,
  past,
}: {
  upcoming: Event[];
  past: Event[];
}) {
  const [activeTab, setActiveTab] = React.useState("upcoming");

  const tabs = [
    { label: `Upcoming (${upcoming.length})`, value: "upcoming" },
    { label: `Past (${past.length})`, value: "past" },
  ];

  const events = activeTab === "upcoming" ? upcoming : past;

  return (
    <div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-8 max-w-sm mx-auto"
      />

      {events.length > 0 ? (
        <motion.div
          key={activeTab}
          className="space-y-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={staggerItem}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary-50 mb-4">
            <CalendarDots size={40} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {activeTab === "upcoming" ? "No Upcoming Events" : "No Past Events"}
          </h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {activeTab === "upcoming"
              ? "New events will be posted here. Stay tuned!"
              : "Past events will appear here once events are added."}
          </p>
        </div>
      )}
    </div>
  );
}
