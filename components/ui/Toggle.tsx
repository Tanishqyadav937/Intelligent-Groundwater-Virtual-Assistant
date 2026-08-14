"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, id, disabled }: ToggleProps) {
  const generatedId = React.useId();
  const toggleId = id || generatedId;

  return (
    <label htmlFor={toggleId} className={cn("inline-flex items-center gap-3 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}>
      <div className="relative">
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out",
            checked ? "bg-primary" : "bg-neutral-border"
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-subtle",
            checked && "translate-x-5"
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-neutral-primary">{label}</span>}
    </label>
  );
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <label htmlFor={checkboxId} className="inline-flex items-center gap-2 cursor-pointer select-none">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border border-neutral-border bg-white transition-colors flex items-center justify-center",
              checked && "bg-primary border-primary text-white"
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
        {label && <span className="text-sm text-neutral-primary">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
