"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SalesCampaignBanner  from '@/app/components/layout/banner/SalesCampaignBanner';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Innovative Trends in eCommerce",
    summary: "Discover the latest trends shaping the future of online shopping and technology.",
    image: "/blog/trends.jpeg",
    slug: "innovative-trends-in-ecommerce",
    date: "2024-12-01",
  },
  {
    id: 2,
    title: "The Art of Digital Marketing",
    summary: "Learn how digital marketing strategies can elevate your brand in the modern world.",
    image: "/blog/dm.webp",
    slug: "the-art-of-digital-marketing",
    date: "2024-11-15",
  },
  {
    id: 3,
    title: "UX/UI Design Best Practices",
    summary: "Explore the best practices in UX/UI design that make online experiences delightful.",
    image: "/blog/ux-ui.png",
    slug: "ux-ui-design-best-practices",
    date: "2024-10-28",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <SalesCampaignBanner/>
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-4">
            Latest Blog Posts
          </h1>
          <p className="text-lg text-gray-700">
            Stay updated with the latest trends, insights, and innovations in the world of eCommerce and digital marketing.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 transform hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0bg-opacity-30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 flex-grow">
                  {post.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</span>
                  <p className="text-gray-400 font-semibold cursor-not-allowed">
                    Read More &rarr;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
