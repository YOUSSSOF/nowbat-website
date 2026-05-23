"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  id: string;
  children: React.ReactNode;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultTab?: string;
}

function Tabs({ items, defaultTab, className, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultTab ?? items[0]?.id ?? "",
  );

  const activeItem = items.find((item) => item.id === activeTab) ?? items[0];

  return (
    <div className={cn("", className)} {...props}>
      {/* Tab list */}
      <div
        role="tablist"
        className="flex gap-1 border-b border-[var(--border)] mb-4"
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`tabpanel-${item.id}`}
            id={`tab-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "px-4 py-2 text-body-sm font-medium transition-colors duration-150",
              "border-b-2 -mb-px outline-none",
              "focus-visible:text-[var(--text-primary)]",
              activeTab === item.id
                ? "border-brand text-brand"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      {activeItem && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
        >
          {activeItem.children}
        </div>
      )}
    </div>
  );
}

export { Tabs };
export type { TabsProps, TabItem };
