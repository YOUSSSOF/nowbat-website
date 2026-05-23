"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center",
        "pt-24 pb-16 px-6",
        "overflow-hidden",
      )}
      aria-label={t("ariaLabel")}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(55,138,221,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-container-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Overline */}
            <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-6">
              {t("overline")}
            </p>

            {/* Headline */}
            <h1 className="text-display-xl font-bold text-[var(--text-primary)] mb-6 leading-[1.1]">
              {t("headline_start")}{" "}
              <span className="hero-highlight">{t("headline_highlight")}</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              {t("subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button as={Link} href="/demo" size="lg">
                {t("cta_primary")}
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

            {/* Social proof */}
            <p className="text-body-sm text-[var(--text-secondary)]">
              {t("social_proof")}
            </p>
          </motion.div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  const t = useTranslations("Hero");

  return (
    <div
      className={cn(
        "glass-card p-4",
        "border border-[rgba(55,138,221,0.15)]",
      )}
      aria-label={t("mockup_aria")}
    >
      {/* Mockup header bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-danger opacity-70" />
          <span className="w-3 h-3 rounded-full bg-warning opacity-70" />
          <span className="w-3 h-3 rounded-full bg-success opacity-70" />
        </div>
        <div className="flex-1 h-4 bg-[var(--bg-surface)] rounded text-caption text-[var(--text-secondary)] px-2 flex items-center">
          <span className="opacity-50">nowbat.ir/wp-admin</span>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: t("stat_appointments"), value: "۲۴", accent: "brand" },
          { label: t("stat_pending"), value: "۵", accent: "warning" },
          { label: t("stat_revenue"), value: "۱.۲M", accent: "success" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--bg-surface)] rounded p-2.5 border border-[var(--border)]"
          >
            <p className="text-caption text-[var(--text-secondary)] mb-1 truncate">
              {stat.label}
            </p>
            <p
              className={cn(
                "text-heading-sm font-bold",
                stat.accent === "brand" && "text-brand",
                stat.accent === "warning" && "text-warning",
                stat.accent === "success" && "text-success",
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Appointment rows */}
      <div className="space-y-1.5">
        {[
          {
            name: t("appt_name_1"),
            service: t("appt_service_1"),
            status: "confirmed",
            statusLabel: t("status_confirmed"),
          },
          {
            name: t("appt_name_2"),
            service: t("appt_service_2"),
            status: "pending",
            statusLabel: t("status_pending"),
            pulse: true,
          },
          {
            name: t("appt_name_3"),
            service: t("appt_service_3"),
            status: "completed",
            statusLabel: t("status_completed"),
          },
        ].map((appt, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 p-2 rounded bg-[var(--bg-surface)] border border-[var(--border)]"
          >
            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <span className="text-caption font-bold text-white">
                {appt.name.charAt(0)}
              </span>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-caption font-medium text-[var(--text-primary)] truncate">
                {appt.name}
              </p>
              <p className="text-[10px] text-[var(--text-secondary)] truncate">
                {appt.service}
              </p>
            </div>
            {/* Status badge */}
            <span
              className={cn(
                "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-1",
                appt.status === "confirmed" &&
                  "bg-[rgba(29,158,117,0.15)] text-success",
                appt.status === "pending" &&
                  "bg-[rgba(233,165,38,0.15)] text-warning",
                appt.status === "completed" &&
                  "bg-[var(--bg-glass)] text-[var(--text-secondary)]",
              )}
            >
              {appt.pulse && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"
                  aria-hidden="true"
                />
              )}
              {appt.statusLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { HeroSection };
