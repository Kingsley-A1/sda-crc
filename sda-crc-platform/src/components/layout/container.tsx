/**
 * Container Component
 * ===================
 * Max-width content wrapper with responsive padding.
 *
 * "In Him we live and move and have our being." — Acts 17:28
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-[1400px]",
      fluid: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

function Container({
  className,
  size,
  as: Component = "div",
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Container, containerVariants };
export type { ContainerProps };
