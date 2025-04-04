"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaSearch } from "react-icons/fa";

const Footer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Our Company</h3>
            <p className="mb-4 text-sm w-80">
              We are a leading eCommerce shop, providing high-quality products with seamless online shopping experiences. Our commitment to excellence ensures customer satisfaction with every purchase.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#"    className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-sm mb-2">1234 shibin street</p>
            <p className="text-sm mb-2">Cairo City, TC 56789</p>
            <p className="text-sm mb-2">Email: A.F@next.com</p>
            <p className="text-sm mb-4">Phone: +20 (1234) 567-890</p>
            <div className="w-80 h-50 border border-gray-700 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0014127563857!2d144.9630583153167!3d-37.81362797975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f83f1b4394d6!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1618356159548!5m2!1sen!2sau" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>

          <div className="w-full  md:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-600">
                <FaSearch size={20} />
              </button>
            </form>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-full bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-r-full font-bold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Our Company. All rights reserved.</p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-500 opacity-20 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-red-500 opacity-10 rounded-full animate-spin"></div>
      </div>
    </footer>
  );
};

export default Footer;
