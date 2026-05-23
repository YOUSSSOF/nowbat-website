"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { IconLanguage } from "@tabler/icons-react";

interface LocaleToggleProps {
  className?: string;
}

function LocaleToggle({ className }: LocaleToggleProps) {
  const t = useTranslations("LocaleToggle");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const nextLocale = locale === "fa" ? "en" : "fa";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={t("switchTo", { locale: locale === "fa" ? "en" : "fa" })}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded",
        "text-body-sm font-medium text-[var(--text-secondary)]",
        "border border-[var(--border)] bg-[var(--bg-glass)]",
        "hover:text-[var(--text-primary)] hover:border-[rgba(55,138,221,0.3)]",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      <IconLanguage size={15} aria-hidden="true" />
      <span>{locale === "fa" ? "EN" : "فا"}</span>
    </button>
  );
}

export { LocaleToggle };
