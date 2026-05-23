import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[];
}

function Kbd({ keys, className, children, ...props }: KbdProps) {
  const content = keys ?? [children];

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} {...props}>
      {content.map((key, i) => (
        <kbd
          key={i}
          className={cn(
            "inline-flex items-center justify-center",
            "min-w-[1.5rem] h-6 px-1.5",
            "font-mono text-caption",
            "bg-[var(--bg-surface)] text-[var(--text-secondary)]",
            "border border-[var(--border)] rounded",
            "leading-none",
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

export { Kbd };
export type { KbdProps };
