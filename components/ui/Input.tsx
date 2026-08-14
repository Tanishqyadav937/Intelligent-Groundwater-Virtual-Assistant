"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-neutral-primary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-neutral-muted pointer-events-none">{leftIcon}</span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-11 sm:h-10 px-3 bg-white text-neutral-primary placeholder-neutral-muted border border-neutral-border rounded-md text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "disabled:bg-background-hover disabled:cursor-not-allowed",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              error && "border-status-critical focus:ring-status-critical",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-neutral-muted">{rightIcon}</span>
          )}
        </div>
        {error && <p className="text-xs text-status-critical">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
