import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";

interface FaqAccordionProps {
  className?: string;
  /** Namespace override — defaults to "FAQ" */
  namespace?: string;
}

function FaqAccordion({ className }: FaqAccordionProps) {
  const t = useTranslations("FAQ");

  const FAQ_KEYS = [
    "free",
    "wordpress_version",
    "payment_gateways",
    "jalali",
    "recurring",
    "gdpr",
    "elementor",
    "support",
  ] as const;

  const items = FAQ_KEYS.map((key) => ({
    id: key,
    question: t(`${key}_q` as Parameters<typeof t>[0]),
    answer: t(`${key}_a` as Parameters<typeof t>[0]),
  }));

  return (
    <section className={cn("py-20 px-6", className)} aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-container-md">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display-md font-bold text-[var(--text-primary)]">
            {t("title")}
          </h2>
        </div>

        <Accordion items={items} allowMultiple />
      </div>
    </section>
  );
}

export { FaqAccordion };
