# ProNobat · pronobat-website

> وب‌سایت رسمی افزونه نوبت‌دهی آنلاین **ProNobat** — مارکتینگ، مستندات، و راهنماها.

**Live →** [pronobat.ir](https://pronobat.ir) &nbsp;·&nbsp; **Plugin →** [rtl-theme.com/product/pronobat](https://www.rtl-theme.com/product/pronobat/)

---

## Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 15 (App Router, SSG)                |
| Styling    | Tailwind CSS v3 + CSS custom properties     |
| i18n       | next-intl — Persian (`fa`) + English (`en`) |
| Content    | MDX (docs & guides)                         |
| Animations | Framer Motion 12                            |
| Icons      | Tabler Icons React                          |

**Design system:** dark/light themes via `data-theme` on `<html>`, driven entirely by CSS variables. Primary accent `#378ADD`. RTL-first.

---

## Project Structure

```
src/
├── app/[locale]/          # Route pages (home, docs, guides, features, …)
├── components/
│   ├── layout/            # SiteHeader, SiteFooter, ThemeToggle, LocaleToggle
│   ├── marketing/         # HeroSection, FeatureStrip, HowItWorks, PricingCard, …
│   ├── docs/              # DocsSidebar, DocsHeader, SearchModal, DocsPager
│   └── ui/                # Button, Badge, CodeBlock, GlassCard, Tabs, Steps, …
├── content/
│   ├── docs/              # MDX documentation (getting-started, config, integrations, …)
│   └── guides/            # MDX how-to guides
├── styles/
│   └── globals.css        # CSS tokens, typography scale, theme cascade
└── lib/                   # i18n helpers, utils
i18n/                      # next-intl routing & request config
messages/                  # fa.json / en.json translation strings
```

---

## Development

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build
npm run lint
npm run type-check
```

---

## i18n

Default locale is **Persian (`fa`)**, with full English (`en`) support. Translation strings live in `messages/fa.json` and `messages/en.json`. Locale is part of the URL path (`/fa/…`, `/en/…`); the root `/` redirects to the user's preferred locale via middleware.

---

## Theme

Themes are handled purely via CSS custom properties with no JavaScript flicker:

- Default: system preference (`prefers-color-scheme`)
- Override: `data-theme="dark"` / `data-theme="light"` on `<html>`
- Persisted in `localStorage` under `pronobat-theme`

---

## License

MIT — website source only. The ProNobat WordPress plugin itself is a commercial product available at [rtl-theme.com/product/pronobat](https://www.rtl-theme.com/product/pronobat/).
