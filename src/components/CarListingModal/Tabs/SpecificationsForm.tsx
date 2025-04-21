import { Specification } from '@/types/car';
import { DynamicFormFields } from '../shared/DynamicFormFields';

interface SpecificationsFormProps {
  specifications: Specification[];
  onChange: (specifications: Specification[]) => void;
}

export function SpecificationsForm({ specifications, onChange }: SpecificationsFormProps) {
  const handleChange = (index: number, value: string) => {
    const newSpecifications = [...specifications];
    newSpecifications[index].value = value;
    onChange(newSpecifications);
  };

  return (
    <DynamicFormFields
      fields={specifications}
      onChange={handleChange}
    />
  );
}


