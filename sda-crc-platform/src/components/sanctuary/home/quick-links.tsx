import Link from "next/link";
import {
  Calendar,
  Church,
  HandsPraying,
  Users,
  VideoCamera,
} from "@phosphor-icons/react";

import { Button, Card } from "@/components/ui";

export interface QuickLinksProps {
  className?: string;
}

const LINKS = [
  {
    href: "/sermons",
    label: "Sermons",
    icon: <VideoCamera className="h-5 w-5" weight="fill" />,
  },
  {
    href: "/events",
    label: "Events",
    icon: <Calendar className="h-5 w-5" weight="fill" />,
  },
  {
    href: "/live",
    label: "Live",
    icon: <Church className="h-5 w-5" weight="fill" />,
  },
  {
    href: "/small-groups",
    label: "Small Groups",
    icon: <Users className="h-5 w-5" weight="fill" />,
  },
  {
    href: "/evangelism",
    label: "I Will Go",
    icon: <HandsPraying className="h-5 w-5" weight="fill" />,
  },
] as const;

export function QuickLinks({ className }: QuickLinksProps) {
  return (
    <section className={className} aria-label="Quick links">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {LINKS.map((link) => (
          <Card
            key={link.href}
            padding="sm"
            hover="lift"
            interactive
            asChild
            className="min-h-[72px]"
          >
            <Link href={link.href} className="flex h-full items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                {link.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  {link.label}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">Tap to open</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-4">
        <Button asChild fullWidth variant="primary" className="min-h-12">
          <Link href="/join">Join Our Church Family</Link>
        </Button>
      </div>
    </section>
  );
}
