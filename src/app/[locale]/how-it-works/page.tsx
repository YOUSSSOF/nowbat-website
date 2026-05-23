import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { DemoCtaBanner } from "@/components/marketing";
import { CodeBlock } from "@/components/ui";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowItWorksPage" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";
  const pageUrl = locale === "fa" ? `${siteUrl}/how-it-works` : `${siteUrl}/en/how-it-works`;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fa: `${siteUrl}/how-it-works`,
        en: `${siteUrl}/en/how-it-works`,
      },
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: t("meta_title"),
      description: t("meta_description"),
      siteName: "نوبت",
    },
  };
}

// ── Step data ───────────────────────────────────────────────────────────────
const STEP_CODES = {
  install: `# دانلود از مخزن وردپرس
wp plugin install nowbat --activate

# یا آپلود مستقیم فایل ZIP
wp plugin install /path/to/nowbat.zip --activate`,

  shortcode: `<!-- قرار دادن فرم رزرو در هر صفحه -->
[nowbat_booking]

<!-- یا با پیش‌انتخاب خدمت -->
[nowbat_booking service_id="1"]

<!-- یا با پیش‌انتخاب کارمند -->
[nowbat_booking staff_id="2"]`,

  notification: `// هوک PHP برای اعلان سفارشی
add_action( 'nowbat_appointment_confirmed', function( $appointment_id ) {
    $appointment = nowbat_get_appointment( $appointment_id );
    // ارسال اعلان سفارشی
    my_custom_notification( $appointment );
} );`,
};

export default async function HowItWorksPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowItWorksPage" });

  const steps = [
    {
      number: 1,
      titleKey: "step1_title" as const,
      descKey: "step1_desc" as const,
      codeKey: "install" as keyof typeof STEP_CODES,
      codeLang: "bash",
      codeFilename: "WP-CLI",
      noteKey: "step1_note" as const,
    },
    {
      number: 2,
      titleKey: "step2_title" as const,
      descKey: "step2_desc" as const,
      codeKey: null,
      detailKeys: ["step2_detail1", "step2_detail2", "step2_detail3", "step2_detail4"] as const,
    },
    {
      number: 3,
      titleKey: "step3_title" as const,
      descKey: "step3_desc" as const,
      codeKey: null,
      detailKeys: ["step3_detail1", "step3_detail2", "step3_detail3", "step3_detail4"] as const,
    },
    {
      number: 4,
      titleKey: "step4_title" as const,
      descKey: "step4_desc" as const,
      codeKey: "shortcode" as keyof typeof STEP_CODES,
      codeLang: "html",
      codeFilename: "page.html",
      noteKey: "step4_note" as const,
    },
    {
      number: 5,
      titleKey: "step5_title" as const,
      descKey: "step5_desc" as const,
      codeKey: "notification" as keyof typeof STEP_CODES,
      codeLang: "php",
      codeFilename: "functions.php",
      noteKey: "step5_note" as const,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-12 px-6">
          <div className="mx-auto max-w-container-xl text-center">
            <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-4">
              {t("overline")}
            </p>
            <h1 className="text-display-xl font-bold text-[var(--text-primary)] mb-5">
              {t("title")}
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* ── Steps ───────────────────────────────────────────────────── */}
        <section className="pb-24 px-6">
          <div className="mx-auto max-w-container-md space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-6">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <span
                    className="absolute top-12 start-5 bottom-0 w-px bg-[var(--border)]"
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <div className="shrink-0 relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full",
                      "flex items-center justify-center",
                      "border-2 border-brand bg-[var(--brand-glow)]",
                      "text-body-sm font-bold text-brand",
                    )}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className={cn("flex-1 pb-14 min-w-0", index === steps.length - 1 && "pb-0")}>
                  <h2 className="text-heading-xl font-bold text-[var(--text-primary)] mb-3 leading-10">
                    {t(step.titleKey)}
                  </h2>
                  <p className="text-body text-[var(--text-secondary)] leading-relaxed mb-5">
                    {t(step.descKey)}
                  </p>

                  {/* Bullet detail list */}
                  {"detailKeys" in step && step.detailKeys && (
                    <GlassCard padding="md" className="mb-5">
                      <ul className="space-y-3">
                        {step.detailKeys.map((key) => (
                          <li key={key} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-body-sm text-[var(--text-secondary)]">
                              {t(key as Parameters<typeof t>[0])}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  )}

                  {/* Code block */}
                  {step.codeKey && STEP_CODES[step.codeKey] && (
                    <div className="mb-4">
                      <CodeBlock
                        code={STEP_CODES[step.codeKey]}
                        lang={step.codeLang ?? "text"}
                        filename={step.codeFilename}
                      />
                    </div>
                  )}

                  {/* Note */}
                  {"noteKey" in step && step.noteKey && (
                    <p className="text-body-sm text-[var(--text-secondary)] opacity-70 italic">
                      {t(step.noteKey as Parameters<typeof t>[0])}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <DemoCtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
