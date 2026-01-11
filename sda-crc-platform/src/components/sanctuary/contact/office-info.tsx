import Link from "next/link";
import { EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types";

export interface OfficeInfoProps {
  settings: Pick<SiteSettings, "contactEmail" | "contactPhone" | "address">;
  className?: string;
}

export function OfficeInfo({ settings, className }: OfficeInfoProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-sm font-bold text-[var(--text-primary)]">Office Info</p>

      <div className="mt-3 space-y-2">
        {settings.address ? (
          <p className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" weight="bold" />
            <span>{settings.address}</span>
          </p>
        ) : null}

        {settings.contactPhone ? (
          <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Phone className="h-4 w-4" weight="bold" />
            <Link href={`tel:${settings.contactPhone}`} className="underline underline-offset-2">
              {settings.contactPhone}
            </Link>
          </p>
        ) : null}

        {settings.contactEmail ? (
          <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <EnvelopeSimple className="h-4 w-4" weight="bold" />
            <Link href={`mailto:${settings.contactEmail}`} className="underline underline-offset-2">
              {settings.contactEmail}
            </Link>
          </p>
        ) : null}
      </div>
    </Card>
  );
}
