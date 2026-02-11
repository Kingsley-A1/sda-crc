"use client";

import Image from "next/image";
import { Envelope, Phone } from "@phosphor-icons/react";
import { Card } from "@/components/ui";

interface LeaderInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
}

interface DepartmentLeaderProps {
  leader: LeaderInfo;
}

export function DepartmentLeader({ leader }: DepartmentLeaderProps) {
  return (
    <Card variant="bordered" className="p-6">
      <h3 className="font-bold text-lg text-foreground mb-4">
        Department Leader
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden bg-primary-50">
          {leader.photoUrl ? (
            <Image
              src={leader.photoUrl}
              alt={`${leader.firstName} ${leader.lastName}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-primary">
              {leader.firstName[0]}
              {leader.lastName[0]}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {leader.firstName} {leader.lastName}
          </p>
          <p className="text-sm text-muted-foreground">Director</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Envelope className="h-4 w-4" />
            <span>{leader.email}</span>
          </a>
        )}
        {leader.phone && (
          <a
            href={`tel:${leader.phone}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{leader.phone}</span>
          </a>
        )}
      </div>
    </Card>
  );
}
