import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  HeroSection,
  StatStrip,
  FeatureStrip,
  HowItWorksSection,
  AlternatingFeature,
  FeatureGrid,
  DemoCtaBanner,
  TestimonialsCarousel,
  FaqAccordion,
} from "@/components/marketing";
import { SiteHeader, SiteFooter } from "@/components/layout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir";
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(t("og_title"))}&description=${encodeURIComponent(t("og_description"))}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: locale === "fa" ? siteUrl : `${siteUrl}/en`,
      languages: {
        fa: siteUrl,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      url: locale === "fa" ? siteUrl : `${siteUrl}/en`,
      title: t("og_title"),
      description: t("og_description"),
      siteName: "نوبت",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("og_title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
      images: [ogImageUrl],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LandingDashboard" });
  const tWizard = await getTranslations({ locale, namespace: "LandingBookingWizard" });
  const tPayments = await getTranslations({ locale, namespace: "LandingPayments" });
  const tSms = await getTranslations({ locale, namespace: "LandingSms" });
  const tReports = await getTranslations({ locale, namespace: "LandingReports" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "نوبت (Nowbat)",
    description:
      locale === "fa"
        ? "افزونه نوبت‌دهی آنلاین فارسی برای وردپرس با تقویم جلالی، درگاه‌های پرداخت ایرانی، و پیامک فارسی"
        : "Persian-first online appointment scheduling WordPress plugin with Jalali calendar, Iranian payment gateways, and Persian SMS",
    operatingSystem: "WordPress 6.0+",
    applicationCategory: "BusinessApplication",
    inLanguage: ["fa", "en"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IRR",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nowbat.ir",
    softwareVersion: "1.0.0",
    releaseNotes: "https://github.com/YOUSSSOF/nowbat/blob/master/docs/PROGRESS.md",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Stats */}
        <StatStrip />

        {/* 3. Feature strip */}
        <FeatureStrip />

        {/* 4. How it works */}
        <HowItWorksSection />

        {/* 5. Admin Dashboard */}
        <AlternatingFeature
          overline={t("overline")}
          title={t("title")}
          description={t("description")}
          bullets={[t("bullet_1"), t("bullet_2"), t("bullet_3"), t("bullet_4")]}
          imageSrc="/images/screenshot-dashboard.svg"
          imageAlt={t("image_alt")}
          imageWidth={600}
          imageHeight={400}
        />

        {/* 6. Booking Wizard (reversed) */}
        <AlternatingFeature
          overline={tWizard("overline")}
          title={tWizard("title")}
          description={tWizard("description")}
          bullets={[
            tWizard("bullet_1"),
            tWizard("bullet_2"),
            tWizard("bullet_3"),
            tWizard("bullet_4"),
          ]}
          imageSrc="/images/screenshot-booking-wizard.svg"
          imageAlt={tWizard("image_alt")}
          imageWidth={600}
          imageHeight={400}
          reverse
        />

        {/* 7. Payment Gateways */}
        <AlternatingFeature
          overline={tPayments("overline")}
          title={tPayments("title")}
          description={tPayments("description")}
          bullets={[
            tPayments("bullet_1"),
            tPayments("bullet_2"),
            tPayments("bullet_3"),
            tPayments("bullet_4"),
          ]}
          imageSrc="/images/screenshot-payment-gateways.svg"
          imageAlt={tPayments("image_alt")}
          imageWidth={600}
          imageHeight={400}
        />

        {/* 8. SMS Notifications (reversed) */}
        <AlternatingFeature
          overline={tSms("overline")}
          title={tSms("title")}
          description={tSms("description")}
          bullets={[tSms("bullet_1"), tSms("bullet_2"), tSms("bullet_3"), tSms("bullet_4")]}
          imageSrc="/images/screenshot-sms-notifications.svg"
          imageAlt={tSms("image_alt")}
          imageWidth={600}
          imageHeight={400}
          reverse
        />

        {/* 9. Reports & Analytics */}
        <AlternatingFeature
          overline={tReports("overline")}
          title={tReports("title")}
          description={tReports("description")}
          bullets={[
            tReports("bullet_1"),
            tReports("bullet_2"),
            tReports("bullet_3"),
            tReports("bullet_4"),
          ]}
          imageSrc="/images/screenshot-reports.svg"
          imageAlt={tReports("image_alt")}
          imageWidth={600}
          imageHeight={400}
        />

        {/* 10. Feature grid */}
        <FeatureGrid />

        {/* 11. Demo CTA banner */}
        <DemoCtaBanner />

        {/* 12. Testimonials */}
        <TestimonialsCarousel />

        {/* 13. FAQ */}
        <FaqAccordion />
      </main>
      <SiteFooter />
    </>
  );
}
