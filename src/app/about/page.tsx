"use client";

import React from "react";
import Image from "next/image";
import { DollarSign, Shield, Award, Settings } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Header from "@/components/layout/Header";
import AboutCard from "@/components/ui/AboutCard";
import Values from "@/sections/About/Values";
import Mission from "@/sections/About/Mission";
import Achievements from "@/sections/About/Achievements";
import OurStory from "@/sections/About/OurStory";

export default function AboutPage() {
  const title = "About Our Company"
  const description = "Redefining the car buying experience with transparency, expertise, and customer-focused solutions."
  const values = [
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Our curated selection of vehicles ensures you find the perfect match for your budget without compromising on quality, reliability, or style."
    },
    {
      icon: Shield,
      title: "Money Back Guarantee",
      description: "If you're not completely satisfied, enjoy our hassle-free return process. We stand behind every vehicle and want you to feel confident in your purchase."
    },
    {
      icon: Settings,
      title: "8 Month Warranty",
      description: "Rest easy knowing each vehicle comes with our comprehensive warranty that covers common defects, giving you peace of mind with your investment."
    }
  ]
  const achievements = [
    {
      icon: Award,
      title: "600K+",
      description: "Vehicles Available"
    },
    {
      icon: DollarSign,
      title: "400K+",
      description: "Vehicles Sold"
    },
    {
      icon: Shield,
      title: "98.5%",
      description: "Customer Satisfaction"
    },

  ]
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Professional Header */}
      <Header title={title} description={description} />
      {/* Our Story Section */}
      <OurStory/>

      {/* Core Values Section */}
      <Values values={values} />

      {/* Mission & Vision Section with Modern Design */}
      <Mission />

      {/* Achievements Section with Professional Stats */}
      {/* <Achievements achievements={achievements}/> */}

      <Footer />
    </main>
  );
}