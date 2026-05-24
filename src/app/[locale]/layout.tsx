import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/../i18n/routing";
import { ContentProtection } from "@/components/layout";
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const themeScript =
  "(function(){try{" +
  "document.documentElement.lang='fa';" +
  "document.documentElement.dir='rtl';" +
  "var s=localStorage.getItem('pronobat-theme');" +
  "var d=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';" +
  "document.documentElement.setAttribute('data-theme',s||d);" +
  "}catch(e){}})()";

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ContentProtection />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
