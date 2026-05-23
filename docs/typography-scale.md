# Typography Scale

> Phase 2 output — locked for Phase 3. No changes after Phase 3 starts without updating this document first.

---

## Font Families

### Vazirmatn (Primary)

| Property       | Value                                                  |
| -------------- | ------------------------------------------------------ |
| Type           | Variable font (wght axis 100–900)                      |
| Coverage       | Arabic/Persian (U+0600–U+06FF) + Latin (U+0020–U+007F) |
| File           | `public/fonts/Vazirmatn[wght].woff2`                   |
| Source         | https://github.com/rastikerdar/vazirmatn (OFL license) |
| `font-display` | `swap`                                                 |

Vazirmatn is used for **every** non-code text element on the site — headlines, body, UI labels, navigation, and captions in both Persian and Latin contexts.

### JetBrains Mono (Monospace)

| Property       | Value                                                                               |
| -------------- | ----------------------------------------------------------------------------------- |
| Weights        | 400 (Regular), 700 (Bold)                                                           |
| Files          | `public/fonts/JetBrainsMono-Regular.woff2`, `public/fonts/JetBrainsMono-Bold.woff2` |
| Source         | https://www.jetbrains.com/lp/mono/ (OFL license)                                    |
| `font-display` | `block` (prevents FOUT in code blocks)                                              |

JetBrains Mono is used **exclusively** for: code blocks, inline code, REST API examples, terminal output, and file path labels.

---

## Type Scale

Base: `16px` = `1rem`. All line-heights are unitless multipliers.

| Token        | Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Primary Usage                                  |
| ------------ | --------- | ---------- | ------ | ----------- | -------------- | ---------------------------------------------- |
| `display-xl` | 72        | 4.5rem     | 700    | 1.05        | −0.03em        | Landing page hero headline                     |
| `display-lg` | 56        | 3.5rem     | 700    | 1.1         | −0.02em        | Page-level hero headlines                      |
| `display-md` | 40        | 2.5rem     | 600    | 1.15        | −0.015em       | Major section headlines (H1 on inner pages)    |
| `heading-xl` | 32        | 2rem       | 600    | 1.2         | −0.01em        | Large card headlines, sub-page heroes          |
| `heading-lg` | 24        | 1.5rem     | 600    | 1.3         | −0.005em       | Card titles, article H2, docs section titles   |
| `heading-md` | 20        | 1.25rem    | 600    | 1.35        | 0              | Sub-section H3, feature names                  |
| `heading-sm` | 16        | 1rem       | 600    | 1.4         | 0              | Small card labels, sidebar group headings (H4) |
| `body-lg`    | 18        | 1.125rem   | 400    | 1.7         | 0              | Lead/intro paragraphs, hero sub-headlines      |
| `body`       | 16        | 1rem       | 400    | 1.6         | 0              | Standard body text, docs pages, blog articles  |
| `body-sm`    | 14        | 0.875rem   | 400    | 1.6         | 0.01em         | Metadata, secondary labels, card descriptions  |
| `caption`    | 12        | 0.75rem    | 400    | 1.5         | 0.02em         | Image captions, timestamps, legal footnotes    |
| `overline`   | 11        | 0.6875rem  | 600    | 1.4         | 0.1em          | Section eyebrow labels (always uppercase)      |
| `code`       | 14        | 0.875rem   | 400    | 1.6         | 0              | Code blocks, inline code                       |
| `code-sm`    | 12        | 0.75rem    | 400    | 1.5         | 0              | Small inline code, terminal line numbers       |

---

## Responsive Scale

Applied via Tailwind's `md:` breakpoint (≥ 768px). Mobile sizes are the default; desktop sizes added at `md:`.

| Token          | Mobile          | Desktop (md+)  |
| -------------- | --------------- | -------------- |
| `display-xl`   | 36px (2.25rem)  | 72px (4.5rem)  |
| `display-lg`   | 30px (1.875rem) | 56px (3.5rem)  |
| `display-md`   | 26px (1.625rem) | 40px (2.5rem)  |
| `heading-xl`   | 24px (1.5rem)   | 32px (2rem)    |
| `heading-lg`   | 20px (1.25rem)  | 24px (1.5rem)  |
| `heading-md`   | 18px (1.125rem) | 20px (1.25rem) |
| All body sizes | unchanged       | unchanged      |

---

## CSS Custom Properties

Declared on `:root` in `styles/globals.css`. Referenced in `tailwind.config.ts` as `fontSize` theme extensions.

```css
:root {
	--font-sans: "Vazirmatn", "Inter", system-ui, sans-serif;
	--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;

	/* Type scale */
	--text-display-xl: 4.5rem;
	--text-display-lg: 3.5rem;
	--text-display-md: 2.5rem;
	--text-heading-xl: 2rem;
	--text-heading-lg: 1.5rem;
	--text-heading-md: 1.25rem;
	--text-heading-sm: 1rem;
	--text-body-lg: 1.125rem;
	--text-body: 1rem;
	--text-body-sm: 0.875rem;
	--text-caption: 0.75rem;
	--text-overline: 0.6875rem;
	--text-code: 0.875rem;
	--text-code-sm: 0.75rem;

	/* Line heights */
	--leading-display: 1.05;
	--leading-heading: 1.3;
	--leading-body: 1.6;
	--leading-relaxed: 1.7;
	--leading-code: 1.6;
}
```

---

## Special Treatments

### Hero Headline Gradient (single permitted exception)

The emphasized final word "ایرانی" in the landing page hero headline `سیستم نوبت‌دهی آنلاین برای کسب‌وکارهای **ایرانی**` uses a text gradient. This is the **only** place any gradient appears on text:

```css
.hero-highlight {
	background: linear-gradient(135deg, #378add 0%, #60aeed 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}
```

No other element on any page uses this technique.

### Overline Labels

Section eyebrow text (e.g., "ویژگی‌های کلیدی", "چطور کار می‌کند") uses `overline` token with `text-transform: uppercase` and `letter-spacing: 0.1em`. Color: `var(--brand)`. Always appears directly above a `display-md` or `heading-xl` title.

### Code Block Inline References

Inline code spans (`<code>`) in body text use a `1px solid var(--border)` border, `background: var(--bg-surface)`, `border-radius: 4px`, and `padding: 1px 5px`. Font: `code-sm` token.

---

## Font Loading

In `app/[locale]/layout.tsx`:

```tsx
// next/font/local — self-hosted, zero external network requests
import localFont from "next/font/local";

const vazirmatn = localFont({
	src: [
		{ path: "../../public/fonts/Vazirmatn[wght].woff2", style: "normal" },
	],
	variable: "--font-sans",
	display: "swap",
	preload: true,
});

const jetbrainsMono = localFont({
	src: [
		{
			path: "../../public/fonts/JetBrainsMono-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/JetBrainsMono-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-mono",
	display: "block",
	preload: false, // only preload on pages with code blocks
});
```

The `vazirmatn.variable` and `jetbrainsMono.variable` class names are applied to the `<html>` element.
