import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
}

interface Product {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  images: ProductImage[];
}

export default function ProductSlider({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-[var(--color-text-light)]">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p>Henuz urun eklenmemis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="product-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)] group">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Grid (all products) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={`grid-${product.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)]"
          >
            {/* Image Gallery for each product */}
            {product.images.length > 1 ? (
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="aspect-[4/3]"
              >
                {product.images.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img
                      src={img.url}
                      alt={img.alt || product.title}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              {product.category && (
                <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-primary)] mt-1 mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
