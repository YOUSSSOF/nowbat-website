import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { DemoCtaBanner } from "@/components/marketing";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n";
import {
  loadGuide,
  getAllGuideSlugs,
  getGuideBySlug,
  getGuideTitle,
  GUIDE_CATEGORY_LABELS,
} from "@/lib/guides";
import {
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconBook,
} from "@tabler/icons-react";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  const locales = ["fa", "en"];

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = await loadGuide(slug);
  const guideMeta = getGuideBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";

  if (!guide || !guideMeta) return { title: "Not Found" };

  const pageUrl =
    locale === "fa"
      ? `${siteUrl}/guides/${slug}`
      : `${siteUrl}/en/guides/${slug}`;

  return {
    title: `${guide.frontmatter.title} — راهنماهای نوبت`,
    description: guide.frontmatter.description,
    alternates: { canonical: pageUrl },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = await loadGuide(slug);
  const guideMeta = getGuideBySlug(slug);

  if (!guide || !guideMeta) notFound();

  const isRtl = locale === "fa";
  const BackArrow = isRtl ? IconArrowRight : IconArrowLeft;
  const categoryLabel =
    locale === "fa"
      ? GUIDE_CATEGORY_LABELS[guideMeta.category].fa
      : GUIDE_CATEGORY_LABELS[guideMeta.category].en;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back link */}
          <Button
            as={Link}
            href="/guides"
            variant="ghost"
            size="sm"
            className="mb-8 flex items-center gap-2 text-[var(--text-secondary)] hover:text-brand"
          >
            <BackArrow size={16} />
            {locale === "fa" ? "همه راهنماها" : "All Guides"}
          </Button>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="neutral" size="sm">
                {categoryLabel}
              </Badge>
              <span className="flex items-center gap-1.5 text-caption text-[var(--text-secondary)]">
                <IconClock size={12} />
                {guideMeta.readingTimeMin}{" "}
                {locale === "fa" ? "دقیقه مطالعه" : "min read"}
              </span>
            </div>

            <h1 className="text-display-md font-bold text-[var(--text-primary)] mb-4">
              {guide.frontmatter.title}
            </h1>

            {guide.frontmatter.description && (
              <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
                {guide.frontmatter.description}
              </p>
            )}

            <hr className="mt-8 border-[var(--border)]" />
          </header>

          {/* MDX Content */}
          <article className="prose-nowbat">{guide.content}</article>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex items-center justify-between">
            <Button
              as={Link}
              href="/guides"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <BackArrow size={14} />
              {locale === "fa" ? "همه راهنماها" : "All Guides"}
            </Button>

            <Button
              as={Link}
              href="/docs"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <IconBook size={14} />
              {locale === "fa" ? "مستندات کامل" : "Full Documentation"}
            </Button>
          </div>
        </div>

        <DemoCtaBanner className="mt-24" />
      </main>
      <SiteFooter />
    </>
  );
}
