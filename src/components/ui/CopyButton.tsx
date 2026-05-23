"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "کپی شد" : "کپی کد"}
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded",
        "text-caption font-medium",
        "bg-[var(--bg-glass)] border border-[var(--border)]",
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      {copied ? (
        <>
          <IconCheck size={12} className="text-success" aria-hidden="true" />
          <span className="text-success">کپی شد</span>
        </>
      ) : (
        <>
          <IconCopy size={12} aria-hidden="true" />
          <span>کپی</span>
        </>
      )}
    </button>
  );
}

export { CopyButton };
