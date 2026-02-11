"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, DownloadSimple, MicrophoneStage } from "@phosphor-icons/react";
import { Card, CardImage, Badge } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { formatDate } from "@/lib/utils";

interface Sermon {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  date: Date | string;
  thumbnailUrl?: string | null;
  audioUrl?: string | null;
  videoUrl?: string | null;
  duration?: number | null;
  series?: string | null;
  scriptureReference?: string | null;
}

export function SermonGrid({ sermons }: { sermons: Sermon[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {sermons.map((sermon) => (
        <motion.div key={sermon.id} variants={staggerItem}>
          <Card hover="lift" className="group overflow-hidden">
            <CardImage>
              {sermon.thumbnailUrl ? (
                <Image
                  src={sermon.thumbnailUrl}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                  <MicrophoneStage size={48} className="text-white/30" />
                </div>
              )}
              {sermon.duration && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                  {Math.floor(sermon.duration / 60)}:
                  {String(sermon.duration % 60).padStart(2, "0")}
                </span>
              )}
            </CardImage>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {sermon.series && (
                  <Badge variant="secondary" size="xs">
                    {sermon.series}
                  </Badge>
                )}
                {sermon.scriptureReference && (
                  <Badge variant="muted" size="xs">
                    {sermon.scriptureReference}
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                {sermon.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {sermon.speaker}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {formatDate(new Date(sermon.date))}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-700 transition-colors"
                  >
                    <Play size={14} weight="fill" />
                    Watch
                  </a>
                )}
                {sermon.audioUrl && (
                  <a
                    href={sermon.audioUrl}
                    download
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-700 transition-colors"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    Download Audio
                  </a>
                )}
                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    download
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors ml-auto"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    Video
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
