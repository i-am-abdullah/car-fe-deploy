import { Specification } from "@/types/car";
import { DynamicFormFields } from '../shared/DynamicFormFields';

interface PerformanceFormProps {
  enginePerformance: Specification[];
  onChange: (enginePerformance: Specification[]) => void;
}

export function PerformanceForm({ enginePerformance, onChange }: PerformanceFormProps) {
  const handleChange = (index: number, value: string) => {
    const newEnginePerformance = [...enginePerformance];
    newEnginePerformance[index].value = value;
    onChange(newEnginePerformance);
  };

  return (
    <DynamicFormFields
      fields={enginePerformance}
      onChange={handleChange}
    />
  );
}