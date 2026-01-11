/**
 * Button Component
 * ================
 * Primary interactive button with multiple variants and states.
 *
 * "Whatever you do, work at it with all your heart." — Colossians 3:23
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] focus-visible:ring-[var(--primary)] shadow-md hover:shadow-lg",
        secondary:
          "bg-[var(--secondary)] text-black hover:bg-[var(--secondary-dark)] focus-visible:ring-[var(--secondary)] shadow-md hover:shadow-lg",
        outline:
          "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white focus-visible:ring-[var(--primary)]",
        "outline-secondary":
          "border-2 border-[var(--secondary)] text-[var(--secondary)] bg-transparent hover:bg-[var(--secondary)] hover:text-black focus-visible:ring-[var(--secondary)]",
        ghost:
          "text-[var(--primary)] bg-transparent hover:bg-[var(--primary-50)] focus-visible:ring-[var(--primary)]",
        "ghost-secondary":
          "text-[var(--secondary)] bg-transparent hover:bg-[var(--secondary-50)] focus-visible:ring-[var(--secondary)]",
        danger:
          "bg-[var(--error)] text-white hover:bg-[var(--accent-red-dark)] focus-visible:ring-[var(--error)] shadow-md hover:shadow-lg",
        success:
          "bg-[var(--success)] text-white hover:opacity-90 focus-visible:ring-[var(--success)] shadow-md hover:shadow-lg",
        link: "text-[var(--primary)] underline-offset-4 hover:underline bg-transparent p-0 h-auto",
        white:
          "bg-white text-[var(--primary)] hover:bg-gray-100 focus-visible:ring-white shadow-md hover:shadow-lg",
      },
      size: {
        xs: "h-8 px-3 text-xs rounded-lg",
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-base rounded-xl",
        lg: "h-14 px-8 text-lg rounded-xl",
        xl: "h-16 px-10 text-xl rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      rounded: "default",
    },
  }
);

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      asChild = false,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const childContent = React.useMemo(() => {
      if (asChild && React.isValidElement(children)) {
        const childElement = children as React.ReactElement<{ children?: React.ReactNode }>;
        return childElement.props.children;
      }
      return children;
    }, [asChild, children]);

    const content = isLoading ? (
      <>
        <Spinner
          size={size === "xs" || size === "sm" ? "sm" : "md"}
          className="shrink-0"
        />
        {loadingText ? <span>{loadingText}</span> : null}
      </>
    ) : (
      <>
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        {childContent}
        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </>
    );

    if (asChild) {
      if (!React.isValidElement(children)) {
        if (process.env.NODE_ENV !== "production") {
          throw new Error("Button `asChild` expects a single React element child.");
        }
        return null;
      }

      const child = children as React.ReactElement<{ className?: string; onClick?: (e: any) => void }>;
      const mergedClassName = cn(
        buttonVariants({ variant, size, fullWidth, rounded }),
        className,
        child.props.className
      );

      const childProps = child.props as Record<string, unknown>;
      return React.cloneElement(
        child,
        {
          className: mergedClassName,
          onClick: (e: React.MouseEvent) => {
            if (isDisabled) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            (childProps.onClick as ((e: React.MouseEvent) => void) | undefined)?.(e);
            onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
          },
          ...(isDisabled && { "aria-disabled": true }),
          tabIndex: isDisabled ? -1 : (childProps.tabIndex as number | undefined),
        } as React.HTMLAttributes<HTMLElement>,
        content
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded }),
          className
        )}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
