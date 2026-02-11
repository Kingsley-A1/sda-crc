"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MonitorPlay,
  CalendarBlank,
  MapPin,
  Clock,
  Bell,
} from "@phosphor-icons/react";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Container } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/animations";
import { SERVICE_TIMES } from "@/lib/constants";

interface UpcomingEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  category: string;
}

interface LiveContentProps {
  liveStreamUrl: string | null;
  upcomingEvents: UpcomingEvent[];
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function LiveContent({
  liveStreamUrl,
  upcomingEvents,
}: LiveContentProps) {
  return (
    <section className="section-padding">
      <Container>
        {/* Live Stream Player or Empty State */}
        {liveStreamUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="live" dot pulse>
                LIVE NOW
              </Badge>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={liveStreamUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Live Stream"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center py-16 rounded-2xl bg-muted"
          >
            <MonitorPlay
              className="h-20 w-20 mx-auto mb-4 text-muted-foreground opacity-30"
              weight="duotone"
            />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Live Stream Right Now
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We&apos;re not streaming at the moment. Check our schedule below
              for upcoming services and events.
            </p>
            <Button variant="outline" leftIcon={<Bell className="h-4 w-4" />}>
              Get Notified
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" weight="duotone" />
              Regular Service Times
            </h2>
            <div className="space-y-3">
              {SERVICE_TIMES.map((service) => (
                <Card key={service.name} variant="bordered" className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.day}
                      </p>
                    </div>
                    <Badge variant="success" size="sm">
                      {service.time}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CalendarBlank
                className="h-5 w-5 text-primary"
                weight="duotone"
              />
              Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <Card variant="bordered" className="p-8 text-center">
                <CalendarBlank
                  className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-40"
                  weight="duotone"
                />
                <p className="text-sm text-muted-foreground">
                  No upcoming events scheduled. Check back soon!
                </p>
              </Card>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {upcomingEvents.map((event) => (
                  <motion.div key={event.id} variants={fadeInUp}>
                    <Card variant="bordered" className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary-50 flex flex-col items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {new Date(event.startDate).toLocaleDateString(
                              "en-NG",
                              { month: "short" },
                            )}
                          </span>
                          <span className="text-lg font-bold text-primary leading-none">
                            {new Date(event.startDate).getDate()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm truncate">
                            {event.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatEventDate(event.startDate)}
                          </p>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground truncate">
                                {event.location}
                              </span>
                            </div>
                          )}
                        </div>
                        <Badge size="sm" variant="default">
                          {event.category}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
