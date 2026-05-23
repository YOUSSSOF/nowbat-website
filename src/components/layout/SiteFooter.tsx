import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
  product: [
    { href: "/features", labelKey: "features" },
    { href: "/how-it-works", labelKey: "how_it_works" },
    { href: "/demo", labelKey: "demo" },
    { href: "/pricing", labelKey: "pricing" },
  ],
  docs: [
    { href: "/docs/getting-started/installation", labelKey: "installation" },
    { href: "/docs/configuration/general", labelKey: "configuration" },
    { href: "/guides", labelKey: "guides" },
    { href: "/docs/shortcodes", labelKey: "shortcodes" },
    { href: "/docs/rest-api", labelKey: "rest_api" },
    { href: "/docs/hooks", labelKey: "hooks" },
  ],
  social: [
    { href: "https://github.com/YOUSSSOF/nowbat-website", label: "GitHub", external: true },
  ],
};

function SiteFooter() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Navigation");
  const tf = useTranslations("FooterLinks");

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-container-xl px-6 py-12">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            >
              <span className="text-heading-sm font-bold text-brand">نوبت</span>
              <span className="text-body-sm text-[var(--text-secondary)]">· nowbat</span>
            </Link>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2 — Product links */}
          <div>
            <p className="text-body-sm font-semibold text-[var(--text-primary)] mb-4">
              {tf("product")}
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-body-sm text-[var(--text-secondary)]",
                      "hover:text-[var(--text-primary)] transition-colors duration-150",
                      "outline-none focus-visible:text-brand",
                    )}
                  >
                    {tn(item.labelKey as Parameters<typeof tn>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Docs links */}
          <div>
            <p className="text-body-sm font-semibold text-[var(--text-primary)] mb-4">
              {tf("documentation")}
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.docs.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-body-sm text-[var(--text-secondary)]",
                      "hover:text-[var(--text-primary)] transition-colors duration-150",
                      "outline-none focus-visible:text-brand",
                    )}
                  >
                    {tf(item.labelKey as Parameters<typeof tf>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)]">
          <p className="text-caption text-[var(--text-secondary)]">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-caption text-[var(--text-secondary)]",
                  "hover:text-[var(--text-primary)] transition-colors duration-150",
                  "outline-none focus-visible:ring-2 focus-visible:ring-brand rounded",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
