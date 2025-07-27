import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/sections/Home/HeroSection';
import FeaturedCars from '@/sections/Home/FeaturedCars';
import BrandsCarousel from '@/sections/Home/BrandCarousel';
import WhyChooseUs from '@/sections/Home/WhyChooseUs';
import HowItWorks from '@/sections/Home/HowItWorks';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCars/>
      <WhyChooseUs/>
      {/* <BrandsCarousel/> */}
      <HowItWorks/>
      <Footer/>
      {/* Other page sections can be added here */}
    </div>
  );
};

export default HomePage;