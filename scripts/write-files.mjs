import { writeFileSync } from 'fs';

// ── [locale]/layout.tsx ───────────────────────────────────────────────────
const localeLayout = `import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/../i18n/routing";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/*
         * Theme flash prevention — runs synchronously before any CSS paints.
         * Reads localStorage preference, falls back to OS prefers-color-scheme.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`(function(){try{var s=localStorage.getItem("nowbat-theme");var d=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",s||d);}catch(e){}})();\`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
`;
writeFileSync('src/app/[locale]/layout.tsx', localeLayout);
console.log('locale layout written');

// ── [locale]/docs/layout.tsx ──────────────────────────────────────────────
const docsLayout = `import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { buildSidebarGroups, buildSearchDocuments } from "@/lib/docs";
import { DocsLayoutClient } from "./_components/DocsLayoutClient";

type Props = {
  children: ReactNode;
};

export default async function DocsLayout({ children }: Props) {
  const sidebarGroups = buildSidebarGroups();
  const searchDocuments = buildSearchDocuments();

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-[1400px] px-6 flex gap-8">
          <DocsLayoutClient sidebarGroups={sidebarGroups} searchDocuments={searchDocuments}>
            {children}
          </DocsLayoutClient>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
`;
writeFileSync('src/app/[locale]/docs/layout.tsx', docsLayout);
console.log('docs layout written');

// ── [locale]/docs/[...slug]/page.tsx ─────────────────────────────────────
const docsPage = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsHeader, OnThisPage, DocsPager } from "@/components/docs";
import { DemoCtaBanner } from "@/components/marketing";
import { loadDocPage, getAllDocSlugs, getPagerLinks, buildSidebarGroups } from "@/lib/docs";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await loadDocPage(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";

  if (!doc) return { title: "Not Found" };

  const slugStr = slug.join("/");
  return {
    title: \`\${doc.frontmatter.title} — مستندات نوبت\`,
    description: doc.frontmatter.description,
    alternates: {
      canonical: \`\${siteUrl}/docs/\${slugStr}\`,
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;

  const doc = await loadDocPage(slug);
  if (!doc) notFound();

  const slugStr = slug.join("/");
  const { prev, next } = getPagerLinks(slugStr);
  const groups = buildSidebarGroups();
  const breadcrumbs = buildBreadcrumbs(slug, groups);

  return (
    <div className="flex gap-8">
      {/* Content */}
      <article className="flex-1 min-w-0 max-w-3xl">
        <DocsHeader title={doc.frontmatter.title} breadcrumbs={breadcrumbs} toc={doc.toc} />

        {/* MDX Content */}
        <div className="docs-content prose-invert">{doc.content}</div>

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
          <OnThisPage items={doc.toc} title="در این صفحه" />
        </aside>
      )}
    </div>
  );
}

// ── Breadcrumb builder ─────────────────────────────────────────────────────

function buildBreadcrumbs(
  slug: string[],
  groups: ReturnType<typeof buildSidebarGroups>,
) {
  const crumbs: Array<{ label: string; href?: string }> = [
    { label: "مستندات", href: "/docs" },
  ];

  const fullSlug = slug.join("/");

  for (const group of groups) {
    for (const item of group.items) {
      if (item.href === \`/docs/\${fullSlug}\`) {
        crumbs.push({ label: group.title });
        crumbs.push({ label: item.label });
        return crumbs;
      }
    }
  }

  if (slug.length > 0) {
    crumbs.push({ label: slug[slug.length - 1] });
  }

  return crumbs;
}
`;
writeFileSync('src/app/[locale]/docs/[...slug]/page.tsx', docsPage);
console.log('docs page written');

// ── SiteHeader — remove LocaleToggle ─────────────────────────────────────
import { readFileSync } from 'fs';
let siteHeader = readFileSync('src/components/layout/SiteHeader.tsx', 'utf-8');
// Remove the LocaleToggle import
siteHeader = siteHeader.replace("import { LocaleToggle } from \"./LocaleToggle\";\n", "");
siteHeader = siteHeader.replace("import { LocaleToggle } from './LocaleToggle';\n", "");
// Remove LocaleToggle from desktop nav (it appears between the CTA button and hamburger)
siteHeader = siteHeader.replace(/\s*<LocaleToggle[^/]*\/>/g, "");
// Remove LocaleToggle from mobile bottom
siteHeader = siteHeader.replace(/\s*<LocaleToggle[^>]*>[^<]*<\/LocaleToggle>/g, "");
writeFileSync('src/components/layout/SiteHeader.tsx', siteHeader);
console.log('site header done');
