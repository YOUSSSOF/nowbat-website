/**
 * Comprehensive feature list for the /features page.
 * Each feature belongs to one category and maps to translation keys.
 *
 * Translation key pattern: `Features.<id>_title` / `Features.<id>_desc`
 */

export type FeatureCategory =
  | "core"
  | "payments"
  | "notifications"
  | "calendar"
  | "integrations"
  | "developer";

export interface Feature {
  id: string;
  category: FeatureCategory;
  icon: string; // Tabler icon name, e.g. "IconCalendar"
}

export const FEATURES: Feature[] = [
  // ── Core ──────────────────────────────────────────────────────────────────
  {
    id: "jalali_calendar",
    category: "core",
    icon: "IconCalendar",
  },
  {
    id: "multi_service",
    category: "core",
    icon: "IconList",
  },
  {
    id: "multi_staff",
    category: "core",
    icon: "IconUsers",
  },
  {
    id: "working_hours",
    category: "core",
    icon: "IconClock",
  },
  {
    id: "buffer_time",
    category: "core",
    icon: "IconClockPause",
  },
  {
    id: "appointment_capacity",
    category: "core",
    icon: "IconChairDirector",
  },
  {
    id: "service_duration",
    category: "core",
    icon: "IconHourglass",
  },
  {
    id: "customer_management",
    category: "core",
    icon: "IconAddressBook",
  },
  {
    id: "appointment_statuses",
    category: "core",
    icon: "IconCircleCheck",
  },
  // ── Payments ──────────────────────────────────────────────────────────────
  {
    id: "zarinpal",
    category: "payments",
    icon: "IconCreditCard",
  },
  {
    id: "idpay",
    category: "payments",
    icon: "IconCreditCard",
  },
  {
    id: "nextpay",
    category: "payments",
    icon: "IconCreditCard",
  },
  {
    id: "server_side_verify",
    category: "payments",
    icon: "IconShieldCheck",
  },
  {
    id: "refunds",
    category: "payments",
    icon: "IconRefresh",
  },
  {
    id: "payment_log",
    category: "payments",
    icon: "IconReceipt",
  },
  {
    id: "sandbox_mode",
    category: "payments",
    icon: "IconTestPipe",
  },
  // ── Notifications ─────────────────────────────────────────────────────────
  {
    id: "kavenegar",
    category: "notifications",
    icon: "IconMessage",
  },
  {
    id: "melipayamak",
    category: "notifications",
    icon: "IconMessage",
  },
  {
    id: "ippanel",
    category: "notifications",
    icon: "IconMessage",
  },
  {
    id: "email_notifications",
    category: "notifications",
    icon: "IconMail",
  },
  {
    id: "sms_opt_out",
    category: "notifications",
    icon: "IconBellOff",
  },
  {
    id: "daily_sms_cap",
    category: "notifications",
    icon: "IconGauge",
  },
  {
    id: "notification_log",
    category: "notifications",
    icon: "IconFileText",
  },
  {
    id: "reminder_cron",
    category: "notifications",
    icon: "IconAlarm",
  },
  // ── Calendar ──────────────────────────────────────────────────────────────
  {
    id: "jalali_datepicker",
    category: "calendar",
    icon: "IconCalendarEvent",
  },
  {
    id: "staff_calendar_view",
    category: "calendar",
    icon: "IconCalendarStats",
  },
  {
    id: "availability_blocking",
    category: "calendar",
    icon: "IconCalendarX",
  },
  {
    id: "google_calendar_sync",
    category: "calendar",
    icon: "IconBrandGoogle",
  },
  {
    id: "ics_export",
    category: "calendar",
    icon: "IconDownload",
  },
  {
    id: "recurring_appointments",
    category: "calendar",
    icon: "IconRepeat",
  },
  // ── Integrations ──────────────────────────────────────────────────────────
  {
    id: "gutenberg_block",
    category: "integrations",
    icon: "IconBrandWordpress",
  },
  {
    id: "elementor_widget",
    category: "integrations",
    icon: "IconLayoutDashboard",
  },
  {
    id: "shortcode",
    category: "integrations",
    icon: "IconCode",
  },
  {
    id: "rest_api",
    category: "integrations",
    icon: "IconApi",
  },
  {
    id: "wp_roles",
    category: "integrations",
    icon: "IconLock",
  },
  // ── Developer ─────────────────────────────────────────────────────────────
  {
    id: "psr4_autoload",
    category: "developer",
    icon: "IconBrandPhp",
  },
  {
    id: "hooks_filters",
    category: "developer",
    icon: "IconWebhook",
  },
  {
    id: "custom_gateway_interface",
    category: "developer",
    icon: "IconPlug",
  },
  {
    id: "rate_limiting",
    category: "developer",
    icon: "IconSpeedboat",
  },
  {
    id: "gdpr_tools",
    category: "developer",
    icon: "IconShield",
  },
  {
    id: "phpstan_level6",
    category: "developer",
    icon: "IconBug",
  },
  {
    id: "i18n_ready",
    category: "developer",
    icon: "IconLanguage",
  },
];

export const CATEGORIES: FeatureCategory[] = [
  "core",
  "payments",
  "notifications",
  "calendar",
  "integrations",
  "developer",
];
