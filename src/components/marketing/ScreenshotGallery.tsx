"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconX, IconZoomIn } from "@tabler/icons-react";
import Image from "next/image";

interface ScreenshotItem {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ScreenshotGalleryProps {
  items: ScreenshotItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

function ScreenshotGallery({
  items,
  className,
  columns = 3,
}: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }[columns];

  function handleKeyDown(e: React.KeyboardEvent) {
    if (lightboxIndex === null) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const dir = e.key === "ArrowLeft" ? -1 : 1;
      setLightboxIndex((i) =>
        i !== null ? (i + dir + items.length) % items.length : null,
      );
    }
    if (e.key === "Escape") setLightboxIndex(null);
  }

  return (
    <>
      <div className={cn("grid gap-4", gridCols, className)}>
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`${item.alt} — بزرگ‌نمایی`}
            className="group relative outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
          >
            <GlassCard padding="none" className="overflow-hidden h-full">
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width ?? 600}
                  height={item.height ?? 400}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-video bg-[var(--bg-surface)] flex items-center justify-center">
                  <span className="text-body-sm text-[var(--text-secondary)] opacity-40">
                    {item.alt}
                  </span>
                </div>
              )}
              {/* Zoom overlay */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "bg-[rgba(7,7,14,0.5)]",
                  "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  "transition-opacity duration-150 rounded-lg",
                )}
                aria-hidden="true"
              >
                <IconZoomIn size={32} className="text-white" />
              </div>
            </GlassCard>
            {item.caption && (
              <p className="mt-2 text-caption text-[var(--text-secondary)] text-center">
                {item.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="بزرگ‌نمایی تصویر"
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[rgba(7,7,14,0.9)] backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            type="button"
            aria-label="بستن"
            className={cn(
              "absolute top-4 end-4 w-10 h-10 rounded-full",
              "bg-[var(--bg-glass)] border border-[var(--border)]",
              "flex items-center justify-center",
              "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              "outline-none focus-visible:ring-2 focus-visible:ring-brand",
            )}
            onClick={() => setLightboxIndex(null)}
          >
            <IconX size={18} aria-hidden="true" />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard padding="none" className="overflow-hidden">
              {items[lightboxIndex]?.src ? (
                <Image
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].alt}
                  width={items[lightboxIndex].width ?? 1200}
                  height={items[lightboxIndex].height ?? 800}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-video bg-[var(--bg-surface)] flex items-center justify-center">
                  <span className="text-body text-[var(--text-secondary)] opacity-40">
                    {items[lightboxIndex]?.alt}
                  </span>
                </div>
              )}
            </GlassCard>
            {items[lightboxIndex]?.caption && (
              <p className="text-center text-body-sm text-[var(--text-secondary)] mt-3">
                {items[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { ScreenshotGallery };
export type { ScreenshotGalleryProps, ScreenshotItem };
