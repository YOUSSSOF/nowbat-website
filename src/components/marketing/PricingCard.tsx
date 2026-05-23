import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n";
import { IconCheck } from "@tabler/icons-react";

interface PricingFeature {
  text: string;
  included?: boolean;
}

interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border p-6 flex flex-col",
        "transition-colors duration-150",
        highlighted
          ? "border-brand bg-[var(--brand-glow)]"
          : "border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-[12px]",
        className,
      )}
    >
      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "absolute -top-3 start-1/2 -translate-x-1/2",
            "px-3 py-1 rounded-full",
            "text-caption font-semibold text-white bg-brand",
            "whitespace-nowrap",
          )}
        >
          {badge}
        </span>
      )}

      {/* Tier name */}
      <p className="text-body-sm font-semibold text-[var(--text-secondary)] mb-3">
        {tier}
      </p>

      {/* Price */}
      <div className="mb-3">
        <span className="text-display-md font-bold text-[var(--text-primary)]">
          {price}
        </span>
        {period && (
          <span className="text-body-sm text-[var(--text-secondary)] ms-1">
            {period}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-body-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((feat, i) => (
          <li
            key={i}
            className={cn(
              "flex items-start gap-2.5",
              feat.included === false && "opacity-40",
            )}
          >
            <IconCheck
              size={15}
              className={cn(
                "shrink-0 mt-0.5",
                feat.included !== false ? "text-success" : "text-[var(--text-secondary)]",
              )}
              aria-hidden="true"
            />
            <span className="text-body-sm text-[var(--text-secondary)]">
              {feat.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={ctaHref}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-body rounded font-medium transition-colors duration-150",
          highlighted
            ? "bg-brand text-white hover:bg-brand-dim border border-transparent"
            : "text-brand border border-brand hover:bg-[var(--brand-glow)]"
        )}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export { PricingCard };
export type { PricingCardProps, PricingFeature };
