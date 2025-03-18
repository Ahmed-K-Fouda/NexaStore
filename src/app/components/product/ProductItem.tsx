import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type productItemProps = {
  product: Product;
};

export default function ProductItem({ product }: productItemProps) {
  return (
    <div className="bg-white relative rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <span className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full animate-bounce">
          HOT!
        </span>
      </div>
      <div className="relative h-48 w-full">
        {product.image && (
          <Image
            src={urlFor(product.image).width(256).url()}
            alt={product.title || "Product Image"}
            fill
            className="object-contain p-2"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 h-10 mb-1">
          {product.title}
        </h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-500">
              ${(product.price || 0).toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${((product.price || 0) * 5).toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-green-500 font-semibold mb-2">
            🔥{" "}
            {100 +
              Math.abs(
                product._id
                  .split("")
                  .reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 500
              )}
            + sold in last{" "}
            {Math.abs(
              product._id
                .split("")
                .reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 96
            )}
            h
          </div>
          <Link
            href={`/product/${product._id}`}
            className="w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full py-2 text-sm font-bold hover:brightness-125 cursor-pointer transition-all"
          >
            GRAP IT NOW
          </Link>
          <div className="text-sm text-red-500 text-center mt-1 animate-pulse">
            ⚡Limited time offer
          </div>
        </div>
      </div>
    </div>
  );
}
