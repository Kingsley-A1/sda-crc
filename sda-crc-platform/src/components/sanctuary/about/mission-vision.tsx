import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface MissionVisionProps {
  mission: string;
  vision: string;
  className?: string;
}

export function MissionVision({
  mission,
  vision,
  className,
}: MissionVisionProps) {
  return (
    <section
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}
      aria-label="Mission and vision"
    >
      <Card className="p-4" interactive hover="lift">
        <p className="text-sm font-extrabold text-[var(--text-primary)]">
          Mission
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {mission}
        </p>
      </Card>
      <Card className="p-4" interactive hover="lift">
        <p className="text-sm font-extrabold text-[var(--text-primary)]">
          Vision
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {vision}
        </p>
      </Card>
    </section>
  );
}
