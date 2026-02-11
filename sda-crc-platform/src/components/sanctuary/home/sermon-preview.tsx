"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PlayCircle,
  MicrophoneStage,
  ArrowRight,
  Clock,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Sermon {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  date: Date | string;
  thumbnailUrl?: string | null;
  duration?: number | null;
  series?: string | null;
}

function formatDuration(minutes: number | null | undefined) {
  if (!minutes) return null;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
}

export function SermonPreview({ sermons }: { sermons: Sermon[] }) {
  if (sermons.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary-500" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Latest Messages
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Feed Your Soul
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Powerful sermons from our preachers to strengthen your faith and
              inspire your journey.
            </p>
          </div>
          <Link href="/sermons">
            <Button
              variant="outline-muted"
              size="md"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Sermons
            </Button>
          </Link>
        </div>

        {/* Sermon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sermons.slice(0, 3).map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link href="/sermons" className="group block h-full">
                <Card
                  className="h-full overflow-hidden bg-card hover:shadow-card-hover transition-all duration-300"
                  hover="lift"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-primary-50">
                    {sermon.thumbnailUrl ? (
                      <Image
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50">
                        <PlayCircle
                          size={56}
                          weight="thin"
                          className="text-primary-300"
                        />
                      </div>
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle
                          size={28}
                          weight="fill"
                          className="text-primary"
                        />
                      </div>
                    </div>

                    {/* Duration badge */}
                    {sermon.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                        <Clock size={12} />
                        {formatDuration(sermon.duration)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6">
                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-muted-foreground">
                        {new Date(sermon.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {sermon.series && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-primary-400" />
                          <Badge
                            variant="primary-subtle"
                            size="xs"
                            rounded="full"
                          >
                            {sermon.series}
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {sermon.title}
                    </h3>

                    {/* Speaker */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MicrophoneStage
                        size={16}
                        weight="duotone"
                        className="text-primary-500"
                      />
                      <span className="font-medium">{sermon.speaker}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
