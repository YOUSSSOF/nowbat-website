"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n";
import { IconSearch, IconX, IconBook } from "@tabler/icons-react";
import Fuse from "fuse.js";

export interface SearchDocument {
  title: string;
  href: string;
  section?: string;
  excerpt?: string;
}

interface SearchModalProps {
  documents: SearchDocument[];
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ documents, isOpen, onClose }: SearchModalProps) {
  const t = useTranslations("Search");
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const fuse = React.useMemo(
    () =>
      new Fuse(documents, {
        keys: ["title", "section", "excerpt"],
        threshold: 0.35,
        includeMatches: true,
        minMatchCharLength: 2,
      }),
    [documents],
  );

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [fuse, query]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setQuery("");
      setFocusedIndex(-1);
      // Small delay to ensure the modal is mounted
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      const result = results[focusedIndex];
      if (result) {
        window.location.href = result.item.href;
        onClose();
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
      className="fixed inset-0 z-[400] flex items-start justify-center pt-[10vh] px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(7,7,14,0.75)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-[560px] rounded-lg overflow-hidden",
          "bg-[var(--bg-surface)] border border-[var(--border)]",
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <IconSearch
            size={18}
            className="shrink-0 text-[var(--text-secondary)]"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFocusedIndex(-1);
            }}
            placeholder={t("placeholder")}
            className={cn(
              "flex-1 bg-transparent text-body text-[var(--text-primary)]",
              "placeholder:text-[var(--text-secondary)]",
              "outline-none border-none",
            )}
            aria-label={t("inputLabel")}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className={cn(
              "p-1 rounded text-[var(--text-secondary)]",
              "hover:text-[var(--text-primary)]",
              "outline-none focus-visible:ring-2 focus-visible:ring-brand",
            )}
          >
            <IconX size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Results */}
        {query.trim() ? (
          results.length > 0 ? (
            <ul
              ref={listRef}
              role="listbox"
              aria-label={t("resultsLabel")}
              className="max-h-72 overflow-y-auto py-2"
            >
              {results.map((result, i) => (
                <li key={result.item.href} role="option" aria-selected={i === focusedIndex}>
                  <Link
                    href={result.item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3",
                      "transition-colors duration-100",
                      "outline-none",
                      i === focusedIndex
                        ? "bg-[var(--brand-glow)] text-brand"
                        : "hover:bg-[var(--bg-glass)] text-[var(--text-primary)]",
                    )}
                  >
                    <IconBook
                      size={16}
                      className="shrink-0 mt-0.5 text-[var(--text-secondary)]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      {result.item.section && (
                        <p className="text-caption text-[var(--text-secondary)] mb-0.5">
                          {result.item.section}
                        </p>
                      )}
                      <p className="text-body-sm font-medium truncate">
                        {result.item.title}
                      </p>
                      {result.item.excerpt && (
                        <p className="text-caption text-[var(--text-secondary)] truncate mt-0.5">
                          {result.item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-body-sm text-[var(--text-secondary)]">
              {t("noResults", { query })}
            </div>
          )
        ) : (
          /* Empty state / hint */
          <div className="px-4 py-6 text-center text-body-sm text-[var(--text-secondary)]">
            {t("hint")}
          </div>
        )}

        {/* Footer shortcut hint */}
        <div className="flex items-center justify-end gap-3 px-4 py-2 border-t border-[var(--border)]">
          <span className="text-caption text-[var(--text-secondary)] flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-glass)] border border-[var(--border)] font-mono text-[10px]">
              ↵
            </kbd>
            {t("hint_enter")}
          </span>
          <span className="text-caption text-[var(--text-secondary)] flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-glass)] border border-[var(--border)] font-mono text-[10px]">
              esc
            </kbd>
            {t("hint_close")}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Hook to open search with Cmd+K / Ctrl+K */
function useSearchModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

export { SearchModal, useSearchModal };
export type { SearchModalProps };
