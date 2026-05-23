# Spacing Scale

> Phase 2 output — locked for Phase 3. All layout values across every component and page section must use only the values listed here.

---

## Base Unit

**4px** is the base unit. Every spacing value is a multiple of 4.

---

## Named Scale

| Step | px  | rem     | Tailwind Class               | Semantic Name | Typical Usage                                                                    |
| ---- | --- | ------- | ---------------------------- | ------------- | -------------------------------------------------------------------------------- |
| 1    | 4   | 0.25rem | `p-1`, `gap-1`, `space-1`    | nano          | Icon inner padding, badge padding, tight list gaps                               |
| 2    | 8   | 0.5rem  | `p-2`, `gap-2`, `space-2`    | micro         | Button internal padding (vertical), form input padding (vertical), list item gap |
| 3    | 12  | 0.75rem | `p-3`, `gap-3`, `space-3`    | compact       | Button padding (horizontal), inline tag spacing, tight card padding              |
| 4    | 16  | 1rem    | `p-4`, `gap-4`, `space-4`    | base          | Default element padding, card inner padding (small), nav item padding            |
| 6    | 24  | 1.5rem  | `p-6`, `gap-6`, `space-6`    | comfortable   | Card inner padding (standard), grid gap (small), form group spacing              |
| 8    | 32  | 2rem    | `p-8`, `gap-8`, `space-8`    | spacious      | Card inner padding (large), section inner top/bottom, grid gap (standard)        |
| 12   | 48  | 3rem    | `p-12`, `gap-12`, `space-12` | roomy         | Section divider spacing, docs sidebar padding, feature card padding              |
| 16   | 64  | 4rem    | `p-16`, `gap-16`, `space-16` | generous      | Section top/bottom padding (mobile), grid gap (large)                            |
| 24   | 96  | 6rem    | `p-24`, `gap-24`, `space-24` | grand         | Section top/bottom padding (desktop), hero vertical whitespace                   |
| 32   | 128 | 8rem    | `p-32`                       | —             | Max-width container horizontal padding (large screens)                           |

> **Rule:** If you feel the urge to use a spacing value not in this table (e.g., 20px, 36px, 40px), pick the nearest scale step. No exceptions.

---

## Semantic Spacing Aliases

Named aliases for common layout patterns. Use these Tailwind-custom utility classes instead of raw step numbers in layout components:

```
section-y      → py-16 md:py-24          (section top/bottom padding)
section-x      → px-4 md:px-8            (section horizontal padding, inside container)
card-inner     → p-6 md:p-8              (glass card padding)
card-inner-sm  → p-4                     (small card / pill padding)
grid-gap       → gap-6 md:gap-8          (standard component grid gap)
grid-gap-lg    → gap-8 md:gap-12         (large feature grid gap)
form-gap       → gap-4 md:gap-6          (form field vertical spacing)
stack-sm       → space-y-2               (tight text stacks)
stack          → space-y-4               (standard text stacks)
stack-lg       → space-y-6               (paragraph groups)
```

These are declared in `tailwind.config.ts` under `theme.extend.spacing` and as custom utilities.

---

## Container Widths

| Name            | Max Width | Usage                                            |
| --------------- | --------- | ------------------------------------------------ |
| `container-xs`  | 480px     | Single-column narrow content (forms, auth pages) |
| `container-sm`  | 640px     | Blog post content, docs body text                |
| `container-md`  | 768px     | Default docs layout body                         |
| `container-lg`  | 1024px    | Standard page content                            |
| `container-xl`  | 1280px    | Full-width marketing page sections               |
| `container-2xl` | 1440px    | Hero sections with full-bleed visual             |

The global page container is `container-xl`. Never exceed `container-2xl`. Never set container-level padding outside the `section-x` alias.

---

## Breakpoints

| Name      | Min Width | Tailwind Prefix | Description                        |
| --------- | --------- | --------------- | ---------------------------------- |
| (default) | 0         | —               | Mobile phones (< 640px)            |
| `sm`      | 640px     | `sm:`           | Large phones, small tablets        |
| `md`      | 768px     | `md:`           | Tablets, small laptops             |
| `lg`      | 1024px    | `lg:`           | Laptops, desktops                  |
| `xl`      | 1280px    | `xl:`           | Large desktops                     |
| `2xl`     | 1536px    | `2xl:`          | Ultra-wide (rare adjustments only) |

---

## Border Radius Scale

Only these radius values are permitted. No other values.

| Value | Token          | Usage                                                                                     |
| ----- | -------------- | ----------------------------------------------------------------------------------------- |
| 0     | `rounded-none` | Code blocks, image fills (when inside a rounded container)                                |
| 4px   | `rounded`      | Small UI chips, badges, inline code, input borders                                        |
| 8px   | `rounded-lg`   | **Default** for cards, modals, buttons, image thumbnails. Maximum for any content element |
| 999px | `rounded-full` | Avatar circles, status indicator dots, pill badges, toggle switches                       |

> **Rule:** Border radius > 8px is banned (except `rounded-full` as listed). Do not use `rounded-xl` (12px), `rounded-2xl` (16px), or any other larger value.

---

## Z-Index Scale

| Level    | z-index | Usage                                 |
| -------- | ------- | ------------------------------------- |
| base     | 0       | Default stacking                      |
| raised   | 10      | Sticky table headers, floating labels |
| dropdown | 100     | Dropdown menus, tooltip popovers      |
| sticky   | 200     | Sticky site header                    |
| overlay  | 300     | Modal/dialog backdrops                |
| modal    | 400     | Modal/dialog panels                   |
| toast    | 500     | Toast notification stack              |
| tooltip  | 600     | Tooltip (always on top)               |

---

## Tailwind Config Integration

In `tailwind.config.ts`:

```ts
theme: {
  extend: {
    spacing: {
      // All custom semantic aliases already map to standard Tailwind steps
      // No custom numeric spacing needed — standard scale covers 4/8/12/16/24/32/48/64/96
    },
    maxWidth: {
      'container-xs':  '480px',
      'container-sm':  '640px',
      'container-md':  '768px',
      'container-lg':  '1024px',
      'container-xl':  '1280px',
      'container-2xl': '1440px',
    },
    borderRadius: {
      DEFAULT: '8px',
      sm:  '4px',
      lg:  '8px',   // same as DEFAULT; alias for clarity
      full: '9999px',
    },
    zIndex: {
      raised:   '10',
      dropdown: '100',
      sticky:   '200',
      overlay:  '300',
      modal:    '400',
      toast:    '500',
      tooltip:  '600',
    },
  },
},
```
