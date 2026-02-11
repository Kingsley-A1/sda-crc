"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Envelope,
  Phone,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Card, Badge } from "@/components/ui";
import { Container } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/animations";
import { WORKER_ROLE_LABELS } from "@/lib/worker-roles";

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface WorkerData {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  title: string | null;
  department: string | null;
  bio: string | null;
  photoUrl: string | null;
  displayOrder: number | null;
  socialLinks: SocialLinks | null;
}

interface WorkersGridProps {
  workers: WorkerData[];
}

// Conference leadership roles that get featured (full-width) cards
const LEADERSHIP_ROLES = ["PRESIDENT", "EXECUTIVE_SECRETARY", "TREASURER"];
const PASTORAL_ROLES = ["SENIOR_PASTOR", "ASSOCIATE_PASTOR", "DISTRICT_PASTOR"];

function getRoleLabel(role: string): string {
  return (
    (WORKER_ROLE_LABELS as Record<string, string>)[role] ||
    role.replace(/_/g, " ")
  );
}

function isLeadershipRole(role: string): boolean {
  return LEADERSHIP_ROLES.includes(role);
}

function isPastoralRole(role: string): boolean {
  return PASTORAL_ROLES.includes(role);
}

function WorkerCard({
  worker,
  featured = false,
}: {
  worker: WorkerData;
  featured?: boolean;
}) {
  const roleLabel = worker.title || getRoleLabel(worker.role);
  const social = worker.socialLinks;

  return (
    <motion.div
      variants={fadeInUp}
      className={featured ? "col-span-full sm:col-span-1" : ""}
    >
      <Card
        hover="lift"
        className={`h-full overflow-hidden ${featured ? "border-2 border-amber-300" : ""}`}
      >
        {/* Photo */}
        <div
          className={`relative ${featured ? "aspect-[3/4]" : "aspect-square"} bg-muted overflow-hidden`}
        >
          {worker.photoUrl ? (
            <Image
              src={worker.photoUrl}
              alt={`${worker.firstName} ${worker.lastName}`}
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 640px) 100vw, 33vw"
                  : "(max-width: 640px) 50vw, 25vw"
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-700">
              <span className="text-4xl font-bold text-white">
                {worker.firstName[0]}
                {worker.lastName[0]}
              </span>
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-4 text-center">
          <h3
            className={`font-bold text-foreground ${featured ? "text-lg" : "text-base"}`}
          >
            {worker.firstName} {worker.lastName}
          </h3>

          {/* Gold badge for role */}
          <div className="mt-2">
            <Badge variant="gold" size="sm">
              {roleLabel}
            </Badge>
          </div>

          {worker.department && (
            <p className="text-xs text-muted-foreground mt-2">
              {worker.department}
            </p>
          )}

          {worker.bio && featured && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
              {worker.bio}
            </p>
          )}

          {/* Social links */}
          {social && (
            <div className="flex items-center justify-center gap-3 mt-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <FacebookLogo className="h-4 w-4" weight="fill" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <InstagramLogo className="h-4 w-4" weight="fill" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <LinkedinLogo className="h-4 w-4" weight="fill" />
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function WorkersGrid({ workers }: WorkersGridProps) {
  // Separate into leadership, pastoral, and other workers
  const leadership = workers.filter((w) => isLeadershipRole(w.role));
  const pastoral = workers.filter((w) => isPastoralRole(w.role));
  const others = workers.filter(
    (w) => !isLeadershipRole(w.role) && !isPastoralRole(w.role),
  );

  if (workers.length === 0) {
    return (
      <section className="section-padding">
        <Container>
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">👥</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Workers Coming Soon
            </h2>
            <p className="text-sm text-muted-foreground">
              Our workers directory is being updated. Check back soon!
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <Container>
        {/* Conference Leadership — Featured cards */}
        {leadership.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-1 text-center">
              Conference Leadership
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Those who lead our conference with dedication and faith
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {leadership.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} featured />
              ))}
            </motion.div>
          </div>
        )}

        {/* Pastoral Staff */}
        {pastoral.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-1 text-center">
              Pastoral Ministry
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Shepherds tending to the flock of God
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {pastoral.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </motion.div>
          </div>
        )}

        {/* All Other Workers */}
        {others.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1 text-center">
              Church Workers
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Faithful servants building up the body of Christ
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {others.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
