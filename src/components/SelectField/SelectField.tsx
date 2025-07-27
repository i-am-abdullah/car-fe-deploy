'use client';

import { Select, SelectProps } from '@mantine/core';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function SelectField({
  options,
  value,
  onChange,
  label,
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={options}
      value={value}
      onChange={(val) => onChange(val || '')}
      {...props}
    />
  );
}