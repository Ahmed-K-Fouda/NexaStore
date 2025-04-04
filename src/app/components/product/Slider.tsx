"use client";
import { useRef } from "react";
import { Product } from "@/sanity.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ProductItem from "./ProductItem";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderProps = {
  products: Product[];
};

export default function Slider({ products }: SliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="py-10 relative mt-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
        🚀 New Arrivals
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: true, 
          dynamicMainBullets: 3, 
          renderBullet: (index, className) =>
            `<span class="${className} w-3 h-3 mx-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 opacity-80 transition-all duration-300"></span>`,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        className="custom-swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:scale-125 transition-all z-10"
      >
        ❮
      </button>
      <button
        ref={nextRef}
        className="custom-swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:scale-125 transition-all z-10"
      >
        ❯
      </button>
    </div>
  );
}