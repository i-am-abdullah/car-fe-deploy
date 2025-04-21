import React from 'react';
import { Specification } from '@/types/car';
import "@/app/globals.css"

interface EnginePerformanceProps {
  performance: Specification[];
  price: number;
}

const EnginePerformance: React.FC<EnginePerformanceProps> = ({ performance, price }) => {
  return (
    <div className="engine-performance">
      <div className="performance-grid">
        {performance.map((item, index) => (
          <div key={index} className="performance-item">
            <div className="performance-label">{item.label}</div>
            <div className="performance-value">{item.value}</div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default EnginePerformance;