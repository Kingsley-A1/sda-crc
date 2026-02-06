import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface HeroSlideData {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  imageSrc?: string | null;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

interface HeroSlideProps {
  slide: HeroSlideData;
  priority?: boolean;
}

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  const hasImage = Boolean(slide.imageSrc);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {hasImage ? (
        <Image
          src={slide.imageSrc as string}
          alt={slide.imageAlt ?? slide.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />

      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        {slide.eyebrow ? (
          <p className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
            {slide.eyebrow}
          </p>
        ) : null}

        <h1 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {slide.title}
        </h1>

        {slide.subtitle ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            {slide.subtitle}
          </p>
        ) : null}

        {(slide.primaryCta || slide.secondaryCta) && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {slide.primaryCta ? (
              <Button
                asChild
                size="md"
                variant="secondary"
                className="min-h-12"
              >
                <Link href={slide.primaryCta.href}>
                  {slide.primaryCta.label}
                </Link>
              </Button>
            ) : null}

            {slide.secondaryCta ? (
              <Button
                asChild
                size="md"
                variant="outline"
                className={cn(
                  "min-h-12 border-white/60 text-white hover:bg-white hover:text-[var(--primary)]"
                )}
              >
                <Link href={slide.secondaryCta.href}>
                  {slide.secondaryCta.label}
                </Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
