import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "brand";
type BadgeSize = "sm" | "md";

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-[rgba(29,158,117,0.15)] text-success border border-[rgba(29,158,117,0.25)]",
  warning: "bg-[rgba(233,165,38,0.15)] text-warning border border-[rgba(233,165,38,0.25)]",
  danger: "bg-[rgba(226,75,74,0.15)] text-danger border border-[rgba(226,75,74,0.25)]",
  neutral: "bg-[var(--bg-glass)] text-[var(--text-secondary)] border border-[var(--border)]",
  brand: "bg-[var(--brand-glow)] text-brand border border-[rgba(55,138,221,0.25)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-caption gap-1",
  md: "px-2.5 py-1 text-body-sm gap-1.5",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "danger" && "bg-danger",
            variant === "brand" && "bg-brand",
            variant === "neutral" && "bg-[var(--text-secondary)]",
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

// Pill is an alias for Badge with a stronger visual weight
function Pill({
  className,
  ...props
}: BadgeProps) {
  return (
    <Badge
      className={cn("font-semibold tracking-wide", className)}
      {...props}
    />
  );
}

export { Badge, Pill };
export type { BadgeProps, BadgeVariant, BadgeSize };
