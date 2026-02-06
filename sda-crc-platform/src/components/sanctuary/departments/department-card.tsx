"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SquaresFour,
  UsersThree,
  MusicNotes,
  Heart,
  Cross,
  Broadcast,
  type Icon,
} from "@phosphor-icons/react";

import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { DepartmentCard as DepartmentCardData } from "@/types/department";

export interface DepartmentCardProps {
  department: DepartmentCardData;
  className?: string;
}

const ICONS_BY_NAME: Record<string, Icon> = {
  SquaresFour,
  UsersThree,
  MusicNotes,
  Heart,
  Cross,
  Broadcast,
};

function getDepartmentIcon(iconName: string | null | undefined): Icon {
  if (!iconName) return SquaresFour;
  return ICONS_BY_NAME[iconName] ?? SquaresFour;
}

export function DepartmentCard({ department, className }: DepartmentCardProps) {
  const DepartmentIcon = getDepartmentIcon(department.iconName);

  return (
    <Card
      asChild
      interactive
      hover="lift"
      padding="none"
      className={cn("overflow-hidden", className)}
    >
      <Link href={`/departments/${department.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] w-full bg-[var(--background-alt)]">
          {department.imageUrl ? (
            <Image
              src={department.imageUrl}
              alt={department.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            />
          ) : null}

          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              size="sm"
              rounded="full"
              className="backdrop-blur"
              leftIcon={
                <DepartmentIcon className="h-3.5 w-3.5" weight="bold" />
              }
            >
              Department
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <p className="line-clamp-1 text-sm font-bold text-[var(--text-primary)]">
            {department.name}
          </p>

          {department.description ? (
            <p className="mt-2 line-clamp-2 text-xs text-[var(--text-secondary)]">
              {department.description}
            </p>
          ) : (
            <p className="mt-2 line-clamp-2 text-xs text-[var(--text-tertiary)]">
              Learn more about this ministry.
            </p>
          )}

          {typeof department.memberCount === "number" ? (
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">
              {department.memberCount} member
              {department.memberCount === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>
      </Link>
    </Card>
  );
}
