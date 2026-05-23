import * as React from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
  highlights?: number[];
}

async function CodeBlock({
  code,
  lang = "text",
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang,
      theme: "github-dark",
      transformers: [],
    });
  } catch {
    // Fallback: render as plain preformatted text
    html = `<pre><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
  }

  // Inject line-number styling by inserting a wrapper attribute
  const wrappedHtml = showLineNumbers
    ? html.replace(/<pre /, '<pre data-line-numbers="true" ')
    : html;

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        "border border-[var(--border)]",
        "bg-[#0d1117]",
        className,
      )}
    >
      {/* Header bar */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[#161b22]">
          <div className="flex items-center gap-2">
            <span className="text-caption text-[var(--text-secondary)] font-mono">
              {filename}
            </span>
            {lang && lang !== "text" && (
              <span className="text-caption text-brand font-mono uppercase">
                {lang}
              </span>
            )}
          </div>
          <CopyButton text={code} />
        </div>
      )}

      {/* Code content */}
      <div className="relative group">
        {!filename && (
          <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
            <CopyButton text={code} />
          </div>
        )}
        <div
          className={cn(
            "[&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-none",
            "[&_pre]:p-4 [&_pre]:overflow-x-auto",
            "[&_pre]:text-code [&_pre]:leading-relaxed",
            "[&_pre]:bg-transparent",
            showLineNumbers && [
              "[&_.line]:relative [&_.line]:ps-10",
              "[&_.line]:counter-increment-[line]",
              "[&_.line]:before:content-[counter(line)]",
              "[&_.line]:before:absolute [&_.line]:before:start-0 [&_.line]:before:w-8",
              "[&_.line]:before:text-end [&_.line]:before:text-[var(--text-secondary)] [&_.line]:before:opacity-40",
              "[&_.line]:before:select-none",
            ],
          )}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: wrappedHtml }}
        />
      </div>
    </div>
  );
}

// Inline code — for use in MDX prose
function InlineCode({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "font-mono text-code-sm px-1.5 py-0.5 rounded",
        "bg-[var(--bg-surface)] text-brand border border-[var(--border)]",
        className,
      )}
    >
      {children}
    </code>
  );
}

export { CodeBlock, InlineCode };
export type { CodeBlockProps };
