/**
 * Card — Container component with green accent & hover lift
 */
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

export function Card({ className, accent, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-card transition-all duration-200",
        accent && "border-t-[3px] border-green-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 pb-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 pb-5 pt-2", className)} {...props}>
      {children}
    </div>
  );
}
