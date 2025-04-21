'use client';

import React, { useState } from 'react';
import { FAQ } from '@/types/car';
import "@/app/globals.css"

interface FaqSectionProps {
  faqs: FAQ[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="faq-section">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
        >
          <div 
            className="faq-question"
            onClick={() => toggleFaq(index)}
          >
            <h4>{faq.question}</h4>
            <span className="toggle-icon">
              {openIndex === index ? '−' : '+'}
            </span>
          </div>
          
          {openIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;