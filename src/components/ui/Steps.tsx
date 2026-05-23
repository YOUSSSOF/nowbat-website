import * as React from "react";
import { cn } from "@/lib/utils";

interface StepItem {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  items?: StepItem[];
}

function Steps({ items, className, children, ...props }: StepsProps) {
  // Support both prop-based items and compound child usage
  if (items) {
    return (
      <ol className={cn("space-y-0", className)} {...props}>
        {items.map((item, index) => (
          <StepItem
            key={index}
            number={index + 1}
            title={item.title}
            isLast={index === items.length - 1}
          >
            {item.description}
            {item.children}
          </StepItem>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("space-y-0", className)} {...props}>
      {children}
    </ol>
  );
}

interface StepItemProps {
  number: number;
  title: string;
  isLast?: boolean;
  children?: React.ReactNode;
}

function StepItem({ number, title, isLast = false, children }: StepItemProps) {
  return (
    <li className="relative flex gap-4">
      {/* Connector line */}
      {!isLast && (
        <span
          className="absolute top-8 start-4 bottom-0 w-px bg-[var(--border)]"
          aria-hidden="true"
        />
      )}

      {/* Number badge */}
      <div
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center",
          "rounded-full border border-brand bg-[var(--brand-glow)]",
          "text-caption font-bold text-brand",
        )}
        aria-hidden="true"
      >
        {number}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-8 min-w-0", isLast && "pb-0")}>
        <p className="font-semibold text-body text-[var(--text-primary)] leading-8 mb-1">
          {title}
        </p>
        {children && (
          <div className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </li>
  );
}

export { Steps, StepItem };
export type { StepsProps, StepItemProps, StepItem as StepData };
