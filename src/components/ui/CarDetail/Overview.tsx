import React from 'react';
import { Specification } from '@/types/car';
import "@/app/globals.css"

interface OverviewTableProps {
  specifications: Specification[];
}

const OverviewTable: React.FC<OverviewTableProps> = ({ specifications }) => {
  const columns = groupSpecsIntoColumns(specifications);
  
  return (
    <div className="overview-table">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="specs-column">
          {column.map((spec, index) => (
            <div key={index} className="spec-row">
              <div className="spec-label">{spec.label}</div>
              <div className="spec-value">{spec.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const groupSpecsIntoColumns = (specs: Specification[]): Specification[][] => {
  const result: Specification[][] = [[], [], []];
  let currentColumn = 0;
  
  for (const spec of specs) {
    result[currentColumn].push(spec);
    currentColumn = (currentColumn + 1) % 3;
  }
  
  return result;
};

export default OverviewTable;