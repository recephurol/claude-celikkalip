import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Celik Kalip Makina | Kalip Imalati & Kaucuk Uretimi - Bursa",
    template: "%s | Celik Kalip Makina",
  },
  description:
    "Bursa merkezli celik kalip imalati, kaucuk uretimi, silikon kalip, plastik enjeksiyon kaliplari. CNC isleme, teknik kaucuk parcalar, contalar, ozel profiller. 20+ yillik tecrube.",
  keywords: [
    "celik kalip", "kalip imalati", "kaucuk uretimi", "silikon kalip",
    "plastik enjeksiyon kalip", "CNC kalip isleme", "teknik kaucuk",
    "steel mold", "rubber production", "mold manufacturing",
    "Stahlform", "Gummiproduktion", "Formenbau",
    "Bursa kalip", "Bursa kaucuk",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Celik Kalip Makina",
    title: "Celik Kalip Makina | Kalip Imalati & Kaucuk Uretimi",
    description:
      "Celik kalip imalati, kaucuk uretimi, silikon kalip ve plastik enjeksiyon kaliplari.",
    images: [{ url: "/images/logo.png", width: 400, height: 135, alt: "Celik Kalip Makina Logo" }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Celik Kalip Makina",
  image: "https://celikkalipmakina.com/images/logo.png",
  description: "Celik kalip imalati, kaucuk uretimi, silikon kalip ve plastik enjeksiyon kaliplari.",
  telephone: "+905550660277",
  email: "s.celik@celikkalipmakina.com",
  url: "https://celikkalipmakina.com",
  address: { "@type": "PostalAddress", addressLocality: "Bursa", addressCountry: "TR" },
  geo: { "@type": "GeoCoordinates", latitude: 40.22097, longitude: 29.07069 },
  openingHours: "Mo-Fr 08:00-18:00, Sa 08:00-13:00",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kalip ve Kaucuk Urunleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Celik Kalip Imalati" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kaucuk Uretimi" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Silikon Kalip Uretimi" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plastik Enjeksiyon Kaliplari" } },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="TR-16" />
        <meta name="geo.placename" content="Bursa" />
        <meta name="geo.position" content="40.220970;29.07069" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
