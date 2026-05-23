# Animation Specification

> Phase 2 output. Every animation on the website is defined here. Developers implement from this spec — no design decisions should be made at implementation time.

---

## Core Principle

Animations serve one purpose: **reduce cognitive load by making state changes spatial**. They are never decorative. If removing an animation would not hurt comprehension, the animation should not exist.

---

## Global Timing Functions

All easing values reference named CSS custom properties declared on `:root`.

```css
:root {
	/* Spring-like deceleration — for elements entering the screen */
	--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

	/* Standard ease — for color/opacity transitions, hover states */
	--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

	/* Exit ease — for elements leaving the screen */
	--ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## 1. Entry Animations (Elements Appearing)

### Scroll-triggered fade-up

Applied to: section headlines, feature cards, how-it-works steps, stats, testimonials, docs prose sections.

**Mechanism:** IntersectionObserver with `threshold: 0.1`. When an element enters the viewport, add a class `.is-visible`. Initial state via CSS.

```css
.animate-on-scroll {
	opacity: 0;
	transform: translateY(12px);
	transition:
		opacity 400ms var(--ease-spring),
		transform 400ms var(--ease-spring);
}

.animate-on-scroll.is-visible {
	opacity: 1;
	transform: translateY(0);
}
```

**Stagger:** When animating a group (e.g., `FeatureGrid` cards), add `transition-delay` with 60ms increments per item:

```css
.animate-on-scroll:nth-child(1) {
	transition-delay: 0ms;
}
.animate-on-scroll:nth-child(2) {
	transition-delay: 60ms;
}
.animate-on-scroll:nth-child(3) {
	transition-delay: 120ms;
}
.animate-on-scroll:nth-child(4) {
	transition-delay: 180ms;
}
/* ... cap at 360ms (60ms × 6) to prevent long waits on large grids */
```

**Maximum stagger:** 360ms total (6 items × 60ms). Items beyond index 6 all use 360ms delay.

### Page transitions (Next.js App Router)

Applies to top-level route changes. Implemented via Framer Motion `AnimatePresence` in the root layout.

```tsx
// Per-page wrapper
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
>
```

Duration: `250ms`. Exit: opacity fade only (no translateY on exit to avoid jarring backward motion).

### Modal / Overlay entry

Applies to: `SearchModal`, `ScreenshotGallery` lightbox, docs mobile sidebar drawer.

**Backdrop:** `opacity: 0 → 1`, `200ms`, `--ease-standard`.
**Panel:** `scale(0.96) → scale(1)` + `opacity: 0 → 1`, `250ms`, `--ease-spring`.

```css
.modal-backdrop {
	transition: opacity 200ms var(--ease-standard);
}
.modal-panel {
	transition:
		opacity 250ms var(--ease-spring),
		transform 250ms var(--ease-spring);
}
.modal-panel[data-state="closed"] {
	opacity: 0;
	transform: scale(0.96);
}
.modal-panel[data-state="open"] {
	opacity: 1;
	transform: scale(1);
}
```

### Toast notification entry/exit

**Enter:** `translateX(calc(100% + 16px)) → translateX(0)`, `300ms`, `--ease-spring`.
**Exit:** `translateX(calc(100% + 16px))` + `opacity: 0 → 0`, `200ms`, `--ease-exit`.

---

## 2. Hover & Interactive Transitions

All hover transitions use `150ms ease-out` (matching `--ease-standard` exit phase).

| Element                       | Hover Effect                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `GlassCard` (hoverable)       | `transform: scale(1.02)`, `border-color: rgba(55,138,221,0.25)`                 |
| `GlassCard` with `accentSide` | Left/right border brightens: `opacity: 0.4 → 1` on the accent border            |
| `Button` (all variants)       | Opacity shift: primary `0.9`, outline/ghost `border-color` + `color` transition |
| `Button:active`               | `transform: scale(0.98)`, `100ms`                                               |
| Nav links                     | `color: var(--text-secondary) → var(--text-primary)`                            |
| Docs sidebar links            | `color` transition + left-border `opacity: 0 → 1` on active                     |
| `Accordion` trigger           | Chevron rotates `0deg → 180deg` when open, `250ms`, `--ease-standard`           |
| External links                | Color: `--text-primary → --brand`                                               |
| Image thumbnails              | `opacity: 0.85 → 1.0`                                                           |

**Rule:** Never animate `width`, `height`, or `padding` directly — always animate `transform` and `opacity` for performance. Use CSS `grid-template-rows: 0fr → 1fr` for height animations (accordion).

---

## 3. Specific Component Animations

### Hero screenshot pulse

The "pending" status badge on the dashboard screenshot in `HeroSection` has a subtle pulse to draw attention to the "live" nature of the dashboard:

```css
@keyframes nowbat-pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.45;
	}
}

.hero-status-badge {
	animation: nowbat-pulse 2.5s ease-in-out infinite;
}
```

This is one of only two looping animations permitted on the site (the other is the scrolling `FeatureStrip` on mobile). All other animations are triggered by interaction or scroll.

### FeatureStrip auto-scroll (mobile only)

On mobile (< 768px), the `FeatureStrip` can auto-scroll using a CSS keyframe. Applied only via `@media (max-width: 767px)` and paused on hover/focus:

```css
@keyframes nowbat-scroll {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-50%);
	}
}

.feature-strip-inner {
	animation: nowbat-scroll 20s linear infinite;
}
.feature-strip-inner:hover,
.feature-strip-inner:focus-within {
	animation-play-state: paused;
}
```

The inner content is duplicated (original + copy) for seamless looping.

### Accordion content

Uses CSS grid rows for height animation (GPU-compositable):

```css
.accordion-content {
	display: grid;
	grid-template-rows: 0fr;
	transition: grid-template-rows 250ms var(--ease-spring);
}

.accordion-content[data-open="true"] {
	grid-template-rows: 1fr;
}

.accordion-content > div {
	overflow: hidden;
}
```

### Tabs panel switch

```css
.tab-panel {
	transition: opacity 150ms var(--ease-standard);
}
.tab-panel[data-active="false"] {
	opacity: 0;
	pointer-events: none;
}
.tab-panel[data-active="true"] {
	opacity: 1;
}
```

### `SiteHeader` scroll transition

Transitions from transparent to glass background as user scrolls past 64px:

```css
.site-header {
	transition:
		background-color 300ms var(--ease-standard),
		backdrop-filter 300ms var(--ease-standard),
		border-color 300ms var(--ease-standard);
}
```

Implemented with a `useScrolled` hook that adds `.is-scrolled` class at 64px scroll depth.

### Copy button checkmark

After a user copies code, the copy icon in `CodeBlock` switches to a checkmark for 2 seconds, then back:

```css
.copy-icon {
	transition: opacity 150ms var(--ease-standard);
}
.copy-icon-check {
	transition: opacity 150ms var(--ease-standard);
}
```

Managed via `useState` timeout in the `CodeBlock` component. No animation libraries needed.

---

## 4. Reduced Motion

**All** animations must respect the `prefers-reduced-motion: reduce` media query. Implementation pattern:

```css
@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

This single rule block is placed in `styles/globals.css` and eliminates all CSS animation/transition globally.

For Framer Motion animations, set `useReducedMotion()` hook and conditionally apply:

```tsx
const reducedMotion = useReducedMotion();

<motion.div
  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
>
```

---

## 5. Framer Motion Usage Policy

Framer Motion is used for:

- Page-level route transitions (root layout only)
- `TestimonialsCarousel` slide animation
- `ScreenshotGallery` lightbox open/close

Framer Motion is **NOT** used for:

- Hover transitions (CSS `transition` is sufficient and has no JS overhead)
- Accordion expand/collapse (CSS grid rows are better)
- Toast entry/exit (CSS transform is sufficient)
- Scroll-triggered fade-ups (IntersectionObserver + CSS is sufficient)

**Rationale:** Framer Motion adds ~31KB to the client bundle. Only use it when CSS transitions cannot achieve the required effect.

---

## 6. Animation Timing Reference

| Animation              | Duration             | Easing            | Trigger              |
| ---------------------- | -------------------- | ----------------- | -------------------- |
| Scroll fade-up         | 400ms                | `--ease-spring`   | IntersectionObserver |
| Stagger delay per item | +60ms                | —                 | Item index           |
| Page route transition  | 250ms                | `--ease-standard` | Route change         |
| Modal appear           | 250ms                | `--ease-spring`   | User action          |
| Modal backdrop         | 200ms                | `--ease-standard` | User action          |
| Hover (cards)          | 150ms                | `ease-out`        | `:hover`             |
| Hover (buttons)        | 150ms                | `ease-out`        | `:hover`             |
| Button press           | 100ms                | `ease-out`        | `:active`            |
| Accordion              | 250ms                | `--ease-spring`   | Click                |
| Tab switch             | 150ms                | `--ease-standard` | Click                |
| Header scroll          | 300ms                | `--ease-standard` | Scroll               |
| Toast enter            | 300ms                | `--ease-spring`   | State change         |
| Toast exit             | 200ms                | `--ease-exit`     | State change         |
| Hero badge pulse       | 2500ms               | `ease-in-out`     | Loop                 |
| Feature strip scroll   | 20000ms              | `linear`          | Loop                 |
| Copy checkmark         | instant + 2s timeout | —                 | Click                |
