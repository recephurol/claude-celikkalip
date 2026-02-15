import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeSlider from '../components/HomeSlider';
import { getProducts } from '../lib/store';

export default function Home() {
  const { t } = useTranslation();
  const products = getProducts()
    .filter((p) => p.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)
    .map((p) => ({ ...p, images: p.images.sort((a, b) => a.order - b.order).slice(0, 1) }));

  const heroImages = [
    '/images/anasayfa-urun1.jpg',
    '/images/anasayfa-urun2.jpg',
    '/images/anasayfa-urun3.jpg',
    '/images/anasayfa-urun4.jpg',
    '/images/anasayfa-urun5.jpg',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <HomeSlider images={heroImages} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <img src="/images/logo.png" alt="Celik Kalip" className="h-16 md:h-20 w-auto mb-6 bg-white/90 rounded-lg p-2" />
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {t('hero.title1')}<br />
              <span className="text-[var(--color-primary)]">{t('hero.title2')}</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link to="/urunler" className="inline-flex items-center px-8 py-4 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all shadow-lg">
                {t('hero.cta_products')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/iletisim" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[var(--color-text)] transition-all">
                {t('hero.cta_contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white relative z-10 -mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-xl p-8">
            {[
              { value: '20+', label: t('stats.experience') },
              { value: '500+', label: t('stats.projects') },
              { value: '150+', label: t('stats.clients') },
              { value: '7/24', label: t('stats.support') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{stat.value}</div>
                <div className="text-sm text-[var(--color-text-light)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">{t('services.title')}</h2>
            <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto mb-4" />
            <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', title: t('services.mold_title'), desc: t('services.mold_desc') },
              { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: t('services.rubber_title'), desc: t('services.rubber_desc') },
              { icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', title: t('services.engineering_title'), desc: t('services.engineering_desc') },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-[var(--color-border)]">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{s.title}</h3>
                <p className="text-[var(--color-text-light)] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Makine Parkuru Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Makine Parkuru</h2>
            <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                  <th className="text-left px-6 py-4 text-sm font-bold text-[var(--color-text)]">Makina Adi</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[var(--color-text)]">Adet</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[var(--color-text)]">Ozellik</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'GOODWAY TORNA CNC', count: '1 ADET', spec: '8 INC' },
                  { name: 'SUNMILL JHV 800 DIK ISLEM MERKEZI', count: '1 ADET', spec: 'X800 Y500 Z500' },
                  { name: 'LEADWELL DIK ISLEM MERKEZI', count: '1 ADET', spec: 'X1100 Y550 Z50' },
                  { name: 'ZMM UNIVERSAL TORNA', count: '2 ADET', spec: '1500 MM' },
                  { name: 'KONDIA DIK FREZE', count: '1 ADET', spec: 'X1000 Y500 Z550' },
                  { name: 'STANKOIMPORT YAN FREZE', count: '1 ADET', spec: 'X1000 Y500 Z500' },
                  { name: 'CELIKKALIP PRES', count: '1 ADET', spec: '120 TON' },
                  { name: 'HIDROLIKSAN PRES', count: '1 ADET', spec: '40 TON' },
                  { name: 'BEKAMAK TESTERE', count: '1 ADET', spec: 'BMSO 320' },
                  { name: 'MAGMAWELD GAZ ALTI KAYNAK', count: '1 ADET', spec: '350 AMPER' },
                ].map((machine, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-alt)] transition-colors">
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{machine.name}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-light)]">{machine.count}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{machine.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">{t('products.title')}</h2>
              <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto mb-4" />
              <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">{t('products.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)]">
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    {product.images[0] ? (
                      <img src={product.images[0].url} alt={product.images[0].alt || product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--color-text)] mb-2">{product.title}</h3>
                    <p className="text-sm text-[var(--color-text-light)] line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/urunler" className="inline-flex items-center px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all">
                {t('products.view_all')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* References Section */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">{t('references.title')}</h2>
            <div className="w-20 h-1 bg-[var(--color-primary)] mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={`/images/referans${i}.${i <= 2 ? 'png' : 'jpg'}`} alt={`Referans ${i}`} className="h-16 md:h-20 w-auto grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-primary)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          <Link to="/iletisim" className="inline-flex items-center px-10 py-4 bg-white text-[var(--color-primary)] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg text-lg">
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </>
  );
}
