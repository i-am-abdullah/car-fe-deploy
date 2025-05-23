"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false
  });
  const title = "Contact"
  const description = "We're here to help with any questions about our vehicles or services. Get in touch with our team today."


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormStatus({ submitted: false, loading: true });
    
    setTimeout(() => {
      setFormStatus({ submitted: true, loading: false });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <Header title={title} description={description}/>

      {/* Contact Information & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div className="mb-10">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Reach Out</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                  Get In Touch
                </h2>
                <p className="text-gray-600">
                  Have questions or need assistance? Our dedicated team is ready to help you find the perfect vehicle or answer any inquiries.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="mr-4 bg-blue-100 rounded-full p-3 text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">123 Automotive Avenue</p>
                    <p className="text-gray-600">Chicago, IL 60601</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="mr-4 bg-blue-100 rounded-full p-3 text-blue-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
                    <p className="text-gray-600">Sales: (555) 123-4567</p>
                    <p className="text-gray-600">Support: (555) 987-6543</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="mr-4 bg-blue-100 rounded-full p-3 text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
                    <p className="text-gray-600">info@carmarketplace.com</p>
                    <p className="text-gray-600">support@carmarketplace.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">We'll get back to you as soon as possible</p>
              </div>

              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4 text-green-500">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    Your message has been successfully sent. We'll get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus({ submitted: false, loading: false })}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Vehicle Inquiry"
                      />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className={`w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
                        formStatus.loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {formStatus.loading ? (
                        <span className="inline-flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <Send size={16} className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-8 pb-16">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-7 w-full">
              <div className="w-full h-96 bg-gray-200 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
                <div className="text-center z-10">
                  <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-700 font-medium">Interactive Map Would Appear Here</p>
                  <p className="text-gray-500 text-sm mt-2">123 Automotive Avenue, Chicago, IL 60601</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Quick Answers</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about contacting us and our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly will I receive a response to my inquiry?
                </h3>
                <p className="text-gray-600">
                  We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer service line.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I schedule a test drive through the contact form?
                </h3>
                <p className="text-gray-600">
                  Yes, you can request a test drive through our contact form. Simply mention the vehicle you're interested in and your preferred date and time in the message field.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer virtual consultations for out-of-state customers?
                </h3>
                <p className="text-gray-600">
                  Absolutely! We offer video calls to discuss vehicles, financing options, and answer any questions you might have. Request a virtual consultation through our contact form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Our team of automotive experts is ready to help you find the perfect car that matches your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone size={16} className="mr-2" />
              Call Us Today
            </a>
            <a 
              href="#" 
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
            >
              <Send size={16} className="mr-2" />
              Email Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}