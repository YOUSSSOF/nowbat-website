import type { DocsSidebarGroup } from "@/components/docs";
import type { PagerLink } from "@/components/docs";

// ── Types ─────────────────────────────────────────────────────────────────

export interface DocPage {
  slug: string; // e.g. "getting-started/installation"
  title: string;
  titleFa: string;
  section: string;
}

// ── All doc pages (ordered for prev/next pager) ───────────────────────────

export const ALL_DOC_PAGES: DocPage[] = [
  // Getting Started
  {
    slug: "getting-started/installation",
    title: "Installation",
    titleFa: "نصب",
    section: "Getting Started",
  },
  {
    slug: "getting-started/first-setup",
    title: "First Setup",
    titleFa: "راه‌اندازی اولیه",
    section: "Getting Started",
  },
  {
    slug: "getting-started/first-booking",
    title: "Your First Booking",
    titleFa: "اولین نوبت",
    section: "Getting Started",
  },
  // Configuration
  {
    slug: "configuration/general",
    title: "General Settings",
    titleFa: "تنظیمات عمومی",
    section: "Configuration",
  },
  {
    slug: "configuration/business-hours",
    title: "Business Hours",
    titleFa: "ساعت کاری",
    section: "Configuration",
  },
  {
    slug: "configuration/payments",
    title: "Payment Gateways",
    titleFa: "درگاه پرداخت",
    section: "Configuration",
  },
  {
    slug: "configuration/sms",
    title: "SMS Notifications",
    titleFa: "پیامک",
    section: "Configuration",
  },
  {
    slug: "configuration/email",
    title: "Email Notifications",
    titleFa: "ایمیل",
    section: "Configuration",
  },
  {
    slug: "configuration/localization",
    title: "Localization",
    titleFa: "محلی‌سازی",
    section: "Configuration",
  },
  {
    slug: "configuration/advanced",
    title: "Advanced Settings",
    titleFa: "تنظیمات پیشرفته",
    section: "Configuration",
  },
  // Reference
  {
    slug: "shortcodes",
    title: "Shortcodes",
    titleFa: "شورت‌کدها",
    section: "Reference",
  },
  {
    slug: "rest-api",
    title: "REST API",
    titleFa: "REST API",
    section: "Reference",
  },
  {
    slug: "hooks",
    title: "Hooks & Filters",
    titleFa: "هوک‌ها و فیلترها",
    section: "Reference",
  },
  // Integrations
  {
    slug: "integrations/zarinpal",
    title: "ZarinPal",
    titleFa: "زرین‌پال",
    section: "Integrations",
  },
  {
    slug: "integrations/idpay",
    title: "IDPay",
    titleFa: "آیدی‌پی",
    section: "Integrations",
  },
  {
    slug: "integrations/nextpay",
    title: "NextPay",
    titleFa: "نکست‌پی",
    section: "Integrations",
  },
  {
    slug: "integrations/kavenegar",
    title: "Kavenegar",
    titleFa: "کاوه‌نگار",
    section: "Integrations",
  },
  {
    slug: "integrations/melipayamak",
    title: "Melipayamak",
    titleFa: "ملی‌پیامک",
    section: "Integrations",
  },
  {
    slug: "integrations/ippanel",
    title: "IPPanel",
    titleFa: "آی‌پی‌پنل",
    section: "Integrations",
  },
  {
    slug: "integrations/google-calendar",
    title: "Google Calendar",
    titleFa: "گوگل کلندر",
    section: "Integrations",
  },
  // Advanced
  {
    slug: "advanced/custom-roles",
    title: "Custom Roles",
    titleFa: "نقش‌های سفارشی",
    section: "Advanced",
  },
  {
    slug: "advanced/extending",
    title: "Extending Nowbat",
    titleFa: "گسترش نوبت",
    section: "Advanced",
  },
  {
    slug: "advanced/gdpr",
    title: "GDPR & Privacy",
    titleFa: "حریم خصوصی",
    section: "Advanced",
  },
  // Other
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    titleFa: "رفع مشکلات",
    section: "Other",
  },
  { slug: "changelog", title: "Changelog", titleFa: "تاریخچه", section: "Other" },
];

// ── Sidebar groups ─────────────────────────────────────────────────────────

export function buildSidebarGroups(locale: string): DocsSidebarGroup[] {
  const prefix = locale === "fa" ? "/docs" : "/en/docs";

  function href(slug: string) {
    return `${prefix}/${slug}`;
  }

  return [
    {
      title: locale === "fa" ? "شروع سریع" : "Getting Started",
      items: [
        {
          href: href("getting-started/installation"),
          label: locale === "fa" ? "نصب" : "Installation",
        },
        {
          href: href("getting-started/first-setup"),
          label: locale === "fa" ? "راه‌اندازی اولیه" : "First Setup",
        },
        {
          href: href("getting-started/first-booking"),
          label: locale === "fa" ? "اولین نوبت" : "Your First Booking",
        },
      ],
    },
    {
      title: locale === "fa" ? "تنظیمات" : "Configuration",
      items: [
        {
          href: href("configuration/general"),
          label: locale === "fa" ? "تنظیمات عمومی" : "General",
        },
        {
          href: href("configuration/business-hours"),
          label: locale === "fa" ? "ساعت کاری" : "Business Hours",
        },
        {
          href: href("configuration/payments"),
          label: locale === "fa" ? "درگاه پرداخت" : "Payments",
        },
        { href: href("configuration/sms"), label: "SMS" },
        { href: href("configuration/email"), label: locale === "fa" ? "ایمیل" : "Email" },
        {
          href: href("configuration/localization"),
          label: locale === "fa" ? "محلی‌سازی" : "Localization",
        },
        {
          href: href("configuration/advanced"),
          label: locale === "fa" ? "پیشرفته" : "Advanced",
        },
      ],
    },
    {
      title: locale === "fa" ? "مرجع" : "Reference",
      items: [
        {
          href: href("shortcodes"),
          label: locale === "fa" ? "شورت‌کدها" : "Shortcodes",
        },
        { href: href("rest-api"), label: "REST API" },
        {
          href: href("hooks"),
          label: locale === "fa" ? "هوک‌ها و فیلترها" : "Hooks & Filters",
        },
      ],
    },
    {
      title: locale === "fa" ? "یکپارچگی‌ها" : "Integrations",
      items: [
        { href: href("integrations/zarinpal"), label: "ZarinPal" },
        { href: href("integrations/idpay"), label: "IDPay" },
        { href: href("integrations/nextpay"), label: "NextPay" },
        { href: href("integrations/kavenegar"), label: "Kavenegar" },
        { href: href("integrations/melipayamak"), label: "Melipayamak" },
        { href: href("integrations/ippanel"), label: "IPPanel" },
        { href: href("integrations/google-calendar"), label: "Google Calendar" },
      ],
    },
    {
      title: locale === "fa" ? "پیشرفته" : "Advanced",
      items: [
        {
          href: href("advanced/custom-roles"),
          label: locale === "fa" ? "نقش‌های سفارشی" : "Custom Roles",
        },
        {
          href: href("advanced/extending"),
          label: locale === "fa" ? "گسترش نوبت" : "Extending Nowbat",
        },
        {
          href: href("advanced/gdpr"),
          label: locale === "fa" ? "حریم خصوصی" : "GDPR & Privacy",
        },
      ],
    },
    {
      title: locale === "fa" ? "سایر" : "Other",
      items: [
        {
          href: href("troubleshooting"),
          label: locale === "fa" ? "رفع مشکلات" : "Troubleshooting",
        },
        {
          href: href("changelog"),
          label: locale === "fa" ? "تاریخچه" : "Changelog",
        },
      ],
    },
  ];
}

// ── Prev/Next pager helpers ────────────────────────────────────────────────

export function getPagerLinks(
  slug: string,
  locale: string,
): { prev: PagerLink | null; next: PagerLink | null } {
  const prefix = locale === "fa" ? "/docs" : "/en/docs";
  const idx = ALL_DOC_PAGES.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const prevPage = idx > 0 ? ALL_DOC_PAGES[idx - 1] : null;
  const nextPage = idx < ALL_DOC_PAGES.length - 1 ? ALL_DOC_PAGES[idx + 1] : null;

  return {
    prev: prevPage
      ? {
          href: `${prefix}/${prevPage.slug}`,
          label: locale === "fa" ? prevPage.titleFa : prevPage.title,
        }
      : null,
    next: nextPage
      ? {
          href: `${prefix}/${nextPage.slug}`,
          label: locale === "fa" ? nextPage.titleFa : nextPage.title,
        }
      : null,
  };
}

// ── Search documents (all pages as searchable records) ─────────────────────

export function buildSearchDocuments(locale: string) {
  const prefix = locale === "fa" ? "/docs" : "/en/docs";
  return ALL_DOC_PAGES.map((p) => ({
    title: locale === "fa" ? p.titleFa : p.title,
    href: `${prefix}/${p.slug}`,
    section: p.section,
  }));
}
