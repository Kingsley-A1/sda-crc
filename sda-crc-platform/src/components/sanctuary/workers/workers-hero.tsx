import Image from "next/image";

import { cn } from "@/lib/utils";

export interface WorkersHeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
  className?: string;
}

export function WorkersHero({
  title = "Our Dedicated Workers",
  subtitle = "Honouring those who serve the Lord",
  imageUrl,
  className,
}: WorkersHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
        className
      )}
      aria-label="Workers page hero"
    >
      <div className="relative min-h-[200px] sm:min-h-[260px]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h1 className="text-balance text-2xl font-extrabold text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
