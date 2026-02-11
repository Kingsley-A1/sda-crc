"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Users,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  startDate: Date | string;
  location?: string | null;
  imageUrl?: string | null;
  category: string;
  isFeatured?: boolean;
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function EventsPreview({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  const otherEvents = events
    .filter((e) => e.id !== featuredEvent.id)
    .slice(0, 2);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Upcoming Events
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Connect with fellow members and grow together through our events
              and fellowship gatherings.
            </p>
          </div>
          <Link href="/events">
            <Button
              variant="outline-muted"
              size="md"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Events
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured Event - Large Card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/events" className="group block h-full">
              <Card
                className="h-full overflow-hidden bg-card hover:shadow-card-hover transition-all duration-300 relative"
                hover="lift"
              >
                {/* Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  {featuredEvent.imageUrl ? (
                    <Image
                      src={featuredEvent.imageUrl}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                      <Calendar
                        size={64}
                        weight="thin"
                        className="text-primary-300"
                      />
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[60px]">
                    <span className="block text-2xl font-bold text-foreground leading-none">
                      {new Date(featuredEvent.startDate).getDate()}
                    </span>
                    <span className="block text-xs font-semibold text-primary-600 uppercase mt-1">
                      {new Date(featuredEvent.startDate).toLocaleDateString(
                        "en-US",
                        { month: "short" },
                      )}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {featuredEvent.isFeatured && (
                    <Badge
                      variant="default"
                      size="sm"
                      rounded="full"
                      className="absolute top-4 right-4"
                    >
                      Featured
                    </Badge>
                  )}

                  {/* Bottom overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <Badge
                      variant="muted"
                      size="xs"
                      rounded="default"
                      className="mb-3"
                    >
                      {featuredEvent.category}
                    </Badge>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-primary-200 transition-colors">
                      {featuredEvent.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{formatTime(featuredEvent.startDate)}</span>
                      </div>
                      {featuredEvent.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{featuredEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Other Events - Stacked Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {otherEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              >
                <Link href="/events" className="group block">
                  <Card
                    className="overflow-hidden bg-card hover:shadow-card-hover transition-all duration-300"
                    hover="lift"
                  >
                    <div className="flex">
                      {/* Date Column */}
                      <div className="flex-shrink-0 w-20 bg-primary-50 flex flex-col items-center justify-center p-4 border-r border-primary-100">
                        <span className="text-2xl font-bold text-primary-700 leading-none">
                          {new Date(event.startDate).getDate()}
                        </span>
                        <span className="text-xs font-semibold text-primary-600 uppercase mt-1">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-US",
                            { month: "short" },
                          )}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4">
                        <Badge
                          variant="primary-subtle"
                          size="xs"
                          className="mb-2"
                        >
                          {event.category}
                        </Badge>
                        <h3 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{formatTime(event.startDate)}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={12} />
                              <span className="line-clamp-1">
                                {event.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {/* View More Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link href="/events" className="group block">
                <Card className="bg-primary-50 border-primary-200 border-dashed hover:bg-primary-100 transition-colors">
                  <div className="flex items-center justify-center gap-3 p-6 text-primary-700">
                    <Users size={20} weight="duotone" />
                    <span className="font-semibold">View All Events</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
