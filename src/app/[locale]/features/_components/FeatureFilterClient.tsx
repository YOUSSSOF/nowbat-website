"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCalendar,
  IconList,
  IconUsers,
  IconClock,
  IconClockPause,
  IconChairDirector,
  IconHourglass,
  IconAddressBook,
  IconCircleCheck,
  IconCreditCard,
  IconShieldCheck,
  IconRefresh,
  IconReceipt,
  IconTestPipe,
  IconMessage,
  IconMail,
  IconBellOff,
  IconGauge,
  IconFileText,
  IconAlarm,
  IconCalendarEvent,
  IconCalendarStats,
  IconCalendarX,
  IconBrandGoogle,
  IconDownload,
  IconRepeat,
  IconBrandWordpress,
  IconLayoutDashboard,
  IconCode,
  IconApi,
  IconLock,
  IconBrandPhp,
  IconWebhook,
  IconPlug,
  IconSpeedboat,
  IconShield,
  IconBug,
  IconLanguage,
} from "@tabler/icons-react";
import type { Feature, FeatureCategory } from "../_data/features";
import { CATEGORIES } from "../_data/features";

// Map icon name → component
const ICON_MAP: Record<string, React.ElementType> = {
  IconCalendar,
  IconList,
  IconUsers,
  IconClock,
  IconClockPause,
  IconChairDirector,
  IconHourglass,
  IconAddressBook,
  IconCircleCheck,
  IconCreditCard,
  IconShieldCheck,
  IconRefresh,
  IconReceipt,
  IconTestPipe,
  IconMessage,
  IconMail,
  IconBellOff,
  IconGauge,
  IconFileText,
  IconAlarm,
  IconCalendarEvent,
  IconCalendarStats,
  IconCalendarX,
  IconBrandGoogle,
  IconDownload,
  IconRepeat,
  IconBrandWordpress,
  IconLayoutDashboard,
  IconCode,
  IconApi,
  IconLock,
  IconBrandPhp,
  IconWebhook,
  IconPlug,
  IconSpeedboat,
  IconShield,
  IconBug,
  IconLanguage,
};

interface FeatureRowData extends Feature {
  title: string;
  description: string;
}

interface FeatureFilterClientProps {
  features: FeatureRowData[];
  labels: {
    all: string;
    core: string;
    payments: string;
    notifications: string;
    calendar: string;
    integrations: string;
    developer: string;
    filterLabel: string;
  };
}

export function FeatureFilterClient({ features, labels }: FeatureFilterClientProps) {
  const [active, setActive] = React.useState<FeatureCategory | "all">("all");

  const filtered = active === "all" ? features : features.filter((f) => f.category === active);

  const chips: Array<{ key: FeatureCategory | "all"; label: string }> = [
    { key: "all", label: labels.all },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: labels[c],
    })),
  ];

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={labels.filterLabel}>
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setActive(chip.key)}
            className={cn(
              "px-4 py-1.5 rounded-full text-body-sm font-medium",
              "border transition-all duration-150",
              "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",
              active === chip.key
                ? "bg-brand text-white border-brand"
                : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[rgba(55,138,221,0.4)] hover:text-[var(--text-primary)]",
            )}
            aria-pressed={active === chip.key}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Feature rows */}
      <motion.ul className="space-y-3" layout>
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((feature) => {
            const Icon = ICON_MAP[feature.icon] ?? IconList;
            return (
              <motion.li
                key={feature.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard hover padding="sm" className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 w-10 h-10 rounded-lg",
                      "flex items-center justify-center",
                      "bg-[var(--brand-glow)] border border-[rgba(55,138,221,0.2)]",
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={20} className="text-brand" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-body text-[var(--text-primary)] mb-1">
                      {feature.title}
                    </p>
                    <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Category pill */}
                  <span
                    className={cn(
                      "shrink-0 hidden sm:block",
                      "px-2.5 py-0.5 rounded-full text-caption font-medium",
                      "border",
                      getCategoryStyles(feature.category),
                    )}
                  >
                    {labels[feature.category]}
                  </span>
                </GlassCard>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function getCategoryStyles(cat: FeatureCategory): string {
  switch (cat) {
    case "payments":
      return "bg-[rgba(29,158,117,0.1)] border-[rgba(29,158,117,0.3)] text-success";
    case "notifications":
      return "bg-[rgba(233,165,38,0.1)] border-[rgba(233,165,38,0.3)] text-warning";
    case "calendar":
      return "bg-[rgba(55,138,221,0.1)] border-[rgba(55,138,221,0.3)] text-brand";
    case "integrations":
      return "bg-[rgba(226,75,74,0.1)] border-[rgba(226,75,74,0.3)] text-danger";
    case "developer":
      return "bg-[rgba(136,136,170,0.1)] border-[rgba(136,136,170,0.2)] text-[var(--text-secondary)]";
    default: // core
      return "bg-[rgba(55,138,221,0.08)] border-[rgba(55,138,221,0.2)] text-brand";
  }
}
