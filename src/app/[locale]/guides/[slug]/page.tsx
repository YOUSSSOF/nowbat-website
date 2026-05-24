import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { DemoCtaBanner } from "@/components/marketing";
import { Link } from "@/lib/i18n";
import { ALL_GUIDES, getGuideBySlug, loadGuide } from "@/lib/guides";
import { IconArrowRight, IconClock, IconArrowLeft } from "@tabler/icons-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pronobat.ir";

  if (!guide) return { title: "Not Found" };

  return {
    title: `${guide.titleFa} — راهنماهای نوبت`,
    description: guide.descriptionFa,
    alternates: {
      canonical: `${siteUrl}/guides/${slug}`,
    },
  };
}

export default async function GuideSlugPage({ params }: Props) {
  const { slug } = await params;
  const guideMeta = getGuideBySlug(slug);
  if (!guideMeta) notFound();

  const guide = await loadGuide(slug);
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
          <div className="prose-pronobat">{guide.content}</div>

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
