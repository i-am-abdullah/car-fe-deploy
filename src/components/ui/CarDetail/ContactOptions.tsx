import React from 'react';
import { ContactInfo } from '@/types/car';
import "@/app/globals.css"

interface ContactOptionsProps {
  contactInfo: ContactInfo;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({ contactInfo }) => {
  return (
    <div className="contact-options">
      <button className="contact-btn whatsapp">
        <i className="whatsapp-icon"></i>
        WhatsApp
      </button>
      
      <button className="contact-btn email">
        <i className="email-icon"></i>
        Email
      </button>
      
      <button className="contact-btn phone">
        <i className="phone-icon"></i>
        Call: {contactInfo.phone}
      </button>
    </div>
  );
};

export default ContactOptions;

