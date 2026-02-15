import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function HomeSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop
      className="absolute inset-0 w-full h-full"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`Celik Kalip Uretim ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
