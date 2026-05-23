import * as React from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/Callout";
import { Kbd } from "@/components/ui/Kbd";
import { cn } from "@/lib/utils";

// Custom styled MDX components that match the Nowbat website design system
export const mdxComponents: MDXComponents = {
  // ── Headings ────────────────────────────────────────────────────────────
  h1: ({ children, ...props }) => (
    <h1
      className="text-display-lg font-bold text-[var(--text-primary)] mb-6 mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ id, children, ...props }) => (
    <h2
      id={id}
      className="text-heading-xl font-bold text-[var(--text-primary)] mt-10 mb-4 scroll-mt-24 border-b border-[var(--border)] pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ id, children, ...props }) => (
    <h3
      id={id}
      className="text-heading-lg font-semibold text-[var(--text-primary)] mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-body font-semibold text-[var(--text-primary)] mt-6 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),

  // ── Body ────────────────────────────────────────────────────────────────
  p: ({ children, ...props }) => (
    <p
      className="text-body text-[var(--text-secondary)] leading-relaxed mb-4"
      {...props}
    >
      {children}
    </p>
  ),

  // ── Lists ───────────────────────────────────────────────────────────────
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside space-y-1.5 mb-4 text-[var(--text-secondary)] text-body ps-2"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside space-y-1.5 mb-4 text-[var(--text-secondary)] text-body ps-2"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // ── Inline elements ─────────────────────────────────────────────────────
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-brand underline underline-offset-2 hover:opacity-80 transition-opacity"
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      target={href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[var(--text-primary)]" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-[var(--text-secondary)]" {...props}>
      {children}
    </em>
  ),
  code: ({ children, ...props }) => (
    <code
      className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] text-brand font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),

  // ── Block elements ──────────────────────────────────────────────────────
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-s-4 border-brand ps-4 my-4 text-[var(--text-secondary)] italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-[var(--border)] my-8" />,

  // ── Table ────────────────────────────────────────────────────────────────
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-[var(--border)]">
      <table
        className="w-full text-body-sm text-[var(--text-secondary)]"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead
      className="bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold"
      {...props}
    >
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-[var(--border)]" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-[var(--bg-surface)] transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-start font-semibold text-xs uppercase tracking-wide"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3" {...props}>
      {children}
    </td>
  ),

  // ── pre (wraps code blocks from rehype-pretty-code) ─────────────────────
  pre: ({ children, ...props }) => (
    <pre
      className={cn(
        "relative my-5 overflow-x-auto rounded-lg",
        "bg-[var(--bg-surface)] border border-[var(--border)]",
        "p-4 text-sm font-mono leading-relaxed",
        "[&_[data-line]]:leading-6",
        "[&_[data-highlighted-line]]:bg-[rgba(55,138,221,0.1)] [&_[data-highlighted-line]]:-mx-4 [&_[data-highlighted-line]]:px-4",
      )}
      {...props}
    >
      {children}
    </pre>
  ),

  // ── Custom components available in MDX ──────────────────────────────────
  Callout,
  Kbd,
};
