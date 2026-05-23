"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  valueKey: string;
  labelKey: string;
}

const STATS: StatItem[] = [
  { valueKey: "phases_value", labelKey: "phases_label" },
  { valueKey: "tables_value", labelKey: "tables_label" },
  { valueKey: "gateways_value", labelKey: "gateways_label" },
  { valueKey: "open_source_value", labelKey: "open_source_label" },
];

function StatStrip({ className }: { className?: string }) {
  const t = useTranslations("StatStrip");

  return (
    <section
      className={cn("py-12 px-6 border-y border-[var(--border)]", className)}
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto max-w-container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ valueKey, labelKey }, index) => (
            <motion.div
              key={valueKey}
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <p className="text-display-md font-bold text-brand mb-1">
                {t(valueKey as Parameters<typeof t>[0])}
              </p>
              <p className="text-body-sm text-[var(--text-secondary)]">
                {t(labelKey as Parameters<typeof t>[0])}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StatStrip };
