"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-xl transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border border-border shadow-card",
      elevated: "bg-card text-card-foreground shadow-md",
      bordered: "bg-card text-card-foreground border-2 border-border",
      ghost: "bg-transparent",
      glass:
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30",
      filled: "bg-muted text-foreground",
      accent: "bg-accent text-accent-foreground border border-primary-200",
      gradient:
        "bg-gradient-to-br from-primary-50 to-accent border border-primary-100",
      admin: "bg-gray-900 border border-gray-800 text-gray-100",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
    hover: {
      none: "",
      lift: "hover:shadow-card-hover hover:-translate-y-1",
      glow: "hover:shadow-lg hover:border-primary-300 hover:shadow-primary-100/50",
      border: "hover:border-primary",
      scale: "hover:scale-[1.02]",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "none",
    hover: "none",
  },
});

interface CardProps
  extends
    Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, hover, interactive, children, ...props },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, hover }),
          interactive && "cursor-pointer",
          className,
        )}
        {...(interactive
          ? {
              whileHover: { y: -4 },
              whileTap: { scale: 0.99 },
              transition: { duration: 0.2 },
            }
          : {})}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

function CardHeader({ className, noBorder, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "p-6 pb-4",
        !noBorder && "border-b border-border",
        className,
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function CardTitle({ className, as: Tag = "h3", ...props }: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "text-lg font-semibold leading-tight text-foreground tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground mt-1.5 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noBorder?: boolean;
}

function CardFooter({ className, noBorder, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-4",
        !noBorder && "border-t border-border",
        className,
      )}
      {...props}
    />
  );
}

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "video" | "square" | "wide" | "portrait";
  overlay?: boolean;
}

function CardImage({
  className,
  aspectRatio = "video",
  overlay,
  children,
  ...props
}: CardImageProps) {
  const ratioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[2/1]",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-xl",
        ratioClasses[aspectRatio],
        className,
      )}
      {...props}
    >
      {children}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </div>
  );
}

/* Specialized card variants for common use cases */
interface FeatureCardProps extends Omit<CardProps, "variant"> {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      variant="default"
      hover="lift"
      padding="lg"
      className={cn("text-center", className)}
      {...props}
    >
      {icon && (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
          {icon}
        </div>
      )}
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription className="mt-0">{description}</CardDescription>
    </Card>
  );
}

interface StatCardProps extends Omit<CardProps, "variant"> {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
}

function StatCard({
  value,
  label,
  icon,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card
      variant="default"
      padding="md"
      className={cn("", className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1.5 text-sm font-medium flex items-center gap-1",
                trend.positive ? "text-success" : "text-destructive",
              )}
            >
              <span>{trend.positive ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  FeatureCard,
  StatCard,
};
export type { CardProps };
