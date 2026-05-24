import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Persian is the only supported locale.
  locales: ["fa"],
  defaultLocale: "fa",

  // No locale prefix — all routes are served at their natural paths.
  localePrefix: "never",
});
