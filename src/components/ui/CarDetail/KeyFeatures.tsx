import React from "react";
import { Check } from "lucide-react";
import "@/app/globals.css";

interface KeyFeaturesProps {
  features: string[];
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default KeyFeatures;
