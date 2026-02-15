import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/images/logo.png"
              alt="Celik Kalip Makina"
              width={160}
              height={54}
              className="h-12 w-auto mb-4 bg-white rounded-lg p-1"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              {[
                { href: "/" as const, label: nav("home") },
                { href: "/hakkimizda" as const, label: nav("about") },
                { href: "/urunler" as const, label: nav("products") },
                { href: "/referanslar" as const, label: nav("references") },
                { href: "/iletisim" as const, label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--color-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact")}</h3>
            <div className="space-y-3">
              <a href="tel:+905550660277" className="flex items-center gap-3 text-gray-400 hover:text-[var(--color-primary)] text-sm transition-colors">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0555 066 02 77
              </a>
              <a href="mailto:s.celik@celikkalipmakina.com" className="flex items-center gap-3 text-gray-400 hover:text-[var(--color-primary)] text-sm transition-colors">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                s.celik@celikkalipmakina.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Celik Kalip Makina. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
