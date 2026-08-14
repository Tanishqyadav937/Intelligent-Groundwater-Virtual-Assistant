"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "status" | "alert";
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
    const baseStyles = "bg-background-card rounded-lg border border-neutral-border p-4 transition-all duration-150";

    const variantStyles = {
      default: "shadow-subtle",
      elevated: "shadow-card hover:shadow-elevated",
      status: "bg-background-card border-neutral-border shadow-subtle",
      alert: "bg-white border-l-4 shadow-subtle",
    };

    const interactiveStyles = interactive
      ? "hover:bg-background-hover hover:border-neutral-muted/50 cursor-pointer hover:-translate-y-0.5"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between mb-3", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-sm font-medium text-neutral-secondary uppercase tracking-wider", className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props}>{children}</div>;
}
