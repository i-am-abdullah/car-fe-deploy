import React from 'react';
import ContactOptions from '../ui/CarDetail/ContactOptions';
import "@/app/globals.css"

interface SidebarProps {
  contactInfo: any;
}

const Sidebar: React.FC<SidebarProps> = ({ contactInfo}) => {
  return (
    <div className="sidebar">
      <div className="contact-section">
        <h3 className="sidebar-title">Contact Seller</h3>
        <ContactOptions contactInfo={contactInfo} />
        {/* <ContactForm /> */}
      </div>
      
    </div>
  );
};

export default Sidebar;