import * as React from "react";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { IconChevronLeft } from "@tabler/icons-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface DocsHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  toc?: TocItem[];
  className?: string;
}

function DocsHeader({ title, breadcrumbs, toc, className }: DocsHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-caption text-[var(--text-secondary)]">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <IconChevronLeft size={12} aria-hidden="true" className="opacity-40" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "hover:text-[var(--text-primary)] transition-colors duration-150",
                      "outline-none focus-visible:text-brand",
                    )}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[var(--text-primary)]">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Page title */}
      <h1 className="text-heading-xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
        {title}
      </h1>

      {/* On-this-page mini-TOC — shown inline only when ≥3 headings and no sidebar TOC */}
      {toc && toc.length >= 3 && (
        <div className="lg:hidden border border-[var(--border)] rounded-lg p-4 bg-[var(--bg-glass)]">
          <p className="text-caption font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
            در این صفحه
          </p>
          <ul className="space-y-1.5">
            {toc.map((item) => (
              <li key={item.id} className={cn(item.level === 3 && "ms-4")}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "text-body-sm text-[var(--text-secondary)]",
                    "hover:text-brand transition-colors duration-150",
                    "outline-none focus-visible:text-brand",
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divider */}
      <div className="mt-6 border-b border-[var(--border)]" />
    </div>
  );
}

export { DocsHeader };
export type { DocsHeaderProps, BreadcrumbItem, TocItem };
