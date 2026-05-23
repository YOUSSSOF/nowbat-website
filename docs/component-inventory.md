# Component Inventory

> Phase 2 output. Every component that must exist before page assembly begins (Phase 4). Pages are assembled from these components — components are never created during page-building phases.

---

## How to Read This Document

Each entry includes:

- **Name** — the export name in TypeScript
- **File path** — relative to `src/`
- **Description** — what it does in one sentence
- **Key props** — essential API surface
- **Design notes** — constraints and visual decisions locked in

---

## 1. Primitive Components (`components/ui/`)

### `Button`

**File:** `components/ui/Button.tsx`
**Description:** The single interactive action element used everywhere — CTAs, form submits, icon actions.

| Variant   | Appearance                                                        |
| --------- | ----------------------------------------------------------------- |
| `primary` | Brand-blue fill (`--brand`), white text, `rounded-lg`             |
| `outline` | Transparent fill, `1px solid var(--brand)` border, brand text     |
| `ghost`   | Transparent, no border, muted text; hover shows subtle background |
| `danger`  | Danger-red fill (`--danger`), white text                          |

| Size | Height | Padding       | Font          |
| ---- | ------ | ------------- | ------------- |
| `sm` | 32px   | `px-3 py-1.5` | `body-sm` 600 |
| `md` | 40px   | `px-4 py-2`   | `body` 600    |
| `lg` | 48px   | `px-6 py-3`   | `body-lg` 600 |

**Key props:** `variant`, `size`, `loading` (shows spinner, disables), `disabled`, `as` (polymorphic: `button` | `a`), `href` (when `as="a"`), `leftIcon`, `rightIcon`
**Design notes:** No box shadows on any state. Focus ring: `outline: 2px solid var(--brand); outline-offset: 2px`. Loading spinner replaces left icon slot, does not resize the button.

---

### `Badge` / `Pill`

**File:** `components/ui/Badge.tsx`
**Description:** Small status indicator or category label; `rounded-full` pill shape.

| Variant   | Background               | Text               |
| --------- | ------------------------ | ------------------ |
| `success` | `rgba(29,158,117,0.15)`  | `--success`        |
| `warning` | `rgba(233,165,38,0.15)`  | `--warning`        |
| `danger`  | `rgba(226,75,74,0.15)`   | `--danger`         |
| `brand`   | `rgba(55,138,221,0.15)`  | `--brand`          |
| `neutral` | `rgba(255,255,255,0.06)` | `--text-secondary` |

**Key props:** `variant`, `size` (`sm` | `md`), `dot` (shows colored 6px dot before text)
**Design notes:** `border-radius: 999px`. Never use `rounded-lg` for badges.

---

### `GlassCard`

**File:** `components/ui/GlassCard.tsx`
**Description:** The primary card surface used throughout marketing pages and the demo page.

**Fixed visual properties (never override):**

```css
background: rgba(255, 255, 255, 0.04); /* --bg-glass */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.07); /* --border */
border-radius: 8px;
```

**Key props:** `className` (for sizing/layout only), `children`, `hoverable` (enables scale + border-color transition on hover), `accentSide` (`left` | `top` | `none` — adds a 2px brand-blue border on that edge)
**Design notes:** No box shadow. `hoverable` cards: `transform: scale(1.02)` on hover with `transition: 150ms ease-out`. The `accentSide="left"` prop is used on feature grid cards on hover.

---

### `CodeBlock`

**File:** `components/ui/CodeBlock.tsx`
**Description:** Syntax-highlighted code display with copy button, optional filename label, and language indicator.

**Visual spec:**

- Background: `var(--bg-surface)` (`#0D0D1A`)
- Border: `1px solid var(--border)`
- Border radius: `8px`
- Font: `JetBrains Mono`, `code` token
- Line numbers: right-aligned, `--text-secondary` color, `body-sm` size
- Copy button: top-right corner, `ghost` button with clipboard icon; changes to checkmark for 2s after copy
- Filename label: if provided, shows in a tab-bar above the code area, `body-sm` 600, `--text-secondary` color
- Language indicator: top-right, `overline` token, `--text-secondary`, uppercase

**Syntax theme:** Custom Shiki/`rehype-pretty-code` theme. Token colors:

- Keywords (`function`, `const`, etc.): `#60AEED`
- Strings: `#A8D1A0`
- Comments: `#5A5A7A`
- Numbers: `#E9A526`
- Punctuation: `#8888AA`
- Default text: `#F0F0F8`

**Key props:** `code` (string), `language`, `filename`, `showLineNumbers`

---

### `Callout`

**File:** `components/ui/Callout.tsx`
**Description:** Info/warning/danger/tip box for use in docs pages.

| Variant   | Icon                | Left-border color | Background tint         |
| --------- | ------------------- | ----------------- | ----------------------- |
| `info`    | `IconInfoCircle`    | `--brand`         | `rgba(55,138,221,0.06)` |
| `warning` | `IconAlertTriangle` | `--warning`       | `rgba(233,165,38,0.06)` |
| `danger`  | `IconAlertCircle`   | `--danger`        | `rgba(226,75,74,0.06)`  |
| `tip`     | `IconBulb`          | `--success`       | `rgba(29,158,117,0.06)` |

**Key props:** `variant`, `title` (optional bold header), `children`
**Design notes:** Left border is `3px solid`. No fill on icon; icon size `20px`.

---

### `Kbd`

**File:** `components/ui/Kbd.tsx`
**Description:** Renders keyboard shortcut labels (e.g., `⌘K`, `Ctrl+K`).

**Visual spec:** `border: 1px solid var(--border)`, `background: var(--bg-surface)`, `border-radius: 4px`, `padding: 2px 6px`, font: `code-sm`, `--text-secondary` color.
**Key props:** `children`

---

### `Steps`

**File:** `components/ui/Steps.tsx`
**Description:** Numbered step list for guide/tutorial pages, rendered as a vertical timeline.

**Visual spec:** Each step: large number in brand blue circle (`40×40px`, `rounded-full`), bold title at `heading-sm`, body text below. Connecting line: `1px solid var(--border)` running from circle center to next circle. Last step has no line.
**Key props:** `steps` (array of `{ title: string, children: ReactNode }`)

---

### `Tabs`

**File:** `components/ui/Tabs.tsx`
**Description:** Client-side tab switcher for code examples with multiple languages or content variants.

**Visual spec:** Tab bar: `border-bottom: 1px solid var(--border)`. Active tab: no background fill, only a `2px solid var(--brand)` underline. Inactive tabs: `--text-secondary`, no underline, hover shows `--text-primary`. Tab panel content fades in on switch (`opacity 0→1`, 150ms).
**Key props:** `tabs` (array of `{ label: string, content: ReactNode }`), `defaultTab`

---

### `Accordion`

**File:** `components/ui/Accordion.tsx`
**Description:** Animated expand/collapse for FAQ sections and collapsible content.

**Visual spec:** Each item: `border-bottom: 1px solid var(--border)`. Trigger row: `heading-sm` weight title, `IconChevronDown` on the trailing edge (rotates 180° when open). Content area: animated height via CSS `grid-template-rows: 0fr → 1fr`. Transition: 250ms `ease-out`.
**Key props:** `items` (array of `{ question: string, answer: ReactNode }`), `allowMultiple`

---

## 2. Layout Components (`components/layout/`)

### `SiteHeader`

**File:** `components/layout/SiteHeader.tsx`
**Description:** The global site navigation bar — sticky, applies glass effect once user scrolls past the hero section.

**Visual spec — scrolled state:**

```css
background: rgba(7, 7, 14, 0.8); /* --bg-page at 80% opacity */
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border-bottom: 1px solid rgba(255, 255, 255, 0.07);
position: sticky;
top: 0;
z-index: 200; /* sticky z-index level */
```

**Visual spec — at top of page:** fully transparent, no border.

**Content (RTL order — rightmost to leftmost in Persian):**

1. Logo + wordmark (leading edge, right in RTL)
2. Navigation links: ویژگی‌ها | چطور کار می‌کند | مستندات | راهنماها | وبلاگ
3. `ThemeToggle` (sun/moon icon button)
4. `LocaleToggle` (fa/en text toggle)
5. CTA button: "مشاهده دمو" (`primary` variant, `sm` size)

**Mobile (< 768px):** Hamburger icon on leading edge. Tapping opens a full-screen `position: fixed` overlay with all nav links in a vertical stack, `display-md`-sized text, and a close button. The overlay uses the same glass background as the scrolled header.

**Key props:** none (standalone, reads locale from next-intl context)

---

### `SiteFooter`

**File:** `components/layout/SiteFooter.tsx`
**Description:** Three-column site footer with logo, navigation, and social links.

**Visual spec:** Background: `var(--bg-surface)`. Top border: `1px solid var(--border)`. Three columns on desktop (`lg:grid-cols-3`), single column stacked on mobile:

1. Logo + tagline ("سیستم نوبت‌دهی آنلاین برای کسب‌وکارهای ایرانی") + copyright line
2. Navigation links grouped: مستندات, راهنماها, وبلاگ, قیمت‌گذاری, دمو
3. Social/external links: GitHub, changelog, contact email

**Key props:** none

---

### `ThemeToggle`

**File:** `components/layout/ThemeToggle.tsx`
**Description:** Switches between light and dark themes, syncing to `localStorage` and respecting `prefers-color-scheme` on first visit.

**Visual spec:** Icon-only `ghost` button (`32×32px` touch target): `IconSun` when current theme is dark (click → light), `IconMoon` when current theme is light (click → dark). Icon rotates+scales on change: `scale(0.8) rotate(-20deg) → scale(1) rotate(0deg)`, 150ms `--ease-spring`. Tooltip via `aria-label`: "تغییر تم". No text label.

**State logic:**

1. On mount: read `localStorage.getItem('nowbat-theme')`; if absent, read `window.matchMedia('(prefers-color-scheme: dark)').matches`
2. On click: toggle, write to `localStorage`, set `document.documentElement.dataset.theme`
3. Renders `null` during SSR (returns a placeholder spacer of the same size); hydrates on client only — prevents SSR mismatch

**Key props:** none (self-contained)

---

### `LocaleToggle`

**File:** `components/layout/LocaleToggle.tsx`
**Description:** Switches between `fa` and `en` locales using next-intl, no full page reload.

**Visual spec:** A small toggle with `FA` and `EN` labels. Active locale is `--text-primary`, inactive is `--text-secondary`. No border. `ghost` button style. Transition: 150ms.
**Key props:** none (reads/writes next-intl locale context)

---

## 3. Marketing Section Components (`components/marketing/`)

### `HeroSection`

**File:** `components/marketing/HeroSection.tsx`
**Description:** Full-viewport landing page hero with headline, CTAs, and dashboard mockup.

**Layout spec (desktop, RTL):**

- Full viewport height (`min-h-screen`), flex row, `align-items: center`
- Right column (55%): plugin dashboard screenshot inside a glass device frame
    - Frame: `GlassCard` with `accentSide="top"`, `padding: 8px`
    - Screenshot: `rounded` (4px), fills the card
    - Subtle "pending" status badge on the screenshot has a pulsing animation (`opacity: 1 → 0.5`, `1.5s ease-in-out infinite`)
- Left column (45%): stacked vertically with `gap-6`
    - Overline label: "افزونه وردپرس"
    - Headline: `display-xl`, multiline, "ایرانی" in brand blue gradient
    - Sub-headline: `body-lg`, `--text-secondary`
    - Button row: primary CTA "مشاهده دمو" + outline CTA "مستندات", `gap-4`
    - Social proof: "● نصب شده روی ۱۰۰+ سایت" — bullet in `--success`, `body-sm`

**Mobile:** Stacked vertically; screenshot appears below the text content.
**Key props:** none (static content, fully server-rendered)

---

### `FeatureStrip`

**File:** `components/marketing/FeatureStrip.tsx`
**Description:** Horizontal scrollable row of 6 feature highlights shown between hero and main feature grid.

**Visual spec:** `overflow-x: auto`, `scrollbar-width: none`. Each item: `body-sm` 600 text + brand-blue Tabler icon at `16px`. `gap-8` between items. Centered on desktop, scrollable on mobile. No card background — flat text row.
**Key props:** `items` (array of `{ icon: TablerIcon, label: string }`)

---

### `FeatureGrid`

**File:** `components/marketing/FeatureGrid.tsx`
**Description:** 3-column grid of GlassCard feature items.

**Card spec:** Each card: `GlassCard` with `hoverable` + `accentSide="left"` on hover. Content: Tabler icon at `32px` brand blue (no background container), `heading-md` title, `body-sm` description (2 lines max).
**Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `gap-6`.
**Key props:** `features` (array of `{ icon, title, description }`)

---

### `AlternatingFeature`

**File:** `components/marketing/AlternatingFeature.tsx`
**Description:** A full-width section with a screenshot on one side and text+bullets on the other. Direction alternates on even/odd instances.

**Layout:** Two columns, `lg:grid-cols-2`, `gap-12` to `gap-16`. Screenshot side: `GlassCard` containing an `<Image>` fill. Text side: overline label, `heading-xl` title, `body` paragraph, then a `<ul>` with `IconCheck` bullets (brand blue `16px` icon, `body-sm` text).
**Key props:** `image`, `imageAlt`, `eyebrow`, `title`, `description`, `bullets` (string[]), `reverse` (swaps column order)

---

### `HowItWorksSection`

**File:** `components/marketing/HowItWorksSection.tsx`
**Description:** Three-step horizontal or vertical guide showing the installation-to-booking flow.

**Visual spec:** Three large numbered steps. Number: `display-md` weight 700, `--brand` color. Connecting line between numbers: `1px dashed rgba(55,138,221,0.3)`. Each step: icon above, bold `heading-lg` headline, `body` description (2 sentences max). Steps: ۱ نصب کنید → ۲ پیکربندی کنید → ۳ نوبت دریافت کنید.
**Key props:** `steps` (hardcoded or passed as array)

---

### `DemoCtaBanner`

**File:** `components/marketing/DemoCtaBanner.tsx`
**Description:** Full-width glass banner with a strong CTA to the demo site. Appears on landing page, features page, and at the bottom of every docs page.

**Visual spec:** `GlassCard` with `accentSide="top"`. Full-width, `padding: 48px 32px`. Layout: centered column on mobile, row on desktop. Left: headline "نوبت را همین الان امتحان کنید" (`heading-xl`) + sub-text. Right: "راه‌اندازی دمو" button (`primary`, `lg`) + "مستندات" link (`ghost`).
**Key props:** `headline` (optional override), `subtext` (optional override)

---

### `TestimonialsCarousel`

**File:** `components/marketing/TestimonialsCarousel.tsx`
**Description:** A three-card carousel of user testimonials with auto-play and manual navigation.

**Card spec:** `GlassCard`. Content: large `"` opening quote mark in brand blue (`display-md`), quote text in `body-lg italic`, then avatar initials + name + business type below. Auto-play interval: 5s. Manual nav: `IconChevronRight`/`IconChevronLeft` buttons. Transition: `translateX` slide with `400ms ease`.
**Key props:** `testimonials` (array of `{ quote, name, business, initials }`)

---

### `FaqAccordion`

**File:** `components/marketing/FaqAccordion.tsx`
**Description:** FAQ section using the `Accordion` primitive, wrapped with a section header and optional CTA.

**Visual spec:** Section header: overline + `display-md` title, centered. `Accordion` below with `max-w-container-md mx-auto`.
**Key props:** `items` (passed to `Accordion`), `title`, `cta` (optional link)

---

### `StatStrip`

**File:** `components/marketing/StatStrip.tsx`
**Description:** A row of 4 statistics with large numbers and labels.

**Visual spec:** `grid-cols-2 md:grid-cols-4`. Each stat: number in `display-md` brand-blue weight 700, label below in `body-sm` `--text-secondary`. A `1px solid var(--border)` divider between each stat on desktop. No card background.
**Key props:** `stats` (array of `{ value: string, label: string }`)

---

### `ScreenshotGallery`

**File:** `components/marketing/ScreenshotGallery.tsx`
**Description:** A grid of annotated admin screenshots with lightbox-style full-screen view.

**Visual spec:** `grid-cols-2 lg:grid-cols-4`. Each thumbnail: `GlassCard` with image + caption overlay at bottom (semi-transparent dark gradient is permitted here as an image overlay, not a surface gradient). Click opens a centered modal with the full image and annotation text. Close via Escape or backdrop click.
**Key props:** `screenshots` (array of `{ src, alt, caption }`)

---

### `PricingCard`

**File:** `components/marketing/PricingCard.tsx`
**Description:** Pricing tier card with feature checklist and CTA.

**Visual spec:** `GlassCard`. For the "Pro" tier (recommended): `accentSide="top"`. Tier name in `heading-lg`, price in `display-md` with "/سال" suffix in `heading-md`. Feature list: `IconCheck` (success color) for included, `IconX` (`--text-secondary`) for excluded. CTA button at bottom, `primary` for recommended tier, `outline` for others.
**Key props:** `tier`, `price`, `features`, `cta`, `highlighted`

---

## 4. Docs Components (`components/docs/`)

### `DocsSidebar`

**File:** `components/docs/DocsSidebar.tsx`
**Description:** Sticky right-side (in RTL) navigation sidebar for the docs section.

**Visual spec (LOCKED):**

- Position: `sticky top-[72px]` (below header), `height: calc(100vh - 72px)`, `overflow-y: auto`
- Background: `var(--bg-surface)`
- Width: `280px` on desktop, hidden on mobile (drawer overlay)
- Section groups: collapsible with `IconChevronDown` toggle. Collapsed by default; open section auto-expands when a child page is active
- Items: `body-sm` weight 400. Active item: `600` weight + `3px solid var(--brand)` right border (RTL: leading edge) + `var(--brand)` color
- Hover: `--text-primary` color, no background change
- Group header: `overline` token, `--text-secondary`, uppercase, not clickable
- Indent: nested pages indented `16px` from group label

**Key props:** uses Fumadocs sidebar primitives, customized via `components` prop

---

### `DocsHeader`

**File:** `components/docs/DocsHeader.tsx`
**Description:** Breadcrumb navigation + page title shown at the top of each docs page.

**Visual spec:** Breadcrumbs: `body-sm`, `--text-secondary`, `IconChevronLeft` separator (RTL). Current page: `--text-primary`. Below: page title in `display-md`. Below: optional description in `body-lg` `--text-secondary`.
**Key props:** `breadcrumbs`, `title`, `description`

---

### `OnThisPage`

**File:** `components/docs/OnThisPage.tsx`
**Description:** Sticky right sidebar with anchor links to all H2/H3 headings on the current page.

**Visual spec:** Hidden below `xl` breakpoint. `body-sm` link list, `--text-secondary` color. Active heading (in viewport): `var(--brand)` color + `3px solid var(--brand)` left border. Header: "در این صفحه" in `overline`.
**Key props:** `headings` (auto-extracted from MDX by Fumadocs)

---

### `DocsPager`

**File:** `components/docs/DocsPager.tsx`
**Description:** Previous/next page navigation at the bottom of each docs page.

**Visual spec:** Two `GlassCard` items side by side (`grid-cols-2`). Each: direction label ("قبلی" / "بعدی") in `body-sm` `--text-secondary`, page title in `heading-sm`. Hover: `hoverable` card animation. `IconArrowRight`/`IconArrowLeft` on the appropriate side.
**Key props:** `prev`, `next` (each: `{ href, title }` or null)

---

### `SearchModal`

**File:** `components/docs/SearchModal.tsx`
**Description:** Full-screen search overlay for docs content. Triggered by `Cmd+K` / `Ctrl+K`.

**Visual spec:** Fixed overlay, `z-index: 600`. Background: `rgba(7,7,14,0.9)`. Centered card (`max-w-container-sm`): `GlassCard` with `backdrop-filter: blur(24px)`. Input: `heading-md` font size, no border on input itself, `border-bottom: 1px solid var(--border)`. Results list below: each result shows page title (`body` 600) + section (`body-sm` `--text-secondary`) + breadcrumb path. Active result: highlighted with `var(--brand)` left border. Navigation: arrow keys + Enter to open.
**Key props:** `open`, `onClose`, `index` (Fuse.js pre-built index of all docs pages)

---

## Design Constraints Summary (All Components)

These rules apply to **every** component without exception:

| Constraint    | Rule                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| Box shadow    | **Zero**. No `box-shadow` on any element, any state                                |
| Gradients     | **Zero** on surfaces. Text gradient on hero headline only                          |
| Border radius | Maximum `8px`. `999px` for pills/avatars only                                      |
| Colors        | Only CSS custom properties from `tokens.css` / `tailwind.config.ts`                |
| Focus rings   | `outline: 2px solid var(--brand); outline-offset: 2px` on all interactive elements |
| RTL           | All padding/margin use logical properties (`inline-start`, `inline-end`)           |
| Animation     | All respect `prefers-reduced-motion: reduce`                                       |
