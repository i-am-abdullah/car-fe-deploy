'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Image 
                src="/vercel.svg" 
                alt="Car Marketplace" 
                width={140} 
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              Car Marketplace is your trusted partner for finding the perfect vehicle. 
              We connect buyers with sellers to create a seamless car buying 
              experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-500 hover:text-white p-2 rounded-full transition-colors duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Our Vehicles
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <span>Dummy City, 12345, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <span>+000-000 000 000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <span>info@Car Marketplace.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="mb-4 text-sm">Subscribe to receive updates about new vehicles and special offers</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-gray-800 px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-400" 
                />
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md transition-colors duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            {/* <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-400">Payment Methods:</p>
              <div className="flex space-x-2">
                <Image src="/visa.png" alt="Visa" width={40} height={24} className="h-6 object-contain" />
                <Image src="/mastercard.png" alt="Mastercard" width={40} height={24} className="h-6 object-contain" />
                <Image src="/paypal.png" alt="PayPal" width={40} height={24} className="h-6 object-contain" />
                <Image src="/stripe.png" alt="Stripe" width={40} height={24} className="h-6 object-contain" />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Car Marketplace. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors duration-300">Terms of Service</Link>
              <Link href="/cookies" className="text-sm hover:text-blue-400 transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;