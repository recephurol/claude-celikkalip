import { readData } from "@/lib/json-store";
import ProductSlider from "@/components/ProductSlider";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 60;

interface ProductImage { id: number; url: string; alt: string | null; order: number; }
interface Product { id: number; title: string; description: string | null; category: string | null; isActive: boolean; order: number; images: ProductImage[]; }

async function getProducts() {
  const products = await readData<Product>("products.json");
  return products
    .filter((p) => p.isActive)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, images: p.images.sort((a, b) => a.order - b.order) }));
}

export default async function UrunlerPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getProducts();
  return <ProductsContent products={products} />;
}

function ProductsContent({ products }: { products: any[] }) {
  const t = useTranslations("products");

  return (
    <>
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-red-100 max-w-2xl">{t("page_subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductSlider products={products} />
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">{t("seo_title")}</h2>
          <div className="text-[var(--color-text-light)] leading-relaxed space-y-4">
            <p dangerouslySetInnerHTML={{ __html: t("seo_p1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("seo_p2") }} />
            <p dangerouslySetInnerHTML={{ __html: t("seo_p3") }} />
          </div>
        </div>
      </section>
    </>
  );
}
