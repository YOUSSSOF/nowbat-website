import type { DocsSidebarGroup } from "@/components/docs";
import type { PagerLink } from "@/components/docs";

// ── Types ─────────────────────────────────────────────────────────────────

export interface DocPage {
  slug: string; // e.g. "getting-started/installation"
  title: string;
  section: string;
}

// ── All doc pages (ordered for prev/next pager) ───────────────────────────

export const ALL_DOC_PAGES: DocPage[] = [
  // Getting Started
  { slug: "getting-started/installation", title: "نصب", section: "شروع سریع" },
  { slug: "getting-started/first-setup", title: "راه‌اندازی اولیه", section: "شروع سریع" },
  { slug: "getting-started/first-booking", title: "اولین نوبت", section: "شروع سریع" },
  // Configuration
  { slug: "configuration/general", title: "تنظیمات عمومی", section: "تنظیمات" },
  { slug: "configuration/business-hours", title: "ساعت کاری", section: "تنظیمات" },
  { slug: "configuration/payments", title: "درگاه پرداخت", section: "تنظیمات" },
  { slug: "configuration/sms", title: "پیامک", section: "تنظیمات" },
  { slug: "configuration/email", title: "ایمیل", section: "تنظیمات" },
  { slug: "configuration/localization", title: "محلی‌سازی", section: "تنظیمات" },
  { slug: "configuration/advanced", title: "تنظیمات پیشرفته", section: "تنظیمات" },
  // Reference
  { slug: "shortcodes", title: "شورت‌کدها", section: "مرجع" },
  { slug: "rest-api", title: "REST API", section: "مرجع" },
  { slug: "hooks", title: "هوک‌ها و فیلترها", section: "مرجع" },
  // Integrations
  { slug: "integrations/zarinpal", title: "ZarinPal", section: "یکپارچگی‌ها" },
  { slug: "integrations/idpay", title: "IDPay", section: "یکپارچگی‌ها" },
  { slug: "integrations/nextpay", title: "NextPay", section: "یکپارچگی‌ها" },
  { slug: "integrations/kavenegar", title: "Kavenegar", section: "یکپارچگی‌ها" },
  { slug: "integrations/melipayamak", title: "Melipayamak", section: "یکپارچگی‌ها" },
  { slug: "integrations/ippanel", title: "IPPanel", section: "یکپارچگی‌ها" },
  { slug: "integrations/google-calendar", title: "Google Calendar", section: "یکپارچگی‌ها" },
  // Advanced
  { slug: "advanced/custom-roles", title: "نقش‌های سفارشی", section: "پیشرفته" },
  { slug: "advanced/extending", title: "گسترش نوبت", section: "پیشرفته" },
  { slug: "advanced/gdpr", title: "حریم خصوصی", section: "پیشرفته" },
  // Other
  { slug: "troubleshooting", title: "رفع مشکلات", section: "سایر" },
  { slug: "changelog", title: "تاریخچه", section: "سایر" },
];

// ── Sidebar groups ────────────────────────────────────────────────────────

export function buildSidebarGroups(): DocsSidebarGroup[] {
  return [
    {
      title: "شروع سریع",
      items: [
        { href: "/docs/getting-started/installation", label: "نصب" },
        { href: "/docs/getting-started/first-setup", label: "راه‌اندازی اولیه" },
        { href: "/docs/getting-started/first-booking", label: "اولین نوبت" },
      ],
    },
    {
      title: "تنظیمات",
      items: [
        { href: "/docs/configuration/general", label: "تنظیمات عمومی" },
        { href: "/docs/configuration/business-hours", label: "ساعت کاری" },
        { href: "/docs/configuration/payments", label: "درگاه پرداخت" },
        { href: "/docs/configuration/sms", label: "پیامک" },
        { href: "/docs/configuration/email", label: "ایمیل" },
        { href: "/docs/configuration/localization", label: "محلی‌سازی" },
        { href: "/docs/configuration/advanced", label: "پیشرفته" },
      ],
    },
    {
      title: "مرجع",
      items: [
        { href: "/docs/shortcodes", label: "شورت‌کدها" },
        { href: "/docs/rest-api", label: "REST API" },
        { href: "/docs/hooks", label: "هوک‌ها و فیلترها" },
      ],
    },
    {
      title: "یکپارچگی‌ها",
      items: [
        { href: "/docs/integrations/zarinpal", label: "ZarinPal" },
        { href: "/docs/integrations/idpay", label: "IDPay" },
        { href: "/docs/integrations/nextpay", label: "NextPay" },
        { href: "/docs/integrations/kavenegar", label: "Kavenegar" },
        { href: "/docs/integrations/melipayamak", label: "Melipayamak" },
        { href: "/docs/integrations/ippanel", label: "IPPanel" },
        { href: "/docs/integrations/google-calendar", label: "Google Calendar" },
      ],
    },
    {
      title: "پیشرفته",
      items: [
        { href: "/docs/advanced/custom-roles", label: "نقش‌های سفارشی" },
        { href: "/docs/advanced/extending", label: "گسترش نوبت" },
        { href: "/docs/advanced/gdpr", label: "حریم خصوصی" },
      ],
    },
    {
      title: "سایر",
      items: [
        { href: "/docs/troubleshooting", label: "رفع مشکلات" },
        { href: "/docs/changelog", label: "تاریخچه" },
      ],
    },
  ];
}

// ── Prev/Next pager helpers ────────────────────────────────────────────────

export function getPagerLinks(slug: string): { prev: PagerLink | null; next: PagerLink | null } {
  const idx = ALL_DOC_PAGES.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const prevPage = idx > 0 ? ALL_DOC_PAGES[idx - 1] : null;
  const nextPage = idx < ALL_DOC_PAGES.length - 1 ? ALL_DOC_PAGES[idx + 1] : null;

  return {
    prev: prevPage ? { href: `/docs/${prevPage.slug}`, label: prevPage.title } : null,
    next: nextPage ? { href: `/docs/${nextPage.slug}`, label: nextPage.title } : null,
  };
}

// ── Search documents ──────────────────────────────────────────────────────

export function buildSearchDocuments() {
  return ALL_DOC_PAGES.map((p) => ({
    title: p.title,
    href: `/docs/${p.slug}`,
    section: p.section,
  }));
}
