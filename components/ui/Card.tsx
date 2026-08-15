"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "status" | "alert" | "mesh" | "glass";
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
    const baseStyles = "rounded-3xl border border-neutral-border p-6 transition-all duration-200";

    const variantStyles = {
      default: "bg-white shadow-card",
      elevated: "bg-white shadow-elevated hover:shadow-glow",
      status: "bg-background-card border-neutral-border shadow-subtle",
      alert: "bg-white border-l-4 shadow-subtle",
      mesh: "fog-mesh-bg glass-mesh-card shadow-elevated",
      glass: "bg-white/80 backdrop-blur-md border-neutral-border/80 shadow-card",
    };

    const interactiveStyles = interactive
      ? "hover:border-neutral-muted/60 cursor-pointer hover:-translate-y-1 hover:shadow-elevated"
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
  return <div className={cn("flex items-center justify-between mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xs font-bold text-neutral-secondary uppercase tracking-widest", className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3", className)} {...props}>{children}</div>;
}
