import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function GlassCard({
  hover = false,
  padding = "md",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card",
        paddingClasses[padding],
        hover && [
          "transition-all duration-150",
          "hover:border-[rgba(55,138,221,0.3)]",
          "hover:bg-[rgba(255,255,255,0.06)]",
          "hover:scale-[1.02]",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { GlassCard };
export type { GlassCardProps };
