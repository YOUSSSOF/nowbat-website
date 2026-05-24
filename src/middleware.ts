import createMiddleware from "next-intl/middleware";
import { routing } from "@/../i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except Next.js internals, static assets, and API routes.
  // This ensures the middleware handles i18n routing for all pages.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|apple-touch-icon.png|icon-.*\\.png|og/|images/|fonts/|.*\\.svg|.*\\.png|.*\\.ico|.*\\.webp|.*\\.jpg|.*\\.jpeg).*)",
  ],
};
