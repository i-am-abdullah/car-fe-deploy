"use client";

import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ContactPage() {
  const title = "Contact"
  const description = "We're here to help with any questions about our vehicles or services. Get in touch with our team today."

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Header title={title} description={description}/>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#3D1703] font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-gray-600">
              Choose the most convenient way to contact our team. We're here to help you find the perfect vehicle.
            </p>
          </div>

          {/* Main Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-[#3D1703] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <MapPin size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Visit Our Showroom</h3>
              <div className="text-center space-y-2">
                <p className="text-gray-600 font-medium">123 Automotive Avenue</p>
                <p className="text-gray-600">Chicago, IL 60601</p>
                <p className="text-gray-600">United States</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  Mon-Sat: 9AM-7PM
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-[#3D1703] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <Phone size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Call Us Direct</h3>
              <div className="text-center space-y-3">
                <div>
                  <p className="text-gray-700 font-medium">Sales Department</p>
                  <p className="text-[#3D1703] font-semibold text-lg">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Customer Support</p>
                  <p className="text-[#3D1703] font-semibold text-lg">(555) 987-6543</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  Available 24/7
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="bg-[#3D1703] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Email Our Team</h3>
              <div className="text-center space-y-3">
                <div>
                  <p className="text-gray-700 font-medium">General Inquiries</p>
                  <p className="text-[#3D1703] font-semibold">info@carmarketplace.com</p>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Technical Support</p>
                  <p className="text-[#3D1703] font-semibold">support@carmarketplace.com</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  Response within 24hrs
                </div>
              </div>
            </div>
          </div>

          {/* Department Specific Cards */}
          {/* <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Department Directory</h3>
              <p className="text-gray-600">Connect directly with the right team for your specific needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="bg-[#3D1703] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Car size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sales Team</h4>
                <p className="text-sm text-gray-600 mb-3">Vehicle purchases, financing, trade-ins</p>
                <p className="text-[#3D1703] font-medium text-sm">(555) 123-4567</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="bg-[#3D1703] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Headphones size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                <p className="text-sm text-gray-600 mb-3">Technical help, account issues</p>
                <p className="text-[#3D1703] font-medium text-sm">(555) 987-6543</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="bg-[#3D1703] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Service</h4>
                <p className="text-sm text-gray-600 mb-3">Maintenance, repairs, warranties</p>
                <p className="text-[#3D1703] font-medium text-sm">(555) 456-7890</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="bg-[#3D1703] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Users size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Management</h4>
                <p className="text-sm text-gray-600 mb-3">Partnership, feedback, complaints</p>
                <p className="text-[#3D1703] font-medium text-sm">(555) 111-2222</p>
              </div>
            </div>
          </div> */}

          {/* Business Hours Card */}
          {/* <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-[#3D1703] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Clock size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">Visit us during these convenient hours</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Monday - Friday</span>
                    <span className="text-[#3D1703] font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Saturday</span>
                    <span className="text-[#3D1703] font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Sunday</span>
                    <span className="text-gray-500 font-medium">Closed</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Special Notes</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Extended hours during holiday seasons</li>
                    <li>• Service department closes 1 hour earlier</li>
                    <li>• Emergency support available 24/7</li>
                    <li>• Appointments recommended for test drives</li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3D1703] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-white max-w-2xl mx-auto mb-8">
            Our team of automotive experts is ready to help you find the perfect car that matches your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:(555)123-4567" 
              className="px-8 py-3 bg-white text-[#3D1703] font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone size={16} className="mr-2" />
              Call Us Today
            </a>
            <a 
              href="mailto:info@carmarketplace.com" 
              className="px-8 py-3 bg-white text-[#3D1703] font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Mail size={16} className="mr-2" />
              Email Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}