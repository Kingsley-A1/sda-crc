"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "@phosphor-icons/react";
import { Card, Badge } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/animations/variants";

interface DepartmentData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  mission?: string | null;
  imageUrl?: string | null;
  iconName?: string | null;
  colorScheme?: string | null;
  meetingDay?: string | null;
  meetingTime?: string | null;
  meetingLocation?: string | null;
  leader?: {
    firstName: string;
    lastName: string;
    photoUrl?: string | null;
  } | null;
}

function DepartmentCard({ department }: { department: DepartmentData }) {
  return (
    <Card hover="lift" className="overflow-hidden group h-full">
      {/* Image / Placeholder */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {department.imageUrl ? (
          <Image
            src={department.imageUrl}
            alt={department.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
            <span className="text-4xl text-white/30 font-bold">
              {department.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-foreground text-lg mb-2">
          {department.name}
        </h3>

        {department.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {department.description}
          </p>
        )}

        {department.leader && (
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
              {department.leader.photoUrl ? (
                <Image
                  src={department.leader.photoUrl}
                  alt={`${department.leader.firstName} ${department.leader.lastName}`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <Users size={14} className="text-primary" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                {department.leader.firstName} {department.leader.lastName}
              </p>
              <p className="text-[10px] text-muted-foreground">Director</p>
            </div>
          </div>
        )}

        {department.meetingDay && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" size="xs">
              {department.meetingDay}{" "}
              {department.meetingTime && `• ${department.meetingTime}`}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}

export function DepartmentGrid({
  departments,
}: {
  departments: DepartmentData[];
}) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {departments.map((dept) => (
        <motion.div key={dept.id} variants={staggerItem}>
          <DepartmentCard department={dept} />
        </motion.div>
      ))}
    </motion.div>
  );
}
