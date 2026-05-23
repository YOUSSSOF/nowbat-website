"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LocaleToggle } from "./LocaleToggle";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface NavItem {
  href: string;
  labelKey: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/features", labelKey: "features" },
  { href: "/how-it-works", labelKey: "how_it_works" },
  { href: "/demo", labelKey: "demo" },
  { href: "/docs", labelKey: "docs" },
  { href: "/guides", labelKey: "guides" },
  { href: "/blog", labelKey: "blog" },
  { href: "/pricing", labelKey: "pricing" },
];

function SiteHeader() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[200]",
          "transition-all duration-300",
          scrolled
            ? "bg-[rgba(7,7,14,0.8)] backdrop-blur-[16px] border-b border-[var(--border)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-container-xl px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
          >
            <span className="text-body font-bold text-brand" aria-label="Nowbat">
              نوبت
            </span>
            <span className="text-body-sm text-[var(--text-secondary)] hidden sm:inline">
              · nowbat
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded text-body-sm font-medium transition-colors duration-150",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  pathname === item.href
                    ? "text-brand"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {t(item.labelKey as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LocaleToggle className="hidden sm:flex" />
            <Button as={Link} href="/demo" size="sm" className="hidden sm:inline-flex">
              {t("cta")}
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
              className={cn(
                "lg:hidden p-2 rounded text-[var(--text-secondary)]",
                "hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
                "transition-colors duration-150",
                "outline-none focus-visible:ring-2 focus-visible:ring-brand",
              )}
            >
              {mobileOpen ? (
                <IconX size={20} aria-hidden="true" />
              ) : (
                <IconMenu2 size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen nav overlay */}
      {mobileOpen && (
        <div className={cn("fixed inset-0 z-[199] lg:hidden", "bg-[var(--bg-page)] flex flex-col")}>
          {/* Header row */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)]">
            <Link
              href="/"
              className="text-body font-bold text-brand"
              onClick={() => setMobileOpen(false)}
            >
              نوبت
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="بستن منو"
              className="p-2 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <IconX size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded text-body font-medium transition-colors duration-150",
                  pathname === item.href
                    ? "text-brand bg-[var(--brand-glow)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
                )}
              >
                {t(item.labelKey as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="px-6 py-6 border-t border-[var(--border)] flex flex-col gap-3">
            <LocaleToggle className="w-full justify-center" />
            <Button as={Link} href="/demo" className="w-full justify-center">
              {t("cta")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export { SiteHeader };
