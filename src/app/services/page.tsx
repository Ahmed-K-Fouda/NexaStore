"use client";
import React from "react";
import { motion } from "framer-motion";
import SalesCampaignBanner  from '@/app/components/layout/banner/SalesCampaignBanner';

const services = [
  {
    title: "Fast Shipping",
    description: "Swift, reliable delivery tailored to your needs.",
  },
  {
    title: "24/7 Support",
    description: "Assistance anytime, anywhere.",
  },
  {
    title: "Secure Payments",
    description: "Top-tier security for every transaction.",
  },
  {
    title: "Data Insights",
    description: "Actionable analytics for smarter decisions.",
  },
  {
    title: "Mobile-Friendly",
    description: "Optimized for all devices.",
  },
  {
    title: "Customer Satisfaction",
    description: "Excellence in every interaction.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <SalesCampaignBanner/>
      <section className="h-screen flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-white via-slate-800 to-white text-transparent bg-clip-text drop-shadow-lg"
        >
          Our Services
        </motion.h1>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="p-6 bg-gray-800/20 backdrop-blur-md rounded-lg border border-gray-700/30"
            >
              <h2 className="text-2xl font-medium text-gray-100 mb-4">{service.title}</h2>
              <p className="text-gray-400">{service.description}</p>
              
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}