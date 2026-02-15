"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Reference {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  order: number;
}

export default function ReferanslarPage() {
  const t = useTranslations("references");
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/references")
      .then((r) => r.json())
      .then((data) => {
        setReferences(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-red-100 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{t("heading")}</h2>
            <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">{t("description")}</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]" />
            </div>
          ) : references.length === 0 ? (
            <p className="text-center text-[var(--color-text-light)] py-20">{t("no_references")}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {references.map((ref) => {
                const content = (
                  <div
                    key={ref.id}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-border)] hover:shadow-lg transition-all duration-300 flex items-center justify-center aspect-[3/2] group"
                  >
                    <Image
                      src={ref.logoUrl}
                      alt={ref.name}
                      width={240}
                      height={120}
                      className="max-h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
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
