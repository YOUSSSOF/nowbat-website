"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import { GlassCard } from "@/components/ui/GlassCard";
import Image from "next/image";

interface AlternatingFeatureProps {
  overline?: string;
  title: string;
  description: string;
  bullets?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** When true, the image is on the left and text on the right */
  reverse?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function AlternatingFeature({
  overline,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt = "",
  imageWidth = 600,
  imageHeight = 400,
  reverse = false,
  children,
  className,
}: AlternatingFeatureProps) {
  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="mx-auto max-w-container-xl">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
            reverse && "lg:[direction:rtl]",
          )}
        >
          {/* Text side */}
          <motion.div
            className={cn(reverse && "lg:[direction:ltr]")}
            initial={{ opacity: 0, x: reverse ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            {overline && (
              <p className="text-overline font-semibold tracking-widest uppercase text-brand mb-4">
                {overline}
              </p>
            )}
            <h2 className="text-heading-xl font-bold text-[var(--text-primary)] mb-4">
              {title}
            </h2>
            <p className="text-body text-[var(--text-secondary)] leading-relaxed mb-6">
              {description}
            </p>
            {bullets && bullets.length > 0 && (
              <ul className="space-y-2.5 mb-6">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <IconCheck
                      size={16}
                      className="text-success shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-body-sm text-[var(--text-secondary)]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {children}
          </motion.div>

          {/* Image / visual side */}
          <motion.div
            className={cn(reverse && "lg:[direction:ltr]")}
            initial={{ opacity: 0, x: reverse ? -12 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <GlassCard padding="none" className="overflow-hidden">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={imageWidth}
                  height={imageHeight}
                  className="w-full h-auto"
                />
              ) : (
                /* Placeholder when no image is provided yet */
                <div
                  className="w-full aspect-video bg-[var(--bg-surface)] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-body-sm text-[var(--text-secondary)] opacity-40">
                    {imageAlt || "screenshot"}
                  </span>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AlternatingFeature };
export type { AlternatingFeatureProps };
