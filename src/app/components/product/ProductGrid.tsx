import { Product } from "@/sanity.types";
import React from "react";
import ProductItem from "./ProductItem";

type productGridProps = {
  products: Product[];
};

function ProductGrid({ products }: productGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
