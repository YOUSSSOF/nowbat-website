"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  IconCalendar,
  IconCreditCard,
  IconMessage,
  IconChartBar,
  IconUsers,
  IconRepeat,
} from "@tabler/icons-react";

interface FeatureCardData {
  Icon: React.ElementType;
  titleKey: string;
  descKey: string;
}

const FEATURES: FeatureCardData[] = [
  { Icon: IconCalendar, titleKey: "jalali_title", descKey: "jalali_desc" },
  { Icon: IconCreditCard, titleKey: "payment_title", descKey: "payment_desc" },
  { Icon: IconMessage, titleKey: "sms_title", descKey: "sms_desc" },
  { Icon: IconChartBar, titleKey: "reports_title", descKey: "reports_desc" },
  { Icon: IconUsers, titleKey: "staff_title", descKey: "staff_desc" },
  { Icon: IconRepeat, titleKey: "recurring_title", descKey: "recurring_desc" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

interface FeatureGridProps {
  className?: string;
}

function FeatureGrid({ className }: FeatureGridProps) {
  const t = useTranslations("FeatureGrid");

  return (
    <section className={cn("py-20 px-6", className)} aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-container-xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display-md font-bold text-[var(--text-primary)] mb-4">
            {t("title")}
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* 3×2 grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURES.map(({ Icon, titleKey, descKey }) => (
            <motion.div key={titleKey} variants={itemVariants}>
              <GlassCard
                hover
                className={cn(
                  "group h-full",
                  "border-s-[3px] border-s-transparent",
                  "hover:border-s-brand",
                  "transition-[border-color] duration-150",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
                    "border border-[rgba(55,138,221,0.2)]",
                    "bg-[var(--brand-glow)]",
                  )}
                  aria-hidden="true"
                >
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="text-body font-semibold text-[var(--text-primary)] mb-2">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {t(descKey as Parameters<typeof t>[0])}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { FeatureGrid };
