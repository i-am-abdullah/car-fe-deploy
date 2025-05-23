import { Stack, TextInput } from '@mantine/core';
import { Specification } from '@/types/car';

interface DynamicFormFieldsProps {
  fields: Specification[];
  onChange: (index: number, value: string) => void;
}

export function DynamicFormFields({ fields, onChange }: DynamicFormFieldsProps) {
  return (
    <Stack>
      {fields.map((field, index) => (
        <TextInput
          key={index}
          label={field.label}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          value={field.value}
          onChange={(e) => onChange(index, e.target.value)}
        />
      ))}
    </Stack>
  );
}
