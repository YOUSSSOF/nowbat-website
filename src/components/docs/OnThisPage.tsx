"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface OnThisPageProps {
  items: TocItem[];
  title?: string;
  className?: string;
}

function OnThisPage({ items, title = "در این صفحه", className }: OnThisPageProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <aside
      className={cn("w-52 shrink-0 hidden xl:block", className)}
      aria-label="در این صفحه"
    >
      <div className="sticky top-20">
        <p className="text-caption font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3 px-1">
          {title}
        </p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-body-sm py-1 px-1 rounded",
                  "transition-colors duration-150",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  item.level === 3 && "ms-3",
                  activeId === item.id
                    ? "text-brand font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export { OnThisPage };
export type { OnThisPageProps, TocItem };
