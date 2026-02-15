import { MetadataRoute } from "next";

const baseUrl = "https://celikkalipmakina.com";
const locales = ["tr", "en", "de", "ru", "fr"];
const defaultLocale = "tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/hakkimizda", "/urunler", "/iletisim"];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? "" : `/${locale}`;
      entries.push({
        url: `${baseUrl}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
