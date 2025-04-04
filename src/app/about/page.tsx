"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import SalesCampaignBanner  from '@/app/components/layout/banner/SalesCampaignBanner';
import {  
FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaRocket,
    FaLock,
  FaUsers,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <SalesCampaignBanner/>
      <div className="container mx-auto px-6 py-16">
        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-4">
              Our Story
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to NexaStore, your premier destination for online shopping.
              Founded in 2024 with a vision to revolutionize the eCommerce experience,
              we have grown into a trusted platform offering an extensive range of quality
              products and unparalleled customer service.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Our journey began with a simple idea: to make shopping enjoyable, convenient,
              and secure for everyone. Today, NexaStore is a symbol of innovation and excellence,
              and we continue to push the boundaries of what is possible.
            </p>
          </div>
          <div className="relative">
            <Image
              src='/About Images/about.png'
              alt="Our Story"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg"
            ></motion.div>
          </div>
        </motion.div>

        {/* Our Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <FaRocket className="text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously develop cutting-edge solutions to redefine online shopping.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaUsers className="text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Customer First
              </h3>
              <p className="text-gray-700">
                Every decision is made with our customers in mind, ensuring satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaHandshake className="text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Trust & Integrity
              </h3>
              <p className="text-gray-700">
                Our transparent and honest approach builds lasting relationships with our clients.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "John Doe", role: "CEO", img: "/About Images/john.jpeg" },
              { name: "Jonas Smith", role: "Marketing Director", img: "/About Images/jonas.png" },
              { name: "Robert Brown", role: "CTO", img: "/About Images/Robert.jpg" },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-xl p-6 text-center"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    <FaFacebook size={20} />
                  </Link>
                  <Link href="#" className="text-blue-400 hover:text-blue-600">
                    <FaTwitter size={20} />
                  </Link>
                  <Link href="#" className="text-blue-700 hover:text-blue-900">
                    <FaLinkedin size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20 bg-white rounded-lg shadow-2xl p-10"
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Why Choose NexaStore?
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            At NexaStore, we combine premium quality products with a user-friendly
            shopping experience. Our commitment to excellence, secure payment systems,
            and fast delivery make us the preferred choice for millions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FaLightbulb className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-700 text-center">
                Our products are carefully curated from top global brands.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaLock className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-700 text-center">
                Shop with confidence knowing your transactions are safe.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FaRocket className="text-6xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Lightning Fast Delivery</h3>
              <p className="text-gray-700 text-center">
                Get your orders delivered quickly and reliably right to your door.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold py-4 px-12 rounded-full shadow-xl transition-all transform hover:scale-105"
          >
            Contact Us Today
          </Link>
        </motion.div>
      </div>

      {/* Decorative Animated Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-500 rounded-full opacity-40"
        ></motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-red-500 rounded-full opacity-20"
        ></motion.div>
      </div>
    </div>
  );
}
