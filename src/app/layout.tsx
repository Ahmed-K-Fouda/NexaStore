/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";
import HeaderCategorySelector from "./components/layout/header_category/HeaderCategorySelector";
import { getAllCategories } from "@/sanity/lib/client";
import Cart from "./components/cart/Cart";
import ToastProvider from "./components/toastify/ToastProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();
  const categories = await getAllCategories();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white `}>
        <ToastProvider/>
        <Header user={user} categorySelector={<HeaderCategorySelector />} />
        {children}

        <Cart />
        <SanityLive />
      </body>
    </html>
  );
}
