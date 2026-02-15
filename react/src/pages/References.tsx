import { useTranslation } from 'react-i18next';
import { getReferences } from '../lib/store';

export default function References() {
  const { t } = useTranslation();
  const references = getReferences().sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('references.title')}</h1>
          <p className="text-lg text-red-100 max-w-2xl">{t('references.subtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{t('references.heading')}</h2>
            <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">{t('references.description')}</p>
          </div>

          {references.length === 0 ? (
            <p className="text-center text-[var(--color-text-light)] py-20">{t('references.no_references')}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {references.map((ref) => {
                const content = (
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-border)] hover:shadow-lg transition-all duration-300 flex items-center justify-center aspect-[3/2] group">
                    <img src={ref.logoUrl} alt={ref.name} className="max-h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
                if (ref.website) {
                  return (
                    <a key={ref.id} href={ref.website} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  );
                }
                return <div key={ref.id}>{content}</div>;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
