"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

function Accordion({
  items,
  allowMultiple = false,
  className,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className="glass-card overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className={cn(
                "flex w-full items-center justify-between gap-4",
                "px-5 py-4 text-start",
                "text-body font-medium text-[var(--text-primary)]",
                "transition-colors duration-150",
                "hover:text-brand",
                "outline-none focus-visible:text-brand",
              )}
            >
              <span>{item.question}</span>
              <IconChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-[var(--text-secondary)] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={`accordion-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-5 pb-4 text-body-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
export type { AccordionProps, AccordionItem };
