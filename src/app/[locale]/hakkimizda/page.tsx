import { readData } from "@/lib/json-store";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 60;

interface PageContent { id: number; slug: string; title: string; content: string; }

async function getAboutContent() {
  const pages = await readData<PageContent>("pages.json");
  return pages.find((p) => p.slug === "hakkimizda") || null;
}

export default async function HakkimizdaPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const about = await getAboutContent();
  return <AboutContent about={about} />;
}

function AboutContent({ about }: { about: any }) {
  const t = useTranslations("about");
  const features = [
    { title: t("feature1_title"), desc: t("feature1_desc"), icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { title: t("feature2_title"), desc: t("feature2_desc"), icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { title: t("feature3_title"), desc: t("feature3_desc"), icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { title: t("feature4_title"), desc: t("feature4_desc"), icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <article>
              <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-8">{about?.title || "Celik Kalip Makina"}</h2>
              <div className="prose prose-lg max-w-none">
                {(about?.content || "").split("\n\n").map((p: string, i: number) => (
                  <p key={i} className="text-[var(--color-text-light)] leading-relaxed mb-6">{p}</p>
                ))}
              </div>
            </article>
            <aside className="space-y-6">
              {features.map((item) => (
                <div key={item.title} className="flex gap-5 p-6 bg-white rounded-xl shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--color-text-light)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{t("vision_title")}</h3>
              <p className="text-[var(--color-text-light)] leading-relaxed">{t("vision_text")}</p>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{t("mission_title")}</h3>
              <p className="text-[var(--color-text-light)] leading-relaxed">{t("mission_text")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
