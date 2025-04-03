import { getCurrentSession } from "@/actions/auth";
import { getAllProducts } from "@/sanity/lib/client";
import ProductGrid from "./components/product/ProductGrid";
import ToastProvider from './components/toastify/ToastProvider';
import WheelOfFortune from './components/layout/WheelOfFortune/WheelOfFortune';
import { getWheelOfFortuneConfiguration } from './../actions/wheel-of-fortune-actions';
import Banner from './components/product/Banner';
import Slider from './components/product/Slider';
import SalesCampaignBanner from './components/layout/banner/SalesCampaignBanner';
import Footer from './components/footer/Footer';

export default async function Home() {
  const { user } = await getCurrentSession();
  const products = await getAllProducts(); 
  const { randomProducts, winningIndex } = await getWheelOfFortuneConfiguration();

  return (
    <div>
      <ToastProvider />
      <WheelOfFortune products={randomProducts} winningIndex={winningIndex} />
    <SalesCampaignBanner/>
      <Banner products={products} />

      <section className="container mx-auto px-4">
        <Slider products={products} />
      </section>

      <section className="container mx-auto px-4 mt-8">
       <h2 className="text-3xl font-extrabold text-left mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
        🛍️ All Products
      </h2>
        <ProductGrid products={products} />
      </section>

       <Footer/> 
    </div>
  );
}
