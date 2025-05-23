'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { getAccessToken } from '@/utils/tokenUtils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = getAccessToken()

  return (
    <header className="w-full bg-white">
      {/* Top row */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="relative h-10 w-10">
              </div>
              <div>
                <h1 className="text-2xl font-bold">Car Marketplace</h1>
                <p className="text-xs text-gray-500">AUTOMOTIVE CAR DEALER</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Middle links */}
        {/* <div className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-700 hover:text-[#1F75FE]">
            Newly Listed Car
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#1F75FE]">
            Lowest Mileage
          </Link>
          <Link href="#" className="text-gray-700 hover:text-[#1F75FE]">
            Offer
          </Link>
        </div> */}

        {/* Right contact section */}
        <div className="flex items-center space-x-4">
          {/* <div className="hidden md:flex items-center">
            <div className="text-[#1F75FE] mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">SELL WITH US</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="text-[#1F75FE] mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">SAVE</span>
          </div> */}
          <div className="flex items-center">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-gray-500">To More Inquiry</span>
              <span className="text-sm font-medium">+990-000 000 000</span>
            </div>
            <div className="md:ml-2 bg-gray-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row / Main navigation */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Main menu */}
          <nav className="hidden md:flex space-x-8 text-sm ml-3">
            <Link href="/" className="text-gray-800 font-medium hover:text-[#1F75FE] flex items-center">
              HOME
            </Link>
            <Link href="/cars" className="text-gray-800 font-medium hover:text-[#1F75FE] flex items-center">
              Buy a Car
            </Link>
            <Link href="/dashboard" className="text-gray-800 font-medium hover:text-[#1F75FE] flex items-center">
              Sell a Car
            </Link>
            <Link href="/about" className="text-gray-800 font-medium hover:text-[#1F75FE] flex items-center">
              ABOUT US
            </Link>
            <Link href="/contact" className="text-gray-800 font-medium hover:text-[#1F75FE]">
              CONTACT US
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Cart and sign up */}
          <div className="flex items-center space-x-5 text-sm mr-3">
            <Link href={token ? "/dashboard" : "/login"} className="hidden md:flex bg-[#1F75FE] text-white px-5 py-2.5 rounded-md font-medium">
              {token ? "Go to Dashboard" : "Login"}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-3">
            <Link href="/" className="block py-2 text-gray-800 font-medium">HOME</Link>
            <Link href="/new-cars" className="block py-2 text-gray-800 font-medium">NEW CAR</Link>
            <Link href="/used-cars" className="block py-2 text-gray-800 font-medium">USED CAR</Link>
            <Link href="/pages" className="block py-2 text-gray-800 font-medium">PAGES</Link>
            <Link href="/contact" className="block py-2 text-gray-800 font-medium">CONTACT US</Link>
            <Link href="/signup" className="block bg-[#1F75FE] text-white px-4 py-2 rounded-md font-medium text-center mt-4">
              SIGN UP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;