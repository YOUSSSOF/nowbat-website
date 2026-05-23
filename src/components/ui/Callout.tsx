import * as React from "react";
import { cn } from "@/lib/utils";
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertCircle,
  IconCircleCheck,
} from "@tabler/icons-react";

type CalloutVariant = "info" | "warning" | "danger" | "success";

const variantConfig: Record<
  CalloutVariant,
  {
    containerClass: string;
    iconClass: string;
    Icon: React.ElementType;
  }
> = {
  info: {
    containerClass:
      "bg-[rgba(55,138,221,0.08)] border-[rgba(55,138,221,0.2)] text-[var(--text-primary)]",
    iconClass: "text-brand",
    Icon: IconInfoCircle,
  },
  warning: {
    containerClass:
      "bg-[rgba(233,165,38,0.08)] border-[rgba(233,165,38,0.2)] text-[var(--text-primary)]",
    iconClass: "text-warning",
    Icon: IconAlertTriangle,
  },
  danger: {
    containerClass:
      "bg-[rgba(226,75,74,0.08)] border-[rgba(226,75,74,0.2)] text-[var(--text-primary)]",
    iconClass: "text-danger",
    Icon: IconAlertCircle,
  },
  success: {
    containerClass:
      "bg-[rgba(29,158,117,0.08)] border-[rgba(29,158,117,0.2)] text-[var(--text-primary)]",
    iconClass: "text-success",
    Icon: IconCircleCheck,
  },
};

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant;
  title?: string;
}

function Callout({
  variant = "info",
  title,
  className,
  children,
  ...props
}: CalloutProps) {
  const { containerClass, iconClass, Icon } = variantConfig[variant];

  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        containerClass,
        className,
      )}
      {...props}
    >
      <Icon
        className={cn("shrink-0 mt-0.5", iconClass)}
        size={18}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-body-sm mb-1">{title}</p>
        )}
        <div className="text-body-sm text-[var(--text-secondary)] [&_a]:text-brand [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}

export { Callout };
export type { CalloutProps, CalloutVariant };
