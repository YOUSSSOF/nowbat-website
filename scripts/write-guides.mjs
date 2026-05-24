import { writeFileSync, readFileSync } from 'fs';

// ── [locale]/guides/page.tsx ──────────────────────────────────────────────
const guidesPage = `import * as React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { DemoCtaBanner } from "@/components/marketing";
import { Link } from "@/lib/i18n";
import { ALL_GUIDES, GUIDE_CATEGORY_LABELS } from "@/lib/guides";
import { IconBook, IconClock, IconArrowLeft } from "@tabler/icons-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GuidesPage" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: \`\${siteUrl}/guides\`,
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      url: \`\${siteUrl}/guides\`,
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GuidesPage" });

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 mb-16">
          <div className="mx-auto max-w-container-xl text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: "var(--brand-glow)",
                border: "1px solid rgba(55,138,221,0.3)",
              }}
            >
              <IconBook size={14} className="text-brand" />
              <span className="text-caption text-brand font-medium">{t("badge")}</span>
            </div>

            <h1 className="text-display-lg font-bold text-[var(--text-primary)] mb-4">
              {t("title")}
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Guides grid */}
        <section className="px-6">
          <div className="mx-auto max-w-container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_GUIDES.map((guide) => {
                const categoryLabel = GUIDE_CATEGORY_LABELS[guide.category].fa;

                return (
                  <GlassCard
                    key={guide.slug}
                    className="p-6 flex flex-col gap-4 group hover:border-[rgba(55,138,221,0.3)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="neutral" size="sm">
                        {categoryLabel}
                      </Badge>
                      <span className="flex items-center gap-1 text-caption text-[var(--text-secondary)]">
                        <IconClock size={12} />
                        {guide.readingTimeMin} دقیقه
                      </span>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-heading-sm font-semibold text-[var(--text-primary)] mb-2 group-hover:text-brand transition-colors">
                        {guide.titleFa}
                      </h2>
                      <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                        {guide.descriptionFa}
                      </p>
                    </div>

                    <Link
                      href={\`/guides/\${guide.slug}\`}
                      className="self-start inline-flex items-center gap-2 px-3 py-1.5 text-body-sm rounded font-medium transition-colors duration-150 text-brand border border-brand hover:bg-[var(--brand-glow)]"
                    >
                      مطالعه راهنما
                      <IconArrowLeft size={14} />
                    </Link>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <DemoCtaBanner className="mt-24" />
      </main>
      <SiteFooter />
    </>
  );
}
`;
writeFileSync('src/app/[locale]/guides/page.tsx', guidesPage);
console.log('guides/page.tsx written');

// ── [locale]/guides/[slug]/page.tsx ──────────────────────────────────────
const guideSlugPage = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { DemoCtaBanner } from "@/components/marketing";
import { Link } from "@/lib/i18n";
import { ALL_GUIDES, getGuideBySlug } from "@/lib/guides";
import { loadGuidePage } from "@/lib/guides/mdx";
import { IconArrowRight, IconClock, IconArrowLeft } from "@tabler/icons-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";

  if (!guide) return { title: "Not Found" };

  return {
    title: \`\${guide.titleFa} — راهنماهای نوبت\`,
    description: guide.descriptionFa,
    alternates: {
      canonical: \`\${siteUrl}/guides/\${slug}\`,
    },
  };
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const guideMeta = getGuideBySlug(slug);
  if (!guideMeta) notFound();

  const guide = await loadGuidePage(slug);
  if (!guide) notFound();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)] hover:text-brand transition-colors mb-8"
          >
            <IconArrowRight size={14} />
            همه راهنماها
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 text-caption text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <IconClock size={13} />
                {guideMeta.readingTimeMin} دقیقه مطالعه
              </span>
            </div>
            <h1 className="text-display-md font-bold text-[var(--text-primary)] leading-tight mb-4">
              {guideMeta.titleFa}
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
              {guideMeta.descriptionFa}
            </p>
          </header>

          {/* MDX Content */}
          <div className="docs-content prose-invert">{guide.content}</div>

          {/* Footer navigation */}
          <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)] hover:text-brand transition-colors"
            >
              <IconArrowRight size={14} />
              همه راهنماها
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)] hover:text-brand transition-colors"
            >
              مستندات کامل
              <IconArrowLeft size={14} />
            </Link>
          </div>

          <div className="mt-16">
            <DemoCtaBanner />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
`;
writeFileSync('src/app/[locale]/guides/[slug]/page.tsx', guideSlugPage);
console.log('guides/[slug]/page.tsx written');
