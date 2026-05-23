import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  IconCalendar,
  IconCreditCard,
  IconMessage,
  IconChartBar,
  IconUsers,
  IconRepeat,
} from "@tabler/icons-react";

interface FeaturePillData {
  Icon: React.ElementType;
  labelKey: string;
}

const FEATURE_PILLS: FeaturePillData[] = [
  { Icon: IconCalendar, labelKey: "jalali_calendar" },
  { Icon: IconCreditCard, labelKey: "payment_gateways" },
  { Icon: IconMessage, labelKey: "sms_notifications" },
  { Icon: IconChartBar, labelKey: "reports_analytics" },
  { Icon: IconUsers, labelKey: "staff_management" },
  { Icon: IconRepeat, labelKey: "recurring_appointments" },
];

function FeatureStrip({ className }: { className?: string }) {
  const t = useTranslations("FeatureStrip");

  return (
    <div
      className={cn("w-full overflow-x-auto py-6", className)}
      aria-label={t("ariaLabel")}
    >
      <ul
        className="flex gap-3 px-6 mx-auto max-w-container-xl w-max sm:w-auto sm:flex-wrap sm:justify-center"
        role="list"
      >
        {FEATURE_PILLS.map(({ Icon, labelKey }) => (
          <li key={labelKey}>
            <span
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full",
                "text-body-sm font-medium",
                "bg-[var(--bg-glass)] border border-[var(--border)]",
                "text-[var(--text-secondary)]",
                "whitespace-nowrap",
              )}
            >
              <Icon size={15} className="text-brand shrink-0" aria-hidden="true" />
              {t(labelKey as Parameters<typeof t>[0])}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { FeatureStrip };
