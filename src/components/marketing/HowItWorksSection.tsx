"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconDownload,
  IconSettings,
  IconCalendar,
} from "@tabler/icons-react";

const STEP_ICONS = [IconDownload, IconSettings, IconCalendar];

function HowItWorksSection({ className }: { className?: string }) {
  const t = useTranslations("HowItWorks");
  const steps = ["install", "configure", "receive"] as const;

  return (
    <section className={cn("py-20 px-6", className)}>
      <div className="mx-auto max-w-container-xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display-md font-bold text-[var(--text-primary)] mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 start-[calc(16.67%+2rem)] end-[calc(16.67%+2rem)] h-px bg-[var(--border)]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <motion.div
                  key={step}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {/* Icon circle */}
                  <div
                    className={cn(
                      "relative z-10 w-20 h-20 rounded-full mb-6",
                      "flex items-center justify-center",
                      "glass-card border-2 border-brand",
                      "bg-[var(--brand-glow)]",
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={28} className="text-brand" />
                    {/* Step number */}
                    <span
                      className={cn(
                        "absolute -top-2 -end-2",
                        "w-6 h-6 rounded-full",
                        "bg-brand text-white",
                        "text-caption font-bold",
                        "flex items-center justify-center",
                      )}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-heading-md font-bold text-[var(--text-primary)] mb-3">
                    {t(`${step}_title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                    {t(`${step}_desc` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { HowItWorksSection };
