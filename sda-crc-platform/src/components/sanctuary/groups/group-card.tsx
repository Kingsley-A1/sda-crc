"use client";

import Link from "next/link";
import { MapPin, Phone, UsersThree } from "@phosphor-icons/react";

import { Badge, Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SmallGroupWithLeader } from "@/types";

export interface GroupCardProps {
  group: SmallGroupWithLeader;
  className?: string;
}

export function GroupCard({ group, className }: GroupCardProps) {
  const spotsRemaining =
    typeof group.spotsRemaining === "number"
      ? group.spotsRemaining
      : group.maxMembers - group.currentMembers;

  const directionsUrl = `https://www.google.com/maps?q=${group.latitude},${group.longitude}`;

  return (
    <Card className={cn("p-4", className)} interactive hover="lift">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">
            {group.name}
          </p>
          {group.description ? (
            <p className="mt-1 line-clamp-2 text-xs text-[var(--text-secondary)]">
              {group.description}
            </p>
          ) : null}
        </div>
        <Badge
          variant={group.acceptingMembers ? "success-subtle" : "subtle"}
          rounded="full"
          size="sm"
        >
          {group.acceptingMembers ? "Open" : "Closed"}
        </Badge>
      </div>

      <div className="mt-3 space-y-1">
        {group.address || group.city ? (
          <p className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <MapPin className="h-3.5 w-3.5" weight="bold" />
            <span className="line-clamp-1">
              {[group.address, group.city, group.state]
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
        ) : null}

        {group.meetingDay || group.meetingTime ? (
          <p className="text-xs text-[var(--text-tertiary)]">
            Meets:{" "}
            {[group.meetingDay, group.meetingTime].filter(Boolean).join(" • ")}
          </p>
        ) : null}

        <p className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          <UsersThree className="h-3.5 w-3.5" weight="bold" />
          <span>
            {group.currentMembers}/{group.maxMembers} members •{" "}
            {Math.max(0, spotsRemaining)} spots left
          </span>
        </p>

        {group.leader?.phone ? (
          <p className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <Phone className="h-3.5 w-3.5" weight="bold" />
            <span>
              Leader: {group.leader.firstName} {group.leader.lastName}
            </span>
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button asChild size="sm" variant="outline" className="min-h-11">
          <Link href={directionsUrl} target="_blank" rel="noreferrer">
            Directions
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="min-h-11"
          disabled={!group.acceptingMembers}
        >
          <Link href="/join">Join</Link>
        </Button>
      </div>
    </Card>
  );
}
