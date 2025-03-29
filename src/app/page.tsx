/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "@/sanity/lib/client";
import SalesCampaignBanner from "./components/layout/banner/SalesCampaignBanner";
import ProductGrid from "./components/product/ProductGrid";
import ToastProvider from './components/toastify/ToastProvider';
import WheelOfFortune from "./components/layout/WheelOfFortune/WheelOfFortune";
export default async function Home() {
  const { user } = await getCurrentSession();
  const products = await getAllProducts();
  return (
    <div>
      <ToastProvider/>
      <WheelOfFortune/>
      <SalesCampaignBanner />

      <section className="container mx-auto px-8">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
