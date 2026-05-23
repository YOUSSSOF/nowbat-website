"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dim border border-transparent focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
  outline:
    "bg-transparent text-brand border border-brand hover:bg-[var(--brand-glow)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] border border-transparent hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
  danger:
    "bg-danger text-white border border-transparent hover:opacity-90 focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-body-sm gap-1.5 rounded",
  md: "px-4 py-2 text-body gap-2 rounded",
  lg: "px-6 py-3 text-body-lg gap-2.5 rounded",
};

type AsProp<C extends React.ElementType> = { as?: C };
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
};

type ButtonProps<C extends React.ElementType = "button"> =
  React.PropsWithChildren<ButtonOwnProps & AsProp<C>> &
    Omit<React.ComponentPropsWithRef<C>, PropsToOmit<C, ButtonOwnProps>>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>,
) => React.ReactElement | null;

const Button: ButtonComponent = function Button<
  C extends React.ElementType = "button",
>({
  as,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps<C>) {
  const Component = (as ?? "button") as React.ElementType;
  const isDisabled = (disabled as boolean | undefined) ?? loading;

  return (
    <Component
      disabled={Component === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin shrink-0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="28"
            strokeDashoffset="10"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children}
    </Component>
  );
} as ButtonComponent;

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
