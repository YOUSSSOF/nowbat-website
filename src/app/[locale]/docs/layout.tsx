import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { buildSidebarGroups, buildSearchDocuments } from "@/lib/docs";
import { DocsLayoutClient } from "./_components/DocsLayoutClient";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;

  const sidebarGroups = buildSidebarGroups(locale);
  const searchDocuments = buildSearchDocuments(locale);

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen pt-16">
        <div className="mx-auto max-w-[1400px] px-6 flex gap-8">
          {/* Sidebar */}
          <DocsLayoutClient sidebarGroups={sidebarGroups} searchDocuments={searchDocuments}>
            {children}
          </DocsLayoutClient>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
