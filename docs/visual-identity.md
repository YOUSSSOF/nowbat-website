# Visual Identity

> Phase 2 output. Covers: logotype, icon mark, favicon, Open Graph image template, color system, and icon usage. Every asset spec here must be implemented before any page work begins.

---

## Brand Summary

**Name:** نوبت (Nowbat)
**Tagline:** سیستم نوبت‌دهی آنلاین برای کسب‌وکارهای ایرانی
**Domain:** nowbat.ir (recommended) or nowbat.app
**Primary color:** `#378ADD` — medium saturated blue, readable on both dark and light backgrounds
**Character:** Professional, warm, distinctly Persian. Not corporate. Not playful.

---

## 1. Color System

### Primary Palette

| Token          | Hex                     | Usage                                          |
| -------------- | ----------------------- | ---------------------------------------------- |
| `--brand`      | `#378ADD`               | All CTAs, active states, links, accent borders |
| `--brand-dim`  | `#2065AD`               | Hover state for brand elements                 |
| `--brand-glow` | `rgba(55,138,221,0.15)` | Glass card tint, section background accents    |

### Background Palette

| Token          | Dark Mode                | Light Mode         | Usage                  |
| -------------- | ------------------------ | ------------------ | ---------------------- |
| `--bg-page`    | `#07070E`                | `#F4F4FA`          | Page background        |
| `--bg-surface` | `#0D0D1A`                | `#FFFFFF`          | Cards, sidebar, modals |
| `--bg-glass`   | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.03)` | GlassCard background   |

### Border

| Token      | Dark Mode                | Light Mode         | Usage                      |
| ---------- | ------------------------ | ------------------ | -------------------------- |
| `--border` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.07)` | All card/container borders |

### Text

| Token              | Dark Mode | Light Mode | Usage                             |
| ------------------ | --------- | ---------- | --------------------------------- |
| `--text-primary`   | `#F0F0F8` | `#0D0D1A`  | Headlines, body text              |
| `--text-secondary` | `#8888AA` | `#5A5A7A`  | Captions, subtitles, placeholders |

### Status Colors (same in both themes)

| Token       | Hex       | Usage                                               |
| ----------- | --------- | --------------------------------------------------- |
| `--success` | `#1D9E75` | Confirmed status, success toasts, checkmarks        |
| `--danger`  | `#E24B4A` | Cancelled status, error toasts, destructive actions |
| `--warning` | `#E9A526` | Pending status, warning callouts                    |

### Theme System

Both themes are **first-class designs**. There is no forced default — the site respects the visitor's OS/browser preference via `prefers-color-scheme`. A `ThemeToggle` in the header lets users override the system preference; their choice is persisted in `localStorage` and applied immediately on page load (via a blocking inline script in `<head>`) to prevent any flash.

Layer order (lowest → highest priority):

1. `:root` — light theme base (light is the fallback because legacy browsers without dark media query support default to light)
2. `@media (prefers-color-scheme: dark)` — applies dark tokens automatically for dark-OS users
3. `[data-theme="light"]` / `[data-theme="dark"]` on `<html>` — explicit user override, always wins

```css
/* ── Light theme (base + explicit override) ── */
:root,
[data-theme="light"] {
	--bg-page: #f4f4fa;
	--bg-surface: #ffffff;
	--bg-glass: rgba(0, 0, 0, 0.03);
	--border: rgba(0, 0, 0, 0.07);
	--text-primary: #0d0d1a;
	--text-secondary: #5a5a7a;
}

/* ── Dark theme (system preference) ── */
@media (prefers-color-scheme: dark) {
	:root {
		--bg-page: #07070e;
		--bg-surface: #0d0d1a;
		--bg-glass: rgba(255, 255, 255, 0.04);
		--border: rgba(255, 255, 255, 0.07);
		--text-primary: #f0f0f8;
		--text-secondary: #8888aa;
	}
}

/* ── Dark theme (explicit user override — always wins) ── */
[data-theme="dark"] {
	--bg-page: #07070e;
	--bg-surface: #0d0d1a;
	--bg-glass: rgba(255, 255, 255, 0.04);
	--border: rgba(255, 255, 255, 0.07);
	--text-primary: #f0f0f8;
	--text-secondary: #8888aa;
}
```

**Flash prevention** — add this blocking inline script at the very top of `<head>`, before any stylesheet:

```html
<script>
	(function () {
		var stored = localStorage.getItem("nowbat-theme");
		var system = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		document.documentElement.setAttribute("data-theme", stored || system);
	})();
</script>
```

The `ThemeToggle` component writes to both `localStorage` and `document.documentElement.dataset.theme` on click.

---

## 2. Logotype (Wordmark)

### Concept

The logo for the marketing website is a **logotype**: the Persian word "نوبت" rendered in Vazirmatn Bold (weight 700), all in `#378ADD`. No pictorial element accompanies it on the marketing site. The letterforms of Vazirmatn Bold at display size are distinctive enough to form a brand identity.

For contexts requiring both Persian and Latin script (e.g., the `<title>` tag, OG images), the format is: **نوبت · Nowbat** (Persian first, middle dot separator, then Latin).

### Wordmark Specifications

| Property    | Value                                                   |
| ----------- | ------------------------------------------------------- |
| Font        | Vazirmatn Bold (weight 700)                             |
| Color       | `#378ADD`                                               |
| Size range  | 20px–40px (navigation), 40px–64px (hero contexts)       |
| Direction   | RTL (the word is inherently right-to-left)              |
| Clear space | Minimum 50% of the "ن" glyph width on all sides         |
| Background  | Transparent (placed over `--bg-page` or `--bg-surface`) |

**Do not:**

- Apply the text gradient to the wordmark
- Use weights other than 700
- Recolor it to anything other than `#378ADD` or `#FFFFFF` (white, on very dark photo backgrounds only)
- Add borders, boxes, or decorative elements around the text

### SVG Wordmark File

See: `website/public/logo-wordmark.svg`

The SVG uses a `<text>` element referencing Vazirmatn. In production, the wordmark will render correctly because Vazirmatn is always loaded on the page. For non-web contexts (e.g., app icons, printed materials), convert to paths using `Object to Path` in Inkscape/Illustrator.

---

## 3. Icon Mark (Favicon Base)

### Concept

The wordmark is not legible at favicon size (16–32px). The favicon uses an abstract geometric icon mark:

**Shape:** A rounded square background (`border-radius: 22%` of its size) filled with `#378ADD`.
**Symbol inside:** A minimal clock/appointment icon in white:

- A circle outline (the clock face)
- An hour hand pointing to ~10 o'clock
- A minute hand pointing straight up (12 o'clock)
- A 1.5px dot at the center
- All strokes: white, `stroke-linecap: round`, `stroke-width: 2`

This references the core concept of Nowbat: scheduled time slots. It is legible at 16×16px.

### Icon Mark Usage

| Context                | Size                | File                                               |
| ---------------------- | ------------------- | -------------------------------------------------- |
| Browser favicon `.ico` | 16×16, 32×32, 48×48 | `public/favicon.ico` (from `favicon.svg`)          |
| SVG favicon            | Vector              | `public/favicon.svg`                               |
| Apple touch icon       | 180×180             | `public/apple-touch-icon.png` (from `favicon.svg`) |
| Android icon           | 192×192             | `public/icon-192.png`                              |
| Android icon large     | 512×512             | `public/icon-512.png`                              |
| OG image branding      | 48×48               | Embedded in `og-template.svg`                      |

See: `website/public/favicon.svg`, `website/public/logo-mark.svg`

---

## 4. Open Graph Image Template

### Dimensions

**1200 × 630px** — the standard OG image size, displayed by Twitter, LinkedIn, iMessage, WhatsApp, and all major platforms.

### Layout Spec

```
┌──────────────────────────────────────────────────────────┐
│  Background: #07070E                                       │
│                                                            │
│  ┌──── content zone: 80px padding all sides ────────────┐ │
│  │                                                       │ │
│  │  [icon 48×48px]  نوبت  ·  Nowbat    (brand + white)  │ │
│  │                                                       │ │
│  │                                                       │ │
│  │  [PAGE TITLE — up to 2 lines                          │ │
│  │   Vazirmatn 700 — 56px — #F0F0F8                      │ │
│  │   max-width: 860px]                                   │ │
│  │                                                       │ │
│  │  [description — 1 line                                │ │
│  │   Vazirmatn 400 — 24px — #8888AA                      │ │
│  │   max-width: 720px]                                   │ │
│  │                                                       │ │
│  │                                                       │ │
│  │  [site URL — bottom-left — body-sm — #5A5A7A]         │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                            │
│  Right 40%: subtle brand-blue glow radial                  │
│  rgba(55,138,221,0.06) from right edge                     │
│  (this is a background effect on the image, not a          │
│  CSS gradient on a surface — allowed in image context)     │
│                                                            │
│  Bottom edge: 4px solid #378ADD accent line                │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### Dynamic Generation

OG images are generated at request time via `@vercel/og` in a Next.js route handler at `app/api/og/route.tsx`. The template accepts query params:

| Param         | Description                | Default                                 |
| ------------- | -------------------------- | --------------------------------------- |
| `title`       | Page title (URI-encoded)   | "نوبت — سیستم نوبت‌دهی آنلاین"          |
| `description` | Short subtitle             | "افزونه وردپرس برای کسب‌وکارهای ایرانی" |
| `type`        | `page` \| `post` \| `docs` | `page`                                  |

Each route's `generateMetadata` returns an `openGraph.images` URL pointing to this handler.

### Static OG Images

The landing page and high-traffic pages also have a static pre-rendered OG image (`public/og/home.png`, `public/og/docs.png`) for maximum performance — the dynamic handler is a fallback for blog/docs pages.

See: `website/public/og-template.svg` (reference layout, not used at runtime)

---

## 5. Icons

### Icon Library

All icons on the website use **Tabler Icons** — the same library used in the admin SPA. This ensures visual consistency between the plugin UI (which users see after installing) and the marketing website (which they see before installing).

**Package:** `@tabler/icons-react`
**Style:** Outline (2px stroke), not filled
**Size standard:**

| Context             | Size                                 |
| ------------------- | ------------------------------------ |
| Feature grid cards  | 32×32px                              |
| How-it-works steps  | 48×48px                              |
| Navigation items    | 20×20px                              |
| Inline text icons   | 16×16px                              |
| Button icons        | 16×16px (sm button), 20×20px (md/lg) |
| Footer social links | 20×20px                              |

**Color:** Icons inherit `currentColor` from their parent's text color unless explicitly set to `var(--brand)`.

### Directional Icons in RTL

Icons that imply direction must be flipped in RTL context. Apply `transform: scaleX(-1)` (or Tailwind's `rtl:scale-x-[-1]`) to:

- `IconArrowRight` / `IconArrowLeft`
- `IconChevronRight` / `IconChevronLeft`
- `IconArrowNarrowRight` / `IconArrowNarrowLeft`
- Any icon with an arrow or directional implication

Icons that are symmetrical (check marks, X marks, stars, calendars, clocks) do **not** need flipping.

---

## 6. Screenshot & Mockup Standards

All plugin screenshots used on the marketing site must:

1. Be captured on a `1440×900` viewport at `2x` device pixel ratio (resulting in `2880×1800` source images, displayed at half size)
2. Provide screenshots in both themes where possible; use dark theme for the primary hero mockup and at least two light-theme screenshots in the alternating-feature sections to demonstrate both
3. Use the demo data from the Demo Data Spec (Phase 1), not real user data
4. Be exported as WebP (primary) with PNG fallback
5. Have all sensitive information replaced with fictional data (آرایشگاه نمونه, etc.)
6. Not show the browser chrome (URL bar, browser UI) — crop to the plugin UI only

**Screenshot subjects and file names:**

| Subject                           | File                              | Used in                         |
| --------------------------------- | --------------------------------- | ------------------------------- |
| Dashboard full view               | `screenshots/dashboard.webp`      | HeroSection, AlternatingFeature |
| Appointments list with filter bar | `screenshots/appointments.webp`   | AlternatingFeature              |
| Booking wizard Step 3 (calendar)  | `screenshots/booking-wizard.webp` | AlternatingFeature              |
| Payment settings tab              | `screenshots/payments.webp`       | AlternatingFeature              |
| SMS settings tab                  | `screenshots/sms.webp`            | AlternatingFeature              |
| Reports revenue chart             | `screenshots/reports.webp`        | AlternatingFeature              |
| Calendar weekly view              | `screenshots/calendar.webp`       | Demo page carousel              |
| Staff management page             | `screenshots/staff.webp`          | Demo page carousel              |

All screenshots live in `public/screenshots/`. The `next/image` component handles WebP/AVIF conversion at build time.

---

## 7. Favicon Implementation

In `app/[locale]/layout.tsx`:

```tsx
export const metadata: Metadata = {
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", sizes: "32x32" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
};
```

The SVG favicon is the primary format (supported by all modern browsers). The `.ico` fallback covers legacy browsers.
