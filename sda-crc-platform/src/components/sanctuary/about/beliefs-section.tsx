import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface BeliefsSectionProps {
  title?: string;
  beliefs: string[];
  className?: string;
}

export function BeliefsSection({
  title = "Our Core Beliefs",
  beliefs,
  className,
}: BeliefsSectionProps) {
  return (
    <section className={cn("space-y-3", className)} aria-label="Core beliefs">
      <h2 className="text-base font-extrabold text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {beliefs.map((belief, idx) => (
          <Card key={idx} className="p-4" interactive hover="lift">
            <p className="text-sm text-[var(--text-secondary)]">{belief}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
