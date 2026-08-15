"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "accent";
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
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:pointer-events-none rounded-full";

    const variantStyles = {
      primary: "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 border border-black shadow-subtle",
      secondary: "bg-background-card text-neutral-main hover:bg-neutral-border border border-neutral-border",
      accent: "bg-primary-accent text-white hover:bg-blue-600 border border-transparent shadow-glow",
      danger: "bg-status-critical text-white hover:bg-red-600 active:bg-red-700 border border-transparent shadow-subtle",
      outline: "bg-white text-black border border-neutral-border hover:bg-background-hover hover:border-black",
      ghost: "bg-transparent text-neutral-main hover:bg-background-hover",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2 min-h-[44px]", // Touch target optimized
      lg: "h-12 px-7 text-base gap-2.5 min-h-[48px]",
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
