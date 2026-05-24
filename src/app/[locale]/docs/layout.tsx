import type { ReactNode } from "react";
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
