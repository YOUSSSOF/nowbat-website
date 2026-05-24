import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { DemoCtaBanner } from "@/components/marketing";
import { FeatureFilterClient } from "./_components/FeatureFilterClient";
import { FEATURES } from "./_data/features";
import type { FeatureCategory } from "./_data/features";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FeaturesPage" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";
  const pageUrl = `${siteUrl}/features`;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: pageUrl,
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

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FeaturesPage" });

  // Hydrate features with translated strings
  const featuresWithText = FEATURES.map((f) => ({
    ...f,
    title: t(`${f.id}_title` as Parameters<typeof t>[0]),
    description: t(`${f.id}_desc` as Parameters<typeof t>[0]),
  }));

  const categoryLabels = {
    all: t("cat_all"),
    core: t("cat_core"),
    payments: t("cat_payments"),
    notifications: t("cat_notifications"),
    calendar: t("cat_calendar"),
    integrations: t("cat_integrations"),
    developer: t("cat_developer"),
    filterLabel: t("filter_label"),
  };

  // Server-side hidden table for SEO
  const featuresByCategory = FEATURES.reduce(
    (acc, f) => {
      if (!acc[f.category]) acc[f.category] = [];
      acc[f.category].push(f);
      return acc;
    },
    {} as Record<FeatureCategory, typeof FEATURES>,
  );

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

            {/* Count badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(55,138,221,0.3)] bg-[var(--brand-glow)]">
              <span className="text-body-sm font-semibold text-brand">
                {featuresWithText.length}
              </span>
              <span className="text-body-sm text-[var(--text-secondary)]">
                {t("feature_count_label")}
              </span>
            </div>
          </div>
        </section>

        {/* ── Filter + Feature list ────────────────────────────────────── */}
        <section className="pb-20 px-6">
          <div className="mx-auto max-w-container-xl">
            <FeatureFilterClient features={featuresWithText} labels={categoryLabels} />
          </div>
        </section>

        {/* ── SEO hidden table (screen-reader + crawlers) ──────────────── */}
        <div className="sr-only" aria-hidden="true">
          <table>
            <caption>{t("title")}</caption>
            <thead>
              <tr>
                <th>{t("col_feature")}</th>
                <th>{t("col_category")}</th>
                <th>{t("col_description")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(featuresByCategory).map(([cat, features]) =>
                features.map((f) => (
                  <tr key={f.id}>
                    <td>{t(`${f.id}_title` as Parameters<typeof t>[0])}</td>
                    <td>{t(`cat_${cat}` as Parameters<typeof t>[0])}</td>
                    <td>{t(`${f.id}_desc` as Parameters<typeof t>[0])}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <DemoCtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
