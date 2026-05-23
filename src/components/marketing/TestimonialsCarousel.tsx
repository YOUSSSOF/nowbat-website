"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface TestimonialData {
  nameKey: string;
  businessKey: string;
  quoteKey: string;
  initials: string;
  color: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    nameKey: "t1_name",
    businessKey: "t1_business",
    quoteKey: "t1_quote",
    initials: "ع",
    color: "#378ADD",
  },
  {
    nameKey: "t2_name",
    businessKey: "t2_business",
    quoteKey: "t2_quote",
    initials: "م",
    color: "#1D9E75",
  },
  {
    nameKey: "t3_name",
    businessKey: "t3_business",
    quoteKey: "t3_quote",
    initials: "ف",
    color: "#E9A526",
  },
];

function TestimonialsCarousel({ className }: { className?: string }) {
  const t = useTranslations("Testimonials");
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex(
      (i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }

  const current = TESTIMONIALS[index];

  return (
    <section className={cn("py-20 px-6", className)} aria-label={t("ariaLabel")}>
      <div className="mx-auto max-w-container-xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-3">
            {t("overline")}
          </p>
          <h2 className="text-display-md font-bold text-[var(--text-primary)]">
            {t("title")}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-container-md">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="text-center p-8">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-heading-md font-bold text-white"
                  style={{ backgroundColor: current.color }}
                  aria-hidden="true"
                >
                  {current.initials}
                </div>

                {/* Quote */}
                <blockquote className="text-body text-[var(--text-primary)] leading-relaxed mb-6">
                  &ldquo;{t(current.quoteKey as Parameters<typeof t>[0])}&rdquo;
                </blockquote>

                {/* Name + business */}
                <p className="text-body-sm font-semibold text-[var(--text-primary)]">
                  {t(current.nameKey as Parameters<typeof t>[0])}
                </p>
                <p className="text-caption text-[var(--text-secondary)]">
                  {t(current.businessKey as Parameters<typeof t>[0])}
                </p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("prev")}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center",
                "border border-[var(--border)] bg-[var(--bg-glass)]",
                "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                "hover:border-brand transition-colors duration-150",
                "outline-none focus-visible:ring-2 focus-visible:ring-brand",
              )}
            >
              <IconChevronLeft size={16} aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={t("goToSlide", { n: i + 1 })}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-150",
                    i === index
                      ? "bg-brand w-4"
                      : "bg-[var(--border)] hover:bg-[var(--text-secondary)]",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("next")}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center",
                "border border-[var(--border)] bg-[var(--bg-glass)]",
                "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                "hover:border-brand transition-colors duration-150",
                "outline-none focus-visible:ring-2 focus-visible:ring-brand",
              )}
            >
              <IconChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { TestimonialsCarousel };
