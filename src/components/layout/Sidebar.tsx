import React from 'react';
import ContactForm from '../ui/CarDetail/ContactForm';
import ContactOptions from '../ui/CarDetail/ContactOptions';
import { ContactInfo} from '@/types/car';
import "@/app/globals.css"

interface SidebarProps {
  contactInfo: ContactInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ contactInfo}) => {
  return (
    <div className="sidebar">
      <div className="contact-section">
        <h3 className="sidebar-title">Contact Seller</h3>
        <ContactOptions contactInfo={contactInfo} />
        <ContactForm />
      </div>
      
    </div>
  );
};

export default Sidebar;