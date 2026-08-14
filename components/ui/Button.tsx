"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none rounded-md";

    const variantStyles = {
      primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active border border-transparent shadow-subtle",
      secondary: "bg-background-hover text-neutral-primary hover:bg-neutral-border border border-neutral-border",
      danger: "bg-status-critical text-white hover:bg-red-600 active:bg-red-700 border border-transparent shadow-subtle",
      outline: "bg-white text-primary border border-primary hover:bg-primary-light/40",
      ghost: "bg-transparent text-neutral-primary hover:bg-background-hover",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2 min-h-[44px] sm:min-h-[40px]", // Touch target optimized
      lg: "h-12 px-6 text-base gap-2.5 min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
