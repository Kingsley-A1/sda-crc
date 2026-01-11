import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

import { Button, Card } from "@/components/ui";

export interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
}

export function CtaBanner({
  title = "Welcome to the Digital Sanctuary",
  description = "Worship, learn, connect, and serve — wherever you are.",
  primaryHref = "/about",
  primaryLabel = "Learn About the Conference",
  className,
}: CtaBannerProps) {
  return (
    <Card
      variant="glass"
      padding="lg"
      className={className}
      hover="glow"
      interactive
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        <Button asChild variant="primary" className="min-h-12">
          <Link href={primaryHref} className="inline-flex items-center gap-2">
            {primaryLabel}
            <ArrowRight className="h-4 w-4" weight="bold" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
