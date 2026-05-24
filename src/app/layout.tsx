import type { ReactNode } from "react";

/**
 * Root layout — provides required <html> and <body> tags.
 * The [locale]/layout.tsx nested layout handles i18n, lang, dir, and theme.
 * We use suppressHydrationWarning because [locale]/layout.tsx rewrites
 * these attributes (lang, dir, data-theme) on the client after hydration.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
