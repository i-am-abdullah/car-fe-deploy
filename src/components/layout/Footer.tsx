'use client';
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3d1703] text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
<h1 className='text-white font-bold text-2xl'>AUTOLEECH</h1>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              Car Marketplace is your trusted partner for finding the perfect vehicle.
              We connect buyers with sellers to create a seamless car buying
              experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-[#30170a] hover:text-white p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-[#30170a] hover:text-white p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-[#30170a] hover:text-white p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-[#30170a] hover:text-white p-2 rounded-full transition-colors duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className=" transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cars" className="transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Sell a Car
                </Link>
              </li>
              <li>
                <Link href="/contact" className=" transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact Info */}
          {/* <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-white flex-shrink-0" />
                <span>Dummy City, 12345, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-white flex-shrink-0" />
                <span>+000-000 000 000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-white flex-shrink-0" />
                <span>info@Car Marketplace.com</span>
              </li>
            </ul>
          </div> */}

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe to receive updates about new vehicles and special offers</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-[#3D1703]" 
                />
                <button 
                  type="submit" 
                  className="bg-[#3D1703] hover:bg-[#3D1703] text-white px-4 rounded-r-md transition-colors duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#3D1703]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Auto Leech. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;