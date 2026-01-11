import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface HistorySectionProps {
  title?: string;
  paragraphs: string[];
  className?: string;
}

export function HistorySection({ title = "Our History", paragraphs, className }: HistorySectionProps) {
  return (
    <section className={cn("space-y-3", className)} aria-label="Church history">
      <h2 className="text-base font-extrabold text-[var(--text-primary)]">{title}</h2>
      <Card className="p-4">
        <div className="space-y-3">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {p}
            </p>
          ))}
        </div>
      </Card>
    </section>
  );
}
