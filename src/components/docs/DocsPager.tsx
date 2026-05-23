import * as React from "react";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PagerLink {
  href: string;
  label: string;
  sublabel?: string;
}

interface DocsPagerProps {
  prev?: PagerLink;
  next?: PagerLink;
  className?: string;
}

function DocsPager({ prev, next, className }: DocsPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="مقالات بعدی و قبلی"
      className={cn(
        "mt-12 pt-8 border-t border-[var(--border)]",
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        className,
      )}
    >
      {/* Previous page */}
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group flex items-center gap-3 p-4 rounded-lg",
            "border border-[var(--border)] bg-[var(--bg-glass)]",
            "hover:border-brand hover:bg-[var(--brand-glow)]",
            "transition-colors duration-150",
            "outline-none focus-visible:ring-2 focus-visible:ring-brand",
          )}
        >
          <IconChevronLeft
            size={18}
            className="text-[var(--text-secondary)] group-hover:text-brand transition-colors duration-150 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            {prev.sublabel && (
              <p className="text-caption text-[var(--text-secondary)] mb-0.5">
                {prev.sublabel}
              </p>
            )}
            <p className="text-body-sm font-medium text-[var(--text-primary)] truncate">
              {prev.label}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next page */}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group flex items-center justify-end gap-3 p-4 rounded-lg",
            "border border-[var(--border)] bg-[var(--bg-glass)]",
            "hover:border-brand hover:bg-[var(--brand-glow)]",
            "transition-colors duration-150",
            "outline-none focus-visible:ring-2 focus-visible:ring-brand",
            "text-end",
          )}
        >
          <div className="min-w-0">
            {next.sublabel && (
              <p className="text-caption text-[var(--text-secondary)] mb-0.5">
                {next.sublabel}
              </p>
            )}
            <p className="text-body-sm font-medium text-[var(--text-primary)] truncate">
              {next.label}
            </p>
          </div>
          <IconChevronRight
            size={18}
            className="text-[var(--text-secondary)] group-hover:text-brand transition-colors duration-150 shrink-0"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}

export { DocsPager };
export type { DocsPagerProps, PagerLink };
