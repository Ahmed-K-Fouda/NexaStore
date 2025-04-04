"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type BannerProps = {
  products: Product[];
};

export default function Banner({ products }: BannerProps) {
  const featuredProducts = products.slice(8, 11); 

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
      >
        {featuredProducts.map((product, index) => (
          <SwiperSlide key={product._id} className="relative w-full h-full">
            <Link href={`/product/${product._id}`} className="relative w-full h-full block group">
              {product.image && (
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(product.image).width(2000).height(800).quality(100).url()} 
                    alt={product.title || "Product Image"}
                    fill
                    objectFit="cover" 
                    className="brightness-90 transition-all duration-500 group-hover:brightness-110"
                    priority={index === 0} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 text-white">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg">
                  {product.title}
                </h2>
                {product.price !== undefined && (
                  <p className="text-lg md:text-2xl font-semibold text-yellow-400 drop-shadow-lg">
                    ${product.price.toFixed(2)}
                  </p>
                )}
                <button className="mt-4 cursor-pointer bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  🚀 GRAB IT NOW
                </button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000 !important; 
        }
      `}</style>
    </div>
  );
}
