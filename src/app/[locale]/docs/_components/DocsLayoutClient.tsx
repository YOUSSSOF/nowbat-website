"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { DocsSidebar, SearchModal } from "@/components/docs";
import type { DocsSidebarGroup, SearchDocument } from "@/components/docs";
import { useSearchModal } from "@/components/docs";

interface DocsLayoutClientProps {
  sidebarGroups: DocsSidebarGroup[];
  searchDocuments: SearchDocument[];
  children: ReactNode;
}

export function DocsLayoutClient({
  sidebarGroups,
  searchDocuments,
  children,
}: DocsLayoutClientProps) {
  const { isOpen, open, close } = useSearchModal();

  // Keyboard shortcut Cmd+K / Ctrl+K
  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <DocsSidebar groups={sidebarGroups} />
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 py-8">{children}</main>

      {/* Search modal */}
      <SearchModal documents={searchDocuments} isOpen={isOpen} onClose={close} />
    </>
  );
}
