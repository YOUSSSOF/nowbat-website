"use client";

import * as React from "react";
import { usePathname } from "@/lib/i18n";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

export interface DocsSidebarGroup {
  title: string;
  items: Array<{
    href: string;
    label: string;
    items?: Array<{ href: string; label: string }>;
  }>;
}

interface DocsSidebarProps {
  groups: DocsSidebarGroup[];
  className?: string;
}

function DocsSidebar({ groups, className }: DocsSidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(
    () => {
      // Pre-expand the group that contains the current page
      const active = new Set<string>();
      groups.forEach((group) => {
        const hasActive = group.items.some(
          (item) =>
            pathname === item.href ||
            item.items?.some((sub) => pathname === sub.href),
        );
        if (hasActive) active.add(group.title);
      });
      return active;
    },
  );

  function toggleGroup(title: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  return (
    <nav
      className={cn("w-64 shrink-0", className)}
      aria-label="Documentation navigation"
    >
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-4">
        {groups.map((group) => {
          const isExpanded = expandedGroups.has(group.title);
          return (
            <div key={group.title} className="mb-1">
              {/* Group toggle */}
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={isExpanded}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 rounded",
                  "text-caption font-semibold tracking-wide uppercase",
                  "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  "transition-colors duration-150",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                )}
              >
                {group.title}
                <IconChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    isExpanded && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Group items */}
              {isExpanded && (
                <ul className="space-y-0.5 mt-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const hasSubItems = item.items && item.items.length > 0;
                    const hasActiveChild = item.items?.some(
                      (sub) => pathname === sub.href,
                    );

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block px-3 py-1.5 rounded text-body-sm",
                            "transition-colors duration-150",
                            "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                            isActive || hasActiveChild
                              ? "text-brand border-s-2 border-brand ps-[10px] font-medium"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </Link>

                        {/* Sub-items */}
                        {hasSubItems && (isActive || hasActiveChild) && (
                          <ul className="ms-4 mt-0.5 space-y-0.5">
                            {item.items!.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className={cn(
                                      "block px-3 py-1.5 rounded text-body-sm",
                                      "transition-colors duration-150",
                                      "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                                      isSubActive
                                        ? "text-brand font-medium"
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
                                    )}
                                    aria-current={isSubActive ? "page" : undefined}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export { DocsSidebar };
export type { DocsSidebarProps };
