// ── Guide page types ──────────────────────────────────────────────────────

export type GuideCategory =
  | "payments"
  | "notifications"
  | "calendar"
  | "integrations"
  | "developer";

export interface GuidePage {
  slug: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  descriptionEn: string;
  category: GuideCategory;
  readingTimeMin: number;
}

// ── All guides (ordered for listing) ─────────────────────────────────────

export const ALL_GUIDES: GuidePage[] = [
  {
    slug: "setup-payments",
    titleFa: "راه‌اندازی پرداخت با زرین‌پال",
    titleEn: "Set Up Payments with ZarinPal",
    descriptionFa: "از دریافت کد sandbox تا تست کامل چرخه رزرو → پرداخت → تأیید در محیط واقعی.",
    descriptionEn:
      "From getting a sandbox credential to testing the full booking → payment → verification cycle.",
    category: "payments",
    readingTimeMin: 8,
  },
  {
    slug: "configure-sms",
    titleFa: "پیکربندی پیامک با کاوه‌نگار",
    titleEn: "Configure SMS with Kavenegar",
    descriptionFa: "ثبت‌نام، دریافت API Key، تنظیم قالب OTP، و تست ارسال از پنل نوبت.",
    descriptionEn:
      "Register, get an API Key, set up the OTP template, and send a test SMS from the ProNobat admin panel.",
    category: "notifications",
    readingTimeMin: 6,
  },
  {
    slug: "google-calendar",
    titleFa: "اتصال Google Calendar به نوبت",
    titleEn: "Connect Google Calendar to ProNobat",
    descriptionFa:
      "ساخت OAuth2 App در Google Cloud Console، تنظیم Redirect URI، و اتصال تقویم هر کارمند.",
    descriptionEn:
      "Create an OAuth2 App in Google Cloud Console, set up Redirect URI, and connect each staff member's calendar.",
    category: "calendar",
    readingTimeMin: 10,
  },
  {
    slug: "recurring-appointments",
    titleFa: "نوبت‌های تکرارشونده",
    titleEn: "Recurring Appointments",
    descriptionFa: "ایجاد یک سری نوبت هفتگی، مشاهده نوبت‌های فرزند، و لغو کل سری.",
    descriptionEn:
      "Create a recurring weekly appointment series, view child appointments, and cancel the entire series.",
    category: "integrations",
    readingTimeMin: 5,
  },
  {
    slug: "elementor-integration",
    titleFa: "یکپارچه‌سازی با Elementor",
    titleEn: "Elementor Integration",
    descriptionFa: "درگ کردن ویجت نوبت در Elementor، پیش‌انتخاب سرویس، و انتشار صفحه.",
    descriptionEn:
      "Drag the ProNobat booking widget into an Elementor layout, configure service pre-selection, and publish.",
    category: "integrations",
    readingTimeMin: 5,
  },
  {
    slug: "gutenberg-block",
    titleFa: "استفاده از بلاک Gutenberg",
    titleEn: "Gutenberg Block",
    descriptionFa: "افزودن بلاک فرم رزرو نوبت در ویرایشگر بلاک، تنظیم ویژگی‌ها، و پیش‌نمایش.",
    descriptionEn: "Add the ProNobat booking block in the block editor, set attributes, and preview.",
    category: "integrations",
    readingTimeMin: 4,
  },
  {
    slug: "custom-roles",
    titleFa: "نقش‌های سفارشی و دسترسی‌ها",
    titleEn: "Custom Roles and Capabilities",
    descriptionFa: "ایجاد نقش «منشی ارشد» با `pronobat_manage_appointments` بدون دسترسی به تنظیمات.",
    descriptionEn:
      "Create a 'senior receptionist' role with `pronobat_manage_appointments` but no access to settings.",
    category: "developer",
    readingTimeMin: 6,
  },
];

// ── Category labels ───────────────────────────────────────────────────────

export const GUIDE_CATEGORY_LABELS: Record<GuideCategory, { fa: string; en: string }> = {
  payments: { fa: "پرداخت", en: "Payments" },
  notifications: { fa: "اعلان‌ها", en: "Notifications" },
  calendar: { fa: "تقویم", en: "Calendar" },
  integrations: { fa: "یکپارچه‌سازی", en: "Integrations" },
  developer: { fa: "توسعه‌دهنده", en: "Developer" },
};

// ── Helpers ───────────────────────────────────────────────────────────────

export function getGuideBySlug(slug: string): GuidePage | undefined {
  return ALL_GUIDES.find((g) => g.slug === slug);
}

export function getGuideTitle(guide: GuidePage, locale: string): string {
  return locale === "fa" ? guide.titleFa : guide.titleEn;
}

export function getGuideDescription(guide: GuidePage, locale: string): string {
  return locale === "fa" ? guide.descriptionFa : guide.descriptionEn;
}
