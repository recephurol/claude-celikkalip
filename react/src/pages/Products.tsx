import { useTranslation } from 'react-i18next';
import ProductSlider from '../components/ProductSlider';
import { getProducts } from '../lib/store';

export default function Products() {
  const { t } = useTranslation();
  const products = getProducts()
    .filter((p) => p.isActive)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, images: p.images.sort((a, b) => a.order - b.order) }));

  return (
    <>
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('products.title')}</h1>
          <p className="text-lg text-red-100 max-w-2xl">{t('products.page_subtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSlider products={products} />
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">{t('products.seo_title')}</h2>
          <div className="text-[var(--color-text-light)] leading-relaxed space-y-4">
            <p dangerouslySetInnerHTML={{ __html: t('products.seo_p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('products.seo_p2') }} />
            <p dangerouslySetInnerHTML={{ __html: t('products.seo_p3') }} />
          </div>
        </div>
      </section>
    </>
  );
}
