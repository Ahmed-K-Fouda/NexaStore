"use client";
import React from "react";
import { motion } from "framer-motion";
import  SalesCampaignBanner  from '@/app/components/layout/banner/SalesCampaignBanner';

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen relative overflow-hidden">
        <SalesCampaignBanner/>
      <div className="container mx-auto px-6 py-16">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Have any questions or need assistance? We're here to help. Reach out to us and we will get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0014127563857!2d144.9630583153167!3d-37.81362797975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f83f1b4394d6!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1618356159548!5m2!1sen!2sau"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Our Location"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* Decorative Animated Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-red-500 rounded-full opacity-10"
      ></motion.div>
      <motion.div
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"
      ></motion.div>
    </div>
  );
}
