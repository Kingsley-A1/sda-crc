/**
 * Card Component
 * ==============
 * Versatile card container with composable sub-components.
 *
 * "A word fitly spoken is like apples of gold in settings of silver." — Proverbs 25:11
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// Card Container
// ============================================================================

const cardVariants = cva(
  "rounded-xl bg-[var(--surface)] transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--border-light)] shadow-sm hover:shadow-md",
        elevated: "shadow-md hover:shadow-xl border-0",
        bordered:
          "border-2 border-[var(--border)] shadow-none hover:border-[var(--primary)]",
        ghost: "bg-transparent border-0 shadow-none",
        glass: "bg-white/80 backdrop-blur-md border border-white/30 shadow-lg",
        admin: "bg-[var(--admin-surface)] border border-[var(--admin-border)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-2 hover:shadow-xl",
        glow: "hover:shadow-[var(--shadow-glow)]",
        border: "hover:border-[var(--primary)]",
        scale: "hover:scale-[1.02]",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "none",
      interactive: false,
    },
  }
);

interface CardProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hover,
      interactive,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      if (!React.isValidElement(children)) {
        if (process.env.NODE_ENV !== "production") {
          throw new Error("Card `asChild` expects a single React element child.");
        }
        return null;
      }

      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(
          cardVariants({ variant, padding, hover, interactive }),
          className,
          child.props.className
        ),
      });
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, hover, interactive }),
          className
        )}
        whileHover={interactive ? { y: -4 } : undefined}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// ============================================================================
// Card Header
// ============================================================================

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// ============================================================================
// Card Title
// ============================================================================

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-tight tracking-tight text-[var(--text-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = "CardTitle";

// ============================================================================
// Card Description
// ============================================================================

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--text-secondary)]", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

// ============================================================================
// Card Content
// ============================================================================

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// ============================================================================
// Card Footer
// ============================================================================

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

// ============================================================================
// Card Image
// ============================================================================

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  overlay?: boolean;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  (
    { className, aspectRatio = "video", overlay = false, children, ...props },
    ref
  ) => {
    const aspectClasses = {
      video: "aspect-video",
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      auto: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-t-xl",
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      >
        {children}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
};
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
};
