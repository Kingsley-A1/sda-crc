import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

function Skeleton({ className, variant = "rectangular", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton animate-pulse bg-gray-200",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 rounded",
        variant === "rectangular" && "rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
