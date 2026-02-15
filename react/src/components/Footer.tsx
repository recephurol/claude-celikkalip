import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img
              src="/images/logo.png"
              alt="Celik Kalip Makina"
              className="h-12 w-auto mb-4 bg-white rounded-lg p-1"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/hakkimizda', label: t('nav.about') },
                { href: '/urunler', label: t('nav.products') },
                { href: '/referanslar', label: t('nav.references') },
                { href: '/iletisim', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[var(--color-primary)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <a href="tel:+905385034609" className="flex items-center gap-3 text-gray-400 hover:text-[var(--color-primary)] text-sm transition-colors">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +90 538 503 46 09
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
          &copy; {new Date().getFullYear()} Celik Kalip Makina. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
