import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DocsHeader, OnThisPage, DocsPager } from "@/components/docs";
import { DemoCtaBanner } from "@/components/marketing";
import { loadDocPage, getAllDocSlugs, getPagerLinks, buildSidebarGroups } from "@/lib/docs";

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  const locales = ["fa", "en"];

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  const doc = await loadDocPage(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";

  if (!doc) return { title: "Not Found" };

  const slugStr = slug.join("/");
  const pageUrl = locale === "fa" ? `${siteUrl}/docs/${slugStr}` : `${siteUrl}/en/docs/${slugStr}`;

  return {
    title: `${doc.frontmatter.title} — مستندات نوبت`,
    description: doc.frontmatter.description,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug = [] } = await params;
  const t = await getTranslations({ locale, namespace: "Docs" });

  const doc = await loadDocPage(slug);
  if (!doc) notFound();

  const slugStr = slug.join("/");
  const { prev, next } = getPagerLinks(slugStr, locale);
  const groups = buildSidebarGroups(locale);

  // Build breadcrumbs from slug + sidebar groups
  const breadcrumbs = buildBreadcrumbs(slug, groups, locale);

  return (
    <div className="flex gap-8">
      {/* Content */}
      <article className="flex-1 min-w-0 max-w-3xl">
        <DocsHeader title={doc.frontmatter.title} breadcrumbs={breadcrumbs} toc={doc.toc} />

        {/* MDX Content */}
        <div className="docs-content">{doc.content}</div>

        {/* Pager */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <DocsPager prev={prev ?? undefined} next={next ?? undefined} />
        </div>

        {/* CTA */}
        <div className="mt-12">
          <DemoCtaBanner />
        </div>
      </article>

      {/* On This Page */}
      {doc.toc.length > 0 && (
        <aside className="hidden xl:block w-52 shrink-0">
          <OnThisPage items={doc.toc} title={t("on_this_page")} />
        </aside>
      )}
    </div>
  );
}

// ── Breadcrumb builder ─────────────────────────────────────────────────────

function buildBreadcrumbs(
  slug: string[],
  groups: ReturnType<typeof buildSidebarGroups>,
  locale: string,
) {
  const docsHref = locale === "fa" ? "/docs" : "/en/docs";
  const crumbs: Array<{ label: string; href?: string }> = [
    { label: locale === "fa" ? "مستندات" : "Docs", href: docsHref },
  ];

  // Find the group this page belongs to
  const fullSlug = slug.join("/");
  const prefix = locale === "fa" ? "/docs/" : "/en/docs/";

  for (const group of groups) {
    for (const item of group.items) {
      if (item.href === `${prefix.slice(0, -1)}/${fullSlug}`.replace("//", "/")) {
        crumbs.push({ label: group.title });
        crumbs.push({ label: item.label });
        return crumbs;
      }
    }
  }

  // Fallback: just show the last slug segment
  if (slug.length > 0) {
    crumbs.push({ label: slug[slug.length - 1] });
  }

  return crumbs;
}
