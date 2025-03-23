/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "@/sanity/lib/client";
import SalesCampaignBanner from "./components/layout/banner/SalesCampaignBanner";
import ProductGrid from "./components/product/ProductGrid";
import { ToastContainer } from "react-toastify";
export default async function Home() {
  const { user } = await getCurrentSession();
  const products = await getAllProducts();
  return (
    <div>
      <SalesCampaignBanner />

      <section className="container mx-auto px-8">
        <ProductGrid products={products} />
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
