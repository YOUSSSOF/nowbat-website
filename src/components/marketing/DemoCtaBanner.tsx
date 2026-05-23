import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { IconRocket } from "@tabler/icons-react";

interface DemoCtaBannerProps {
  className?: string;
  /** Override the default headline */
  title?: string;
  /** Override the default CTA label */
  ctaLabel?: string;
}

function DemoCtaBanner({ className, title, ctaLabel }: DemoCtaBannerProps) {
  const t = useTranslations("DemoCtaBanner");

  return (
    <section className={cn("py-16 px-6", className)} aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-container-xl">
        <div
          className={cn(
            "glass-card px-8 py-10",
            "text-center",
            "border-[rgba(55,138,221,0.2)]",
            "relative overflow-hidden",
          )}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(55,138,221,0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <div
              className={cn(
                "inline-flex items-center justify-center",
                "w-14 h-14 rounded-full mb-6",
                "bg-[var(--brand-glow)] border border-[rgba(55,138,221,0.3)]",
              )}
              aria-hidden="true"
            >
              <IconRocket size={24} className="text-brand" />
            </div>

            <h2 className="text-heading-xl font-bold text-[var(--text-primary)] mb-4">
              {title ?? t("title")}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button as={Link} href="/demo" size="lg">
                {ctaLabel ?? t("cta_primary")}
              </Button>
              <Button
                as={Link}
                href="/docs/getting-started/installation"
                size="lg"
                variant="outline"
              >
                {t("cta_secondary")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { DemoCtaBanner };
export type { DemoCtaBannerProps };
