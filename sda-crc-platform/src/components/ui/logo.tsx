/**
 * Logo Component
 * ==============
 * Reusable SDA CRC logo with multiple variants.
 * Can be imported anywhere: `import { Logo } from "@/components/ui/logo"`
 */

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "full" shows logo + text, "icon" shows only the logo mark, "text" shows only text */
  variant?: "full" | "icon" | "text";
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Use inverted (white) version for dark backgrounds */
  inverted?: boolean;
  /** Wrap in a Link to home */
  linked?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeConfig = {
  sm: { image: 28, text: "text-xs", subtext: "text-[9px]" },
  md: { image: 36, text: "text-sm", subtext: "text-[10px]" },
  lg: { image: 48, text: "text-base", subtext: "text-xs" },
} as const;

function LogoContent({
  variant = "full",
  size = "md",
  inverted = false,
  className,
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {variant !== "text" && (
        <Image
          src="/assets/logo.jpg"
          alt="SDA Cross River Conference Logo"
          width={config.image}
          height={config.image}
          className="rounded-lg object-contain"
          priority
        />
      )}
      {variant !== "icon" && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold leading-tight",
              config.text,
              inverted ? "text-white" : "text-primary-700",
            )}
          >
            Cross River Conference
          </span>
          <span
            className={cn(
              "leading-tight",
              config.subtext,
              inverted ? "text-white/70" : "text-muted-foreground",
            )}
          >
            Seventh-day Adventist Church
          </span>
        </div>
      )}
    </div>
  );
}

export function Logo({ linked = true, ...props }: LogoProps) {
  if (linked) {
    return (
      <Link href="/" aria-label="SDA CRC — Home">
        <LogoContent {...props} />
      </Link>
    );
  }

  return <LogoContent {...props} />;
}
